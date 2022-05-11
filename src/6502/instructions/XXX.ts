import { AddressingMode } from "../AddressingMode";
import IMP from "../addressingModes/IMP";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class XXX extends Instruction {
    constructor(opcode: number) {
        super("???", opcode, new IMP());
    }
}