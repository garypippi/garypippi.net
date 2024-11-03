export const mkcontainer = (tag: string = 'div') => {
    return document.body.appendChild(document.createElement(tag))
}
