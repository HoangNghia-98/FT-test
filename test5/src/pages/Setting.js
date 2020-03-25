import React from 'react'
import Menu from '../components/Menu'
import * as queryString from 'query-string'
import { withRouter } from 'react-router-dom'

const Setting = (props) => {
  console.log(props)
  var parsed = queryString.parse(props.location.search)
  console.log('parsed', parsed)  
  const Content = () => {return (<p>Setting page {parsed.section ? `- Section: ${parsed.section}` : ''}</p>)} 

  return (
    <div>
      <Menu></Menu>
      <Content></Content>
      {/* Setting page - Section: FooSection */}
      {/* Setting page */}
    </div>
  )
}

export default withRouter(Setting)