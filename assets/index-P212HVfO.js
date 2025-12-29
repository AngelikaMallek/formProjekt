(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();class p extends Error{constructor(t){super("Validation error"),this.errors=t}}class y{constructor(t,s=""){this.id=Date.now(),this.topic=t,this.description=s,this.status="todo",this.createdAt=new Date,this.validate()}toggleStatus(){this.status=this.status==="todo"?"done":"todo"}validate(){const t={};if((!this.topic||!this.topic.trim())&&(t.topic="Topic is required"),this.topic&&this.topic.length>50&&(t.topic="Description must be max 50 characters"),this.description.length>200&&(t.description="Description must be max 200 characters"),Object.keys(t).length>0)throw new p(t)}}const b=e=>`
    <p><strong>Id:</strong> ${e.id}</p>
    <p><strong>Topic:</strong> ${e.topic}</p>
    <p><strong>Description:</strong> ${e.description||"-"}</p>
    <p><strong>Status:</strong> ${e.status}</p>
    <p><strong>Created at:</strong> ${e.createdAt.toLocaleString()}</p>
  `,_=e=>`
    <form id="editForm">
      <input type="text" name="topic" class="form__field" value="${e.topic}">
      <div class="errors" data-input="topic"></div>
      <input type="text" name="description" class="form__field" value="${e.description}">
      <div class="errors" data-input="description"></div>
      <button type="submit" class="formEdit__button">Send</button>
    </form>
  `,S=e=>{e.querySelectorAll(".errors").forEach(t=>t.textContent="")},h=(e,t)=>{for(const s in e){const i=t.querySelector(`.errors[data-input="${s}"]`);i&&(i.textContent=e[s])}},c=[];let d=!1;const a=document.querySelector("#taskForm"),f=document.querySelector("#taskList"),u=document.querySelector("#task-dialog"),g=document.querySelector("#dialog__content"),v=document.querySelector("#dialog__button"),m=document.querySelector(".section__button");m.addEventListener("click",()=>{d=!d,m.textContent=d?"Show all tasks":"Show only TO-DO tasks",l()});v.addEventListener("click",()=>{u.close()});const L=()=>{c.sort((e,t)=>e.createdAt-t.createdAt)},l=()=>{f.innerHTML="",(d?c.filter(t=>t.status==="todo"):c).forEach(t=>{const s=document.createElement("li");s.classList.add("list__item"),s.classList.add(`task--${t.status}`),s.innerHTML=`
      <strong>${t.topic}</strong><br>
      Date: ${t.createdAt.toLocaleString()}<br>
      Status: ${t.status}<br>

      <button class="task__details">Show Details</button>
      <button class="task__toggle">Change status</button>
      <button class="task__delete">Delete</button>
      <button class="task__edit">Edit task</button>
    `,s.querySelector(".task__toggle").addEventListener("click",()=>{t.toggleStatus(),l()}),s.querySelector(".task__delete").addEventListener("click",()=>{const i=c.findIndex(o=>o.id===t.id);c.splice(i,1),l()}),s.querySelector(".task__details").addEventListener("click",()=>{g.innerHTML=b(t),u.showModal()}),s.querySelector(".task__edit").addEventListener("click",()=>{g.innerHTML=_(t),u.showModal();const i=document.querySelector("#editForm");i.addEventListener("submit",o=>{o.preventDefault();const r=new FormData(i);try{t.topic=r.get("topic"),t.description=r.get("description"),t.validate(),u.close(),l()}catch(n){n instanceof p?h(n.errors,i):console.error(n)}})}),f.appendChild(s)})};a.addEventListener("submit",e=>{e.preventDefault(),S(a);const t=new FormData(a);try{const s=new y(t.get("topic"),t.get("description"));c.push(s),L(),l(),a.reset()}catch(s){s instanceof p?h(s.errors,a):console.error(s)}});
