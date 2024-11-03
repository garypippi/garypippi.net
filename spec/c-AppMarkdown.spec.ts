/**
 * components/AppMarkdown
 * make sure all used mdast node would be handled
 */
import { join } from 'path'
//import { AppMarkdown } from '../components/AppMarkdown'
import { getPosts } from '../modules/FileSystem/getPosts'

// path to blog posts
const path = join(process.cwd(), 'blog')

describe('components/AppMarkdown', () => {
    // make sure no error be thrown
    it('should render all posts', async () => {
        return getPosts(path).then(path => {
            // TODO:
            console.log(path)
        })
    })
})
