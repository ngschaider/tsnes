import { setup } from "../utils";

describe("CPU - STORE", () => {
    test("0x81 - STA (IND_X)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D; // store this

        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "81 22"); // supply 0x22 as address
        ram.load(0x0022 + 0x04, "DE C0"); // write the real addres 0xc0de at the ptr location

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(6);
        expect(ram.read(0xC0DE)).toBe(0x3D);
    });
    
    test("0x84 - STY (ZP)", () => {
        let {cpu, ram} = setup();
        cpu.y = 0x3D; // store this

        ram.load(0x8000, "84 DE"); // store at 0x00de

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(ram.read(0x00DE)).toBe(0x3D);
    });
    
    test("0x85 - STA (ZP)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D; // store this

        ram.load(0x8000, "85 DE"); // store at 0x00de

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(ram.read(0x00DE)).toBe(0x3D);
    });
    
    test("0x86 - STX (ZP)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D; // store this

        ram.load(0x8000, "86 DE"); // store at 0x00de

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(ram.read(0x00DE)).toBe(0x3D);
    });
    
    test("0x8C - STY (ABS)", () => {
        let {cpu, ram} = setup();
        cpu.y = 0x3D; // store this

        ram.load(0x8000, "8C DE C0"); // store at 0xC0DE

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(ram.read(0xC0DE)).toBe(0x3D);
    });
    
    test("0x8D - STA (ABS)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D; // store this

        ram.load(0x8000, "8D DE C0"); // store at 0xC0DE

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(ram.read(0xC0DE)).toBe(0x3D);
    });
    
    test("0x8E - STX (ABS)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D; // store this

        ram.load(0x8000, "8E DE C0"); // store at 0xC0DE

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(ram.read(0xC0DE)).toBe(0x3D);
    });
    
    test("0x91 - STA (IND_Y)", () => {
        let {cpu, ram} = setup();

        cpu.a = 0x3D; // store this

        ram.load(0x8000, "91 22"); // supply 0x22 as address
        ram.load(0x0022, "DE C0"); // write the real addres 0xc0de at the ptr location
        cpu.y = 0x04; // offset the supplied address with 0x04

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(6);
        expect(ram.read(0xC0DE + 0x04)).toBe(0x3D);
    });
    
    test("0x94 - STY (ZP_X)", () => {        
        let {cpu, ram} = setup();

        cpu.y = 0x3D; // store this
        cpu.x = 0x04; // offset the supplied address with 0x04
        ram.load(0x8000, "94 22"); // supply 0x22 as address

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(ram.read(0x0022 + 0x04)).toBe(0x3D);
    });
    
    test("0x95 - STA (ZP_X)", () => {
        let {cpu, ram} = setup();

        cpu.a = 0x3D; // store this
        cpu.x = 0x04; // offset the supplied address with 0x04
        ram.load(0x8000, "95 22"); // supply 0x22 as address

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(ram.read(0x0022 + 0x04)).toBe(0x3D);
    });
    
    test("0x96 - STX (ZP_Y)", () => {
        let {cpu, ram} = setup();
        
        cpu.x = 0x3D; // store this
        cpu.y = 0x04; // offset the supplied address with 0x04
        ram.load(0x8000, "96 22"); // supply 0x22 as address

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(ram.read(0x0022 + 0x04)).toBe(0x3D);
    });
    
    test("0x99 - STA (ABS_Y)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D; // store this

        cpu.y = 0x22; // offset

        ram.load(0x8000, "99 DE C0");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(5);
        expect(ram.read(0xC0DE + 0x22)).toBe(0x3D);
    });

    test("0x9D - STA (ABS_X)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D; // store this

        cpu.x = 0x22; // offset

        ram.load(0x8000, "9D DE C0");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(5);
        expect(ram.read(0xC0DE + 0x22)).toBe(0x3D);
    }); 
});