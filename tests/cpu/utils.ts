import Bus from "../../src/Bus";
import CPU from "../../src/cpu/CPU";
import RAM from "../../src/RAM";

export const setup = () => {
    let cpu = new CPU();
    let bus = new Bus();

    let ram = new RAM();
    ram.load(0xFFCC, "00 80"); // set reset vector

    bus.connectDevice(cpu);
    bus.connectDevice(ram);

    cpu.reset();
    cpu.complete();
    cpu.totalCycles = 0; // tests use this variable to measure time

    return {cpu, bus, ram}
}