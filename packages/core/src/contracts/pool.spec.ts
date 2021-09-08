import { ChainId } from '../common'
import { PoolContract } from './pool'

describe('PoolContract', () => {
  const ADDRESS_0 = '0xEd519800CeA0f6DDCf161a21a33103028C3Cbc38'
  const ADDRESS_1 = '0xb325DBe78841faF14D4aCC0B70B1667d94764C64'

  describe('address', () => {
    it('fails if invalid chain id set', () => {
      expect(() => PoolContract.getAddress(1000)).toThrow('1000 is invalid chain id')
    })
    it('returns contract address', () => {
      expect(PoolContract.getAddress(ChainId.Mainnet)).toEqual('0xC874b064f465bdD6411D45734b56fac750Cda29A')
      expect(PoolContract.getAddress(ChainId.Goerli)).toEqual('0x8c1EfEcFb5c4F1099AB0460b5659342943764Df7')
    })
  })

  describe('stake', () => {
    it('fails if recipient address is invalid', () => {
      expect(() =>
        PoolContract.getStakeCalldata({
          recipient: 'hello',
        }),
      ).toThrow('hello is not a valid address')
    })
    it('fails if partner address is invalid', () => {
      expect(() =>
        PoolContract.getStakeCalldata({
          partner: 'hello',
        }),
      ).toThrow('hello is not a valid address')
    })
    it('encodes calldata', () => {
      expect(PoolContract.getStakeCalldata()).toEqual('0x3a4b66f1')
    })
    it('encodes calldata with recipient and partner', () => {
      expect(
        PoolContract.getStakeCalldata({
          recipient: ADDRESS_0,
          partner: ADDRESS_1,
        }),
      ).toEqual(
        '0x9a548a44000000000000000000000000b325dbe78841faf14d4acc0b70b1667d94764c64000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc38',
      )
    })
    it('encodes calldata with recipient', () => {
      expect(
        PoolContract.getStakeCalldata({
          recipient: ADDRESS_0,
        }),
      ).toEqual('0x9cc776f5000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc38')
    })
    it('encodes calldata with partner', () => {
      expect(
        PoolContract.getStakeCalldata({
          partner: ADDRESS_1,
        }),
      ).toEqual('0x0395501f000000000000000000000000b325dbe78841faf14d4acc0b70b1667d94764c64')
    })
  })

  describe('activate', () => {
    it('fails if account is invalid', () => {
      expect(() =>
        PoolContract.getActivateCalldata({
          account: 'hello',
          validatorIndexes: 1,
        }),
      ).toThrow('hello is not a valid address')
    })
    it('fails if validator index is invalid', () => {
      expect(() =>
        PoolContract.getActivateCalldata({
          account: ADDRESS_0,
          validatorIndexes: 1.2,
        }),
      ).toThrow('1.2 is not a valid validator index')
    })
    it('fails if validator indexes are invalid', () => {
      expect(() =>
        PoolContract.getActivateCalldata({
          account: ADDRESS_0,
          validatorIndexes: [1, 2, 3.1],
        }),
      ).toThrow('1,2,3.1 is not a valid validator index')
    })
    it('encodes calldata with single validator', () => {
      expect(
        PoolContract.getActivateCalldata({
          account: ADDRESS_0,
          validatorIndexes: 1,
        }),
      ).toEqual(
        '0xca11be69000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc380000000000000000000000000000000000000000000000000000000000000001',
      )
    })
    it('encodes calldata with multiple validators', () => {
      expect(
        PoolContract.getActivateCalldata({
          account: ADDRESS_0,
          validatorIndexes: [1, 2, 3],
        }),
      ).toEqual(
        '0x3a76e0a2000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc3800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003',
      )
    })
  })

  describe('can activate', () => {
    it('fails if validator index is invalid', () => {
      expect(() => PoolContract.getCanActivateCalldata(1.2)).toThrow('1.2 is not a valid validator index')
    })
    it('encodes calldata', () => {
      expect(PoolContract.getCanActivateCalldata(1)).toEqual(
        '0x5cfbd6100000000000000000000000000000000000000000000000000000000000000001',
      )
    })
  })

  describe('activation scheduled', () => {
    it('fails if sender is invalid', () => {
      expect(() => PoolContract.getActivationScheduledFilterTopics('hello')).toThrow('hello is not a valid address')
    })
    it('encodes filter topics', () => {
      expect(PoolContract.getActivationScheduledFilterTopics()).toEqual([
        '0x120d5ad3462d3df3f0abd736b8b4770ec826cf7b160eafb242311244031a0d41',
      ])
    })
    it('encodes filter topics with sender', () => {
      expect(PoolContract.getActivationScheduledFilterTopics(ADDRESS_0)).toEqual([
        '0x120d5ad3462d3df3f0abd736b8b4770ec826cf7b160eafb242311244031a0d41',
        '0x000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc38',
      ])
    })
  })

  describe('activated', () => {
    it('fails if account is invalid', () => {
      expect(() =>
        PoolContract.getActivatedFilterTopics({
          account: 'hello',
        }),
      ).toThrow('hello is not a valid address')
    })
    it('fails if sender is invalid', () => {
      expect(() =>
        PoolContract.getActivatedFilterTopics({
          sender: 'hello',
        }),
      ).toThrow('hello is not a valid address')
    })
    it('encodes filter topics', () => {
      expect(PoolContract.getActivatedFilterTopics()).toEqual([
        '0x5d5cc41341077fc8907130f1a5db8c754d0b286b8121170b6dc4741b1658849a',
      ])
    })
    it('encodes filter topics with account', () => {
      expect(
        PoolContract.getActivatedFilterTopics({
          account: ADDRESS_0,
        }),
      ).toEqual([
        '0x5d5cc41341077fc8907130f1a5db8c754d0b286b8121170b6dc4741b1658849a',
        '0x000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc38',
      ])
    })
    it('encodes filter topics with sender', () => {
      expect(
        PoolContract.getActivatedFilterTopics({
          sender: ADDRESS_1,
        }),
      ).toEqual([
        '0x5d5cc41341077fc8907130f1a5db8c754d0b286b8121170b6dc4741b1658849a',
        null,
        '0x000000000000000000000000b325dbe78841faf14d4acc0b70b1667d94764c64',
      ])
    })
    it('encodes filter topics with account and sender', () => {
      expect(
        PoolContract.getActivatedFilterTopics({
          account: ADDRESS_0,
          sender: ADDRESS_1,
        }),
      ).toEqual([
        '0x5d5cc41341077fc8907130f1a5db8c754d0b286b8121170b6dc4741b1658849a',
        '0x000000000000000000000000ed519800cea0f6ddcf161a21a33103028c3cbc38',
        '0x000000000000000000000000b325dbe78841faf14d4acc0b70b1667d94764c64',
      ])
    })
  })
})
