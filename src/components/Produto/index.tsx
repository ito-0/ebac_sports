import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import { Produto as ProdutoType } from '../../App'
import * as S from './styles'

import { adicionar } from '../../store/reducers/carrinho'
import { adicionarOuRemover } from '../../store/reducers/favoritos'
import { RootReducer } from '../../store'

type Props = {
  produto: ProdutoType
  estaNosFavoritos: boolean
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispacth = useDispatch()
  const favoritos = useSelector((state: RootReducer) => state.favoritos.itens)
  const estaNosFavoritos = useMemo(() => {
    return favoritos.some((item: ProdutoType) => item.id === produto.id)
  }, [favoritos, produto])
  const handleAdicionarOuRemover = useCallback(() => {
    dispacth(adicionarOuRemover(produto))
  }, [produto, dispacth])

  const handleAdicionar = useCallback(() => {
    dispacth(adicionar(produto))
  }, [produto, dispacth])

  const precoFormatado = useMemo(() => {
    return paraReal(produto.preco)
  }, [produto.preco])

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{precoFormatado}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleAdicionarOuRemover} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={handleAdicionar} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
