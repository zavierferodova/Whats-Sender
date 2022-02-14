import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import { styled } from '@mui/styles'
import colors from 'theme/colors'

const StyledContainedMuiButton = styled(MuiButton)({
  background: colors.light.primary,
  fontFamily: 'DM Sans, sans-serif',
  color: 'white',
  textTransform: 'none',
  '&:hover': {
    background: colors.light.buttonPrimary
  }
})

const StyledOutlinedMuiButton = styled(MuiButton)({
  borderColor: colors.light.primary,
  fontFamily: 'DM Sans, sans-serif',
  color: colors.light.primary,
  textTransform: 'none',
  '&:hover': {
    borderColor: colors.light.primary,
    background: colors.light.buttonPrimaryHover
  }
})

export type ButtonProps = Omit<MuiButtonProps, 'variant'> & {
  variant?: 'outlined'|'contained'
}

function Button (props: ButtonProps) {
  const buttonVariant = props.variant || 'contained'

  if (buttonVariant === 'outlined') {
    return (
      <StyledOutlinedMuiButton {...props}/>
    )
  } else {
    return (
      <StyledContainedMuiButton {...props}/>
    )
  }
}

export default Button
