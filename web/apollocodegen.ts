import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:4000/graphql",
    documents: "src/api/graphql/**/*.graphql",
    generates: {
        "src/api/generated/apollo-generated/graphql.tsx": {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        }
    }
};

export default config;
