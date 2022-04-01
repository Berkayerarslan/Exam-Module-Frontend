import React from 'react'

const ProgressBar = (props) => {
  return (
    <div className="test-progressbar">
            <p>
              İLERLEME ({props.data.numerator}/{props.data.denominator})
            </p>
            <div className="progressbar">
              <div
                style={{ width: `${(props.data.numerator / props.data.denominator) * 100}` + "%" }}
              ></div>
            </div>
          </div>
  )
}

export default ProgressBar