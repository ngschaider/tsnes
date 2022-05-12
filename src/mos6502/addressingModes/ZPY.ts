import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";


// Address Mode: Zero Page with Y Offset
// Fundamentally the same as Zero Page addressing, but the contents of the Y Register
// is added to the supplied single byte address. This is useful for iterating through
// ranges within the first page.

// From the Datasheet:
// Zero page absolute addressing is used in conjunction with
// the index register and is referred to as "Zero Page, X" or
// "Zero Page, Y". The effective address is calculated by adding
// the second byte to the contents of the index register. Since
// this is a form of "Zero Page" addressing, the contents of the 
// second byte references a location in page zero. Additionally,
// due to the "Zero Page" addressing nature of this mode, no
// carry is added to the high-order eight bits of memory, and
// crossing of page boundaries does not occur.
export default class ZPY extends AddressingMode {
    constructor() {
        super("ZPY");
    }

    fetch(cpu: CPU): uint16 {
        let address: uint16 = cpu.bus.read(cpu.pc);
        cpu.pc++;

        return address + cpu.y;
    }

}