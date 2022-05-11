import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8 } from "../types";

export default class IRQ extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("IRQ", opcode, addressingMode);
    }
}