import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Indirect X
// The supplied 8-bit address is offset by X Register to index
// a location in page 0x00. The actual 16-bit address is read 
// from this location

// From the Datasheet:
// In indexed indirect addressing (referred to as (Indirect, X)), the second byte
// of the instruction is added to the contents of index register X
// discarding the carry. The result of this addition points to a 
// memory location on page zero which contains the low order byte
// of the effective address. The next memory location in page zero
// contains the high order byte of the effective address. Both
// memory locations specifying the effective address must be in 
// page zero.
export default class IZX extends AddressingMode {
    constructor() {
        super("IZX");
    }

    fetch(cpu: CPU): uint16 {
        let ptr: uint8 = cpu.bus.read(cpu.pc);
        cpu.pc++;

        ptr += cpu.x;

        let lowAddress: uint16 = ptr & 0x00FF;
        let highAddress: uint16 = (ptr + 1) & 0x00FF;

        let low: uint8 = cpu.bus.read(lowAddress);
        let high: uint8 = cpu.bus.read(highAddress);
        let address: uint16 = (high << 8) | low;

        this.pageBoundaryCrossed = (address >> 8) !== (ptr >> 8);
        
        return address;
    }

}