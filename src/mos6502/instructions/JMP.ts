import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Jump To Location
// Function:    pc = address
export default class JMP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("JMP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.fetch(cpu);
        cpu.pc = address;
    }
}