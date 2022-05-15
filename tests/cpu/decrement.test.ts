import { setupHardware, countCycles } from "./utils";

describe("CPU - DECREMENT", () => {
    test("0x88 - DEY (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D;

        ram.load("88", 0x8000);

        let cycles = countCycles(cpu, () => cpu.y === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0xC6 - DEC (ZP)", () => {
    
    });
    
    test("0xCA - DEX (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load("CA", 0x8000);

        let cycles = countCycles(cpu, () => cpu.x === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0xCE - DEC (ABS)", () => {
    
    });
    
    test("0xD6 - DEC (ZPX)", () => {
    
    });
    
    test("0xDE - DEC (ABS_X)", () => {
    
    });
    
});