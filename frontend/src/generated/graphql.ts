import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  testeAuth: Scalars['String'];
  me: TblUser;
  testeAqui: TblUser;
  produtos: Array<TblProduto>;
  produto: TblProduto;
};


export type QueryProdutosArgs = {
  principioAtivo?: Maybe<Array<Scalars['String']>>;
  concentracoes?: Maybe<Array<Scalars['String']>>;
  tarjas?: Maybe<Array<Scalars['String']>>;
  categorias?: Maybe<Array<Scalars['String']>>;
  direction?: Maybe<Scalars['String']>;
  pagina?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
};


export type QueryProdutoArgs = {
  id: Scalars['String'];
};

export type TblUser = {
  __typename?: 'tblUser';
  idUser: Scalars['String'];
  email: Scalars['String'];
  cpf: Scalars['String'];
  salt: Scalars['String'];
  nomeUser: Scalars['String'];
  fone: Scalars['String'];
  endereco: Scalars['String'];
};

export type TblProduto = {
  __typename?: 'tblProduto';
  idProduto: Scalars['String'];
  nomeProduto: Scalars['String'];
  descricao: Scalars['String'];
  categoria: Scalars['String'];
  preco: Scalars['String'];
  tarja: Scalars['String'];
  principioAtivo: Scalars['String'];
  concentracao: Scalars['String'];
  idFornecedor: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  changeInformations: UserResponse;
  wipeUsers: Scalars['Boolean'];
  criarProdutos: TblProduto;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  confirmarSenha: Scalars['String'];
  senha: Scalars['String'];
};


export type MutationChangeInformationsArgs = {
  complemento?: Maybe<Scalars['String']>;
  numero: Scalars['String'];
  rua: Scalars['String'];
  cep: Scalars['String'];
  telefone: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCriarProdutosArgs = {
  concentracao: Scalars['String'];
  principioAtivo: Scalars['String'];
  tarja: Scalars['String'];
  preco: Scalars['String'];
  categoria: Scalars['String'];
  descricao: Scalars['String'];
  nome: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  accessToken?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  cpf: Scalars['String'];
  nomeUser: Scalars['String'];
  senhaUser: Scalars['String'];
  email: Scalars['String'];
  cep: Scalars['String'];
  rua: Scalars['String'];
  numero: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  cpf: Scalars['String'];
  senhaUser: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  cpf: Scalars['String'];
  senha: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  cpf: Scalars['String'];
  nome: Scalars['String'];
  senha: Scalars['String'];
  email: Scalars['String'];
  cep: Scalars['String'];
  rua: Scalars['String'];
  numero: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);


export const LoginDocument = gql`
    mutation Login($cpf: String!, $senha: String!) {
  login(input: {cpf: $cpf, senhaUser: $senha}) {
    errors {
      field
      message
    }
    accessToken
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
 *      cpf: // value for 'cpf'
 *      senha: // value for 'senha'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($cpf: String!, $nome: String!, $senha: String!, $email: String!, $cep: String!, $rua: String!, $numero: String!, $complemento: String) {
  register(input: {cpf: $cpf, nomeUser: $nome, senhaUser: $senha, email: $email, cep: $cep, rua: $rua, numero: $numero, complemento: $complemento}) {
    errors {
      field
      message
    }
    accessToken
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
 *      cpf: // value for 'cpf'
 *      nome: // value for 'nome'
 *      senha: // value for 'senha'
 *      email: // value for 'email'
 *      cep: // value for 'cep'
 *      rua: // value for 'rua'
 *      numero: // value for 'numero'
 *      complemento: // value for 'complemento'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;