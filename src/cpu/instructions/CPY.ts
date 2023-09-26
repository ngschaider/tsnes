import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Compare Y Register
// Function:    C <- Y >= M      Z <- (Y - M) == 0
// Flags Out:   N, C, Z
export default class CPY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("CPY", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        let temp: uint16 = cpu.Y - data;

        cpu.status.C = cpu.Y >= data;
        cpu.status.Z = (temp & 0x00FF) === 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;
    }
}