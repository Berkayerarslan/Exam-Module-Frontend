import React from 'react'

const MultipleAnswer = (props) => {
  
  console.log('Seçilen cevaplar anlık :',props.data.checkedOption)
  // undefined === props.data.checkedOptions?.find((x) => x.answerId === item.id )ü
  var a = props.data?.checkedOption?.find((x) => x.answerId == 8)
        console.log(a);
  return (
    <div className="test-answers" >
    {props.data.checkedQuestion &&
      props.data.checkedQuestion.answers.map((item, key) => {
        console.log(props.data);
        
        return (
          <div className="test-answer">
            <input
              id={item.id}
              key={key}
              type= {props.type}
              checked={ props.data?.checkedOption?.find((x) => x.answerId == item.id)  }
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