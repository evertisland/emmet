import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ui from '../layouts/theme'
import HorizontalScrollContainer from '../components/HorizontalScrollContainer'

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

export default styled( ({ className, data }) => (
	<div className={className}>
		<Helmet title={`Paul Emmet - ${data.markdownRemark.frontmatter.title}`} />
		<div className="blog-post">
			<HorizontalScrollContainer blogPost>
				<div className="blog-post-padding">
					<h1 className="blog-post-title">
						{data.markdownRemark.frontmatter.title.toUpperCase()}
					</h1>
					<div
						className="blog-post-content"
						dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}>
					</div>
				</div>
			</HorizontalScrollContainer>
		</div>
	</div>
))`
	display: flex;
  color: ${ui.color.content};
	background: ${ui.color.white};
  .blog-post-padding {
		padding: ${ui.size.m}; 
	}
	
	img {
		max-width: 100%;
		margin: ${ui.size.m} 0;
	}	
	@media (min-width: 768px) {
		column-width: 50vw;
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