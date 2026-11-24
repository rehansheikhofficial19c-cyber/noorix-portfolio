'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  const sidebar=document.querySelector('[data-sidebar]');
  const sidebarBtn=document.querySelector('[data-sidebar-btn]');
  if(sidebar&&sidebarBtn) sidebarBtn.addEventListener('click',()=>{sidebar.classList.toggle('active');sidebarBtn.setAttribute('aria-expanded',String(sidebar.classList.contains('active')))});

  // Main page navigation — do not depend on optional template widgets.
  const navLinks=[...document.querySelectorAll('[data-nav-link]')];
  const pages=[...document.querySelectorAll('[data-page]')];
  function showPage(name){
    const target=pages.find(page=>page.dataset.page===name);
    if(!target)return;
    pages.forEach(page=>page.classList.toggle('active',page===target));
    navLinks.forEach(link=>link.classList.toggle('active',link.textContent.trim().toLowerCase()===name));
    window.scrollTo({top:0,behavior:'smooth'});
  }
  navLinks.forEach(link=>link.addEventListener('click',()=>showPage(link.textContent.trim().toLowerCase())));
  if(pages.length&&!pages.some(page=>page.classList.contains('active')))showPage('about');

  // Portfolio category filters
  const filterItems=[...document.querySelectorAll('[data-filter-item]')];
  const filterButtons=[...document.querySelectorAll('[data-filter-btn]')];
  const select=document.querySelector('[data-select]');
  const selectValue=document.querySelector('[data-selecct-value]');
  const selectItems=[...document.querySelectorAll('[data-select-item]')];
  function filterProjects(value){
    filterItems.forEach(item=>item.classList.toggle('active',value==='all'||item.dataset.category===value));
    filterButtons.forEach(button=>button.classList.toggle('active',button.textContent.trim().toLowerCase()===value));
    if(selectValue)selectValue.textContent=value==='all'?'All':value.replace(/\b\w/g,ch=>ch.toUpperCase());
  }
  filterButtons.forEach(button=>button.addEventListener('click',()=>filterProjects(button.textContent.trim().toLowerCase())));
  selectItems.forEach(item=>item.addEventListener('click',()=>{filterProjects(item.textContent.trim().toLowerCase());if(select)select.classList.remove('active')}));
  if(select)select.addEventListener('click',()=>select.classList.toggle('active'));

  // Contact form is wired to WhatsApp; optional template controls are guarded.
  const form=document.querySelector('#noorix-contact');
  if(form)form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const message=['Project enquiry — Noorix Digital Lab','','Name: '+data.get('fullname'),'Email: '+data.get('email'),'Service: '+(data.get('service')||'Not specified'),'','Project details:',data.get('message')].join('\n');
    window.open('https://wa.me/923154429417?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  });

  // Custom sky-blue cursor on mouse devices only
  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.body.classList.add('noorix-cursor-on');
    const dot=document.createElement('span'),ring=document.createElement('span');
    dot.className='noorix-cursor-dot';ring.className='noorix-cursor-ring';
    dot.setAttribute('aria-hidden','true');ring.setAttribute('aria-hidden','true');
    document.body.append(ring,dot);
    let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
    document.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.transform='translate('+x+'px,'+y+'px) translate(-50%,-50%)'},{passive:true});
    const follow=()=>{rx+=(x-rx)*.19;ry+=(y-ry)*.19;ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';requestAnimationFrame(follow)};follow();
    document.querySelectorAll('a,button,input,textarea,select,[role="button"]').forEach(el=>{
      el.addEventListener('pointerenter',()=>ring.classList.add('is-hover'));
      el.addEventListener('pointerleave',()=>ring.classList.remove('is-hover'));
    });
    document.addEventListener('pointerdown',()=>ring.classList.add('is-hover'));
    document.addEventListener('pointerup',()=>ring.classList.remove('is-hover'));
  }

});