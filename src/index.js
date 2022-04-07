import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestForm } from './components/TestForm';
import ExamPage from './pages/ExamPage';
import FinishExam from './components/FinishExam';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<FinishExam></FinishExam>}/>
        <Route path='test-basla' element={<TestForm/>}/>
        <Route path='test-basla/test' element={<ExamPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
