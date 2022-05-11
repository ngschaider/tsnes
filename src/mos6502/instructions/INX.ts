import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Increment X Register
// Function:    X = X + 1
// Flags Out:   N, Z
export default class INX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("INX", opcode, addressingMode);
    }

    execute(cpu: CPU) {
        cpu.x++;

        cpu.status.Z = cpu.x === 0x00;;
        cpu.status.N = (cpu.x & 0x80) !== 0x00;
    }
}