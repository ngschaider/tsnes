import p5 from "p5";
import CPU from "./cpu/CPU";
import RAM from "./RAM";
import { uint16, uint8 } from "./types";
import Bus from "./bus/Bus";
import Cartridge from "./Cartridge";
import { AddressShifter } from "./bus/AddressShifter";
import { Mirrorer } from "./bus/Mirrorer";


let cpuBus: Bus = new Bus();

let cpu: CPU = new CPU(cpuBus);

let ram = new RAM(cpuBus, 0x0800);
let ram2 = new Mirrorer(new AddressShifter(cpuBus, 0x0800), 0x0000, 0x0800);
let ram3 = new Mirrorer(new AddressShifter(cpuBus, 0x1000), 0x0000, 0x0800);
let ram4 = new Mirrorer(new AddressShifter(cpuBus, 0x1800), 0x0000, 0x0800);


cpu.reset();

let running = false;

let p = new p5((p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight - 1);
        p.stroke(220);
        p.fill(220);
    };
    
    p.draw = () => {
        p.background(52);
    
        p.push();
        p.translate(40, 40)
        dumpRam(ram, 0x0000, 16, 8);
        p.pop();

        p.push();
        p.translate(800, 40);
        dumpRam(ram, 0x1D0);
        p.pop();
    
        p.push();
        p.translate(1400, 40)
        dumpRam(ram, 0x1D0);
        p.pop();

        p.push()
        if(running) {
            p.stroke(0, 255, 0);
            p.fill(0, 255, 0);
            p.text("RUNNING", 40, 640);
        } else {
            p.stroke(255, 0, 0);
            p.fill(255, 0, 0);
            p.text("HALTED", 40, 640);
        }
        p.pop();
        

        p.text(Math.round(1000/p.deltaTime) + " FPS", 20, 20);

        p.textSize(18);
        p.text("PC: 0x" + cpu.pc.toString(16), 40, 400);
        p.text("STKP: 0x" + cpu.stkp.toString(16), 40, 440);
        p.text("A: 0x" + cpu.A.toString(16), 40, 480);
        p.text("X: 0x" + cpu.X.toString(16), 40, 520);
        p.text("Y: 0x" + cpu.Y.toString(16), 40, 560);
        p.text("Cycles: " + cpu.cycles, 40, 600);
    };

    p.keyPressed = () => {
        if(p.key == " ") {
            cpu.clock();
        } else if(p.key == "r") {
            cpu.reset();
        } else if(p.key == "l") {
            cpu.status.fromUint8(0b11100011);
            ram.load(0x8000, "08");

            ram.bytes[0xFFCC] = 0x00;
            ram.bytes[0xFFCD] = 0x80;

            cpu.pc = 0x8000;
        } else if(p.key == 'p') {
            running = !running
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


const dumpRam = (ram: RAM, start: uint16, columns: number = 16, rows: number = 24) => {

    p.textAlign(p.LEFT, p.TOP);
    p.textFont("Consolas")
    p.textSize(16);
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < columns; x++) {
            let address: uint16 = start + x + columns * y;

            if(address >= ram.size) {
                break;
            }

            if(address === 0xffcc || address === 0xffcd) {
                p.stroke(255, 0, 0);
                p.fill(255, 0, 0);
            } else {
                p.stroke(255);
                p.fill(255);
            }

            let data: uint8 = ram.bytes[address];

            let hex = data.toString(16);
            if(hex.length < 2) {
                hex = "0" + hex;
            }

            p.text(hex, x*30, y*30);
        }
    }
}



document.getElementById("rom")?.addEventListener("change", (ev: Event) => {
    let inputElement = <HTMLInputElement> ev.target;
    let file = inputElement?.files?.[0];
    if(!file) {
        return;
    }
    Cartridge.loadFromFile(file, (cartridge) => {
        console.log(cartridge);
    });
});