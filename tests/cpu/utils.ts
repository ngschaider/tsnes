import Bus from "../../src/bus/Bus";
import CPU_6502 from "../../src/cpu/CPU_6502";
import RAM from "../../src/RAM";

export const setup = () => {
    let bus = new Bus();

    let ram = new RAM(bus, 0x10_000);
    ram.load(0xFFCC, "00 80"); // set reset vector
    
    let cpu = new CPU_6502(bus);
    cpu.reset();
    cpu.complete();
    cpu.totalCycles = 0; // tests use this variable to measure time

    return {cpu, bus, ram};
}