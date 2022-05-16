import { countCycles, setupHardware } from "../utils";

describe("CPU - STACK", () => {
    test("0x08 - PHP (Implied)", () => {
        let {cpu, ram} = setupHardware();

        cpu.status.fromUint8(0b10101101);
        ram.load("08", 0x8000);

        let cycles = countCycles(cpu, () => ram.read(0x01FD) === 0b10101101);
        expect(cycles).toBe(3);
    });
    
    test("0x28 - PLP (Implied)", () => {
        let {cpu, ram} = setupHardware();

        cpu.pushStack(0b10101101);
        ram.load("28", 0x8000);

        let cycles = countCycles(cpu, () => cpu.status.toUint8() === 0b10101101);
        expect(cycles).toBe(4);
    });

    test("0x48 - PHA (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.a = 0x3D;

        ram.load("48", 0x8000);

        let cycles = countCycles(cpu, () => ram.read(0x01FD) === 0x3D);
        expect(cycles).toBe(3);
    });

    test("0x68 - PLA (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.pushStack(0x3D);

        ram.load("68", 0x8000);

        let cycles = countCycles(cpu, () => cpu.a === 0x3D);
        expect(cycles).toBe(4);
    });
});