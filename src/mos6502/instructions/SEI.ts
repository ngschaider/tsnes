import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Set Interrupt Flag / Enable Interrupts
// Function:    I = 1
export default class SEI extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("SEI", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.status.I = true;
    }
}