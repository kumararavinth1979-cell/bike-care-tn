let bikes=[];
const grid=document.querySelector("#grid"), search=document.querySelector("#search"), brand=document.querySelector("#brand"), category=document.querySelector("#category"), count=document.querySelector("#count"), empty=document.querySelector("#empty");
fetch("bikes.json").then(r=>r.json()).then(d=>{bikes=d;fillFilters();render()});
function fillFilters(){
  [...new Set(bikes.map(x=>x.brand))].sort().forEach(x=>brand.add(new Option(x,x)));
  [...new Set(bikes.map(x=>x.category))].sort().forEach(x=>category.add(new Option(x,x)));
}
function render(){
 const q=search.value.toLowerCase().trim(), b=brand.value, c=category.value;
 const out=bikes.filter(x=>(!q||`${x.brand} ${x.model} ${x.engine} ${x.category}`.toLowerCase().includes(q))&&(!b||x.brand===b)&&(!c||x.category===c));
 count.textContent=`Showing ${out.length} of ${bikes.length} bikes`;
 grid.innerHTML=out.map(x=>`<article class="card">
 <img class="pic" src="${x.image}" alt="${x.brand} ${x.model}">
 <div class="body"><div class="brand">${x.brand}</div><div class="name">${x.model}</div><div class="meta">${x.category} • ${x.engine}</div>
 <div class="row"><div class="label">Common maintenance / repair items</div><div class="value">${x.parts}</div></div>
 <div class="row"><div class="label">Periodic service</div><div class="value">${x.service}</div></div>
 <div class="row"><div class="label">Cleaning / lubrication</div><div class="value">${x.cleaning}</div></div>
 <div class="row"><div class="label">Replacement guidance</div><div class="value">${x.replacement}</div></div>
 </div></article>`).join("");
 empty.hidden=out.length!==0;
}
[search,brand,category].forEach(e=>e.addEventListener("input",render));
[brand,category].forEach(e=>e.addEventListener("change",render));
