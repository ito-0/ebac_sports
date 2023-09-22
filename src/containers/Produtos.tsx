import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetJogosQuery } from '../services/api'

import * as S from './styles'
import { RootReducer } from '../store'

const selectFavoritosIds = createSelector(
  (state: RootReducer) => state.favoritos.itens,
  (itens) => itens.map((item) => item.id)
)

const ProdutosComponent = () => {
  const { data: produtosComprados, isLoading } = useGetJogosQuery()
  const favoritosIds = useSelector(selectFavoritosIds)

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    return favoritosIds.includes(produtoId)
  }

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      <S.Produtos>
        {produtosComprados?.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
