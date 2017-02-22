import React, { PropTypes } from 'react'
import ProductsContainer from './ProductsContainer'
import ProductsCartContainer from './ProductsCartContainer'

const App = (props, context) => (
    <div className="panel-body">
        <ProductsContainer/>
        <hr/>
        <ProductsCartContainer/>
    </div>
)

export default App
