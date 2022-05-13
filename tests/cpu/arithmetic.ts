import { setupHardware, countCycles } from "./utils";

describe("CPU - ARITHMETIC", () => {

    test("0x61 - ADC (IZX)", () => {
    
    });
    
        
    test("0x65 - ADC (ZP0)", () => {
    
    });

    test("0x69 - ADC (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b01001101;

        ram.load("69", 0x8000);
        ram.write(0x8001, 0b00110101);

        let cycles = countCycles(cpu, () => cpu.a === 0b10000010);
        expect(cycles).toBe(2);
    });

    test("0x71 - ADC (IZY)", () => {
    
    });
    
    test("0x75 - ADC (ZPX)", () => {
    
    });
    
    test("0x79 - ADC (ABY)", () => {
    
    });
    
    test("0x7D - ADC (ABX)", () => {
    
    });
    
    test("0xE1 - SBC (IZX)", () => {
    
    });

    test("0xE5 - SBC (ZP0)", () => {
    
    });

    test("0xE9 - SBC (IMM)", () => {
        
    });
    
    test("0xEB - SBC (IMP)", () => {
    
    });
    
    test("0xED - SBC (ABS)", () => {
    
    });
    
    test("0xF1 - SBC (IZY)", () => {
    
    });
    
    test("0xF5 - SBC (ZPX)", () => {
    
    });
    
    test("0xF9 - SBC (ABY)", () => {
    
    });

    test("0xFD - SBC (ABX)", () => {
    
    });
    
});