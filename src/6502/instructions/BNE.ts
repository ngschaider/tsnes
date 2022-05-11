import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class BNE extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode) {
        super("BNE", opcode, addressingMode);
    }
}