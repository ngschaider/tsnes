import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Load The Y Register
// Function:    Y = M
// Flags Out:   N, Z
export default class LDY extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("LDY", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        cpu.Y = data;
        cpu.status.Z = cpu.Y === 0x00;
        cpu.status.N = (cpu.Y & 0x80) !== 0x00;

        if(this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}