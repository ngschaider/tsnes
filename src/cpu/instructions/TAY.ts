import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";


// Instruction: Transfer Accumulator to Y Register
// Function:    Y = A
// Flags Out:   N, Z
export default class TAY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("TAY", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.Y = cpu.A;
        cpu.status.Z = cpu.Y == 0x00;
        cpu.status.N = (cpu.Y & 0x80) !== 0x00;
    }
}