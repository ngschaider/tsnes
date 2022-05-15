import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";

export default class ROR extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("ROR", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);
        
        let temp = ((cpu.status.C ? 1 : 0) << 7) | (data >> 1);
        cpu.status.C = (data & 0x01) !== 0x0000;
        cpu.status.Z = (temp & 0x00FF) === 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;

        if(this.addressingMode.name === "Implied") {
            cpu.a = temp & 0x00FF;
        } else {
            this.addressingMode.setData(cpu, temp & 0x00FF);
        }
    }
}