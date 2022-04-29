const commonStyles = `
// Common styles

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
}

.modal {
  border-radius: 8px;
  position: relative;
  width: 320px;
  height: 504px;
  margin: auto;
  box-shadow: 0 0 24px rgb(29 37 59 / 24%);
  font-family: Poppins, sans-serif;
  text-rendering: optimizeLegibility;
}

.closeButton {
  opacity: 0.48;
  top: 12px;
  right: 12px;
  position: absolute;
  padding: 0;
  border: 0;
  background: transparent;
}

.top {
  padding-bottom: 48px;
  background: linear-gradient(104.32deg, #4386f0 1.28%, #1d253b 100%);
  border-radius: 8px 8px 0 0;
  color: #fff;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
}

.logoText {
  margin-left: 6px;
  font-size: 14px;
  line-height: 21px;
}

.apr {
  margin-top: 6px;
  font-size: 50px;
  line-height: 75px;
  text-align: center;
  font-weight: 600;
}

.aprText {
  opacity: 0.48;
  text-align: center;
  margin-top: -8px;
}

.balances {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: -24px;
}

.balance {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}

.balanceValue {
  text-align: right;
}

.balanceTokenValue {
  font-size: 14px;
  line-height: 21px;
}

.balanceFiatValue {
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.8px;
  opacity: 0.48;
}

.start {
  margin-top: 16px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  opacity: 0.48;
  position: relative;
}

.startText {
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  z-index: 2;
}

.startLine {
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 0;
  height: 1px;
}

.input {
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  height: 48px;
  padding: 0 16px;
  outline: none;
  box-sizing: border-box;
}

.button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 30px;
  border-radius: 8px;
  color: #fff;
  height: 50px;
  padding: 0;
  border: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.stakeButton {
  margin-top: 16px;
  background-color: #3d59ec;
  background: linear-gradient(91.53deg, #4387f0 0%, #3c58eb 98.14%);
}

.errorButton {
  background-color: #e34b48;
  background: linear-gradient(91.53deg, #e34b48 0%, #cc2623 98.14%);
}

.successButton {
  background-color: #6cb069;
  background: linear-gradient(91.53deg, #74b572 0%, #279d21 98.14%);
}

.backButtonContainer {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: -66px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.infoTitle {
  margin-top: 12px;
  font-size: 38px;
  line-height: 57px;
  font-weight: 600;
  text-transform: capitalize;
}

.infoText {
  margin-top: 12px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  opacity: 0.48;
  min-height: 48px;
}

#content {
  height: 100%;
}

button {
  line-height: 0;
  cursor: pointer;
}

.balance+.balance {
  margin-top: 12px;
}

.input:focus {
  border: 1px solid #3d59ec;
}

.info.withButton {
  max-height: 438px;
}

.info.error .infoTitle {
  color: #e34b48;
}

.info.loading .infoTitle {
  color: #4387f1;
}

.info.success .infoTitle {
  color: #6cb069;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes show-content {
  from {
    background-color: rgba(0, 0, 0, 0);
  }

  to {
    background-color: rgba(0, 0, 0, .48);
  }
}

@media (max-width: 567px) {
  .modal {
    width: 100%;
    height: 100%;
    min-width: 300px;
  }

  .modal,
  .top {
    border-radius: 0;
  }
}
`

const light = `
// Light theme styles

.modal {
  color: #1d253b;
  background: #f5f6fa;
}

.dataView {
  color: #1d253b;
}

.infoView {
  color: #fff;
}

.balance {
  background: #fff;
}

.input {
  color: #1d253b;
  background: #fff;
  caret-color: #1d253b;
  border: 1px solid rgb(29 37 59 / 48%);
}

.startLine {
  background: #1d253b;
}

.startText {
  background: #f5f6fa;
}

.infoText {
  color: #1d253b;
}
${commonStyles}`

const dark = `
// Dark theme styles

.modal {
  color: #fff;
  background: #1d253b;
}

.closeButton {
  color: #fff;
}

.balance {
  background: #2c375b;
}

.input {
  color: #fff;
  background: #2c375b;
  caret-color: #fff;
  border: 1px solid rgb(255 255 255 / 48%);
}

.startLine {
  background: #fff;
}

.startText {
  background: #1d253b;
}

.infoText {
  color: #fff;
}
${commonStyles}`

const darkOverlay = `// Dark overlay styles

.overlay {
  background: rgba(0, 0, 0, .48);
  animation: show-content .4s ease;
}
`

const blurOverlay = `// Blur overlay styles
// To blur content behind the widget 'widgetOpen' class should be added to the page body on widget open click

body.widgetOpen > * {
  transition: filter ease 0.6s;
}

body.widgetOpen > *:not(.overlay) {
  filter: blur(8px);
}
`

const styles = {
  light,
  dark,
  darkOverlay,
  blurOverlay,
}


export default styles
