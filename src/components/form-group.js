import React from 'react'


function FormGroup ( props ) {
    return (
        <div className="form-group">
                                             
        <label 
        htmlFor={props.htmlFor} 
        style={styles.spaceBetween}> {props.label} </label>   
            {props.children}
        </div> 

    )
}

const styles = {

    spaceBetween: {
        padding: '0.2em'
    }
}

export default FormGroup