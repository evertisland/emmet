import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ui from './theme'
import Header from '../components/Header'
import './index.css'

const Border = styled.div`
  position: fixed;
  background: ${ui.color.contentDark};  
  width: ${props => (props.left || props.right) ? ui.component.body.margin : 'auto'};
  height: ${props => (props.top || props.bottom) ? ui.component.body.margin : 'auto'};
  top: ${props => (props.left || props.right || props.top) ? '0' : 'auto'};
  bottom: ${props => (props.left || props.right || props.bottom) ? '0' : 'auto'};
  left: ${props => (props.left || props.top || props.bottom) ? '0' : 'auto'};
  right: ${props => (props.right || props.bottom || props.top) ? '0' : 'auto'};
`
const LayoutContainer = styled.div`
  margin: ${ui.component.body.margin};
  padding-top: ${ui.component.header.height};
  width: 100%;
  display: flex;
`
const TemplateWrapper = ({ children }) => (
  <LayoutContainer>
    <Border top />
    <Border right />
    <Border bottom />
    <Border left/>
    <Helmet
      title="Paul Emmet"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
		{children()}
  </LayoutContainer>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
