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
    
    test("0xC5 - CMP (ZP) - TRUE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = false;

        cpu.a = 0xDD;
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

        cpu.a = 0x3D;
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

        cpu.a = 0xDD;
        ram.load(0x8000, "C9 3D");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(2);
        expect(cpu.status.C).toBe(true);
        expect(cpu.status.Z).toBe(false);
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
    
    test("0xCD - CMP (ABS) - TRUE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = false;

        cpu.a = 0xDD;
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

        cpu.a = 0x3D;
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

        cpu.a = 0xAA;
        ram.load(0x8000, "D1 22");
        ram.load(0x0022, "DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, 0x3D);

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(5);
        expect(cpu.status.C).toBe(true);
        expect(cpu.status.Z).toBe(false);
    });

    test("0xD1 - CMP (IND_Y) - FALSE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = true;

        cpu.a = 0x3D;
        ram.load(0x8000, "D1 22");
        ram.load(0x0022, "DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, 0xAA);

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(5);
        expect(cpu.status.C).toBe(false);
        expect(cpu.status.Z).toBe(false);
    });
    
    test("0xD5 - CMP (ZP_X) - TRUE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = false;

        cpu.a = 0x44;
        ram.load(0x8000, "D5 22");
        cpu.x = 0x04;
        ram.write(0x0022 + 0x04, 0x3D);

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.C).toBe(true);
        expect(cpu.status.Z).toBe(false);
    });

    test("0xD5 - CMP (ZP_X) - FALSE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = true;

        cpu.a = 0x3D;
        ram.load(0x8000, "D5 22");
        cpu.x = 0x04;
        ram.write(0x0022 + 0x04, 0xAA);

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.C).toBe(false);
        expect(cpu.status.Z).toBe(false);
    });
    
    test("0xD9 - CMP (ABS_Y) - TRUE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = false;

        cpu.a = 0xAD;
        ram.load(0x8000, "D9 DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, 0x3D);        

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.C).toBe(true);
        expect(cpu.status.Z).toBe(false);
    });

    test("0xD9 - CMP (ABS_Y) - FALSE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = true;

        cpu.a = 0x3D;
        ram.load(0x8000, "D9 DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, 0xAA);

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.C).toBe(false);
        expect(cpu.status.Z).toBe(false);
    });
    
    test("0xDD - CMP (ABS_X) - TRUE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = false;

        cpu.a = 0xAD;
        ram.load(0x8000, "DD DE C0");
        cpu.x = 0x04;
        ram.write(0xC0DE + 0x04, 0x3D);        

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.C).toBe(true);
        expect(cpu.status.Z).toBe(false);
    });

    test("0xDD - CMP (ABS_X) - FALSE", () => {
        const {cpu, ram} = setup();

        cpu.status.C = true;

        cpu.a = 0x3D;
        ram.load(0x8000, "DD DE C0");
        cpu.x = 0x04;
        ram.write(0xC0DE + 0x04, 0xAA);

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.C).toBe(false);
        expect(cpu.status.Z).toBe(false);
    });
        
    test("0xE4 - CPX (ZP)", () => {
    
    });
    
    test("0xEC - CPX (ABS)", () => {
    
    });
    
})