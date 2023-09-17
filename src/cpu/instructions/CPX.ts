import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Compare X Register
// Function:    C <- X >= M      Z <- (X - M) == 0
// Flags Out:   N, C, Z
export default class CPX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("CPX", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        let temp: uint16 = cpu.X - data;

        cpu.status.C = cpu.X >= data;
        cpu.status.Z = (temp & 0x00FF) === 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;
    }
}