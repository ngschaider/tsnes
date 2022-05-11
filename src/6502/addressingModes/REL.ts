import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Relative
// This address mode is exclusive to branch instructions. The address
// must reside within -128 to +127 of the branch instruction, i.e.
// you cant directly branch to any address in the addressable range.

// From the Datasheet:
// Relative addressing is used only with branch instructions; it
// establishes a destination for the conditional branch. The
// second byte of the instruction becomes the operand which
// is an "Offset" added to the contents of the lower eight bits 
// of the program counter when the counter is set at the next
// instruction. The range of the offset is -128 to +127 bytes
// from the next instruction.
export default class REL extends AddressingMode {
    constructor() {
        super("REL");
    }

    fetch(cpu: CPU): uint16 {
        let offset: uint8 = cpu.read(cpu.pc);
        cpu.pc++;

        let address: uint16 = cpu.pc + offset;

        return address;
    }

}