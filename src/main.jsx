import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Welcome_Page from "./Welcome_Page/Welcome_Page.jsx";
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome_Page/>,
    },
    {
        path: "/quiz",
        element: <App  />
    }
]);


export function getUrl(){
    let category = document.getElementById("trivia_category");
    let category_num = category.value;

    let difficulty = document.getElementById("trivia_difficulty");
    let difficulty_num = difficulty.value;

    let url =null

    if (category_num==="any"){
        if (difficulty_num==="any"){
            url = `https://opentdb.com/api.php?amount=5`
            console.log(url)
        }else {
            url = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty_num}`
            console.log(url)
        }
    }else {
        if (difficulty_num==="any"){
            url = `https://opentdb.com/api.php?amount=5&category=${category_num}`
            console.log(url)
        }else {
            url = `https://opentdb.com/api.php?amount=5&category=${category_num}&difficulty=${difficulty_num}`
            console.log(url)
        }
    }
    return url
}

ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />

)
