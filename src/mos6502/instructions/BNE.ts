import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Branch if Not Equal
// Function:    if(Z == 0) pc = address
export default class BNE extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("BNE", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        if(!cpu.status.Z) {
            cpu.cycles++;
            let address = this.addressingMode.fetch(cpu);

            if((address & 0xFF00) != (cpu.pc & 0xFF00)) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}