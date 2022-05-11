import { uint8 } from "./types"

export default class StatusRegister {
    C: boolean = false; // Carry
    Z: boolean = false; // Zero
    I: boolean = false; // IRQ Request
    D: boolean = false; // Decimal Mode (unused in this implementation)
    B: boolean = false; // BRK Command
    U: boolean = false; // Unused
    V: boolean = false; // Overflow
    N: boolean = false; // Negative

    toUint8(): uint8 {
        let out = (this.C ? 1 : 0) << 7;
        out |= (this.Z ? 1 : 0) << 6;
        out |= (this.I ? 1 : 0) << 5;
        out |= (this.D ? 1 : 0) << 4;
        out |= (this.B ? 1 : 0) << 3;
        out |= (this.U ? 1 : 0) << 2;
        out |= (this.V ? 1 : 0) << 1;
        out |= (this.N ? 1 : 0);
        return out;
    }

    fromUint8(byte: uint8) {
        this.C = (byte & 0b10000000) !== 0;
        this.Z = (byte & 0b01000000) !== 0;
        this.I = (byte & 0b00100000) !== 0;
        this.D = (byte & 0b00010000) !== 0;
        this.B = (byte & 0b00001000) !== 0;
        this.U = (byte & 0b00000100) !== 0;
        this.V = (byte & 0b00000010) !== 0;
        this.N = (byte & 0b00000001) !== 0;
    }
}
