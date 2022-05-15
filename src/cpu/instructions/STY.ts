import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Store Y Register at Address
// Function:    M = Y
export default class STY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("STY", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        this.addressingMode.setData(cpu, cpu.y);
    }
}