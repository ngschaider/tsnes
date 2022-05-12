import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Disable Interrupts / Clear Interrupt Flag
// Function:    I = 0
export default class CLI extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("CLI", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.status.I = false;
    }
}