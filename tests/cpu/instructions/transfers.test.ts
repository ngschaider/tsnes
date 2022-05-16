import { setup } from "../utils";

describe("CPU - TRANSFERS", () => {
    test("0x8A - TXA (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D;

        ram.load(0x8000, "8A");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.a).toBe(0x3D);
    });

    test("0x98 - TYA (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.y = 0x3D;

        ram.load(0x8000, "98");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.a).toBe(0x3D);
    });

    test("0x9A - TXS (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D;

        ram.load(0x8000, "9A");
        
        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.stkp).toBe(0x3D);
    });

    test("0xA8 - TAY (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D;

        ram.load(0x8000, "A8");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.y).toBe(0x3D);
    })

    test("0xAA - TAX (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D;

        ram.load(0x8000, "AA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.x).toBe(0x3D);
    })
    
    test("0xBA - TSX (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.stkp = 0x3D;

        ram.load(0x8000, "BA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.x).toBe(0x3D);
    })
});