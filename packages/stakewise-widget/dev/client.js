import { providers } from 'ethers'
import Widget from '../dist'


let theme = 'dark'

const openWidgetButton = document.createElement('button')
openWidgetButton.classList.add('gradient')
openWidgetButton.innerHTML = 'Open widget'
openWidgetButton.onclick = () => {
  const widget = new Widget({
    address: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
    referral: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
    provider: new providers.Web3Provider(window.web3?.currentProvider),
    onError: (data) => {
      console.log('error', data)
    }
  })

  widget.open()
}

const text = document.createElement('div')

text.innerHTML = 'or'
text.classList.add('text')

const changeThemeButton = document.createElement('button')
changeThemeButton.classList.add('blue')
changeThemeButton.innerHTML = 'Change theme'
changeThemeButton.onclick = () => {
  const currentTheme = theme
  const newTheme = theme === 'dark' ? 'white' : 'dark'

  document.body.classList.add(newTheme)
  document.body.classList.remove(currentTheme)

  theme = newTheme
}

const container = document.createElement('div')
container.classList.add('container')

const footer = document.createElement('div')
footer.classList.add('footer', 'blue')
footer.innerHTML = `
  <div class="footer flex">
    <div class="content flex justify-start">
      <div class="flex">
        <img
          src="https://frontend-c0mqktmxw-stakewise.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fswise.475817f4.png&w=64&q=75"
          width="32px"
        />
        <div class="ml-8 text-20">STAKEWISE</div>
      </div>
      <div class="ml-24 text-12">
        StakeWise is an Ethereum 2.0 staking service that strives<br />
        to achieve the highest possible yield for users.<br />
        Anyone with at least 0.001 ETH can participate.
      </div>
    </div>
  </div>
`

// Example styles
document.body.innerHTML = `
<style>
body {
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  
  font-family: Poppins, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-overflow-scrolling: touch;
}

body.dark {
  background-image: linear-gradient(#1e1e2f, #1e1e24);
}

body.light {
  background-color: #f5f6fa;
}

button {
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  border-radius: 8px;
  
  min-width: 200px;
  padding: 20px 24px;
  font-size: 18px;
  line-height: 20px;
}

.container {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer {
  width: 100%;
  flex: none;
  padding: 20px 36px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  margin-left: 24px;
}

.gradient {
  background: linear-gradient(-45deg, #3358f4, #1d8cf8, #fd5d93, #ff8d72, #3358f4, #1d8cf8, #fd5d93, #ff8d72);
  background-size: 800% 800%;
  transition: .2s;
  animation: gradient 20s ease infinite;
}

.blue {
  background-color: #1d8cf8;
  background-image: linear-gradient(to bottom left, #1d8cf8, #3358f4, #1d8cf8);
}

.text {
  margin: 20px 0;
}

.flex {
  display: flex;
  align-items: center;
}

.justify-start {
  justify-content: flex-start;
}

.text-12 {
  font-size: 12px;
  line-height: 14px;
}

.text-20 {
  font-size: 20px;
  line-height: 24px;
}

.ml-8 {
  margin-left: 8px;
}

.ml-24 {
  margin-left: 24px;
}


@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
`

document.body.classList.add(theme)
container.append(openWidgetButton, text, changeThemeButton)
document.body.append(container, footer)
