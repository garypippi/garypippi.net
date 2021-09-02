import { FunctionComponent } from 'react'
import { Token } from '../../modules/md/lexer/token'

export type Component = FunctionComponent<{token:Token}>
export type ComponentMap = {[K in Token['type']]?:Component}
