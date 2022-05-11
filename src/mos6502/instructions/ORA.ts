import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Bitwise Logic OR
// Function:    A = A | M
// Flags Out:   N, Z
export default class ORA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("ORA", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        let address = this.addressingMode.fetch(cpu);
        let data = cpu.bus.read(address);

        cpu.a |= data;
        cpu.status.Z = cpu.a === 0x00;
        cpu.status.N = (cpu.a & 0x80) !== 0x00;
    }
}