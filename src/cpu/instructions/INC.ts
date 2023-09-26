import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Increment Value at Memory Location
// Function:    M = M + 1
// Flags Out:   N, Z
export default class INC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("INC", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        let temp: uint16 = data + 1;
        this.addressingMode.setData(cpu, temp & 0x00FF);
        cpu.status.Z = (temp & 0x00FF) == 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;
    }
}