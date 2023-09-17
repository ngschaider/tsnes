import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Address, uint16, uint8 } from "../../types";

// From the Datasheet:
// INDEXED INDIRECT ADDRESSING [(IND, X)]
// In indexed indirect addressing (referred to as (Indirect, X)), the second byte
// of the instruction is added to the contents of index register X
// discarding the carry. The result of this addition points to a 
// memory location on page zero which contains the low order byte
// of the effective address. The next memory location in page zero
// contains the high order byte of the effective address. Both
// memory locations specifying the effective address must be in 
// page zero.
export default class IND_X extends AddressingMode {
    constructor() {
        super("IND_X");
    }

    private address?: Address;

    getAddress(cpu: CPU): uint16 {
        if(!this.address) {
            let ptr: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;

            ptr += cpu.X;

            let lowAddress: uint16 = ptr & 0x00FF;
            let highAddress: uint16 = (ptr + 1) & 0x00FF;

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
        cpu.bus.write(this.getAddress(cpu), data);
    }

}