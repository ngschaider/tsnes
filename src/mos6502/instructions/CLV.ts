import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Clear Overflow Flag
// Function:    V = 0
export default class CLV extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("CLV", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        cpu.status.V = false;
    }
}