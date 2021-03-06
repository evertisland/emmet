import React from 'react'
import styled from 'styled-components'
import ui from '../layouts/theme'
import GatsbyImage from 'gatsby-image'
import Journal from '../components/Journal'

const Title = styled.h1`
  color: ${ui.color.background};
`
const BackgroundImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;  
  width: 300%;
  @media (min-width:768px) {
    width: 100%;
  }
`
const Content = styled.div`
  z-index:1;
  position: relative;
`
const LandingPage = styled.div`
  position: relative;
  padding: ${ui.size.s}
  width: 100vw;
  height: 100vh;
`

const IndexPage = ({ className, data }) => (
  <div className={className}>
    <BackgroundImage
      sizes={data.imageSharp.sizes}
      style={{ position: `absolute`, top: 0, right: 0, bottom: 0}}
    />
    <Content>
      <LandingPage></LandingPage>
      <Journal posts={data.allMarkdownRemark.edges} />
    </Content>
  </div>
)

export default styled(IndexPage)`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 30px;
`

export const queries = graphql`
  query IndexAndBackgroundQueries {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
    imageSharp(id: { regex: "/dogs/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
