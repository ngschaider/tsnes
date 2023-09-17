import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";


// Instruction: Transfer Y Register to Accumulator
// Function:    A = Y
// Flags Out:   N, Z
export default class TYA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("TYA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.A = cpu.Y;
        cpu.status.Z = cpu.A == 0x00;
        cpu.status.N = (cpu.A & 0x80) !== 0x00;
    }
}