import { setupHardware, countCycles } from "../utils";

describe("CPU - ARITHMETIC", () => {

    test("0x61 - ADC (IND_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "61 22");
        cpu.x = 0x04;
        ram.load(0x0022 + 0x04, "DE C0");
        ram.write(0xC0DE, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(6);
    });
    
        
    test("0x65 - ADC (ZP)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "65 22");
        ram.write(0x0022, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(3);
    });

    test("0x69 - ADC (IMM)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "69");
        ram.write(0x8001, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(2);
    });

    test("0x71 - ADC (IND_Y)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "71 22");
        ram.load(0x0022, "DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });

    test("0x71 - ADC (IND_Y) - PAGE BOUNDARY CROSSING", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "71 22");
        ram.load(0x0022, "DE C0");
        cpu.y = 0xFF;
        ram.write(0xC0DE + 0xFF, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(6);
    });
    
    test("0x75 - ADC (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "75 22");
        cpu.x = 0x04;
        ram.write(0x0022 + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });
    
    test("0x79 - ADC (ABS_Y)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "79 DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });

    test("0x79 - ADC (ABS_Y) - PAGE BOUNDARY CROSSING", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "79 DE C0");
        cpu.y = 0xFF;
        ram.write(0xC0DE + 0xFF, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });
    
    test("0x7D - ADC (ABS_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "7D DE C0");
        cpu.x = 0x04;
        ram.write(0xC0DE + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });

    test("0x7D - ADC (ABS_X) - PAGE BOUNDARY CROSSING", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b01110000;

        ram.load(0x8000, "7D DE C0");
        cpu.x = 0xFF;
        ram.write(0xC0DE + 0xFF, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });
    
    test("0xE1 - SBC (IND_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "E1 22");
        cpu.x = 0x04;
        ram.load(0x0022 + 0x04, "DE C0");
        ram.write(0xC0DE, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(6);
    });

    test("0xE5 - SBC (ZP)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "E5 22");
        ram.write(0x0022, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(3);
    });

    test("0xE9 - SBC (IMM)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "E9");
        ram.write(0x8001, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(2);
    });

    /*test("0xEB - SBC (Implied)", () => {
    
    });*/
    
    test("0xED - SBC (ABS)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "ED DE C0");
        ram.write(0xC0DE, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });
    
    test("0xF1 - SBC (IND_Y)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "F1 22");
        ram.load(0x0022, "DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(5);
    });
    
    test("0xF5 - SBC (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "F5 22");
        cpu.x = 0x04;
        ram.write(0x0022 + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });
    
    test("0xF9 - SBC (ABS_Y)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "F9 DE C0");
        cpu.y = 0x04;
        ram.write(0xC0DE + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });

    test("0xFD - SBC (ABS_X)", () => {
        let {cpu, ram} = setupHardware();

        let a = 0b01000110;
        let b = 0b00101010;
        let result = 0b00011100;

        ram.load(0x8000, "FD DE C0");
        cpu.x = 0x04;
        ram.write(0xC0DE + 0x04, b);
        cpu.a = a;

        let cycles = countCycles(cpu, () => cpu.a === result);
        expect(cycles).toBe(4);
    });
    
});