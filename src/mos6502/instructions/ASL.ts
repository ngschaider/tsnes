import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";


// Instruction: Arithmetic Shift Left
// Function: A = C <- (A << 1) <- 0
// Flags Out: N, Z, C
export default class ASL extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("ASL", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        let temp = data << 1;

        cpu.status.C = (temp & 0xFF00) > 0;
        cpu.status.Z = (temp & 0x00FF) == 0x00;
        cpu.status.N = (temp & 0x80) > 0;

        if(this.addressingMode.name === "Implied") {
            cpu.a = temp & 0x00FF;
        } else {
            this.addressingMode.setData(cpu, temp & 0x00FF);
        }
    }
}