import React, { useEffect, useState } from "react";
import { Exams } from "../data/Exams";
import AnswerTest from "./AnswerTest";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import { useTimer } from "react-timer-hook";
import MultipleAnswer from "./MultipleAnswer";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AnswerText from "./AnswerText";

function Exam() {
  const data = Exams;
  // console.log(data.find(x => x.answerNo === 1));
  const [pageNo, setpageNo] = useState(1);
  const [questions, setquestions] = useState(data);
  const [checkedQuestion, setcheckedQuestion] = useState(null);

  const [checkedAnswer, setcheckedAnswer] = useState([]);
  // console.log('checkedAnswers',checkedAnswer);
  const [checkedMultiAnswer,setcheckedMultiAnswer] = useState([]);
  console.log('Multi : ',checkedMultiAnswer)
  const [checkedOption, setcheckedOption] = useState(0);
  // console.log('Option',checkedOption)
  const [checkedOptions, setcheckedOptions] = useState([]);
  // console.log('Options',checkedOptions)
  const [checkedTextAnswer,setcheckedTextAnswer] = useState([])
  console.log(checkedTextAnswer);
  const [remainingTime, setremainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const expiryTimestamp = new Date();
  // expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 6000);

  // const {
  //   seconds,
  //   minutes,
  //   hours,
  //   days,
  //   isRunning,
  //   start,
  //   pause,
  //   resume,
  //   restart,
  // } = useTimer({
  //   expiryTimestamp,
  //   onExpire: () => console.warn("onExpire called"),
  // });

  const navigate = useNavigate();

  useEffect(() => {
    const checkedQuestion1 = questions.find((x) => x.answerNo === pageNo);
    setcheckedQuestion(checkedQuestion1);
    if (checkedQuestion1.questionType === "Test") {
      const checkedOption1 = checkedAnswer.find(
        (answer) => answer.questionId === checkedQuestion1.id
      );
      console.log(checkedOption1);
      setcheckedOption(checkedOption1);
    }
    else if(checkedQuestion.questionType === 'MultiChoice'){
      // console.log('tüm cevaplar',checkedMultiAnswer)
      // console.log(checkedQuestion)
      const checkedOptions1 = checkedMultiAnswer.filter((x) => x.questionId === checkedQuestion.id )
      console.log('seçili cevap',checkedOptions1);
      setcheckedOptions(checkedOptions1);
    }

    // console.log(checkedQuestion)
  }, [pageNo, checkedAnswer,checkedMultiAnswer,checkedQuestion]);

  // useEffect(() => {
  //   if(checkedQuestion.questionType === 'MultiChoice'){
  //     // console.log('tüm cevaplar',checkedMultiAnswer)
  //     // console.log(checkedQuestion)
  //     const checkedOptions1 = checkedMultiAnswer.filter((x) => x.questionId === checkedQuestion.id )
  //     console.log('seçili cevap',checkedOptions1);
  //     setcheckedOptions(checkedOptions1);
  //   }
  
    
  // }, [checkedQuestion])
  

  // useEffect(() => {
  //   setremainingTime({
  //     hours: hours,
  //     seconds: seconds,
  //     minutes: minutes,
  //   });
  // }, [seconds]);


  // api verildiğinde işlenicek fonksiyon
  // const getExam = () => {
  //     setquestions(data);
  //     console('Questions',questions)
  // }

  const handlGoNext = (event) => {
    event.preventDefault();

    // console.log(pageNo + 1)
    const question = questions.find((x) => x.answerNo === pageNo + 1);
    // console.log('jdskds',question);
    if (question !== undefined) {
      setpageNo((prev) => prev + 1);
    }
  };

  const handleGoPrev = (event) => {
    event.preventDefault();
    console.log(pageNo + 1);
    const question = questions.find((x) => x.answerNo === pageNo - 1);
    console.log("jdskds", question);

    if (question !== undefined) {
      setpageNo((prev) => prev - 1);
    }
  };
  const handleAnswerChange = (event) => {
    // console.log(event.target.id);
    
    const id = event.target.id;

    if (checkedQuestion.questionType === "Test") {
      console.log('Type',checkedQuestion.questionType)
      const tempCheckedAnswers = checkedAnswer;
      const isExists = tempCheckedAnswers.find(
        (answer) => answer.questionId === checkedQuestion.id
      );
      if (isExists) {
        // console.log(isExists);

        const willSaveAnswers = tempCheckedAnswers.map((answer) => {
          if (answer.questionId === isExists.questionId) {
            answer.answerId = Number(id);
          }
          return answer;
        });
        setcheckedAnswer(willSaveAnswers);
      } else {
        setcheckedAnswer([
          ...checkedAnswer,
          {
            questionId: checkedQuestion.id,
            answerId: Number(id),
          },
        ]);
      }
    } else if (checkedQuestion.questionType === "MultiChoice") {
      // console.log(id)
      const tempCheckedAnswers = checkedMultiAnswer;
      const isExists = tempCheckedAnswers.find((x) => x.answerId === Number(id))
      // console.log('isexists',isExists)

      if(isExists){
        const temp = checkedMultiAnswer.filter((x)=> x.answerId !== Number(id) )
        // console.log('eklenicek değer',temp)
        setcheckedMultiAnswer(temp)
      }
      else {
        // console.log('ekleme işlemi')
        setcheckedMultiAnswer([
          ...checkedMultiAnswer,
          {
            questionId: checkedQuestion.id,
            answerId: Number(id)
          },
        ]);
      }     
    }
  };

  // const handleTime = () => {
  //   resume();
  //   setremainingTime({
  //     hours: hours,
  //     seconds: seconds,
  //     minutes: minutes,
  //   });
  // };
  // const handleTimeStop = () => {
  //   pause();
  //   setremainingTime({
  //     hours: hours,
  //     seconds: seconds,
  //     minutes: minutes,
  //   });
  // };

  const handleFinishExam = () => {
    navigate('/')
  }

  return (
    <div className="section">
      <div className="s-container">
        <div className="exam-box">
          <div className="exam-title">
            <span>{checkedQuestion?.answerNo}. Soru</span>

            <p>
              Lütfen sağlıklı bir değerlendirme için bilmediğiniz sorularu boş
              bırakın
            </p>
          </div>
          <div className="test-description">
            <p></p>
            <p>Choose the best answer which completes the sentence.</p>
            <p></p>
            <p></p>
          </div>
          <div className="test-question">{checkedQuestion?.question}</div>
          {checkedQuestion?.questionType === "Test" ? (
            <AnswerTest
              onClick={handleAnswerChange}
              data={{
                checkedQuestion: checkedQuestion,
                checkedOption: checkedOption,
              }}
              type="radio"
              name="checkbox"
            />
          ) : (
            <MultipleAnswer
              onClick={handleAnswerChange}
              data={{
                checkedQuestion: checkedQuestion,
                checkedOption: checkedOptions,
              }}
              type="checkbox"
            />
          )}
          {/* {checkedQuestion?.questionType === "MultiChoice" ?? (
            <MultipleAnswer
              onClick={handleAnswerChange}
              data={{
                checkedQuestion: checkedQuestion,
                checkedOption: checkedOptions,
              }}
              type="checkbox"
            />
          )}
          {checkedQuestion?.questionType === "Text" ?? (
            <AnswerText
             onChange={(e) => setcheckedTextAnswer(e.target.value)}
             type="text"
             data= {checkedTextAnswer}
            />
          )} */}


          <div className="test-buttons">
            <Button
              onClick={handleGoPrev}
              class="bi bi-chevron-double-left"
              text="ÖNCEKİ"
            />
            <Button
              onClick={handleFinishExam}
              text = "SINAVI BİTİR"
            />
            <Button
              onClick={handlGoNext}
              class="bi bi-chevron-double-right"
              text="SONRAKİ"
            />
          </div>
          <ProgressBar
            data={{
              numerator: pageNo,
              denominator: questions.length,
            }}
            text="İLERLEME"
          />
          <div className="test-note">
            Lütfen sağlıklı bir değerlendirme için bilmediğiniz soruları boş
            bırakınız
          </div>
          {/* <button onClick={() => handleTime()}>başla</button>
          <button onClick={() => handleTimeStop()}>dur</button> 

           <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px" }}>
              <span>{remainingTime.hours}</span>:
              <span>{remainingTime.minutes}</span>:
              <span>{remainingTime.seconds}</span>
            </div>
            
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Exam;
