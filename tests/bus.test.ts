import Bus from "../src/bus/Bus";
import RepeatingBusDevice from "../src/bus/RepeatingBusDevice";
import RAM from "../src/RAM"

describe("BUS", () => {
    test("MIRROR MAPPING", () => {
        let ram = new RAM(2 * 1024);
        let bus = new Bus();
        
        bus.connectDevice(ram);
        bus.connectDevice(new RepeatingBusDevice(0x0000, 0x07FF, 3));
        ram.reset();

        bus.write(0x00CD, 0x3D);
        expect(bus.read(0x00CD)).toBe(0x3D);
        expect(bus.read(0x08CD)).toBe(0x3D);
        expect(bus.read(0x10CD)).toBe(0x3D);
        expect(bus.read(0x18CD)).toBe(0x3D);
    });
});