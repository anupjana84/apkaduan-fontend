import React from 'react'
import { NavLink, Link } from 'react-router-dom'
const Header = () => {
  const red = {}
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container">
          <a className="navbar-brand" to="/">
            APKA DUKAN
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    'nav-link' + (isActive.isActive ? ' bg-danger' : '')
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    'nav-link' + (isActive.isActive ? ' bg-danger' : '')
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    'nav-link' + (isActive.isActive ? ' bg-danger' : '')
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
             
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    'nav-link' + (isActive.isActive ? ' bg-danger' : '')
                  }
                  to="/dist"
                >
                 Dashboard
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
