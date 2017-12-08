import React, { Component } from 'react'
import styled from 'styled-components'
import { throttle, debounce } from 'lodash'
import ui from '../layouts/theme'
import { log } from 'util';

export default styled(class HorizontalScrollContainer extends Component {
	constructor(props) {
		super(props)

		this.setUpScroll = this.setUpScroll.bind(this)

		this.scroll = this.scroll.bind(this)

		this.handleScroll = throttle(this.handleScroll, 1300,
			{ trailing: false, leading: true }).bind(this)

		this.handleTouchStart = throttle(this.handleTouchStart, 400,
			{ trailing: false, leading: true }).bind(this)
		
		this.handleTouchMove = throttle(this.handleTouchMove.bind(this), 400,
			{ trailing: false, leading: true }).bind(this)

		this.handleResize = throttle(this.handleResize, 100,
			{ trailing: true }).bind(this)

		this.state = {
			scrolledFromLeft: 0,
			lastDirection: 'backward',
			touchStartX: 0,
			touchStartY: 0,
			isIOS: false
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize, { passive: true })
		this.setState({ isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) })
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleScroll)
	}

	scroll(direction, behavior) {
		const width = this.container.parentNode.clientWidth
		const viewportWidth = (width > 767 && this.props.blogPost) ? width / 2 : width
		
		const offset = (direction === 'forward')
			? this.state.scrolledFromLeft + viewportWidth
			: this.state.scrolledFromLeft - viewportWidth		
		const normalizeOffset = (offset) => {
			if (offset < 0) {
				return 0
			}
			if (offset > this.container.scrollWidth - viewportWidth) {
				return this.container.scrollWidth - viewportWidth
			}
			return offset
		}
		this.container.scroll({
			behavior,
			left: normalizeOffset(offset),
			top: 0
		})
		this.setState({
			viewportWidth,
			scrolledFromLeft: normalizeOffset(offset)
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
		this.setState({
			lastDirection: direction,
			scrolledFromLeft: this.container.scrollLeft
		})
		this.scroll(direction, 'smooth')	
	}

	handleScroll(event) {	
		if (event.deltaX > 0 || event.deltaY > 0) {
			this.setUpScroll('forward')
		}
		if (event.deltaX < 0 || event.deltaY < 0) {
			this.setUpScroll('backward')
		}
	}
	
	handleTouchStart(event) {
		this.setState({
			touchStartX: event.touches[0].screenX,
			touchStartY: event.touches[0].screenY
		})
	}

	handleTouchMove(event) {
		const { touchStartX, touchStartY} = this.state
		const { screenX, screenY} = event.touches[0]
		
		if (Math.abs(screenY - touchStartY) > Math.abs(screenX - touchStartX)) {
			if (touchStartY < screenY) {
				this.scroll('forward', 'smooth')
			} else {
				this.scroll('backward', 'smooth')
			}
		} else {
			if (touchStartX < screenX) {
				this.scroll('forward', 'smooth')
			} else {
				this.scroll('backward', 'smooth')
			}
		}		
	}

	render() {
		return (
			<div
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onWheel={this.handleScroll}
				className={this.props.className}
				ref={el => this.container = el}>
				<div className="scroll-delimiter" onScroll={this.handleScroll}>
					{this.props.children}
				</div>
			</div>
		)
	}
})`
  	overflow: hidden;
	width: 100vw;	
	height: 100vh;
	.scroll-delimiter {
		text-align: justify;	  	
		column-width: 100vw;
		column-gap: 0;
		column-rule: 2px dashed rgba(14,17,17,0.4);
		max-height: ${props => props.blogPost ? 'calc(100vh - 60px)' : '100vh'};		
		margin: ${props => props.blogPost ? '30px 0' : 0};	
		@media (min-width: 768px) {
			column-width: ${props => props.blogPost ? '50vw' : '100vw'};
		}
	}
`