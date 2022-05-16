import Bus from "../../../src/Bus";
import CPU from "../../../src/cpu/CPU";
import RAM from "../../../src/RAM";

describe("CPU - BASICS", () => {
    const setup = () => {
        let cpu = new CPU();
        let bus = new Bus();
        let ram = new RAM();

        bus.connectDevice(cpu);
        bus.connectDevice(ram);

        return {
            cpu, 
            ram, 
            bus
        };
    }

    test("reset()", () => {
        let {ram, cpu} = setup();
        
        ram.load(0xFFCC, "DE C0");
        cpu.reset();

        expect(cpu.cycles).toBe(8);

        cpu.complete();

        expect(cpu.cycles).toBe(0);
        expect(cpu.pc).toBe(0xC0DE);
        expect(cpu.stkp).toBe(0xFD);
    });

    test("pushStack()", () => {
        let {ram, cpu} = setup();

        cpu.pushStack(0x3D);
        expect(cpu.stkp).toBe(0xFD - 1);
        expect(ram.read(0x01FD)).toBe(0x3D);
    })

    test("popStack()", () => {
        let {ram, cpu} = setup();

        ram.write(0x01FD, 0x3D);
        cpu.stkp = 0xFC;

        let popped = cpu.popStack();
        expect(cpu.stkp).toBe(0xFD);
        expect(popped).toBe(0x3D);
    });
});