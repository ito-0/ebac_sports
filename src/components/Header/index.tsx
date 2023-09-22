import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

import { RootReducer } from '../../store'

const selectItensCount = createSelector(
  (state: RootReducer) => state.carrinho.itens,
  (itens) => itens.length
)
const selectFavoritosCount = createSelector(
  (state: RootReducer) => state.favoritos.itens,
  (itens) => itens.length
)

const selectValorTotal = createSelector(
  (state: RootReducer) => state.carrinho.itens,
  (itens) =>
    itens.reduce((acc, item) => {
      acc += item.preco
      return acc
    }, 0)
)
const Header = () => {
  const itensCount = useSelector(selectItensCount)
  const valorTotal = useSelector(selectValorTotal)
  const favoritosCount = useSelector(selectFavoritosCount)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{favoritosCount} favoritos</span>
        <img src={cesta} />
        <span>
          {itensCount} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
