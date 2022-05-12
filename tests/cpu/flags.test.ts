import { setupHardware, countCycles } from "./utils";

describe("CPU - FLAGS", () => {

    test("0x18 - CLC (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.C = true;

        ram.load("18", 0x8000);

        let cycles = countCycles(cpu, () => !cpu.status.C);
        expect(cycles).toBe(2);
    });

    test("0x38 - SEC (IMP)", () => {
        let {cpu, ram} = setupHardware();

        ram.load("38", 0x8000);

        let cycles = countCycles(cpu, () => cpu.status.C);
        expect(cycles).toBe(2);
    });

    test("0x58 - CLI (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.I = true;

        ram.load("58", 0x8000);

        let cycles = countCycles(cpu, () => !cpu.status.I);
        expect(cycles).toBe(2);
    })

    test("0x78 - SEI (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.I = false;

        ram.load("78", 0x8000);

        let cycles = countCycles(cpu, () => cpu.status.I);
        expect(cycles).toBe(2);
    });

    test("0xB8 - CLV (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.V = true;

        ram.load("B8", 0x8000);

        let cycles = countCycles(cpu, () => !cpu.status.V);
        expect(cycles).toBe(2);
    });

    test("0xD8 - CLD (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.D = true;

        ram.load("D8", 0x8000);

        let cycles = countCycles(cpu, () => !cpu.status.D);
        expect(cycles).toBe(2);
    });

    test("0xF8 - SED (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.D = false;

        ram.load("F8", 0x8000);

        let cycles = countCycles(cpu, () => cpu.status.D);
        expect(cycles).toBe(2);
    });

    

})