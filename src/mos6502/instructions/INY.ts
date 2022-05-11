import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Increment Y Register
// Function:    Y = Y + 1
// Flags Out:   N, Z
export default class INY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("INY", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        cpu.y++;

        cpu.status.Z = cpu.y === 0x00;
        cpu.status.N = (cpu.y & 0x80) !== 0x00;
    }
}