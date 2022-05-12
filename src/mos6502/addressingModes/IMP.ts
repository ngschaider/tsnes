import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";

// Address Mode: Implied
// There is no additional data required for this instruction. The instruction
// does something very simple like sets a status bit.

// From the Datasheet:
// Implied Adressing (Implied)
// In the implied adressing mode, the address containing the 
// operand is implicitly stated in the operation code of the instruction
export default class IMP extends AddressingMode {
    constructor() {
        super("IMP");
    }

    fetch(cpu: CPU): uint16 {
        return 0x0000;
    }

}