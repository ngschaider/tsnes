import Bus from "../../src/mos6502/Bus";
import CPU from "../../src/mos6502/CPU";
import RAM from "../../src/mos6502/RAM";

export const setupHardware = () => {
    let cpu = new CPU();
    let bus = new Bus();

    let ram = new RAM();
    ram.load("00 80", 0xFFCC); // set reset vector

    bus.connectDevice(cpu);
    bus.connectDevice(ram);

    cpu.reset();
    cpu.workInstruction();

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