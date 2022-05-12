import StatusRegister from "./StatusRegister";
import { uint16, uint8 } from "./types";
import { Instruction } from "./Instruction";
import getInstructionByOpcode from "./getInstructionByOpcode";
import IBusDevice from "./IBusDevice";
import Bus from "./Bus";

const INITIAL_STKP: uint8 = 0xFD;
const RESET_VECTOR: uint16 = 0xFFCC;

export default class CPU implements IBusDevice {
    
    canRead(address: number): boolean {
        return false;
    }
    canWrite(address: number): boolean {
        return false;
    }
    read(address: number): number {
        throw new Error("Method not implemented.");
    }
    write(address: number, data: number): void {
        throw new Error("Method not implemented.");
    }

    pushStack(data: uint8) {
        this.bus.write(0x0100 + this.stkp, data);
        this.stkp--;
    }

    popStack(): uint8 {
        this.stkp++;
        return this.bus.read(0x0100 + this.stkp);
    }

    a: uint8 = 0x00;
    x: uint8 = 0x00;
    y: uint8 = 0x00;

    bus: Bus;

    connectBus(bus: Bus): void {
        this.bus = bus;
    }

    status: StatusRegister = new StatusRegister();

    stkp: uint8 = INITIAL_STKP;
    pc: uint16 = 0x0000;

    cycles: number = 0;
    
    // Perform one clock cycles worth of emulation
    clock() {
        // Each instruction requires a variable number of clock cycles to execute.
        // In this emulation, we only care about the final result and so I perform
        // the entire computation in one hit. In hardware, each clock cycle would
        // perform "microcode" style transformations of the CPUs state.
        //
        // To remain compliant with connected devices, it's important that the 
        // emulation also takes "time" in order to execute instructions, so I
        // implement that delay by simply counting down the cycles required by 
        // the instruction. When it reaches 0, the instruction is complete, and
        // the next one is ready to be executed.
        if(this.cycles === 0) {
            // Read next instruction byte. This 8-bit value is used to determine
            // the instruction to execute
            let opcode = this.bus.read(this.pc);
            this.pc++;

            // Always set the unused status flag bit
            // Is this line even needed?
            // It seems that the unused flag is never cleared
            this.status.U = true;

            let instruction: Instruction = getInstructionByOpcode(opcode);
            instruction.execute(this);

            // Always set the unused status flag bit
            // Is this line even needed?
            // It seems that the unused flag is never cleared
            this.status.U = true;
        }

        this.cycles--;
    }

    reset() {
        // Get address to set the program counter to
        let low = this.bus.read(RESET_VECTOR);
        let high = this.bus.read(RESET_VECTOR + 1);
        this.pc = (high << 8) | low;

        // Reset registers
        this.a = 0x00;
        this.x = 0x00;
        this.y = 0x00;

        this.stkp = INITIAL_STKP;

        // The unused status bit is always set
        this.status = new StatusRegister();
        this.status.U = true;

        // Reset takes time
        this.cycles = 8;
    }
}