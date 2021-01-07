import './App.css';
import React, { useState } from 'react';
import {ListGroup} from 'react-bootstrap';

const TOTAL_QUESTION=10;

function App() {

  const [questions, setquestions] = useState([]);
  const [selected, setselected] = useState(0);
  const [score, setscore] = useState(0);
  const [currentquestion, setcurrentquestion] = useState(0);
//test
  const [gameover, setgameover] = useState(false);
  const [gamestarted, setgamestarted] = useState(false);

 
  const [userAnswered, setuserAnswered] = useState(false);


  let respondsList=[];

  const changecolor=(position)=>{
    let color=' ';
     if(userAnswered)
     {
        if(selected === position)
        {
          if(questions[currentquestion].responds[position] === questions[currentquestion].correct_answer)  
                                    color= 'green';
          else  color= 'red';
        }
        
        questions[currentquestion].responds.forEach((respond,index ) => {
         if((index===position)&&(respond === questions[currentquestion].correct_answer )) {color= 'green';}
         });
     }
            
       return color;
    };
  const changeselected=(position)=>{
    setuserAnswered(true);
    setselected(position);
  };

  const nextquetion=()=>{
    if(currentquestion>=TOTAL_QUESTION-1) 
     {
        setgameover(true);
        setcurrentquestion(0);
        setuserAnswered(false);
     }
    else 
    {
      setcurrentquestion(currentquestion+1);
      if(questions[currentquestion].responds[selected] === questions[currentquestion].correct_answer){
                    setscore(score+1);
      }
      setuserAnswered(false);
    }

  };

  const restart=()=>{
    setcurrentquestion(0);
    setuserAnswered(false);
    setgameover(false);

  };

  const start=async ()=>{
    let response =  
                await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple`);
    const json = await response.json();
    let fetchedquestions= json.results.map((q)=>{
        return {...q, 
                    responds:[...q.incorrect_answers,q.correct_answer].sort(() => Math.random() - 0.5)
                };
    });
    setquestions(fetchedquestions);
    setgamestarted(true);

  };
  if((currentquestion<TOTAL_QUESTION)&&(gamestarted))
    {
        questions[currentquestion].responds.forEach((respond,index ) => { 
          respondsList.push(
          <ListGroup.Item className={"Item  " + changecolor(index) }  
                    onClick={()=>changeselected(index)}> 
              {respond}
          </ListGroup.Item> );
        });
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>quiz</h1> 
        {gamestarted&&!gameover?( <h2>{questions[currentquestion].question}</h2>):null} 
        {gameover?<p>your score is : {score}/{TOTAL_QUESTION}</p>:null}
      </header>
      <body className="App-body"> 
      {gamestarted&&!gameover?(
        <ListGroup id="ListGroup">
           {respondsList}
           {userAnswered?(<ListGroup.Item  className='next' onClick={()=>nextquetion()}>next</ListGroup.Item>)
                      :null}
        </ListGroup>):null}
        {gameover?(
            <ListGroup id="ListGroup">
              <ListGroup.Item  className='next' onClick={()=>restart()}>restart</ListGroup.Item>
            </ListGroup>)
            :null}
        {!gamestarted?(
            <ListGroup id="ListGroup">
              <ListGroup.Item  className='next' onClick={()=>start()}>start</ListGroup.Item>
            </ListGroup>)
            :null}
      </body>
    </div>
  );
}

export default App;
