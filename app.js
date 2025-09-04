const $ = (q) => document.querySelector(q);
const results = $("#results");
const reading = $("#reading");
const spreadSel = $("#spread");
const drawBtn = $("#drawBtn");
const useReversals = $("#useReversals");
const copyBtn = $("#copyBtn");

let CARDS = [];

async function loadCards(){
  const res = await fetch('data/cards.json');
  CARDS = await res.json();
}
function randInt(n){ return Math.floor(Math.random()*n) }
function pickRandom(arr){ return arr[randInt(arr.length)] }

function drawOne(includeReversals=false){
  const c = pickRandom(CARDS);
  const reversed = includeReversals ? Math.random()<0.45 : false;
  return {...c, reversed};
}

function flipCard(img, frontSrc){
  const backSrc = 'assets/back.png';
  const showingBack = img.dataset.side === 'back';
  img.src = showingBack ? frontSrc : backSrc;
  img.dataset.side = showingBack ? 'front' : 'back';
}
function renderCard(c, label){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="imgwrap">${c.image ? `<img src="${c.image}" alt="${c.name}" data-side="front" onclick="flipCard(this, '${'${c.image}'}')">` : ''}</div>
    <h3>${label ? `<span style="color:#7c5cff">${label} • </span>` : ''}${c.name}${c.reversed ? ' (Reversed)' : ''}</h3>
    <p class="kw">${c.keywords.join(' • ')}</p>
    <p><strong>Meaning:</strong> ${c.reversed ? c.reversed : c.meaning}</p>
    <p><strong>Mantra:</strong> ${c.mantra}</p>
    <p><strong>Ritual:</strong> ${c.movement}</p>
  `;
  results.appendChild(el);
}

function integrateReading(cards, spread){
  const lines = [];
  if(spread==='one'){
    const c = cards[0];
    lines.push(`# ${c.name}${c.reversed?' (Reversed)':''}`);
    lines.push(c.reversed ? c.reversed : c.meaning);
    lines.push(`Mantra: ${c.mantra}`);
  } else if (spread==='two'){
    const [a,b] = cards;
    lines.push(`# Ally: ${a.name}${a.reversed?' (R)':''} | Challenge: ${b.name}${b.reversed?' (R)':''}`);
    lines.push(`• Ally Medicine → ${a.reversed ? a.reversed : a.meaning}`);
    lines.push(`• Challenge Medicine → ${b.reversed ? b.reversed : b.meaning}`);
    lines.push(`Bridge: Balance ${a.keywords[0]} with ${b.keywords[0]}; act when both signs align.`);
  } else {
    const [past, present, bridge] = cards;
    lines.push(`# Past • Present • Bridge`);
    lines.push(`Past: ${past.name}${past.reversed?' (R)':''} — ${past.reversed ? past.reversed : past.meaning}`);
    lines.push(`Present: ${present.name}${present.reversed?' (R)':''} — ${present.reversed ? present.reversed : present.meaning}`);
    lines.push(`Bridge: ${bridge.name}${bridge.reversed?' (R)':''} — ${bridge.reversed ? bridge.reversed : bridge.meaning}`);
  }
  return lines.join('\n');
}

async function doDraw(){
  results.innerHTML = '';
  reading.innerHTML = '';
  const includeReversals = useReversals.checked;
  const spread = spreadSel.value;

  let picks = [];
  if(spread==='one'){
    picks = [drawOne(includeReversals)];
  } else if (spread==='two'){
    while(picks.length<2){
      const c = drawOne(includeReversals);
      if(!picks.find(p=>p.id===c.id)) picks.push(c);
    }
  } else {
    while(picks.length<3){
      const c = drawOne(includeReversals);
      if(!picks.find(p=>p.id===c.id)) picks.push(c);
    }
  }

  const labels = spread==='one' ? ['Today'] :
                 spread==='two' ? ['Ally','Challenge'] :
                 ['Past','Present','Bridge'];

  picks.forEach((c, i)=> renderCard(c, labels[i]));

  const text = integrateReading(picks, spread);
  reading.innerHTML = `
    <h2>Reading</h2>
    <pre style="white-space:pre-wrap;background:#fff;border:1px solid #eee;padding:12px;border-radius:12px">${text}</pre>
  `;
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(()=>copyBtn.textContent="Copy Reading", 1200);
  }
}

drawBtn.addEventListener('click', doDraw);
loadCards();
