import { articles, urls } from "./constants/main.js";

window.addEventListener('load', () => {
    const LTS = document.getElementsByClassName("letter__wrap");
    const searchInp = document.getElementById("search");  
    const searchBtn = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");
    searchInp.addEventListener("keydown", (e)=> {
        if(e.keyCode === 13) {
            searchBtn.click();
        }
        const res = [];
        if(searchInp.value.length > 1) {     
            articles.data.forEach(article => {
                if(article.name.toLowerCase().includes(searchInp.value.toLowerCase())) {
                    res.push(article);
                }
            })
        }else{
            res.push({
                name: "Escribe al menos 2 letras",
                url: "#",
            });
        }
        searchResults.innerHTML = "";
        res.forEach(article => {
            const item = document.createElement("section");
            item.className = "search-item";
            item.innerHTML = article.name;
            item.addEventListener("click", () => {
                window.location.href = `/${article.url}`;
            })
            console.log(searchResults)
            searchResults.appendChild(item);
        })
    })  
    for(let i = 0; i < LTS.length; i++){
        console.log(urls[i]);
        LTS[i].addEventListener("click", ()=>{
            window.location.href = window.location.href.replace("inicio", urls[i]);
        })
    }
})