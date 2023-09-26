import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";


// Instruction: Bitwise Logic XOR
// Function:    A = A xor M
// Flags Out:   N, Z
export default class EOR extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("EOR", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        cpu.A ^= data;
        cpu.status.Z = cpu.A === 0x00;
        cpu.status.N = (cpu.A & 0x80) !== 0x00;

        if(this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}