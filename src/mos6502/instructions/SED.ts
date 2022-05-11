import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Set Decimal Flag
// Function:    D = 1
export default class SED extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("SED", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.status.D = true;
    }
}