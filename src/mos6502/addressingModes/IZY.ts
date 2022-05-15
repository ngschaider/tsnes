import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Indirect Y
// The supplied 8-bit address is offset by Y Register to index
// a location in page 0x00. The actual 16-bit address is read 
// from this location

// From the Datasheet:
// This form of addressing is usually referred to as Indirect, Y.
// The second byte of the instruction points to a memory location
// in page zero. The contents of this memory location are added
// to the contents of the Y index register, the result beingt the
// low-order eight bits of the effective address. The carry from
// this addition is added to the contents of the next page zero
// location, the result being the high-order eight bits of the 
// effective address.
export default class IZY extends AddressingMode {
    constructor() {
        super("IZY");
    }

    fetch(cpu: CPU): uint16 {
        let ptr: uint8 = cpu.bus.read(cpu.pc);
        cpu.pc++;

        ptr += cpu.y;

        let lowAddress: uint16 = ptr & 0x00FF;
        let highAddress: uint16 = (ptr + 1) & 0x00FF;

        let low: uint8 = cpu.bus.read(lowAddress);
        let high: uint8 = cpu.bus.read(highAddress);
        let address: uint16 = (high << 8) | low;

        this.pageBoundaryCrossed = (address >> 8) !== (ptr >> 8);

        return address;
    }

}