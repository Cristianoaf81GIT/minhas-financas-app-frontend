import React from 'react'
 
const SelecMenu =  props  => {

  const options = props.items.map( (option, index) => {
    return (
    
      <option className="optclass" key={index} value={ option.value }>{ option.label }</option>
      
    )
  })


  return (
    <select {...props} >{ options }</select>
  )
}

export default SelecMenu