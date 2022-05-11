import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Jump To Sub-Routine
// Function:    Push current pc to stack, pc = address
export default class JSR extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("JSR", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        let address = this.addressingMode.fetch(cpu);
        cpu.pc--;

        cpu.pushStack((cpu.pc >> 8) & 0x00FF);
        cpu.pushStack(cpu.pc & 0x00FF);

        cpu.pc = address;
    }
}