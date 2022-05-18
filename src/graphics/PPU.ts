import Color from "./Color"
import {uint8, uint16} from "../types"
import BusDevice from "../bus/BusDevice"
import Bus from "../bus/Bus";

export default class PPU extends BusDevice {
    clock(): void {
    }

    framebuffer: Color[];

    width: number;
    height: number;

    constructor(width: number = 600, height: number = 800) {
        super();
        this.width = width;
        this.height = height; 

        for(let y = 0; y < height; y++) {            
            for(let x = 0; x < width; x++) {
                this.framebuffer.push(new Color(0, 0, 0));
            }
        }
    }
    connectBus(bus: Bus): void {
    }
    
    setPixel(x: number, y: number, color: Color) {
        let index = x + this.width * y;
        this.framebuffer[index] = color;
    }

}