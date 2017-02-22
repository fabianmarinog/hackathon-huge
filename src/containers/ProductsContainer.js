import React, { PropTypes } from 'react'
import ProductsList from '../components/ProductsList'
import CartItem from '../components/CartItem'
import { connect } from 'react-redux'
import { addToCart } from '../actions'

class ThemedText extends React.Component {
  componentDidMount() {
    this.context.theme.subscribe(() => this.forceUpdate())
  }
  render() {
    return <div style={{color: this.context.theme.color}}>
      {this.props.children}
    </div>
  }
}
ThemedText.contextTypes = {
  theme: React.PropTypes.object
}


const ProductsContainer = ({ products, addToCart}, context) => (
      <ProductsList title={context.locale.productsTitle}>
        {products.map(product =>
        <ThemedText key = {product.id}>
        	<CartItem
            	product = {product}
            	onAddToCartClicked = {() => addToCart(product)}
        	/>
        </ThemedText>
        )}
      </ProductsList>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img : PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
})).isRequired,
  addToCart : PropTypes.func.isRequired
}

ProductsContainer.contextTypes = {
	locale: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
		products: state.products
	}
}


export default connect(mapStateToProps, {addToCart})(ProductsContainer)
