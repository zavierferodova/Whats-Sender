import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/styles'
import colors from 'theme/colors'

const StyledTextField = styled(MuiTextField)({
  width: '100%',
  height: 'max-content',
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.5rem'
  },
  '& .MuiOutlinedInput-input': {
    padding: '0.5rem 1rem'
  },
  '& .MuiInputLabel-outlined': {
    transform: 'translate(1rem, 0.5rem) scale(1)',
    zIndex: 'auto'
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: colors.light.primary,
    transform: 'translate(0.8rem, -0.5rem) scale(1)',
    fontSize: '0.8rem'
  },
  '& .MuiInputLabel-outlined.MuiFormLabel-filled': {
    transform: 'translate(0.8rem, -0.5rem) scale(1)',
    fontSize: '0.8rem'
  },
  '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
    borderColor: colors.light.primary,
    borderWidth: '2px'
  }
})

function TextField (props: TextFieldProps) {
  return (
    <StyledTextField variant='outlined' {...props}/>
  )
}

export default TextField
