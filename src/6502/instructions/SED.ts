import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class SED extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("SED", opcode, addressingMode);
    }
}