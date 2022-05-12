import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class RTI extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("RTI", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        cpu.status.fromUint8(cpu.popStack());
        cpu.status.B = false;
        cpu.status.U = false;

        cpu.pc = cpu.popStack();
        cpu.pc |= cpu.popStack() << 8;
    }
}