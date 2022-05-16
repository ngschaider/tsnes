import { setupHardware, countCycles } from "../utils";

describe("CPU - DECREMENT", () => {
    test("0x88 - DEY (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D;

        ram.load(0x8000, "88");

        let cycles = countCycles(cpu, () => cpu.y === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0xC6 - DEC (ZP)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x0022, "3D");
        ram.load(0x8000, "C6 22");

        let cycles = countCycles(cpu, () => ram.read(0x0022) == 0x3C);
        expect(cycles).toBe(5);
    });
    
    test("0xCA - DEX (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load(0x8000, "CA");

        let cycles = countCycles(cpu, () => cpu.x === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0xCE - DEC (ABS)", () => {        
        let {cpu, ram} = setupHardware();

        ram.load(0xC0DE, "3D");
        ram.load(0x8000, "CE DE C0");

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) == 0x3C);
        expect(cycles).toBe(6);
    });
    
    test("0xD6 - DEC (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        cpu.x = 0x04;

        ram.load(0x0022 + 0x04, "3D");
        ram.load(0x8000, "D6 22");

        let cycles = countCycles(cpu, () => ram.read(0x0022 + 0x04) == 0x3C);
        expect(cycles).toBe(6);
    });
    
    test("0xDE - DEC (ABS_X)", () => {
        let {cpu, ram} = setupHardware();

        cpu.x = 0x04;

        ram.load(0xC0DE + 0x04, "3D");
        ram.load(0x8000, "DE DE C0");

        let cycles = countCycles(cpu, () => ram.read(0xC0DE + 0x04) == 0x3C);
        expect(cycles).toBe(7);
    });
    
});