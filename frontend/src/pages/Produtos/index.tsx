import React from 'react';
import { useParams } from 'react-router-dom';
import DesktopImageComponent from '../../components/DesktopImageComponent';
import {useProdutoQuery} from '../../generated/graphql'
// import { Container } from './styles';

interface ParamTypes {
    produto: string
}

const Produtos: React.FC = () => {
    const {produto} = useParams<ParamTypes>()
    const {data, loading} = useProdutoQuery({
        variables: {
            idProduto: produto
        }
    })
    if(!data) {
        return null
    }
    return (
        <div>
            {/* <DesktopImageComponent /> */}
        </div>
    );
}

export default Produtos;