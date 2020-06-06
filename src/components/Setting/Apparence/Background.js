import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Progress from '../../Progress'
import Feedback from '../../Feedback'
import Loading from '../../Loading'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import { SwatchesPicker } from 'react-color'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default function Background(props) {
  const classes = useStyles()
  const db = firebase.firestore()
  const storageRef = firebase.storage().ref()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [error, setError] = useState(false)

  //更改背景图片
  function handleBgUpload() {
    setLoading(true)
    let file = document.getElementById('img-input').files[0]
    if (file) {
      let metadata = {
        contentType: file.type,
      }
      let upload = storageRef.child(file.name).put(file, metadata)
      upload
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(`背景图成功上传到数据库~'${url}`)
          firebase.auth().onAuthStateChanged((user) => {
            db.collection('user')
              .doc(user.uid)
              .collection('Setting')
              .doc('Apparence')
              .update({
                background: url,
                backgroundColor: false,
                customBackground: firebase.firestore.FieldValue.arrayUnion(url),
              })
          })
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
    props.customBg.length === 0
      ? null
      : props.customBg.map((bg) => (
          <img onClick={props.switchImgPreview} id={bg} key={bg} src={bg} />
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

      <h3 className="setting-content-subtit">Background</h3>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Options</InputLabel>
        <Select
          native
          value={props.options}
          onChange={props.switchOption}
          label="Options"
          inputProps={{
            name: 'options',
          }}
        >
          <option value={'Color'}>Color</option>
          <option value={'Images'}>Images</option>
        </Select>
      </FormControl>

      <div className="setting-content-background-demo">
        {props.demo.backgroundColor ? (
          <div
            style={{ backgroundColor: props.demo.backgroundRef }}
            className="color-placeholder"
          ></div>
        ) : (
          <img src={props.demo.backgroundRef} alt="preview demo placeholder" />
        )}
      </div>

      <div className="setting-content-background-options">
        {/* 系统内置壁纸 */}
        {props.options === 'Color' ? (
          <div>
            <SwatchesPicker
              width={'600px'}
              height={'300px'}
              onChange={props.switchColorPreview}
            />
          </div>
        ) : (
          <div>
            <img
              id="/images/theme/background/1.jpg"
              onClick={props.switchImgPreview}
              src="/images/theme/background/1-demo.jpg"
            />
            <img
              id="/images/theme/background/2.jpg"
              onClick={props.switchImgPreview}
              src="/images/theme/background/2-demo.jpg"
            />
            <img
              id="/images/theme/background/3.jpg"
              onClick={props.switchImgPreview}
              src="/images/theme/background/3-demo.jpg"
            />
            <img
              id="/images/theme/background/4.jpg"
              onClick={props.switchImgPreview}
              src="/images/theme/background/4-demo.jpg"
            />
            <img
              id="/images/theme/background/5.jpg"
              onClick={props.switchImgPreview}
              src="/images/theme/background/5-demo.jpg"
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
