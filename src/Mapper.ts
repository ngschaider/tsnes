import Bus from "./bus/Bus";
import IBusDevice from "./bus/IBusDevice";
import RAM from "./RAM";

export default abstract class Mapper implements IBusDevice {

    abstract connectBus(bus: Bus): void;
    abstract clock(): void;

    rom: RAM;
    ram: RAM;
    chr: RAM;

}