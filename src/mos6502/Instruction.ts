import AddressingMode from "./AddressingMode";
import AddressingModeName from "./AddressingModeName";
import CPU from "./CPU";
import { uint8 } from "./types"

export class Instruction {
    name: string;
    opcode: uint8;
    addressingMode: AddressingMode;
    cycles: number;

    execute(cpu: CPU): void {
        cpu.cycles += this.cycles;
    }

    constructor(name: string, opcode: uint8, addressingMode: AddressingMode, cycles: number) {
        this.name = name;
        this.opcode = opcode;
        this.addressingMode = addressingMode;
        this.cycles = cycles;
    }
}

