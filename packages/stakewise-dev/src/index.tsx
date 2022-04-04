import React from 'react'
import ReactDOM from 'react-dom'

import App from './App/App'

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'

document.head.append(link)

ReactDOM.render(
  <App />,
  document.body
)
