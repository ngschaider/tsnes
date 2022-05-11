import { AddressingMode } from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Absolute 
// A full 16-bit address is loaded and used

// From the Datasheet:
// For absolute adressing, the second byte of the instruction
// specifies the eight low-order bits of the effective address,
// while the third byte specifies the eight high-order bits.
// Therefore, this addressing mode allows access to the total
// 64K bytes of addressable memory
export default class ABS extends AddressingMode {
    constructor() {
        super("ABS");
    }

    fetch(cpu: CPU): uint16 {
        let low: uint8 = cpu.read(cpu.pc);
        cpu.pc++;
        let high: uint8 = cpu.read(cpu.pc);
        cpu.pc++;

        let address: uint16 = (high << 8) | low;

        return address;
    }

}