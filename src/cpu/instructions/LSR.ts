import AddressingMode from "../AddressingMode";
import CPU_6502 from "../CPU_6502";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../../types";
import AddressingModeType from "../AddressingModeName";

export default class LSR extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("LSR", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU_6502): void {
		super.execute(cpu);
        let data: uint8 = this.addressingMode.getData(cpu);

        cpu.status.C = (data & 0x0001) !== 0x0000;
        let temp = data >> 1;
        cpu.status.Z = (temp & 0x00FF) === 0x0000;
        cpu.status.N = (temp & 0x0080) !== 0x0000;

        if(this.addressingMode.type === AddressingModeType.Implied) {
            cpu.A = temp & 0x00FF;
        } else {
            this.addressingMode.setData(cpu, temp & 0x00FF);
        }
    }
}