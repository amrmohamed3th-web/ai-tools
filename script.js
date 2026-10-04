
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const CATS = {w:'كتابة وبحث', c:'برمجة', i:'صور', d:'تصميم', v:'فيديو', a:'صوت', p:'إنتاجية وأتمتة'};
const PRICE = {free:'مجانية', freemium:'Freemium', paid:'مدفوعة'};
// [الاسم, المجال, السعر, تقييم المحرر, الرابط, الوصف, كلمات للبحث]
const raw = [
 ['ChatGPT','w','freemium',4.8,'https://chatgpt.com','مساعد محادثة عام من OpenAI للكتابة والتحليل والبرمجة.','chat محادثة شات openai'],
 ['Claude','w','freemium',4.8,'https://claude.ai','مساعد من Anthropic قوي في الكتابة الطويلة وتحليل الملفات والبرمجة.','chat محادثة anthropic تلخيص'],
 ['Gemini','w','freemium',4.6,'https://gemini.google.com','مساعد Google بيدعم النص والصور ومرتبط بخدماتها.','google chat محادثة'],
 ['Perplexity','w','freemium',4.6,'https://www.perplexity.ai','محرك بحث بالذكاء الاصطناعي بيجاوب مع ذكر المصادر.','search بحث مصادر'],
 ['NotebookLM','w','freemium',4.6,'https://notebooklm.google','بتسأله عن ملفاتك ومصادرك وبيلخصها لك.','study دراسة تلخيص ملفات'],
 ['Grammarly','w','freemium',4.5,'https://www.grammarly.com','تدقيق لغوي إنجليزي واقتراحات لتحسين الأسلوب.','grammar تدقيق إنجليزي كتابة'],
 ['QuillBot','w','freemium',4.3,'https://quillbot.com','إعادة صياغة وتلخيص النصوص وتدقيقها.','paraphrase صياغة تلخيص'],
 ['DeepL','w','freemium',4.6,'https://www.deepl.com','ترجمة دقيقة بين لغات كتير.','translate ترجمة'],
 ['Jasper','w','paid',4.1,'https://www.jasper.ai','منصة لكتابة المحتوى التسويقي للفرق.','marketing تسويق إعلانات محتوى'],
 ['Sudowrite','w','paid',4.0,'https://www.sudowrite.com','أداة لمساعدة كتّاب القصص والروايات.','fiction قصص روايات'],
 ['GitHub Copilot','c','freemium',4.6,'https://github.com/features/copilot','إكمال كود واقتراحات جوه المحرر اللي بتشتغل عليه.','code autocomplete كود'],
 ['Cursor','c','freemium',4.7,'https://cursor.com','محرر كود مبني حوالين الذكاء الاصطناعي.','editor ide محرر'],
 ['Windsurf','c','freemium',4.4,'https://windsurf.com','محرر كود بمساعد AI بيفهم مشروعك.','editor ide محرر'],
 ['Replit','c','freemium',4.3,'https://replit.com','بيئة برمجة أونلاين مع مساعد AI لبناء التطبيقات.','online ide أونلاين'],
 ['Lovable','c','freemium',4.3,'https://lovable.dev','بيبني تطبيقات ويب من وصف نصي.','web app مواقع تطبيقات'],
 ['Bolt','c','freemium',4.2,'https://bolt.new','توليد تطبيقات ويب كاملة من برومبت.','web app مواقع تطبيقات'],
 ['Hugging Face','c','free',4.7,'https://huggingface.co','منصة نماذج ومجموعات بيانات مفتوحة المصدر.','models نماذج open source مفتوح'],
 ['Ollama','c','free',4.6,'https://ollama.com','تشغيل نماذج لغوية مفتوحة على جهازك.','local llm محلي نماذج'],
 ['Midjourney','i','paid',4.8,'https://www.midjourney.com','توليد صور فنية عالية الجودة من وصف نصي.','art فن صور رسم'],
 ['Leonardo','i','freemium',4.4,'https://leonardo.ai','توليد صور وأصول ألعاب وتصميمات.','art games ألعاب صور'],
 ['Ideogram','i','freemium',4.4,'https://ideogram.ai','توليد صور بنصوص مكتوبة جواها بدقة.','text شعار لوجو صور'],
 ['Adobe Firefly','i','freemium',4.3,'https://firefly.adobe.com','توليد صور وتعديلها من Adobe.','adobe تعديل صور'],
 ['Stable Diffusion','i','free',4.4,'https://stability.ai','نماذج توليد صور مفتوحة المصدر.','open source مفتوح صور'],
 ['ComfyUI','i','free',4.5,'https://www.comfy.org','واجهة عقد لبناء مسارات توليد الصور على جهازك.','local workflow محلي'],
 ['remove.bg','i','freemium',4.4,'https://www.remove.bg','إزالة خلفية الصور بضغطة واحدة.','background خلفية تعديل صور'],
 ['Canva','d','freemium',4.7,'https://www.canva.com','تصميم سوشيال ميديا وعروض مع أدوات AI.','social سوشيال عروض بوستر'],
 ['Figma','d','freemium',4.7,'https://www.figma.com','تصميم واجهات وتعاون فريق مع ميزات AI.','ui ux واجهات'],
 ['Gamma','d','freemium',4.5,'https://gamma.app','بيعمل عروض ومستندات من وصف سريع.','presentation slides عرض شرائح'],
 ['Runway','v','freemium',4.5,'https://runwayml.com','توليد وتعديل فيديو بالذكاء الاصطناعي.','video فيديو مونتاج'],
 ['Pika','v','freemium',4.2,'https://pika.art','توليد فيديوهات قصيرة من نص أو صورة.','video فيديو'],
 ['HeyGen','v','freemium',4.4,'https://www.heygen.com','فيديوهات بمقدّم افتراضي وترجمة صوتية.','avatar مقدم افتراضي'],
 ['Synthesia','v','paid',4.3,'https://www.synthesia.io','فيديوهات تدريب وشرح بمقدمين افتراضيين.','avatar training تدريب'],
 ['CapCut','v','freemium',4.4,'https://www.capcut.com','مونتاج فيديو سهل مع مزايا AI.','editing مونتاج ريلز'],
 ['ElevenLabs','a','freemium',4.7,'https://elevenlabs.io','تحويل نص لصوت طبيعي واستنساخ أصوات.','tts voice صوت تعليق'],
 ['Suno','a','freemium',4.5,'https://suno.com','توليد أغاني كاملة من وصف نصي.','music موسيقى أغاني'],
 ['Otter.ai','a','freemium',4.3,'https://otter.ai','تفريغ الاجتماعات لنص وملخصات.','meetings اجتماعات تفريغ'],
 ['Whisper','a','free',4.6,'https://github.com/openai/whisper','نموذج مفتوح لتحويل الكلام لنص.','speech to text تفريغ صوت','openai.com'],
 ['Microsoft Copilot','w','freemium',4.4,'https://copilot.microsoft.com','مساعد Microsoft المدمج مع Edge وويندوز وأوفيس.','microsoft chat محادثة'],
 ['Le Chat','w','freemium',4.3,'https://chat.mistral.ai','مساعد محادثة من شركة Mistral الفرنسية.','mistral chat محادثة'],
 ['DeepSeek','w','freemium',4.4,'https://www.deepseek.com','مساعد محادثة ونماذج استدلال وبرمجة من DeepSeek.','chat محادثة استدلال'],
 ['Poe','w','freemium',4.2,'https://poe.com','منصة بتجمع نماذج وبوتات ذكاء اصطناعي كتير في مكان واحد.','chat bots بوتات نماذج'],
 ['Grok','w','freemium',4.2,'https://grok.com','مساعد محادثة من xAI مرتبط بمنصة X.','xai chat محادثة'],
 ['Elicit','w','freemium',4.3,'https://elicit.com','مساعد بحث أكاديمي بيلاقي الأبحاث العلمية ويلخصها.','research أبحاث دراسة papers'],
 ['Consensus','w','freemium',4.3,'https://consensus.app','محرك بحث بيجاوب من الأبحاث العلمية المنشورة.','research أبحاث دراسة science'],
 ['v0','c','freemium',4.4,'https://v0.app','توليد واجهات ويب من وصف نصي، من Vercel.','ui web واجهات مواقع'],
 ['Continue','c','free',4.2,'https://www.continue.dev','مساعد كود مفتوح المصدر جوه VS Code وغيره.','open source مفتوح extension'],
 ['Cline','c','free',4.4,'https://cline.bot','وكيل برمجة مفتوح المصدر جوه المحرر، وبتدفع تكلفة النموذج بنفسك.','agent open source وكيل'],
 ['LM Studio','c','free',4.4,'https://lmstudio.ai','تطبيق لتشغيل نماذج لغوية على جهازك بواجهة سهلة.','local llm محلي نماذج'],
 ['Warp','c','freemium',4.2,'https://www.warp.dev','ترمينال حديث بمساعد AI للأوامر.','terminal ترمينال أوامر'],
 ['Google AI Studio','c','freemium',4.5,'https://aistudio.google.com','تجربة نماذج Gemini وبناء تطبيقات عليها.','google gemini api'],
 ['Krea','i','freemium',4.4,'https://www.krea.ai','توليد صور وفيديو ورفع جودة بشكل لحظي.','art صور فيديو تحسين'],
 ['Magnific','i','paid',4.4,'https://magnific.ai','رفع دقة الصور وإضافة تفاصيل بالذكاء الاصطناعي.','upscale رفع دقة تحسين'],
 ['Upscayl','i','free',4.3,'https://upscayl.org','رفع دقة الصور مجاناً على جهازك.','upscale رفع دقة open source'],
 ['Photoroom','i','freemium',4.4,'https://www.photoroom.com','تجهيز صور المنتجات: إزالة الخلفية وتصميم صور للبيع.','products منتجات خلفية متجر'],
 ['Clipdrop','i','freemium',4.2,'https://clipdrop.co','أدوات صور: إزالة خلفية وتحسين وإزالة عناصر.','background خلفية تعديل صور'],
 ['Recraft','i','freemium',4.3,'https://www.recraft.ai','توليد صور وأيقونات وملفات متجهة (vector).','vector icons أيقونات شعار'],
 ['Framer','d','freemium',4.5,'https://www.framer.com','بناء مواقع ويب بتصميم مرئي ومساعد AI.','website موقع ويب تصميم'],
 ['Beautiful.ai','d','paid',4.2,'https://www.beautiful.ai','عروض تقديمية بتنسق نفسها تلقائياً.','presentation slides عرض شرائح'],
 ['Relume','d','freemium',4.4,'https://www.relume.io','بناء خريطة موقع وwireframes بسرعة بالـ AI.','wireframe sitemap ويب'],
 ['Microsoft Designer','d','freemium',4.1,'https://designer.microsoft.com','تصميم بوسترات وبوستات سوشيال من وصف.','social سوشيال بوستر'],
 ['Luma','v','freemium',4.4,'https://lumalabs.ai','توليد فيديو من نص أو صورة (Dream Machine).','video فيديو'],
 ['Kling','v','freemium',4.4,'https://klingai.com','توليد فيديو بالذكاء الاصطناعي من شركة Kuaishou.','video فيديو'],
 ['Descript','v','freemium',4.4,'https://www.descript.com','مونتاج فيديو وبودكاست بتعديل النص المفرّغ.','editing podcast مونتاج بودكاست'],
 ['Opus Clip','v','freemium',4.3,'https://www.opus.pro','قص الفيديوهات الطويلة لمقاطع قصيرة جاهزة للنشر.','shorts reels ريلز'],
 ['InVideo','v','freemium',4.1,'https://invideo.io','إنشاء فيديوهات من سكريبت أو فكرة.','video script فيديو'],
 ['Murf','a','freemium',4.2,'https://murf.ai','تعليق صوتي بأصوات اصطناعية.','tts voice تعليق صوتي'],
 ['Udio','a','freemium',4.3,'https://www.udio.com','توليد موسيقى وأغاني من وصف نصي.','music موسيقى أغاني'],
 ['Adobe Podcast','a','freemium',4.4,'https://podcast.adobe.com','تحسين جودة الصوت وإزالة الضوضاء.','audio enhance تحسين صوت'],
 ['Fireflies','a','freemium',4.3,'https://fireflies.ai','تسجيل وتفريغ وتلخيص الاجتماعات.','meetings اجتماعات تفريغ'],
 ['Krisp','a','freemium',4.5,'https://krisp.ai','إلغاء ضوضاء المكالمات والاجتماعات.','noise ضوضاء مكالمات'],
 ['Zapier','p','freemium',4.5,'https://zapier.com','ربط التطبيقات وأتمتة المهام من غير كود.','automation أتمتة workflow'],
 ['Make','p','freemium',4.4,'https://www.make.com','أتمتة مرئية بين تطبيقات كتير.','automation أتمتة workflow'],
 ['n8n','p','freemium',4.5,'https://n8n.io','أتمتة مفتوحة المصدر تقدر تستضيفها بنفسك.','automation أتمتة open source'],
 ['Notion','p','freemium',4.6,'https://www.notion.com','مساحة عمل للملاحظات والمهام فيها مساعد AI.','notes ملاحظات مهام'],
 ['Motion','p','paid',4.1,'https://www.usemotion.com','جدولة مهامك وتقويمك تلقائياً.','calendar تقويم مهام'],
 ['Reclaim.ai','p','freemium',4.3,'https://reclaim.ai','تنظيم تقويمك وعاداتك تلقائياً.','calendar تقويم وقت']
];
const tools = raw.map((r,i) => ({id:i, name:r[0], cat:r[1], price:r[2], rate:r[3], url:r[4], desc:r[5], kw:r[6], host:r[7] || new URL(r[4]).hostname}));
// اسم الأيقونة في Simple Icons (لوجوهات SVG عالية الجودة) للأدوات المعروفة
const SI = {'ChatGPT':'openai','Whisper':'openai','Claude':'claude','Gemini':'googlegemini','Perplexity':'perplexity','Grammarly':'grammarly','DeepL':'deepl',
  'Notion':'notion','Figma':'figma','Canva':'canva','Replit':'replit','Hugging Face':'huggingface','Ollama':'ollama','Zapier':'zapier','n8n':'n8n',
  'GitHub Copilot':'githubcopilot','Midjourney':'midjourney','Framer':'framer','CapCut':'capcut','ElevenLabs':'elevenlabs','Le Chat':'mistralai','Grok':'grok','Elicit':'elicit','Consensus':'consensus','v0':'vercel','Continue':'continue','Cline':'cline','LM Studio':'lmstudio','Warp':'warp',
  'Adobe Firefly':'adobe','Adobe Podcast':'adobe','Cursor':'cursor','Windsurf':'windsurf','Google AI Studio':'google',};
// ترتيب المحاولات: لو مصدر فشل أو رجّع أيقونة صغيرة، بنجرب اللي بعده
const logoSrcs = t => [
  SI[t.name] && `https://cdn.simpleicons.org/${SI[t.name]}`,
  `https://www.google.com/s2/favicons?domain=${t.host}&sz=128`,
  `https://${t.host}/apple-touch-icon.png`,
  `https://icons.duckduckgo.com/ip3/${t.host}.ico`,
  `https://${t.host}/favicon.ico`
].filter(Boolean);
const logo = t => `<img src="${logoSrcs(t)[0]}" data-t="${t.id}" data-i="0" alt="" loading="lazy" referrerpolicy="no-referrer" onload="chkLogo(this)" onerror="nextLogo(this)">`;
function nextLogo(img){
  const srcs = logoSrcs(tools[+img.dataset.t]), i = +img.dataset.i + 1;
  if(i >= srcs.length) return img.remove();            // كله فشل: يظهر الحرف البديل
  img.dataset.i = i; img.src = srcs[i];
}
function chkLogo(img){                                  // أيقونة أصغر من 32 بكسل = غالباً بديلة، جرب مصدر تاني
  const last = logoSrcs(tools[+img.dataset.t]).length - 1;
  if(!/simpleicons/.test(img.src) && img.naturalWidth < 32 && +img.dataset.i < last) nextLogo(img);
}
const hue = s => { let h = 0; for(const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const ini = n => n.replace(/[^A-Za-z0-9 ]/g,'').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() || n[0];
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch(e) { return d; } };
const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };

let saved = load('aitd_saved', []), rates = load('aitd_rates', {}), st = {q:'', price:'all', cat:'all', sort:'rate'};
let theme = load('aitd_theme', 'dark');
const norm = s => s.toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');

// ---------- الفلاتر ----------
function filtered(){
  const q = norm(st.q.trim());
  let l = tools.filter(t => (st.price === 'all' || t.price === st.price) && (st.cat === 'all' || t.cat === st.cat) &&
    (!q || norm([t.name, CATS[t.cat], t.desc, t.kw].join(' ')).includes(q)));
  if(st.sort === 'rate') l.sort((a,b) => b.rate - a.rate || a.name.localeCompare(b.name));
  else if(st.sort === 'name') l.sort((a,b) => a.name.localeCompare(b.name));
  else if(st.sort === 'mine') l.sort((a,b) => (rates[b.id] || 0) - (rates[a.id] || 0));
  return l;
}
const card = t => `<div class="card" data-id="${t.id}">
  <button class="save ${saved.includes(t.id) ? 'on' : ''}" data-save="${t.id}" aria-label="حفظ ${t.name}">${saved.includes(t.id) ? '★' : '☆'}</button>
  <div class="top"><div class="av" style="background:hsl(${hue(t.name)} 55% 42%)">${ini(t.name)}${logo(t)}</div><div><h3><bdi>${t.name}</bdi></h3><small>${CATS[t.cat]}</small></div></div>
  <p>${t.desc}</p>
  <div class="foot"><span class="pb ${t.price}">${PRICE[t.price]}</span><span class="rt">★ ${t.rate.toFixed(1)}${rates[t.id] ? ` <small>• تقييمك ${rates[t.id]}</small>` : ''}</span></div></div>`;

function render(){
  const cnt = {all: tools.length, free:0, freemium:0, paid:0}; tools.forEach(t => cnt[t.price]++);
  const dot = {all:'var(--cy)', free:'var(--free)', freemium:'var(--fm)', paid:'var(--paid)'};
  $('#tabs').innerHTML = [['all','الكل'], ...Object.entries(PRICE)].map(([k,n]) =>
    `<button class="tab ${st.price === k ? 'on' : ''}" data-price="${k}"><span class="d" style="background:${dot[k]}"></span>${n}<em>${cnt[k]}</em></button>`).join('');
  $('#chips').innerHTML = [['all','كل المجالات'], ...Object.entries(CATS)].map(([k,n]) => `<button class="chip ${st.cat === k ? 'on' : ''}" data-cat="${k}">${n}</button>`).join('') +
    `<select id="sort" aria-label="الترتيب"><option value="rate">الأعلى تقييماً</option><option value="name">الاسم (A-Z)</option><option value="mine">تقييمي أنا</option></select>`;
  $('#sort').value = st.sort;
  const l = filtered();
  $('#count').textContent = l.length + ' أداة' + (st.q ? ` لنتيجة "${st.q}"` : '');
  $('#grid').innerHTML = l.map(card).join('') || '<div class="empty"><big>🤷</big>مفيش أدوات مطابقة. جرب كلمة تانية أو شيل الفلاتر.</div>';
  const sv = tools.filter(t => saved.includes(t.id));
  $('#sgrid').innerHTML = sv.map(card).join('') || '<div class="empty"><big>🔖</big>لسه مفيش أدوات محفوظة. اضغط ☆ على أي أداة علشان تحفظها.</div>';
  $('#nSaved').textContent = $('#sSaved').textContent = saved.length;
  $('#sTotal').textContent = tools.length; $('#sFree').textContent = cnt.free;
}

// ---------- الأحداث ----------
$('#q').addEventListener('input', e => { st.q = e.target.value; render(); });
document.addEventListener('change', e => { if(e.target.id === 'sort'){ st.sort = e.target.value; render(); } });
document.addEventListener('click', e => {
  const sv = e.target.closest('[data-save]'), pr = e.target.closest('[data-price]'), ct = e.target.closest('[data-cat]'), cd = e.target.closest('.card'), pg = e.target.closest('nav [data-p]');
  if(sv){ e.stopPropagation(); toggle(+sv.dataset.save); }
  else if(pr){ st.price = pr.dataset.price; render(); }
  else if(ct){ st.cat = ct.dataset.cat; render(); }
  else if(cd) openTool(+cd.dataset.id);
  else if(pg) go(pg.dataset.p);
});
function go(p){ $$('.page').forEach(x => x.classList.toggle('show', x.id === p)); $$('nav button').forEach(b => b.classList.toggle('on', b.dataset.p === p)); window.scrollTo(0,0); }
let tt; function toast(m){ const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 1800); }

function toggle(id){
  const was = saved.includes(id);
  saved = was ? saved.filter(x => x !== id) : [...saved, id]; put('aitd_saved', saved);
  render(); if($('#modal').classList.contains('show')) openTool(id, true);
  toast(was ? 'اتشالت من المحفوظات' : 'اتحفظت ✔');
}
function openTool(id, keep){
  const t = tools[id], on = saved.includes(id), mine = rates[id] || 0;
  $('#mbox').innerHTML = `<button class="x" data-close aria-label="إغلاق">✕</button>
    <div class="top"><div class="av" style="background:hsl(${hue(t.name)} 55% 42%)">${ini(t.name)}${logo(t)}</div><div><h2 style="direction:ltr;text-align:start"><bdi>${t.name}</bdi></h2><small>${CATS[t.cat]}</small></div></div>
    <div class="foot" style="justify-content:flex-start;gap:12px"><span class="pb ${t.price}">${PRICE[t.price]}</span><span class="rt">★ ${t.rate.toFixed(1)} <small>تقييم المحرر</small></span></div>
    <p>${t.desc}</p><div class="tags">${t.kw.split(' ').map(k => `<span>${k}</span>`).join('')}</div>
    <b>تقييمك:</b><div class="rate" id="rate">${[1,2,3,4,5].map(n => `<button class="${n <= mine ? 'on' : ''}" data-r="${n}" aria-label="${n} نجوم">★</button>`).join('')}</div>
    <div class="acts"><a class="btn" href="${t.url}" target="_blank" rel="noopener noreferrer">زيارة الموقع ↗</a>
    <button class="btn o ${on ? 'on' : ''}" data-save="${t.id}">${on ? '★ محفوظة' : '☆ احفظ للرجوع لاحقاً'}</button></div>`;
  $('#modal').classList.add('show');
}
$('#modal').addEventListener('click', e => {
  if(e.target.id === 'modal' || e.target.closest('[data-close]')) $('#modal').classList.remove('show');
  const r = e.target.closest('[data-r]');
  if(r){ const id = +[...$$('#mbox [data-save]')][0].dataset.save, n = +r.dataset.r; rates[id] = rates[id] === n ? 0 : n; if(!rates[id]) delete rates[id]; put('aitd_rates', rates); render(); openTool(id); toast('تم حفظ تقييمك'); }
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') $('#modal').classList.remove('show');
  if(e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){ e.preventDefault(); go('dir'); $('#q').focus(); }
});

// ---------- المحفوظات ----------
$('#clear').onclick = () => { if(saved.length && confirm('تمسح كل المحفوظات؟')){ saved = []; put('aitd_saved', saved); render(); } };
$('#copy').onclick = async () => {
  const txt = tools.filter(t => saved.includes(t.id)).map(t => `${t.name} - ${t.url}`).join('\n');
  if(!txt) return toast('مفيش حاجة محفوظة');
  try { await navigator.clipboard.writeText(txt); toast('اتنسخت القايمة ✔'); } catch(e) { toast('المتصفح منع النسخ'); }
};

// ---------- مظهر + بلايس هولدر متغير ----------
function applyTheme(){ document.documentElement.dataset.theme = theme; $('#theme').textContent = theme === 'dark' ? '☀️' : '🌙'; }
$('#theme').onclick = () => { theme = theme === 'dark' ? 'light' : 'dark'; put('aitd_theme', theme); applyTheme(); };
const hints = ['جرب: كتابة', 'جرب: ChatGPT', 'جرب: صور', 'جرب: برمجة', 'جرب: ترجمة', 'جرب: فيديو'];
let hi = 0; const setHint = () => { if(!$('#q').value) $('#q').placeholder = hints[hi++ % hints.length] + ' ...'; };
setHint(); setInterval(setHint, 2500);

applyTheme(); render();
