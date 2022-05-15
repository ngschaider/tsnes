import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// Address Mode: Absolute with Y Offset
// Fundamentally the same as absolute addressing, but the contents of the Y Register
// is added to the supplied two byte address. If the resulting address changes
// the page, an additional clock cycle is required

// From the Datasheet:
// For absolute adressing, the second byte of the instruction
// specifies the eight low-order bits of the effective address,
// while the third byte specifies the eight high-order bits.
// Therefore, this addressing mode allows access to the total
// 64K bytes of addressable memory
export default class ABS_Y extends AddressingMode {
    constructor() {
        super("ABS_Y");
    }

    private address: uint16;
    getAddress(cpu: CPU): uint16 {
        if(!this.address) {
            let low: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
            let high: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
    
            this.address = (high << 8) | low;
            this.address += cpu.y;
        }

        return this.address;
    }

    getData(cpu: CPU): uint8 {
        let address = this.getAddress(cpu);
        return cpu.bus.read(address);
    }

    setData(cpu: CPU, data: number): void {
        cpu.bus.write(this.getAddress(cpu), data);
    }

}