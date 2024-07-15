import React from 'react'

export default function Die(props){
    return (
        <div onClick={props.holdDice} className={`die_num ${props.isHeld ? "held" : ""}`}>
            {props.value}
        </div>
    )
}