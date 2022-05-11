import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Clear Carry Flag
// Function:    C = 0
export default class CLC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("CLC", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        cpu.status.C = false;
    }
}