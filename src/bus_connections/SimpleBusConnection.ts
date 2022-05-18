import BusConnection from "../BusConnection";
import OffsetBusConnection from "./OffsetBusConnection"
import IBusDevice from "../IBusDevice";
import { uint16 } from "../types";

export default class SimpleBusConnection extends OffsetBusConnection {

    constructor(device: IBusDevice) {
        super(device, 0);
    }

}