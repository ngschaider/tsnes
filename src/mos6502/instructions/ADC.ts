import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class ADC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("ADC", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        let address = this.addressingMode.fetch(cpu);
        let data: uint8 = cpu.bus.read(address);

        let temp: uint16 = cpu.a + data + (cpu.status.C ? 1 : 0);

        // The carry flag out exists in the high byte bit 0
        cpu.status.C = temp > 0xFF;

        // The Zero flag is set if the result is 0
        cpu.status.Z = (temp & 0x00FF) === 0;

        // The signed Overflow flag is set based on all that up there! :D
        cpu.status.V = ((~(cpu.a ^ data)) & (cpu.a ^ temp) & 0x0080) > 0;

        // The negative flag is set if the MSB is set
        cpu.status.N = (temp & 0x80) > 0;

        // Load the result into the accumulator (it's 8-bit, don't forget!)
        cpu.a = temp & 0x00FF;
    }
}