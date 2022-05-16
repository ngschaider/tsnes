import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// From the Datasheet:
// RELATIVE ADDRESSING [Relative]
// Relative addressing is used only with branch 
// instructions and establishes a destination 
// for the conditional branch.
//
// The second byte of the instruction is an operand.
// This operand is an offset which is added to the 
// program counter when the counter is set at the next
// instruction. The range of the offset is
// -128 to +127 bytes.
export default class Relative extends AddressingMode {
    constructor() {
        super("Relative");
    }

    getAddress(cpu: CPU): uint16 {
        let offset: uint8 = cpu.bus.read(cpu.pc);
        cpu.pc++;

        let address: uint16 = cpu.pc + offset;

        return address;
    }

    getData(cpu: CPU): uint8 {
        throw new Error("Relative addressing does not support getData()");
    }

    setData(cpu: CPU, data: number): void {
        throw new Error("Relative addressing does not support setData()");
    }

}