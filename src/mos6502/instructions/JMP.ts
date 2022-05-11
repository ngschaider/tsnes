import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Jump To Location
// Function:    pc = address
export default class JMP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("JMP", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        let address = this.addressingMode.fetch(cpu);
        cpu.pc = address;
    }
}