import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ui from '../layouts/theme'

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
				<div className="padding">
					<h1 className="title">
						{data.markdownRemark.frontmatter.title.toUpperCase()}
					</h1>
					<div
						className="content"
						dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}>
					</div>
				</div>
		</div>
	</div>
))`
	display: flex;
  color: ${ui.color.content};
	background: ${ui.color.white};
	width: 100%;
	justify-content: center;
	position: relative;
	.content {
		max-width: 700px;
		text-align: justify;
		margin: 30px 0;
	}
	.content img {
		break-inside: avoid;
	}
  .padding {
		padding: ${ui.size.m}; 
	}
	img {
		max-width: 100%;
		margin: ${ui.size.m} 0;
	}
	p {
		font-size: 12px;
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
			font-size: 16px;
		}	
		.title {
			letter-spacing: -5px;
			font-size: ${ui.size.xl}
		}	
	}    
`