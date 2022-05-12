import RAM from "../src/mos6502/RAM";

let ram = new RAM();

const getRandomByte = () => {
    return Math.floor(Math.random() * 0xFF);
}

describe("testing RAM", () => {
    test("write() and read()", () => {
        let bytes = [];
        for(let i = 0; i < ram.size; i++) {
            let byte = getRandomByte();
            bytes.push(byte);

            ram.write(i, byte);
        }
        for(let i = 0; i < ram.size; i++) {
            expect(ram.read(i)).toBe(bytes[i]);
        }
    })

    test("reset should set all bytes to zero", () => { 
        for(let i = 0; i < ram.size; i++) {
            ram.write(i, getRandomByte());
        }
        ram.reset();
        for(let i = 0; i < ram.size; i++) {
            expect(ram.read(i)).toBe(0x00);
        }
    });


})