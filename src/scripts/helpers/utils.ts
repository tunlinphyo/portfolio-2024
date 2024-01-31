export function mapRange(
    number: number,
    startRange1: number, endRange1:
    number, startRange2: number, endRange2: number
): number {
    if (number < startRange1) {
        number = startRange1
    } else if (number > endRange1) {
        number = endRange1
    }

    const range1 = endRange1 - startRange1
    const range2 = endRange2 - startRange2

    const mappedValue =
        ((number - startRange1) * range2) / range1 + startRange2

    return mappedValue
}

export function elem<T extends HTMLElement>(selector: string, parent?: HTMLElement) {
    return (parent || document).querySelector(selector) as T
}

export function elems<T extends HTMLElement>(selector: string, parent?: HTMLElement) {
    return (parent || document).querySelectorAll(selector) as NodeListOf<T>
}