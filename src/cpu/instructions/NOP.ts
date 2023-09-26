import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

export default class NOP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("NOP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        // NOP (no operation)
    }
}