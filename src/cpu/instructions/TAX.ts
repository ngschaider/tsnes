import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Transfer Accumulator to X Register
// Function:    X = A
// Flags Out:   N, Z
export default class TAX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("TAX", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.X = cpu.A;
        cpu.status.Z = cpu.X == 0x00;
        cpu.status.N = (cpu.X & 0x80) !== 0x00;
    }
}