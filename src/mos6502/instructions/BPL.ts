import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Branch if Positive
// Function:    if(N == 0) pc = address
export default class BPL extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("BPL", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        if(!cpu.status.N) {
            cpu.cycles++;
            let address = this.addressingMode.fetch(cpu);

            if((address & 0xFF00) != (cpu.pc & 0xFF00)) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}

