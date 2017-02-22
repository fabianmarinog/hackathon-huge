import React, { PropTypes } from 'react'

const Header = (props, context) => {

	const { theme } = context

	return (
		<div className="panel-heading">
			<div className="panel-title">
				<h5>
					<span className="glyphicon glyphicon-shopping-cart"></span>
					{theme.language.header}
				</h5>
			</div>
		</div>
	)
}

Header.contextTypes = {
	theme: PropTypes.object
}

export default Header
