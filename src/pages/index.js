import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Title = styled.h1`
  background: green
`

const IndexPage = () => (
  <div>
    <Title>Hi folx</Title>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/contact/">Get in touch</Link>
  </div>
)

export default IndexPage
