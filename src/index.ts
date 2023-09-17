import p5 from "p5";
import CPU from "./cpu/CPU";
import RAM from "./RAM";
import { Address, uint16, uint8 } from "./types";
import Bus from "./bus/Bus";
import Cartridge from "./Cartridge";
import { AddressShifter } from "./bus/AddressShifter";
import { Mirrorer } from "./bus/Mirrorer";
import PPU from "./graphics/PPU";


const cpuBus: Bus = new Bus();

const cpu: CPU = new CPU(cpuBus);

const ram = new RAM(cpuBus, 0x0800);
const ram2 = new Mirrorer(new AddressShifter(cpuBus, 0x0800), 0x0000, 0x0800);
const ram3 = new Mirrorer(new AddressShifter(cpuBus, 0x1000), 0x0000, 0x0800);
const ram4 = new Mirrorer(new AddressShifter(cpuBus, 0x1800), 0x0000, 0x0800);

const ppuBus: Bus = new Bus();
const ppu = new PPU(ppuBus, cpuBus); // responds on 0x2000 to 0x2007 on the cpu bus

const patternTable0 = new RAM(ppuBus, 0x1000);
const patternTable1 = new RAM(new AddressShifter(ppuBus, 0x1000), 0x1000);
const nametable0 = new RAM(new AddressShifter(ppuBus, 0x2000), 1024);
const nametable1 = new RAM(new AddressShifter(ppuBus, 0x2400), 1024);
const nametable2 = new RAM(new AddressShifter(ppuBus, 0x2800), 1024);
const nametable3 = new RAM(new AddressShifter(ppuBus, 0x2C00), 1024);
const nametableMirror = new Mirrorer(ppuBus, 0x2000, 4096);

const palette = new RAM(new AddressShifter(ppuBus, 0x3F00), 0x0020)
const paletteMirror1 = new Mirrorer(new AddressShifter(ppuBus, 0x3F20), 0x3F00, 4096);
const paletteMirror2 = new Mirrorer(new AddressShifter(ppuBus, 0x3F40), 0x3F00, 4096);

// the 8 bytes for the PPU on the CPU bus are mirrored 1023 times (0x2008 - 0x3FFF is the mirror range, repeats every 8 bytes)
for(let i = 0x2008; i < 0x4000; i += 0x0008) {
    new Mirrorer(new AddressShifter(cpuBus, i), 0x2000, 0x0008);
}

cpu.reset();

let running = false;

type Page = StatusPage | MemoryPage;
type StatusPage = {
    type: "status";
}
type MemoryPage = {
    type: "memory";
    address: Address;
}

let currentPage: Page = {type: "status"};

let p = new p5((p: p5) => {
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
    
            p.text("PC: 0x" + cpu.pc.toString(16), 20, 140);
            p.text("STKP: 0x" + cpu.stkp.toString(16), 20, 160);
            p.text("A: 0x" + cpu.A.toString(16), 20, 200);
            p.text("X: 0x" + cpu.X.toString(16), 20, 220);
            p.text("Y: 0x" + cpu.Y.toString(16), 20, 240);
            p.text("Cycles left for instruction: " + cpu.cycles, 20, 280);
            p.text("Total Cycles: " + cpu.totalCycles, 20, 300);

            p.text("Controls:", 360, 140);
            p.text("S - Show this page", 360, 180);
            p.text("Space - Execute one clock cycle", 360, 200);
            p.text("P - Halt/Run emulator", 360, 220);
            p.text("R - Reset CPU", 360, 240);
            p.text("M - Memory Dump", 360, 260);
            p.text("C - Set Program Counter", 360, 280);
            p.text("V - Set Stack Pointer", 360, 300);
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

                    const byte = cpuBus.read(address).toString(16).padStart(2, "0");

                    p.text(byte, 100 + 30 * x, 70 + ySpacing * y);
                }
            }
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
            cpu.reset();
        } else if(p.key == " ") {
            cpu.clock();
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
            cpu.pc = pc;
        } else if(p.key == "v") {
            const stkpStr = prompt("Input new stack pointer (in hex):");
            if(!stkpStr) {
                return;
            }

            const stkp = parseInt(stkpStr, 16);
            if(isNaN(stkp)) return;
            cpu.stkp = stkp;
        }
    }
});

const tick = () => {
    if(running) {
        cpu.clock();
    }
    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);


document.getElementById("rom")?.addEventListener("change", (ev: Event) => {
    let inputElement = <HTMLInputElement> ev.target;
    let file = inputElement?.files?.[0];
    if(!file) {
        return;
    }
    Cartridge.loadFromFile(file, cartridge => {
        console.log(cartridge);
    });
});