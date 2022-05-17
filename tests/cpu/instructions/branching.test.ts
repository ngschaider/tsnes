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
    
    test("0x10 - BPL (Relative) - TRUE", () => {
        const {ram, cpu} = setup();

        cpu.status.N = false;

        ram.load(0x8000, "10 AA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(cpu.pc).toBe(0x8002 + 0xAA);
    });

    test("0x10 - BPL (Relative) - PAGE BOUNDARY CROSSING", () => {
        const {ram, cpu} = setup();

        cpu.status.N = false;

        ram.load(0x8000, "10 FF");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.pc).toBe(0x8002 + 0xFF);
    });

    test("0x10 - BPL (Relative) - FALSE", () => {
        const {ram, cpu} = setup();

        cpu.status.N = true;

        ram.load(0x8000, "10 AA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.pc).toBe(0x8002);
    });
    
    test("0x20 - JSR (ABS)", () => {
        const {ram, cpu} = setup();

        ram.load(0x8000, "20 DE C0");

        cpu.stepInstruction();
        expect(cpu.pc).toBe(0xC0DE);
        expect(cpu.totalCycles).toBe(6);
        expect(ram.read(0x01FD)).toBe(0x80);
        expect(ram.read(0x01FC)).toBe(0x02);
    });
    
    test("0x24 - BIT (ZP)", () => {
        let {cpu, ram} = setup();

        cpu.status.Z = true;
        cpu.status.N = true;
        cpu.status.V = false;

        ram.load(0x8000, "24 77");
        ram.write(0x0077, 0b01000000);
        cpu.a = 0b11000000;

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(cpu.status.Z).toBe(false);
        expect(cpu.status.N).toBe(false);
        expect(cpu.status.V).toBe(true);
    });

    test("0x2C - BIT (ABS)", () => {
        let {cpu, ram} = setup();

        cpu.status.Z = true;
        cpu.status.N = false;
        cpu.status.V = false;

        ram.load(0x8000, "2C DE C0");
        ram.write(0xC0DE, 0b11100110);
        cpu.a = 0b11000000;

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.Z).toBe(false);
        expect(cpu.status.N).toBe(true);
        expect(cpu.status.V).toBe(true);
    });
    
    test("0x30 - BMI (Relative) - TRUE", () => {
        const {ram, cpu} = setup();

        cpu.status.N = true;

        ram.load(0x8000, "30 AA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(cpu.pc).toBe(0x8002 + 0xAA);
    });

    test("0x30 - BMI (Relative) - PAGE BOUNDARY CROSSING", () => {
        const {ram, cpu} = setup();

        cpu.status.N = true;

        ram.load(0x8000, "30 FF");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.pc).toBe(0x8002 + 0xFF);
    });

    test("0x30 - BMI (Relative) - FALSE", () => {
        const {ram, cpu} = setup();

        cpu.status.N = false;

        ram.load(0x8000, "30 AA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.pc).toBe(0x8002);
    });
    
    test("0x40 - RTI (Implied)", () => {
        let {cpu, ram} = setup();

        cpu.status.I = true;
        cpu.pushStack(0xC0);
        cpu.pushStack(0xDE);
        cpu.pushStack(0b10101101);
        
        ram.load(0x8000, "40");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(6);
        expect(cpu.pc).toBe(0xC0DE);
        expect(cpu.status.toUint8()).toBe(0b10101101);
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