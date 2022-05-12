import { setupHardware, countCycles } from "./utils";

describe("CPU - LOAD", () => {

    test("0xA0 - LDY (IMM)", () => {
        let {cpu, ram} = setupHardware();

        // LDY #$3D
        ram.load("A0 3D", 0x8000);

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA2 - LDX (IMM)", () => {
        let {cpu, ram} = setupHardware();

        // LDX #$3D
        ram.load("A2 3D", 0x8000);

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA9 - LDA (IMM)", () => {
        let {cpu, ram} = setupHardware();
        
        // LDA #$3D
        ram.load("A9 3D", 0x8000);

        let cycles = countCycles(cpu, () => cpu.a === 0x3D); 
        expect(cycles).toBe(2);
    });

})