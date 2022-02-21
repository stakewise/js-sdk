import faker from '@faker-js/faker'
import fetchMock from 'jest-fetch-mock'

import fetchPoolStats from './fetchPoolStats'
import type { ApiResponse } from './fetchPoolStats'


fetchMock.enableMocks()

beforeEach(() => {
  fetchMock.resetMocks()
})
afterEach(() => {
  fetchMock.mockRestore()
})

export const mockJSON = <T>(data: T) => {
  const body = JSON.stringify({ data })

  fetchMock.mockResponse(() => Promise.resolve({ body }))
}

export const mockResponse = (body: string) => {
  fetchMock.mockResponse(() => Promise.resolve({ body }))
}

export const mockReject = (error: string) => fetchMock.mockReject(new Error(error))

const apiUrl = faker.internet.url()
const requestProps = [ `${apiUrl}/pool-stats/` ]
const responseDataKeys = [ 'validatorsAPR', 'activatedValidators', 'activationDuration' ]

export const mockData = {
  activation_duration: faker.datatype.number(),
  activated_validators: faker.datatype.number(),
  validators_apr: faker.datatype.number().toString(),
}

describe('util/fetchPoolStats.ts', () => {

  it('requests rest api on fetchPoolStats method call', async () => {
    mockJSON<ApiResponse>(mockData)

    await fetchPoolStats(apiUrl)

    expect(fetchMock.mock.calls).toEqual([ requestProps ])
  })

  it('modifies response on fetchPoolStats method call', async () => {
    mockJSON<ApiResponse>(mockData)

    const result = await fetchPoolStats(apiUrl)

    expect(Object.keys(result)).toEqual(responseDataKeys)

    const isNumbers = Object.values(result).every((value: unknown) => typeof value === 'number')

    expect(isNumbers).toEqual(true)
  })

  it('throws an error if there is no json in the response', async () => {
    mockResponse(faker.random.words())

    await expect(() => fetchPoolStats(apiUrl)).rejects.toThrow()
  })

  it('throws an error if fetch is failed', async () => {
    const error = faker.random.words()

    mockReject(error)

    await expect(() => fetchPoolStats(apiUrl)).rejects.toThrowError(error)
  })
})
