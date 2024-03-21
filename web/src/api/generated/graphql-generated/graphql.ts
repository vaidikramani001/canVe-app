import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
export const VerifyDocumentDocument = gql`
    mutation VerifyDocument($data: String!, $userId: Float!) {
  verifyDocument(data: $data, userId: $userId)
}
    `;
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createDocument(variables: CreateDocumentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDocumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDocumentMutation>(CreateDocumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createDocument', 'mutation');
    },
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register', 'mutation');
    },
    resetpassword(variables: ResetpasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetpasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetpasswordMutation>(ResetpasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetpassword', 'mutation');
    },
    VerifyDocument(variables: VerifyDocumentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyDocumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyDocumentMutation>(VerifyDocumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VerifyDocument', 'mutation');
    },
    DocumentsByUserId(variables: DocumentsByUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DocumentsByUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DocumentsByUserIdQuery>(DocumentsByUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DocumentsByUserId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;