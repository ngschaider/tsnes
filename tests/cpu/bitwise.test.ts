import { setupHardware, countCycles } from "./utils";

describe("CPU - BITWISE", () => {
    test("0x01 - ORA (IZX)", () => {
    
    });

    test("0x05 - ORA (ZP0)", () => {
    
    });

    test("0x06 - ASL (ZP0)", () => {
    
    });
    
    test("0x09 - ORA (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b11001100;

        ram.load("09", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(cpu, () => cpu.a === 0b11101110);
        expect(cycles).toBe(2);
    });

    test("0x0A - ASL (IMP)", () => {
    
    });

        
    test("0x0D - ORA (ABS)", () => {
    
    });

    test("0x0E - ASL (ABS)", () => {
    
    });
        
    test("0x11 - ORA (IZY)", () => {
    
    });
        
    test("0x15 - ORA (ZPX)", () => {
    
    });
    
    test("0x16 - ASL (ZPX)", () => {
    
    });
    
    test("0x19 - ORA (ABY)", () => {
    
    });
 
    test("0x1D - ORA (ABX)", () => {
    
    });
    
    test("0x1E - ASL (ABX)", () => {
    
    });
    
    test("0x21 - AND (IZX)", () => {
    
    });
    
    test("0x25 - AND (ZP0)", () => {
    
    });

    test("0x29 - AND (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b11001100;

        ram.load("29", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(cpu, () => cpu.a === 0b10001000);
        expect(cycles).toBe(2);
    });
    
    test("0x26 - ROL (ZP0)", () => {
    
    });    
    
    test("0x2A - ROL (IMP)", () => {
    
    });
    
    test("0x2D - AND (ABS)", () => {
    
    });
    
    test("0x2E - ROL (ABS)", () => {
    
    });
    
    test("0x31 - AND (IZY)", () => {
    
    });
    
    test("0x35 - AND (ZPX)", () => {
    
    });
    
    test("0x36 - ROL (ZPX)", () => {
    
    });

    test("0x39 - AND (ABY)", () => {
    
    });

    test("0x3D - AND (ABX)", () => {
    
    });
    
    test("0x3E - ROL (ABX)", () => {
    
    });
    
    test("0x41 - EOR (IZX)", () => {
    
    });

    test("0x45 - EOR (ZP0)", () => {
    
    });

    test("0x46 - LSR (ZP0)", () => {
    
    });
    
    test("0x49 - EOR (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b11001100;

        ram.load("49", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(cpu, () => cpu.a === 0b01100110);
        expect(cycles).toBe(2);
    });
    
    test("0x4A - LSR (IMP)", () => {
    
    });

    test("0x4D - EOR (ABS)", () => {
    
    });
    
    test("0x4E - LSR (ABS)", () => {
    
    });

    test("0x51 - EOR (IZY)", () => {
    
    });

        
    test("0x55 - EOR (ZPX)", () => {
    
    });
    
    test("0x56 - LSR (ZPX)", () => {
    
    });
    
    test("0x59 - EOR (ABY)", () => {
    
    });
    
    test("0x5D - EOR (ABX)", () => {
    
    });
    
    test("0x5E - LSR (ABX)", () => {
    
    });

    test("0x66 - ROR (ZP0)", () => {
    
    });

    test("0x6A - ROR (IMP)", () => {
    
    });

    test("0x6E - ROR (ABS)", () => {
    
    });

});