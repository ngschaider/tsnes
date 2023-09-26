import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";


// Instruction: Transfer X Register to Stack Pointer
// Function:    stack pointer = X
export default class TXS extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("TXS", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        cpu.stkp = cpu.X;
    }
}