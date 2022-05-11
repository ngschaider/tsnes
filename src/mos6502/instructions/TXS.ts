import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Transfer X Register to Stack Pointer
// Function:    stack pointer = X
export default class TXS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("TXS", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.stkp = cpu.x;
    }
}