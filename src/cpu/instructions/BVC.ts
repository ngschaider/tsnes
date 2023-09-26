import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Branch if Overflow Clear
// Function:    if(V == 0) pc = address
export default class BVC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BVC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);

        if(!cpu.status.V) {
            cpu.cycles++;
            if(this.addressingMode.pageBoundaryCrossed) {
                cpu.cycles++;
            }

            cpu.pc = address;
        }
    }
}