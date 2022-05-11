import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class NOP extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("NOP", opcode, addressingMode);
    }
}