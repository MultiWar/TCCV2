import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { tblProduto as Produto } from "../entitites/Produto";

@Resolver()
export class produtoResolver {

    @Query(() => [Produto])
    async produtos(
        @Arg('orderBy', () => String, {nullable: true}) orderBy: string,
        @Arg('pagina', () => Int, {nullable: true, defaultValue: 1}) pagina: number,
        @Arg('direction', () => String, {nullable: true}) direction: string,
        @Arg('categorias', () => [String], {nullable: true}) categorias: string[],
        @Arg('tarjas', () => [String], {nullable: true}) tarjas: string[],
        @Arg('concentracoes', () => [String], {nullable: true}) concentracoes: string[],
        @Arg('principioAtivo', () => [String], {nullable: true}) principioAtivo: string[],
    ): Promise<Produto[]> {
        const limit = 40
        const qb = getConnection()
            .getRepository(Produto)
            .createQueryBuilder('p')
            .take(limit)
            .offset(limit * (pagina - 1))
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
            tarjas || categorias || concentracoes ? qb.andWhere('principioAtivo IN (:...princAt', {princAt: principioAtivo}) : qb.where('principioAtivo IN (:...princAt', {princAt: principioAtivo})
        }
        return await qb.getMany()
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