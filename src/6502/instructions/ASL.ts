import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class ASL extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("ASL", opcode, addressingMode);
    }
}