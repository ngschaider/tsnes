import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";


// Instruction: Clear Overflow Flag
// Function:    V = 0
export default class CLV extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("CLV", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.status.V = false;
    }
}