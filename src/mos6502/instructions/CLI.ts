import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Disable Interrupts / Clear Interrupt Flag
// Function:    I = 0
export default class CLI extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("CLI", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        cpu.status.I = false;
    }
}