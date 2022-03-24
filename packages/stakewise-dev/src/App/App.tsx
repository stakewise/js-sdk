import React from 'react'
import cx from 'classnames'

import Footer from './components/Footer/Footer'
import Content from './components/Content/Content'

import { useTheme } from './util'

import s from './App.scss'


const App = () => {
  const { isDark, setDark } = useTheme()

  return (
    <div
      className={cx(s.container, 'flex flex-col items-center justify-center', {
        [s.dark]: isDark,
        [s.light]: !isDark,
      })}
    >
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <Content
          className="mw-618 w-full px-16"
          isDark={isDark}
          setDark={setDark}
        />
      </div>
      <Footer />
    </div>
  )
}


export default App
