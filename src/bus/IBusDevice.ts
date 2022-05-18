import Bus from "./Bus";
import { uint8, uint16 } from "../types";

export default interface IBusDevice {

    connectBus(bus: Bus): void;
    clock(): void;

}