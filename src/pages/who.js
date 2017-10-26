import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import ui from '../layouts/theme'

const Title = styled.h1`
  background: ${ui.color.accent};
  padding: ${ui.size.s};
  
`
const WhoPage = () => (
  <div>
    <Title>Who Page</Title>
    <p>Some information about ones self</p>
  </div>
)

export default WhoPage
