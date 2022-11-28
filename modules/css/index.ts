export const md = 768
export const lg = 992

export const color = {
    'grey-1': '#404258',
    'grey-2': '#474E68',
    'grey-3': '#50577A',
    'grey-4': '#6B728E',
    'grey-5': '#222222',
    'grey-6': '#393E46'
}

export const mergeClass = (className: string|undefined = '', cssClass: string = '') => {
    return `${className ? className + ' ' : ''}${cssClass}`
}
