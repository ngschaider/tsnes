import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class TAX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("TAX", opcode, addressingMode);
    }
}