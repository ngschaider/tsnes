import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class PLP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("PLP", opcode, addressingMode);
    }
}