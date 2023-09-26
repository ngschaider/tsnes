import CPU_6502 from "./CPU_6502";
import { uint16, uint8 } from "../types";
import AddressingModeType from "./AddressingModeName";

export default abstract class AddressingMode {
    pageBoundaryCrossed: boolean = false;
    type: AddressingModeType;

    abstract getAddress(cpu: CPU_6502): uint16;
    abstract getData(cpu: CPU_6502): uint8;
    abstract setData(cpu: CPU_6502, data: uint8): void;

    constructor(type: AddressingModeType) {
        this.type = type;
    }
}