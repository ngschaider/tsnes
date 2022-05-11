import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Branch if Overflow Set
// Function:    if(V == 1) pc = address
export default class BVS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("BVS", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        if(cpu.status.V) {
            cpu.cycles++;
            let address = this.addressingMode.fetch(cpu);

            if((address & 0xFF00) != (cpu.pc & 0xFF00)) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}