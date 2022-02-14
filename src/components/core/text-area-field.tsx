import { ChangeEvent, useEffect, useState } from 'react'
import MuiTextAreaAutoSize, { TextareaAutosizeProps } from '@mui/material/TextareaAutosize'
import { makeStyles } from '@mui/styles'
import colors from 'theme/colors'

const useStyles = makeStyles({
  container: {
    position: 'relative',
    '&:hover fieldset': {
      borderRadius: '0.5rem',
      border: '1px solid rgba(0, 0, 0, 0.87)'
    }
  },
  containerFocus: {
    position: 'relative'
  },
  textAreaContainer: {
    display: 'block',
    background: 'white',
    width: '100%',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    zIndex: 1
  },
  textArea: {
    width: '100%',
    resize: 'none',
    '&:focus': {
      outline: 'none'
    },
    zIndex: 1
  },
  textAreaWithLabel: {
    width: '100%',
    resize: 'none',
    '&:focus': {
      outline: 'none'
    },
    '&::placeholder': {
      color: 'transparent'
    },
    '&::-webkit-input-placeholder': {
      color: 'transparent'
    },
    zIndex: 1
  },
  label: {
    position: 'absolute',
    transform: 'translate(1rem, 0.5rem) scale(1)',
    transition: '200ms',
    transformOrigin: 'top left',
    pointerEvents: 'none',
    color: 'rgba(0, 0, 0, 0.6)',
    top: '0',
    left: '0',
    zIndex: 'auto'
  },
  labelActive: {
    position: 'absolute',
    transformOrigin: 'top left',
    transform: 'translate(1rem, -0.5rem) scale(1)',
    transition: '200ms',
    fontSize: '0.8rem',
    color: 'rgba(0, 0, 0, 0.6)',
    top: '0',
    left: '0'
  },
  labelFocus: {
    position: 'absolute',
    transformOrigin: 'top left',
    transform: 'translate(1rem, -0.5rem) scale(1)',
    transition: '200ms',
    fontSize: '0.8rem',
    color: colors.light.primary,
    top: '0',
    left: '0'
  },
  outline: {
    display: 'block',
    position: 'absolute',
    margin: '0',
    padding: '0 8px',
    top: '-8px',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderWidth: '1px',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  outlineActive: {
    display: 'block',
    position: 'absolute',
    margin: '0',
    padding: '0 8px',
    top: '-8px',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    borderColor: colors.light.primary,
    borderWidth: '2px',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  outlineLegend: {
    width: 'auto',
    maxWidth: '0.01px',
    visibility: 'hidden',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    '& span': {
      display: 'inline-block',
      padding: '0 5px'
    }
  },
  outlineLegendActive: {
    width: 'auto',
    visibility: 'hidden',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    '& span': {
      display: 'inline-block',
      padding: '0 5px'
    }
  }
})

type TextAreaProps = TextareaAutosizeProps & {
  label?: string
}

function TextAreaField (props: TextAreaProps) {
  const classes = useStyles()
  const [isFocus, setIsFocus] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const isFilled = textAreaValue !== ''
  const filteredProps = [{ ...props }].map(({ label, ...rest }) => rest)[0] // remove label key
  const textAreaClass = (props.label && !isFocus) ? classes.textAreaWithLabel : classes.textArea
  let className = null

  if (props.className) {
    className = textAreaClass + props.className
  } else {
    className = textAreaClass
  }

  /**
   * Set state focus to true
   */
  const handleOnFocus = () => {
    setIsFocus(true)
  }

  /**
   * Set state focus to false
   */
  const handleOnBlur = () => {
    setIsFocus(false)
  }

  /**
   * Handle Material UI textarea onchange event
   * @param event
   */
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
    if (props.onChange) {
      props.onChange(event)
    }
  }

  useEffect(() => {
    setTextAreaValue(props.value?.toString() || '')
  }, [props.value])

  return (
    <div onFocus={handleOnFocus} onBlur={handleOnBlur} className={(isFocus) ? classes.containerFocus : classes.container}>
      {
        (() => {
          let labelClass = classes.label

          if (isFocus) {
            labelClass = classes.labelFocus
          } else if (isFilled) {
            labelClass = classes.labelActive
          }

          return (
            <>
            {
              props.label &&
              <label className={labelClass}>
                {(props.required) ? `${props.label} *` : props.label}
              </label>
            }
            </>
          )
        })()
      }
      <div className={classes.textAreaContainer}>
        <MuiTextAreaAutoSize {...filteredProps} className={className} onChange={handleOnChange}/>
        <fieldset className={(isFocus) ? classes.outlineActive : classes.outline}>
          <legend className={((isFilled || isFocus) && props.label) ? classes.outlineLegendActive : classes.outlineLegend }>
            <span>
              {(props.required) ? `${props.label} *` : props.label || ''}
            </span>
          </legend>
        </fieldset>
      </div>
    </div>
  )
}

export default TextAreaField
