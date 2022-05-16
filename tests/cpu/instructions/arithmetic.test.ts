import { setupHardware, countCycles } from "../utils";

describe("CPU - ARITHMETIC", () => {

    test("0x61 - ADC (IND_X)", () => {
    
    });
    
        
    test("0x65 - ADC (ZP)", () => {
    
    });

    test("0x69 - ADC (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b01001101;

        ram.load(0x8000, "69");
        ram.write(0x8001, 0b00110101);

        let cycles = countCycles(cpu, () => cpu.a === 0b10000010);
        expect(cycles).toBe(2);
    });

    test("0x71 - ADC (IND_Y)", () => {
    
    });
    
    test("0x75 - ADC (ZP_X)", () => {
    
    });
    
    test("0x79 - ADC (ABS_Y)", () => {
    
    });
    
    test("0x7D - ADC (ABS_X)", () => {
    
    });
    
    test("0xE1 - SBC (IND_X)", () => {
    
    });

    test("0xE5 - SBC (ZP)", () => {
    
    });

    test("0xE9 - SBC (IMM)", () => {
        
    });
    
    test("0xEB - SBC (Implied)", () => {
    
    });
    
    test("0xED - SBC (ABS)", () => {
    
    });
    
    test("0xF1 - SBC (IND_Y)", () => {
    
    });
    
    test("0xF5 - SBC (ZP_X)", () => {
    
    });
    
    test("0xF9 - SBC (ABS_Y)", () => {
    
    });

    test("0xFD - SBC (ABS_X)", () => {
    
    });
    
});