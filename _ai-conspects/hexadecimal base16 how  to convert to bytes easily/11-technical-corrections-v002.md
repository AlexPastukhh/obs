# Технические уточнения — Hexadecimal

1. Hex — representation числа, не отдельный data type.
2. `0x41`, `65` и `01000001` равны как numeric value.
3. При переводе каждой hex digit сохраняйте 4-bit width и leading zeros.
4. UTF-8 variable-length: `A` занимает byte `0x41`, `é` обычно bytes `0xC3 0xA9`.
5. Повторный screenshot mapping table сохранён как отдельный placement в ledger.
