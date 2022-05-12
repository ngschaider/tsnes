import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

export default class AND extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("AND", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.fetch(cpu);
        let data = cpu.bus.read(address);
        cpu.a &= data;
        cpu.status.Z = cpu.a == 0x00;
        cpu.status.N = (cpu.a & 0x80) > 0;

        if(["IZY", "ABY", "ABX"].includes(this.addressingMode.name) && this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}