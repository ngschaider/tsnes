import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Branch if Carry Clear
// Function: if(C == 0) pc = address
export default class BCC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BCC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        if(!cpu.status.C) {
            let address = this.addressingMode.getAddress(cpu);

            if((address & 0xFF00) === (cpu.pc & 0xFF00)) {
                cpu.cycles += 1; // Add 1 to N if branch occurs to same page
            } else {
                cpu.cycles += 2;  // Add 2 to N if branch occurs to different page
            }

            cpu.pc = address;
        }
    }
}