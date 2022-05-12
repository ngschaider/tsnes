import { setupHardware, countCycles } from "./utils";

describe("CPU - INCREMENT", () => {
    test("0xE8 - INX (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load("E8", 0x8000);

        let cycles = countCycles(cpu, () => cpu.x === 0x3E);
        expect(cycles).toBe(2);
    });

    test("0xC8 - INY (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D;

        ram.load("C8", 0x8000);

        let cycles = countCycles(cpu, () => cpu.y === 0x3E);
        expect(cycles).toBe(2);
    })
});