import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components'
import ui from '../layouts/theme'
import { debounce } from '../common/functions'

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

export default class Template extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = debounce(this.handleScroll.bind(this), 250)
		this.state = {
			lastScrollLeft: 0,
			scrollInProgress: false
		}
	}

	componentDidMount() {
		this.container.addEventListener('wheel', this.handleScroll)
	}

	componentWillUnmount() {
		this.container.removeEventListener('wheel', this.handleScroll)
	}
	handleScroll(event) {
		//
		// if (event.deltaX === 1 || event.deltaY === 1) {
		// 	console.log('forward')
		// 	this.container.parentNode.parentNode.scrollTo(1000,0)
		// }
		// if (event.deltaX === -1 || event.deltaY === -1) {
		// 	console.log('back')
		// 	this.container.parentNode.parentNode.scrollTo(0,0)
		// }
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