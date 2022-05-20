import Color from "./Color"
import {uint8, uint16} from "../types"
import BusDevice from "../bus/IBusDevice"
import Bus from "../bus/Bus";
import ReadOrWrite from "../bus/ReadOrWrite";
import IBusDevice from "../bus/IBusDevice";

export default class PPU implements IBusDevice {

    clock(): void {
    }

    framebuffer: Color[] = [];

    width: number;
    height: number;

    constructor(width: number = 600, height: number = 240) {
        this.width = width;
        this.height = height; 

        for(let y = 0; y < height; y++) {            
            for(let x = 0; x < width; x++) {
                this.framebuffer.push(new Color(0, 0, 0));
            }
        }
    }

    ppuBus: Bus;
    cpuBus: Bus;

    connectBus(bus: Bus): void {
        if(bus.type === "PPU") {
            this.ppuBus = bus;    
        } else if(bus.type === "CPU") {
            this.cpuBus = bus;
            this.cpuBus.onAddressChanged.on(this.onCpuBusAddressChanged.bind(this));
        }
    }

    onCpuBusAddressChanged(address: uint8) {
        if(this.cpuBus.readOrWrite === ReadOrWrite.Read) {
            if(address === 0x2002) {

            } else if(address === 0x2004) {

            } else if(address === 0x2007) {

            }
        } else if(this.cpuBus.readOrWrite === ReadOrWrite.Write) {
            if(address === 0x2000) {

            } else if(address === 0x2001) {

            } else if(address === 0x2003) {

            } else if(address === 0x2004) {

            } else if(address === 0x2006) {

            } else if(address === 0x2007) {

            }
        }
    }
    
    setPixel(x: number, y: number, color: Color) {
        let index = x + this.width * y;
        this.framebuffer[index] = color;
    }

}