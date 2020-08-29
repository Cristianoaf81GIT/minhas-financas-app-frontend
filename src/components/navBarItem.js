import React from 'react'


const NavBarItem = ( {render, ...navBarProps} ) => {

    if ( render ) {
      return (

        <li className="nav-item">
  
          <a 
            onClick={navBarProps.onClick} 
            className="nav-link" 
            href={ navBarProps.href } 
            tabIndex="1">

               { navBarProps.label } 
               
          </a>
  
        </li>
  
      )

    } else {
      return false
    }

    

}

export default NavBarItem