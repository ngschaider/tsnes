import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class RTI extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("RTI", opcode, addressingMode);
    }

    execute(cpu: CPU): void {
        cpu.status.fromUint8(cpu.popStack());
        cpu.status.B = false;
        cpu.status.U = false;

        cpu.pc = cpu.popStack();
        cpu.pc |= cpu.popStack() << 8;
    }
}