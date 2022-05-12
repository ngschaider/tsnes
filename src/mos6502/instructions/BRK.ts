import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Break
// Function:    Program Sourced Interrupt
export default class BRK extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BRK", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.pc++;

        cpu.status.I = true;
        cpu.pushStack((cpu.pc >> 8) & 0x00FF);
        cpu.pushStack(cpu.pc & 0x00FF);

        cpu.status.B = true;
        cpu.pushStack(cpu.status.toUint8());
        cpu.status.B = false;

        cpu.pc = cpu.bus.read(0xFFFE) | (cpu.bus.read(0xFFFF) << 8);
    }
}