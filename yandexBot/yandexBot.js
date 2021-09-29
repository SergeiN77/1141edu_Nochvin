// ==UserScript==
// @name        laba 13
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let sites= {
    'crushdrummers.ru': ['Барабанное шоу','Заказать барабанное шоу в Москве','Барабанщики на корпоратив','Барабанное шоу Crush'],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai": ['Как звучит Гобой','Флейта','Скрипка','Гобой','Фагот','Тромбон','Кларнет']
}



function seacrhID(){
    let wordsSearch=document.getElementById('text');

    let site= Object.keys(sites)[getIntRandom(0,Object.keys(sites).length)];
    let words=sites[site];
    let word=words[getIntRandom(0,words.length)];
    if (wordsSearch !=null) { //проверяем класс поля ввода текста поиска по ID, при наличии элемента возвращается его значение, а при отсутствии null
        wordsSearch.value=word; //задаём из массива значение поиска
        document.cookie='site='+site;
        document.getElementsByClassName('search2')[0].submit(); // нажимаем кнопрку путём отправки значения формы
    }
    else if(location.hostname=='yandex.ru'){ // попадаем на страницу поиска
        let site=getCookie('site');




      let links=document.links; // формируем массив всех ссылок на странице
      let btnkNextPage=document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem")[0]; // формируем кнопку "дальше" на поисковой странице Яндекса
      let goToNextPage='true';
      let maxNext=+document.getElementsByClassName('pager__item pager__item_current_yes pager__item_kind_page')[0].innerText;
        for(let i=0;i<links.length;i++){ // перебираесм массив
          let link=links[i];
            if(link.href.indexOf(site) != -1){ //ищем совпадение значения подстроки из массива с заданным значением
                link.target="_self";
                setTimeout(function(){link.click()}, 3000); // если нашли, кликаем и переходим на нужный сайт
                goToNextPage='false';
                break;
            }
        }


        if (goToNextPage && maxNext<10) setTimeout(function(){btnkNextPage.click();},3300);
        else if(goToNextPage) location.href='https://yandex.ru';



   } else { // если уже перешли на сайт нужный в поле location.hostname=='xn----7sbab5aqcbiddtdj1e1g.xn--p1ai'

       setInterval(function(){
           if (getIntRandom(0,100)<10) location.hostname='yandex.ru'; // условие возврата на сайт яндекс, вероятность 10%

           else{
               let linksNewPage=document.links;
               let index=getIntRandom(0,linksNewPage.length);
               let linkNewPage=linksNewPage[index];
               if (linkNewPage.href.indexOf(location.hostname)!=-1){
                   linksNewPage[index].click();
               }
           }
       },3000);


   }

}

setTimeout( seacrhID,1030);
function getIntRandom(max,min){
           return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
