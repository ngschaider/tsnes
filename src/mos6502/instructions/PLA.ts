import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Pop Accumulator off Stack
// Function:    A <- stack
// Flags Out:   N, Z
export default class PLA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PLA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.a = cpu.popStack();
        cpu.status.Z = cpu.a === 0x00;
        cpu.status.N = (cpu.a & 0x80) !== 0x00;
    }
}