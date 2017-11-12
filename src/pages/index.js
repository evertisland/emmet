import React from 'react'
import styled from 'styled-components'
import ui from '../layouts/theme'
import GatsbyImage from 'gatsby-image'
import Journal, { pageQuery } from '../components/Journal'
const Title = styled.h1`
  color: ${ui.color.background};
`
const BackgroundImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0
`
const Content = styled.div`
  background: 20px solid red;
  z-index:1;
  position: relative;
  padding: ${ui.size.s}
`

const IndexPage = ({ className, data }) => (
  <div className={className}>
    <BackgroundImage
      sizes={data.imageSharp.sizes}
      style={{ position: `absolute`, top: 0, left: 0, right: 0, bottom: 0}}
    />
    <Content>
      <Journal data={pageQuery}/>
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
  padding-top: ${ui.component.header.height};
`

export const query = graphql`
  query FrontPageQuery {
    imageSharp(id: { regex: "/house-in-the-jungle/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`