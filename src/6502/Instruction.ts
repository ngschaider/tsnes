import { AddressingMode } from "./AddressingMode";
import addressingModes from "./addressingModes";
import instructions from "./instructions";
import { uint8 } from "./types"

export class Instruction {
    name: string;
    opcode: uint8;
    addressingMode: AddressingMode;

    execute(): void {
        throw new Error("Not implemented (name=" + this.name + ")");
    }

    constructor(name: string, opcode: uint8, addressingMode: AddressingMode) {
        this.name = name;
        this.opcode = opcode;
        this.addressingMode = addressingMode;
    }
}

export const getInstructionByOpcode = (opcode: uint8) => {
    for(let instruction of instructionsList) {
        if(instruction.opcode === opcode) {
            return instruction;
        }
    }
}

const instructionsList: Instruction[] = [
    new instructions.BRK("IMP", 0x00, new addressingModes.IMP()),
];