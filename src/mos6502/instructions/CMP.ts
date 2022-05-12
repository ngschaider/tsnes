import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Compare Accumulator
// Function:    C <- A >= M      Z <- (A - M) == 0
// Flags Out:   N, C, Z
export default class CMP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("CMP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address: uint16 = this.addressingMode.fetch(cpu);
        let data: uint8 = cpu.bus.read(address);

        let temp: uint16 = cpu.a - data;

        cpu.status.C = cpu.a >= data;
        cpu.status.Z = (temp & 0x00FF) === 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;

        if(["IZY", "ABY", "ABX"].includes(this.addressingMode.name) && this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}