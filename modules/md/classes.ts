const classes: {[key:string]: string} = {
    h1: '',
    h2: 'my-6 text-2xl md:text-3xl',
    h3: 'my-3 text-xl md:text-2xl',
    h4: '',
    h5: '',
    h6: '',
    p: 'my-3 text-sm md:text-base',
    a: 'text-red-600',
    img: 'my-3',
    video: 'my-3',
    pre: 'hljs my-3 text-sm md:text-base'
}

export default Object.keys(classes).map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(?: (.*)>|>)`, 'g'),
    replace: `<${key} class="${classes[key]}" $1>`
})).concat({
    type: 'output',
    regex: /(?<!(?:<pre(?: (.*)>|>)))(?:\n?\s*<code(?: (.*)>|>))/g,
    replace: '<code class="bg-gray-100 px-2 py-px mx-px" $1>'
})
