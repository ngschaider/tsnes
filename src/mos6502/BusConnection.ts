import IBusDevice from "./IBusDevice";
import { uint16, uint8 } from "./types";

type BusConnection = {
    device: IBusDevice;
    from: uint16;
    to: uint16;
};

export default BusConnection