import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const TestForm = () => { 
//   const [name, setname] = useState(null);
//   const [email, setemail] = useState(null);
//   const [phoneNumber, setphoneNumber] = useState(null);

const [jobPositons, setjobPositons] = useState()
const [isCorrect,setisCorrect] = useState(false)
console.log(isCorrect)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
      console.log(data)
      console.log(errors)
    if(data){
        navigate('/test-basla/test')
    }
    else {
      setisCorrect(prev => !prev)    
    }
  };
  console.log(errors)
  


  return (
    <div id="app">
      <div className="section">
        <div className="s-container">
          <div className="form-box">
            <h1 className="form-title">TEST</h1>
            <div className="brackets">
              <div className="border"></div>
            </div>
            <p className="form-description">
              Teste başlamak için lütfen aşağıda yer alan alanları eksiksiz bir
              şekilde doldurunuz.
            </p>
            <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-left-inputs">
                <div className="form-input">
                  <label>
                    <p>Ad Soyad</p>
                  </label>
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    {...register("fullName", { required: true, maxLength: 80 })}
                  />
                   <label>
                    <p style={{color:'red'}}>{errors.fullName && 'Hatalı ad soyad girişi'}</p>
                  </label>
                </div>
                
                <div className="form-input">
                  <label>
                    <p>E-Mail</p>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <label>
                    <p style={{color:'red'}}>{errors.email && 'Hatalı email girişi'}</p>
                  </label>
                </div>
                <div className="form-input">
                  <label>
                    <p>E-Mail</p>
                  </label>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    {...register("mobileNumber", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                  />
                  <label>
                    <p style={{color:'red'}}>{errors.mobileNumber && 'Hatalı giriş'}</p>
                  </label>
                </div>

                {/* <div className="form-input">
                  <label>
                    <p>Ad Soyad</p>
                  </label>
                  <fieldset>
                    <input
                      class="input"
                      type="text"
                      onChange={(e) => setname(e.target.value)}
                    ></input>
                  </fieldset>
                </div>
                <div className="form-input">
                  <label>
                    <p>E-Mail</p>
                  </label>
                  <fieldset>
                    <input
                      class="input"
                      type="email"
                      onChange={(e) => setemail(e.target.value)}
                    ></input>
                  </fieldset>
                </div>
                <div className="form-input">
                  <label>
                    <p>Telefon Numarası</p>
                  </label>
                  <fieldset>
                    <input
                      type="phone"
                      onChange={(e) => setphoneNumber(e.target.value)}
                    ></input>
                  </fieldset>
                </div> */}
              </div>
              <div className="form-left-inputs">
                <div className="form-input">
                  <label>
                    <p>Çalıştığınız Pozisyon</p>
                  </label>
                  <select {...register("position", { required: true })}>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <label>
                    <p >{errors.register && 'Hatalı giriş'}</p>
                  </label>
                <div className="form-input">
                  <label>
                    <p>Çalıştığınız Sektör</p>
                  </label>
                  <select {...register("sector", { required: true })}>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <label>
                    <p>{errors.register && 'Hatalı giriş'}</p>
                  </label>

                {/* <div className="form-input">
                  <label>
                    <p>Çalıştığınız Pozisyon</p>
                  </label>
                  <fieldset>
                    <input type="select"></input>
                  </fieldset>
                </div>
                <div className="form-input">
                  <label>
                    <p>Çalıştığınız Sektör</p>
                  </label>
                  <fieldset>
                    <select>
                      <option value="sdds"></option>
                    </select>
                  </fieldset>
                </div> */}
              </div>
              <div className="submit-box">
                <input className="submit-button" type="submit" value='TESTE BAŞLAYIN'></input>
                
              </div>
              {isCorrect === true ? <p style={{color:'red',height:'10px'}}>Hatalı girişler var </p> : <p></p>}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
