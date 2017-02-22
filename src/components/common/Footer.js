import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotalCost } from '../../actions';

class Footer extends React.Component {

	componentDidMount() {
		this.context.theme.subscribe(() => this.forceUpdate())
  	}

  	render() {

  		const { theme } = this.context;
		const totalCost = this.props.totalCost

  		return (
		<div className="panel-footer">
			<div className="row text-center">
				<div className="col-sm-9">
					<h4>{theme.language.totalText}
						<strong>: $ {totalCost}</strong>
					</h4>
				</div>
				<div className="col-sm-3">
					<button type="button" className="btn btn-success btn-block">
						{theme.language.checkoutButton}
					</button>
				</div>
			</div>
		</div>
  		)
  	}
}

Footer.propTypes = {
  totalCost : PropTypes.number.isRequired
}

Footer.contextTypes = {
  theme: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
		totalCost: getTotalCost(state.cartProducts)()
	}
}

export default connect(mapStateToProps)(Footer)
