import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateDocumentInput = {
  doc_number?: InputMaybe<Scalars['String']['input']>;
  doc_type: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Float']['input']>;
};

export type Document = {
  __typename?: 'Document';
  department: Scalars['String']['output'];
  doc_number?: Maybe<Scalars['String']['output']>;
  doc_status?: Maybe<Scalars['String']['output']>;
  doc_type: Scalars['String']['output'];
  doc_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  userId?: Maybe<Scalars['Float']['output']>;
};

export type DocumentResponse = {
  __typename?: 'DocumentResponse';
  document?: Maybe<Document>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FindDocumentByUserInput = {
  userId?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginRes = {
  __typename?: 'LoginRes';
  accessToken?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDocument: DocumentResponse;
  login: LoginRes;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  resetPassword: PasswordResetResponse;
  updateUsers: UpdateUserRes;
  verifyDocument: Scalars['String']['output'];
};


export type MutationCreateDocumentArgs = {
  data: CreateDocumentInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  options: UsernamePassWordInput;
};


export type MutationResetPasswordArgs = {
  data: PasswordResetInput;
};


export type MutationUpdateUsersArgs = {
  data: UpdateUserInput;
};


export type MutationVerifyDocumentArgs = {
  data: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type PasswordResetInput = {
  confirmPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type PasswordResetResponse = {
  __typename?: 'PasswordResetResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  documents?: Maybe<Array<Document>>;
  documentsByUserId?: Maybe<Array<Document>>;
  me?: Maybe<User>;
  user: User;
  users?: Maybe<Array<User>>;
};


export type QueryDocumentsByUserIdArgs = {
  data: FindDocumentByUserInput;
};


export type QueryUserArgs = {
  data: UpdateUserInput;
};

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserRes = {
  __typename?: 'UpdateUserRes';
  errors?: Maybe<Array<FieldError>>;
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['Int']['output']>;
  roles: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<FieldError>>;
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type UsernamePassWordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentMutationVariables = Exact<{
  data: CreateDocumentInput;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'DocumentResponse', document?: { __typename?: 'Document', doc_number?: string | null, doc_type: string, id: number, doc_status?: string | null } | null } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', accessToken?: string | null, errors?: Array<{ __typename?: 'FieldError', message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  options: UsernamePassWordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', username: string, password?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', message: string }> | null } };

export type ResetpasswordMutationVariables = Exact<{
  data: PasswordResetInput;
}>;


export type ResetpasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'PasswordResetResponse', user?: { __typename?: 'User', email?: string | null, id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null } };

export type VerifyDocumentMutationVariables = Exact<{
  data: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
}>;


export type VerifyDocumentMutation = { __typename?: 'Mutation', verifyDocument: string };

export type DocumentsByUserIdQueryVariables = Exact<{
  data: FindDocumentByUserInput;
}>;


export type DocumentsByUserIdQuery = { __typename?: 'Query', documentsByUserId?: Array<{ __typename?: 'Document', doc_type: string, doc_number?: string | null, userId?: number | null, doc_status?: string | null, id: number }> | null };


export const CreateDocumentDocument = gql`
    mutation createDocument($data: CreateDocumentInput!) {
  createDocument(data: $data) {
    document {
      doc_number
      doc_type
      id
      doc_status
    }
  }
}
    `;
export type CreateDocumentMutationFn = Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>;

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options);
      }
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    errors {
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($options: UsernamePassWordInput!) {
  register(options: $options) {
    user {
      username
      password
    }
    errors {
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetpasswordDocument = gql`
    mutation resetpassword($data: PasswordResetInput!) {
  resetPassword(data: $data) {
    user {
      email
      id
      username
    }
    errors {
      message
      field
    }
  }
}
    `;
export type ResetpasswordMutationFn = Apollo.MutationFunction<ResetpasswordMutation, ResetpasswordMutationVariables>;

/**
 * __useResetpasswordMutation__
 *
 * To run a mutation, you first call `useResetpasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetpasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetpasswordMutation, { data, loading, error }] = useResetpasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetpasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetpasswordMutation, ResetpasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetpasswordMutation, ResetpasswordMutationVariables>(ResetpasswordDocument, options);
      }
export type ResetpasswordMutationHookResult = ReturnType<typeof useResetpasswordMutation>;
export type ResetpasswordMutationResult = Apollo.MutationResult<ResetpasswordMutation>;
export type ResetpasswordMutationOptions = Apollo.BaseMutationOptions<ResetpasswordMutation, ResetpasswordMutationVariables>;
export const VerifyDocumentDocument = gql`
    mutation VerifyDocument($data: String!, $userId: Float!) {
  verifyDocument(data: $data, userId: $userId)
}
    `;
export type VerifyDocumentMutationFn = Apollo.MutationFunction<VerifyDocumentMutation, VerifyDocumentMutationVariables>;

/**
 * __useVerifyDocumentMutation__
 *
 * To run a mutation, you first call `useVerifyDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyDocumentMutation, { data, loading, error }] = useVerifyDocumentMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useVerifyDocumentMutation(baseOptions?: Apollo.MutationHookOptions<VerifyDocumentMutation, VerifyDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyDocumentMutation, VerifyDocumentMutationVariables>(VerifyDocumentDocument, options);
      }
export type VerifyDocumentMutationHookResult = ReturnType<typeof useVerifyDocumentMutation>;
export type VerifyDocumentMutationResult = Apollo.MutationResult<VerifyDocumentMutation>;
export type VerifyDocumentMutationOptions = Apollo.BaseMutationOptions<VerifyDocumentMutation, VerifyDocumentMutationVariables>;
export const DocumentsByUserIdDocument = gql`
    query DocumentsByUserId($data: FindDocumentByUserInput!) {
  documentsByUserId(data: $data) {
    doc_type
    doc_number
    userId
    doc_status
    id
  }
}
    `;

/**
 * __useDocumentsByUserIdQuery__
 *
 * To run a query within a React component, call `useDocumentsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsByUserIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDocumentsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables> & ({ variables: DocumentsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables>(DocumentsByUserIdDocument, options);
      }
export function useDocumentsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables>(DocumentsByUserIdDocument, options);
        }
export function useDocumentsByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables>(DocumentsByUserIdDocument, options);
        }
export type DocumentsByUserIdQueryHookResult = ReturnType<typeof useDocumentsByUserIdQuery>;
export type DocumentsByUserIdLazyQueryHookResult = ReturnType<typeof useDocumentsByUserIdLazyQuery>;
export type DocumentsByUserIdSuspenseQueryHookResult = ReturnType<typeof useDocumentsByUserIdSuspenseQuery>;
export type DocumentsByUserIdQueryResult = Apollo.QueryResult<DocumentsByUserIdQuery, DocumentsByUserIdQueryVariables>;