import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Jump To Location
// Function:    pc = address
export default class JMP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("JMP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let address = this.addressingMode.getAddress(cpu);
        cpu.pc = address;
    }
}