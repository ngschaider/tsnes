import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class RTS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("RTS", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.pc = cpu.popStack();
        cpu.pc |= cpu.popStack() << 8;

        cpu.pc++;
    }
}