import { setupHardware, countCycles } from "./utils";

describe("CPU - ARITHMETIC", () => {
    test("0x69 - ADC (IMM)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0b01001101;

        ram.load("69", 0x8000);
        ram.write(0x8001, 0b00110101);

        let cycles = countCycles(cpu, () => cpu.a === 0b10000010);
        expect(cycles).toBe(2);
    });

    test("0xE9 - SBC (IMM)", () => {
        
    });

        
    test("0x65 - ADC (ZP0)", () => {
    
    });
});