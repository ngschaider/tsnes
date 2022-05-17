import { setup } from "../utils";

describe("CPU - DECREMENT", () => {
    test("0x88 - DEY (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.y = 0x3D;

        ram.load(0x8000, "88");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.y).toBe(0x3C);
    });

    describe("DEC", () => {
        test("0xC6 - DEC (ZP)", () => {
            let {cpu, ram} = setup();
    
            ram.load(0x0022, "3D");
            ram.load(0x8000, "C6 22");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(ram.read(0x0022)).toBe(0x3C);
        });
        
        test("0xCE - DEC (ABS)", () => {        
            let {cpu, ram} = setup();
    
            ram.load(0xC0DE, "3D");
            ram.load(0x8000, "CE DE C0");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0xC0DE)).toBe(0x3C);
        });
        
        test("0xD6 - DEC (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.x = 0x04;
    
            ram.load(0x0022 + 0x04, "3D");
            ram.load(0x8000, "D6 22");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0x0022 + 0x04)).toBe(0x3C);
        });
        
        test("0xDE - DEC (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.x = 0x04;
    
            ram.load(0xC0DE + 0x04, "3D");
            ram.load(0x8000, "DE DE C0");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(7);
            expect(ram.read(0xC0DE + 0x04)).toBe(0x3C);
        });
    });
    
    test("0xCA - DEX (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D;

        ram.load(0x8000, "CA");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.x).toBe(0x3C);
    });
});