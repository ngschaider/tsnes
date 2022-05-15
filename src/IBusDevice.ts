import Bus from "./Bus";
import { uint8, uint16 } from "./types";

export default interface IBusDevice {

    connectBus(bus: Bus): void;
    canRead(address: uint16): boolean;
    canWrite(address: uint16): boolean;
    read(address: uint16): uint8;
    write(address: uint16, data: uint8): void;

}