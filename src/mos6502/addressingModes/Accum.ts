import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Absolute with Y Offset
// Fundamentally the same as absolute addressing, but the contents of the Y Register
// is added to the supplied two byte address. If the resulting address changes
// the page, an additional clock cycle is required

// From the Datasheet:
// For absolute adressing, the second byte of the instruction
// specifies the eight low-order bits of the effective address,
// while the third byte specifies the eight high-order bits.
// Therefore, this addressing mode allows access to the total
// 64K bytes of addressable memory
export default class Accum extends AddressingMode {

    constructor() {
        super("Accum");
    }

    getAddress(cpu: CPU): uint16 {
        throw new Error("Accumulator addressing does not support getAddress()");
    }

    getData(cpu: CPU): uint8 {
        return cpu.a;
    }

    setData(cpu: CPU, data: number): void {
        cpu.a = data;
    }

}