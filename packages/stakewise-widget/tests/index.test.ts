import { JSDOM } from 'jsdom'
import Widget from '../src/index'

const { ethers } = require('hardhat')


let address: string
let referral: string

const dom = new JSDOM()

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

  beforeEach(() => {
    global.document = dom.window.document
  })

  it('creates Widget', () => {
    const widget = createWidget()

    expect(typeof widget.open).toEqual('function')
    expect(typeof widget.close).toEqual('function')
  })

  it('throws an error if attachShadow is not supported', () => {
    // @ts-ignore
    global.document.body.attachShadow = null

    expect(() => createWidget()).toThrowError(/Current browser is not supported/)
  })
})
