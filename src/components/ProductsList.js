import React, { PropTypes } from 'react'

class ProductsList extends React.Component {
	componentDidMount() {
		this.context.theme.subscribe(() => this.forceUpdate())
  	}

  	render() {

  		const { theme } = this.context;
		const children = this.props.children

  		return (
  			<div>
  			<h3>{theme.language.productsTitle}</h3>
  			<div>{children}</div>
  			</div>
  		)
  	}
}

ProductsList.propTypes = {
  children: PropTypes.node
}

ProductsList.contextTypes = {
	theme: PropTypes.object
}

export default ProductsList
