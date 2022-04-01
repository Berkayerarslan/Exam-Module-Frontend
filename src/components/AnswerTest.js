import React from 'react'
import '../App.css'

const AnswerTest = (props) => {
    
  return (
    <div className="test-answers" >
      {props.data.checkedQuestion &&
        props.data.checkedQuestion.answers.map((item, key) => {
          
          return (
            <div className="test-answer">
              <input
                id={item.id}
                key={key}
                type= {props.type}
                name= {props.name}
                checked={ item.id === props.data.checkedOption?.answerId}
                onClick={(e) => props.onClick(e)}
              />
              <label htmlFor="">{item?.answer}</label>
            </div>
          );
        })}
    </div>
  )
}

export default AnswerTest