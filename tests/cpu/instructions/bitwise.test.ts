import { setupHardware, countCycles } from "../utils";

describe("CPU - BITWISE", () => {
    test("0x01 - ORA (IND_X)", () => {
    
    });

    test("0x05 - ORA (ZP)", () => {
    
    });

    test("0x06 - ASL (ZP)", () => {
    
    });
    
    test("0x09 - ORA (IMM)", () => {
        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        let {cpu, ram} = setupHardware();
        cpu.a = a;

        ram.load("09", 0x8000);
        ram.write(0x8001, b);

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(2);
    });

    test("0x0A - ASL (Accum)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let result = 0b10011000;

        cpu.a = a;
        ram.load("0A", 0x8000);
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(2);
    });
        
    test("0x0D - ORA (ABS)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        cpu.a = a;
        ram.write(0xC0DE, b);
        ram.load("0D DE C0", 0x8000);
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });

    test("0x0E - ASL (ABS)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let result = 0b10011000;

        ram.write(0xC0DE, a);
        ram.load("0E DE C0", 0x8000);
        
        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === result);
        expect(cycles).toBe(6);
    });
        
    test("0x11 - ORA (IND_Y)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("11 22", 0x8000);
        ram.load("CD AB", 0x0022);
        cpu.y = 0x04;
        ram.write(0xABCD + 0x04, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });

    test("0x11 - ORA (IND_Y) - PAGE BOUNDARY CROSSING", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("11 22", 0x8000);
        ram.load("CD AB", 0x0022);
        cpu.y = 0xFF;
        ram.write(0xABCD + 0xFF, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(6);
    });
        
    test("0x15 - ORA (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("15 22", 0x8000);
        cpu.x = 0x04;
        ram.write(0x0022 + 0x04, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });
    
    test("0x16 - ASL (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let result = 0b10011000;

        ram.load("16 22", 0x8000);
        cpu.x = 0x04;
        ram.write(0x0022 + 0x04, a);
        
        let cycles = countCycles(cpu, () => ram.read(0x0022 + 0x04) === result);
        expect(cycles).toBe(6);
    });
    
    test("0x19 - ORA (ABS_Y)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("19 DE C0", 0x8000);
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, a);
        cpu.a = b;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });

    test("0x19 - ORA (ABS_Y) - PAGE BOUNDARY CROSSING)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("19 DE C0", 0x8000);
        cpu.y = 0xFF;
        ram.write(0xC0DE + 0xFF, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });

    test("0x1D - ORA (ABS_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("1D DE C0", 0x8000);
        cpu.x = 0x04;
        ram.write(0xC0DE + 0x04, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });
 
    test("0x1D - ORA (ABS_X) - PAGE BOUNDARY CROSSING", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a | b;

        ram.load("1D DE C0", 0x8000);
        cpu.x = 0xFF;
        ram.write(0xC0DE + 0xFF, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });
    
    test("0x1E - ASL (ABS_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let result = 0b10011000;

        ram.load("1E DE C0", 0x8000);
        cpu.x = 0x04;
        ram.write(0xC0DE + 0x04, a);
        
        let cycles = countCycles(cpu, () => ram.read(0xC0DE + 0x04) === result);
        expect(cycles).toBe(7);
    });
    
    test("0x21 - AND (IND_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a & b;

        ram.load("21 AB", 0x8000);
        cpu.x = 0x04;
        ram.load("DE C0", 0x00AB + 0x04);
        ram.write(0xC0DE, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(6);
    });
    
    test("0x25 - AND (ZP)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a & b;

        ram.load("25 AB", 0x8000);
        ram.write(0x00AB, a);
        cpu.a = b;
        
        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(3);
    });

    test("0x29 - AND (IMM)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b11001100;
        let b = 0b10101010;
        let result = a & b;

        ram.load("29", 0x8000);
        ram.write(0x8001, a);
        cpu.a = b;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(2);
    });
    
    test("0x26 - ROL (ZP)", () => {
    
    });    
    
    test("0x2A - ROL (Accum)", () => {
    
    });
    
    test("0x2D - AND (ABS)", () => {
    
    });
    
    test("0x2E - ROL (ABS)", () => {
    
    });
    
    test("0x31 - AND (IND_Y)", () => {
    
    });
    
    test("0x35 - AND (ZP_X)", () => {
    
    });
    
    test("0x36 - ROL (ZP_X)", () => {
    
    });

    test("0x39 - AND (ABS_Y)", () => {
    
    });

    test("0x3D - AND (ABS_X)", () => {
    
    });
    
    test("0x3E - ROL (ABS_X)", () => {
    
    });
    
    test("0x41 - EOR (IND_X)", () => {
    
    });

    test("0x45 - EOR (ZP)", () => {
    
    });

    test("0x46 - LSR (ZP)", () => {
    
    });
    
    test("0x49 - EOR (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b11001100;

        ram.load("49", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(cpu, () => cpu.a === 0b01100110);
        expect(cycles).toBe(2);
    });
    
    test("0x4A - LSR (Accum)", () => {
    
    });

    test("0x4D - EOR (ABS)", () => {
    
    });
    
    test("0x4E - LSR (ABS)", () => {
    
    });

    test("0x51 - EOR (IND_Y)", () => {
    
    });

        
    test("0x55 - EOR (ZP_X)", () => {
    
    });
    
    test("0x56 - LSR (ZP_X)", () => {
    
    });
    
    test("0x59 - EOR (ABS_Y)", () => {
    
    });
    
    test("0x5D - EOR (ABS_X)", () => {
    
    });
    
    test("0x5E - LSR (ABS_X)", () => {
    
    });

    test("0x66 - ROR (ZP)", () => {
    
    });

    test("0x6A - ROR (Accum)", () => {
    
    });

    test("0x6E - ROR (ABS)", () => {
    
    });

    test("0x76 - ROR (ZP_X)", () => {
    
    });
    
    test("0x7E - ROR (ABS_X)", () => {
    
    });
    
});