import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Bitwise Logic AND
// Function:    A = A & M
// Flags Out:   N, Z
export default class AND extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("AND", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        cpu.A &= data;
        cpu.status.Z = cpu.A === 0x00;
        cpu.status.N = (cpu.A & 0x80) !== 0x00;

        if(this.addressingMode.pageBoundaryCrossed && this.addressingMode.name !== "IND_X") {
            cpu.cycles++;
        }
    }
}