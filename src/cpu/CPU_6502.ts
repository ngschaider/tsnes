import StatusRegister from "./StatusRegister";
import { Address, uint16, uint8 } from "../types";
import { Instruction } from "./Instruction";
import getInstructionByOpcode from "./getInstructionByOpcode";
import Bus from "../bus/Bus";
import AddressingModeType from "./AddressingModeName";

const INITIAL_STKP: uint8 = 0xFD;
const RESET_VECTOR: uint16 = 0xFFCC;

export default class CPU_6502 {

    // A Register
    A: uint8 = 0x00;

    // X Register
    X: uint8 = 0x00;

    // Y Register
    Y: uint8 = 0x00;

    status: StatusRegister = new StatusRegister();

    // Stack Pointer
    stkp: uint8 = INITIAL_STKP;

    // Program Counter
    pc: uint16 = 0x0000;

    cycles: number = 0;
    totalCycles: number = 0;

    bus: Bus;

    constructor(bus: Bus) {
        this.bus = bus;
        this.bus.onClock.on(this.clock.bind(this));
        this.bus.onReset.on(this.reset.bind(this));
    }

    pushStack(data: uint8) {
        this.bus.write(0x0100 + this.stkp, data);
        this.stkp--;
    }

    popStack(): uint8 {
        this.stkp++;
        return this.bus.read(0x0100 + this.stkp);
    }

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

        this.totalCycles++;
        this.cycles--;
    }

    get completed(): boolean {
        return this.cycles === 0;
    }

    complete(): number {
        let counter = 0;
        while(this.cycles > 0) {
            this.clock();
            counter++;
        }
        return counter;
    }

    stepInstruction(): number {
        this.clock();
        return this.complete() + 1;
    }

    reset() {
        this.totalCycles = 0;

        // Get address to set the program counter to
        let low = this.bus.read(RESET_VECTOR);
        let high = this.bus.read(RESET_VECTOR + 1);
        this.pc = (high << 8) | low;

        // Reset registers
        this.A = 0x00;
        this.X = 0x00;
        this.Y = 0x00;

        this.stkp = INITIAL_STKP;

        // The unused status bit is always set
        this.status = new StatusRegister();
        this.status.U = true;

        // Reset takes time
        this.cycles = 8;
    }


    getDisassembly(start: number, end: number): Map<Address, string> {
        const lines: Map<Address, string> = new Map<Address, string>();

        const hex = (input: number, length: number) => input.toString(16).padStart(length, "0");

        let address = start;
        while(address <= end) {
            if(address < 0 || address > 0xFFFF) {
                address++;
                continue;
            }
            
            const lineAddress = address;

            let line = "$" + hex(address, 4) + ": ";

            const opcode = this.bus.read(address);
            address++;
            const instruction = getInstructionByOpcode(opcode);
            line += instruction.name + " ";

            

            if(instruction.addressingMode.type === AddressingModeType.Implied) {
                line += "{IMP}";
            } else if(instruction.addressingMode.type === AddressingModeType.IMM) {
                const value = this.bus.read(address);
                address++;
                line += "#$" + hex(value, 2) + " {IMM}";
            } else if(instruction.addressingMode.type === AddressingModeType.ZP) {
                const lo = this.bus.read(address); 
                address++;
                line += "$" + hex(lo, 2) + " {ZP0}";
            } else if(instruction.addressingMode.type === AddressingModeType.ZP_X) {
                const lo = this.bus.read(address);
                address++;
                line += "$" + hex(lo, 2) + ", X {ZPX}";
            } else if(instruction.addressingMode.type === AddressingModeType.ZP_Y) {
                const lo = this.bus.read(address);
                address++;
                line += "$" + hex(lo, 2) + ", Y {ZPY}";
            } else if(instruction.addressingMode.type === AddressingModeType.IND_X) {
                const lo = this.bus.read(address);
                address++;
                line += "($" + hex(lo, 2) + ", X) {IZX}";
            } else if(instruction.addressingMode.type === AddressingModeType.IND_Y) {
                const lo = this.bus.read(address);
                address++;
                line += "($" + hex(lo, 2) + ", Y) {IZY}";
            } else if(instruction.addressingMode.type === AddressingModeType.ABS) {
                const lo = this.bus.read(address);
                address++;
                const hi = this.bus.read(address);
                address++;
                const value = hi << 8 | lo;
                line += "$" + hex(value, 2) + " {ABS}";
            } else if(instruction.addressingMode.type === AddressingModeType.ABS_X) {
                const lo = this.bus.read(address);
                address++;
                const hi = this.bus.read(address);
                address++;
                const value = hi << 8 | lo;
                line += "$" + hex(value, 2) + ", X {ABX}";
            } else if(instruction.addressingMode.type === AddressingModeType.ABS_Y) {
                const lo = this.bus.read(address);
                address++;
                const hi = this.bus.read(address);
                address++;
                const value = hi << 8 | lo;
                line += "$" + hex(value, 2) + ", Y {ABY}";
            } else if(instruction.addressingMode.type === AddressingModeType.Indirect) {
                const lo = this.bus.read(address);
                address++;
                const hi = this.bus.read(address);
                address++;
                const value = hi << 8 | lo;
                line += "($" + hex(value, 2) + ") {IND}";
            } else if(instruction.addressingMode.type === AddressingModeType.Relative) {
                const value = this.bus.read(address);
                address++;
                line += "$" + hex(value, 2) + " [$" + hex(address + value, 4) + "] {REL}";
            } else {
                throw new Error("Could not disassemble opcode " + opcode);
            }

            // Add the formed string to a Map, using the instruction's
		    // address as the key. This makes it convenient to look for later
		    // as the instructions are variable in length, so a straight up
		    // incremental index is not sufficient.
            lines.set(lineAddress, line);
        }

        return lines;
    }
}