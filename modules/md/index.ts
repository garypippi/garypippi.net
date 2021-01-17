import image from './image'
import video from './video'
import highlight from './highlight'
import classes from './classes'
import showdown, { Converter } from 'showdown'

const path = process.env.S3_PATH || '/'

showdown.extension('image', image(path))
showdown.extension('video', video(path))
showdown.extension('highlight', highlight())

export const converter = new Converter({
    extensions: ['image', 'video', 'highlight', ...classes],
    simpleLineBreaks: true
})
