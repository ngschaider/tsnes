import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Pop Accumulator off Stack
// Function:    A <- stack
// Flags Out:   N, Z
export default class PLA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PLA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.A = cpu.popStack();
        cpu.status.Z = cpu.A === 0x00;
        cpu.status.N = (cpu.A & 0x80) !== 0x00;
    }
}