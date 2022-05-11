import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Branch if Carry Clear
// Function: if(C == 0) pc = address
export default class BCC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("BCC", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        if(!cpu.status.C) {
            cpu.cycles++;
            let address = this.addressingMode.fetch(cpu);

            // BCC takes one clock cycle longer if a page boundary is crossed
            if((address & 0xFF00) != (cpu.pc & 0xFF00)) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}