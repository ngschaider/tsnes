import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Branch if Equal
// Function:    if(Z == 1) pc = address
export default class BEQ extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BEQ", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);

        if(cpu.status.Z) {
            cpu.cycles++;
            if(this.addressingMode.pageBoundaryCrossed) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}