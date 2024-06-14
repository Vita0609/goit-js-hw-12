import{S as q,a as y,i as d}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();function f(i,e){const a=i.map(({webformatURL:o,largeImageURL:t,tags:s,likes:n,views:w,comments:L,downloads:S})=>`
        <li class="item">
        <a class="item-link" href="${t}">
        <img class="item-img" src="${o}" alt="${s}" />
        <div class="wrapper">
        <div class="span-wrapper">
        <span class="span-name">Likes</span>
        <span class="span-value">${n}</span>
        </div>
        <div class="span-wrapper">
        <span class="span-name">Views</span>
        <span class="span-value">${w}</span>
        </div>
        <div class="span-wrapper">
        <span class="span-name">Comments</span>
        <span class="span-value">${L}</span>
        </div>
        <div class="span-wrapper">
        <span class="span-name">Downloads</span>
        <span class="span-value">${S}</span>
        </div>
        </div>
        </a>
        </li>
        `).join("");e.insertAdjacentHTML("beforeend",a),H.refresh()}let H=new q(".list a",{sourceAttr:"href",captionsData:"alt",captionDelay:250});y.defaults.baseURL="https://pixabay.com/api/";const B="44362939-998edb8f92844eab0dd18e81c",p=15;async function h(i,e=1){return(await y.get("",{params:{key:B,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:e}})).data}const g=document.querySelector(".form"),v=document.querySelector(".input"),l=document.querySelector(".list"),u=document.querySelector(".loader"),m=document.querySelector(".loader-top"),r=document.querySelector(".load-more");g.addEventListener("submit",$);r.addEventListener("click",()=>C(b));async function $(i){i.preventDefault(),m.style.visibility="visible";const e=v.value;c=1;try{const a=await h(e);if(a.hits.length===0)throw new Error;l.innerHTML="",f(a.hits,l),r.style.visibility="visible",p>=a.totalHits&&(r.style.visibility="hidden",d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{l.innerHTML="",d.error({message:"Sorry, there are no images matching your search query. Please try again!",theme:"dark",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#EF4040",position:"topRight",progressBarColor:"#B51B1B"}),r.style.visibility="hidden"}finally{m.style.visibility="hidden",g.reset()}}let b="";v.addEventListener("input",i=>{b=i.target.value});let c=1;async function C(i){r.style.visibility="hidden",u.style.visibility="visible",c+=1;try{const e=await h(i,c);f(e.hits,l),r.style.visibility="visible",u.style.visibility="hidden",E(),(c*p>=e.totalHits||p>=e.totalHits)&&(r.style.visibility="hidden",d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.log(e.message)}}function E(){const e=document.querySelector(".item").getBoundingClientRect().height;window.scrollBy({top:e*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
