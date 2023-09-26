import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Decrement X Register
// Function:    X = X - 1
// Flags Out:   N, Z
export default class DEX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("DEX", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.X--;
        cpu.status.Z = cpu.X === 0x00;
        cpu.status.N = (cpu.X & 0x80) !== 0x00;
    }
}