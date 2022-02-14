import { countries } from 'countries-list'

export const countryPhones = formatCountriesData(countries)

/**
 * Spread multiple phone value to single object
 * @param countries
 * @returns
 */
function formatCountriesData (countries: any) {
  const keys = Object.keys(countries)
  const values: any[] = Object.values(countries)
  const mappedCountryData = values.map((value, index) => ({
    ...value,
    code: keys[index]
  }))

  const countryMultiplePhoneCode: any[] = []
  mappedCountryData.forEach((country: any) => {
    const phoneList = country.phone.split(',')
    if (phoneList.length > 1) {
      countryMultiplePhoneCode.push(country)
    }
  })

  const spreadMultiplePhoneCountry: any[] = []
  countryMultiplePhoneCode.forEach((country: any) => {
    const phoneList = country.phone.split(',')
    for (const phoneCode of phoneList) {
      const newCountryData = { ...country }
      newCountryData.phone = phoneCode
      spreadMultiplePhoneCountry.push(newCountryData)
    }
  })

  for (const country of countryMultiplePhoneCode) {
    const sliceSameNames = spreadMultiplePhoneCountry.filter(spreadCountry => country.name === spreadCountry.name)
    const indexPosition = mappedCountryData.findIndex(countryData => countryData.name === country.name)
    mappedCountryData.splice(indexPosition, 1, ...sliceSameNames)
  }

  return mappedCountryData
}

export default countryPhones
