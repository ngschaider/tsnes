import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Zero Page
// To save program bytes, zero page addressing allows you to absolutely address
// a location in first 0xFF bytes of address range. Clearly this only requires
// one byte instead of the usual two.

// From the Datasheet:
// Zero Page addressing allows short code and execution
// times by only fetching the second byte of the instruction
// and assuming a zero high address byte. The careful use
// of zero page adressing can result in significant increase in
// code efficiency.
export default class ZP0 extends AddressingMode {
    constructor() {
        super("ZP0");
    }

    fetch(cpu: CPU): uint16 {
        let address: uint16 = cpu.bus.read(cpu.pc);
        cpu.pc++;

        return address;
    }

}