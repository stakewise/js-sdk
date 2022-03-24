type Rules = Record<string, string | number>
type Selectors = Record<string, Rules>

const white = '#fff'
const rush = '#f5f6fa'

const black = '#1d253b'

let customStyles = ''

const flex = {
  'flex': {
    display: 'flex',
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
  'text-50': {
    'font-size': '50px',
    'line-height': '75px',
  },
}

const color = {
  'color-white': {
    'color': white,
  },
  'color-black': {
    'color': black,
  },
}

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
  height: '513px',
  margin: 'auto',
  background: rush,
  'font-family': 'Poppins, sans-serif',
  'text-rendering': 'optimizeLegibility',
  '-webkit-overflow-scrolling': 'touch',
}

const loader = {
  // position: 'absolute',
  // top: 'calc(50% - 24px)',
  // left: calc(50% - 24px),
  // width: 48px,
  // height: 48px,
  // border: 5px solid rgba(39, 41, 61, 0.4),
  // border-bottom-color: rgba(39, 41, 61, 0.1),
  // border-radius: 50%,
  // display: inline-block,
  // box-sizing: border-box,
  // animation: rotation 1s linear infinite,
}

const top = {
  'padding-bottom': '48px',
  background: 'linear-gradient(104.32deg, #4386f0 1.28%, #1d253b 100%)',
  'border-radius': '8px 8px 0 0',
}

const closeButton = {
  ...common['color-white'],
  ...common['opacity-48'],
  top: '12px',
  right: '12px',
  position: 'absolute',
  border: 0,
  background: 'transparent',
}

const logo = {
  ...common['flex'],
  ...common['items-center'],
  ...common['justify-start'],
  ...common['pt-12'],
  ...common['px-12'],
}

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

customStyles += `.input:focus {border: 1px solid #3d59ec}`

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
  'background-color': '#3d59ec',
  background: 'linear-gradient(91.53deg, #4387f0 0%, #3c58eb 98.14%)',
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.25)',
  color: white,
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
}

const getRules = (rules: Rules) => (
  Object.keys(rules).map((rule) => `${rule}:${rules[rule]}`).join(';')
)

const styles = Object.keys(selectors)
  .map((selector) => `.${selector}{${getRules(selectors[selector])}}`)
  .concat(customStyles)
  .join('')


export default styles
