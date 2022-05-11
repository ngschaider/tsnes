import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Store Accumulator at Address
// Function:    M = A
export default class STA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("STA", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        let address = this.addressingMode.fetch(cpu);
        cpu.bus.write(address, cpu.a);
    }
}