import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Address, uint16, uint8 } from "../../types";
import AddressingModeType from "../AddressingModeName";

// From the Datasheet:
// INDIRECT INDEXED ADDRESSING [(IND), Y]
// In indirect indexed addressing (referred to as (Indirect), Y)), 
// the second byte of the instruction points to a memory location 
// in page zero. The contents of this memory location are added to 
// the contents of index register Y. The result is the low order 
// byte of the effective address. The carry from this addition is 
// added to the contents of the next page zero memory location, to 
// form the high order byte of the effective address.
export default class IND_Y extends AddressingMode {
    constructor() {
        super(AddressingModeType.IND_Y);
    }

    private address?: Address;

    getAddress(cpu: CPU_6502): uint16 {
        if(!this.address) {
            let ptr: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
    
            let lowAddress: uint16 = ptr & 0x00FF;
            let highAddress: uint16 = (ptr + 1) & 0x00FF;
    
            let low: uint8 = cpu.bus.read(lowAddress);
            let high: uint8 = cpu.bus.read(highAddress);
            this.address = (high << 8) | low;
            this.address += cpu.Y;

            this.pageBoundaryCrossed = (this.address >> 8) !== high;
        }

        return this.address;
    }
    
    getData(cpu: CPU_6502): uint8 {
        let address = this.getAddress(cpu);
        return cpu.bus.read(address);
    }

    setData(cpu: CPU_6502, data: uint8): void {
        let address = this.getAddress(cpu);
        cpu.bus.write(address, data);
    }

}