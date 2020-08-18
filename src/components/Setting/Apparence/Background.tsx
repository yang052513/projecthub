import React, { useState, useContext } from 'react'
import firebase from 'firebase'
import { Progress } from '../../shared/Progress'
import { Feedback } from '../../shared/Feedback'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import { SwatchesPicker } from 'react-color'
import { ThemeContext } from '../../../context/ThemeContext'
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    padding: '0',
  },
  menuItem: {
    fontSize: '13px',
  },
}))

export const Background: React.FC = () => {
  const theme: any = useContext(ThemeContext)
  console.log(theme)
  const classes = useStyles()
  const db = firebase.firestore()
  const user = firebase.auth().currentUser
  const storageRef = firebase.storage().ref()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [error, setError] = useState(false)

  //更改背景图片
  function handleBgUpload() {
    setLoading(true)
    let imgInput: any = document.getElementById('img-input')
    let file = imgInput.files[0]

    if (file) {
      let metadata = {
        contentType: file.type,
      }
      let upload = storageRef.child(file.name).put(file, metadata)
      upload
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(`背景图成功上传到数据库~'${url}`)
          if (user) {
            db.collection('user')
              .doc(user.uid)
              .collection('Setting')
              .doc('Apparence')
              .update({
                background: url,
                backgroundColor: false,
                customBackground: firebase.firestore.FieldValue.arrayUnion(url),
              })
          }
          setLoading(false)
          setFeedback(true)
        })
    } else {
      setLoading(false)
      setError(true)
    }
  }

  function handleReload() {
    window.location.reload()
  }

  function handleError() {
    setError(false)
  }

  const customBgRender =
    theme.theme.customBackground.length === 0
      ? null
      : theme.theme.customBackground.map((bg: any) => (
          <img onClick={theme.handleSwitch} id={bg} key={bg} src={bg} alt="" />
        ))

  return (
    <div className="setting-content-background">
      {loading === true ? <Progress /> : null}
      {/* 项目创建成功反馈 */}
      {feedback === true ? (
        <div>
          <Feedback
            msg="Success"
            info="Background changed successfully ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            toggle={handleReload}
          />
        </div>
      ) : null}

      {error === true ? (
        <div>
          <Feedback
            msg="Error"
            info="Didnt detect any backgroud changes ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_scare.png"
            toggle={handleError}
          />
        </div>
      ) : null}

      <div className="setting-content-background-header">
        <h3 className="setting-content-subtit">Background</h3>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Options</InputLabel>
          <Select
            value={theme.theme.option}
            onChange={theme.handleOptions}
            label="Options"
          >
            <MenuItem className={classes.menuItem} value={'Color'}>
              Color
            </MenuItem>
            <MenuItem className={classes.menuItem} value={'Images'}>
              Images
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="setting-content-background-demo">
        {theme.theme.backgroundColor ? (
          <div
            style={{ backgroundColor: theme.theme.background }}
            className="color-placeholder"
          ></div>
        ) : (
          <img src={theme.theme.background} alt="preview demo placeholder" />
        )}
      </div>

      <div className="setting-content-background-options">
        {/* 系统内置壁纸 */}
        {theme.theme.option === 'Color' ? (
          <div>
            <SwatchesPicker
              width={600}
              height={300}
              onChange={theme.handleColor}
            />
          </div>
        ) : (
          <div>
            <img
              id="/images/theme/background/1.jpg"
              onClick={theme.handleSwitch}
              src="/images/theme/background/1-demo.jpg"
              alt=""
            />
            <img
              id="/images/theme/background/2.jpg"
              onClick={theme.handleSwitch}
              src="/images/theme/background/2-demo.jpg"
              alt=""
            />
            <img
              id="/images/theme/background/3.jpg"
              onClick={theme.handleSwitch}
              src="/images/theme/background/3-demo.jpg"
              alt=""
            />
            <img
              id="/images/theme/background/4.jpg"
              onClick={theme.handleSwitch}
              src="/images/theme/background/4-demo.jpg"
              alt=""
            />
            <img
              id="/images/theme/background/5.jpg"
              onClick={theme.handleSwitch}
              src="/images/theme/background/5-demo.jpg"
              alt=""
            />

            {/* 用户已经上传的壁纸 */}
            {customBgRender}

            <div className="setting-content-profile-header">
              <input id="img-input" name="profile-input" type="file" />
              <label htmlFor="img-input">
                <p>Upload Images</p>
              </label>
              <button onClick={handleBgUpload}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
