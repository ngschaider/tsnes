import RAM from "../src/RAM";
import Bus from "../src/bus/Bus";

const setupRam = (size: number) => {
    let bus = new Bus();
    let ram = new RAM(bus, size);

    return {bus, ram};
}

describe("RAM", () => {   

    test("constructor", () => {
        let {bus, ram} = setupRam(5);
        expect(ram.bytes).toStrictEqual([0, 0, 0, 0, 0])
    })

    test("write()", () => {
        let {bus, ram} = setupRam(5);

        ram.write(0, 5);
        expect(ram.bytes).toStrictEqual([5, 0, 0, 0, 0]);
        ram.write(3, 12);
        expect(ram.bytes).toStrictEqual([5, 0, 0, 12, 0]);
        ram.write(2, 7);
        expect(ram.bytes).toStrictEqual([5, 0, 7, 12, 0]);
        ram.write(4, 88);
        expect(ram.bytes).toStrictEqual([5, 0, 7, 12, 88]);
        ram.write(1, 32);
        expect(ram.bytes).toStrictEqual([5, 32, 7, 12, 88]);
    })

    test("read()", () => {
        let {bus, ram} = setupRam(5);
        ram.bytes = [5, 32, 7, 12, 88]; 

        expect(ram.read(0)).toBe(5);
        expect(ram.read(1)).toBe(32);
        expect(ram.read(2)).toBe(7);
        expect(ram.read(3)).toBe(12);
        expect(ram.read(4)).toBe(88);
        expect(ram.bytes).toStrictEqual([5, 32, 7, 12, 88]); // bytes should not change when reading
    })

    test("reset()", () => { 
        let {bus, ram} = setupRam(5);
        ram.bytes = [5, 32, 7, 12, 88];

        ram.reset();

        expect(ram.bytes).toStrictEqual([0, 0, 0, 0, 0]);
    });

    test("load()", () => {
        let {bus, ram} = setupRam(5);

        ram.load(0, "AB CD EF 13 37");

        expect(ram.bytes).toStrictEqual([0xAB, 0xCD, 0xEF, 0x13, 0x37]);
    });

})