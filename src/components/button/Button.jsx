import React from 'react'
import './Button.css'

export default props => {
    let classes = 'button '
    classes += props.double ? 'double ' : ''
    classes += props.triple ? 'triple ' : ''
    classes += props.operation ? 'operation ' : ''

    return (
        // <button className={ classes } onClick={ props.click(props.label) }>{ props.label }</button>
        <button className={ classes } onClick={ e => props.click(props.label) }>{ props.label }</button>
    )
}