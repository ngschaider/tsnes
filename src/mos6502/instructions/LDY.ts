import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Load The Y Register
// Function:    Y = M
// Flags Out:   N, Z
export default class LDY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("LDY", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address: uint16 = this.addressingMode.fetch(cpu);
        let data: uint8 = cpu.bus.read(address);

        cpu.y = data;
        cpu.status.Z = cpu.y === 0x00;
        cpu.status.N = (cpu.y & 0x80) !== 0x00;

        if(["ABX"].includes(this.addressingMode.name) && this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}