import React, { PropTypes } from 'react'
import ProductsContainer from './ProductsContainer'
import ProductsCartContainer from './ProductsCartContainer'

const App = (props) => (
    <div className="panel-body">
        <ProductsContainer locale={props.locale}/>
        <hr/>
        <ProductsCartContainer/>
    </div>
)

App.PropTypes = {
	locale: PropTypes.object
}

export default App
