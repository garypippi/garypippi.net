const classes: {[key:string]: string} = {
    h1: '',
    h2: 'my-6 text-3xl',
    h3: '',
    h4: '',
    h5: '',
    h6: '',
    p: 'my-3',
    a: '',
    img: 'my-3',
    video: 'my-3',
    pre: 'hljs',
}

export default Object.keys(classes).map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(?: (.*)>|>)`, 'g'),
    replace: `<${key} class="${classes[key]}" $1>`
}))
