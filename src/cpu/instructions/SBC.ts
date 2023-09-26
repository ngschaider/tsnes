import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Subtraction with Borrow In
// Function:    A = A - M - (1 - C)
// Flags Out:   C, V, N, Z
//
// Explanation:
// Given the explanation for ADC above, we can reorganise our data
// to use the same computation for addition, for subtraction by multiplying
// the data by -1, i.e. make it negative
//
// A = A - M - (1 - C)  ->  A = A + -1 * (M - (1 - C))  ->  A = A + (-M + 1 + C)
//
// To make a signed positive number negative, we can invert the bits and add 1
// (OK, I lied, a little bit of 1 and 2s complement :P)
//
//  5 = 00000101
// -5 = 11111010 + 00000001 = 11111011 (or 251 in our 0 to 255 range)
//
// The range is actually unimportant, because if I take the value 15, and add 251
// to it, given we wrap around at 256, the result is 10, so it has effectively 
// subtracted 5, which was the original intention. (15 + 251) % 256 = 10
//
// Note that the equation above used (1-C), but this got converted to + 1 + C.
// This means we already have the +1, so all we need to do is invert the bits
// of M, the data(!) therfore we can simply add, exactly the same way we did 
// before.
export default class SBC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("SBC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        const sum = cpu.A - data - (cpu.status.C ? 1 : 0);
        let result = sum & 0xFF;

        cpu.status.C = sum > 0xFF;
        cpu.status.Z = result === 0;

        cpu.status.V = (((result ^ data) ^ 0xFF) & (result ^ sum) & 0x0080) !== 0;
        cpu.status.N = (cpu.A >> 7) ? true : false;

        cpu.A = result;

        if(this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}