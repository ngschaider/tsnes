import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Pop Status Register off Stack
// Function:    Status <- stack
export default class PLP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PLP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.status.fromUint8(cpu.popStack());
        cpu.status.U = true;
    }
}