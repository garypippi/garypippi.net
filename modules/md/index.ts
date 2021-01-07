import image from './image'
import video from './video'
import highlight from './highlight'
import classes from './classes'
import showdown, { Converter } from 'showdown'

showdown.extension('image', image('/'))
showdown.extension('video', video('/'))
showdown.extension('highlight', highlight())

export const converter = new Converter({
    extensions: ['image', 'video', 'highlight', ...classes],
    simpleLineBreaks: true
})
