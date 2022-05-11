import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class DEC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("DEC", opcode, addressingMode);
    }
}