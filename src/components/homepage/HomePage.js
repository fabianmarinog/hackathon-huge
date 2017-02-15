import React, { PropTypes } from 'react'

class HomePage extends React.Component {

	constructor(props) {
		super(props)
		this.randomColor = this.randomColor.bind(this)
	}

	randomColor(event) {
		const color = `rgb(${Math.floor(Math.random()*256)} , ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
		event.target.setAttribute('style', `color: ${color}`)
	}

	componentWillMount(){
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log('asd', data)
				this.setState({
					data: data
				});
			})
	}

	componentDidMount() {
		console.log('Was Mounted, occurs after render()')
	}

	render () {
		const posts = this.state.data || []
		const { appTitle }  = this.state.data || []

		return (
			<section className="row">
				<h1>{appTitle}</h1>
				{posts.map((post, index) => {
                    return(
                        <div key={index} className="col-sm-12 col-xs-12 col-md-4 col-lg-3">
                            <div className="thumbnail bootsnipp-thumb">
                                <h4 className="list-group-item-heading" onClick={this.randomColor}>{post.title}</h4>
                                <p className="list-group-item-text">{post.body}</p>
                            </div>
                        </div>
                    )
                })}
			</section>
		)
	}
}

HomePage.propTypes = {
	data: PropTypes.object,
	appTitle: PropTypes.string
}

export default HomePage
