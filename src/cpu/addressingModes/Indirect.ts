import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// From the Datasheet:
// ABSOLUTE INDIRECT [Indirect]
// The second byte of the instruction contains 
// the low order byte of a memory location. 
// The high order eight bits of that memory 
// location are contained in the third byte 
// of the instruction. The contents of the 
// fully specified memory location are the 
// low order byte of the effective address. 
// The next memory location contains the high 
// order byte of the effective address which 
// is loaded into the sixteen bits of the 
// program counter. (JMP (IND) only)
export default class Indirect extends AddressingMode {
    constructor() {
        super("Indirect");
    }

    private address: uint16;

    getAddress(cpu: CPU): uint16 {
        if(!this.address) {
            let ptrLow: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
            let ptrHigh: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
    
            let ptr: uint16 = (ptrHigh << 8) | ptrLow;
    
            // simulate page boundary hardware bug
            // if the low byte is at the end of a page
            // the high byte will be located at the start of that page
            // (not at the start of the next page)
            // (ptrHigh & 0xFF00) => set the low byte to zero
            let highAddress: uint16 = ptrLow === 0xFF ? (ptrHigh & 0xFF00) : (ptr + 1);
            let lowAddress: uint16 = ptr;
    
            let low: uint8 = cpu.bus.read(lowAddress);
            let high: uint8 = cpu.bus.read(highAddress);
            this.address = (high << 8) | low;
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