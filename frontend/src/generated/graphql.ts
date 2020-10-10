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
  produtos: ProdutosComPaginacao;
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

export type ProdutosComPaginacao = {
  __typename?: 'ProdutosComPaginacao';
  produtos: Array<TblProduto>;
  hasMore: Scalars['Boolean'];
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
  logout: Scalars['Boolean'];
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
  telefone: Scalars['String'];
  cep: Scalars['String'];
  rua: Scalars['String'];
  numero: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  cpf: Scalars['String'];
  senhaUser: Scalars['String'];
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  cpf: Scalars['String'];
  nome: Scalars['String'];
  senha: Scalars['String'];
  email: Scalars['String'];
  telefone: Scalars['String'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'tblUser' }
    & Pick<TblUser, 'cpf' | 'email' | 'nomeUser' | 'fone' | 'endereco'>
  ) }
);

export type ProdutoQueryVariables = Exact<{
  idProduto: Scalars['String'];
}>;


export type ProdutoQuery = (
  { __typename?: 'Query' }
  & { produto: (
    { __typename?: 'tblProduto' }
    & Pick<TblProduto, 'nomeProduto' | 'descricao' | 'categoria' | 'preco' | 'tarja' | 'principioAtivo' | 'concentracao'>
  ) }
);

export type ProdutosQueryVariables = Exact<{
  orderBy?: Maybe<Scalars['String']>;
  pagina: Scalars['Int'];
  direction?: Maybe<Scalars['String']>;
  categorias?: Maybe<Array<Scalars['String']>>;
  tarjas?: Maybe<Array<Scalars['String']>>;
  concentracoes?: Maybe<Array<Scalars['String']>>;
  principioAtivo?: Maybe<Array<Scalars['String']>>;
}>;


export type ProdutosQuery = (
  { __typename?: 'Query' }
  & { produtos: (
    { __typename?: 'ProdutosComPaginacao' }
    & Pick<ProdutosComPaginacao, 'hasMore'>
    & { produtos: Array<(
      { __typename?: 'tblProduto' }
      & Pick<TblProduto, 'idProduto' | 'nomeProduto' | 'descricao' | 'categoria' | 'preco' | 'tarja' | 'principioAtivo' | 'concentracao'>
    )> }
  ) }
);

export type TesteAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type TesteAuthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'testeAuth'>
);


export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($cpf: String!, $nome: String!, $senha: String!, $email: String!, $telefone: String!, $cep: String!, $rua: String!, $numero: String!, $complemento: String) {
  register(input: {cpf: $cpf, nomeUser: $nome, senhaUser: $senha, email: $email, telefone: $telefone, cep: $cep, rua: $rua, numero: $numero, complemento: $complemento}) {
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
 *      telefone: // value for 'telefone'
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
export const MeDocument = gql`
    query Me {
  me {
    cpf
    email
    nomeUser
    fone
    endereco
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProdutoDocument = gql`
    query Produto($idProduto: String!) {
  produto(id: $idProduto) {
    nomeProduto
    descricao
    categoria
    preco
    tarja
    principioAtivo
    concentracao
  }
}
    `;

/**
 * __useProdutoQuery__
 *
 * To run a query within a React component, call `useProdutoQuery` and pass it any options that fit your needs.
 * When your component renders, `useProdutoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProdutoQuery({
 *   variables: {
 *      idProduto: // value for 'idProduto'
 *   },
 * });
 */
export function useProdutoQuery(baseOptions?: Apollo.QueryHookOptions<ProdutoQuery, ProdutoQueryVariables>) {
        return Apollo.useQuery<ProdutoQuery, ProdutoQueryVariables>(ProdutoDocument, baseOptions);
      }
export function useProdutoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProdutoQuery, ProdutoQueryVariables>) {
          return Apollo.useLazyQuery<ProdutoQuery, ProdutoQueryVariables>(ProdutoDocument, baseOptions);
        }
export type ProdutoQueryHookResult = ReturnType<typeof useProdutoQuery>;
export type ProdutoLazyQueryHookResult = ReturnType<typeof useProdutoLazyQuery>;
export type ProdutoQueryResult = Apollo.QueryResult<ProdutoQuery, ProdutoQueryVariables>;
export const ProdutosDocument = gql`
    query Produtos($orderBy: String, $pagina: Int!, $direction: String, $categorias: [String!], $tarjas: [String!], $concentracoes: [String!], $principioAtivo: [String!]) {
  produtos(orderBy: $orderBy, pagina: $pagina, direction: $direction, categorias: $categorias, tarjas: $tarjas, concentracoes: $concentracoes, principioAtivo: $principioAtivo) {
    produtos {
      idProduto
      nomeProduto
      descricao
      categoria
      preco
      tarja
      principioAtivo
      concentracao
    }
    hasMore
  }
}
    `;

/**
 * __useProdutosQuery__
 *
 * To run a query within a React component, call `useProdutosQuery` and pass it any options that fit your needs.
 * When your component renders, `useProdutosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProdutosQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      pagina: // value for 'pagina'
 *      direction: // value for 'direction'
 *      categorias: // value for 'categorias'
 *      tarjas: // value for 'tarjas'
 *      concentracoes: // value for 'concentracoes'
 *      principioAtivo: // value for 'principioAtivo'
 *   },
 * });
 */
export function useProdutosQuery(baseOptions?: Apollo.QueryHookOptions<ProdutosQuery, ProdutosQueryVariables>) {
        return Apollo.useQuery<ProdutosQuery, ProdutosQueryVariables>(ProdutosDocument, baseOptions);
      }
export function useProdutosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProdutosQuery, ProdutosQueryVariables>) {
          return Apollo.useLazyQuery<ProdutosQuery, ProdutosQueryVariables>(ProdutosDocument, baseOptions);
        }
export type ProdutosQueryHookResult = ReturnType<typeof useProdutosQuery>;
export type ProdutosLazyQueryHookResult = ReturnType<typeof useProdutosLazyQuery>;
export type ProdutosQueryResult = Apollo.QueryResult<ProdutosQuery, ProdutosQueryVariables>;
export const TesteAuthDocument = gql`
    query TesteAuth {
  testeAuth
}
    `;

/**
 * __useTesteAuthQuery__
 *
 * To run a query within a React component, call `useTesteAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useTesteAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTesteAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useTesteAuthQuery(baseOptions?: Apollo.QueryHookOptions<TesteAuthQuery, TesteAuthQueryVariables>) {
        return Apollo.useQuery<TesteAuthQuery, TesteAuthQueryVariables>(TesteAuthDocument, baseOptions);
      }
export function useTesteAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TesteAuthQuery, TesteAuthQueryVariables>) {
          return Apollo.useLazyQuery<TesteAuthQuery, TesteAuthQueryVariables>(TesteAuthDocument, baseOptions);
        }
export type TesteAuthQueryHookResult = ReturnType<typeof useTesteAuthQuery>;
export type TesteAuthLazyQueryHookResult = ReturnType<typeof useTesteAuthLazyQuery>;
export type TesteAuthQueryResult = Apollo.QueryResult<TesteAuthQuery, TesteAuthQueryVariables>;