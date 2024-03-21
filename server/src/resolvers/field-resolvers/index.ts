import * as exOrganizationResolverImport from './organization'
import * as exUserResolverImport from './user'
const exOrganizationResolvers = Object.values(exOrganizationResolverImport)
const exUserResolvers = Object.values(exUserResolverImport)
export const fieldResolvers = [...exOrganizationResolvers, ...exUserResolvers]