import React from 'react'

const MultipleAnswer = (props) => {
  console.log(props)
  // undefined === props.data.checkedOptions?.find((x) => x.answerId === item.id )
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
              defaultValue={false}
              checked={ false }
              onClick={(e) => props.onClick(e)}   
            />
            <label htmlFor="">{item?.answer}</label>
          </div>
        );
      })}
  </div>
  )
}

export default MultipleAnswer