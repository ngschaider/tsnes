import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Address, uint16, uint8 } from "../../types";
import AddressingModeType from "../AddressingModeName";

// From the Datasheet:
// ABSOLUTE ADDRESSING [Absolute]
// For absolute adressing, the second byte of the instruction
// specifies the eight low-order bits of the effective address,
// while the third byte specifies the eight high-order bits.
// Therefore, this addressing mode allows access to the total
// 64K bytes of addressable memory
export default class ABS extends AddressingMode {
    constructor() {
        super(AddressingModeType.ABS);
    }

    private address?: Address;
    getAddress(cpu: CPU_6502): uint16 {
        if(!this.address) {
            let low: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
            let high: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
    
            this.address = (high << 8) | low;
        }

        return this.address;
    }

    getData(cpu: CPU_6502): uint8 {
        let address = this.getAddress(cpu);
        return cpu.bus.read(address);
    }

    setData(cpu: CPU_6502, data: number): void {
        cpu.bus.write(this.getAddress(cpu), data);
    }

}