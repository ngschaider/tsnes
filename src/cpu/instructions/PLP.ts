import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Instruction: Pop Status Register off Stack
// Function:    Status <- stack
export default class PLP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("PLP", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);

        let status = cpu.popStack();
        cpu.status.fromUint8(status);
        //cpu.status.U = true;
    }
}