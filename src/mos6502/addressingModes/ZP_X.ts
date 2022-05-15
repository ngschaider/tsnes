import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../types";


// Address Mode: Zero Page with X Offset
// Fundamentally the same as Zero Page addressing, but the contents of the X Register
// is added to the supplied single byte address. This is useful for iterating through
// ranges within the first page.

// From the Datasheet:
// This form of addressing is used with the index register and is referred 
// to as "Zero Page, X" or "Zero Page, Y". The effective address 
// is calculated by adding the second byte to the contents of the 
// index register. Since this is a form of "Zero Page" addressing, 
// the contents of the second byte references a location in page zero. 
// Additionally, due to the "Zero Page" addressing nature of this 
// mode, no carry is added to the high-order eight bits of memory, 
// and crossing of page boundaries does not occur.
export default class ZP_X extends AddressingMode {
    constructor() {
        super("ZP_X");
    }

    private address: uint16;

    getAddress(cpu: CPU): uint16 {
        if(!this.address) {
            let baseAddress: uint16 = cpu.bus.read(cpu.pc);
            cpu.pc++;
    
            this.address = (baseAddress + cpu.x) & 0x00FF;
        }
        
        return this.address;
    }

    getData(cpu: CPU): uint8 {
        let address = this.getAddress(cpu);
        return cpu.bus.read(address);
    }

    setData(cpu: CPU, data: uint8): void {
        let address = this.getAddress(cpu);
        return cpu.bus.write(address, data);
    }

}