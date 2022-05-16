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

export const countCycles = (cpu: CPU, until: () => boolean, max: number = 100) => {
    let cycles = 0;
    while(!until() || cpu.cycles > 0) {
        if(cycles > max) {
            throw new Error("Maximum amount of cycles reached when counting cycles");
        }
        cycles++;
        cpu.clock();
    }
    return cycles;
};