import { setup } from "../utils";

describe("CPU - STACK", () => {
    test("0x08 - PHP (Implied)", () => {
        let {cpu, ram} = setup();

        cpu.status.fromUint8(0b10101101);
        ram.load(0x8000, "08");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(ram.read(0x01FD)).toBe(0b10101101);
    });
    
    test("0x28 - PLP (Implied)", () => {
        let {cpu, ram} = setup();

        cpu.pushStack(0b10101101);
        ram.load(0x8000, "28");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.status.toUint8()).toBe(0b10101101);
    });

    test("0x48 - PHA (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.a = 0x3D;

        ram.load(0x8000, "48");

        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(3);
        expect(ram.read(0x01FD)).toBe(0x3D);
    });

    test("0x68 - PLA (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.pushStack(0x3D);

        ram.load(0x8000, "68");
        
        cpu.stepInstruction();
        expect(cpu.totalCycles).toBe(4);
        expect(cpu.a).toBe(0x3D);
    });
});