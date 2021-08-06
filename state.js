export const defaultState = {
  monthlyRent: 6000,
  tiers: [
    {
      monthlyRent: 400,
      residentsCount: 5,
      description:
        'Each resident is guaranteed three weekend bed spots per month.'
    },
    {
      monthlyRent: 300,
      residentsCount: 15,
      description:
        'Each resident is guaranteed two weekend bed spots per month.'
    },
    {
      monthlyRent: 200,
      residentsCount: 5,
      description:
        'Each resident is guaranteed one weekend bed spots per month.'
    }
  ],
  modal: false
}

export function getURLState () {
  const params = new URLSearchParams(window.location.search)

  const monthlyRent = params.has('monthlyRent')
    ? parseFloat(params.get('monthlyRent'))
    : null
  const tiersCount = params.has('tiersCount')
    ? parseInt(params.get('tiersCount'))
    : null

  if (
    monthlyRent === null ||
    isNaN(monthlyRent) ||
    tiersCount === null ||
    isNaN(tiersCount)
  ) {
    return
  }

  const tiers = []

  for (let i = 0; i < tiersCount; i++) {
    const tierMonthlyRent = params.has(`${i}monthlyRent`)
      ? parseFloat(params.get(`${i}monthlyRent`))
      : null
    const tierResidentsCount = params.has(`${i}residentsCount`)
      ? parseInt(params.get(`${i}residentsCount`))
      : null
    const tierDescription = params.has(`${i}description`)
      ? params.get(`${i}description`)
      : null

    if (
      tierMonthlyRent === null ||
      isNaN(tierMonthlyRent) ||
      tierResidentsCount === null ||
      isNaN(tierResidentsCount) ||
      tierDescription === null
    ) {
      return
    }

    tiers.push({
      monthlyRent: tierMonthlyRent,
      residentsCount: tierResidentsCount,
      description: tierDescription
    })
  }

  return {
    monthlyRent,
    tiers
  }
}

export function setURLState (state) {
  const params = new URLSearchParams()

  params.set('monthlyRent', state.monthlyRent)
  params.set('tiersCount', state.tiers.length)
  state.tiers.forEach((tier, index) => {
    params.set(`${index}monthlyRent`, tier.monthlyRent)
    params.set(`${index}residentsCount`, tier.residentsCount)
    params.set(`${index}description`, tier.description)
  })

  window.history.replaceState({}, '', `${location.pathname}?${params}`)
}

export function clearURLState () {
  window.history.replaceState({}, '', location.pathname)
}
