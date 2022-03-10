const request = <T>(url: string): Promise<T> => (
  new Promise((resolve, reject) => {
    fetch(url)
      .then(
        async (res) => {
          try {
            const result = await res.json()

            resolve(result?.data)
          }
          catch (error) {
            reject(error)
          }
        },
        (error) => reject(error),
      )
  })
)

export type ApiResponse = {
  activation_duration: number
  activated_validators: number
  validators_apr: string
}

export type FetchPoolStatsResult = {
  activationDuration: number
  activatedValidators: number
  validatorsAPR: number
}

const fetchPoolStats = (api: string): Promise<FetchPoolStatsResult> => (
  request<ApiResponse>(`${api}/pool-stats/`)
    .then(({ activation_duration, activated_validators, validators_apr, ...rest }) => ({
      validatorsAPR: Number(validators_apr),
      activatedValidators: activated_validators,
      activationDuration: activation_duration * 1000,
    }))
)


export default fetchPoolStats
