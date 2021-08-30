import { tick, task, Token, root, _tick, Tokenizer } from './token'

export { root }

export const _lexer = (text: string, task: Tokenizer[], list: Token[] = []): Token[] => {
    // console.log(list)
    return _tick(list, task, text)
        .filter(tk => tk.content.trim().length > 0)
        .map(token => {
            return {
                ...token,
                tokens: _lexer(token.content, token.tokenizers)
            }
        })
        // .map(tk => ({ ...tk, tokens: _tick([], tk.tokenizers, tk.content) }))
}

export const lexer = (input: string): Token[] => {
    return tick([], task[0], input)
        .filter(token => token.content.trim().length > 0)
        .map(token => ({
            ...token,
            tokens: tick([], task[1], token.content)
                .filter(token => token.content.trim().length > 0)
        }))
    // return tick(t, u, input)
    //     .filter(token => token.content.trim().length > 0)
}

// export const lexer = (input: string): Token[] => {
//     return task.reduce<Token[]>((t, u) => {
//         return tick(t, u, input)
//     }, [])
//         .filter(token => token.content.trim().length > 0)
// }
