import { useState, useEffect, useRef, useMemo } from "react";

// ── DATABASE ────────────────────────────────────────────────────────────
const DB = [
  { name:"Lautaro Martínez",    surname:"Martinez",       club:"Inter",    league:"Serie A", role:"Attaccante",      nation:"Argentina",  continent:"Sud America",  age:28, value:85 },
  { name:"Alessandro Bastoni",  surname:"Bastoni",        club:"Inter",    league:"Serie A", role:"Difensore",       nation:"Italia",     continent:"Europa",       age:26, value:80 },
  { name:"Kenan Yıldız",        surname:"Yildiz",         club:"Juventus", league:"Serie A", role:"Ala",             nation:"Turchia",    continent:"Europa",       age:20, value:75 },
  { name:"Rafael Leão",         surname:"Leao",           club:"Milan",    league:"Serie A", role:"Ala",             nation:"Portogallo", continent:"Europa",       age:26, value:70 },
  { name:"Nico Paz",            surname:"Paz",            club:"Como",     league:"Serie A", role:"Trequartista",    nation:"Argentina",  continent:"Sud America",  age:21, value:65 },
  { name:"Christian Pulisic",   surname:"Pulisic",        club:"Milan",    league:"Serie A", role:"Ala",             nation:"USA",        continent:"Nord America", age:27, value:60 },
  { name:"Nicolò Barella",      surname:"Barella",        club:"Inter",    league:"Serie A", role:"Centrocampista",  nation:"Italia",     continent:"Europa",       age:29, value:60 },
  { name:"Marcus Thuram",       surname:"Thuram",         club:"Inter",    league:"Serie A", role:"Attaccante",      nation:"Francia",    continent:"Europa",       age:28, value:60 },
  { name:"Manu Koné",           surname:"Kone",           club:"Roma",     league:"Serie A", role:"Centrocampista",  nation:"Francia",    continent:"Europa",       age:24, value:50 },
  { name:"Federico Dimarco",    surname:"Dimarco",        club:"Inter",    league:"Serie A", role:"Terzino",         nation:"Italia",     continent:"Europa",       age:28, value:45 },
  { name:"Scott McTominay",     surname:"McTominay",      club:"Napoli",   league:"Serie A", role:"Centrocampista",  nation:"Scozia",     continent:"Europa",       age:29, value:45 },
  { name:"Alessandro Buongiorno",surname:"Buongiorno",    club:"Napoli",   league:"Serie A", role:"Difensore",       nation:"Italia",     continent:"Europa",       age:26, value:45 },
  { name:"Rasmus Højlund",      surname:"Hojlund",        club:"Napoli",   league:"Serie A", role:"Attaccante",      nation:"Danimarca",  continent:"Europa",       age:23, value:45 },
  { name:"Moise Kean",          surname:"Kean",           club:"Fiorentina",league:"Serie A",role:"Attaccante",      nation:"Italia",     continent:"Europa",       age:26, value:45 },
  { name:"Loïs Openda",         surname:"Openda",         club:"Juventus", league:"Serie A", role:"Attaccante",      nation:"Belgio",     continent:"Europa",       age:26, value:40 },
  { name:"Khéphren Thuram",     surname:"Thuram K",       club:"Juventus", league:"Serie A", role:"Centrocampista",  nation:"Francia",    continent:"Europa",       age:24, value:40 },
  { name:"Éderson",             surname:"Ederson",        club:"Atalanta", league:"Serie A", role:"Centrocampista",  nation:"Brasile",    continent:"Sud America",  age:26, value:40 },
  { name:"Charles De Ketelaere",surname:"De Ketelaere",   club:"Atalanta", league:"Serie A", role:"Trequartista",    nation:"Belgio",     continent:"Europa",       age:24, value:35 },
  { name:"Dušan Vlahović",      surname:"Vlahovic",       club:"Juventus", league:"Serie A", role:"Attaccante",      nation:"Serbia",     continent:"Europa",       age:26, value:35 },
  { name:"Mile Svilar",         surname:"Svilar",         club:"Roma",     league:"Serie A", role:"Portiere",        nation:"Belgio",     continent:"Europa",       age:26, value:35 },
  { name:"Matías Soulé",        surname:"Soule",          club:"Roma",     league:"Serie A", role:"Ala",             nation:"Argentina",  continent:"Sud America",  age:22, value:35 },
  { name:"Wesley",              surname:"Wesley",         club:"Roma",     league:"Serie A", role:"Terzino",         nation:"Brasile",    continent:"Sud America",  age:22, value:35 },
  { name:"Bremer",              surname:"Bremer",         club:"Juventus", league:"Serie A", role:"Difensore",       nation:"Brasile",    continent:"Sud America",  age:28, value:35 },
  { name:"Yann Bisseck",        surname:"Bisseck",        club:"Inter",    league:"Serie A", role:"Difensore",       nation:"Germania",   continent:"Europa",       age:25, value:35 },
  { name:"Jonathan David",      surname:"David",          club:"Juventus", league:"Serie A", role:"Attaccante",      nation:"Canada",     continent:"Nord America", age:26, value:35 },
  { name:"Ange-Yoan Bonny",     surname:"Bonny",          club:"Inter",    league:"Serie A", role:"Attaccante",      nation:"Francia",    continent:"Europa",       age:22, value:35 },
  { name:"Pio Esposito",        surname:"Esposito",       club:"Inter",    league:"Serie A", role:"Attaccante",      nation:"Italia",     continent:"Europa",       age:20, value:35 },
  { name:"Santiago Castro",     surname:"Castro",         club:"Bologna",  league:"Serie A", role:"Attaccante",      nation:"Argentina",  continent:"Sud America",  age:21, value:35 },
  { name:"Christopher Nkunku",  surname:"Nkunku",         club:"Milan",    league:"Serie A", role:"Attaccante",      nation:"Francia",    continent:"Europa",       age:28, value:32 },
  { name:"Ardon Jashari",       surname:"Jashari",        club:"Milan",    league:"Serie A", role:"Centrocampista",  nation:"Svizzera",   continent:"Europa",       age:23, value:32 },
  { name:"Assane Diao",         surname:"Diao",           club:"Como",     league:"Serie A", role:"Ala",             nation:"Senegal",    continent:"Africa",       age:20, value:30 },
  { name:"Jesús Rodríguez",     surname:"Rodriguez",      club:"Como",     league:"Serie A", role:"Ala",             nation:"Spagna",     continent:"Europa",       age:20, value:30 },
  { name:"Andrea Cambiaso",     surname:"Cambiaso",       club:"Juventus", league:"Serie A", role:"Terzino",         nation:"Italia",     continent:"Europa",       age:26, value:30 },
  { name:"Evan Ndicka",         surname:"Ndicka",         club:"Roma",     league:"Serie A", role:"Difensore",       nation:"Francia",    continent:"Europa",       age:26, value:30 },
  { name:"Mario Gila",          surname:"Gila",           club:"Lazio",    league:"Serie A", role:"Difensore",       nation:"Spagna",     continent:"Europa",       age:25, value:30 },
  { name:"Francisco Conceição", surname:"Conceicao",      club:"Juventus", league:"Serie A", role:"Ala",             nation:"Portogallo", continent:"Europa",       age:23, value:30 },
  { name:"Petar Sučić",         surname:"Sucic",          club:"Inter",    league:"Serie A", role:"Centrocampista",  nation:"Croazia",    continent:"Europa",       age:22, value:30 },
  { name:"Sam Beukema",         surname:"Beukema",        club:"Bologna",  league:"Serie A", role:"Difensore",       nation:"Olanda",     continent:"Europa",       age:27, value:28 },
  { name:"Youssouf Fofana",     surname:"Fofana",         club:"Milan",    league:"Serie A", role:"Centrocampista",  nation:"Francia",    continent:"Europa",       age:27, value:28 },
  { name:"Strahinja Pavlović",  surname:"Pavlovic",       club:"Milan",    league:"Serie A", role:"Difensore",       nation:"Serbia",     continent:"Europa",       age:24, value:28 },
  { name:"David Neres",         surname:"Neres",          club:"Napoli",   league:"Serie A", role:"Ala",             nation:"Brasile",    continent:"Sud America",  age:29, value:28 },
  { name:"Teun Koopmeiners",    surname:"Koopmeiners",    club:"Juventus", league:"Serie A", role:"Trequartista",    nation:"Olanda",     continent:"Europa",       age:28, value:28 },
  { name:"Nicolò Rovella",      surname:"Rovella",        club:"Lazio",    league:"Serie A", role:"Centrocampista",  nation:"Italia",     continent:"Europa",       age:24, value:28 },
  { name:"Davide Frattesi",     surname:"Frattesi",       club:"Inter",    league:"Serie A", role:"Centrocampista",  nation:"Italia",     continent:"Europa",       age:26, value:28 },
  { name:"Pierre Kalulu",       surname:"Kalulu",         club:"Juventus", league:"Serie A", role:"Difensore",       nation:"Francia",    continent:"Europa",       age:25, value:28 },
  { name:"Carlos Augusto",      surname:"Augusto",        club:"Inter",    league:"Serie A", role:"Terzino",         nation:"Brasile",    continent:"Sud America",  age:27, value:26 },
  { name:"Mike Maignan",        surname:"Maignan",        club:"Milan",    league:"Serie A", role:"Portiere",        nation:"Francia",    continent:"Europa",       age:30, value:25 },
  { name:"Honest Ahanor",       surname:"Ahanor",         club:"Atalanta", league:"Serie A", role:"Difensore",       nation:"Nigeria",    continent:"Africa",       age:18, value:25 },
  { name:"Frank Anguissa",      surname:"Anguissa",       club:"Napoli",   league:"Serie A", role:"Centrocampista",  nation:"Camerun",    continent:"Africa",       age:30, value:25 },
  { name:"Manuel Locatelli",    surname:"Locatelli",      club:"Juventus", league:"Serie A", role:"Centrocampista",  nation:"Italia",     continent:"Europa",       age:28, value:25 },
];

// ── ROSE (25/26) ────────────────────────────────────────────────────────
const ROSE_LIST = [
  { key:"Roma", nome:"AS Roma", emoji:"🐺", giocatori:[
    "Svilar","Gollini","Zelezny","Ndicka","Mancini","Ghilardi","Ziolkowski","Hermoso",
    "Angelino","Tsimikias","Wesley","Celik","Rensch","Cristante","Koné","El Aynaouì",
    "Pisilli","Pellegrini","Zaragoza","El Shaarawy","Soulé","Venturino","Dybala",
    "Ferguson","Malen","Dovbyk","Vaz"
  ]},
  { key:"Inter", nome:"FC Internazionale", emoji:"🔵", giocatori:[
    "Martinez J.","Sommer","Di Gennaro","Bastoni","Bisseck","Akanji","De Vrij","Acerbi",
    "Dimarco","Augusto","Dumfries","Darmian","Calhanoglu","Barella","Sucic","Frattesi",
    "Diouf","Zielinski","Mkhitaryan","Luis Henrique","Lautaro","Thuram","Bonny","Esposito"
  ]},
  { key:"Milan", nome:"AC Milan", emoji:"🔴", giocatori:[
    "Maignan","Terracciano","Torriani","Pavlovic","De Winter","Tomori","Gabbia","Odogù",
    "Bartesaghi","Estupinan","Athekame","Jashari","Fofana","Ricci","Rabiot","Loftus-Cheek",
    "Modric","Saelemaekers","Leao","Pulisic","Nkunku","Gimenez","Fullkrug"
  ]},
  { key:"Juventus", nome:"Juventus FC", emoji:"⚪", giocatori:[
    "Di Gregorio","Perin","Pinsoglio","Gatti","Kalulu","Cambiaso","Cabal","Holm","Kelly",
    "Bremer","Locatelli","Miretti","Koopmeiners","Thuram K.","McKennie","Conceicao",
    "Zhegrova","Adzic","David","Openda","Yildiz","Vlahovic","Milik","Kostic","Boga"
  ]},
];

// ── CARRIERE ────────────────────────────────────────────────────────────
const CAREERS = [
  { answer:"Francesco Totti", clues:[
    { club:"Roma Primavera", period:"1989–1993", apps:60,  goals:28,  note:"Debutto in prima squadra a 16 anni" },
    { club:"AS Roma",         period:"1993–2017", apps:619, goals:307, note:"1 Scudetto, 2 Coppe Italia, Capitano eterno" },
    { club:"Nazionale",       period:"1998–2006", apps:58,  goals:9,   note:"Campione del Mondo 2006" },
  ]},
  { answer:"Zlatan Ibrahimovic", clues:[
    { club:"Malmö FF",    period:"1999–2001", apps:40, goals:16, note:"Esordio professionistico in Svezia" },
    { club:"Ajax",        period:"2001–2004", apps:74, goals:35, note:"Eredivisie vinta due volte" },
    { club:"Juventus",    period:"2004–2006", apps:70, goals:23, note:"Due scudetti (poi revocati per Calciopoli)" },
    { club:"Inter",       period:"2006–2009", apps:88, goals:57, note:"Tre scudetti con Mourinho" },
    { club:"Barcellona",  period:"2009–2010", apps:29, goals:16, note:"Champions League vinta" },
    { club:"Milan",       period:"2010–12 / 2019–23", apps:163, goals:93, note:"Scudetto 2022 a 40 anni" },
  ]},
  { answer:"Alessandro Del Piero", clues:[
    { club:"Padova",   period:"1991–1993", apps:30, goals:11, note:"Esordio nei professionisti a 17 anni" },
    { club:"Juventus", period:"1993–2012", apps:705, goals:290, note:"6 Scudetti, 1 Champions League, Capitano storico" },
    { club:"Sydney FC",period:"2012–2014", apps:57, goals:27,  note:"Esperienza in Australia, idolo immediato" },
    { club:"Nazionale", period:"1995–2008", apps:91, goals:27, note:"Campione del Mondo 2006" },
  ]},
  { answer:"Roberto Baggio", clues:[
    { club:"Vicenza",   period:"1982–1985", apps:52, goals:13, note:"Esordio da giovanissimo" },
    { club:"Fiorentina",period:"1985–1990", apps:94, goals:39, note:"Beniamino di Firenze, addio contestatissimo" },
    { club:"Juventus",  period:"1990–1995", apps:141, goals:78, note:"Scudetto, Coppa UEFA, Pallone d'Oro 1993" },
    { club:"Milan",     period:"1995–1997", apps:59, goals:19, note:"Due stagioni, mai titolare fisso" },
    { club:"Bologna",   period:"1997–2000", apps:97, goals:39, note:"Rinascita dopo anni difficili" },
    { club:"Nazionale", period:"1988–2004", apps:56, goals:27, note:"Finale Mondiale 1994, rigore sbagliato" },
  ]},
];

// ── HELPERS ─────────────────────────────────────────────────────────────
function seedRandom(s){let x=s;return()=>{x=(x*1664525+1013904223)&0xffffffff;return(x>>>0)/0xffffffff;};}

// todaySeed: YYYYMMDD as number — unique per calendar day
function todaySeed(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}

// seedForDaysAgo(n): seed for n days ago (0=today, 1=yesterday, ...)
function seedForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}

// dateForDaysAgo(n): display date string for n days ago
function dateForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.toLocaleDateString("it-IT",{day:"numeric",month:"long"});}

// archiveNum(poolSize): today = poolSize (max), yesterday = poolSize-1, etc.
// Archive #1 = poolSize-1 days ago, Archive #poolSize = today
function archiveNum(poolSize){return poolSize;}
// daysAgoForNum(num, poolSize): how many days ago is archive entry #num?
// num=poolSize → 0 days ago (today), num=1 → poolSize-1 days ago
function daysAgoForNum(num,poolSize){return poolSize-num;}
// seedForNum(num, poolSize)
function seedForNum(num,poolSize){return seedForDaysAgo(daysAgoForNum(num,poolSize));}

function shuffle(arr,rng){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function normStr(s){return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function normLow(s){return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}

function useCountdown(){
  const[t,sT]=useState("");
  useEffect(()=>{
    function calc(){const now=new Date(),next=new Date();next.setHours(24,0,0,0);const d=next-now;sT(`${String(Math.floor(d/3600000)).padStart(2,"0")}:${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}:${String(Math.floor((d%60000)/1000)).padStart(2,"0")}`);}
    calc();const id=setInterval(calc,1000);return()=>clearInterval(id);
  },[]);
  return t;
}

// ── COLORI / STILI ───────────────────────────────────────────────────────
const US={black:"#111",orange:"#f5e000",bg:"#f4f4f4",border:"#e2e2e2",muted:"#888",green:"#16a34a",greenL:"#dcfce7",red:"#dc2626",redL:"#fee2e2",yellow:"#d97706"};
const T={
  app:{minHeight:"100vh",background:US.bg,fontFamily:"'Helvetica Neue',Arial,sans-serif"},
  hdr:{background:US.black,color:"#fff",padding:"13px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`3px solid ${US.orange}`},
  ey:{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"},
  ht:{fontSize:"17px",fontWeight:"700",margin:0},
  body:{padding:"18px 18px 48px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"},
  bk:{background:"none",border:"1.5px solid #444",borderRadius:"4px",color:"#aaa",padding:"5px 11px",fontSize:"9px",letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"},
  pb:{background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"9px 16px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},
  sb:{background:"#fff",color:US.black,border:`1.5px solid ${US.black}`,borderRadius:"4px",padding:"8px 16px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},
  lb:{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"7px",display:"block"},
  ip:{border:`1.5px solid ${US.border}`,borderRadius:"4px",padding:"9px 11px",fontSize:"13px",fontFamily:"inherit",outline:"none",color:US.black,boxSizing:"border-box"},
};

// ── HEADER ───────────────────────────────────────────────────────────────
function dayToDate(num,poolSize){return dateForDaysAgo(daysAgoForNum(num,poolSize));}

function Hdr({title,sub,onHome,archiveNav}){
  return(
    <div style={T.hdr}>
      <div style={{flex:1,minWidth:0}}>
        <div style={T.ey}>Universo Sportivo</div>
        <div style={T.ht}>{title}</div>
        {sub&&<div style={{fontSize:"9px",color:"#777",marginTop:"1px"}}>{sub}</div>}
      </div>
      {archiveNav&&<div style={{display:"flex",alignItems:"center",gap:"5px",marginRight:"8px"}}>
        <button onClick={archiveNav.prev} disabled={archiveNav.day<=1} style={{...T.bk,padding:"4px 8px",opacity:archiveNav.day<=1?0.3:1}}>◀</button>
        <div style={{textAlign:"center",minWidth:"52px"}}>
          <div style={{fontSize:"11px",color:"#fff",fontWeight:"700"}}>#{archiveNav.day}</div>
          <div style={{fontSize:"8px",color:"#aaa"}}>{dayToDate(archiveNav.day,archiveNav.poolSize)}</div>
        </div>
        <button onClick={archiveNav.next} disabled={archiveNav.day>=archiveNav.max} style={{...T.bk,padding:"4px 8px",opacity:archiveNav.day>=archiveNav.max?0.3:1}}>▶</button>
      </div>}
      {onHome&&<button style={T.bk} onClick={onHome} onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="#fff";}} onMouseLeave={e=>{e.currentTarget.style.color="#aaa";e.currentTarget.style.borderColor="#444";}}>← Home</button>}
    </div>
  );
}

// ── ARCHIVE WRAPPER ──────────────────────────────────────────────────────
const POOL_SIZES={calciodle:DB.length,wordle:DB.length,hangman:DB.length,valore2:DB.length,carriera:CAREERS.length,rosa:ROSE_LIST.length};

function ArchiveWrapper({gameKey,children}){
  const poolSize=POOL_SIZES[gameKey]||DB.length;
  const todayN=poolSize; // today is always max
  const[num,setNum]=useState(todayN);
  const seed=seedForNum(num,poolSize);
  const isToday=num===todayN;
  return children({day:num,seed,isToday,
    archiveNav:{day:num,max:todayN,poolSize,prev:()=>setNum(n=>Math.max(1,n-1)),next:()=>setNum(n=>Math.min(todayN,n+1))}
  });
}

// ── CALCIODLE ────────────────────────────────────────────────────────────
const COLS=[{key:"role",label:"Ruolo"},{key:"nation",label:"Naz."},{key:"continent",label:"Cont."},{key:"club",label:"Club"},{key:"age",label:"Età"},{key:"value",label:"Val."}];
const CLR={green:{bg:US.green,tx:"#fff"},yellow:{bg:US.yellow,tx:"#fff"},red:{bg:US.red,tx:"#fff"},empty:{bg:"#fff",tx:"#ccc"},active:{bg:"#fffbea",tx:"#bbb"}};
function eC(k,g,t){if(k==="age"){const d=Math.abs(g-t);return d===0?"green":d<=3?"yellow":"red";}if(k==="value"){const d=Math.abs(g-t);return d===0?"green":d<=15?"yellow":"red";}return g===t?"green":"red";}
function aD(k,g,t){if(k!=="age"&&k!=="value")return null;return g===t?null:g<t?"▲":"▼";}
function cS(c){return{flex:1,minWidth:0,borderRadius:"2px",background:CLR[c]?.bg||"#fff",border:`1.5px solid ${CLR[c]?.bg||"#e8e8e8"}`,color:CLR[c]?.tx||"#ccc",fontSize:"8px",textAlign:"center",padding:"4px 2px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"32px",overflow:"hidden"};}

function CalciodleGame({day,seed,isToday,archiveNav,onHome}){
  const target=useMemo(()=>DB[seed%DB.length],[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const[G,sG]=useState([]);const[inp,sI]=useState("");const[sg,sSg]=useState([]);const[ov,sO]=useState(false);const[won,sW]=useState(false);const[mo,sMo]=useState(false);
  // reset on day change
  useEffect(()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);},[seed]);
  function onI(v){sI(v);if(v.length<2){sSg([]);return;}sSg(DB.filter(p=>p.name.toLowerCase().includes(v.toLowerCase())&&!G.find(x=>x.name===p.name)).slice(0,5));}
  function sub(p){if(ov)return;const ng=[...G,p];const w=p.name===target.name,o=ng.length>=6;sG(ng);sI("");sSg([]);if(w){sW(true);sO(true);setTimeout(()=>sMo(true),400);}else if(o){sO(true);setTimeout(()=>sMo(true),400);}}
  const em=Math.max(0,6-G.length-(ov?0:1));
  return(<div style={T.app}><Hdr title="Calciodle" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>
    <div style={T.body}>
      <div style={{display:"flex",gap:"4px",marginBottom:"12px",alignItems:"center"}}>{Array.from({length:6}).map((_,i)=><div key={i} style={{height:"3px",width:"26px",borderRadius:"2px",background:i<G.length?(won&&i===G.length-1?US.green:US.red):"#e0e0e0"}}/>)}<span style={{fontSize:"9px",color:"#bbb",marginLeft:"4px"}}>{ov?(won?"✓":"✗"):`${G.length}/6`}</span></div>
      <div style={{width:"100%"}}>
      <div style={{display:"flex",gap:"3px",marginBottom:"2px",paddingLeft:"52px"}}>{COLS.map(c=><div key={c.key} style={{flex:1,fontSize:"7px",letterSpacing:"1px",textTransform:"uppercase",color:"#bbb",textAlign:"center"}}>{c.label}</div>)}</div>
      {G.map((g,ri)=><div key={ri} style={{display:"flex",gap:"3px",alignItems:"center",marginBottom:"2px"}}><div style={{width:"50px",fontSize:"8px",color:"#555",textAlign:"right",paddingRight:"5px",flexShrink:0,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{g.name.split(" ").pop()}</div>{COLS.map(c=>{const cl=eC(c.key,g[c.key],target[c.key]);const ar=aD(c.key,g[c.key],target[c.key]);return<div key={c.key} style={cS(cl)}><span style={{fontWeight:"700",fontSize:"8px"}}>{g[c.key]}{c.key==="value"?"M":""}</span>{ar&&<span style={{fontSize:"7px"}}>{ar}</span>}</div>;})}</div>)}
      {!ov&&<div style={{display:"flex",gap:"3px",alignItems:"center",marginBottom:"2px"}}><div style={{width:"50px",flexShrink:0}}/>{COLS.map(c=><div key={c.key} style={cS("active")}>·</div>)}</div>}
      {Array.from({length:em}).map((_,i)=><div key={i} style={{display:"flex",gap:"3px",alignItems:"center",marginBottom:"2px",opacity:0.2}}><div style={{width:"50px",flexShrink:0}}/>{COLS.map(c=><div key={c.key} style={cS("empty")}>·</div>)}</div>)}
      {!ov&&<div style={{marginTop:"14px"}}><span style={T.lb}>Inserisci un giocatore</span><div style={{position:"relative"}}><input style={{...T.ip,width:"100%"}} value={inp} onChange={e=>onI(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&sg.length)sub(sg[0]);}} placeholder="Cerca nome..."/>{sg.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"2px",zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",marginTop:"2px"}}>{sg.map((p,i)=><div key={i} onClick={()=>sub(p)} style={{padding:"7px 11px",cursor:"pointer",fontSize:"12px",borderBottom:"1px solid #f5f5f5",display:"flex",justifyContent:"space-between"}} onMouseEnter={e=>e.currentTarget.style.background="#f8f8f6"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}><span>{p.name}</span><span style={{color:"#bbb",fontSize:"10px"}}>{p.club}</span></div>)}</div>}</div></div>}
      </div>
      <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>{[[US.green,"Esatto"],[US.yellow,"Vicino"],[US.red,"Sbagliato"]].map(([c,l])=><div key={c} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"9px",color:"#999"}}><div style={{width:"8px",height:"8px",borderRadius:"2px",background:c}}/>{l}</div>)}</div>
    </div>
    {mo&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}} onClick={()=>sMo(false)}><div style={{background:"#fff",borderRadius:"4px",maxWidth:"280px",width:"100%",overflow:"hidden"}} onClick={e=>e.stopPropagation()}><div style={{background:US.black,color:"#fff",padding:"11px 16px"}}><div style={{fontSize:"8px",color:"#888",marginBottom:"2px"}}>{won?`Trovato in ${G.length}`:"Game Over"}</div><div style={{fontSize:"16px"}}>{won?"Complimenti!":"Era..."}</div></div><div style={{padding:"12px 16px"}}><div style={{border:"1.5px solid #e8e8e8",borderRadius:"2px",padding:"9px",marginBottom:"9px"}}><div style={{fontWeight:"700",marginBottom:"3px"}}>{target.name}</div>{[["Club",target.club],["Nazione",target.nation],["Valore",`€${target.value}M`]].map(([k,v])=><div key={k} style={{fontSize:"11px",color:"#777"}}><strong>{k}:</strong> {v}</div>)}</div><button onClick={()=>sMo(false)} style={{...T.pb,width:"100%"}}>Chiudi</button>{!isToday&&<button onClick={()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);}} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>🔀 Rigioca</button>}</div></div></div>}
  </div>);
}
function Calciodle({onHome,isDaily}){
  if(isDaily){const d=DB.length,s=todaySeed();return<CalciodleGame day={d} seed={s} isToday archiveNav={null} onHome={onHome}/>;}
  return<ArchiveWrapper gameKey="calciodle">{({day,seed,isToday,archiveNav})=><CalciodleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} onHome={onHome}/>}</ArchiveWrapper>;
}

// ── WORDLE COGNOME ───────────────────────────────────────────────────────
function WordleGame({day,seed,isToday,archiveNav,onHome}){
  const ROUNDS=5,MAX_ATT=6;
  const pool=useMemo(()=>{const rng=seedRandom(seed+77);return shuffle(DB.filter(p=>normStr(p.surname).length>=4&&normStr(p.surname).length<=8),rng);},[seed]);
  const player=pool[0];
  const word=normStr(player.surname);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const[attempts,setAttempts]=useState([]);
  const[current,setCurrent]=useState("");
  const[status,setStatus]=useState("playing"); // playing | won | lost
  useEffect(()=>{setAttempts([]);setCurrent("");setStatus("playing");},[seed]);

  function evalGuess(guess){
    const g=normStr(guess).slice(0,word.length).padEnd(word.length," ");
    return g.split("").map((c,i)=>{
      if(c===word[i])return{c,s:"green"};
      if(word.includes(c))return{c,s:"yellow"};
      return{c,s:"gray"};
    });
  }
  function submit(){
    if(status!=="playing")return;
    const g=normStr(current);
    if(g.length!==word.length)return;
    const ev=evalGuess(g);
    const newAttempts=[...attempts,ev];
    setAttempts(newAttempts);
    setCurrent("");
    if(ev.every(x=>x.s==="green"))setStatus("won");
    else if(newAttempts.length>=MAX_ATT)setStatus("lost");
  }

  const used={};
  attempts.flat().forEach(({c,s})=>{if(!used[c]||used[c]==="gray"||(used[c]==="yellow"&&s==="green"))used[c]=s;});
  const colBg={green:US.green,yellow:US.yellow,gray:"#9ca3af"};

  const[hint,setHint]=useState(false);
  return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <span style={{fontSize:"11px",color:"#aaa"}}>{word.length} lettere</span>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"10px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{player.nation} · {player.role} · {player.club}</div>}
      {/* Grid */}
      <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"16px",alignItems:"center"}}>
        {Array.from({length:MAX_ATT}).map((_,ri)=>{
          const att=attempts[ri];
          const isActive=ri===attempts.length&&status==="playing";
          const disp=isActive?normStr(current).padEnd(word.length," ").slice(0,word.length).split(""):Array(word.length).fill(" ");
          return(<div key={ri} style={{display:"flex",gap:"5px"}}>
            {Array.from({length:word.length}).map((_,ci)=>{
              const filled=att?att[ci]:null;
              const bg=filled?(colBg[filled.s]||"#e0e0e0"):isActive&&disp[ci].trim()?"#fff":"#e0e0e0";
              const bd=filled?"transparent":isActive&&disp[ci].trim()?`2px solid ${US.black}`:"2px solid #d0d0d0";
              if(filled){
                return(<div key={ci} className="flip-cell" style={{width:"42px",height:"42px"}}>
                  <div className={`flip-inner flipped`} style={{transitionDelay:`${ci*80}ms`}}>
                    <div className="flip-back" style={{background:colBg[filled.s]||"#e0e0e0",color:"#fff",fontSize:"16px"}}>{filled.c}</div>
                  </div>
                </div>);
              }
              return(<div key={ci} style={{width:"42px",height:"42px",borderRadius:"3px",background:bg,border:bd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"700",color:US.black}}>{isActive?disp[ci].trim():""}</div>);
            })}
          </div>);
        })}
      </div>
      {/* Tastiera */}
      {status==="playing"&&<div>
        <input value={current} onChange={e=>{const v=e.target.value.toUpperCase().replace(/[^A-Z]/g,"").slice(0,word.length);setCurrent(v);}} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submit();}}} placeholder={`${word.length} lettere...`} style={{...T.ip,width:"100%",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"3px",textAlign:"center",fontSize:"16px"}} autoFocus/>
        <button onClick={submit} disabled={normStr(current).length!==word.length} style={{...T.pb,width:"100%",opacity:normStr(current).length===word.length?1:0.4}}>Invio</button>
        {/* Tastiera visiva */}
        <div style={{marginTop:"12px"}}>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"3px",marginBottom:"3px"}}>{row.map(k=>{const st=used[k];return<button key={k} onClick={()=>setCurrent(c=>(c.length<word.length?c+k:c))} style={{background:st?(colBg[st]||"#9ca3af"):"#e0e0e0",color:st?"#fff":"#333",border:"none",borderRadius:"3px",padding:"8px 5px",minWidth:"26px",fontSize:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>{k}</button>;})} </div>)}</div>
      </div>}
      {(status==="won"||status==="lost")&&<div style={{textAlign:"center",padding:"14px",background:status==="won"?US.greenL:US.redL,borderRadius:"6px",color:status==="won"?US.green:US.red}}>
        <div style={{fontSize:"14px",fontWeight:"700",marginBottom:"4px"}}>{status==="won"?"Corretto!":"Era..."}</div>
        <div style={{fontSize:"18px",fontWeight:"700",letterSpacing:"3px"}}>{word}</div>
        <div style={{fontSize:"11px",marginTop:"2px",color:"#666"}}>{player.name} · {player.club}</div>
        {!isToday&&<button onClick={()=>{setAttempts([]);setCurrent("");setStatus("playing");}} style={{...T.sb,marginTop:"10px",color:US.black}}>🔀 Rigioca</button>}
      </div>}
    </div>
  </div>);
}
function WordleCognome({onHome,isDaily}){
  if(isDaily){const d=DB.length,s=todaySeed();return<WordleGame day={d} seed={s} isToday archiveNav={null} onHome={onHome}/>;}
  return<ArchiveWrapper gameKey="wordle">{({day,seed,isToday,archiveNav})=><WordleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} onHome={onHome}/>}</ArchiveWrapper>;
}

// ── IMPICCATO (senza indizi) ─────────────────────────────────────────────
function HangmanGame({day,seed,isToday,archiveNav,onHome}){
  const M=7;
  const pool=useMemo(()=>{const rng=seedRandom(seed+13);return shuffle(DB.filter(p=>normStr(p.surname).length>=4),rng);},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const[gu,sGu]=useState(new Set());const[st,sSt]=useState("p");
  useEffect(()=>{sGu(new Set());sSt("p");},[seed]);
  const pl=pool[0],wd=normStr(pl.surname),wr=[...gu].filter(c=>!wd.includes(c)),wc=wr.length,rv=wd.split("").every(c=>gu.has(c));
  useEffect(()=>{if(rv&&st==="p")sSt("w");else if(wc>=M&&st==="p")sSt("l");},[gu]);
  function g(c){if(st!=="p"||gu.has(c))return;sGu(x=>new Set([...x,c]));} 
  const bodyParts=[<circle key="h" cx="50" cy="19" r="8" stroke="#333" strokeWidth="2.5" fill="none"/>,<line key="b" x1="50" y1="27" x2="50" y2="58" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="la" x1="50" y1="37" x2="35" y2="49" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="ra" x1="50" y1="37" x2="65" y2="49" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="ll" x1="50" y1="58" x2="37" y2="75" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="rl" x1="50" y1="58" x2="63" y2="75" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="rp" x1="50" y1="6" x2="50" y2="11" stroke="#333" strokeWidth="2.5"/>];

  const[hint,setHint]=useState(false);
  return(<div style={T.app}><Hdr title="Impiccato" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"6px"}}>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"6px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{pl.nation} · {pl.role} · {pl.age} anni</div>}
      <div style={{display:"flex",justifyContent:"center",marginBottom:"8px"}}><svg width="100" height="88" viewBox="0 0 100 88"><line x1="12" y1="84" x2="88" y2="84" stroke="#ddd" strokeWidth="2"/><line x1="24" y1="84" x2="24" y2="6" stroke="#ddd" strokeWidth="2"/><line x1="24" y1="6" x2="50" y2="6" stroke="#ddd" strokeWidth="2"/>{bodyParts.slice(0,wc)}</svg></div>
      <div style={{display:"flex",justifyContent:"center",gap:"4px",marginBottom:"14px",flexWrap:"wrap"}}>{wd.split("").map((c,i)=><div key={i} style={{width:"28px",height:"36px",borderBottom:`2.5px solid ${st==="l"&&!gu.has(c)?US.red:US.black}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",fontWeight:"700",color:st==="l"&&!gu.has(c)?US.red:US.black}}>{gu.has(c)||st==="l"?c:""}</div>)}</div>
      <div style={{textAlign:"center",marginBottom:"10px",fontSize:"10px",color:"#999"}}>Errori: <strong style={{color:wc>=5?US.red:"#333"}}>{wc}/{M}</strong></div>
      {st==="p"&&<div>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"2px",marginBottom:"2px"}}>{row.map(k=>{const u=gu.has(k),cr=wd.includes(k)&&u,wr2=!wd.includes(k)&&u;return<button key={k} onClick={()=>g(k)} disabled={u} style={{background:cr?US.green:wr2?US.red:u?"#ccc":"#e8e8e8",color:u?"#fff":"#333",border:"none",borderRadius:"3px",padding:"7px 4px",minWidth:"24px",fontSize:"10px",fontWeight:"600",cursor:u?"default":"pointer",fontFamily:"inherit",opacity:u?0.7:1}}>{k}</button>;})} </div>)}</div>}
      {(st==="w"||st==="l")&&<div style={{textAlign:"center",marginTop:"10px"}}><div style={{padding:"9px",borderRadius:"2px",background:st==="w"?US.greenL:US.redL,color:st==="w"?US.green:US.red,fontSize:"12px",marginBottom:"10px"}}>{st==="w"?`Bravo! Era ${pl.name} — ${wc} error${wc===1?"e":"i"}`:`Era ${pl.name}`}</div><button onClick={onHome} style={T.pb}>Home</button></div>}
    </div>
  </div>);
}
function Hangman({onHome,isDaily}){
  if(isDaily){const d=DB.length,s=todaySeed();return<HangmanGame day={d} seed={s} isToday archiveNav={null} onHome={onHome}/>;}
  return<ArchiveWrapper gameKey="hangman">{({day,seed,isToday,archiveNav})=><HangmanGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} onHome={onHome}/>}</ArchiveWrapper>;
}

// ── CHI VALE DI PIÙ ──────────────────────────────────────────────────────
function ValoreGame({day,seed,isToday,archiveNav,onHome}){
  const pairs=useMemo(()=>{const rng=seedRandom(seed+3);const sh=shuffle(DB,rng),p=[];for(let i=0;i<sh.length-1;i+=2)if(sh[i].value!==sh[i+1].value)p.push([sh[i],sh[i+1]]);return p;},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const RR=Math.min(6,pairs.length);
  const[rn,sRn]=useState(0);const[sc,sSc]=useState(0);const[ch,sCh]=useState(null);const[dn,sDn]=useState(false);const[str,sStr]=useState(0);const[best,sBest]=useState(0);
  useEffect(()=>{sRn(0);sSc(0);sCh(null);sDn(false);sStr(0);sBest(0);},[seed]);
  if(!pairs.length||dn)return(<div style={T.app}><Hdr title="Chi Vale di Più?" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}<span style={{fontSize:"18px"}}> / {RR}</span></div><div style={{fontSize:"12px",color:"#888",marginBottom:"3px"}}>risposte corrette</div><div style={{fontSize:"11px",color:"#aaa",marginBottom:"18px"}}>Serie migliore: {best}</div><button onClick={onHome} style={T.pb}>Home</button></div></div>);
  const[a,b]=pairs[rn],cor=a.value>b.value?a:b;
  function choose(p){if(ch)return;sCh(p);const ok=p.name===cor.name;if(ok){sSc(x=>x+1);const ns=str+1;sStr(ns);sBest(x=>Math.max(x,ns));}else sStr(0);setTimeout(()=>{sCh(null);const nr=rn+1;if(nr>=RR)sDn(true);else sRn(nr);},1500);}
  return(<div style={T.app}><Hdr title="Chi Vale di Più?" sub={`${label} · #${day} · ${rn+1}/${RR}`} onHome={onHome} archiveNav={archiveNav}/>
    <div style={{...T.body,maxWidth:"480px"}}>
      <div style={{height:"3px",background:"#e0e0e0",borderRadius:"2px",marginBottom:"16px",overflow:"hidden"}}><div style={{height:"100%",width:`${(rn/RR*100).toFixed(0)}%`,background:US.green,transition:"width 0.3s"}}/></div>
      <div style={{fontSize:"11px",color:"#aaa",textAlign:"center",marginBottom:"12px"}}>Chi ha il valore di mercato più alto?</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>{[a,b].map(p=>{let brd="1.5px solid #e0e0e0",bg="#fff";if(ch){if(p.name===cor.name){brd="2px solid "+US.green;bg=US.greenL;}else if(p.name===ch.name){brd="2px solid "+US.red;bg=US.redL;}}return(<button key={p.name} onClick={()=>choose(p)} style={{background:bg,border:brd,borderRadius:"6px",padding:"14px 10px",cursor:ch?"default":"pointer",textAlign:"center",transition:"all 0.2s",fontFamily:"inherit"}} onMouseEnter={e=>{if(!ch){e.currentTarget.style.borderColor=US.orange;e.currentTarget.style.background="#fffbea";}}} onMouseLeave={e=>{if(!ch){e.currentTarget.style.borderColor="#e0e0e0";e.currentTarget.style.background=bg;}}}><div style={{fontSize:"14px",fontWeight:"700",marginBottom:"3px"}}>{p.name}</div><div style={{fontSize:"10px",color:"#888",marginBottom:"1px"}}>{p.club}</div><div style={{fontSize:"10px",color:"#aaa",marginBottom:"7px"}}>{p.role}</div>{ch?<div style={{fontSize:"17px",fontWeight:"700",color:p.name===cor.name?US.green:US.red}}>€{p.value}M</div>:<div style={{fontSize:"20px",color:"#ddd"}}>?</div>}</button>);})}</div>
      {ch&&<div style={{textAlign:"center",marginTop:"10px",fontSize:"11px",color:ch.name===cor.name?US.green:US.red,fontStyle:"italic"}}>{ch.name===cor.name?"Corretto!":"Sbagliato"} — {cor.name} vale €{cor.value}M</div>}
    </div>
  </div>);
}
function ChiValeDiPiu({onHome,isDaily}){
  if(isDaily){const d=DB.length,s=todaySeed();return<ValoreGame day={d} seed={s} isToday archiveNav={null} onHome={onHome}/>;}
  return<ArchiveWrapper gameKey="valore2">{({day,seed,isToday,archiveNav})=><ValoreGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} onHome={onHome}/>}</ArchiveWrapper>;
}

// ── CARRIERA ─────────────────────────────────────────────────────────────
function CarreiraGame({day,seed,isToday,archiveNav,onHome}){
  const player=CAREERS[seed%CAREERS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const maxC=player.clues.length;
  const[rev,sRev]=useState(1);const[gu,sGu]=useState("");const[st,sSt]=useState("p");const[sc,sSc]=useState(0);const[fin,sFin]=useState(false);const[shownNotes,sShownNotes]=useState(new Set());
  useEffect(()=>{sRev(1);sGu("");sSt("p");sSc(0);sFin(false);sShownNotes(new Set());},[seed]);
  const pts=Math.max(1,maxC+1-rev);
  function sub(){
    const g=gu.trim().toLowerCase(),a=player.answer.toLowerCase();
    const ok=g===a||a.split(" ").some(p=>p.length>3&&g===p)||(g.length>4&&a.includes(g));
    if(ok){sSc(x=>x+pts);sSt("c");}
    else{if(rev<maxC){sRev(x=>x+1);sSt("w");setTimeout(()=>sSt("p"),900);}else sSt("r");}
    sGu("");
  }
  if(fin)return(<div style={T.app}><Hdr title="Indovina dalla Carriera" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}</div><div style={{fontSize:"12px",color:"#888",marginBottom:"18px"}}>punti totali</div><button onClick={onHome} style={T.pb}>Home</button></div></div>);
  return(<div style={T.app}><Hdr title="Indovina dalla Carriera" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>
    <div style={{...T.body,maxWidth:"520px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",color:"#888"}}>{st==="p"&&<>Vale <strong style={{color:US.black}}>{pts} punt{pts===1?"o":"i"}</strong></>}</div>
        <button onClick={()=>sRev(r=>Math.min(r+1,maxC))} disabled={rev>=maxC||st!=="p"} style={{background:"none",border:`1px solid ${rev<maxC&&st==="p"?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:rev<maxC&&st==="p"?US.yellow:"#bbb",cursor:rev<maxC&&st==="p"?"pointer":"default",fontFamily:"inherit"}}>💡 {rev}/{maxC} {rev<maxC&&st==="p"?"→ Prossimo indizio":"indizi"}</button>
      </div>
      {player.clues.slice(0,rev).map((c,i)=>{
        const noteVisible=shownNotes.has(i);
        return(<div key={i} style={{border:"1.5px solid #e0e0e0",borderLeftWidth:i===rev-1?"3px":"1.5px",borderLeftColor:i===rev-1?US.black:"#e0e0e0",borderRadius:"2px",padding:"9px 11px",marginBottom:"5px",background:i===rev-1?"#fafaf8":"#fff"}}>
          {i===rev-1&&rev>1&&<div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"2px",fontWeight:"700"}}>Nuovo indizio</div>}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}><span style={{fontWeight:"700",fontSize:"13px"}}>{c.club}</span><span style={{fontSize:"10px",color:"#aaa"}}>{c.period}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1px"}}>
            <div style={{display:"flex",gap:"10px"}}><span style={{fontSize:"10px",color:"#555"}}><strong>{c.apps}</strong> presenze</span><span style={{fontSize:"10px",color:"#555"}}><strong>{c.goals}</strong> gol</span></div>
            {!noteVisible&&<button onClick={()=>sShownNotes(s=>new Set([...s,i]))} style={{background:"none",border:"none",color:"#bbb",fontSize:"8px",cursor:"pointer",fontFamily:"inherit",padding:"0",textDecoration:"underline"}}>💡 nota</button>}
          </div>
          {noteVisible&&<div style={{fontSize:"9px",color:"#888",fontStyle:"italic",marginTop:"2px"}}>{c.note}</div>}
        </div>);
      })}
      <div style={{height:"1px",background:"#e8e8e8",margin:"10px 0"}}/>
      {st!=="c"&&st!=="r"&&<><span style={T.lb}>Chi è questo giocatore?</span><div style={{display:"flex",gap:"7px"}}><input style={{...T.ip,flex:1,border:`1.5px solid ${st==="w"?US.red:"#ddd"}`}} value={gu} onChange={e=>sGu(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gu.trim()&&sub()} placeholder="Scrivi il nome..." autoFocus/><button onClick={sub} disabled={!gu.trim()} style={{...T.pb,opacity:gu.trim()?1:0.4}}>Indovina</button></div>{st==="w"&&<div style={{fontSize:"10px",color:US.red,marginTop:"4px"}}>✗ Errato — {rev<maxC?"nuovo indizio!":"nessun indizio rimasto"}</div>}<div style={{textAlign:"right",marginTop:"5px"}}><button onClick={()=>sSt("r")} style={{background:"none",border:"none",color:"#bbb",fontSize:"9px",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Non lo so</button></div></>}
      {st==="c"&&<><div style={{padding:"8px",background:US.greenL,border:"1px solid #bbf7d0",borderRadius:"2px",color:US.green,fontSize:"12px",marginBottom:"9px"}}>✓ Corretto! Era <strong>{player.answer}</strong> — <strong>+{pts} punti</strong></div><div style={{textAlign:"right"}}><button onClick={()=>sFin(true)} style={T.pb}>Risultato →</button></div></>}
      {st==="r"&&<><div style={{padding:"8px",background:"#f8f7f4",border:"1px solid #e0e0e0",borderRadius:"2px",color:"#555",fontSize:"12px",marginBottom:"9px"}}>Era <strong>{player.answer}</strong></div><div style={{textAlign:"right"}}><button onClick={()=>sFin(true)} style={T.pb}>Risultato →</button></div></>}
    </div>
  </div>);
}
function Carriera({onHome,isDaily}){
  if(isDaily){const d=CAREERS.length,s=todaySeed();return<CarreiraGame day={d} seed={s} isToday archiveNav={null} onHome={onHome}/>;}
  return<ArchiveWrapper gameKey="carriera">{({day,seed,isToday,archiveNav})=><CarreiraGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} onHome={onHome}/>}</ArchiveWrapper>;
}

// ── ROSA QUIZ ─────────────────────────────────────────────────────────────
function TimerRing({seconds,total}){
  const r=32,circ=2*Math.PI*r;
  const color=seconds<=10?US.red:seconds<=20?US.yellow:US.green;
  return(<svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r={r} fill="none" stroke="#e0e0e0" strokeWidth="5"/><circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={circ*(1-seconds/total)} strokeLinecap="round" transform="rotate(-90 38 38)" style={{transition:"stroke-dashoffset 1s linear,stroke 0.3s"}}/><text x="38" y="43" textAnchor="middle" fontSize="17" fontWeight="700" fill={color} fontFamily="'Helvetica Neue',Arial,sans-serif">{seconds}</text></svg>);
}

function RosaQuizGame({day,seed,isToday,archiveNav,onHome}){
  const TOTAL=60;
  const squadra=ROSE_LIST[seed%ROSE_LIST.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const[input,setInput]=useState("");const[found,setFound]=useState([]);const[wrong,setWrong]=useState(null);const[seconds,setSeconds]=useState(TOTAL);const[lastFound,setLastFound]=useState(null);const[done,setDone]=useState(false);
  const inputRef=useRef(null);const timerRef=useRef(null);
  useEffect(()=>{setInput("");setFound([]);setWrong(null);setSeconds(TOTAL);setLastFound(null);setDone(false);},[seed]);
  useEffect(()=>{
    if(done)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(timerRef.current);setDone(true);return 0;}return s-1;}),1000);
    setTimeout(()=>inputRef.current?.focus(),100);
    return()=>clearInterval(timerRef.current);
  },[seed,done]);
  function submit(){
    const v=normLow(input);if(!v)return;
    const match=squadra.giocatori.find(p=>normLow(p)===v&&!found.includes(p));
    if(match){setFound(f=>[...f,match]);setLastFound(match);setWrong(null);setInput("");setTimeout(()=>setLastFound(null),1200);}
    else{setWrong(input);setInput("");setTimeout(()=>setWrong(null),800);}
    inputRef.current?.focus();
  }
  if(done){
    const missed=squadra.giocatori.filter(p=>!found.includes(p));
    const pct=Math.round(found.length/squadra.giocatori.length*100);
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title={`Rosa Quiz · ${squadra.nome}`} sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>
      <div style={T.body}>
        <div style={{textAlign:"center",marginBottom:"20px"}}><div style={{fontSize:"36px"}}>{emoji}</div><div style={{fontSize:"50px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"18px",color:US.muted}}>/{squadra.giocatori.length}</span></div><div style={{fontSize:"11px",color:US.muted,marginTop:"3px"}}>trovati ({pct}%)</div></div>
        {found.length>0&&<div style={{marginBottom:"14px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"6px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        {missed.length>0&&<div style={{marginBottom:"18px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"6px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{missed.map(p=><div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        <div style={{textAlign:"center"}}><button onClick={onHome} style={T.pb}>Home</button></div>
      </div>
    </div>);
  }
  return(<div style={T.app}><Hdr title={`Rosa Quiz · ${squadra.emoji} ${squadra.nome}`} sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>
    <div style={T.body}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
        <TimerRing seconds={seconds} total={TOTAL}/>
        <div style={{textAlign:"right"}}><div style={{fontSize:"36px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}</div><div style={{fontSize:"10px",color:US.muted}}>su {squadra.giocatori.length}</div></div>
      </div>
      <div style={{marginBottom:"12px"}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Scrivi un cognome..." style={{width:"100%",boxSizing:"border-box",border:`2px solid ${wrong?US.red:lastFound?US.green:US.border}`,borderRadius:"6px",padding:"11px 13px",fontSize:"14px",fontFamily:"inherit",outline:"none",color:US.black,background:wrong?US.redL:lastFound?US.greenL:"#fff",transition:"all 0.2s"}}/>
        {lastFound&&<div style={{fontSize:"11px",color:US.green,marginTop:"4px",fontWeight:"600"}}>✓ {lastFound} — +1 punto!</div>}
        {wrong&&<div style={{fontSize:"11px",color:US.red,marginTop:"4px"}}>✗ "{wrong}" — non trovato</div>}
      </div>
      {found.length>0&&<div><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"6px"}}>Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
    </div>
  </div>);
}
function RosaQuiz({onHome,isDaily}){
  if(isDaily){const d=ROSE_LIST.length,s=todaySeed();return<RosaQuizGame day={d} seed={s} isToday archiveNav={null} onHome={onHome}/>;}
  return<ArchiveWrapper gameKey="rosa">{({day,seed,isToday,archiveNav})=><RosaQuizGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} onHome={onHome}/>}</ArchiveWrapper>;
}

// ── HOME ──────────────────────────────────────────────────────────────────
const MODES=[
  {key:"calciodle", label:"Calciodle",             icon:"🟩", desc:"Indovina il giocatore"},
  {key:"wordle",    label:"Wordle Cognome",         icon:"🔤", desc:"Indovina il cognome lettera per lettera"},
  {key:"hangman",   label:"Impiccato",              icon:"🪢", desc:"Indovina il cognome"},
  {key:"valore2",   label:"Chi Vale di Più?",       icon:"⚖️", desc:"Confronta i valori di mercato"},
  {key:"carriera",  label:"Indovina la Carriera",   icon:"🔍", desc:"Indovi da club e statistiche"},
  {key:"rosa",      label:"Rosa Quiz",              icon:"👕", desc:"60 secondi per nominare la rosa"},
];

function Card({m,onDaily,onArchive}){
  const[hv,sHv]=useState(false);
  return(<div style={{background:"#fff",border:`1.5px solid ${hv?US.orange:US.border}`,borderRadius:"8px",padding:"11px",transition:"all 0.15s",display:"flex",flexDirection:"column",gap:"4px",boxShadow:hv?"0 2px 8px rgba(0,0,0,0.07)":"none"}} onMouseEnter={()=>sHv(true)} onMouseLeave={()=>sHv(false)}>
    <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{fontSize:"18px"}}>{m.icon}</span><span style={{fontSize:"12px",fontWeight:"700",color:US.black}}>{m.label}</span></div>
    <span style={{fontSize:"9px",color:US.muted,lineHeight:1.4}}>{m.desc}</span>
    <div style={{display:"flex",gap:"4px",marginTop:"3px"}}>
      <button onClick={()=>onDaily(m.key)} style={{flex:1,background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"6px 3px",fontSize:"8px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>🗓 Daily</button>
      <button onClick={()=>onArchive(m.key)} style={{flex:1,background:US.black,color:"#fff",border:"none",borderRadius:"4px",padding:"6px 3px",fontSize:"8px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>📂 Archivio</button>
    </div>
  </div>);
}

function Home({onSelect}){
  const today=new Date().toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
  const countdown=useCountdown();
  return(<div style={{...T.app,paddingBottom:"40px"}}>
    <div style={{background:US.black,color:"#fff",padding:"18px 18px 14px",borderBottom:`3px solid ${US.orange}`}}>
      <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"}}>Universo Sportivo</div>
      <div style={{fontSize:"21px",fontWeight:"700",letterSpacing:"-0.5px",marginBottom:"7px"}}>Quiz Calcio</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
        <div>
          <div style={{fontSize:"10px",color:"#666",textTransform:"capitalize"}}>{today}</div>

        </div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(255,255,255,0.07)",borderRadius:"6px",padding:"5px 10px"}}>
          <span style={{fontSize:"9px",color:"#555"}}>🔄 refresh in</span>
          <span style={{fontSize:"13px",fontWeight:"700",color:US.orange,fontVariantNumeric:"tabular-nums",letterSpacing:"0.5px"}}>{countdown}</span>
        </div>
      </div>
    </div>
    <div style={{padding:"14px 14px 40px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}><div style={{width:"3px",height:"13px",background:US.orange,borderRadius:"2px"}}/><span style={{fontSize:"9px",fontWeight:"700",letterSpacing:"1.5px",textTransform:"uppercase",color:US.muted}}>Modalità</span></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {MODES.map(m=><Card key={m.key} m={m} onDaily={k=>onSelect(k+"_daily")} onArchive={k=>onSelect(k+"_archive")}/>)}
      </div>
      <div style={{marginTop:"12px",padding:"9px 11px",background:"#fff",border:`1px solid ${US.border}`,borderRadius:"6px",fontSize:"9px",color:US.muted,lineHeight:1.6}}>🗓 <strong style={{color:US.black}}>Daily</strong> — sfida unica al giorno &nbsp;·&nbsp; 📂 <strong style={{color:US.black}}>Archivio</strong> — naviga le sfide passate con ◀ ▶</div>
    </div>
  </div>);
}

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function App(){
  useEffect(()=>{
    const s=document.createElement("style");
    s.innerHTML=`
      input,select,textarea{font-size:16px !important;}
      .flip-cell{perspective:300px;}
      .flip-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.45s ease;}
      .flip-inner.flipped{transform:rotateX(360deg);}
      .flip-front,.flip-back{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:3px;font-weight:700;}
      .flip-back{backface-visibility:hidden;}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);
  const[sc,sSc]=useState("home");
  const home=()=>sSc("home");
  const isDaily=sc.endsWith("_daily");
  const key=sc.replace("_daily","").replace("_archive","");
  if(sc==="home")return<Home onSelect={sSc}/>;
  if(key==="calciodle")return<Calciodle onHome={home} isDaily={isDaily}/>;
  if(key==="wordle")return<WordleCognome onHome={home} isDaily={isDaily}/>;
  if(key==="hangman")return<Hangman onHome={home} isDaily={isDaily}/>;
  if(key==="valore2")return<ChiValeDiPiu onHome={home} isDaily={isDaily}/>;
  if(key==="carriera")return<Carriera onHome={home} isDaily={isDaily}/>;
  if(key==="rosa")return<RosaQuiz onHome={home} isDaily={isDaily}/>;
  return<Home onSelect={sSc}/>;
}
