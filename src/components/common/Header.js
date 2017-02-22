import React, { PropTypes } from 'react'

const Header = (props, context) => {

	const { locale } = context

	return (
		<div className="panel-heading">
			<div className="panel-title">
				<h5>
					<span className="glyphicon glyphicon-shopping-cart"></span>
					{locale.header}
				</h5>
			</div>
		</div>
	)
}

Header.contextTypes = {
	locale: PropTypes.object
}

export default Header
