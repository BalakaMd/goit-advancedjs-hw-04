import{a as g,S as q,i as c}from"./assets/vendor-9d830b88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=a(r);fetch(r.href,t)}})();const y=(s,e,a)=>{g.defaults.baseURL="https://pixabay.com/";const i={params:{key:"45275366-6244e97cf540ed2b53abd51ec",q:s,image_type:"photo",safesearch:!0,orientation:"horizontal",page:e,per_page:a}};return g.get("api/",i)};function L(s){return s.map(({webformatURL:e,largeImageURL:a,tags:i,likes:r,views:t,comments:n,downloads:b})=>`<li class="gallery-item">
            <a class="gallery-link" href="${a}">
                <img
                    class="gallery-image"
                    src="${e}"
                    alt="${i}"
                    />
            </a>
            <div class="info">
                <div><span>Likes:</span> ${r}</div>
                <div><span>Views:</span> ${t}</div>
                <div><span>Comments:</span> ${n}</div>
                <div><span>Downloads:</span> ${b}</div>
            </div>
         </li>

`).join("")}const h=document.querySelector(".gallery"),u=document.querySelector(".js-search-form"),f=document.querySelector(".loader-container"),o=document.querySelector(".js-load-more-btn"),m=15,v=new q(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});let d="",l=1,p="";async function S(s){if(s.preventDefault(),l=1,d=u.elements.user_query.value.trim(),u.reset(),o.classList.add("is-hidden"),h.innerHTML="",d===""){c.error({message:"Please enter a search query!",position:"topCenter"});return}try{const{data:e}=await y(d,l,m);if(e.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),o.classList.add("is-hidden");return}h.insertAdjacentHTML("beforeend",L(e.hits)),p=Math.ceil(e.totalHits/m),p>1&&o.classList.remove("is-hidden")}catch(e){c.error({message:"An error occurred while fetching images. Please try again!",position:"topCenter"}),console.error("Error fetching images:",e),o.classList.add("is-hidden")}finally{f.classList.add("is-hidden")}v.refresh()}async function w(){f.classList.remove("is-hidden"),l++;try{const{data:e}=await y(d,l,m);h.insertAdjacentHTML("beforeend",L(e.hits)),u.reset()}catch(e){c.error({message:"An error occurred while fetching images. Please try again!",position:"topCenter"}),console.error("Error fetching images:",e)}finally{f.classList.add("is-hidden")}if(l===p){o.classList.add("is-hidden"),c.info({message:"We are sorry, but you have reached the end of search results.",position:"topCenter"});return}v.refresh();const s=document.querySelectorAll(".gallery-item");if(s.length>0){const e=s[0].getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}u.addEventListener("submit",S);o.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
