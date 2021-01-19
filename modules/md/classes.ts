const classes: {[key:string]: string} = {
    h1: '',
    h2: 'my-6 text-2xl md:text-3xl',
    h3: 'my-3 text-xl md:text-2xl',
    h4: '',
    h5: '',
    h6: '',
    p: 'my-3 text-sm md:text-base',
    a: '',
    img: 'my-3',
    video: 'my-3',
    pre: 'hljs text-sm md:text-base'
}

export default Object.keys(classes).map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(?: (.*)>|>)`, 'g'),
    replace: `<${key} class="${classes[key]}" $1>`
}))
