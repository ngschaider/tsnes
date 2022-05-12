import { setupHardware, countCycles } from "./utils";

describe("CPU - TRANSFERS", () => {

    test("0x8A - TXA (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load("8A", 0x8000);

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0x98 - TYA (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D;

        ram.load("98", 0x8000);

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0x9A - TXS (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load("9A", 0x8000);

        let cycles = countCycles(cpu, () => cpu.stkp === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA8 - TAY (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D;

        ram.load("A8", 0x8000);

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(2);
    })

    test("0xAA - TAX (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D;

        ram.load("AA", 0x8000);

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    })
    
    test("0xBA - TSX (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.stkp = 0x3D;

        ram.load("BA", 0x8000);

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    })

});