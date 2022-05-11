import { AddressingMode } from "../AddressingMode";
import IMP from "../addressingModes/IMP";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Illegal opcodes
export default class XXX extends Instruction {
    constructor(opcode: number) {
        super("???", opcode, new IMP());
    }

    execute() {
        //throw new Error("Illegal instruction executed (opcode=" + this.opcode.toString(16) + ")");
    }
}