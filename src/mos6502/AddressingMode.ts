import CPU from "./CPU";
import { uint16, uint8 } from "./types";
import AddressingModeName from "./AddressingModeName";

export default abstract class AddressingMode {
    pageBoundaryCrossed: boolean = false;
    name: AddressingModeName;

    abstract getAddress(cpu: CPU): uint16;
    abstract getData(cpu: CPU): uint8;
    abstract setData(cpu: CPU, data: uint8): void;

    constructor(name: AddressingModeName) {
        this.name = name;
    }
}