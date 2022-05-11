import { AddressingMode } from "../AddressingMode";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class CLV extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("CLV", opcode, addressingMode);
    }
}