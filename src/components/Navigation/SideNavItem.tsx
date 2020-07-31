import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  theme: string
  route: string
  icon: string
  prompt: string
}

export const SideNavItem: React.FC<Props> = ({
  theme,
  route,
  icon,
  prompt,
}) => {
  const currRoute: any = useLocation().pathname
  const [show, setShow] = useState<boolean>(false)

  const currLinkStyle: any = {
    backgroundColor: 'white',
    color: `${theme}`,
    padding: '5px',
    borderRadius: '50%',
  }

  const promptStyle: any = {
    opacity: 1,
    visibility: 'visible',
  }

  return (
    <Link to={route}>
      <div className="navbar-item-container">
        <i
          style={currRoute === route ? currLinkStyle : null}
          className={icon}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        ></i>
        <p style={show ? promptStyle : null} className="hovered-prompt">
          {prompt}
        </p>
      </div>
    </Link>
  )
}
