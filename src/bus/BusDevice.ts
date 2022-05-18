import Bus from "./Bus";
import { uint8, uint16 } from "../types";

export default abstract class BusDevice {

    bus: Bus;

    connectBus(bus: Bus) {
        this.bus = bus;
    };

    abstract clock(): void;

}