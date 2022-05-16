import { setup } from "../utils";

describe("CPU - COMPARE", () => {

    test("0xE0 - CPX (IMM)", () => {

    });

    test("0xC0 - CPY (IMM)", () => {

    });

    test("0xC1 - CMP (IND_X)", () => {
    
    });
    
    test("0xC4 - CPY (ZP)", () => {
    
    });
    
    test("0xC5 - CMP (ZP)", () => {
    
    });
    
    test("0xC9 - CMP (IMM) - TRUE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = false;

        cpu.a = 0xDD;
        ram.load(0x8000, "C9 3D");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
    });

    test("0xC9 - CMP (IMM) - FALSE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = true;

        cpu.a = 0x3D;
        ram.load(0x8000, "C9 DD");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.C).toBe(false);
        expect(cpu.status.Z).toBe(false);
    });

    test("0xCC - CPY (ABS)", () => {
    
    });
    
    test("0xCD - CMP (ABS)", () => {
    
    });

    test("0xD1 - CMP (IND_Y)", () => {
    
    });
    
    test("0xD5 - CMP (ZP_X)", () => {
    
    });
    
    test("0xD9 - CMP (ABS_Y)", () => {
    
    });
    
    test("0xDD - CMP (ABS_X)", () => {
    
    });
        
    test("0xE4 - CPX (ZP)", () => {
    
    });
    
    test("0xEC - CPX (ABS)", () => {
    
    });
    
})