import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Store Y Register at Address
// Function:    M = Y
export default class STY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("STY", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        let address = this.addressingMode.fetch(cpu);
        cpu.bus.write(address, cpu.y);
    }
}