import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class CLC extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("CLC", opcode, addressingMode);
    }
}