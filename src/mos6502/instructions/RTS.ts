import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class RTS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("RTS", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.pc = cpu.popStack();
        cpu.pc |= cpu.popStack() << 8;

        cpu.pc++;
    }
}