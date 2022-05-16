import { setup, countCycles } from "../utils";

describe("CPU - TRANSFERS", () => {
    test("0x8A - TXA (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D;

        ram.load(0x8000, "8A");

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0x98 - TYA (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.y = 0x3D;

        ram.load(0x8000, "98");

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0x9A - TXS (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.x = 0x3D;

        ram.load(0x8000, "9A");

        let cycles = countCycles(cpu, () => cpu.stkp === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA8 - TAY (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D;

        ram.load(0x8000, "A8");

        let cycles = countCycles(cpu, () => cpu.y === 0x3D);
        expect(cycles).toBe(2);
    })

    test("0xAA - TAX (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D;

        ram.load(0x8000, "AA");

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    })
    
    test("0xBA - TSX (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.stkp = 0x3D;

        ram.load(0x8000, "BA");

        let cycles = countCycles(cpu, () => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    })
});