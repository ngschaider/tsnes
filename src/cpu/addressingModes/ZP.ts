import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Address, uint16, uint8 } from "../../types";

// From the Datasheet:
// ZERO PAGE ADDRESSING [ZP]
// The zero page instructions allow for shorter code and 
// execution times by fetching only the second byte of the 
// instruction and assuming a zero high address byte. 
// Careful use of the zero page can result in significant 
// increase in code efficiency.
export default class ZP extends AddressingMode {
    constructor() {
        super("ZP");
    }

    private address?: Address;

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