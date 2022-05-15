import AddressingMode from "../AddressingMode";
import Implied from "../addressingModes/Implied";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

// Illegal opcodes
export default class XXX extends Instruction {
    constructor(opcode: number) {
        super("???", opcode, new Implied(), 1);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        throw new Error("Illegal instruction executed (opcode=" + this.opcode.toString(16) + ")");
    }
}