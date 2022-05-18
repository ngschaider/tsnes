import Bus from "../src/Bus";
import RAM from "../src/RAM"
import MirrorBusConnection from "../src/bus_connections/MirrorBusConnection";

describe("BUS", () => {
    test("MIRROR MAPPING", () => {
        let ram = new RAM(2 * 1024);
        let bus = new Bus();
        
        bus.addConnection(new MirrorBusConnection(ram, [0x0000, 0x0800, 0x1000, 0x1800]));
        ram.reset();

        bus.write(0x00CD, 0x3D);
        expect(bus.read(0x00CD)).toBe(0x3D);
        expect(bus.read(0x08CD)).toBe(0x3D);
        expect(bus.read(0x10CD)).toBe(0x3D);
        expect(bus.read(0x18CD)).toBe(0x3D);
    });
});