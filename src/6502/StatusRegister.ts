export type StatusRegister = {
    C: boolean // Carry
    Z: boolean // Zero
    I: boolean // IRQ Request
    D: boolean // Decimal Mode (unused in this implementation)
    B: boolean // BRK Command
    U: boolean // Unused
    V: boolean // Overflow
    N: boolean // Negative
}