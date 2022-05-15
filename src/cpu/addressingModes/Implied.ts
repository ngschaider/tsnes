import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// Address Mode: Implied
// There is no additional data required for this instruction. The instruction
// does something very simple like sets a status bit.

// From the Datasheet:
// Implied Adressing (Implied)
// In the implied adressing mode, the address containing the 
// operand is implicitly stated in the operation code of the instruction
export default class Implied extends AddressingMode {
    constructor() {
        super("Implied");
    }

    getAddress(cpu: CPU): uint16 {
        throw new Error("Implied addressing does not support getAddress()");
    }

    getData(cpu: CPU): uint8 {
        throw new Error("Implied addressing does not support getData()");
    }

    setData(cpu: CPU, data: number): void {
        throw new Error("Implied addressing does not support setData()");
    }

}