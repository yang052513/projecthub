import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { Flag } from './Flag'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '30px',
  },
  radio: {
    '&$checked': {
      color: 'rgb(14,93,211)',
    },
  },
  checked: {},
}))

export const SelectLang: React.FC = () => {
  const classes = useStyles()
  const [lang, setLang] = useState<string>('')

  const handleLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value)
  }

  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroup
        aria-label="lang"
        name="lang"
        value={lang}
        onChange={handleLang}
      >
        <hr />
        <div className="setting-content-lang-list">
          <FormControlLabel
            value="en"
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
              />
            }
            label="English(USA)"
          />
          <Flag country="English(USA)" flag="/images/countries/usa.png" />
        </div>
        <hr />

        <div className="setting-content-lang-list">
          <FormControlLabel
            value="enuk"
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
              />
            }
            label="English(UK)"
          />
          <Flag country="English(UK)" flag="/images/countries/uk.png" />
        </div>
        <hr />

        <div className="setting-content-lang-list">
          <FormControlLabel
            value="cn"
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
              />
            }
            label="简体中文"
          />
          <Flag
            country="Chines(Simplified)"
            flag="/images/countries/china.png"
          />
        </div>
        <hr />

        <div className="setting-content-lang-list">
          <FormControlLabel
            value="cnt"
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
              />
            }
            label="繁体中文"
          />
          <Flag
            country="Chinese(Traditional)"
            flag="/images/countries/china.png"
          />
        </div>
        <hr />

        <div className="setting-content-lang-list">
          <FormControlLabel
            value="jp"
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
              />
            }
            label="にほんご"
          />
          <Flag country="Japanese" flag="/images/countries/japan.png" />
        </div>
        <hr />

        <div className="setting-content-lang-list">
          <FormControlLabel
            value="ka"
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
              />
            }
            label="한국어"
          />
          <Flag country="Korean" flag="/images/countries/korean.png" />
        </div>
        <hr />
      </RadioGroup>

      <div className="setting-content-save">
        <button>Save</button>
      </div>
    </FormControl>
  )
}
