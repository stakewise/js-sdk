import { useEffect } from 'react'
import { useForm } from 'formular'
import { isAddress } from 'ethers/lib/utils'

import storage from './storage'
import { options } from './config'


const useConfigForm = () => {
  const form = useForm<App.Form>({
    fields: {
      currency: {
        value: storage.get('currency', options.currency) || options.currency[0],
        validate: [],
      },
      network: {
        value: storage.get('network', options.network) || options.network[0],
        validate: [],
      },
      theme: {
        value: storage.get('theme', options.theme) || options.theme[0],
        validate: [],
      },
      overlay: {
        value: storage.get('overlay', options.overlay) || options.overlay[0],
        validate: [],
      },
      withReferrer: {
        value: false,
        validate: [],
      },
      referrer: {
        value: '',
        validate: [ (value: string) => !value || isAddress(value) ? null : 'Valid address required' ],
      },
      customStyles: {
        value: false,
        validate: [],
      },
    },
  })

  useEffect(() => {
    const handleChange = (value) => {
      if (!value) {
        form.fields.referrer.set('')
      }
    }

    form.fields.withReferrer.on('change', handleChange)

    return () => {
      form.fields.withReferrer.off('change', handleChange)
    }
  }, [ form ])

  useEffect(() => {
    const handleChange = () => {
      const values = form.getValues()

      Object.keys(values).forEach((key) => {
        storage.set(key, values[key])
      })
    }

    form.on('change', handleChange)

    return () => {
      form.off('change', handleChange)
    }
  }, [ form ])

  return {
    form,
  }
}


export default useConfigForm
