import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Push Status Register to Stack
// Function:    status -> stack
// Note:        Break flag is set to 1 before push
export default class PHP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PHP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.status.B = true;
        cpu.status.U = true;
        cpu.pushStack(cpu.status.toUint8());
        cpu.status.B = false;
        cpu.status.U = false;
    }
}