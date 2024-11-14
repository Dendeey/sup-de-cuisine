(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();function w(){const i=document.querySelectorAll(".recipe-card").length,t=document.getElementById("recipes-counter-container");t.textContent=`${i} recette${i>1?"s":""}`}function y(i){return`/assets/img/json_recipes/${i.replace(/\.jpg$/,".webp")}`}function C(i){const t=document.getElementById("recipes_grid");if(t.innerHTML="",i.length===0){t.innerHTML="<p>Aucune recette ne correspond aux tags sélectionnés</p>",w();return}i.forEach(s=>{const e=s.description.length>250?s.description.slice(0,250)+"...":s.description,n=document.createElement("article");n.classList.add("recipe-card"),n.innerHTML=`
        <div class="recipes_img">
            <img src="${y(s.image)}" alt="Image de la recette ${s.name}" loading="lazy"/>
        </div>
        <div class="recipes_content">
            <div class="recipes_title">
              <h2>${s.name}</h2>
              <span class="recipe-time">${s.time} min</span>
            </div>
            <div class="recipes_steps">
                <h3>Recette</h3>
                <p>${e}</p>
            </div>
            <div class="recipes_ingredients">
                <h3>Ingrédients</h3>
                <ul class="ingredient_list">
                </ul>
            </div>
        </div>
      `;const o=n.querySelector(".ingredient_list");s.ingredients.forEach(c=>{const a=document.createElement("li");a.innerHTML=`
          <h4 class="ingredient_title">${c.ingredient}</h4>
          <div class="amount_unit_container">
              <p class="ingredient_amount">${c.quantity||""}</p>
              <p class="ingredient_unit">${c.unit||""}</p>
          </div>
        `,o.appendChild(a)}),t.appendChild(n)}),w()}async function m(){return await(await fetch("https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json")).json()}async function f(i=""){const t=await m(),s=document.getElementById("recipes_grid");s.innerHTML="";const r=t.filter(e=>e.name.toLowerCase().includes(i.toLowerCase())||e.description.toLowerCase().includes(i.toLowerCase())||e.ingredients.some(n=>n.ingredient.toLowerCase().includes(i.toLowerCase())));if(r.length===0){s.innerHTML=`<p>Aucune recette ne contient '${i}'</p>`;return}for(let e=0;e<r.length;e++){const n=r[e],o=document.createElement("article");o.classList.add("recipe-card"),o.innerHTML=`
        <div class="recipes_img">
            <img src="${y(n.image)}" alt="Image de la recette" loading="lazy"/>
        </div>
        <div class="recipes_content">
            <div class="recipes_title">
              <h2>${n.name}</h2>
            </div>
            <div class="recipes_steps">
                <h3>Recette</h3>
                <p>${n.description}</p>
            </div>
            <div class="recipes_ingredients">
                <h3>Ingrédients</h3>
                <ul class="ingredient_list">
                </ul>
            </div>
        </div>
      `;const c=o.querySelector(".ingredient_list");for(let a=0;a<n.ingredients.length;a++){const d=n.ingredients[a],l=document.createElement("li");l.innerHTML=` 
          <h4 class="ingredient_title">${d.ingredient}</h4>
          <div class="amount_unit_container">
              <p class="ingredient_amount">${d.quantity||""}</p>
              <p class="ingredient_unit">${d.unit||""}</p>
          </div>
        `,c.appendChild(l)}s.appendChild(o)}w(r.length)}function L(){m().then(i=>{const t=E(),s=i.filter(r=>{const e=t.ingredients.every(c=>r.ingredients.some(a=>a.ingredient.toLowerCase().includes(c.toLowerCase()))),n=t.appliances.every(c=>r.appliance.toLowerCase().includes(c.toLowerCase())),o=t.utensils.every(c=>r.ustensils.some(a=>a.toLowerCase().includes(c.toLowerCase())));return e&&n&&o});C(s)})}let g={ingredients:[],appliances:[],utensils:[]};function _(i,t){const s=document.getElementById("tag-filter-container");if(g[t].includes(i))return;g[t].push(i);const r=document.createElement("button");r.classList.add("tag_filter"),r.innerHTML=`
      ${i}
      <i class="fa-solid fa-xmark fa-xl"></i>
    `,r.querySelector("i").addEventListener("click",()=>{r.remove(),g[t]=g[t].filter(e=>e!==i),L(),v()}),s.appendChild(r),L(),v()}function E(){return g}function I(){document.querySelectorAll(".dropdown_searchbar_container input").forEach(i=>{i.addEventListener("input",t=>{const s=t.target.value.toLowerCase(),r=t.target.closest(".dropdown_content").querySelector(".dropdown_items");Array.from(r.children).forEach(e=>{e.textContent.toLowerCase().includes(s)?e.style.display="block":e.style.display="none"})})})}function h(i,t,s){const r=document.getElementById(i),e=document.getElementById(t),n=document.getElementById(s);r.addEventListener("click",()=>{e.classList.toggle("show"),n.classList.toggle("searchbar_arrow_down")})}function p(i,t){const s=i.flatMap(e=>t==="ingredients"?e[t].map(n=>n.ingredient):e[t]),r=new Set;return s.forEach(e=>{if(typeof e=="string"){const n=e.toLowerCase().replace(/s\b/,"");r.add(n)}}),Array.from(r)}function u(i,t,s){const e=document.getElementById(i).querySelector(".dropdown_items");e.innerHTML="",t.forEach(n=>{const o=document.createElement("li");o.classList.add("dropdown_item"),o.textContent=n,o.addEventListener("click",()=>{_(n,s)}),e.appendChild(o)})}async function $(){const i=await m(),t=p(i,"ingredients"),s=p(i,"appliance"),r=p(i,"ustensils");u("ingredient-dropdown-content",t,"ingredients"),u("appareil-dropdown-content",s,"appliances"),u("ustensile-dropdown-content",r,"utensils")}function v(){m().then(i=>{const t=i.filter(n=>{const o=activeTags.ingredients.every(d=>n.ingredients.some(l=>l.ingredient.toLowerCase().includes(d.toLowerCase()))),c=activeTags.appliances.every(d=>n.appliance.toLowerCase().includes(d.toLowerCase())),a=activeTags.utensils.every(d=>n.ustensils.some(l=>l.toLowerCase().includes(d.toLowerCase())));return o&&c&&a}),s=p(t,"ingredients"),r=p(t,"appliance"),e=p(t,"ustensils");u("ingredient-dropdown-content",s,"ingredients"),u("appareil-dropdown-content",r,"appliances"),u("ustensile-dropdown-content",e,"utensils")})}document.addEventListener("DOMContentLoaded",()=>{f(),document.getElementById("searchbar-input").addEventListener("input",t=>{const s=t.target.value;s.length>=3?f(s):f("")}),h("ingredient-btn","ingredient-dropdown-content","ingredient-arrow"),h("appareil-btn","appareil-dropdown-content","appareil-arrow"),h("ustensile-btn","ustensile-dropdown-content","ustensile-arrow"),$(),I()});
