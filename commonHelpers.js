import{a as p,i as l,S}from"./assets/vendor-9d830b88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const y=(s,e,o)=>{p.defaults.baseURL="https://pixabay.com/";const i={params:{key:"45275366-6244e97cf540ed2b53abd51ec",q:s,image_type:"photo",safesearch:!0,orientation:"horizontal",page:e,per_page:o}};return p.get("api/",i)};function L(s){return s.map(({webformatURL:e,largeImageURL:o,tags:i,likes:t,views:r,comments:a,downloads:b})=>`<li class="gallery-item">
            <a class="gallery-link" href="${o}">
                <img
                    class="gallery-image"
                    src="${e}"
                    alt="${i}"
                    />
            </a>
            <div class="info">
                <div><span>Likes:</span> ${t}</div>
                <div><span>Views:</span> ${r}</div>
                <div><span>Comments:</span> ${a}</div>
                <div><span>Downloads:</span> ${b}</div>
            </div>
         </li>

`).join("")}const h=document.querySelector(".gallery"),d=document.querySelector(".js-search-form"),u=document.querySelector(".loader-container"),n=document.querySelector(".js-load-more-btn"),f=15;let g="",c=1,m="";function v(){new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}async function q(s){s.preventDefault(),u.classList.remove("is-hidden"),g=d.elements.user_query.value,d.reset(),h.innerHTML="";try{const{data:e}=await y(g,c,f);if(e.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),n.classList.add("is-hidden");return}h.insertAdjacentHTML("beforeend",L(e.hits)),m=Math.ceil(e.totalHits/f),m>1&&n.classList.remove("is-hidden")}catch(e){l.error({message:"An error occurred while fetching images. Please try again!",position:"topCenter"}),console.error("Error fetching images:",e),n.classList.add("is-hidden")}finally{u.classList.add("is-hidden")}v()}async function w(){u.classList.remove("is-hidden"),c++;try{const{data:e}=await y(g,c,f);h.insertAdjacentHTML("beforeend",L(e.hits)),d.reset()}catch(e){l.error({message:"An error occurred while fetching images. Please try again!",position:"topCenter"}),console.error("Error fetching images:",e)}finally{u.classList.add("is-hidden")}if(c===m){n.classList.add("is-hidden"),l.info({message:"We are sorry, but you have reached the end of search results.",position:"topCenter"});return}v();const s=document.querySelectorAll(".gallery-item");if(s.length>0){const e=s[0].getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}d.addEventListener("submit",q);n.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
