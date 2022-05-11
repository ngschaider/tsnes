import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Push Accumulator to Stack
// Function:    A -> stack
export default class PHA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("PHA", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.pushStack(cpu.a);
    }
}