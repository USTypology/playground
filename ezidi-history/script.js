document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple intersection fade-in for panels (respect reduced motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => { p.style.opacity = '0'; p.style.transform = 'translateY(24px)'; p.style.transition = 'opacity .9s cubic-bezier(.4,0,.2,1), transform .9s cubic-bezier(.4,0,.2,1)'; });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    panels.forEach(p => io.observe(p));
  }
  // Timeline interactive logic
  const track = document.getElementById('timeline-track');
  const detailTitle = document.getElementById('t-detail-title');
  const detailBody = document.getElementById('t-detail-body');
  function activateEvent(btn){
    if(!btn) return;
    track.querySelectorAll('.t-event').forEach(b=> b.classList.toggle('active', b===btn));
    const lang = currentLang;
    const titleKey = btn.getAttribute('data-i18n-title');
    const bodyKey = btn.getAttribute('data-i18n-body');
    detailTitle.textContent = t(lang, titleKey);
    detailBody.textContent = t(lang, bodyKey);
  }
  track?.addEventListener('click', e => {
    const btn = e.target.closest('.t-event');
    if(btn){ activateEvent(btn); }
  });
  // i18n data
  const translations = {
    en: {
      overview_title: 'Overview',
      overview_body: 'The Yazidis (Êzidî) are an ethno-religious minority indigenous to regions of present-day northern Iraq (especially Sinjar and Shekhan), Syria, Turkey, and Armenia, with a growing global diaspora. Their tradition blends ancient Mesopotamian, Zoroastrian, and other West Asian influences, forming a distinct monotheistic faith centered on reverence for God (Xwedê) and seven holy beings.',
      beliefs_title: 'Beliefs & Practices',
      beliefs_li1: 'Monotheistic belief in one Creator (Xwedê).',
      beliefs_li2: 'Veneration of seven archangels; Tawûsê Melek (Peacock Angel) is prominent as a symbol of stewardship and mercy.',
      beliefs_li3: 'Pilgrimage to Lalish, a sacred valley in northern Iraq.',
      beliefs_li4: 'Oral tradition: religious hymns (qewls) and stories transmitted by trained reciters.',
      beliefs_li5: 'Community structures historically organized by caste roles (e.g., sheikhs, pîrs, murids).',
      beliefs_note: 'Mischaracterizations have fueled prejudice; understanding Yazidi theology in its own context is essential for respectful dialogue.',
      timeline_title: 'Brief Historical Timeline',
      t_pre_short: 'Origins',
      t_pre_title: 'Pre-Islamic Roots',
      t_pre_body: 'Roots in ancient Mesopotamian religious landscapes; syncretic development drawing on regional traditions.',
      t_12_short: 'Sheikh Adi',
      t_12_title: '12th–13th Centuries',
      t_12_body: 'Influence of Sheikh Adi ibn Musafir; consolidation of distinct Yazidi identity at Lalish.',
      t_ott_short: 'Ottoman Era',
      t_ott_title: 'Ottoman Period',
      t_ott_body: 'Episodes of persecution, forced conversions, and displacement during imperial campaigns.',
      t_mod_short: 'Modern',
      t_mod_title: '19th–20th Centuries',
      t_mod_body: 'Marginalization, migration, demographic decline in Turkey/Armenia; emerging diaspora.',
      t_2003_short: 'Instability',
      t_2003_title: 'Post 2003 Iraq',
      t_2003_body: 'Security vacuum and extremist violence increased targeted attacks on Yazidi communities.',
      t_2014_short: 'Genocide',
      t_2014_title: '2014 Genocide',
      t_2014_body: 'ISIS assault on Sinjar: mass killings, abductions, sexual slavery, displacement recognized as genocide.',
      g2014_title: '2014 Genocide (Sinjar)',
      g2014_p1: 'In August 2014, ISIS (Islamic State) forces attacked Yazidi communities in the Sinjar (Şingal) region. Thousands were killed or abducted; women and girls were subjected to sexual slavery; boys were forcibly indoctrinated; mass graves were created. The assault displaced an estimated hundreds of thousands, many fleeing to Mount Sinjar where they faced starvation and dehydration before humanitarian corridors were established.',
      g2014_p2: 'International bodies, including the United Nations, the European Parliament, and governments such as the United States, have recognized these acts as genocide. Documentation continues to identify perpetrators, exhume mass graves, and support prosecutions.',
      res_title: 'Community Resilience & Recovery',
      res_li1: 'Survivor advocacy groups documenting abuses and pressing for accountability.',
      res_li2: 'Psychosocial support programs addressing trauma and reintegration.',
      res_li3: 'Efforts to clear landmines / IEDs and rebuild infrastructure in Sinjar.',
      res_li4: 'Education initiatives preserving language (Kurmanji dialect) and oral religious heritage.',
      res_li5: 'Legal reforms in some jurisdictions to recognize genocide survivors\' rights.',
      sup_title: 'How to Support (General Guidance)',
      sup_li1: 'Engage with reputable human rights organizations working on Yazidi recovery.',
      sup_li2: 'Support trauma-informed care and educational scholarships for displaced youth.',
      sup_li3: 'Advocate for continued prosecution of crimes and documentation of mass graves.',
      sup_li4: 'Promote accurate representation to counter harmful stereotypes.',
      sup_note: 'Always vet charities for transparency and effectiveness.',
      src_title: 'Sources & Further Reading',
      src_disclaimer: 'Educational resource only; summarizes complex history—consult specialized literature for depth.',
      footer: 'Yazidi History & Resilience'
    },
    ku: {
      overview_title: 'Pêşoverview',
      overview_body: 'Êzidî (Yazidî) gelêk etnîk û olî ne ku herêmên Başûrê Iraqê, Şengal û Şêxan, Sûriyê, Tirkiyê û Ermenistanê jî navdar in, û di diaspora giştî de mezin dibin. Dîtina wan lê radike di kredaya Mezopotamyayê ya kevnar, Zerdeştî û hwd. derfetên herêmî û îmaneka monoteîstî li ser Xwedê û heft melekên pîroz heye.',
      beliefs_title: 'Baweriya û Rêzên Olî',
      beliefs_li1: 'Baweriya yek Xwedê (Xwedê).',
      beliefs_li2: 'Rêzdan ji heft melek; Tawûsê Melek wekî îkona parastin û dilê pak.',
      beliefs_li3: 'Civîn û ziyareta Lalîşê (cîhê pîroz).',
      beliefs_li4: 'Tradîsyona devkê: qewl û çîrok bi dengê xwendiyarên taybet tê derxistin.',
      beliefs_li5: 'Strûktûrên civakî yên kevn bi rola kastan ve hatine rêvebirin.',
      beliefs_note: 'Têgihiştina olê di konteksta xwe de girîng e da ku têkilîya bi rêz saz bibe.',
      timeline_title: 'Demjimêrka Kurt a Dîrokê',
      t_pre_short: 'Destpêk',
      t_pre_title: 'Rênivîsa Kevn',
      t_pre_body: 'Kokên di kredaya kevn a Mezopotamyayê de; têkildana çavkaniyên herêmî.',
      t_12_short: 'Şêx Adî',
      t_12_title: 'S. 12–13',
      t_12_body: 'Têkiliya Şêx Adî û pêkhatina nasnameya taybet a Êzidiyan di Lalîşê de.',
      t_ott_short: 'Ottoman',
      t_ott_title: 'Demê Osmaniyan',
      t_ott_body: 'Demsalên zordarî, cigirtin û avêtinên cemaetan.',
      t_mod_short: 'Modern',
      t_mod_title: 'S. 19–20',
      t_mod_body: 'Tengkeriya civakî, koçberî û komkujiyên demografîk di Tirkiyê/Ermenistanê de.',
      t_2003_short: 'Eyş û Aşitî',
      t_2003_title: 'Piştî 2003',
      t_2003_body: 'Ne-ewlehiya ewle û zêdebûna tunebûna ewle îxracî ji bo hedefkirina Êzidiyan.',
      t_2014_short: 'Fermandarî',
      t_2014_title: 'Fermandarî ya 2014',
      t_2014_body: 'Hucûma DAIŞê li Şengalê: kuştin, revandin, sexsîndina jinan, koçbûna giştî wekî genosîd tê nasîn.',
      g2014_title: 'Genosîda 2014 (Şengal)',
      g2014_p1: 'Di Tebaxa 2014an de DAIŞ ser Şengalê hucûm kir. Hazarên kes hatin kuştin an revandin; jin û keç hatin sexsîndan; zarok hatin têkoşer kirin; gomên pir anîn. Çend sed hezar koçbûn li Çiyayê Şengalê girêdayî birçîbûn û teskê nehatin berdan heta deriyên alîkariyê vekirin.',
      g2014_p2: 'Lêşkerê Navnetewî û Dewletên cuda ev çalakî wekî genosîd nas kirin û belgekirin berdewam dike.',
      res_title: 'Berxwedan û Veger',
      res_li1: 'Komên şehîdan belgekirin û daxwaza dadgeriyê dikin.',
      res_li2: 'Alîkarîya pisixolojî û vegerandina civakî.',
      res_li3: 'Pakjîna mîn û îed û ava jinûve ya infrastûkturê li Şengalê.',
      res_li4: 'Parastina zimên Kurmancî û hevpeyvîna devkê.',
      res_li5: 'Reforma qanûnî ji bo mafên xelasbûyan.',
      sup_title: 'Çawa Alîkariyê Bikin',
      sup_li1: 'Bi rêxistinên mafên mirovan yên ewle zêde bibin.',
      sup_li2: 'Destekê ji bo tomanşînî ya li ser şeran û perwerdeya xwendekarên koçbûyî.',
      sup_li3: 'Berdawamîya dadgerriya li dijî tawan û belgekirina gomên hevpar.',
      sup_li4: 'Rexnekirina îmajên ne rast û belavkirina li şêwaza rast.',
      sup_note: 'Her dem rêxistinên xêrê kontrol bikin.',
      src_title: 'Çavkanî û Xwendina Zêde',
      src_disclaimer: 'Çavkaniyeke perwerdeyî ye; dîroka tevlihev kurt dike—ji bo kûrteyê çavkaniyên taybet bixwînin.',
      footer: 'Dîroka û Berxwedana Êzidiyan'
    }
  };
  function t(lang, key){ return (translations[lang] && translations[lang][key]) || translations.en[key] || key; }
  let currentLang = 'en';
  const langBtns = document.querySelectorAll('.lang-btn');
  function applyTranslations(){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      el.textContent = t(currentLang, k);
    });
    // timeline detail current active refresh
    const active = track?.querySelector('.t-event.active') || track?.querySelector('.t-event');
    if(active) activateEvent(active);
  }
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if(lang && lang !== currentLang){
        currentLang = lang;
        langBtns.forEach(b=> b.classList.toggle('active', b===btn));
        applyTranslations();
      }
    });
  });
  // Initialize timeline active state
  const firstEvent = track?.querySelector('.t-event');
  if(firstEvent){ firstEvent.classList.add('active'); }
  activateEvent(firstEvent);
});
