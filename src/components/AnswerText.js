import React from 'react'

const AnswerText = (props) => {
    console.log(props)
  return (
    <div className="test-answers" >
    {props?.data &&     
          <div className="test-answer">
            <input
              type= {props.type}
              onChange={(e) => props.onChange(e)}   
            />
            <label htmlFor=""></label>
          </div>
        
      }
  </div>
  )
}

export default AnswerText