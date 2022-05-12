import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class LSR extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("LSR", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.fetch(cpu);
        let data = cpu.bus.read(address);

        cpu.status.C = (data & 0x0001) !== 0x0000;
        let temp = data >> 1;
        cpu.status.Z = (temp & 0x00FF) === 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;

        if(this.addressingMode.name === "IMP") {
            cpu.a = temp & 0x00FF;
        } else {
            cpu.bus.write(address, temp & 0x00FF);
        }
    }
}