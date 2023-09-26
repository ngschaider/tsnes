import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { uint16, uint8 } from "../../types";
import AddressingModeType from "../AddressingModeName";

// From the Datasheet:
// ACCUMULATOR ADDRESSING [Accum]
// This form of addressing is represented with a one byte 
// instruction, implying an operation on the accumulator.
export default class Accum extends AddressingMode {

    constructor() {
        super(AddressingModeType.Accum);
    }

    getAddress(cpu: CPU_6502): uint16 {
        throw new Error("Accumulator addressing does not support getAddress()");
    }

    getData(cpu: CPU_6502): uint8 {
        return cpu.A;
    }

    setData(cpu: CPU_6502, data: uint8): void {
        cpu.A = data;
    }

}