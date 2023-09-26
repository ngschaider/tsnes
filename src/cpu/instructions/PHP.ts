import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Push Status Register to Stack
// Function:    status -> stack
// Note:        Break flag is set to 1 before push
export default class PHP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PHP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        //cpu.status.B = true;
        //cpu.status.U = true;
        let status = cpu.status.toUint8();
        cpu.pushStack(status);
        //cpu.status.B = false;
        //cpu.status.U = false;
    }
}