import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Transfer Stack Pointer to X Register
// Function:    X = stack pointer
// Flags Out:   N, Z
export default class TSX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("TSX", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.x = cpu.stkp;
        cpu.status.Z = cpu.x == 0x00;
        cpu.status.N = (cpu.x & 0x80) !== 0x00;
    }
}