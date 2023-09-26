import p5 from "p5";
import { Address } from "./types";
import Cartridge from "./Cartridge";
import NES from "./NES";


const nes = new NES();
//nes.reset();


let running = false;

type Page = GenericPage | MemoryPage;
type GenericPage = {
    type: "status" | "display";
}
type MemoryPage = {
    type: "memory";
    address: Address;
}

let currentPage: Page = {type: "status"};

let p = new p5((p: p5) => {
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight - 4);
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight - 4);
        p.stroke(220);
        p.fill(220);
        p.textAlign("left", "top");
        p.textSize(18);
        p.textFont("Consolas");
    };
    
    p.draw = () => {
        p.background(52);
    
        if(currentPage.type == "status") {
            p.push();
            p.textSize(40);
            if(running) {
                p.stroke(0, 255, 0);
                p.fill(0, 255, 0);
                p.text("RUNNING", 20, 60);
            } else {
                p.stroke(255, 0, 0);
                p.fill(255, 0, 0);
                p.text("HALTED", 20, 60);
            }
            p.pop();
    
            p.text("PC: 0x" + nes.cpu.pc.toString(16), 20, 140);
            p.text("STKP: 0x" + nes.cpu.stkp.toString(16), 20, 160);
            p.text("A: 0x" + nes.cpu.A.toString(16), 20, 200);
            p.text("X: 0x" + nes.cpu.X.toString(16), 20, 220);
            p.text("Y: 0x" + nes.cpu.Y.toString(16), 20, 240);
            p.text("Cycles left for instruction: " + nes.cpu.cycles, 20, 280);
            p.text("Total Cycles: " + nes.cpu.totalCycles, 20, 300);

            p.text("Controls:", 360, 140);
            p.text("S - Show this page", 360, 180);
            p.text("Space - Execute one clock cycle", 360, 200);
            p.text("F - Execute cycles for 1 frame", 360, 220);
            p.text("P - Halt/Run emulator", 360, 240);
            p.text("R - Reset CPU", 360, 260);
            p.text("M - Memory Dump", 360, 280);
            p.text("C - Set Program Counter", 360, 300);
            p.text("V - Set Stack Pointer", 360, 320);
            p.text("O - Open ROM file", 360, 340);
            p.text("D - Switch to Display", 360, 360);
            p.text("G - Execute cycles for 1 instruction", 360, 380);

            p.text("Current Cartridge:", 760, 140);
            if(nes.cartridge) {
                p.text("Format Version: " + nes.cartridge.data.header.formatVersion, 760, 180);
                p.text("Mapper: " + nes.cartridge.data.header.mapperNumber, 760, 200);
                p.text("Program memory chunks: " + nes.cartridge.data.header.programMemoryChunks, 760, 220);
                p.text("Pattern memory chunks: " + nes.cartridge.data.header.patternMemoryChunks, 760, 240);
            } else {
                p.text("N/A", 760, 180);
            }
        } else if(currentPage.type == "memory") {
            const xSpacing = 30;
            const width = p.displayWidth - 120;
            const columns = Math.floor(width / xSpacing);

            const ySpacing = 20;
            const height = p.displayHeight - 300;
            const rows = Math.floor(height / ySpacing);

            const columnHeaderSpan = 3;
            const columnHeaderWidth = columnHeaderSpan * xSpacing;
            const columnHeaders = Math.floor(width / columnHeaderWidth);

            for(let i = 0; i < rows; i++) {
                const address = currentPage.address + (columns * i);
                if(address > 0xffff) {
                    break;
                }
                const text = "0x" + address.toString(16).padStart(4, "0");
                p.text(text, 20, 70 + ySpacing * i);
            }

            for(let i = 0; i < columnHeaders; i++) {
                const address = i * columnHeaderSpan;
                if(address + currentPage.address > 0xFFFF) {
                    break;
                }

                const text = address.toString(16).padStart(2, "0");
                p.text(text, 100 + 90 * i, 50);
            }

            for(let y = 0; y < rows; y++) {
                for(let x = 0; x < columns; x++) {
                    const address = currentPage.address + y * 32 + x;
                    if(address > 0xffff) {
                        break;
                    }

                    const byte = nes.cpuBus.read(address).toString(16).padStart(2, "0");
                    p.text(byte, 100 + 30 * x, 70 + ySpacing * y);
                }
            }
        } else if(currentPage.type == "display") {
            const xOffset = 200;
            const yOffset = 100;
            p.push();
            for(let y = 0; y < nes.ppu.height; y++) {
                for(let x = 0; x < nes.ppu.width; x++) {
                    const xDraw = xOffset + x * 3;
                    const yDraw = yOffset + y * 3;
                    p.noStroke();
                    const col = nes.ppu.getPixel(x, y);
                    p.fill(col.red, col.green, col.blue);
                    p.rect(xDraw, yDraw, 10, 10);
                }
            }
            p.pop();

            p.push();
            p.noStroke();
            p.textSize(20);
            const x = 1300;
            let y = 100;
            for(const [address, line] of nes.cpu.getDisassembly(nes.cpu.pc - 10, nes.cpu.pc + 11)) {
                if(address == nes.cpu.pc) {
                    p.fill(200, 200, 255);
                } else {
                    p.fill(100, 100, 255);
                }

                p.text(line, x, y);

                y += 20;
            }
            p.pop();
        }
        
        p.text(Math.round(1000/p.deltaTime) + " FPS", 10, p.windowHeight - 30);
    };

    p.keyPressed = () => {
        if(p.key == "s") {
            // show status (registers + halted/running)
            currentPage = {
                type: "status"
            };
        } else if(p.key == "r") {
            nes.reset();
        } else if(p.key == " ") {
            nes.clock();
        }  else if(p.key == "p") {
            running = !running
        }  else if(p.key == "m") {
            const addressStr = prompt("Input address of start of memory dump (in hex):");
            if(!addressStr) {
                return;
            }

            const address = parseInt(addressStr, 16);
            if(isNaN(address)) return;
            currentPage = {
                type: "memory",
                address,
            };
        } else if(p.key == "c") {
            const pcStr = prompt("Input new program counter (in hex):");
            if(!pcStr) {
                return;
            }

            const pc = parseInt(pcStr, 16);
            if(isNaN(pc)) return;
            nes.cpu.pc = pc;
        } else if(p.key == "v") {
            const stkpStr = prompt("Input new stack pointer (in hex):");
            if(!stkpStr) {
                return;
            }

            const stkp = parseInt(stkpStr, 16);
            if(isNaN(stkp)) return;
            nes.cpu.stkp = stkp;
        } else if(p.key == "o") {
            document.getElementById("rom")?.click();
        } else if(p.key == "d") {
            currentPage = {type: "display"};
        } else if(p.key == "f") {
            nes.ppu.frameComplete = false;
            while(!nes.ppu.frameComplete) {
                nes.clock();
            }
            nes.ppu.frameComplete = false;
        } else if(p.key == "g") {
            if(nes.cpu.completed) {
                nes.clock();
            }
            while(!nes.cpu.completed) {
                nes.clock();
            }
        }
    }
});

const tick = () => {
    if(running) {
        nes.clock();
    }
}
setInterval(tick, 60/1000);


document.getElementById("rom")?.addEventListener("change", async (ev: Event) => {
    let inputElement = <HTMLInputElement> ev.target;
    let file = inputElement?.files?.[0];
    if(!file) {
        return;
    }

    const cartridge = await Cartridge.loadFromFile(nes.cpuBus, nes.ppuBus, file);
    nes.insertCartridge(cartridge);
    
});