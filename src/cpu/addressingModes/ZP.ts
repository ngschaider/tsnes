import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Address, uint16, uint8 } from "../../types";
import AddressingModeType from "../AddressingModeName";

// From the Datasheet:
// ZERO PAGE ADDRESSING [ZP]
// The zero page instructions allow for shorter code and 
// execution times by fetching only the second byte of the 
// instruction and assuming a zero high address byte. 
// Careful use of the zero page can result in significant 
// increase in code efficiency.
export default class ZP extends AddressingMode {
    constructor() {
        super(AddressingModeType.ZP);
    }

    private address?: Address;

    getAddress(cpu: CPU_6502): uint16 {
        if(!this.address) {
            this.address = cpu.bus.read(cpu.pc);
            cpu.pc++;
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