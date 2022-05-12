import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Bitwise Logic OR
// Function:    A = A | M
// Flags Out:   N, Z
export default class ORA extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("ORA", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address = this.addressingMode.fetch(cpu);
        let data = cpu.bus.read(address);

        cpu.a |= data;
        cpu.status.Z = cpu.a === 0x00;
        cpu.status.N = (cpu.a & 0x80) !== 0x00;

        if(["IZY", "ABY", "ABX"].includes(this.addressingMode.name) && this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}