import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Clear Decimal Flag
// Function:    D = 0
export default class CLD extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("CLD", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        cpu.status.D = false;
    }
}