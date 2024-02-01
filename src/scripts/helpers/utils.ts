export function elem<T extends HTMLElement>(selector: string, parent?: HTMLElement) {
    return (parent || document).querySelector(selector) as T
}

export function elems<T extends HTMLElement>(selector: string, parent?: HTMLElement) {
    return (parent || document).querySelectorAll(selector) as NodeListOf<T>
}

export function innerText<T extends HTMLElement>(selector: string, text: string, parent?: HTMLElement) {
    elem<T>(selector, parent).innerText = text
}

export function innerHTML<T extends HTMLElement>(selector: string, html: string, parent?: HTMLElement) {
    elem<T>(selector, parent).innerHTML = html
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: number

    return (...args: Parameters<T>): void => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    };
  }