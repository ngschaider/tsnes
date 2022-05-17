import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Branch if Overflow Clear
// Function:    if(V == 0) pc = address
export default class BVC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BVC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);
        if(!cpu.status.V) {
            cpu.cycles++;

            if(this.addressingMode.pageBoundaryCrossed) {
                cpu.cycles++;  // Add 2 to N if branch occurs to different page
            }

            cpu.pc = address;
        }
    }
}