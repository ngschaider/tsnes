
export type uint8 = number;
export type uint16 = number;

export type Address = uint16;

export type MemoryRange = {
    start: Address;
    end: Address;
};


export const bitwiseComplement = (num: number): number => {
    return parseInt(num.toString(2).split('').map(x => {
        return (x === "1") ? 0 : 1;
    }).join(''), 2);
};