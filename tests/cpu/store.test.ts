import { countCycles, setupHardware } from "./utils";

describe("CPU - STORE", () => {

    test("0x81 - STA (IZX)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load("81 22", 0x8000); // supply 0x22 as address
        ram.load("DE C0", 0x0022 + 0x04); // write the real addres 0xc0de at the ptr location

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(6);
    });
    
    test("0x84 - STY (ZP0)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D; // store this

        ram.load("84 DE", 0x8000); // store at 0x00de

        let cycles = countCycles(cpu, () => ram.read(0x00DE) === 0x3D);
        expect(cycles).toBe(3);
    });
    
    test("0x85 - STA (ZP0)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        ram.load("85 DE", 0x8000); // store at 0x00de

        let cycles = countCycles(cpu, () => ram.read(0x00DE) === 0x3D);
        expect(cycles).toBe(3);
    });
    
    test("0x86 - STX (ZP0)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D; // store this

        ram.load("86 DE", 0x8000); // store at 0x00de

        let cycles = countCycles(cpu, () => ram.read(0x00DE) === 0x3D);
        expect(cycles).toBe(3);
    });
    
    test("0x8C - STY (ABS)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D; // store this

        ram.load("8C DE C0", 0x8000); // store at 0xC0DE

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0x8D - STA (ABS)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        ram.load("8D DE C0", 0x8000); // store at 0xC0DE

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0x8E - STX (ABS)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D; // store this

        ram.load("8E DE C0", 0x8000); // store at 0xC0DE

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0x91 - STA (IZY)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        cpu.y = 0x04; // offset the supplied address with 0x04

        ram.load("91 22", 0x8000); // supply 0x22 as address
        ram.load("DE C0", 0x0022 + 0x04); // write the real addres 0xc0de at the ptr location

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(6);
    });
    
    test("0x94 - STY (ZPX)", () => {        
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D; // store this

        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load("94 22", 0x8000); // supply 0x22 as address
        ram.load("DE C0", 0x0022 + 0x04); // write the real addres 0xc0de at the ptr location

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0x95 - STA (ZPX)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load("95 22", 0x8000); // supply 0x22 as address
        ram.load("DE C0", 0x0022 + 0x04); // write the real addres 0xc0de at the ptr location

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0x96 - STX (ZPY)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D; // store this

        cpu.y = 0x04; // offset the supplied address with 0x04

        ram.load("96 22", 0x8000); // supply 0x22 as address
        ram.load("DE C0", 0x0022 + 0x04); // write the real addres 0xc0de at the ptr location

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0x99 - STA (ABY)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        cpu.y = 0x22; // offset

        ram.load("99 DE C0", 0x8000);

        let cycles = countCycles(cpu, () => ram.read(0xC0DE + 0x22) === 0x3D);
        expect(cycles).toBe(5);
    });

    test("0x9D - STA (ABX)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D; // store this

        cpu.x = 0x22; // offset

        ram.load("9D DE C0", 0x8000);

        let cycles = countCycles(cpu, () => ram.read(0xC0DE + 0x22) === 0x3D);
        expect(cycles).toBe(5);
    });
    
});