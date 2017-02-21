import React, { PropTypes } from 'react'

const Header = (props) => {

	return (
		<div className="panel-heading">
			<div className="panel-title">
				<h5>
					<span className="glyphicon glyphicon-shopping-cart"></span>
					{props.locale.header}
				</h5>
			</div>
		</div>
	)
}

Header.PropTypes = {
	locale: PropTypes.object
}

export default Header
