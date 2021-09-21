import { tick, task, Token, root, Tokenizer } from './token'

export { root }

export const _lexer = (text: string, task: Tokenizer[], list: Token[] = []): Token[] => {
    return tick(list, task, text)
        .map(token => {
            return {
                ...token,
                tokens: _lexer(token.content, token.tokenizers)
            }
        })
}

export const lexer = (input: string): Token[] => {
    return tick([], task[0], input)
        .filter(token => token.content.trim().length > 0)
        .map(token => ({
            ...token,
            tokens: tick([], task[1], token.content)
                .filter(token => token.content.trim().length > 0)
        }))
}
