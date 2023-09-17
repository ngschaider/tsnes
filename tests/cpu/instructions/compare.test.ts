import { setup } from "../utils";

describe("CPU - COMPARE", () => {
    describe("CPX", () => {
        test("0xE0 - CPX (IMM) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.X = 0xDD;
            ram.load(0x8000, "E0 3D");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xE0 - CPX (IMM) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.X = 0x3D;
            ram.load(0x8000, "E0 AA");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });

        test("0xE4 - CPX (ZP) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.X = 0xDD;
            ram.load(0x8000, "E4 22");
            ram.write(0x0022, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xE4 - CPX (ZP) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.X = 0x3D;
            ram.load(0x8000, "E4 22");
            ram.write(0x0022, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
        
        test("0xEC - CPX (ABS) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.X = 0xDD;
            ram.load(0x8000, "EC DE C0");
            ram.write(0xC0DE, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xEC - CPX (ABS) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.X = 0x3D;
            ram.load(0x8000, "EC DE C0");
            ram.write(0xC0DE, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });  
    });
    
    describe("CPY", () => {
        test("0xC0 - CPY (IMM) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.Y = 0xDD;
            ram.load(0x8000, "C0 3D");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xC0 - CPY (IMM) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.Y = 0x3D;
            ram.load(0x8000, "C0 AA");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });   
        
        test("0xC4 - CPY (ZP) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.Y = 0xDD;
            ram.load(0x8000, "C4 22");
            ram.write(0x0022, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xC4 - CPY (ZP) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.Y = 0x3D;
            ram.load(0x8000, "C4 22");
            ram.write(0x0022, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });

        test("0xCC - CPY (ABS) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.Y = 0xDD;
            ram.load(0x8000, "CC DE C0");
            ram.write(0xC0DE, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xCC - CPY (ABS) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.Y = 0x3D;
            ram.load(0x8000, "CC DE C0");
            ram.write(0xC0DE, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });

        
    });
    
    describe("CMP", () => {
        test("0xC1 - CMP (IND_X) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xAA;
            ram.load(0x8000, "C1 22");        
            cpu.X = 0x04;
            ram.load(0x0022 + 0x04, "DE C0");
            ram.write(0xC0DE, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xC1 - CMP (IND_X) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "C1 22");
            cpu.X = 0x04;
            ram.load(0x0022 + 0x04, "DE C0");
            ram.write(0xC0DE, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(6);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });

        test("0xC5 - CMP (ZP) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xDD;
            ram.load(0x8000, "C5 22");
            ram.write(0x0022, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xC5 - CMP (ZP) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "C5 22");
            ram.write(0x0022, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(3);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
        
        test("0xC9 - CMP (IMM) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xDD;
            ram.load(0x8000, "C9 3D");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xC9 - CMP (IMM) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "C9 DD");
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(2);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });

        test("0xCD - CMP (ABS) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xDD;
            ram.load(0x8000, "CD DE C0");
            ram.write(0xC0DE, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xCD - CMP (ABS) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "CD DE C0");
            ram.write(0xC0DE, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xD1 - CMP (IND_Y) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xAA;
            ram.load(0x8000, "D1 22");
            ram.load(0x0022, "DE C0");
            cpu.Y = 0x04;
            ram.write(0xC0DE + 0x04, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xD1 - CMP (IND_Y) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "D1 22");
            ram.load(0x0022, "DE C0");
            cpu.Y = 0x04;
            ram.write(0xC0DE + 0x04, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(5);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
        
        test("0xD5 - CMP (ZP_X) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0x44;
            ram.load(0x8000, "D5 22");
            cpu.X = 0x04;
            ram.write(0x0022 + 0x04, 0x3D);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xD5 - CMP (ZP_X) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "D5 22");
            cpu.X = 0x04;
            ram.write(0x0022 + 0x04, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
        
        test("0xD9 - CMP (ABS_Y) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xAD;
            ram.load(0x8000, "D9 DE C0");
            cpu.Y = 0x04;
            ram.write(0xC0DE + 0x04, 0x3D);        
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xD9 - CMP (ABS_Y) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "D9 DE C0");
            cpu.Y = 0x04;
            ram.write(0xC0DE + 0x04, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
        
        test("0xDD - CMP (ABS_X) - TRUE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = false;
    
            cpu.A = 0xAD;
            ram.load(0x8000, "DD DE C0");
            cpu.X = 0x04;
            ram.write(0xC0DE + 0x04, 0x3D);        
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(true);
            expect(cpu.status.Z).toBe(false);
        });
    
        test("0xDD - CMP (ABS_X) - FALSE", () => {
            const {cpu, ram} = setup();
    
            cpu.status.C = true;
    
            cpu.A = 0x3D;
            ram.load(0x8000, "DD DE C0");
            cpu.X = 0x04;
            ram.write(0xC0DE + 0x04, 0xAA);
    
            cpu.stepInstruction();
            expect(cpu.totalCycles).toBe(4);
            expect(cpu.status.C).toBe(false);
            expect(cpu.status.Z).toBe(false);
        });
    });
})