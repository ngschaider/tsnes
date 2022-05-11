import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Set Carry Flag
// Function:    C = 1
export default class SEC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("SEC", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.status.C = true;
    }
}