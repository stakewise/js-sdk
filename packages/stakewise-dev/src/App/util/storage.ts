const set = (name: string, value: string) => {
  try {
    localStorage.setItem(name, JSON.stringify(value))
  }
  catch {
  }
}

const get = (name: string, availableValues?: string[]) => {
  try {
    const value = JSON.parse(localStorage.getItem(name))

    if (!availableValues || availableValues.includes(value)) {
      return value
    }

    set(name, null)
    return null
  }
  catch {
    set(name, null)
    return null
  }
}


const storage = {
  get,
  set,
}


export default storage
