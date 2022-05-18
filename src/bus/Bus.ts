import { uint16, uint8 } from "../types";
import ReadOrWrite from "./ReadOrWrite";
import BusDevice from "./BusDevice";
import Event from "../Event";

export default class Bus {

    private devices: BusDevice[] = [];

    connectDevice(device: BusDevice) {
        this.devices.push(device);
        device.connectBus(this);
    }

    public onAddressChanged: Event = new Event();
    
    private _address: uint16 = 0x0000;
    public get address(): uint16 {
        return this._address;
    }
    public set address(value: uint16) {
        this._address = value;
        this.onAddressChanged.trigger(this._address);
    }
    
    public onDataChanged: Event = new Event();

    private _data: uint16 = 0x00;
    public get data(): uint16 {
        return this._data;
    }
    public set data(value: uint16) {
        this._data = value;
        this.onDataChanged.trigger(this._data);
    }

    readOrWrite: ReadOrWrite = ReadOrWrite.Read;

    read(address: uint16): uint8 {
        this.readOrWrite = ReadOrWrite.Read;
        this.address = address;
        return this.data;
    }

    write(address: uint16, value: uint8): void {
        this.readOrWrite = ReadOrWrite.Write;
        this.data = value;
        this.address = address;
    }

    clock() {
        for(let device of this.devices) {
            device.clock();
        }
    }

}