import React, { useEffect } from 'react'
import cx from 'classnames'
import { useFieldState } from 'formular'

import Footer from './components/Footer/Footer'
import Content from './components/Content/Content'

import { useConfigForm } from './util'

import s from './App.scss'


const App = () => {
  const { form } = useConfigForm()
  const { value: theme } = useFieldState(form.fields.theme)

  useEffect(() => {
    document.body.classList.add(theme)

    return () => {
      document.body.classList.remove(theme)
    }
  }, [ theme ])

  return (
    <div
      className={s.container}
    >
      <div className={cx(s.textContainer, 'w-full flex flex-col items-center justify-center py-24')}>
        <Content
          className="mw-618 w-full px-16"
          form={form}
        />
      </div>
      <Footer theme={theme} />
    </div>
  )
}


export default App
