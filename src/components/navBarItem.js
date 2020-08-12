import React from 'react'


const NavBarItem = ( props ) => {

    return (

			<li className="nav-item">

				<a className="nav-link" href={ props.href } tabIndex="1"> { props.label } </a>

			</li>

    )

}

export default NavBarItem