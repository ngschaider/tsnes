import { setup } from "../utils";

describe("CPU - BITWISE", () => {
    describe("ORA", () => {
        test("0x01 - ORA (IND_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b11101110;
    
            ram.load(0x8000, "01 AB");
            cpu.x = 0x04;
            ram.load(0x00AB + 0x04, "DE C0");
            ram.write(0xC0DE, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(cpu.a).toBe(result);    
        });
    
        test("0x05 - ORA (ZP)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b11101110;
    
            ram.load(0x8000, "05 AB");
            ram.write(0x00AB, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.a).toBe(result);    
        });

        test("0x09 - ORA (IMM)", () => {
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            let {cpu, ram} = setup();
            cpu.a = a;
    
            ram.load(0x8000, "09");
            ram.write(0x8001, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(result);
        });    

        test("0x0D - ORA (ABS)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            cpu.a = a;
            ram.write(0xC0DE, b);
            ram.load(0x8000, "0D DE C0");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });

        test("0x11 - ORA (IND_Y)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "11 22");
            ram.load(0x0022, "CD AB");
            cpu.y = 0x04;
            ram.write(0xABCD + 0x04, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.a).toBe(result);
        });

        test("0x11 - ORA (IND_Y) - PAGE BOUNDARY CROSSING", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "11 22");
            ram.load(0x0022, "CD AB");
            cpu.y = 0xFF;
            ram.write(0xABCD + 0xFF, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(cpu.a).toBe(result);
        });
            
        test("0x15 - ORA (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "15 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });

        test("0x19 - ORA (ABS_Y)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "19 DE C0");
            cpu.y = 0x04;
            ram.write(0xC0DE + 0x04, a);
            cpu.a = b;
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });
    
        test("0x19 - ORA (ABS_Y) - PAGE BOUNDARY CROSSING)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "19 DE C0");
            cpu.y = 0xFF;
            ram.write(0xC0DE + 0xFF, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.a).toBe(result);
        });
    
        test("0x1D - ORA (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "1D DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });
     
        test("0x1D - ORA (ABS_X) - PAGE BOUNDARY CROSSING", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a | b;
    
            ram.load(0x8000, "1D DE C0");
            cpu.x = 0xFF;
            ram.write(0xC0DE + 0xFF, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.a).toBe(result);
        });
    });

    describe("ASL", () => {
        test("0x06 - ASL (ZP)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b10011000;
    
            ram.load(0x8000, "06 22");
            ram.write(0x0022, a);
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(ram.read(0x0022)).toBe(result);
            expect(cpu.status.C).toBe(true);
        });

        test("0x0A - ASL (Accum)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b10011000;
    
            cpu.a = a;
            ram.load(0x8000, "0A");
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(result);
        });

        test("0x0E - ASL (ABS)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b10011000;
    
            ram.write(0xC0DE, a);
            ram.load(0x8000, "0E DE C0");
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0xC0DE)).toBe(result);
        });

        test("0x16 - ASL (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b10011000;
    
            ram.load(0x8000, "16 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, a);
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0x0022 + 0x04)).toBe(result);
        });

        test("0x1E - ASL (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b10011000;
    
            ram.load(0x8000, "1E DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, a);
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(7);
            expect(ram.read(0xC0DE + 0x04)).toBe(result);
        });
    });

    describe("AND", () => {
        test("0x21 - AND (IND_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a & b;
    
            ram.load(0x8000, "21 AB");
            cpu.x = 0x04;
            ram.load(0x00AB + 0x04, "DE C0");
            ram.write(0xC0DE, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(cpu.a).toBe(result);
        });

        test("0x25 - AND (ZP)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a & b;
    
            ram.load(0x8000, "25 AB");
            ram.write(0x00AB, a);
            cpu.a = b;
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.a).toBe(result);
        });
    
        test("0x29 - AND (IMM)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = a & b;
    
            ram.load(0x8000, "29");
            ram.write(0x8001, a);
            cpu.a = b;
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(result);
        });

        test("0x2D - AND (ABS)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b10001000;
    
            cpu.a = a;
    
            ram.load(0x8000, "2D DE C0");
            ram.write(0xC0DE, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });
    
        test("0x31 - AND (IND_Y)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b10001000;
    
            cpu.a = a;
    
            ram.load(0x8000, "31 22");
            ram.load(0x0022, "DE C0");
            cpu.y = 0x04;
            ram.write(0xC0DE + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.a).toBe(result);
        });
        
        test("0x35 - AND (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b10001000;
    
            cpu.a = a;
    
            ram.load(0x8000, "35 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });

        test("0x39 - AND (ABS_Y)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b10001000;
    
            cpu.a = a;
    
            ram.load(0x8000, "39 DE C0");
            cpu.y = 0x04;
            ram.write(0xC0DE + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });
    
        test("0x3D - AND (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b10001000;
    
            cpu.a = a;
    
            ram.load(0x8000, "3D DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });
    })
    
    describe("ROL", () => {
        test("0x26 - ROL (ZP)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            ram.load(0x8000, "26 22");
            ram.write(0x0022, 0b11001100);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(ram.read(0x0022)).toBe(0b10011001);
            expect(cpu.status.C).toBe(true);
        });    
        
        test("0x2A - ROL (Accum)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            ram.load(0x8000, "2A");
            cpu.a = 0b11001100;
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(0b10011000);
            expect(cpu.status.C).toBe(true);
        });
    
        test("0x2E - ROL (ABS)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            ram.load(0x8000, "2E DE C0");
            ram.write(0xC0DE, 0b01001100);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0xC0DE)).toBe(0b10011000);
            expect(cpu.status.C).toBe(false);
        });
    
        test("0x36 - ROL (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            ram.load(0x8000, "36 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, 0b01001100);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0x0022 + 0x04)).toBe(0b10011001);
            expect(cpu.status.C).toBe(false);
        });
    
        test("0x3E - ROL (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            ram.load(0x8000, "3E DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, 0b11001100);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(7);
            expect(ram.read(0xC0DE + 0x04)).toBe(0b10011001);
            expect(cpu.status.C).toBe(true);
        });
    });
    
    describe("EOR", () => {
        test("0x41 - EOR (IND_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "41 22");
            cpu.x = 0x04;
            ram.load(0x0022 + 0x04, "DE C0");
            ram.write(0xC0DE, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(cpu.a).toBe(result);
        });
    
        test("0x45 - EOR (ZP)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "45 22");
            ram.write(0x0022, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.a).toBe(result);
        });

        test("0x49 - EOR (IMM)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "49");
            ram.write(0x8001, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(result);
        });

        test("0x4D - EOR (ABS)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "4D DE C0");
            ram.write(0xC0DE, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });

        test("0x51 - EOR (IND_Y)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "51 22");
            ram.load(0x0022, "DE C0");
            cpu.y = 0x04;
            ram.write(0xC0DE + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.a).toBe(result);
        });

        test("0x55 - EOR (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "55 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });

        test("0x59 - EOR (ABS_Y)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "59 DE C0");
            cpu.y = 0x04;
            ram.write(0xC0DE + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });

        test("0x5D - EOR (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let b = 0b10101010;
            let result = 0b01100110;
    
            cpu.a = a;
    
            ram.load(0x8000, "5D DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, b);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.a).toBe(result);
        });
    });

    describe("LSR", () => {
        test("0x46 - LSR (ZP)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b01100110;
    
            ram.load(0x8000, "46 22");
            ram.write(0x0022, a);
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(ram.read(0x0022)).toBe(result);
            expect(cpu.status.C).toBe(false);
        });

        test("0x4A - LSR (Accum)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b01100110;
    
            cpu.a = a;
            ram.load(0x8000, "4A");
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(result);
            expect(cpu.status.C).toBe(false);
        });

        test("0x4E - LSR (ABS)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b01100110;
    
            ram.write(0xC0DE, a);
            ram.load(0x8000, "4E DE C0");
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0xC0DE)).toBe(result);
            expect(cpu.status.C).toBe(false);
        });

        test("0x56 - LSR (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b01100110;
    
            ram.load(0x8000, "56 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, a);
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0x0022 + 0x04)).toBe(result);
            expect(cpu.status.C).toBe(false);
        });

        test("0x5E - LSR (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            let a = 0b11001100;
            let result = 0b01100110;
    
            ram.load(0x8000, "5E DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, a);
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(7);
            expect(ram.read(0xC0DE + 0x04)).toBe(result);
            expect(cpu.status.C).toBe(false);
        });
    });
    
    describe("ROR", () => {
        test("0x66 - ROR (ZP)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            ram.load(0x8000, "66 22");
            ram.write(0x0022, 0b11001100);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(ram.read(0x0022)).toBe(0b11100110);
            expect(cpu.status.C).toBe(false);
        });
    
        test("0x6A - ROR (Accum)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            ram.load(0x8000, "6A");
            cpu.a = 0b11001100;
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.a).toBe(0b01100110);
            expect(cpu.status.C).toBe(false);
        });
    
        test("0x6E - ROR (ABS)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            ram.load(0x8000, "6E DE C0");
            ram.write(0xC0DE, 0b01001101);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0xC0DE)).toBe(0b00100110);
            expect(cpu.status.C).toBe(true);
        });
    
        test("0x76 - ROR (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            ram.load(0x8000, "76 22");
            cpu.x = 0x04;
            ram.write(0x0022 + 0x04, 0b01001101);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0x0022 + 0x04)).toBe(0b10100110);
            expect(cpu.status.C).toBe(true); 
        });
        
        test("0x7E - ROR (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            ram.load(0x8000, "7E DE C0");
            cpu.x = 0x04;
            ram.write(0xC0DE + 0x04, 0b11001101);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(7);
            expect(ram.read(0xC0DE + 0x04)).toBe(0b11100110);
            expect(cpu.status.C).toBe(true);
        });
    });
});