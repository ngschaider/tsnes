import { setupHardware, countCycles } from "./utils";

describe("CPU - DECREMENT", () => {
    test("0x88 - DEY (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D;

        ram.load("88", 0x8000);

        let cycles = countCycles(cpu, () => cpu.y === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0xCA - DEX (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load("CA", 0x8000);

        let cycles = countCycles(cpu, () => cpu.x === 0x3C);
        expect(cycles).toBe(2);
    });
});