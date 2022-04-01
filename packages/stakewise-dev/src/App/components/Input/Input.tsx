import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Field, useFieldState } from 'formular'
import cx from 'classnames'

import { required } from './util/validate'
import useUniqueId from './util/useUniqueId'

import s from './Input.scss'


export const styles = [ 'light', 'dark' ] as const

export type InputStyle = typeof styles[number]

export type InputProps = {
  className?: string
  containerClassName?: string
  id?: string
  field: Field<string>
  style?: InputStyle
  label: string
  pattern?: string
  icon?: React.ReactNode
  onChange?: (value: any) => void
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className, containerClassName, id, field, style = 'light', icon,
    label, pattern, onFocus, onBlur, onChange,
    ...otherProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [ isFocused, setFocusedState ] = useState(Boolean(otherProps.autoFocus))

  const { value, error } = useFieldState<string | number>(field)

  const handleFocus = useCallback((event) => {
    setFocusedState(true)

    if (typeof onFocus === 'function') {
      onFocus(event)
    }
  }, [ onFocus ])

  const handleBlur = useCallback(async (event) => {
    // @ts-ignore
    await field.validate()
    setFocusedState(false)
    if (typeof onBlur === 'function') {
      onBlur(event)
    }
  }, [ field, onBlur ])

  const handleChange = useCallback((event) => {
    let value = event.target.value

    if (pattern) {
      value = value.replace(new RegExp(`[^${pattern}]+`, 'g'), '')
    }

    field.set(value)

    if (field.state.value === value) {
      inputRef.current.value = value
    }

    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [ field, pattern, onChange ])

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus()
    }
  }, [ isFocused ])

  const isFilled = value !== ''
  const isErrored = Boolean(error)
  const isRequired = field.validators.includes(required)
  const controlId = useUniqueId()

  const inputAreaClassName = cx(s.inputArea,
    containerClassName,
    'flex radius-8',
    s[`style-${style}`], {
      [s.focused]: isFocused,
      [s.filled]: isFilled,
      [s.errored]: isErrored,
      // [s.disabled]: disabled,
    })

  const textContentClassName = cx(s.textContent,
    'inline-flex flex-col justify-center relative', {
      ['ml-8px']: Boolean(icon),
    })

  return (
    <div className={className}>
      <div
        className={inputAreaClassName}
        onClick={handleFocus}
      >
        {icon}
        <div className={textContentClassName}>
          <label className={cx(s.label, 'absolute')} htmlFor={controlId}>
            {label}
          </label>
          <input
            id={controlId}
            className={cx(s.input, 'mt-16px')}
            ref={inputRef}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={isErrored}
            aria-required={isRequired}
          />
        </div>
      </div>
      {
        // Boolean(!isErrored) && (
        //   <div
        //     className={cx(s.note, {
        //       'pl-24px': Boolean(icon),
        //     })}
        //   >
        //     {note}
        //   </div>
        // )
      }
      {
        isErrored && (
          <div
            className={cx(s.error, 'absolute', {
              [ 'pl-24px' ]: Boolean(icon),
            })}
          >
            {error}
          </div>
        )
      }
    </div>
  )
}


export default Input
