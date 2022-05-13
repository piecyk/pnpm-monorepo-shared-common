import { Title } from 'common/Title/Title'
import { createRoot } from 'react-dom/client'
import * as React from 'react'

const App = () => {
  return (
    <div>
      <h1>web-foo app | react {React.version}</h1>
      <Title />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)

const root = createRoot(container)
root.render(<App />)
