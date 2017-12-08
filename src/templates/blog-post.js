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

export default styled(({ className, data }) => (
	<div className={className}>
		<Helmet title={`Paul Emmet - ${data.markdownRemark.frontmatter.title}`} />
		<div className="blog-post">
			<HorizontalScrollContainer blogPost>
				<div className="padding">
					<h1 className="title">
						{data.markdownRemark.frontmatter.title.toUpperCase()}
					</h1>
					<div
						className="content"
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
	position: relative;
  .padding {
		padding: ${ui.size.m}; 
	}
	img {
		max-width: 100%;
		margin: ${ui.size.m} 0;
	}
	p {
		font-size: ${ui.size.ms};
	}	
  .title {
		text-align: left;  
  	font-size: ${ui.size.ml};
  	letter-spacing: -2px;
  	border-bottom: ${ui.size.s} dashed black;
	}
	@media (min-width: 768px) {
		column-width: 50vw;
		p {
			font-size: ${ui.size.m};
		}	
		.title {
			letter-spacing: -5px;
			font-size: ${ui.size.xl}
		}	
	}    
`