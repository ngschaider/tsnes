import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class BIT extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("BIT", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        let temp: uint8 = cpu.a & data;
        
        cpu.status.Z = (temp & 0x00FF) == 0x00;
        cpu.status.N = (data & (1 << 7)) > 0;
        cpu.status.V = (data & (1 << 6)) > 0;
    }
}