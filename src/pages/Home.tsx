import { ChangeEvent, useRef, useState } from 'react'
import AppBar from 'components/appbar'
import SelectSearch, { SelectSearchItemValue } from 'components/core/select/searchable'
import TextField from 'components/core/text-field'
import InputAdorment from '@mui/material/InputAdornment'
import TextAreaField from 'components/core/text-area-field'
import Fab from '@mui/material/Fab'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import SendIcon from '@mui/icons-material/Send'
import countryPhones from 'data/country-phones'
import colors from 'theme/colors'
import MobileDetect from 'mobile-detect'
import { handleInputChange, handleValueChange } from 'utils/component-handler'
import 'styles/App.css'
import { AsYouType } from 'libphonenumber-js'

const shareButtonStyle = {
  color: colors.light.buttonPrimary,
  '&:hover': {
    backgroundColor: colors.light.buttonSecondaryHover
  }
}

const fabStyle = {
  backgroundColor: colors.light.buttonPrimary,
  color: 'white',
  '&:hover': {
    backgroundColor: colors.light.buttonPrimaryHover
  },
  '.MuiSvgIcon-root': {
    transform: 'translate(10%)'
  }
}

function App () {
  const countryData = countryPhones
  const defaultCountry = countryData.find((country) => country.name === 'Indonesia')
  const defaultSelectValue = {
    label: `${defaultCountry?.emoji} (+${defaultCountry?.phone}) ${defaultCountry?.name}`,
    value: `${defaultCountry?.phone};${defaultCountry?.name}`
  }
  const [selectValue, setSelectValue] = useState<SelectSearchItemValue>(defaultSelectValue)
  const countryCode = countryData.find((country) => country.name === defaultSelectValue.value.split(';')[1]).code
  const [phoneCode, setPhoneCode] = useState(defaultSelectValue.value.split(';')[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [textMessage, setTextMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const validationButtonRef: any = useRef(null)

  const searchCountry = (inputValue: string) => {
    return countryData.filter((country) => {
      const label = `(+${country.phone}) ${country.name}`.toLocaleLowerCase()
      const inputValueLowerCase = inputValue.toLowerCase()
      return label.includes(inputValueLowerCase)
    })
  }

  const FormHandler = {
    /**
     * Handle SelectSearch load value for searching
     * @param inputValue
     * @param callback
     */
    loadSelectValue: (
      inputValue: string,
      callback: (value: SelectSearchItemValue[]) => void
    ) => {
      const countries = searchCountry(inputValue)
      const selectOptions = countries.map((country) => ({
        label: `${country.emoji} (+${country.phone}) ${country.name}`,
        value: `${country.phone};${country.name}`
      }))
      callback(selectOptions)
    },
    /**
     * Handle SearchSelect change value event
     * @param country
     */
    handleSelectChange: (country: any) => {
      handleValueChange(country, setSelectValue)
      setPhoneCode(country.value.split(';')[0])
    },
    /**
     * Set TextField phone number value when changed
     * @param event
     */
    handlePhoneNumberChange: (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.replace(/[^0-9]/g, '')
      let formattedValue = ''

      if (inputValue) {
        formattedValue = new AsYouType(countryCode)
          .input(`+${phoneCode}${inputValue}`)
          .replace(`+${phoneCode} `, '')
          .replaceAll(' ', '-')
      }

      setPhoneNumber(formattedValue)
    }
  }

  const SnackbarHandler = {
    /**
     * Display Snackbar on screen
     * @param message
     */
    open: (message: string) => {
      setSnackbarMessage(message)
      setOpenSnackbar(true)
    },
    /**
     * Hide Snackbar from screen
     */
    close: () => {
      setOpenSnackbar(false)
      setSnackbarMessage('')
    }
  }

  /**
   * Validate is form input ready
   */
  const validateForm = () => {
    const isPhoneCodeExists = Boolean(phoneCode)
    const isPhoneNumberExists = Boolean(phoneNumber)
    return isPhoneCodeExists && isPhoneNumberExists
  }

  /**
   * Get WhatsApp Uri to send some message with platform detection
   * @returns
   */
  const getWhatsAppSendUri = (detectDevice = false) => {
    const md = new MobileDetect(navigator.userAgent)
    let whatsAppUri = ''
    const textPhoneNumber = phoneNumber.replace(/-/g, '')

    if (detectDevice) {
      if (md.mobile()) {
        whatsAppUri = `https://api.whatsapp.com/send?phone=${phoneCode}${textPhoneNumber}`
      } else {
        whatsAppUri = `https://web.whatsapp.com/send?phone=${phoneCode}${textPhoneNumber}`
      }

      if (textMessage) {
        whatsAppUri += `&text=${encodeURIComponent(textMessage)}`
      }
    } else {
      whatsAppUri = `https://wa.me/${phoneCode}${textPhoneNumber}`

      if (textMessage) {
        whatsAppUri += `?text=${encodeURIComponent(textMessage)}`
      }
    }

    return whatsAppUri
  }

  /**
   * Copy uri to clipboard
   */
  const handleCopyUriMessage = async () => {
    try {
      validationButtonRef?.current?.click()
      if (validateForm()) {
        const whatsAppUri = getWhatsAppSendUri()
        await navigator.clipboard.writeText(whatsAppUri)
        SnackbarHandler.open('Sharing link copied to clipboard !')
      }
    } catch (e) {
      // pass
    }
  }

  /**
   * Open new tab and send the message
   */
  const handleSendUriMessage = () => {
    validationButtonRef?.current?.click()
    if (validateForm()) {
      const whatsAppUri = getWhatsAppSendUri(true)
      window.open(whatsAppUri, '_blank')
    }
  }

  return (
    <>
      <AppBar/>
      <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10">
        <Fab sx={fabStyle} onClick={handleSendUriMessage}>
          <SendIcon/>
        </Fab>
      </div>
      <div style={{ backgroundColor: '#f8f9fa' }} className="w-screen">
        <div className="max-w-[1024px] mx-auto p-8 pt-20 min-h-screen bg-white font-roboto flex justify-center items-center">
          <div className="w-full md:w-[28rem] lg:w-[32rem]">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="text-2xl mb-1 heading-ja8ah">Start your conversation !</div>
              <div className="mb-6 text-sm subText-haksy92">Now you can send message without save the number.</div>
              <div className="mb-3">
                <SelectSearch
                  cacheOptions
                  defaultOptions
                  value={selectValue}
                  loadOptions={FormHandler.loadSelectValue}
                  onChange={FormHandler.handleSelectChange}
                  />
              </div>
              <div className="mb-3">
                <TextField
                  required
                  value={phoneNumber}
                  inputProps={{
                    inputMode: 'tel'
                  }}
                  onChange={FormHandler.handlePhoneNumberChange}
                  placeholder="Phone number"
                  InputProps={{
                    startAdornment: (
                      <InputAdorment position='start'>
                        +{phoneCode}
                      </InputAdorment>
                    )
                  }}/>
              </div>
              <div className="mb-3">
                <TextAreaField
                  minRows={4}
                  maxRows={10}
                  value={textMessage}
                  onChange={(e) => handleInputChange(e, setTextMessage)}
                  placeholder="Write message here (optional)"/>
              </div>
              <div className="hidden">
                <Button ref={validationButtonRef} type="submit"></Button>
              </div>
              <div className="text-center">
                <Button sx={shareButtonStyle} onClick={handleCopyUriMessage}>
                  Copy link to share
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={SnackbarHandler.close}
        message={snackbarMessage}
      />
    </>
  )
}

export default App
