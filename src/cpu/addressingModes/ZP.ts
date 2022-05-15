import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// Address Mode: Zero Page
// To save program bytes, zero page addressing allows you to absolutely address
// a location in first 0xFF bytes of address range. Clearly this only requires
// one byte instead of the usual two.

// From the Datasheet:
// The zero page instructions allow for shorter code and execution
// times by fetching only the second byte of the instruction
// and assuming a zero high address byte. Careful use
// of the zero page can result in significant increase in
// code efficiency.
export default class ZP extends AddressingMode {
    constructor() {
        super("ZP");
    }

    private address: uint16;

    getAddress(cpu: CPU): uint16 {
        if(!this.address) {
            this.address = cpu.bus.read(cpu.pc);
            cpu.pc++;
        }
        
        return this.address;
    }

    getData(cpu: CPU): uint8 {
        let address = this.getAddress(cpu);
        return cpu.bus.read(address);
    }

    setData(cpu: CPU, data: uint8): void {
        let address = this.getAddress(cpu);
        cpu.bus.write(address, data);
    }

}