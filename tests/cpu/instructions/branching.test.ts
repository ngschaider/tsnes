import { setup } from "../utils";

describe("CPU - BRANCHING", () => {
    test("0x00 - BRK (Implied)", () => {
        const {ram, cpu} = setup();

        ram.write(0x8000, 0x00);
        ram.load(0xFFFE, "DE C0");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(7);
        expect(cpu.status.B).toBe(true);   
        expect(cpu.pc).toBe(0xC0DE);
        expect(ram.read(0x01FD)).toBe(0x80);
        expect(ram.read(0x01FC)).toBe(0x02);
        expect(ram.read(0x01FB)).toBe(cpu.status.toUint8());
    });
    
    test("0x10 - BPL (Relative)", () => {
        
    });
    
    test("0x20 - JSR (ABS)", () => {
    
    });
    
    test("0x24 - BIT (ZP)", () => {
    
    });

    test("0x2C - BIT (ABS)", () => {
    
    });
    
    test("0x30 - BMI (Relative)", () => {
    
    });
    
    test("0x40 - RTI (Implied)", () => {

    });

    test("0x4C - JMP (ABS)", () => {
    
    });
    
    test("0x50 - BVC (Relative)", () => {
    
    });

    test("0x60 - RTS (Implied)", () => {

    });  
        
    test("0x6C - JMP (IND)", () => {
    
    });
    
    test("0x70 - BVS (Relative)", () => {
    
    });
      
    test("0x90 - BCC (Relative)", () => {
    
    });
    
    test("0xB0 - BCS (Relative)", () => {
    
    });
    
    test("0xD0 - BNE (Relative)", () => {
    
    });

    test("0xF0 - BEQ (Relative)", () => {
    
    });
    
});