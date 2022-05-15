import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// Address Mode: Immediate
// The instruction expects the next byte to be used as a value, so we'll prep
// the read address to point to the next byte

// From the Datasheet:
// With immediate addressing, the operand is contained in the
// second byte of the instruction; no further memory adressing
// is required.
export default class IMM extends AddressingMode {
    constructor() {
        super("IMM");
    }

    getAddress(cpu: CPU): uint16 {
        throw new Error("Immediate addressing does not support getAddress()");

        /*let address: uint16 = cpu.pc;
        cpu.pc++;

        return address;*/
    }

    private data: uint8;
    getData(cpu: CPU): uint8 {
        if(!this.data) {
            this.data = cpu.bus.read(cpu.pc);
            cpu.pc++;
        }
        return this.data;
    }

    setData(cpu: CPU, data: number): void {
        throw new Error("Immediate addressing does not support setData()");
    }

}