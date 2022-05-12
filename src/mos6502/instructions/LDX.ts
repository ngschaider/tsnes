import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { Instruction } from "../Instruction";
import { uint8, uint16 } from "../types";

// Instruction: Load The X Register
// Function:    X = M
// Flags Out:   N, Z
export default class LDX extends Instruction {
    constructor(opcode: number, addressingMode: AddressingMode, cycles: number) {
        super("LDX", opcode, addressingMode, cycles);
    }

    execute(cpu: CPU): void {
		super.execute(cpu);
        let address: uint16 = this.addressingMode.fetch(cpu);
        let data: uint8 = cpu.bus.read(address);

        cpu.x = data;
        cpu.status.Z = cpu.x === 0x00;
        cpu.status.N = (cpu.x & 0x80) !== 0x00;

        if(["ABY"].includes(this.addressingMode.name) && this.addressingMode.pageBoundaryCrossed) {
            cpu.cycles++;
        }
    }
}