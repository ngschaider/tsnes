import Bus from "../bus/Bus";
import Mapper from "../Mapper";
import RAM from "../RAM";

type Mapper0Type = "NROM-128" | "NROM-256";

export default class Mapper0 extends Mapper {

    connectBus(bus: Bus): void {
        if(this.type === "NROM-128") {
            // add repeating bus device
        }
    }
    clock(): void {
        
    }
    
    private type: Mapper0Type;

    constructor(type: Mapper0Type) {
        super();
        this.type = type;

        if(this.type === "NROM-128") {
            this.rom = new RAM(16 * 1024);
        } else if(this.type === "NROM-256") {
            this.rom = new RAM(32 * 1024);
        }
        
    }



}