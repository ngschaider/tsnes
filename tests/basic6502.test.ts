import Bus from "../src/mos6502/Bus";
import CPU from "../src/mos6502/CPU";
import { instructionList } from "../src/mos6502/instructionList";
import RAM from "../src/mos6502/RAM";

let bus = new Bus();

let ram = new RAM();
bus.connectDevice(ram);
let cpu = new CPU();
bus.connectDevice(cpu);


const runCycles = (cpu: CPU, steps: number = 1) => {
    for(let i = 0; i < steps; i++) {
        cpu.clock();
    }
}


describe("testing basic 6502 capabilities", () => {
    test("LDA", () => {
        ram.reset();
        cpu.reset();

        // LDA $3D
        ram.load("A9 3D", 0x8000);
        ram.load("00 80", 0xFFCC);

        cpu.clock();

        expect(cpu.a).toBe(0x3D);
    });
});