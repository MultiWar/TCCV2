import { Arg, Field, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { tblProduto as Produto } from "../entitites/Produto";

@ObjectType()
export class ProdutosComPaginacao {
    @Field(() => [Produto])
    produtos: Produto[]

    @Field(() => Boolean)
    hasMore: Boolean
}

@Resolver()
export class produtoResolver {

    @Query(() => ProdutosComPaginacao)
    async produtos(
        @Arg('orderBy', () => String, {nullable: true}) orderBy: string,
        @Arg('pagina', () => Int, {defaultValue: 1}) pagina: number,
        @Arg('direction', () => String, {nullable: true}) direction: string,
        @Arg('categorias', () => [String], {nullable: true}) categorias: string[],
        @Arg('tarjas', () => [String], {nullable: true}) tarjas: string[],
        @Arg('concentracoes', () => [String], {nullable: true}) concentracoes: string[],
        @Arg('principioAtivo', () => [String], {nullable: true}) principioAtivo: string[],
        @Arg('query', () => String, {nullable: true}) query: string
    ): Promise<ProdutosComPaginacao> {
        const limit = 15
        const qb = getConnection()
            .getRepository(Produto)
            .createQueryBuilder('p')
            .skip((limit * (pagina - 1)))
            .take((limit + 1))
        if(orderBy) {
            qb.orderBy(orderBy, direction === 'DESC' ? 'DESC' : 'ASC')
        }
        if(categorias) {
            qb.where('categoria IN (:...categorias)', {categorias: categorias})
        }
        if(tarjas) {
            categorias ? qb.andWhere('tarja IN (:...tarjas)', {tarjas: tarjas}) : qb.where('tarja IN (:...tarjas)', {tarjas: tarjas})
        }
        if(concentracoes) {
            tarjas || categorias ? qb.andWhere('concentracao IN (:...conc)', {conc: concentracoes}) : qb.where('concentracao IN (:...conc)', {conc: concentracoes})
        }
        if(principioAtivo) {
            tarjas || categorias || concentracoes ? qb.andWhere('principioAtivo IN (:...princAt)', {princAt: principioAtivo}) : qb.where('principioAtivo IN (:...princAt)', {princAt: principioAtivo})
        }
        if(query) {
            tarjas || categorias || concentracoes || principioAtivo ? qb.andWhere('nomeProduto LIKE :query', {query: `%${query}%`}) : qb.where('nomeProduto LIKE :query', {query: `%${query}%`})
        }
        const produtos = await qb.getMany()
        return {produtos: produtos.slice(0, limit), hasMore: produtos.length === (limit + 1)}
    }

    @Query(() => Produto)
    async produto(
        @Arg('id') id: string
    ): Promise<Produto | undefined> {
        const produto = await Produto.findOne(id)
        if(!produto) {
            return undefined
        }
        return produto
    }

    @Query(() => [Produto])
    async produtosSimilares(
        @Arg('categoria') categoria: string
    ): Promise<Produto[]> {
        const qb = getConnection()
            .getRepository(Produto)
            .createQueryBuilder('p')
            .take(6)
        const produtos = await qb.where('categoria = :categoria', {categoria}).getMany()
        return produtos
    }

    @Mutation(() => Produto)
    async criarProdutos(
        @Arg('nome') nome: string,
        @Arg('descricao') descricao: string,
        @Arg('categoria') categoria: string,
        @Arg('preco') preco: string,
        @Arg('tarja') tarja: string,
        @Arg('principioAtivo') principioAtivo: string,
        @Arg('concentracao') concentracao: string
    ): Promise<Produto> {
        const produto = await Produto.create({nomeProduto: nome, descricao, categoria, preco, tarja, principioAtivo, concentracao}).save()
        return produto
    }
}