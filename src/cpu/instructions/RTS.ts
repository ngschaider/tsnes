import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

export default class RTS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("RTS", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.pc = cpu.popStack();
        cpu.pc |= cpu.popStack() << 8;

        cpu.pc++;
    }
}