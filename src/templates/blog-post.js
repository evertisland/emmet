import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ui from '../layouts/theme'
import { debounce } from '../common/functions'

export default class Template extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = debounce(this.handleScroll.bind(this), 250, true)
		this.scroll = this.scroll.bind(this)
		this.state = {
			lastScrollPosition: 0,
			lastScrollDirection: 'back',
			scrollInProgress: false
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleScroll)
		this.container.addEventListener('wheel', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleScroll)
		this.container.removeEventListener('wheel', this.handleScroll)
	}
	scroll(event) {
		console.log('scrolling')
		const { lastScrollPosition } = this.state;
		const container = this.container.parentNode.parentNode;
		let offset = window.matchMedia("(min-width: 768px)") ? container.clientWidth / 2 : container.clientWidth;

		const getPosition = direction => {
			return {
				behavior: 'smooth',
				left: direction ? lastScrollPosition + offset : lastScrollPosition - offset,
				top: 0
			}
		}
		if (event.deltaX === 1 || event.deltaY === 1) {
			console.log('forward')
			//container.scroll(getPosition(true))
			this.setState({lastScrollPosition: container.scrollLeft})
			return
		}
		if (event.deltaX === -1 || event.deltaY === -1) {
			console.log('back')
			//container.scroll(getPosition(false))
			this.setState({lastScrollPosition: container.scrollLeft})
		}
		setTimeout( () => {
			this.setState({scrollInProgress: false})
		}, 250)
	}
	handleScroll(event) {
		const { scrollInProgress, lastScrollDirection} = this.state;
		if (event.deltaX === 1 || event.deltaY === 1) {
			if (lastScrollDirection !== 'back' && !scrollInProgress) {
				this.setState({
					scrollInProgress: true,
					lastScrollDirection: 'forward'
				})
				this.scroll(event)
			}
			return
		}
		if (event.deltaX === -1 || event.deltaY === -1) {
			if (lastScrollDirection !== 'forward' && !scrollInProgress) {
				this.setState({
					scrollInProgress: true,
					lastScrollDirection: 'back'
				})
				this.scroll(event)
			}
		}
	}
	render() {
		const { markdownRemark: post } = this.props.data
		return (
			<Container className="blog-post-container">
				<Helmet title={`Paul Emmet - ${post.frontmatter.title}`} />
				<div className="blog-post">
					<div className="content" ref={el => this.container = el}>
						<h1 className="blog-post-title">{post.frontmatter.title.toUpperCase()}</h1>
						<div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
					</div>
				</div>
			</Container>
		);
	}
}
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
const Container = styled.div`
  display: flex;
  color: ${ui.color.content};
  background: ${ui.color.white};
  padding: ${ui.size.xxs}; 
  padding-bottom: ${ui.size.xxl}; 
  max-height: 100vh;  
  overflow-x: visible;
  width: 100vw;
  overflow-y: hidden; 
  .content {
  	width: 100vw;
		.blog-post-content { 		  
			text-align: justify;	  	
			column-width: 100vw;
			column-gap: 0;
			column-rule: 2px dashed rgba(14,17,17,0.4);
			max-height: 90vh;	
			p {
				padding: ${ui.size.m};		
			}
			img {
				max-width: 100%;
				margin: ${ui.size.m} 0;
			}	
			@media (min-width: 768px) {
				column-width: 50vw;
			}
		}
	}
  .blog-post-title {
  	column-span: all;
  	margin: ${ui.size.m} 0;
  	padding: 0;
  	font-size: 50px;
  	letter-spacing: -5px;
  	border-bottom: ${ui.size.s} dashed black;
  }    
`