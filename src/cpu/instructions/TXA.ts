import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Transfer X Register to Accumulator
// Function:    A = X
// Flags Out:   N, Z
export default class TXA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("TXA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
        super.execute(cpu);
        cpu.a = cpu.x;
        cpu.status.Z = cpu.a == 0x00;
        cpu.status.N = (cpu.a & 0x80) !== 0x00;
    }
}