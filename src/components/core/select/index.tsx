import SelectSearch from './searchable'
import MuiSelect, { SelectProps } from '@mui/material/Select'
import { FormControl, InputLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'
import colors from 'theme/colors'

const useStyles = makeStyles({
  selectFormControl: {
    width: '100%',
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
    '& .MuiOutlinedInput-root .MuiSelect-iconOpen + .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.light.primary,
      borderWidth: '2px'
    },
    '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.light.primary,
      borderWidth: '2px'
    }
  }
})

function Select (props: SelectProps) {
  const classes = useStyles()

  return (
    <FormControl className={classes.selectFormControl}>
      {
        props.label &&
        <InputLabel>{props.label}</InputLabel>
      }
      <MuiSelect variant="outlined" {...props}>
        {props.children}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
export { SelectSearch }
