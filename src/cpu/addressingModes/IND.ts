import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// Address Mode: Indirect
// The supplied 16-bit address is read to get the actual 16-bit address. This is
// instruction is unusual in that it has a bug in the hardware! To emulate its
// function accurately, we also need to emulate this bug. If the low byte of the
// supplied address is 0xFF, then to read the high byte of the actual address
// we need to cross a page boundary. This doesnt actually work on the chip as 
// designed, instead it wraps back around in the same page, yielding an 
// invalid actual address

// From the Datasheet:
// In the zero page indirect addressing mode, the second byte
// of the instruction points to a memory location on page zero
// containing the low-order byte of the effective address. The
// next location on page zero contains the high-order byte of
// the effective address.
export default class IND extends AddressingMode {
    constructor() {
        super("IND");
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