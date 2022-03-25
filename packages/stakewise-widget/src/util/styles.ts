type Rules = Record<string, string | number>
type Selectors = Record<string, Rules>

const white = '#fff'

const matrix = '#6cb069'

const fargo = '#e34b48'

const black = '#1d253b'
const godfather = '#3d59ec'
const rocky = '#4387f1'
const rush = '#f5f6fa'

const modalHeight = '504px'

let customStyles = `
  @keyframes rotation {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}
  @keyframes show-content {from {background-color: rgba(0, 0, 0, 0);}to {background-color: rgba(0, 0, 0, .65);}}
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

type ColorStyle = Record<'color', string>
type ColorClassName = 'color-white' | 'color-black' | 'color-rocky' | 'color-matrix' | 'color-fargo'
type ColorStyles = Record<ColorClassName, ColorStyle>

const colors: Record<string, string> = { white, black, rocky, matrix, fargo }
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
  background: 'rgba(0, 0, 0, .65)',
  animation: 'show-content .4s ease',
}

const modal = {
  ...common['radius-8'],
  ...common['color-black'],
  position: 'relative',
  width: '320px',
  height: modalHeight,
  margin: 'auto',
  background: rush,
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
  'margin-top': '-8px',
  ...common['opacity-48'],
  ...common['text-center'],
}

const balances = {
  'margin-top': '-24px',
  ...common['mx-16'],
}

const balance = {
  ...common['radius-8'],
  ...common['flex'],
  ...common['items-center'],
  ...common['justify-between'],
  padding: '6px 16px',
  'background-color': white,
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.04)',
}

const start = {
  position: 'relative',
  ...common['mt-16'],
  ...common['text-16'],
  ...common['text-center'],
  ...common['opacity-48'],
}

const startText = {
  position: 'relative',
  'z-index': 2,
  ...common['px-12'],
  background: rush,
}

const startLine = {
  position: 'absolute',
  'z-index': 1,
  top: '50%',
  left: 0,
  height: '1px',
  background: black,
  ...common['w-full'],
}

const input = {
  ...common['w-full'],
  ...common['radius-8'],
  ...common['text-16'],
  height: '48px',
  border: '1px solid rgb(29 37 59 / 48%)',
  padding: '0 16px',
  'box-sizing': 'border-box',
}

customStyles += `.input:focus {border: 1px solid ${godfather}}`

const button = {
  ...common['w-full'],
  ...common['mt-12'],
  ...common['flex'],
  ...common['items-center'],
  ...common['justify-center'],
  ...common['text-20'],
  ...common['radius-8'],
  height: '50px',
  padding: 0,
  border: 0,
  'background-color': godfather,
  background: 'linear-gradient(91.53deg, #4387f0 0%, #3c58eb 98.14%)',
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.25)',
  color: white,
}

const info = {
  ...common['flex'],
  ...common['flex-col'],
  ...common['items-center'],
  ...common['justify-center'],
  ...common['semibold'],
  height: modalHeight,
}

customStyles += `.info svg {width:120px;height:120px;}`

const infoTitle = {
  ...common['mt-12'],
  ...common['text-38'],
}

const infoText = {
  ...common['mt-12'],
  ...common['text-16'],
  ...common['text-center'],
  ...common['opacity-48'],
  color: black,
  'min-height': '48px',
}

const selectors: Selectors = {
  ...common,
  overlay,
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
  info,
  infoTitle,
  infoText,
}

const getRules = (rules: Rules) => (
  Object.keys(rules).map((rule) => `${rule}:${rules[rule]}`).join(';')
)

const styles = Object.keys(selectors)
  .map((selector) => `.${selector}{${getRules(selectors[selector])}}`)
  .concat(customStyles)
  .join('')


export default styles
