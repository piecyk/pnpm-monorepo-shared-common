import { Title } from 'common/Title/Title'
import { render } from 'react-dom'
import * as React from 'react'

const App = () => {
  return (
    <div>
      <h1>web app | react {React.version}</h1>
      <Title />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)

render(<App />, container)
