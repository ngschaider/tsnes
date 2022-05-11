import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class BIT extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("BIT", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        let address = this.addressingMode.fetch(cpu);
        let data = cpu.bus.read(address);
        let temp: uint8 = cpu.a & data;
        cpu.status.Z = (temp & 0x00FF) == 0x00;
        cpu.status.N = (data & (1 << 7)) > 0;
        cpu.status.V = (data & (1 << 6)) > 0;
    }
}