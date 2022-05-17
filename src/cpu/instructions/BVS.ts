import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Branch if Overflow Set
// Function:    if(V == 1) pc = address
export default class BVS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BVS", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);

        if(cpu.status.V) {
            cpu.cycles++;
            if(this.addressingMode.pageBoundaryCrossed) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}