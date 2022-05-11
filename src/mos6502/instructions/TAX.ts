import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Transfer Accumulator to X Register
// Function:    X = A
// Flags Out:   N, Z
export default class TAX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("TAX", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.x = cpu.a;
        cpu.status.Z = cpu.x == 0x00;
        cpu.status.N = (cpu.x & 0x80) !== 0x00;
    }
}