import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Store Accumulator at Address
// Function:    M = A
export default class STA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("STA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        this.addressingMode.setData(cpu, cpu.A);
    }
}