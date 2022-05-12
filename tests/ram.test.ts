import RAM from "../src/mos6502/RAM";

let ram: RAM;

const getRandomByte = () => {
    return Math.floor(Math.random() * 0xFF);
}

describe("RAM", () => {

    const setupHardware = () => {
        ram = new RAM();
        ram.reset();
    }

    test("write() and read()", () => {
        setupHardware();

        ram.write(0x1234, 0x1337);
        expect(ram.read(0x1234)).toBe(0x1337);

        ram.write(0x8000, 0x2020);
        expect(ram.read(0x8000)).toBe(0x2020);

        ram.write(0x0000, 0x5454);
        expect(ram.read(0x0000)).toBe(0x5454);
    })

    test("reset()", () => { 
        setupHardware();

        ram.write(0x1234, 0x1337);
        ram.write(0x8000, 0x2020);
        ram.write(0x0000, 0x5454);

        ram.reset();

        expect(ram.read(0x1234)).toBe(0x0000);
        expect(ram.read(0x8000)).toBe(0x0000);
        expect(ram.read(0x0000)).toBe(0x0000);
    });

    test("load()", () => {
        setupHardware();

        ram.write(0x7FFF, 0x3D);
        ram.load("AB CD EF 37", 0x8000);

        expect(ram.read(0x7FFF)).toBe(0x3D);
        expect(ram.read(0x8000)).toBe(0xAB);
        expect(ram.read(0x8001)).toBe(0xCD);
        expect(ram.read(0x8002)).toBe(0xEF);
        expect(ram.read(0x8003)).toBe(0x37);
    });


})