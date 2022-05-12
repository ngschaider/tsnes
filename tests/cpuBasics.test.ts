import Bus from "../src/mos6502/Bus";
import CPU from "../src/mos6502/CPU";
import RAM from "../src/mos6502/RAM";

let bus: Bus;
let ram: RAM;
let cpu: CPU;

describe("CPU - BASICS", () => {
    const setupHardware = () => {
        cpu = new CPU();
        bus = new Bus();
        ram = new RAM();

        bus.connectDevice(cpu);
        bus.connectDevice(ram);
    }

    test("reset()", () => {
        setupHardware();
        
        ram.load("DE C0", 0xFFCC);
        cpu.reset();

        expect(cpu.cycles).toBe(8);

        for(let i = 0; i < 8; i++) {
            cpu.clock();
        }

        expect(cpu.cycles).toBe(0);
        expect(cpu.pc).toBe(0xC0DE);
        expect(cpu.stkp).toBe(0xFD);
    });

    test("pushStack()", () => {
        setupHardware();

        cpu.pushStack(0x3D);
        expect(cpu.stkp).toBe(0xFD - 1);
        expect(ram.read(0x0100 + 0xFD)).toBe(0x3D);
    })

    test("popStack()", () => {
        setupHardware();

        cpu.pushStack(0x3D);
        let popped = cpu.popStack();
        expect(cpu.stkp).toBe(0xFD);
        expect(popped).toBe(0x3D);
    });
});