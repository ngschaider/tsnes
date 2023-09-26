import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Load The X Register
// Function:    X = M
// Flags Out:   N, Z
export default class LDX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("LDX", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        cpu.X = data;
        cpu.status.Z = cpu.X === 0x00;
        cpu.status.N = (cpu.X & 0x80) !== 0x00;

        if(this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}