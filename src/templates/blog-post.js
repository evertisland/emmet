import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components'
import ui from '../layouts/theme'
const Container = styled.div`
	height: 100%;    
  flex: 1;
  display: flex;
  justify-content: center;
  color: ${ui.color.content};
  background: ${ui.color.background};
  .content {
  	max-width: 750px;
  	flex: 1;  	
  }
  h1 {
  	text-align: center;
  	margin: ${ui.size.m} 0;
  	padding-left: ${ui.size.ml};
  }
  .blog-post-content {
		text-align: justify;
		padding: 0 ${ui.size.m};
		@media (min-width: 768px) {
			border: ${ui.size.xxs} solid ${ui.color.content};
			border-bottom: 0;
			border-top: 0;
		}
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
					<h1>{post.frontmatter.title}</h1>
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