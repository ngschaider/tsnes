import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Set Carry Flag
// Function:    C = 1
export default class SEC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("SEC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.status.C = true;
    }
}