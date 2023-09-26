import { Address, uint8 } from "./types";
import Mapper from "./Mapper";
import Bus from "./bus/Bus";
import { ArrayConsumer } from "./ArrayConsumer";
import Mapper000 from "./mappers/Mapper000";
import { CartridgeData, getMapper, parseBytes } from "./CartridgeData";



export default class Cartridge {

    data: CartridgeData;
    mapper: Mapper;

    cpuBus: Bus;
    ppuBus: Bus;

    constructor(cpuBus: Bus, ppuBus: Bus, bytes: uint8[]) {
        this.data = parseBytes(bytes);
        this.mapper = getMapper(this.data.header.mapperNumber, this.data.header.programMemoryChunks, this.data.header.patternMemoryChunks);

        this.cpuBus = cpuBus;
        this.ppuBus = ppuBus;
    }

    onCpuBusReadCallbackId?: number;
    onCpuBusWriteCallbackId?: number;
    onPpuBusReadCallbackId?: number;
    onPpuBusWriteCallbackId?: number;

    connect() {
        this.onCpuBusReadCallbackId = this.cpuBus.onRead.on(this.onCpuBusRead.bind(this));
        this.onCpuBusWriteCallbackId = this.cpuBus.onWrite.on(this.onCpuBusWrite.bind(this));
        this.onPpuBusReadCallbackId = this.ppuBus.onRead.on(this.onCpuBusRead.bind(this));
        this.onPpuBusWriteCallbackId = this.ppuBus.onWrite.on(this.onCpuBusWrite.bind(this));
    }

    disconnect() {
        this.cpuBus.onRead.off(this.onCpuBusReadCallbackId);
        this.cpuBus.onWrite.off(this.onCpuBusWriteCallbackId);
        this.ppuBus.onRead.off(this.onPpuBusReadCallbackId);
        this.ppuBus.onWrite.off(this.onPpuBusWriteCallbackId);
    }

    onCpuBusRead(address: Address): uint8|undefined {
        const mapped = this.mapper.mapCpuRead(address);
        if(!mapped) return;
        return this.data.programMemory[mapped];
    }

    onCpuBusWrite(address: Address, value: uint8): void {
        const mapped = this.mapper.mapCpuWrite(address);
        if(!mapped) return;
        this.data.programMemory[mapped] = value;
    }

    onPpuBusRead(address: Address): uint8|undefined {
        const mapped = this.mapper.mapPpuRead(address);
        if(!mapped) return;
        return this.data.programMemory[mapped];
    }

    onPpuBusWrite(address: Address, value: uint8): void {
        const mapped = this.mapper.mapPpuWrite(address);
        if(!mapped) return;
        this.data.patternMemory[mapped] = value;
    }

    static async loadFromFile(cpuBus: Bus, ppuBus: Bus, file: File): Promise<Cartridge> {
        return new Promise<Cartridge>((resolve, reject) => {
            let reader: FileReader = new FileReader();

            reader.onloadend = (ev: ProgressEvent<FileReader>) => {
                if(!ev.target || typeof(ev.target.result) !== "string") {
                    return;
                }
    
                let bytes = [];
                for(let a of ev.target.result.split("")) {
                    bytes.push(a.charCodeAt(0));
                };
    
                const cartridge = new Cartridge(cpuBus, ppuBus, bytes);

                resolve(cartridge);
            };
            reader.readAsBinaryString(file);
        });
    }
}