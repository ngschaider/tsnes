import Bus from "../src/bus/Bus";
import { Address, uint8 } from "../src/types";

describe("BUS", () => {
    test("read from bus", () => {
        const bus = new Bus();
        
        bus.onRead.on((address: Address): uint8|undefined => {
            return 123;
        });

        expect(bus.read(0)).toBe(123);
    });

    test("read from bus with uninvolved devices", () => {
        const bus = new Bus();
        
        bus.onRead.on((address: Address): uint8|undefined => {
            return undefined;
        });
        bus.onRead.on((address: Address): uint8|undefined => {
            return 123;
        });

        expect(bus.read(0)).toBe(123);
    });
});