import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import ui from '../layouts/theme'

export default styled(class HorizontalScrollContainer extends Component {
	constructor(props) {
		super(props)
		this.handleScroll = _.throttle(this.handleScroll, 1300, { trailing: false}).bind(this)
		this.handleResize = _.throttle(this.handleResize, 100, { trailing: true}).bind(this)
		this.setUpScroll = this.setUpScroll.bind(this)
		this.scroll = this.scroll.bind(this)
		this.state = {
			offset: 0,
			lastDirection: 'backward',
			scrollInProgress: false,
			viewportWidth: 0
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize)
		this.container.addEventListener('wheel', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleScroll)
		this.container.removeEventListener('wheel', this.handleScroll)
	}

	scroll(direction, behavior) {	
		const viewportWidth = window.matchMedia("(min-width: 768px)")
			? this.container.parentNode.clientWidth / 2
			: this.container.parentNode.clientWidth;

		const offset = (direction === 'forward')
			? this.state.offset + viewportWidth
			: this.state.offset - viewportWidth
		
		this.container.scroll({
			behavior,
			left: offset,
			top: 0
		})
		this.setState({
			scrollInProgress: false,
			offset,
			viewportWidth
		})
	}

	handleResize(event) {
		// SKIP SCROLL IF NO CONTAINER REF
		if (!this.container) return
		if (event.target.innerWidth > this.state.viewportWidth) {
			this.scroll('forward', 'instant')
		} else {
			this.scroll('backward', 'instant')
		}
	}

	setUpScroll(direction) {
		console.log('2. setUpScroll')
		this.setState({
			scrollInProgress: true,
			lastDirection: direction,
			offset: this.container.scrollLeft
		})
		this.scroll(direction, 'smooth')	
	}

	handleScroll(event) {
		console.log('1. handleScroll')
		if (this.state.scrollInProgress) return
		
		if (event.deltaX > 0 || event.deltaY > 0) {
			this.setUpScroll('forward')
		}
		if (event.deltaX < 0 || event.deltaY < 0) {
			this.setUpScroll('backward')
		}
	}

	render() {
		return (
			<div
				className={this.props.className}
				ref={el => this.container = el}>
				<div className="scroll-delimiter">
					{this.props.children}
				</div>
			</div>
		)
	}
})`
	max-height: 100vh;  
  	overflow: hidden;
	width: 100vw;	
	.scroll-delimiter {
		text-align: justify;	  	
		column-width: 100vw;
		column-gap: 0;
		column-rule: 2px dashed rgba(14,17,17,0.4);
		max-height: 100vh;	
		@media (min-width: 768px) {
			column-width: ${
				props => 
					props.blogPost
						? '50vw' : '100vw'
			};
		}
	}
`