import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Push Accumulator to Stack
// Function:    A -> stack
export default class PHA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PHA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.pushStack(cpu.A);
    }
}