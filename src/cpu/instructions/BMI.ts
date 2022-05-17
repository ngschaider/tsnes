import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Branch if Negative
// Function:    if(N == 1) pc = address
export default class BMI extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BMI", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
        super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);
		
        if(cpu.status.N) {
            cpu.cycles++;
            if(this.addressingMode.pageBoundaryCrossed) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}