type Rules = Record<string, string | number>
type Selectors = Record<string, Rules>

type ColorStyle = Record<'color', string>
type ColorClassName = 'color-white' | 'color-rush' | 'color-titanic' | 'color-gladiator' | 'color-godfather' | 'color-rocky' | 'color-matrix' | 'color-fargo'
type ColorStyles = Record<ColorClassName, ColorStyle>


const matrix = '#6cb069'

const fargo = '#e34b48'

const titanic = '#1d253b'
const gladiator = '#2c375b'
const godfather = '#3d59ec'
const rocky = '#4387f1'
const rush = '#f5f6fa'
const white = '#fff'

let customStyles = `
  @keyframes rotation {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}
  @keyframes show-content {from {background-color: rgba(0, 0, 0, 0);}to {background-color: rgba(0, 0, 0, .48);}}
`

const flex = {
  'flex': {
    display: 'flex',
  },
  'flex-col': {
    'flex-direction': 'column',
  },
  'items-center': {
    'align-items': 'center',
  },
  'justify-center': {
    'justify-content': 'center',
  },
  'justify-start': {
    'justify-content': 'flex-start',
  },
  'justify-between': {
    'justify-content': 'space-between',
  },
}

const box = {
  'mx-16': {
    'margin-left': '16px',
    'margin-right': '16px',
  },
  'mt-6': {
    'margin-top': '6px',
  },
  'mt-12': {
    'margin-top': '12px',
  },
  'mt-16': {
    'margin-top': '16px',
  },
  'mr-6': {
    'margin-right': '6px',
  },
  'ml-6': {
    'margin-left': '6px',
  },
  'pt-12': {
    'padding-top': '12px',
  },
  'px-12': {
    'padding-left': '12px',
    'padding-right': '12px',
  },
}

const text = {
  'text-center': {
    'text-align': 'center',
  },
  'text-right': {
    'text-align': 'right',
  },
  'semibold': {
    'font-weight': 600,
  },
  'capitalize': {
    'text-transform': 'capitalize',
  },
  'text-10': {
    'font-size': '10px',
    'line-height': '15px',
    'letter-spacing': '0.8px',
  },
  'text-12': {
    'font-size': '12px',
    'line-height': '18px',
  },
  'text-14': {
    'font-size': '14px',
    'line-height': '21px',
  },
  'text-16': {
    'font-size': '16px',
    'line-height': '24px',
  },
  'text-20': {
    'font-size': '20px',
    'line-height': '30px',
  },
  'text-38': {
    'font-size': '38px',
    'line-height': '57px',
  },
  'text-50': {
    'font-size': '50px',
    'line-height': '75px',
  },
}

const colors: Record<string, string> = { white, titanic, rocky, matrix, fargo }
const color = Object.keys(colors).reduce((result, colorName) => {
  result[`color-${colorName}` as ColorClassName] = {
    color: colors[colorName],
  }

  return result
}, {} as ColorStyles)

const common = {
  ...text,
  ...flex,
  ...box,
  ...color,
  'w-full': {
    width: '100%',
  },
  'h-full': {
    height: '100%',
  },
  'opacity-48': {
    'opacity': .48,
  },
  'radius-8': {
    'border-radius': '8px',
  },
}

const overlay = {
  ...common['w-full'],
  ...common['h-full'],
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'grid',
}

const darkOverlay = {
  background: 'rgba(0, 0, 0, .48)',
  animation: 'show-content .4s ease',
}

const modal = {
  ...common['radius-8'],
  position: 'relative',
  width: '320px',
  height: '504px',
  margin: 'auto',
  'box-shadow': '0 0 24px rgb(29 37 59 / 24%)',
  'font-family': 'Poppins, sans-serif',
  'text-rendering': 'optimizeLegibility',
  '-webkit-overflow-scrolling': 'touch',
}

const top = {
  'padding-bottom': '48px',
  background: 'linear-gradient(104.32deg, #4386f0 1.28%, #1d253b 100%)',
  'border-radius': '8px 8px 0 0',
}

const closeButton = {
  ...common['opacity-48'],
  top: '12px',
  right: '12px',
  position: 'absolute',
  padding: 0,
  border: 0,
  background: 'transparent',
}

customStyles += `button {line-height:0;cursor:pointer}`

const logo = {
  ...common['flex'],
  ...common['items-center'],
  ...common['justify-start'],
  ...common['pt-12'],
  ...common['px-12'],
}

customStyles += `.logo svg {width: 20px}`

const apr = {
  ...common['mt-6'],
  ...common['text-50'],
  ...common['text-center'],
  ...common['semibold'],
}

const aprText = {
  ...common['opacity-48'],
  ...common['text-center'],
  'margin-top': '-8px',
}

const balances = {
  ...common['mx-16'],
  'margin-top': '-24px',
}

const balance = {
  ...common['radius-8'],
  ...common['flex'],
  ...common['items-center'],
  ...common['justify-between'],
  padding: '6px 16px',
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.04)',
}

const start = {
  ...common['mt-16'],
  ...common['text-16'],
  ...common['text-center'],
  ...common['opacity-48'],
  position: 'relative',
}

const startText = {
  ...common['px-12'],
  position: 'relative',
  'z-index': 2,
}

const startLine = {
  ...common['w-full'],
  position: 'absolute',
  'z-index': 1,
  top: '50%',
  left: 0,
  height: '1px',
}

const input = {
  ...common['w-full'],
  ...common['radius-8'],
  ...common['text-16'],
  height: '48px',
  padding: '0 16px',
  outline: 'none',
  'box-sizing': 'border-box',
}

customStyles += `.input:focus {border: 1px solid ${godfather}}`

const button = {
  ...common['w-full'],
  ...common['flex'],
  ...common['items-center'],
  ...common['justify-center'],
  ...common['text-20'],
  ...common['radius-8'],
  ...common['color-white'],
  height: '50px',
  padding: 0,
  border: 0,
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.25)',
}

const stakeButton = {
  ...common['mt-12'],
  'background-color': godfather,
  background: 'linear-gradient(91.53deg, #4387f0 0%, #3c58eb 98.14%)',
}

const errorButton = {
  'background-color': fargo,
  background: 'linear-gradient(91.53deg, #e34b48 0%, #cc2623 98.14%);',
}

const successButton = {
  'background-color': matrix,
  background: 'linear-gradient(91.53deg, #74b572 0%, #279d21 98.14%);',
}

const backButtonContainer = {
  ...common['mx-16'],
  'margin-top': '-66px',
}

const info = {
  ...common['flex'],
  ...common['flex-col'],
  ...common['items-center'],
  ...common['justify-center'],
  ...common['h-full'],
}

customStyles += `.info svg {width:120px;height:120px;}.info.withButton {max-height: 438px;}`

const infoTitle = {
  ...common['mt-12'],
  ...common['text-38'],
  ...common['semibold'],
}

const infoText = {
  ...common['mt-12'],
  ...common['text-16'],
  ...common['text-center'],
  ...common['opacity-48'],
  'min-height': '48px',
}

const themeStyles = {
  dark: {
    modal: {
      ...common['color-white'],
      background: titanic,
    },
    balance: {
      background: gladiator,
    },
    input: {
      ...common['color-white'],
      background: gladiator,
      'caret-color': white,
      border: '1px solid rgb(255 255 255 / 48%)',
    },
    startLine: {
      background: white,
    },
    startText: {
      background: titanic,
    },
    infoText: {
      ...common['color-white'],
    }
  },
  light: {
    modal: {
      ...common['color-titanic'],
      background: rush,
    },
    balance: {
      background: white,
    },
    input: {
      ...common['color-titanic'],
      background: white,
      'caret-color': titanic,
      border: '1px solid rgb(29 37 59 / 48%)',
    },
    startLine: {
      background: titanic,
    },
    startText: {
      background: rush,
    },
    infoText: {
      ...common['color-titanic'],
    }
  },
}

customStyles += `@media (max-width: 567px){.modal {width: 100%; height: 100%; min-width: 300px;}.modal,.top{border-radius: 0;}}`

const selectors: Selectors = {
  ...common,
  overlay,
  darkOverlay,
  modal,
  closeButton,
  top,
  logo,
  apr,
  aprText,
  balances,
  balance,
  start,
  startText,
  startLine,
  input,
  button,
  stakeButton,
  errorButton,
  successButton,
  backButtonContainer,
  info,
  infoTitle,
  infoText,
}

const getRules = (rules: Rules): string => (
  Object.keys(rules).map((rule) => `${rule}:${rules[rule]}`).join(';')
)

const getSelectorRules = ({ selector, rules }: { selector: string, rules: Rules }): string => (
  `.${selector}{${getRules(rules)}}`
)

const getStyles = (selectors: Selectors): string[] => (
  Object.keys(selectors)
    .map((selector) => getSelectorRules({ selector, rules: selectors[selector]}))
)

const getThemeStyles = (themes: Record<string, Selectors>): string[] => {
  const result: string[] = []

  Object.keys(themes)
    .forEach((theme) => {
      const styles = getStyles(themes[theme])

      result.push(
        ...styles.map((style) => `.${theme} ${style}`)
      )
    })

  return result
}

const styles = [
  ...getStyles(selectors),
  ...getThemeStyles(themeStyles),
  customStyles,
]
  .join('')


export default styles
