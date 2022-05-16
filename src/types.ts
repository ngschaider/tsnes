export type uint8 = number;
export type uint16 = number;

export const bitwiseComplement = (num: number): number => {
    return parseInt(num.toString(2).split('').map(x => {
        return (x === "1") ? 0 : 1;
    }).join(''), 2);
};