import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Store X Register at Address
// Function:    M = X
export default class STX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("STX", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        let address = this.addressingMode.fetch(cpu);
        cpu.bus.write(address, cpu.x);
    }
}