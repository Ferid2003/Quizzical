import "./Question.css"
import {decode} from 'html-entities';
import {nanoid} from "nanoid";



function Question(props){

    function handleClick(answer){
        props.handleClick(answer,props.id)
    }

    let answers = props.question.answers

    const buttons = answers.map(obj =>{
        let id = null
        if (props.question.clicked){
            if (props.question.correctAnswer === obj){
                id = 'correct'
            }
            else if(props.question.selected === obj){
                id = 'incorrect'
            }
            else{
                id = 'not-selected'
            }
        }
        return (
            <button key={nanoid()} id={id}  className={props.question.selected===obj ? "selected" : "not-selected"} onClick={() => handleClick(obj)}>{decode(obj)}</button>
        )
    })


    return (
        <div className="questions" >
            <div>
                <h3>{decode(props.question.question)}</h3>
                <div className="buttons-holder">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default Question;