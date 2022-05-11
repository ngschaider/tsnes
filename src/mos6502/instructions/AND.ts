import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class AND extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("AND", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        let address = this.addressingMode.fetch(cpu);
        let data = cpu.bus.read(address);
        cpu.a &= data;
        cpu.status.Z = cpu.a == 0x00;
        cpu.status.N = (cpu.a & 0x80) > 0;
    }
}