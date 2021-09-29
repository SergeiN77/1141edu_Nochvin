// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let links=[];
let link;


function seacrhID(){
    let wordsSearch=document.getElementById('text');
    if (wordsSearch !=null) {

        wordsSearch.value="Как звучит Гобой";
        document.getElementsByClassName('search2')[0].submit();
    }

    else if(location.hostname=='yandex.ru'){

        links=document.links;
        for(let i=0;i<links.length;i++){
            link=links[i];
            if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            link.target="_self";
            setTimeout(function(){link.click()}, 3000);
            break;
            }
        }
   } else if(location.hostname=='xn----7sbab5aqcbiddtdj1e1g.xn--p1ai'){


       setInterval(function(){
           if (getIntRandom(0,100)<10) location.hostname='yandex.ru';
           else{
               let linksNewPage=document.links;
               let index=getIntRandom(0,linksNewPage.length);
               let linkNewPage=linksNewPage[index];
               if (linkNewPage.href.indexOf(location.hostname)!=-1){
                   linksNewPage[index].click();
               }
           }
       },3000);
function getIntRandom(max,min){
           return Math.floor(Math.random()*(max-min)+min);
}

   }

}

setTimeout( seacrhID,1030);
