import { useState, useEffect } from 'react'
import firebase from 'firebase'

interface IOpacity {
  background: number
  card: number
  sidebar: number
  topbar: number
}

interface ITheme {
  theme: string
  option: string
  background: string
  backgroundColor: boolean
  customBackground: Array<string | null | undefined>
  opacity: IOpacity
}

export const useTheme = (userRef: string) => {
  const themeRef = firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Setting')
    .doc('Apparence')

  const [theme, setTheme] = useState<ITheme | any>({
    theme: '#0e5dd3',
    option: 'Color',
    background: '#f7f7f7',
    backgroundColor: true,
    customBackground: [],
    opacity: {
      background: 100,
      card: 100,
      sidebar: 100,
      topbar: 100,
    },
  })

  useEffect(() => {
    const fetchTheme = async () => {
      const themeDoc = await themeRef.get()
      if (themeDoc.exists) {
        setTheme(themeDoc.data())
      } else {
        themeRef.set(theme)
      }
    }
    fetchTheme()
  }, [])

  const handleTheme = (color: any, event: any) => {
    themeRef
      .update({
        theme: color.hex,
      })
      .then(() => {
        setTheme({ ...theme, theme: color.hex })
      })
  }

  const handleOptions = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setTheme({ ...theme, option: event.target.value })
  }

  const handleSwitch = (event: { currentTarget: { id: any } }) => {
    let backgroundRef = event.currentTarget.id
    setTheme({
      ...theme,
      backgroundColor: false,
      background: backgroundRef,
    })
    themeRef.update({
      backgroundColor: false,
      background: backgroundRef,
    })
  }

  const handleColor = (color: any, event: any) => {
    themeRef
      .update({
        backgroundColor: true,
        background: color.hex,
      })
      .then(() => {
        setTheme({
          ...theme,
          backgroundColor: true,
          background: color.hex,
        })
      })
  }

  //更改透明度
  const handleOpacity = (name: any) => (event: any, value: any) => {
    setTheme({
      ...theme,
      opacity: {
        ...theme.opacity,
        [name]: value,
      },
    })
    themeRef.update(theme.opacity)
  }

  return {
    theme,
    handleTheme,
    handleColor,
    handleOpacity,
    handleOptions,
    handleSwitch,
  }
}
