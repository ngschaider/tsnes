import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// From the Datasheet:
// IMPLIED ADDRESSING [Implied]
// In the implied addressing mode, the 
// address containing the operand is 
// implicitly stated in the operation 
// code of the instruction.
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