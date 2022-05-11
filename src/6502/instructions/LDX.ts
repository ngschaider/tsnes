import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class LDX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("LDX", opcode, addressingMode);
    }
}