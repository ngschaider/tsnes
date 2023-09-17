import { setup } from "../utils";

describe("CPU - INCREMENT", () => {
    test("0xE8 - INX (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.X = 0x3D;

        ram.load(0x8000, "E8");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.X).toBe(0x3E);
    });

    test("0xC8 - INY (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.Y = 0x3D;

        ram.load(0x8000, "C8");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.Y).toBe(0x3E);
    })
    
    describe("INC", () => {
        test("0xE6 - INC (ZP)", () => {
            let {cpu, ram} = setup();
    
            ram.load(0x0022, "3D");
            ram.load(0x8000, "E6 22");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(ram.read(0x0022)).toBe(0x3E);
        });
        
        test("0xEE - INC (ABS)", () => {
            let {cpu, ram} = setup();
    
            ram.load(0xC0DE, "3D");
            ram.load(0x8000, "EE DE C0");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0xC0DE)).toBe(0x3E);
        });
        
        test("0xF6 - INC (ZP_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.X = 0x04;
    
            ram.load(0x0022 + 0x04, "3D");
            ram.load(0x8000, "F6 22");
            
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(ram.read(0x0022 + 0x04)).toBe(0x3E);
        });
            
        test("0xFE - INC (ABS_X)", () => {
            let {cpu, ram} = setup();
    
            cpu.X = 0x04;
    
            ram.load(0x8000, "FE DE C0");
            ram.load(0xC0DE + 0x04, "3D");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(7);
            expect(ram.read(0xC0DE + 0x04)).toBe(0x3E);
        });
    });

});