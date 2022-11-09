/**
 * simple test
 */
import { getPosts } from '../modules/Markdown/getPosts'

// simple mock
const directoryMap: {[dir:string]:string[]} = {
    ['a']: ['..', 'b', 'c'],
    ['b']: [],
    ['c']: []
}

// stub readdir
jest.mock('fs', () => ({
    readdir: (dir: string, _: any, fnc: Function) => {
        if (!directoryMap[dir])
            fnc(new Error)
        else
            fnc(null, directoryMap[dir])
    }
}))

describe('modules/FileSystem/getPosts', () => {
    it('should get all paths', async () => {
        return getPosts('a')
            .then(paths => {
                expect(paths).toEqual(['a/c', 'a/b'])
            })
    })
})
