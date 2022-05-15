import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

export default class NOP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("NOP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        // NOP (no operation)
    }
}