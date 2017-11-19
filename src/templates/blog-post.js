import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components'
import ui from '../layouts/theme'
const Container = styled.div`
  display: flex;
  justify-content: center;
  color: ${ui.color.content};
  background: ${ui.color.white};
  padding: ${ui.size.xxs};  
  max-height: 100vh;  
  overflow-x: auto;
  overflow-y: hidden;
  .content {  	  	
		column-width: 100vw;
		column-gap: 40px;
		column-rule: 2px dashed rgba(14,17,17,0.4);
		padding: 15px 0;
		max-height: 100vh;
		@media (min-width: 768px) {
			column-width: 40vw;
		}
		
  }
  h1 {
  	margin: ${ui.size.m} 0;
  	padding: 0;
  	font-size: 50px;
  	letter-spacing: -5px;
  	border-bottom: ${ui.size.s} dashed black;
  }
  .blog-post-content {
		text-align: justify;
		padding: ${ui.size.m};
		img {
			max-width: 100%;
			margin: ${ui.size.m} 0;
		}
  }
  padding-bottom: ${ui.size.xxl};
`


export default function Template({ data }) {
	const { markdownRemark: post } = data;
	return (
		<Container className="blog-post-container">
			<Helmet title={`Paul Emmet - ${post.frontmatter.title}`} />
			<div className="blog-post">
				<div className="content">
					<h1>{post.frontmatter.title.toUpperCase()}</h1>
					<div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
				</div>
			</div>
		</Container>
	);
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