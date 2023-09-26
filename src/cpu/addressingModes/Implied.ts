import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { uint16, uint8 } from "../../types";
import AddressingModeType from "../AddressingModeName";

// From the Datasheet:
// IMPLIED ADDRESSING [Implied]
// In the implied addressing mode, the 
// address containing the operand is 
// implicitly stated in the operation 
// code of the instruction.
export default class Implied extends AddressingMode {
    constructor() {
        super(AddressingModeType.Implied);
    }

    getAddress(cpu: CPU_6502): uint16 {
        throw new Error("Implied addressing does not support getAddress()");
    }

    getData(cpu: CPU_6502): uint8 {
        throw new Error("Implied addressing does not support getData()");
    }

    setData(cpu: CPU_6502, data: number): void {
        throw new Error("Implied addressing does not support setData()");
    }

}