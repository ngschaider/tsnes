import { Instruction } from "../Instruction";
import { uint8 } from "../types";
import { AddressingMode } from "./../AddressingMode"

export default class IRQ implements Instruction {
    addressingMode: AddressingMode;
    name: string;
    opcode: number;

    execute() {

    }
}