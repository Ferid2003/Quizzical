import './App.css'
import Question from "./Question/Question.jsx";
import { useEffect, useState} from "react";
import { nanoid } from 'nanoid'
import {getUrl} from "./main.jsx";


function App() {

    const [url,setUrl] = useState(getUrl)

    const [questionObjs,setQuestionObjs] = useState([])
    const [correct,setCorrect] = useState(0)
    const [finished,setFinished] = useState(false)
    const [again,setAgain] = useState(0)

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }



    function handleClick(answer,id){
        setQuestionObjs(prevQuestionObjs => prevQuestionObjs.map(obj => {
            return ( obj.id===id ? {...obj,selected:answer} : obj)
        }))

    }

    function handleSubmit(){
        document.getElementById("qaqa").style.zIndex="-1"
        setQuestionObjs(prevQuestionObjs => prevQuestionObjs.map(obj => {
            return {...obj,clicked:true}
        }))

        questionObjs.forEach(obj => {
            obj.correctAnswer===obj.selected ? setCorrect(prevCorrect => prevCorrect+1) : ""
        })

        setFinished(true)
    }

    function handleRestart(){
        setAgain(prevAgain => prevAgain+1)
        setCorrect(0)
        setFinished(false)
        document.getElementById("qaqa").style.zIndex="2"
    }

    useEffect(() => {
        async function getQuestions(){
            const repsonse = await fetch(url)
            const data =  await repsonse.json()
            let data2 = []

            data.results.forEach(obj => {
                data2.push( {question:obj.question, id: nanoid(), answers:shuffle([...obj.incorrect_answers,obj.correct_answer]), correctAnswer:obj.correct_answer, clicked:false, selected:null} )
            })

            setQuestionObjs(data2)
        }
        getQuestions()
    },[again])

    const questionElements = questionObjs ? questionObjs.map(obj => {
        return (
            <Question
                key={obj.id}
                id={obj.id}
                question={obj}
                handleClick={handleClick}
            />
        )
    }) : []



    return (
        <main>
            <div className="quiz">
                <div className="btm2"></div>
                <div className="top2"></div>
                <div id="qaqa">
                    {questionElements}
                </div>
                <button className="submit" onClick={finished ? handleRestart : handleSubmit} >{!finished ? "Submit" : "Restart"}</button>
                <h4>{finished ? `You wrote ${correct}/5 correct` :""}</h4>
            </div>
        </main>
    )
}

export default App
