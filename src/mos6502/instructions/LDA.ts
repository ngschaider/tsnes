import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Load The Accumulator
// Function:    A = M
// Flags Out:   N, Z
export default class LDA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("LDA", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        let address: uint16 = this.addressingMode.fetch(cpu);
        let data: uint8 = cpu.bus.read(address);

        cpu.a = data;
        cpu.status.Z = cpu.a === 0x00;
        cpu.status.N = (cpu.a & 0x80) !== 0x00;
    }
}