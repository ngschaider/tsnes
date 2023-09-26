import AddressingMode from "./AddressingMode";
import CPU_6502 from "./CPU_6502";
import { uint8 } from "../types"
import AddressingModeType from "./AddressingModeName";

export class Instruction {
    name: string;
    opcode: uint8;
    addressingMode: AddressingMode;
    cycles: number;

    execute(cpu: CPU_6502): void {
        cpu.cycles += this.cycles;
    }

    constructor(name: string, opcode: uint8, addressingMode: AddressingMode, cycles: number) {
        this.name = name;
        this.opcode = opcode;
        this.addressingMode = addressingMode;
        this.cycles = cycles;
    }

}

