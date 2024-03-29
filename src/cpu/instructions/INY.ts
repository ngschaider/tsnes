import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Increment Y Register
// Function:    Y = Y + 1
// Flags Out:   N, Z
export default class INY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("INY", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.Y++;

        cpu.status.Z = cpu.Y === 0x00;
        cpu.status.N = (cpu.Y & 0x80) !== 0x00;
    }
}