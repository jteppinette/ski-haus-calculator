export const defaultState = {
  monthlyRent: 8000,
  monthlyUtilities: 0,
  bedSpots: 11,
  tiers: [
    {
      monthlyRent: 400,
      residentsCount: 5,
      reservedCount: 3
    },
    {
      monthlyRent: 320,
      residentsCount: 18,
      reservedCount: 2
    },
    {
      monthlyRent: 240,
      residentsCount: 5,
      reservedCount: 1
    }
  ],
  modal: false
}

export function getURLState () {
  const params = new URLSearchParams(window.location.search)

  const monthlyRent = params.has('monthlyRent')
    ? parseFloat(params.get('monthlyRent'))
    : null
  const monthlyUtilities = params.has('monthlyUtilities')
    ? parseFloat(params.get('monthlyUtilities'))
    : null
  const bedSpots = params.has('bedSpots')
    ? parseInt(params.get('bedSpots'))
    : null
  const tiersCount = params.has('tiersCount')
    ? parseInt(params.get('tiersCount'))
    : null

  if (
    monthlyRent === null ||
    isNaN(monthlyRent) ||
    monthlyUtilities === null ||
    isNaN(monthlyUtilities) ||
    bedSpots === null ||
    isNaN(bedSpots) ||
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
    const tierReservedCount = params.has(`${i}reservedCount`)
      ? parseInt(params.get(`${i}reservedCount`))
      : null

    if (
      tierMonthlyRent === null ||
      isNaN(tierMonthlyRent) ||
      tierResidentsCount === null ||
      isNaN(tierResidentsCount) ||
      tierReservedCount === null ||
      isNaN(tierReservedCount)
    ) {
      return
    }

    tiers.push({
      monthlyRent: tierMonthlyRent,
      residentsCount: tierResidentsCount,
      reservedCount: tierReservedCount
    })
  }

  return {
    monthlyRent,
    monthlyUtilities,
    bedSpots,
    tiers
  }
}

export function setURLState (state) {
  const params = new URLSearchParams()

  params.set('monthlyRent', state.monthlyRent)
  params.set('monthlyUtilities', state.monthlyUtilities)
  params.set('bedSpots', state.bedSpots)
  params.set('tiersCount', state.tiers.length)
  state.tiers.forEach((tier, index) => {
    params.set(`${index}monthlyRent`, tier.monthlyRent)
    params.set(`${index}residentsCount`, tier.residentsCount)
    params.set(`${index}reservedCount`, tier.reservedCount)
  })

  window.history.replaceState({}, '', `${location.pathname}?${params}`)
}

export function clearURLState () {
  window.history.replaceState({}, '', location.pathname)
}
