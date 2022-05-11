import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class PHA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("PHA", opcode, addressingMode);
    }
}