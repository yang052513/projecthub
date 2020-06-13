import React from 'react'

interface Props {
  flag: string
  country: string
}

export const Flag: React.FC<Props> = ({ flag, country }) => {
  return (
    <div className="setting-content-country-flag">
      <p>{country}</p>
      <img src={flag} alt="flag" />
    </div>
  )
}
