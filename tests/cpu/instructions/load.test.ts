import { setupHardware, countCycles } from "../utils";

describe("CPU - LOAD", () => {

    test("0xA0 - LDY (IMM)", () => {
        let {cpu, ram} = setupHardware();

        // LDY #$3D
        ram.load(0x8000, "A0 3D");

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA1 - LDA (IND_X)", () => {
        let {cpu, ram} = setupHardware();
        ram.write(0xC0DE, 0x3D); // load this

        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "A1 22"); // supply 0x22 as address
        ram.load(0x0022 + 0x04, "DE C0"); // write the real address 0xC0DE at the ptr location

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(6);
    });

    test("0xA2 - LDX (IMM)", () => {
        let {cpu, ram} = setupHardware();

        // LDX #$3D
        ram.load(0x8000, "A2 3D");

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA4 - LDY (ZP)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "A4 AB"); // supply 0xDE as address
        ram.load(0x00AB, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(3);
    });
    
    test("0xA5 - LDA (ZP)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "A5 AB"); // supply 0xDE as address
        ram.load(0x00AB, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(3);
    });
    
    test("0xA6 - LDX (ZP)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "A6 AB"); // supply 0xDE as address
        ram.load(0x00AB, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(3);
    });

    test("0xA9 - LDA (IMM)", () => {
        let {cpu, ram} = setupHardware();
        
        ram.load(0x8000, "A9 3D");

        let cycles = countCycles(cpu, () => cpu.a === 0x3D); 
        expect(cycles).toBe(2);
    });
    
    test("0xAC - LDY (ABS)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "AC DE C0"); // supply 0xDE as address
        ram.load(0xC0DE, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xAD - LDA (ABS)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "AD DE C0"); // supply 0xDE as address
        ram.load(0xC0DE, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xAE - LDX (ABS)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "AE DE C0"); // supply 0xC0DE as address
        ram.load(0xC0DE, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(4);
    });

    test("0xB1 - LDA (IND_Y)", () => {
        let {cpu, ram} = setupHardware();
        
        cpu.y = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "B1 22"); // supply 0x22 as address
        ram.load(0x0022, "88 00"); // write the real address 0xC0DE at the ptr location
        ram.load(0x0088 + 0x04, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(5);
    });

    test("0xB1 - LDA (IND_Y) - PAGE BOUNDARY CROSSING", () => {
        let {cpu, ram} = setupHardware();

        cpu.y = 0xFF; // offset the supplied address with 0x04

        ram.load(0x8000, "B1 22"); // supply 0x22 as address
        ram.load(0x0022, "DE C0"); // write the real address 0xC0DE at the ptr location
        ram.write(0xC0DE + 0xFF, 0x3D); // load this

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(6);
    });
    
    test("0xB4 - LDY (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "B4 22"); // supply 0x22 as address
        ram.load(0x0022 + 0x04, "3D"); // load this

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xB5 - LDA (ZP_X)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "B5 22"); // supply 0x22 as address
        ram.load(0x0022 + 0x04, "3D"); // write the real address 0xC0DE at the ptr location

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xB6 - LDX (ZP_Y)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "B6 22"); // supply 0x22 as address
        ram.load(0x0022 + 0x04, "3D"); // write the real address 0xC0DE at the ptr location

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xB9 - LDA (ABS_Y)", () => {
        let {cpu, ram} = setupHardware();
        
        cpu.y = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "B9 DE C0"); // supply 0xC0DE as address
        ram.load(0xC0DE + 0x04, "3D"); // write value at target address

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xBC - LDY (ABS_X)", () => {
        let {cpu, ram} = setupHardware();
        
        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "BC DE C0"); // supply 0xC0DE as address
        ram.load(0xC0DE + 0x04, "3D"); // write value at target address

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xBD - LDA (ABS_X)", () => {
        let {cpu, ram} = setupHardware();
        
        cpu.x = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "BD DE C0"); // supply 0xC0DE as address
        ram.load(0xC0DE + 0x04, "3D"); // write value at target address

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(4);
    });
    
    test("0xBE - LDX (ABS_Y)", () => {
        let {cpu, ram} = setupHardware();
        
        cpu.y = 0x04; // offset the supplied address with 0x04

        ram.load(0x8000, "BE DE C0"); // supply 0xC0DE as address
        ram.load(0xC0DE + 0x04, "3D"); // write value at target address

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(4);
    });
    
})