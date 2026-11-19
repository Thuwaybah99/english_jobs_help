'use strict';
const chapters = [
  {label:'2023 · SUDAN TO EGYPT',title:'Starting over, together',description:'I left Sudan because of the war and moved to Egypt, as many other Sudanese families did. The need to find work and stability was something I understood personally.'},
  {label:'ONE MONTH · FINDING WORK',title:'Finding my own way forward',description:'With the support of friends, I spent about a month searching and attending interviews before securing a sales outsourcing job serving American clients while I lived in Egypt.'},
  {label:'CAIRO · DISCOVERING THE MARKET',title:'Discovering opportunities worth sharing',description:'Through people I met at work, I learned that many Cairo-based companies provided outsourced sales and customer service to U.S. clients. I realized that English-speaking Sudanese job seekers could also pursue these roles, and many had never heard about them.'},
  {label:'COMMUNITY · PUTTING KNOWLEDGE TO WORK',title:'Helping others rebuild',description:'I first worked with recruitment intermediaries, then created my own nonprofit community group. Through social media and online training, I helped displaced Sudanese job seekers discover opportunities, prepare for interviews, and improve their English.'}
];
const supports = [
  {title:'Making the unfamiliar accessible',text:"Through a social media campaign, I introduced Sudanese job seekers to Egypt's English-speaking outsourcing industry, including customer service and sales roles. Many qualified people simply hadn't heard about these openings."},
  {title:'Sharing connections that could open doors',text:'I built relationships with recruitment intermediaries and used what I learned from the market to point Sudanese job seekers toward employers, applications, and interviews. The goal was practical access, not a recruitment business.'},
  {title:'Supporting people even before they were ready to apply',text:'I offered online sessions on interview preparation. For people who needed stronger spoken English, I shared what to focus on for two to three months and encouraged them to return to applications with greater confidence.'}
];
let chapter = 0;
const tabs = [...document.querySelectorAll('[data-chapter]')];
function showChapter(index, moveFocus=false){
  chapter=Math.max(0,Math.min(index,chapters.length-1));
  const c=chapters[chapter];
  document.querySelector('#chapter-label').textContent=c.label;
  document.querySelector('#chapter-title').textContent=c.title;
  document.querySelector('#chapter-description').textContent=c.description;
  document.querySelector('#chapter-number').innerHTML=String(chapter+1).padStart(2,'0')+' <span>/ 04</span>';
  document.querySelector('#chapter-progress').textContent=`Chapter ${chapter+1} of ${chapters.length}`;
  document.querySelector('#chapter-panel').setAttribute('aria-labelledby',`chapter-tab-${chapter}`);
  tabs.forEach((tab,i)=>{tab.classList.toggle('active',i===chapter);tab.setAttribute('aria-selected',String(i===chapter));tab.tabIndex=i===chapter?0:-1});
  document.querySelector('#prev-chapter').disabled=chapter===0;
  document.querySelector('#next-chapter').disabled=chapter===chapters.length-1;
  if(moveFocus)tabs[chapter].focus();
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>showChapter(i));
  tab.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End'){e.preventDefault();showChapter(e.key==='Home'?0:e.key==='End'?chapters.length-1:(chapter+(e.key==='ArrowRight'?1:-1)+chapters.length)%chapters.length,true)}});
});
document.querySelector('#prev-chapter').addEventListener('click',()=>showChapter(chapter-1));
document.querySelector('#next-chapter').addEventListener('click',()=>showChapter(chapter+1));
showChapter(0);
document.querySelectorAll('[data-support]').forEach(btn=>btn.addEventListener('click',()=>{
  const index=Number(btn.dataset.support);
  document.querySelectorAll('[data-support]').forEach(item=>{item.classList.toggle('active',item===btn);item.setAttribute('aria-pressed',String(item===btn))});
  document.querySelector('#support-title').textContent=supports[index].title;
  document.querySelector('#support-text').textContent=supports[index].text;
}));
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#main-nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.09});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
