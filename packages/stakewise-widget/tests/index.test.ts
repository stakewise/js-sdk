import Widget from '../src/index'

const { ethers } = require('hardhat')


let address: string
let referral: string

const createWidget = () => (
  new Widget({
    provider: ethers.provider,
    address,
    referral,
  })
)

describe('src/index.ts', () => {

  beforeAll(async () => {
    const [ account1, account2 ] = await ethers.getSigners()

    address = account1.address
    referral = account2.address
  })

  it('creates Widget', () => {
    global.document = {
      body: {
        // @ts-ignore
        attachShadow: () => {},
      },
    }

    const widget = createWidget()

    expect(typeof widget.open).toEqual('function')
    expect(typeof widget.close).toEqual('function')
  })

  it('throws an error if attachShadow is not supported', () => {
    global.document = {
      // @ts-ignore
      body: {},
    }

    expect(() => createWidget()).toThrowError(/Current browser is not supported/)
  })
})
