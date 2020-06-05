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

export default function Background() {
  const classes = useStyles()
  const db = firebase.firestore()
  const storageRef = firebase.storage().ref()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [error, setError] = useState(false)

  const [customBg, setCustomBg] = useState([])
  const [demo, setDemo] = useState({
    backgroundColor: false,
    backgroundRef: '',
  })

  const [options, setOptions] = useState('Color')

  //渲染是以照片还是纯色模式为背景
  const handleOptions = (event) => {
    setOptions(event.target.value)
    console.log(options)
  }

  //更改背景图片
  function handleBgUpload() {
    setLoading(true)
    let file = document.getElementById('img-input').files[0]
    //如果更改了照片
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

  //读取用户已经保存过的壁纸
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .get()
        .then((doc) => {
          if (doc.data().customBackground) {
            setCustomBg(doc.data().customBackground)
          }
          if (doc.data().background) {
            setDemo(() => ({
              backgroundColor: doc.data().backgroundColor,
              backgroundRef: doc.data().background,
            }))
            setOptions(doc.data().backgroundColor ? 'Color' : 'Images')
          }
        })
        .catch((error) => {
          console.log(`读取用户保存的壁纸时出错了 ${error}`)
        })
    })
  }, [])

  function handleReload() {
    window.location.reload()
  }

  function handleError() {
    setError(false)
  }

  //点击缩略图切换壁纸
  function handleSwitch(event) {
    let bgRef = event.currentTarget.id
    setDemo((prevDemo) => ({
      backgroundColor: false,
      backgroundRef: bgRef,
    }))
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .update({
          backgroundColor: false,
          background: bgRef,
        })
        .then(() => {
          console.log(`切换背景为${bgRef}`)
        })
        .catch((error) => {
          console.log(`切换背景错误${error}`)
        })
    })
  }

  function handleColor(color, event) {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .update({
          backgroundColor: true,
          background: color.hex,
        })
        .then(() => {
          setDemo(() => ({
            backgroundColor: true,
            backgroundRef: color.hex,
          }))
          console.log(`主题色修改成功为${color.hex}`)
        })
        .catch((error) => {
          console.log(`更改主题色时出错啦${error}`)
        })
    })
  }

  const customBgRender =
    customBg.length === 0
      ? null
      : customBg.map((bg) => (
          <img onClick={handleSwitch} id={bg} key={bg} src={bg} />
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
          value={options}
          onChange={handleOptions}
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
        {demo.backgroundColor ? (
          <div
            style={{ backgroundColor: demo.backgroundRef }}
            className="color-placeholder"
          ></div>
        ) : (
          <img src={demo.backgroundRef} alt="preview demo placeholder" />
        )}
      </div>

      <div className="setting-content-background-options">
        {/* 系统内置壁纸 */}
        {options === 'Color' ? (
          <div>
            <SwatchesPicker
              width={'600px'}
              height={'300px'}
              onChange={handleColor}
            />
          </div>
        ) : (
          <div>
            <img
              id="/images/theme/background/1.jpg"
              onClick={handleSwitch}
              src="/images/theme/background/1-demo.jpg"
            />
            <img
              id="/images/theme/background/2.jpg"
              onClick={handleSwitch}
              src="/images/theme/background/2-demo.jpg"
            />
            <img
              id="/images/theme/background/3.jpg"
              onClick={handleSwitch}
              src="/images/theme/background/3-demo.jpg"
            />
            <img
              id="/images/theme/background/4.jpg"
              onClick={handleSwitch}
              src="/images/theme/background/4-demo.jpg"
            />
            <img
              id="/images/theme/background/5.jpg"
              onClick={handleSwitch}
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
