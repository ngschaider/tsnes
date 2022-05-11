import { StatusRegister } from "./StatusRegister";
import { uint16, uint8 } from "./types";
import { Instruction, getInstructionByOpcode } from "./Instruction";

export default class CPU {
    a: uint8 = 0x00;
    x: uint8 = 0x00;
    y: uint8 = 0x00;

    read: (address: uint16) => uint8;
    write: (address: uint16, data: uint8) => void;

    constructor(read: (address: uint16) => uint8, write: (address: uint16, data: uint8) => void) {
        this.read = read;
        this.write = write;
    }

    status: StatusRegister;

    stkp: uint8;
    pc: uint16;

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
            let opcode = this.read(this.pc);
            this.pc++;

            // Always set the unused status flag bit
            // Is this line even needed?
            // It seems that the unused flag is never cleared
            this.status.U = true;

            let instruction: Instruction = getInstructionByOpcode(opcode);
            instruction.execute();

            // Always set the unused status flag bit
            // Is this line even needed?
            // It seems that the unused flag is never cleared
            this.status.U = true;
        }
    }

    reset() {
        // Get address to set the program counter to
        let resetVector = 0xFFCC;
        let low = this.read(resetVector);
        let high = this.read(resetVector + 1);
        this.pc = (high << 8) | low;

        // Reset registers
        this.a = 0x00;
        this.x = 0x00;
        this.y = 0x00;

        this.stkp = 0xFD;

        // The unused status bit is always set
        this.status = {
            C: false,
            Z: false,
            I: false,
            D: false,
            B: false,
            U: true,
            V: false,
            N: false,
        };

        // Reset takes time
        this.cycles = 8;
    }
}