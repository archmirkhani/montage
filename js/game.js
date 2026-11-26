{
const $=s=>document.querySelector(s);
const W=1600,H=1000;
const LS={get(k,d){try{const v=localStorage.getItem('mtj1:'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('mtj1:'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* portraits: the user's own images */
const AV={
 polis:'<img class="pface" src="assets/images/polis.png" alt="">',
 sh1:'<img src="assets/images/sh1.jpg" alt="">',sh2:'<img src="assets/images/sh2.jpg" alt="">',
 sh3:'<img src="assets/images/sh3.jpg" alt="">',sh4:'<img src="assets/images/sh4.jpg" alt="">'};

/* voices are fixed: W1 talk_sound1 · W2 talk_sound2 · W3 talk_sound1 · W4 talk_sound2 */
const PEOPLE=[
 {name:'김하나',role:'편의점 야간 아르바이트생',c:'#a8205a',av:'sh1',voice:{ms:30,s:1}},
 {name:'박순자',role:'공원 벤치의 할머니',c:'#1d5f9e',av:'sh2',voice:{ms:46,s:2}},
 {name:'최만석',role:'개인택시 기사',c:'#7a5a00',av:'sh3',voice:{ms:38,s:1}},
 {name:'이도윤',role:'놀이터에서 만난 초등학생',c:'#5b3cb8',av:'sh4',voice:{ms:24,s:2}}];
const POLICE={name:'담당 경찰관',c:'#000080',av:'polis',voice:{ms:32,s:1}};
const CASES=[
 {id:'001',no:'2026-1124-001',title:'거꾸로 매달린 빨간 사람',suspect:'스파이더맨',img:'assets/images/spiderman.png',ar:'270/602',reveal:'web',sfx:'police',
  file:['신원 미상 인물 몽타주','편의점 · 공원 · 택시 · 놀이터','높은 곳에서 자주 목격됨'],
  winLine:'스파이더맨이 철창 신세가 되었어요.',escape:'범인은 거미줄을 타고 도망쳤습니다…',
  refs:(iw,ih)=>{const hy=Math.round(ih*440/602),hx=Math.round(iw*52/270),hw=Math.round(iw*183/270);return[[hx,hy,hw,ih-hy,false],[hx,hy,hw,ih-hy,true],[0,0,iw,ih,false],[0,0,iw,ih,true]]},
  keys:{strokes:'strokes',prog:'prog2',clues:'clues2',subs:'subs',revealed:'revealed',best:'best1'},
  brief:['큰일 났어! 방금 가면 쓴 사람이 건물 사이를 휙휙 날아다닌다는 신고가 들어왔어!','벽을 타고 올라갔다는 사람도 있고, 줄에 매달려 있었다는 사람도 있어, 목격자들 이야기를 들어보자.','증언만 듣고 얼굴을 그려줘, 몽타주가 80% 이상 닮으면 바로 검거할 수 있어!'],
  lines:[
  [{t:'새벽 두 시쯤, 온몸에 딱 붙는 새빨간 옷을 입은 사람이 들어왔어요.',clue:'온몸에 딱 붙는 빨간 옷'},
   {t:'얼굴까지 전부 빨간 천으로 덮여 있어서, 머리카락도 코도 입도 하나도 안 보였어요.',clue:'얼굴 전체를 덮은 빨간 마스크'},
   {t:'눈 자리에만 하얗고 커다란 눈이 있었는데, 테두리가 까맣고 두꺼웠어요.',clue:'검은 테두리의 크고 하얀 눈'}],
  [{t:'빨간 얼굴 위에 까만 실 같은 줄이 그물처럼 쫙 퍼져 있더라고.',clue:'얼굴 위 검은 그물 무늬'},
   {t:'줄이 얼굴 한가운데서 시작해서 동그랗게 돌고, 또 바깥으로 쭉쭉 뻗어 나갔어.',clue:'가운데서 퍼지는 줄무늬'},
   {t:'눈은 끝이 뾰족하게 올라간 물방울 모양이었어, 꼭 화난 것처럼.',clue:'끝이 올라간 물방울 모양 눈'}],
  [{t:'어깨랑 옆구리는 파란색이었고, 가슴 한가운데엔 까만 벌레 같은 무늬가 있었어요.',clue:'파란 어깨, 가슴의 검은 벌레 무늬'},
   {t:'제일 이상한 건, 그 사람이 머리를 아래로 하고 거꾸로 매달려 있었다는 거예요.',clue:'거꾸로 매달린 자세'},
   {t:'손목에서 하얀 줄 같은 게 쭉 나오더니, 그걸 타고 위로 휙 사라지던데요.',clue:'손목에서 나오는 하얀 줄'}],
  [{t:'얼굴이 동그랗고 전부 빨간데, 눈만 하얗고 엄청 컸어요!',clue:'동그랗고 빨간 얼굴'},
   {t:'미끄럼틀 위에 거꾸로 매달려서 저한테 손을 흔들었어요, 완전 멋졌어요!',clue:'높은 곳에 거꾸로 매달림'}]]},
 {id:'002',no:'2026-1126-002',title:'분홍빛 바닷가 손님',suspect:'뚱이 (패트릭)',img:'assets/images/patrick.png',ar:'344/436',reveal:'pop',sfx:'patrick',
  file:['신원 미상 인물 몽타주','해변 · 공원 · 택시 · 모래 놀이터','바위 밑에서 나왔다는 제보'],
  winLine:'뚱이가 철창 신세가 되었어요. 그런데 본인은 아직 무슨 일인지 모르는 것 같아요…',escape:'범인은 바위 밑으로 쏙 숨어버렸습니다…',
  refs:(iw,ih)=>[[0,0,iw,ih,false],[0,0,iw,Math.round(ih*.62),false]],
  keys:{strokes:'c2:strokes',prog:'c2:prog',clues:'c2:clues',subs:'c2:subs',revealed:'c2:revealed',best:'c2:best'},
  brief:['조금 전에 바닷가에서 온통 분홍빛인 수상한 사람이 어슬렁거린다는 신고가 들어왔어!','모래사장의 바위를 들추더니 그 밑으로 쏙 들어갔다는 제보도 있어, 목격자들 이야기를 들어보자.','얼굴만이 아니라 몸 전체를 그려줘, 80% 이상 닮으면 바로 검거야!'],
  lines:[
  [{t:'그 손님은 온몸이 분홍색이었어요, 웃옷도 안 입고 그냥 분홍색이요!',clue:'온몸이 분홍색'},
   {t:'머리 꼭대기가 뾰족하게 솟아 있고, 아래로 갈수록 통통하게 넓어졌어요.',clue:'뾰족한 머리, 아래로 넓은 몸'},
   {t:'팔다리가 짧고 끝이 뭉툭해서, 꼭 바닷가에서 주운 별 모양 같았어요.',clue:'짧고 뭉툭한 팔다리, 별 모양'}],
  [{t:'눈은 작고 동그란 흰자에 까만 점이 하나씩, 그 위에 짧고 까만 눈썹이 있었지.',clue:'작은 흰 눈과 짧은 눈썹'},
   {t:'코도 귀도 없고, 입은 그냥 짧게 일자로 쭉 그어져 있더라고.',clue:'코 없음, 일자 입'},
   {t:'표정이 어찌나 순진하던지, 머릿속에 아무 생각이 없어 보였어.',clue:'멍하고 순진한 표정'}],
  [{t:'반바지를 입었는데 연두색이었어요, 형광빛이 도는 연두색.',clue:'연두색 반바지'},
   {t:'그 반바지에 보라색 꽃 같은 얼룩무늬가 군데군데 있었고요.',clue:'반바지의 보라색 무늬'},
   {t:'몸이 동글동글해서, 택시 뒷자리에 앉으니까 자리가 꽉 찼어요.',clue:'동글동글한 몸집'}],
  [{t:'배가 볼록해서 반바지 위로 살짝 나와 있었어요, 엄청 귀여웠어요!',clue:'반바지 위로 나온 볼록한 배'},
   {t:'제가 안녕 하니까 한참 있다가, 안녕? 하고 해맑게 웃었어요!',clue:'느릿하고 해맑은 반응'}]]}];
/* every load is a fresh session: nothing of an unfinished game is restored */
try{Object.keys(localStorage).filter(k=>k.startsWith('mtj1:')&&k!=='mtj1:mute').forEach(k=>localStorage.removeItem(k))}catch(e){}
const rnd=n=>{try{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}catch(e){return Math.floor(Math.random()*n)}};
const newSession=()=>{let s='';for(let k=0;k<8;k++)s+='0123456789abcdefghjkmnpqrstvwxyz'[rnd(32)];return s};
let SESSION=newSession(),CI=rnd(CASES.length),CASE,INTRO,WIT,TOTAL;
function bindCase(){CASE=CASES[CI];INTRO={...POLICE,role:'사건 안내',lines:CASE.brief.map(t=>({t}))};WIT=PEOPLE.map((p,j)=>({...p,lines:CASE.lines[j]}));TOTAL=WIT.reduce((n,w)=>n+w.lines.filter(l=>l.clue).length,0)}
bindCase();
const K=k=>CASE.keys[k];


const COLORS=['#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080','#6b4a32','#a7835b','#0080ff','#004080','#8000ff','#804000',
 '#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#f6d7bd','#e9b38c','#80ffff','#8080ff','#ff0080','#ff8040'];
const SIZES=[3,8,14,24,40];
let VISITOR='GUEST';
const S={tool:'pen',color:'#000000',size:8,strokes:[],redo:[],prog:[0,0,0,0],clues:[],w:-1,i:0,guide:false,side:true,name:LS.get('name','')};

/* ---------- canvas ---------- */
const cv=$('#cv'),ctx=cv.getContext('2d'),paper=$('#paper'),wrap=$('#wrap'),cursor=$('#cursor');
const base=document.createElement('canvas');base.width=W;base.height=H;const bctx=base.getContext('2d');
function floodFill(c,x,y,hex){
 x=Math.max(0,Math.min(W-1,x|0));y=Math.max(0,Math.min(H-1,y|0));
 const img=c.getImageData(0,0,W,H),d=img.data,N=W*H;
 const fr=parseInt(hex.slice(1,3),16),fg=parseInt(hex.slice(3,5),16),fb=parseInt(hex.slice(5,7),16);
 const eff=new Uint8ClampedArray(N*3);
 for(let k=0,i=0;k<N;k++,i+=4){const a=d[i+3]/255;eff[k*3]=d[i]*a+255*(1-a);eff[k*3+1]=d[i+1]*a+255*(1-a);eff[k*3+2]=d[i+2]*a+255*(1-a)}
 const s=(y*W+x)*3,tr=eff[s],tg=eff[s+1],tb=eff[s+2];
 if(Math.abs(tr-fr)<6&&Math.abs(tg-fg)<6&&Math.abs(tb-fb)<6&&d[(y*W+x)*4+3]>250)return;
 const TOL=64,mask=new Uint8Array(N);
 const ok=k=>!mask[k]&&Math.abs(eff[k*3]-tr)<=TOL&&Math.abs(eff[k*3+1]-tg)<=TOL&&Math.abs(eff[k*3+2]-tb)<=TOL;
 const st=[y*W+x];
 while(st.length){let k=st.pop();if(!ok(k))continue;let yy=(k/W)|0,l=k,rr=k,row=yy*W;
  while(l>row&&ok(l-1))l--;while(rr<row+W-1&&ok(rr+1))rr++;
  for(let q=l;q<=rr;q++){mask[q]=1;if(yy>0&&ok(q-W))st.push(q-W);if(yy<H-1&&ok(q+W))st.push(q+W)}}
 for(let k=0,i=0;k<N;k++,i+=4){
  if(mask[k]){d[i]=fr;d[i+1]=fg;d[i+2]=fb;d[i+3]=255;continue}
  const a=d[i+3];if(a===255)continue;const xx=k%W;
  if((xx>0&&mask[k-1])||(xx<W-1&&mask[k+1])||(k>=W&&mask[k-W])||(k<N-W&&mask[k+W])){const al=a/255;d[i]=d[i]*al+fr*(1-al);d[i+1]=d[i+1]*al+fg*(1-al);d[i+2]=d[i+2]*al+fb*(1-al);d[i+3]=255}}
 c.putImageData(img,0,0);
}
function paint(c,s){
 if(s.tool==='clear'){c.clearRect(0,0,W,H);return}
 if(s.tool==='fill'){floodFill(c,s.x,s.y,s.color);return}
 const p=s.pts;c.save();c.globalCompositeOperation=s.tool==='eraser'?'destination-out':'source-over';
 c.strokeStyle=c.fillStyle=s.color;c.lineWidth=s.size;c.lineCap='round';c.lineJoin='round';
 if(p.length<3){c.beginPath();c.arc(p[0][0],p[0][1],s.size/2,0,Math.PI*2);c.fill();if(p.length===2){c.beginPath();c.moveTo(p[0][0],p[0][1]);c.lineTo(p[1][0],p[1][1]);c.stroke()}}
 else{c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length-1;i++){c.quadraticCurveTo(p[i][0],p[i][1],(p[i][0]+p[i+1][0])/2,(p[i][1]+p[i+1][1])/2)}const l=p[p.length-1];c.lineTo(l[0],l[1]);c.stroke()}
 c.restore()}
function show(cur){ctx.clearRect(0,0,W,H);ctx.drawImage(base,0,0);if(cur)paint(ctx,cur)}
function rebuild(){bctx.clearRect(0,0,W,H);for(const s of S.strokes)paint(bctx,s);show()}
const hasInk=()=>{for(let k=S.strokes.length-1;k>=0;k--){if(S.strokes[k].tool==='clear')return false;if(S.strokes[k].tool==='pen'||S.strokes[k].tool==='fill')return true}return false};
const persist=()=>{}; /* unfinished drawings are never stored */
function fit(){const r={width:wrap.clientWidth,height:wrap.clientHeight};if(!r.width)return;let w=r.width,h=w/1.6;if(h>r.height){h=r.height;w=h*1.6}paper.style.width=Math.floor(w)+'px';paper.style.height=Math.floor(h)+'px'}
const fitObs=new ResizeObserver(fit);fitObs.observe(wrap);

let cur=null;
const pos=e=>{const r=cv.getBoundingClientRect();return[Math.round((e.clientX-r.left)*W/r.width*10)/10,Math.round((e.clientY-r.top)*H/r.height*10)/10]};
function moveCursor(e){const r=paper.getBoundingClientRect();const d=Math.max(4,S.size*r.width/W);cursor.style.cssText=`display:block;left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;width:${d}px;height:${d}px`}
cv.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;closeMenus();
 if(S.tool==='fill'){const p=pos(e);const s={tool:'fill',x:Math.round(p[0]),y:Math.round(p[1]),color:S.color};S.strokes.push(s);S.redo=[];paint(bctx,s);show();persist();ui();return}
cv.setPointerCapture(e.pointerId);cur={tool:S.tool,color:S.color,size:S.size,pts:[pos(e)]};show(cur);$('#hint').classList.add('off')});
cv.addEventListener('pointermove',e=>{if(e.pointerType!=='touch'&&S.tool!=='fill')moveCursor(e);const p0=pos(e);$('#coord').textContent=Math.max(0,Math.round(p0[0]/2))+', '+Math.max(0,Math.round(p0[1]/2));if(!cur)return;const evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];for(const ev of (evs.length?evs:[e])){const p=pos(ev),l=cur.pts[cur.pts.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])>1.2)cur.pts.push(p)}show(cur)});
function endStroke(){if(!cur)return;S.strokes.push(cur);S.redo=[];paint(bctx,cur);cur=null;show();persist();ui()}
cv.addEventListener('pointerup',endStroke);cv.addEventListener('pointercancel',endStroke);
cv.addEventListener('pointerleave',()=>{if(!cur){cursor.style.display='none';$('#coord').textContent=''}});

function undo(){if(!S.strokes.length)return;S.redo.push(S.strokes.pop());rebuild();persist();ui()}
function redo(){if(!S.redo.length)return;S.strokes.push(S.redo.pop());rebuild();persist();ui()}
function setTool(t){S.tool=t;cursor.classList.toggle('eraser',t==='eraser');cv.classList.toggle('fill',t==='fill');if(t==='fill')cursor.style.display='none';ui()}
function setSize(v){S.size=Math.max(2,Math.min(80,Math.round(v)));$('#sz').value=S.size;ui()}
function setColor(c){S.color=c;if(S.tool==='eraser')setTool('pen');else ui()}

$('#sw').innerHTML=COLORS.map(c=>`<button class="swb" data-c="${c}" style="background:${c}" aria-label="색상 ${c}"></button>`).join('');
$('#sw').addEventListener('click',e=>{const b=e.target.closest('.swb');if(b)setColor(b.dataset.c)});

$('#szPresets').innerHTML=SIZES.map(s=>`<button class="szb" data-s="${s}" aria-label="굵기 ${s}px"><i style="height:${Math.max(1,Math.round(s/5))}px"></i></button>`).join('');
$('#szPresets').addEventListener('click',e=>{const b=e.target.closest('.szb');if(b)setSize(+b.dataset.s)});
$('#tPen').onclick=()=>setTool('pen');$('#tEra').onclick=()=>setTool('eraser');$('#tFill').onclick=()=>setTool('fill');
{const bi=new Image();bi.onload=()=>{$('#tFill').innerHTML='<img src="assets/images/bucket.png" alt="">'};bi.src='assets/images/bucket.png'}
$('#sz').oninput=e=>setSize(+e.target.value);
$('#tUndo').onclick=undo;$('#tRedo').onclick=redo;
const toggleGuide=()=>{S.guide=!S.guide;ui()};$('#tGuide').onclick=toggleGuide;

function ui(){
 $('#tPen').classList.toggle('on',S.tool==='pen');$('#tEra').classList.toggle('on',S.tool==='eraser');$('#tFill').classList.toggle('on',S.tool==='fill');
 $('#toolName').textContent={pen:'연필',eraser:'지우개',fill:'페인트 통'}[S.tool];
 $('#tUndo').disabled=!S.strokes.length;$('#tRedo').disabled=!S.redo.length;
 $('#tGuide').classList.toggle('on',S.guide);$('#guide').classList.toggle('on',S.guide);$('#mGuide').classList.toggle('on',S.guide);
 $('#szVal').textContent=S.size+'px';
 document.querySelectorAll('.szb').forEach(b=>b.classList.toggle('on',+b.dataset.s===S.size));
 $('#fg').style.background=S.color;
 document.querySelectorAll('.swb').forEach(b=>b.classList.toggle('on',b.dataset.c===S.color));
 $('#hint').classList.toggle('off',hasInk());
 $('#sig').textContent='수사관: '+VISITOR;
 $('#body').classList.toggle('noside',!S.side);$('#mSide').classList.toggle('on',S.side);
}

/* status-bar help text */
const HELP_DEFAULT=$('#help').textContent;
document.addEventListener('mouseover',e=>{const t=e.target.closest('[data-help]');$('#help').textContent=t?t.dataset.help:HELP_DEFAULT});

/* export */
function exportCanvas(){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#ffffff';x.fillRect(0,0,W,H);x.drawImage(base,0,0);x.fillStyle='rgba(0,0,0,.4)';x.font='26px "Special Elite", monospace';x.fillText('CASE '+CASE.id+' · MONTAGE',36,H-36);x.font='26px Gulim, "Nanum Gothic", sans-serif';x.textAlign='right';x.fillText(VISITOR,W-36,H-36);return c}
function thumb(c){const t=document.createElement('canvas');t.width=480;t.height=300;t.getContext('2d').drawImage(c,0,0,480,300);return t.toDataURL('image/jpeg',.86)}

/* ---------- dialogue sound: slices of the original files, original speed ---------- */
const SND={1:{src:'assets/audio/talk_sound1.mp3',a:.16,b:7.55},2:{src:'assets/audio/talk_sound2.mp3',a:.21,b:6.33}};
let AC=null,muted=LS.get('mute',false);
const raw={},buf={},gpos={},state={};let curSrc=null;
for(const k of [1,2])raw[k]=fetch(SND[k].src).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).catch(()=>null);
function unlock(){try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;AC=new C()}if(AC.state==='suspended')AC.resume();decode(1);decode(2)}catch(e){}}
async function decode(k){
 if(buf[k]||!AC||state[k])return;state[k]='decoding';
 const ab=await raw[k];if(!ab){state[k]='error';return}
 try{buf[k]=await new Promise((ok,no)=>AC.decodeAudioData(ab.slice(0),ok,no))}catch(e){state[k]='error'}
}
document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true);
function stopGrain(){
 if(!curSrc)return;const c=curSrc;curSrc=null;
 try{const t=AC.currentTime;c.g.gain.cancelScheduledValues(t);c.g.gain.setValueAtTime(c.g.gain.value,t);c.g.gain.linearRampToValueAtTime(0,t+.004);c.s.stop(t+.005)}catch(e){}
}
function grain(v){
 if(muted||!AC||AC.state!=='running')return;
 const k=v.s,b=buf[k];if(!b){decode(k);return}
 stopGrain();
 const s=SND[k],len=Math.min(.17,v.ms*2.6/1000+.03);
 let off=gpos[k]??s.a;if(off+len>s.b)off=s.a;gpos[k]=off+len*(1+Math.random()*.7);
 const src=AC.createBufferSource(),g=AC.createGain(),t=AC.currentTime;
 src.buffer=b;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1,t+.006);g.gain.setValueAtTime(1,t+len-.012);g.gain.linearRampToValueAtTime(0,t+len);
 src.connect(g).connect(AC.destination);src.start(t,off,len);
 const me={s:src,g};curSrc=me;src.onended=()=>{if(curSrc===me)curSrc=null};
}
const spk=m=>'<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M1 6h3l4-3v10l-4-3H1z" fill="#ffd34d" stroke="#000"/>'+(m?'<path d="M10 6l5 5M15 6l-5 5" stroke="#c00000" stroke-width="1.6"/></svg>':'<path d="M10 5.5q2 2.5 0 5M12 3.5q4 4.5 0 9" fill="none" stroke="#000"/></svg>');
function sndUI(){$('#snd').innerHTML=spk(muted);$('#traySnd').innerHTML=spk(muted);$('#snd').classList.toggle('on',muted);$('#mMute').classList.toggle('on',!muted);$('#snd').setAttribute('aria-label',muted?'소리 켜기':'소리 끄기')}
function toggleMute(){muted=!muted;LS.set('mute',muted);if(muted){stopGrain();stopSfx('siren');stopSfx('police');stopSfx('patrick')}sndUI();toast(muted?'대사 효과음을 껐습니다.':'대사 효과음을 켰습니다.')}
$('#snd').onclick=toggleMute;$('#traySnd').onclick=toggleMute;sndUI();

/* one-shot sounds (user files) */
const SFX={siren:new Audio('assets/audio/police-siren.mp3'),police:new Audio('assets/audio/this-is-the-police.mp3'),patrick:new Audio('assets/audio/patrick-sound.mp3')};
SFX.siren.volume=.55;SFX.police.volume=.9;SFX.patrick.volume=.95;
let sirenPending=false;
function playSfx(k){const a=SFX[k];if(muted)return Promise.resolve(false);try{a.currentTime=0}catch(e){}return a.play().then(()=>true).catch(()=>false)}
function stopSfx(k,fade){const a=SFX[k];if(a.paused)return;if(!fade){a.pause();return}const v0=a.volume;let n=0;const t=setInterval(()=>{n++;a.volume=Math.max(0,v0*(1-n/8));if(n>=8){clearInterval(t);a.pause();a.volume=v0}},40)}

/* typewriter shared by intro + witnesses */
function typeLine(el,text,v,onDone){
 let k=0,n=0,gap=2,timer=null,live=true;el.textContent='';el.classList.add('typing');stopGrain();
 const finish=()=>{if(!live)return;live=false;clearTimeout(timer);stopGrain();el.textContent=text;el.classList.remove('typing');onDone&&onDone()};
 const step=()=>{k++;el.textContent=text.slice(0,k);const ch=text[k-1];
  if(k>=text.length)return finish();
  let d=v.ms;if(ch===',')d=v.ms*5;else if(/[.!?…]/.test(ch))d=v.ms*8;else if(ch!==' '){if(n++%gap===0){grain(v);n=1;gap=2+(Math.random()<.5?1:0)}}
  timer=setTimeout(step,d)};
 timer=setTimeout(step,140);
 return{finish,cancel(){live=false;clearTimeout(timer);stopGrain()},get live(){return live}};
}

/* ---------- witness dialogue ---------- */
let line=null,typing=false;
const P=()=>S.w<0?INTRO:WIT[S.w];
function say(w,i){
 if(line)line.cancel();
 S.w=w;S.i=i;const p=P();
 $('#witness').style.setProperty('--c',p.c);$('#wPic').innerHTML=AV[p.av];$('#wName').textContent=p.name;$('#wRole').textContent=p.role;
 typing=true;line=typeLine($('#wLine'),p.lines[i].t,p.voice,done);
 tabs();dots();nextLabel();
}
function done(){
 typing=false;
 if(S.w>=0){const p=WIT[S.w];S.prog[S.w]=Math.max(S.prog[S.w],S.i+1);const cl=p.lines[S.i].clue;
  if(cl&&!S.clues.some(c=>c.t===cl)){S.clues.push({t:cl,w:S.w});notes(true);toast('단서를 사건 파일에 고정했습니다 — '+cl)}
}
 tabs();dots();stats();nextLabel();
 if(!nextTarget())toast('증언 완료 — 이제 몽타주를 완성해 제출하세요.','증언 완료');
}
const nextOpen=()=>WIT.findIndex((x,j)=>S.prog[j]<x.lines.length);
function nextTarget(){
 const p=P();if(S.i<p.lines.length-1)return[S.w,S.i+1];
 if(S.w<WIT.length-1){const j=S.w+1,n=WIT[j].lines.length;return[j,S.prog[j]>=n?0:S.prog[j]]}
 const o=nextOpen();return o>=0?[o,S.prog[o]]:null;
}
function next(){
 if(typing&&line)return line.finish();const t=nextTarget();
 if(t)say(t[0],t[1]);else toast('모든 증언을 들었습니다. 몽타주를 완성해 제출하세요.');
}
function nextLabel(){const b=$('#nextBtn'),t=nextTarget(),fin=!t&&!typing;
 b.textContent=fin?'증언 완료 ✓':!t?'다음 ▸':t[0]!==S.w?(S.w<0?'첫 증인 부르기 ▸':'다음 증인 ▸'):'다음 ▸';
 b.classList.toggle('complete',fin);b.disabled=fin}
function tabs(){$('#wtabs').innerHTML=WIT.map((x,j)=>{const ok=S.prog[j]>=x.lines.length;return`<button class="wtab${j===S.w?' on':''}" role="tab" aria-selected="${j===S.w}" data-j="${j}" style="--c:${x.c}" data-help="${esc(x.name)}의 증언 듣기">${AV[x.av].replace('alt=""','alt="'+esc(x.name)+'"')}<span>증인 ${j+1} · ${esc(x.name)}</span>${ok?'<b class="ck">✓</b>':''}</button>`}).join('')}
function dots(){const p=P();$('#wDots').innerHTML=p.lines.map((_,k)=>{const heard=S.w<0?k<=S.i:k<S.prog[S.w];const can=S.w<0?k<=S.i:k<=S.prog[S.w];return`<button class="dot${heard?' heard':''}${k===S.i?' cur':''}" data-k="${k}" ${can?'':'disabled'} aria-label="${k+1}번째 진술"></button>`}).join('')}
$('#wtabs').addEventListener('click',e=>{const b=e.target.closest('.wtab');if(!b)return;const j=+b.dataset.j,n=WIT[j].lines.length;say(j,S.prog[j]>=n?0:S.prog[j])});
$('#wDots').addEventListener('click',e=>{const b=e.target.closest('.dot');if(b&&!b.disabled)say(S.w,+b.dataset.k)});
$('#wLine').onclick=()=>{if(typing&&line)line.finish()};
$('#nextBtn').onclick=next;

function notes(anim){
 $('#notes').innerHTML=S.clues.length?S.clues.map((c,k)=>`<div class="note pin w${c.w}${anim&&k===S.clues.length-1?' new':''}" style="--r:${(k*37%9)-4}deg">${esc(c.t)}<small>${esc(WIT[c.w].name)}의 증언</small></div>`).join(''):'<p class="notes-empty">증언을 들으면<br>단서가 여기에 고정됩니다</p>';
 $('#clueN').textContent=S.clues.length+' / '+TOTAL;
}
$('#photos').innerHTML=WIT.map((x,j)=>`<figure class="polaroid pin" style="--r:${[3,-2,2,-3][j]}deg">${AV[x.av].replace('alt=""','alt="'+esc(x.name)+'"')}<figcaption>${esc(x.name)}</figcaption></figure>`).join('');
function stats(){$('#sW').textContent='증언 '+WIT.filter((x,j)=>S.prog[j]>=x.lines.length).length+' / 4';$('#sC').textContent='단서 '+S.clues.length+' / '+TOTAL}
let t0=0;setInterval(()=>{if(!t0)return;const s=Math.floor((Date.now()-t0)/1000);$('#sT').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},1000);

/* ---------- dialogs ---------- */
const M=$('#modal'),SH=$('#sheet');
function modal(html,sm){
 const m=html.match(/<h2>(.*?)<\/h2>/);const title=m?m[1]:'몽타주실';
 SH.className='sheet win'+(sm?' sm':'');
 SH.innerHTML=`<div class="tbar"><span class="tt">${title}</span><button class="tbtn x" data-close aria-label="닫기"><svg viewBox="0 0 9 9"><path d="M1 1l7 7M8 1L1 8" stroke="#000" stroke-width="1.6"/></svg></button></div><div class="sbody">${html.replace(/<h2>.*?<\/h2>/,'')}</div>`;
 M.classList.add('open');closeMenus();
}
function close(){galleryStop();M.classList.remove('open')}
M.addEventListener('click',e=>{if(e.target===M||e.target.closest('[data-close]'))close()});
let tt;function toast(m,title){const t=$('#toast');t.innerHTML='<b>'+esc(title||'몽타주실')+'</b>'+esc(m);t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2800)}
const ICON_INFO='<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fff" stroke="#000080" stroke-width="2"/><rect x="14.5" y="13" width="3" height="11" fill="#000080"/><rect x="14.5" y="8" width="3" height="3" fill="#000080"/></svg>';
const ICON_WARN='<svg viewBox="0 0 32 32"><path d="M16 2l15 27H1z" fill="#ffd400" stroke="#000" stroke-width="1.5"/><rect x="14.5" y="10" width="3" height="11" fill="#000"/><rect x="14.5" y="23" width="3" height="3" fill="#000"/></svg>';

function clearAsk(){if(!hasInk())return toast('이미 깨끗한 용지입니다.');modal(`<h2>그림 지우기</h2><div class="check">${ICON_WARN}<span>용지를 모두 비울까요?<br>실행 취소(Ctrl+Z)로 되돌릴 수 있습니다.</span></div><div class="row"><button class="btn def" id="okClear">예(Y)</button><button class="btn" data-close>아니요(N)</button></div>`,true);$('#okClear').onclick=()=>{S.strokes.push({tool:'clear'});S.redo=[];rebuild();persist();ui();close();toast('용지를 비웠습니다. Ctrl+Z로 되돌릴 수 있어요.')};$('#okClear').focus()}
$('#tClear').onclick=clearAsk;

function saveAsk(){if(!hasInk())return toast('먼저 몽타주를 그려주세요.');const url=exportCanvas().toDataURL('image/png');
 modal(`<h2>다른 이름으로 저장</h2><p class="lead">몽타주를 PNG 파일로 내려받습니다. 버튼이 동작하지 않으면 이미지를 우클릭해 저장하세요.</p><div class="preview" style="margin-bottom:14px"><img src="${url}" alt="내 몽타주"></div><div class="row"><button class="btn def" id="dlBtn">저장(S)</button><button class="btn" data-close>취소</button></div>`);
 $('#dlBtn').onclick=async()=>{const blob=await new Promise(r=>exportCanvas().toBlob(r,'image/png'));const name='montage-case001.png';
  let dl=null;try{dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null}catch(e){}
  if(dl){try{await dl.save({filename:name,data:blob});toast('몽타주를 저장했습니다.');close()}catch(err){toast(err&&err.code==='declined'?'저장을 취소했습니다.':'여기서는 저장할 수 없어요. 이미지를 우클릭해 저장하세요.')}return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove()}}
$('#tSave').onclick=saveAsk;

/* ---------- similarity: a playful client-side comparison ---------- */
const REFC={};
function refFor(c){if(!REFC[c.id]){const img=new Image();const ready=new Promise(ok=>{img.onload=ok;img.onerror=ok});img.src=c.img;REFC[c.id]={img,ready,refs:null}}return REFC[c.id]}
const G=24,C=8;
function feat(src,sx,sy,sw,sh,flip){
 const sc=Math.min(1,320/Math.max(sw,sh)),w=Math.max(1,Math.round(sw*sc)),h=Math.max(1,Math.round(sh*sc));
 const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});
 x.fillStyle='#fff';x.fillRect(0,0,w,h);if(flip){x.translate(0,h);x.scale(1,-1)}x.drawImage(src,sx,sy,sw,sh,0,0,w,h);
 const d=x.getImageData(0,0,w,h).data;let x0=w,y0=h,x1=-1,y1=-1;const cls=new Int8Array(w*h).fill(-1),hist=[0,0,0,0,0];let n=0;
 for(let k=0,i=0;k<w*h;k++,i+=4){const R=d[i],Gc=d[i+1],B=d[i+2];if(765-R-Gc-B<90)continue;const xx=k%w,yy=(k/w)|0;n++;
  if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(yy<y0)y0=yy;if(yy>y1)y1=yy;
  const mx=Math.max(R,Gc,B),mn=Math.min(R,Gc,B),t=mx<80?0:(R>140&&R-Gc>60&&R-B>50)?1:(B>110&&B-R>40)?2:(mx-mn<40)?3:4;cls[k]=t;hist[t]++}
 if(n<30)return null;
 const bw=x1-x0+1,bh=y1-y0+1,s=Math.max(bw,bh),ox=(s-bw)/2,oy=(s-bh)/2;
 const grid=(g,test)=>{const v=new Float32Array(g*g),cn=new Float32Array(g*g);
  for(let yy=y0;yy<=y1;yy++)for(let xx=x0;xx<=x1;xx++){const gx=Math.min(g-1,((xx-x0+ox)/s*g)|0),gy=Math.min(g-1,((yy-y0+oy)/s*g)|0),q=gy*g+gx;cn[q]++;if(test(cls[yy*w+xx]))v[q]++}
  for(let q=0;q<g*g;q++)v[q]=cn[q]?v[q]/cn[q]:0;return v};
 return{ink:grid(G,t=>t>=0),red:grid(C,t=>t===1),blk:grid(C,t=>t===0),hist:hist.map(v=>v/n),asp:bw/bh}}
const dice=(a,b)=>{let mn=0,s=0;for(let q=0;q<a.length;q++){mn+=Math.min(a[q],b[q]);s+=a[q]+b[q]}return s?2*mn/s:0};
function sim(a,b){
 let col=0;for(let i=0;i<5;i++)col+=Math.min(a.hist[i],b.hist[i]);
 const asp=Math.max(0,1-Math.abs(Math.log(a.asp/b.asp)));
 return .2*col+.25*dice(a.ink,b.ink)+.2*dice(a.red,b.red)+.25*dice(a.blk,b.blk)+.1*asp}
async function similarity(){
 const E=refFor(CASE);await E.ready;
 if(!E.refs){const iw=E.img.naturalWidth,ih=E.img.naturalHeight;E.refs=iw?CASE.refs(iw,ih).map(a=>feat(E.img,...a)).filter(Boolean):[]}
 const mine=feat(base,0,0,W,H,false);if(!mine||!E.refs.length)return 0;
 const raw=Math.max(...E.refs.map(rf=>sim(mine,rf)));
 window.__lastRaw=raw;return Math.max(1,Math.min(99,Math.round(100*Math.max(0,Math.min(1,(raw-.2)/.68)))));
}
let rTimers=[];const rLater=(f,ms)=>rTimers.push(setTimeout(f,ms));
function closeResult(){rTimers.forEach(clearTimeout);rTimers=[];stopSfx('police',true);stopSfx('patrick',true);$('#result').hidden=true}
function runResult(score,url){
 const R=$('#result');rTimers.forEach(clearTimeout);rTimers=[];stopGrain();if(line&&typing)line.finish();
 R.hidden=false;R.className='scanning '+CASE.reveal;$('#spImg').src=CASE.img;$('#spImg').alt='범인: '+CASE.suspect;$('#spWrap').style.aspectRatio=CASE.ar;$('#rSus').textContent=CASE.suspect+'!';$('#rMont').src=url;$('#rPct').textContent='0%';$('#rBar').style.width='0';$('#rName').classList.remove('on');
 $('#rState').textContent='범인 사진과 대조하는 중…';const V=$('#verdict');V.className='verdict win';V.innerHTML='';
 const t0r=performance.now(),dur=2200;
 const tick=now=>{const t=Math.min(1,(now-t0r)/dur),e=1-Math.pow(1-t,3),v=Math.round(score*e);$('#rPct').textContent=v+'%';$('#rBar').style.width='calc('+v+'% - 6px)';if(t<1&&!R.hidden)requestAnimationFrame(tick)};
 requestAnimationFrame(tick);
 rLater(()=>{R.classList.remove('scanning');R.classList.add('drop');$('#rState').textContent='유사도 '+score+'% 일치'},dur+150);
 rLater(()=>$('#rName').classList.add('on'),dur+1300);
 rLater(()=>{
  const win=score>=80;
  const nextBtn=`<button class="btn${win?' def':''}" data-r="newgame">새 게임 ▶</button>`;
  const head=`<div class="tbar"><span class="tt">${win?'검거 결과':'오류'}</span></div><div class="rb">`;
  if(win){R.classList.add('success');playSfx(CASE.sfx);
   V.innerHTML=head+`<div class="v-big">검거 성공!</div><p class="v-msg"><b>범인을 잡았습니다!</b><br>당신의 몽타주가 범인과 <b>${score}%</b> 일치했습니다. ${esc(CASE.winLine)}</p><div class="v-img"><img src="assets/images/suc.png" alt="경찰이 범인을 체포하는 장면"></div><div class="row"><button class="btn" data-r="again">다시 그리기</button><button class="btn" data-r="gallery">공동 갤러리</button>${nextBtn}</div></div>`}
  else{R.classList.add('fail','flash');rLater(()=>R.classList.add('escape'),500);
   V.innerHTML=head+`<div class="v-tip"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#e00000" stroke="#000"/><path d="M10 10l12 12M22 10L10 22" stroke="#fff" stroke-width="3.5"/></svg><div><div class="v-big">실패</div></div></div><p class="v-msg"><b>아쉽게도 당신의 몽타주로는 범인을 잡지 못했습니다.</b><br>유사도 <b>${score}%</b> · 검거하려면 80% 이상이 필요해요. ${esc(CASE.escape)}</p><div class="v-tip">${ICON_INFO}<span>증언을 다시 듣고, 넓은 부분은 페인트 통으로 칠해 보세요. 그림은 그대로 남아 있어요.</span></div><div class="row"><button class="btn def" data-r="again">다시 도전하기</button><button class="btn" data-r="gallery">공동 갤러리</button>${nextBtn}</div></div>`}
  V.classList.add('on');(V.querySelector('.btn.def')||V.querySelector('[data-r]')).focus();
 },dur+2300);
}
$('#result').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;closeResult();const a=b.dataset.r;if(a==='gallery')openGallery();else if(a==='newgame')newGame()});

/* ---------- shared gallery ----------
   Backend 1: Claude artifact storage (only when this page runs inside claude.ai).
   Backend 2: Supabase (GitHub Pages or any other host) — set js/config.js.
   With neither, the game still works and the gallery says it is not configured. */
const CFG=window.MONTAGE_CONFIG||{};
const fnv=s=>{let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0};
const code4=s=>fnv(String(s)).toString(36).toUpperCase().padStart(4,'0').slice(-4);
let BKP=null;
function backend(){if(!BKP)BKP=(async()=>{
 try{if(window.claude&&window.claude.use){const db=await window.claude.use('db');if(db)return claudeBackend(db)}}catch(e){}
 if(CFG.supabaseUrl&&CFG.supabaseAnonKey)return supaBackend(String(CFG.supabaseUrl).replace(/\/+$/,''),String(CFG.supabaseAnonKey));
 return null})();return BKP}
function claudeBackend(db){return{name:'claude',
 async save(id,row,full){const w=async()=>{await db.doc('galleryFull/'+id).set({img:full,t:row.t});await db.doc('gallery/'+id).set({...row,v:1})};
  try{await w()}catch(e){if(e&&e.code==='unavailable'){await new Promise(ok=>setTimeout(ok,600+rnd(600)));await w()}else throw e}},
 list(o,next,err){let q=db.collection('gallery');
  if(o.f==='c001')q=q.where('case','==','001');else if(o.f==='c002')q=q.where('case','==','002');else if(o.f==='ok')q=q.where('success','==',true);else if(o.f==='fail')q=q.where('success','==',false);
  q=o.sort==='new'?q.orderBy('t','desc'):q.orderBy('score',o.sort==='hi'?'desc':'asc');q=q.limit(o.limit);
  return q.onSnapshot(s=>next(s.docs.map(d=>({id:d.id,...(d.data()||{})})),!s.metadata.fromCache),e=>err((e&&e.code)||'error'))},
 async full(id){const f=await db.doc('galleryFull/'+id).get();return f.exists?f.data().img:null},
 errMsg(e){const c=e&&e.code;return c==='invalid_argument'?'이 계정은 보기 전용 권한이라 갤러리에 저장할 수 없습니다. (공유 설정에서 Contributor 이상 필요)':c==='quota_exceeded'?'갤러리 저장 공간이 가득 차 저장하지 못했습니다.':c==='revoked'?'접근 권한이 바뀌어 저장하지 못했습니다.':'저장하지 못했습니다 ('+(c||'unknown')+'). 잠시 후 다시 제출해 주세요.'}}}
function supaBackend(url,key){
 const H={apikey:key,Authorization:'Bearer '+key},T=url+'/rest/v1/gallery';
 const toRow=r=>({id:r.id,case:r.case_id,suspect:r.suspect,score:r.score,success:r.success,visitor:r.visitor,thumb:r.thumb,t:Date.parse(r.created_at)});
 return{name:'supabase',
 async save(id,row,full){
  const body=JSON.stringify({id,case_id:row.case,suspect:row.suspect,score:row.score,success:row.success,visitor:row.visitor,thumb:row.thumb,full_img:full});
  const go=()=>fetch(T+'?on_conflict=id',{method:'POST',headers:{...H,'Content-Type':'application/json',Prefer:'resolution=ignore-duplicates,return=minimal'},body});
  let res;try{res=await go()}catch(e){await new Promise(ok=>setTimeout(ok,800));res=await go().catch(()=>null)}
  if(!res)throw{code:'network'};if(!res.ok)throw{code:'http_'+res.status}},
 list(o,next,err){
  let qs='select=id,case_id,suspect,score,success,visitor,thumb,created_at';
  if(o.f==='c001')qs+='&case_id=eq.001';else if(o.f==='c002')qs+='&case_id=eq.002';else if(o.f==='ok')qs+='&success=is.true';else if(o.f==='fail')qs+='&success=is.false';
  qs+='&order='+(o.sort==='new'?'created_at.desc':o.sort==='hi'?'score.desc,created_at.desc':'score.asc,created_at.desc')+'&limit='+o.limit;
  let dead=false,tm=null;
  const run=async()=>{try{const r=await fetch(T+'?'+qs,{headers:H,cache:'no-store'});if(!r.ok)throw{code:'http_'+r.status};const j=await r.json();if(!dead)next(Array.isArray(j)?j.map(toRow):[],true)}catch(e){if(!dead)err((e&&e.code)||'network')}
   if(!dead)tm=setTimeout(run,20000)};
  run();return()=>{dead=true;clearTimeout(tm)}},
 async full(id){const r=await fetch(T+'?select=full_img&id=eq.'+encodeURIComponent(id),{headers:H});if(!r.ok)return null;const j=await r.json();return j[0]&&j[0].full_img},
 errMsg(e){const c=(e&&e.code)||'';return /http_40[13]/.test(c)?'갤러리 서버가 저장을 거부했습니다. (Supabase 키와 보안 정책을 확인해 주세요)':'저장하지 못했습니다 ('+(c||'network')+'). 잠시 후 다시 제출해 주세요.'}}}
(async()=>{
 try{if(window.claude&&window.claude.use){const u=await window.claude.use('user');const id=u&&await u.id();if(id){VISITOR='USER '+code4(id);ui();return}}}catch(e){}
 try{let v=localStorage.getItem('mtj-visitor');if(!v){v=newSession();localStorage.setItem('mtj-visitor',v)}VISITOR='USER '+code4(v)}catch(e){VISITOR='GUEST'}ui();
})();
const NO_BACKEND='공유 갤러리 서버가 설정되지 않았습니다. (관리자: README의 Supabase 설정 참고)';
function jpeg(src,w,h,q,maxLen){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(src,0,0,w,h);
 let u=c.toDataURL('image/jpeg',q);while(u.length>maxLen&&q>.3){q-=.1;u=c.toDataURL('image/jpeg',q)}return u}
const goodImg=u=>typeof u==='string'&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(u);
const caseById=id=>CASES.find(c=>c.id===id);
const saved=new Set();let submitting=false;
const drawSig=()=>fnv(JSON.stringify(S.strokes)).toString(36);
function saveMsg(t,bad){const e=$('#rSave');e.textContent=t;e.classList.toggle('bad',!!bad)}
async function saveToGallery(id,ex,score){
 if(saved.has(id))return saveMsg('✓ 이미 공동 갤러리에 저장된 그림입니다 (중복 저장 안 함).');
 saveMsg('공동 갤러리에 저장하는 중…');
 const B=await backend();
 if(!B)return saveMsg(NO_BACKEND+' 이 그림은 저장되지 않았습니다.',true);
 const full=jpeg(ex,800,500,.82,180000),th=jpeg(ex,320,200,.72,40000),t=Date.now();
 const row={case:CASE.id,suspect:CASE.suspect,score,success:score>=80,t,visitor:VISITOR,thumb:th};
 try{await B.save(id,row,full)}catch(e){return saveMsg(B.errMsg(e),true)}
 saved.add(id);saveMsg('✓ 공동 갤러리에 저장되었습니다 · '+VISITOR);
}
function openSubmit(){
 if(!hasInk())return toast('먼저 몽타주를 그려주세요.');
 const heard=WIT.filter((x,j)=>S.prog[j]>=x.lines.length).length;const url=exportCanvas().toDataURL('image/png');
 modal(`<h2>몽타주 제출</h2><p class="lead">제출하면 범인 사진과 대조해 유사도를 계산하고, 결과와 상관없이 <b>공동 갤러리</b>에 익명(${esc(VISITOR)})으로 저장됩니다.</p>
 <div class="sgrid"><div><div class="preview"><img src="${url}" alt="제출할 몽타주"></div></div>
 <form id="subForm"><div class="check">${heard<4?ICON_WARN:ICON_INFO}<span>${heard<4?`아직 ${4-heard}명의 증언을 다 듣지 않았어요. 그래도 제출할 수 있습니다.`:'네 명의 증언을 모두 들었습니다.'}</span></div>
 <div class="check">${ICON_INFO}<span>저장되는 정보: 그림, 사건 번호, 유사도, 검거 여부, 제출 시각, 익명 표시(${esc(VISITOR)}). IP 주소나 이름은 저장하지 않습니다.</span></div>
 <div class="row"><button type="submit" class="btn def" id="subGo">제출하고 결과 보기</button><button type="button" class="btn" data-close>계속 그리기</button></div></form></div>`);
 $('#subForm').addEventListener('submit',async e=>{e.preventDefault();if(submitting)return;submitting=true;const b=$('#subGo');b.disabled=true;b.textContent='대조 중…';
  try{const id=SESSION+'-'+drawSig(),ex=exportCanvas(),png=ex.toDataURL('image/png');const score=await similarity();close();runResult(score,png);saveToGallery(id,ex,score)}
  finally{submitting=false}});
}
/* gallery window */
const GAL={f:'all',sort:'new',lim:24,unsub:null,timer:null,docs:[]};
function galleryStop(){if(GAL.unsub){try{GAL.unsub()}catch(e){}GAL.unsub=null}clearTimeout(GAL.timer)}
const FILTERS=[['all','전체'],['c001','CASE 001 — 스파이더맨'],['c002','CASE 002 — 뚱이 (패트릭)'],['ok','검거 성공'],['fail','검거 실패']];
const fmtDate=t=>{const d=new Date(+t);if(isNaN(d))return'';const z=n=>String(n).padStart(2,'0');return d.getFullYear()+'.'+z(d.getMonth()+1)+'.'+z(d.getDate())+' '+z(d.getHours())+':'+z(d.getMinutes())};
function openGallery(){
 galleryStop();
 modal(`<h2>공동 갤러리 - 같은 증언, 다른 얼굴들</h2>
 <p class="g-quote">같은 증언을 들었지만, 우리가 그린 얼굴은 모두 다릅니다.</p>
 <p class="lead">같은 네 명의 증언을 듣고 방문자들이 그린 실제 몽타주입니다. 그림을 누르면 진짜 범인과 나란히 비교할 수 있어요.</p>
 <div class="gtools"><div class="chips" id="gF">${FILTERS.map(([k,l])=>`<button class="btn${GAL.f===k?' on':''}" data-f="${k}">${l}</button>`).join('')}</div>
 <label class="gsort">정렬 <select id="gSort"><option value="new">최신순</option><option value="hi">높은 점수순</option><option value="lo">낮은 점수순</option></select></label></div>
 <p class="g-stat" id="gStat">불러오는 중…</p>
 <div class="gal" id="gGrid"></div>
 <div class="row" style="margin-top:14px"><button class="btn" id="gMore" hidden>더 보기</button><button class="btn def" data-close>닫기</button></div>`);
 SH.querySelector('.sheet .sbody, .sbody').classList.add('gbody');
 $('#gSort').value=GAL.sort;
 $('#gF').onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;GAL.f=b.dataset.f;GAL.lim=24;$('#gF').querySelectorAll('.btn').forEach(x=>x.classList.toggle('on',x===b));gSub()};
 $('#gSort').onchange=e=>{GAL.sort=e.target.value;GAL.lim=24;gSub()};
 $('#gMore').onclick=()=>{GAL.lim+=24;gSub()};
 $('#gGrid').onclick=e=>{const c=e.target.closest('[data-id]');if(!c)return;const d=GAL.docs.find(x=>x.id===c.dataset.id);if(d)compare(d)};
 gSub();
}
async function gSub(){
 galleryStop();const st=$('#gStat');if(!st)return;st.textContent='불러오는 중…';
 const B=await backend();if(!$('#gStat'))return;
 if(!B){st.textContent=NO_BACKEND;$('#gGrid').innerHTML='';return}
 GAL.timer=setTimeout(()=>{const s=$('#gStat');if(s&&!GAL.docs.length)s.textContent='갤러리 서버에 아직 연결하지 못했습니다. 잠시 기다려 주세요…'},10000);
 try{GAL.unsub=B.list({f:GAL.f,sort:GAL.sort,limit:GAL.lim+1},(rows,final)=>{if(final)clearTimeout(GAL.timer);renderGal(rows)},c=>{clearTimeout(GAL.timer);const s=$('#gStat');if(s)s.textContent='갤러리를 불러오지 못했습니다 ('+c+').'})}
 catch(e){st.textContent='갤러리를 불러오지 못했습니다.'}
}
function renderGal(docs){
 const grid=$('#gGrid');if(!grid)return;
 const more=docs.length>GAL.lim;docs=docs.slice(0,GAL.lim);
 GAL.docs=docs.map(d=>({...d,id:String(d.id)}));
 $('#gStat').textContent=GAL.docs.length?`작품 ${GAL.docs.length}${more?'+':''}점 표시 중`:'아직 이 조건에 맞는 몽타주가 없습니다. 첫 번째 그림을 제출해 보세요!';
 $('#gMore').hidden=!more;
 grid.innerHTML=GAL.docs.map(d=>{const c=caseById(String(d.case)),ok=d.success===true,sc=Math.max(0,Math.min(100,Math.round(+d.score||0)));
  return`<button class="gcard" data-id="${esc(d.id)}" aria-label="${esc('CASE '+d.case+' 몽타주 · 유사도 '+sc+'%')}"><span class="fr">${goodImg(d.thumb)?`<img src="${d.thumb}" alt="">`:'<i class="noimg">이미지 없음</i>'}</span>
  <span class="gl"><b>CASE ${esc(c?c.id:'???')}</b><span class="bdg ${ok?'ok':'no'}">${ok?'검거 성공':'검거 실패'}</span></span>
  <span class="gl"><span>유사도 <b>${sc}%</b></span><span>${esc(String(d.visitor||'익명').slice(0,12))}</span></span>
  <span class="gd">${esc(fmtDate(d.t))}</span></button>`}).join('');
}
async function compare(d){
 galleryStop();const c=caseById(String(d.case)),ok=d.success===true,sc=Math.max(0,Math.min(100,Math.round(+d.score||0)));
 modal(`<h2>몽타주 비교 - CASE ${esc(c?c.id:'???')}</h2><div class="cmp">
 <figure><figcaption>제출된 몽타주 · ${esc(String(d.visitor||'익명').slice(0,12))}</figcaption><div class="fr"><img id="cmpImg" src="${goodImg(d.thumb)?d.thumb:''}" alt="제출된 몽타주"></div></figure>
 <figure><figcaption>실제 범인 · ${esc(c?c.suspect:'알 수 없음')}</figcaption><div class="fr"><img class="ref" src="${c?c.img:''}" alt="${esc(c?c.suspect:'')}"></div></figure></div>
 <p class="cmp-info">유사도 <b>${sc}%</b> · <span class="bdg ${ok?'ok':'no'}">${ok?'검거 성공':'검거 실패'}</span> · ${esc(fmtDate(d.t))}</p>
 <div class="row"><button class="btn" id="cmpBack">← 갤러리로</button><button class="btn def" data-close>닫기</button></div>`);
 $('#cmpBack').onclick=openGallery;
 try{const B=await backend();if(!B)return;const u=await B.full(d.id);const im=$('#cmpImg');if(im&&goodImg(u))im.src=u}catch(e){}
}
/* ---------- 색 편집 (Windows Paint style colour editor) ---------- */
const CUSTOM=[];const SUGGEST=['#F5A3B7','#F6D7BD','#E9B38C','#C8352E','#7FB0E0','#D4DC28','#A98CC4','#8B5A3C'];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hex2rgb=x=>{const m=/^#?([0-9a-f]{6})$/i.exec(String(x).trim());if(!m)return null;const n=parseInt(m[1],16);return[n>>16&255,n>>8&255,n&255]};
const rgb2hex=(r,g,b)=>'#'+[r,g,b].map(v=>clamp(Math.round(v),0,255).toString(16).padStart(2,'0')).join('').toUpperCase();
function hsv2rgb(h,s,v){const f=n=>{const k=(n+h/60)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1))};return[f(5)*255,f(3)*255,f(1)*255]}
function rgb2hsv(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;let h=0;
 if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return{h,s:mx?d/mx:0,v:mx}}
function colorEditor(){
 const startHex=rgb2hex(...(hex2rgb(S.color)||[0,0,0]));const st=rgb2hsv(...hex2rgb(startHex));
 const sw=[...CUSTOM,...SUGGEST.filter(c=>!CUSTOM.includes(c))].slice(0,16);
 modal(`<h2>색 편집</h2><div class="ced-g"><div>
  <div class="ced-l">색 스펙트럼 · 오른쪽 막대는 명도</div>
  <div class="ced-row"><div class="ced-sp" id="cSpW"><canvas id="cSp" width="240" height="180" aria-label="색조와 채도 선택"></canvas><i id="cSpM"></i></div><div class="ced-br" id="cBrW"><canvas id="cBr" width="18" height="180" aria-label="명도 선택"></canvas><i id="cBrM"></i></div></div>
  <div class="ced-l">사용자 지정 색</div><div class="ced-cu" id="cCu">${sw.map(c=>`<button type="button" data-c="${c}" style="background:${c}" aria-label="${c}" title="${c}"></button>`).join('')}</div></div>
 <div><div class="ced-pv"><div><span>새 색</span><i id="cNew"></i></div><div><span>현재 색</span><i style="background:${startHex}"></i></div></div>
  <div class="ced-in"><label>색조(H)<input id="cH" type="number" min="0" max="359" inputmode="numeric"></label><label>빨강(R)<input id="cR" type="number" min="0" max="255" inputmode="numeric"></label>
  <label>채도(S)<input id="cS" type="number" min="0" max="100" inputmode="numeric"></label><label>녹색(G)<input id="cG" type="number" min="0" max="255" inputmode="numeric"></label>
  <label>명도(V)<input id="cV" type="number" min="0" max="100" inputmode="numeric"></label><label>파랑(B)<input id="cB" type="number" min="0" max="255" inputmode="numeric"></label></div>
  <label class="ced-hex">HEX<input id="cX" maxlength="7" spellcheck="false" autocomplete="off"></label></div></div>
 <div class="row"><button class="btn def" id="cOk">확인</button><button class="btn" data-close>취소</button></div>`);
 SH.classList.add('ced');
 const sp=$('#cSp'),br=$('#cBr'),spx=sp.getContext('2d'),brx=br.getContext('2d');
 {const im=spx.createImageData(240,180);for(let y=0;y<180;y++)for(let x=0;x<240;x++){const [r,g,b]=hsv2rgb(x/240*360,1-y/179,1),i=(y*240+x)*4;im.data[i]=r;im.data[i+1]=g;im.data[i+2]=b;im.data[i+3]=255}spx.putImageData(im,0,0)}
 const hex=()=>rgb2hex(...hsv2rgb(st.h,st.s,st.v));
 function upd(src){
  const [r,g,b]=hsv2rgb(st.h,st.s,st.v).map(Math.round),x=hex();
  if(src!=='hsv'){$('#cH').value=Math.round(st.h)%360;$('#cS').value=Math.round(st.s*100);$('#cV').value=Math.round(st.v*100)}
  if(src!=='rgb'){$('#cR').value=r;$('#cG').value=g;$('#cB').value=b}
  if(src!=='hex'){$('#cX').value=x;$('#cX').classList.remove('bad')}
  const gr=brx.createLinearGradient(0,0,0,180),[tr,tg,tb]=hsv2rgb(st.h,st.s,1);gr.addColorStop(0,`rgb(${tr|0},${tg|0},${tb|0})`);gr.addColorStop(1,'#000');brx.fillStyle=gr;brx.fillRect(0,0,18,180);
  $('#cSpM').style.left=(2+st.h/360*240)+'px';$('#cSpM').style.top=(2+(1-st.s)*179)+'px';$('#cBrM').style.top=(2+(1-st.v)*179)+'px';
  $('#cNew').style.background=x;
 }
 const drag=(el,fn)=>{const go=e=>{const r=el.getBoundingClientRect();fn(clamp((e.clientX-r.left)/r.width,0,1),clamp((e.clientY-r.top)/r.height,0,1))};
  el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId);go(e);el.onpointermove=go});el.addEventListener('pointerup',()=>el.onpointermove=null);el.addEventListener('pointercancel',()=>el.onpointermove=null)};
 drag($('#cSpW'),(fx,fy)=>{st.h=Math.min(359.9,fx*360);st.s=1-fy;if(st.v<.05)st.v=1;upd()});
 drag($('#cBrW'),(fx,fy)=>{st.v=1-fy;upd()});
 const num=id=>{const v=+$(id).value;return isFinite(v)?v:0};
 ['#cH','#cS','#cV'].forEach(id=>$(id).addEventListener('input',()=>{st.h=clamp(num('#cH'),0,359);st.s=clamp(num('#cS'),0,100)/100;st.v=clamp(num('#cV'),0,100)/100;upd('hsv')}));
 ['#cR','#cG','#cB'].forEach(id=>$(id).addEventListener('input',()=>{Object.assign(st,rgb2hsv(clamp(num('#cR'),0,255),clamp(num('#cG'),0,255),clamp(num('#cB'),0,255)));upd('rgb')}));
 $('#cX').addEventListener('input',e=>{let v=e.target.value.trim();if(v&&v[0]!=='#')v='#'+v;const c=hex2rgb(v);e.target.classList.toggle('bad',!c);if(c){Object.assign(st,rgb2hsv(...c));upd('hex')}});
 $('#cCu').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;Object.assign(st,rgb2hsv(...hex2rgb(b.dataset.c)));upd()};
 $('#cOk').onclick=()=>{const x=hex();const i=CUSTOM.indexOf(x);if(i>=0)CUSTOM.splice(i,1);CUSTOM.unshift(x);CUSTOM.length=Math.min(CUSTOM.length,8);close();setColor(x);toast('사용자 지정 색 '+x+'을(를) 선택했습니다.','색 편집')};
 SH.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'){e.preventDefault();$('#cOk').click()}});
 upd();$('#cX').focus();
}
$('#cedBtn').onclick=colorEditor;$('#curc').onclick=colorEditor;

function keysDlg(){modal(`<h2>단축키</h2><div class="keys"><kbd>P</kbd><span>연필</span><kbd>E</kbd><span>지우개</span><kbd>F</kbd><span>페인트 통</span><kbd>[ ]</kbd><span>굵기 줄이기 / 늘리기</span><kbd>Ctrl+Z</kbd><span>실행 취소</span><kbd>Ctrl+Y</kbd><span>다시 실행</span><kbd>Ctrl+S</kbd><span>몽타주 저장</span><kbd>G</kbd><span>얼굴 비율 가이드</span><kbd>M</kbd><span>대사 효과음 켜기/끄기</span><kbd>→</kbd><span>다음 진술</span></div><div class="row"><button class="btn def" data-close>확인</button></div>`,true)}
function aboutDlg(){modal(`<h2>몽타주실 정보</h2><div class="check">${ICON_INFO}<span><b>몽타주실 — DRAW WHAT YOU HEARD?!</b><br>CASE 001 · CASE 002<br>같은 말을 듣고도 사람마다 다른 얼굴을 떠올린다는 것을 실험하는 시각 커뮤니케이션 디자인 프로젝트입니다.</span></div><div class="row"><button class="btn def" data-close>확인</button></div>`,true)}

/* ---------- session case (random, hidden until the result) ---------- */
function applyCaseUI(){
 const code=SESSION.slice(0,4).toUpperCase();
 $('#appTitle').textContent='몽타주 No.'+code+' - 몽타주실 Paint';$('#pTag').textContent='MONTAGE · No.'+code;$('#sideTitle').textContent='사건 파일 - No.'+code;
 $('#rHead').textContent='CASE '+CASE.id+' · 몽타주 대조';$('#barsLbl').textContent='CASE '+CASE.id+' · 수감 완료';$('#introK').textContent='CASE ??? · 정체불명의 인물';
 $('#taskT').textContent='몽타주 No.'+code+' - 몽타주실…';$('#fcNo').textContent='사건 No.'+code;CASE.file.forEach((t,k)=>$('#fc'+k).textContent=t);
 document.title='몽타주실 — DRAW WHAT YOU HEARD?!';
}
function newGame(){
 closeResult();close();if(line)line.cancel();typing=false;stopGrain();
 SESSION=newSession();CI=rnd(CASES.length);bindCase();
 S.strokes=[];S.redo=[];S.prog=[0,0,0,0];S.clues=[];S.w=-1;S.i=0;
 rebuild();ui();notes(false);stats();tabs();applyCaseUI();$('#wLine').textContent='';$('#wDots').innerHTML='';
 started=false;t0=0;$('#sT').textContent='00:00';replayIntro();
}

/* ---------- menus ---------- */
function closeMenus(){document.querySelectorAll('.menu.open,.mi.open').forEach(x=>x.classList.remove('open'))}
$('#menubar').addEventListener('click',e=>{
 const mi=e.target.closest('.mi');
 if(mi){e.stopPropagation();const m=$('#m-'+mi.dataset.m),was=m.classList.contains('open');closeMenus();if(!was){m.classList.add('open');mi.classList.add('open')}return}
 const it=e.target.closest('[data-a]');if(!it)return;closeMenus();act(it.dataset.a);
});
$('#menubar').addEventListener('mouseover',e=>{const mi=e.target.closest('.mi');if(mi&&document.querySelector('.menu.open')&&!mi.classList.contains('open')){closeMenus();$('#m-'+mi.dataset.m).classList.add('open');mi.classList.add('open')}});
document.addEventListener('click',e=>{if(!e.target.closest('#menubar'))closeMenus()});
function act(a){({save:saveAsk,submit:openSubmit,gallery:openGallery,intro:replayIntro,undo,redo,clear:clearAsk,guide:toggleGuide,side:toggleSide,mute:toggleMute,next,restart:()=>say(0,0),newgame:newGame,colors:colorEditor,keys:keysDlg,about:aboutDlg})[a]?.()}
function toggleSide(){if(innerWidth<=900){$('#body').classList.toggle('sideopen');return}S.side=!S.side;ui()}
$('#sideX').onclick=()=>{if(innerWidth<=900)$('#body').classList.remove('sideopen');else{S.side=false;ui()}};
document.querySelectorAll('[data-title]').forEach(b=>b.onclick=()=>toast({min:'수사 중에는 창을 내릴 수 없습니다!',max:'이미 최대 크기로 수사 중입니다.',close:'범인을 잡기 전에는 닫을 수 없습니다!'}[b.dataset.title]));
$('#startMenu').onclick=()=>toast('수사 중에는 다른 프로그램을 열 수 없습니다.','시작');
$('#subBtn').onclick=openSubmit;$('#galBtn').onclick=openGallery;$('#subBtn2').onclick=openSubmit;$('#galBtn2').onclick=openGallery;

/* ---------- intro ---------- */
const IN=$('#intro'),APP=$('#app');let iphase='gate',iline=null,started=false,itimers=[];
const POLIS_V={ms:34,s:1};
const later=(f,ms)=>itimers.push(setTimeout(f,ms));
function introSiren(){if(IN.hidden||iphase==='leaving')return;playSfx('siren').then(ok=>{sirenPending=!ok&&!muted})}
IN.addEventListener('pointerdown',()=>{if(sirenPending&&!IN.hidden){sirenPending=false;playSfx('siren')}},true);
document.addEventListener('keydown',()=>{if(sirenPending&&!IN.hidden){sirenPending=false;playSfx('siren')}},true);
function introTalk(){
 if(iphase!=='gate')return;iphase='walk';unlock();IN.classList.add('talk');
 later(()=>{iphase='talk';$('#bubble').classList.add('on');iline=typeLine($('#bLine'),'자, 같이 몽타주를 그리고 범인을 잡으러 가자!',POLIS_V,()=>{iphase='ready';$('#go').classList.add('on');$('#startBtn').focus()})},1350);
}
function enterGame(fast){
 if(iphase==='leaving')return;iphase='leaving';itimers.forEach(clearTimeout);itimers=[];if(iline)iline.cancel();stopSfx('siren',true);sirenPending=false;
 const reveal=()=>{IN.classList.add('gone');APP.removeAttribute('aria-hidden');$('#taskbar').removeAttribute('aria-hidden');APP.classList.remove('boot');void APP.offsetWidth;APP.classList.add('boot');fit();
  later(()=>{IN.hidden=true},500);
  if(!started){started=true;t0=Date.now();const n0=nextOpen();later(()=>{if(S.prog.some(v=>v>0)&&n0>=0)say(n0,S.prog[n0]);else say(-1,0)},550)}};
 if(fast)return reveal();
 IN.classList.add('zoom');
 later(()=>IN.classList.add('launching'),950);
 later(reveal,2350);
}
function replayIntro(){
 itimers.forEach(clearTimeout);itimers=[];if(iline)iline.cancel();
 IN.hidden=false;IN.className='';$('#bubble').classList.remove('on');$('#go').classList.remove('on');$('#bLine').textContent='';iphase='gate';introSiren();
 if(line)line.finish();
}
IN.addEventListener('click',e=>{
 if(e.target.closest('#skipBtn')){e.stopPropagation();return enterGame(true)}
 if(e.target.closest('#startBtn'))return enterGame(false);
 if(iphase==='gate')introTalk();else if(iphase==='talk'&&iline)iline.finish();
});

/* ---------- keys ---------- */
document.addEventListener('keydown',e=>{
 if(!IN.hidden&&iphase!=='leaving'){
  if(e.key==='Escape'){enterGame(true);return}
  if(e.key==='Enter'||e.key===' '||e.key==='ArrowRight'){e.preventDefault();if(iphase==='gate')introTalk();else if(iphase==='talk'&&iline)iline.finish();else if(iphase==='ready')enterGame(false)}
  return}
 if(!$('#result').hidden){if(e.key==='Escape')closeResult();return}
 if(e.key==='Escape'){close();closeMenus();$('#body').classList.remove('sideopen');return}
 if(M.classList.contains('open')||/INPUT|TEXTAREA/.test(e.target.tagName))return;
 const k=e.key.toLowerCase();
 if((e.ctrlKey||e.metaKey)&&k==='z'){e.preventDefault();e.shiftKey?redo():undo();return}
 if((e.ctrlKey||e.metaKey)&&k==='y'){e.preventDefault();redo();return}
 if((e.ctrlKey||e.metaKey)&&k==='s'){e.preventDefault();saveAsk();return}
 if(e.ctrlKey||e.metaKey||e.altKey)return;
 if(k==='p'||k==='b')setTool('pen');else if(k==='e')setTool('eraser');else if(k==='f')setTool('fill');else if(k==='[')setSize(S.size-4);else if(k===']')setSize(S.size+4);else if(k==='g')toggleGuide();else if(k==='m')toggleMute()
 else if(k==='arrowright'||(k==='enter'&&e.target===document.body)){e.preventDefault();next()}
});

/* start */
rebuild();ui();notes(false);stats();tabs();applyCaseUI();fit();introSiren();
}
