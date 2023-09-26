import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { uint16, uint8 } from "../../types";
import AddressingModeType from "../AddressingModeName";

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
        super(AddressingModeType.Relative);
    }

    getAddress(cpu: CPU_6502): uint16 {
        let offset: uint8 = cpu.bus.read(cpu.pc);
        cpu.pc++;

        let address: uint16 = cpu.pc + offset;

        this.pageBoundaryCrossed = (cpu.pc >> 8) !== (address >> 8);

        return address;
    }

    getData(cpu: CPU_6502): uint8 {
        throw new Error("Relative addressing does not support getData()");
    }

    setData(cpu: CPU_6502, data: number): void {
        throw new Error("Relative addressing does not support setData()");
    }

}