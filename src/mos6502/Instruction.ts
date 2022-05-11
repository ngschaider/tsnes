import { AddressingMode } from "./AddressingMode";
import CPU from "./CPU";
import { uint8 } from "./types"

export class Instruction {
    name: string;
    opcode: uint8;
    addressingMode: AddressingMode;

    execute(cpu: CPU): void {
        throw new Error("Instruction not implemented (name=" + this.name + ")");
    }

    constructor(name: string, opcode: uint8, addressingMode: AddressingMode) {
        this.name = name;
        this.opcode = opcode;
        this.addressingMode = addressingMode;
    }
}

