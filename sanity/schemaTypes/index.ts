import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, siteSettingsType],
}
