import { setupHardware, countCycles } from "../utils";

describe("CPU - FLAGS", () => {

    test("0x18 - CLC (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.C = true;

        ram.load(0x8000, "18");

        let cycles = countCycles(cpu, () => !cpu.status.C);
        expect(cycles).toBe(2);
    });

    test("0x38 - SEC (Implied)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x8000, "38");

        let cycles = countCycles(cpu, () => cpu.status.C);
        expect(cycles).toBe(2);
    });

    test("0x58 - CLI (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.I = true;

        ram.load(0x8000, "58");

        let cycles = countCycles(cpu, () => !cpu.status.I);
        expect(cycles).toBe(2);
    })

    test("0x78 - SEI (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.I = false;

        ram.load(0x8000, "78");

        let cycles = countCycles(cpu, () => cpu.status.I);
        expect(cycles).toBe(2);
    });

    test("0xB8 - CLV (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.V = true;

        ram.load(0x8000, "B8");

        let cycles = countCycles(cpu, () => !cpu.status.V);
        expect(cycles).toBe(2);
    });

    test("0xD8 - CLD (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.D = true;

        ram.load(0x8000, "D8");

        let cycles = countCycles(cpu, () => !cpu.status.D);
        expect(cycles).toBe(2);
    });

    test("0xF8 - SED (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.D = false;

        ram.load(0x8000, "F8");

        let cycles = countCycles(cpu, () => cpu.status.D);
        expect(cycles).toBe(2);
    });

    

})