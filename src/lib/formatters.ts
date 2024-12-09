const compactNumberFormatter = new Intl.NumberFormat(undefined, { notation: 'compact' })

export function FormatCompactNumber(number: number) {
    return compactNumberFormatter.format(number);
} 