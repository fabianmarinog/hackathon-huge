import React, { PropTypes } from 'react'
import ProductsContainer from './ProductsContainer'
import ProductsCartContainer from './ProductsCartContainer'

const App = (props, context) => (
    <div className="panel-body">
    {context.locale.productsTitle}
        <ProductsContainer/>
        <hr/>
        <ProductsCartContainer/>
    </div>
)

App.contextTypes = {
	locale: PropTypes.object
}

export default App
