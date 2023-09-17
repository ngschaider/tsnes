import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// From the Datasheet:
// ACCUMULATOR ADDRESSING [Accum]
// This form of addressing is represented with a one byte 
// instruction, implying an operation on the accumulator.
export default class Accum extends AddressingMode {

    constructor() {
        super("Accum");
    }

    getAddress(cpu: CPU): uint16 {
        throw new Error("Accumulator addressing does not support getAddress()");
    }

    getData(cpu: CPU): uint8 {
        return cpu.A;
    }

    setData(cpu: CPU, data: uint8): void {
        cpu.A = data;
    }

}