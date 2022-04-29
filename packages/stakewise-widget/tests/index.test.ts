import { JSDOM } from 'jsdom'
import Widget from '../src/index'

const { ethers } = require('hardhat')


let sender: string
let referrer: string

const dom = new JSDOM()

const createWidget = () => (
  new Widget({
    provider: ethers.provider,
    sender,
    referrer,
  })
)

// Some tests need a bit more time to complete than the default 5 seconds
jest.setTimeout(30000)

describe('src/index.ts', () => {

  beforeAll(async () => {
    const [ account1, account2 ] = await ethers.getSigners()

    sender = account1.address
    referrer = account2.address
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
