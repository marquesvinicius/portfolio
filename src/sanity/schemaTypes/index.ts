import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import post from './post'
import blockContent from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, post, blockContent],
}
