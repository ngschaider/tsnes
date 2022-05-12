import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Increment Value at Memory Location
// Function:    M = M + 1
// Flags Out:   N, Z
export default class INC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("INC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address: uint16 = this.addressingMode.fetch(cpu);
        let data: uint8 = cpu.bus.read(address);

        let temp: uint16 = data + 1;
        cpu.bus.write(address, temp & 0x00FF);
        cpu.status.Z = (temp & 0x00FF) == 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;
    }
}