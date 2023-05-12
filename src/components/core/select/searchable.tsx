import { ComponentProps, useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { makeStyles } from '@mui/styles'
import colors from 'theme/colors'
import { refCallback } from 'utils/component-handler'

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
  select: {
    '& > span + div': {
      border: 'none',
      padding: '0.15rem 0rem 0.15rem 0.75rem'
    },
    '& > span + div > div:first-child': {
      padding: '0'
    },
    '& > span + div:focus-within': {
      boxShadow: 'none'
    }
  },
  input: {
    position: 'absolute',
    width: '100%',
    height: '1px',
    opacity: 0
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
    zIndex: '1'
  },
  labelActive: {
    position: 'absolute',
    transformOrigin: 'top left',
    transform: 'translate(1rem, -0.5rem) scale(1)',
    transition: '200ms',
    fontSize: '0.8rem',
    color: 'rgba(0, 0, 0, 0.6)',
    top: '0',
    left: '0',
    zIndex: '1'
  },
  labelFocus: {
    position: 'absolute',
    transformOrigin: 'top left',
    transform: 'translate(1rem, -0.5rem) scale(1)',
    transition: '200ms',
    fontSize: '0.8rem',
    color: colors.light.primary,
    top: '0',
    left: '0',
    zIndex: '1'
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

const selectWithLabelStyle = {
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: 'transparent'
  })
}

export type SelectSearchItemValue = {
  label: string
  value: string
}

/**
 * Generate empty select search object
 * @generator
 * @returns
 */
export function selectSearchInitialValue () {
  return {
    label: '',
    value: ''
  }
}

export type SelectSearchProps = ComponentProps<typeof AsyncSelect> & {
  required?: boolean,
  selectRef?: (element: any) => void,
  label?: string
}

function SelectSearch (props: SelectSearchProps) {
  const classes = useStyles()
  const inputValue: any = props.value || ''
  const isHasLabel = Boolean(props.label)
  const [selectRef, setSelectRef] = useState<HTMLElement|null>(null)
  const [isFocus, setIsFocus] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  let selectClass = classes.select

  /**
   * Set element ref to state
   * @param element
   */
  const handleSetRef = (element: any) => {
    refCallback(element, setSelectRef)
    if (props.selectRef) {
      props.selectRef(element)
    }
  }

  const EventHandler = {
    /**
     * Set focus on select element ref
     */
    handleOnFocus: () => {
      setIsFocus(true)
      if (selectRef) {
        selectRef.focus()
      }
    },

    /**
     * Set focus state to false
     */
    handleOnBlur: () => {
      setIsFocus(false)
    }
  }

  useEffect(() => {
    setIsFilled(Boolean(props.value))
  }, [props.value])

  if (props.className) {
    selectClass += ` ${props.className}`
  }

  return (
    <div className={(isFocus) ? classes.containerFocus : classes.container}
      onFocus={EventHandler.handleOnFocus}
      onBlur={EventHandler.handleOnBlur}>
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
      <AsyncSelect
        {...props}
        styles={(isHasLabel && !isFocus) ? selectWithLabelStyle : undefined}
        ref={handleSetRef}
        className={selectClass}
        />
      <fieldset className={(isFocus) ? classes.outlineActive : classes.outline}>
        <legend className={((isFocus || isFilled) && props.label) ? classes.outlineLegendActive : classes.outlineLegend }>
          <span>
            {(props.required) ? `${props.label} *` : props.label || ''}
          </span>
        </legend>
      </fieldset>
      <input
        tabIndex={-1}
        autoComplete="off"
        className={classes.input}
        onFocus={EventHandler.handleOnFocus}
        required={Boolean(props.required)}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
        value={inputValue}/>
    </div>
  )
}

export default SelectSearch
