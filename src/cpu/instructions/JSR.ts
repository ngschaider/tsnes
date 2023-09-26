import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Jump To Sub-Routine
// Function:    Push current pc to stack, pc = address
export default class JSR extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("JSR", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);
        cpu.pc--;

        cpu.pushStack((cpu.pc >> 8) & 0x00FF);
        cpu.pushStack(cpu.pc & 0x00FF);

        cpu.pc = address;
    }
}