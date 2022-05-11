import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Push Status Register to Stack
// Function:    status -> stack
// Note:        Break flag is set to 1 before push
export default class PHP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("PHP", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.status.B = true;
        cpu.status.U = true;
        cpu.pushStack(cpu.status.toUint8());
        cpu.status.B = false;
        cpu.status.U = false;
    }
}