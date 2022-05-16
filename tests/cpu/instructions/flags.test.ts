import { setup, countCycles } from "../utils";

describe("CPU - FLAGS", () => {

    test("0x18 - CLC (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.C = true;

        ram.load(0x8000, "18");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.C).toBe(false);
    });

    test("0x38 - SEC (Implied)", () => {
        let {cpu, ram} = setup();

        ram.load(0x8000, "38");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.C).toBe(true);
    });

    test("0x58 - CLI (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.I = true;

        ram.load(0x8000, "58");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.I).toBe(false);
    })

    test("0x78 - SEI (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.I = false;

        ram.load(0x8000, "78");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.I).toBe(true);
    });

    test("0xB8 - CLV (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.V = true;

        ram.load(0x8000, "B8");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.V).toBe(false);
    });

    test("0xD8 - CLD (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.D = true;

        ram.load(0x8000, "D8");

        
        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.D).toBe(false);
    });

    test("0xF8 - SED (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.D = false;

        ram.load(0x8000, "F8");

        
        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.D).toBe(true);
    });

})