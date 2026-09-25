// ============================================================
// Limu Kosa Woreda – Comprehensive UI Translations
// Languages: English (en), Amharic (am), Afaan Oromoo (om)
// ============================================================

export type LangCode = 'en' | 'am' | 'om';

export const translations = {
  // ── Navigation ──────────────────────────────────────────
  'nav.home':          { en: 'Home',         am: 'መነሻ',         om: 'Mana' },
  'nav.about':         { en: 'About',        am: 'ስለ እኛ',       om: "Waa'ee Keenya" },
  'nav.departments':   { en: 'Departments',  am: 'መምሪያዎች',     om: 'Waajjiraalee' },
  'nav.leadership':    { en: 'Leadership',   am: 'አመራር',        om: 'Hooggansa' },
  'nav.news':          { en: 'News',         am: 'ዜና',          om: 'Oduu' },
  'nav.projects':      { en: 'Projects',     am: 'ፕሮጀክቶች',     om: 'Pirojektootaa' },
  'nav.tourism':       { en: 'Tourism',      am: 'ቱሪዝም',        om: 'Turizimii' },
  'nav.gallery':       { en: 'Gallery',      am: 'ፎቶ ማዕከል',    om: 'Fakkii' },
  'nav.contact':       { en: 'Contact',      am: 'ያግኙን',        om: 'Nu Quunnamaa' },

  // ── Common / Shared ──────────────────────────────────────
  'common.readMore':       { en: 'Read more',        am: 'ተጨማሪ ያንብቡ',     om: 'Dabalate dubbisi' },
  'common.viewAll':        { en: 'View all',          am: 'ሁሉንም ይመልከቱ',   om: 'Hunda ilaali' },
  'common.viewOffice':     { en: 'View office',       am: 'ቢሮ ይመልከቱ',     om: 'Waajjira ilaali' },
  'common.backTo':         { en: 'Back to',           am: 'ወደ',              om: 'Deebi\'i' },
  'common.learnMore':      { en: 'Learn more',        am: 'ተጨማሪ ይወቁ',     om: 'Dabalate baradhu' },
  'common.explore':        { en: 'Explore',           am: 'ያስሱ',             om: 'Qoradhu' },
  'common.download':       { en: 'Download',          am: 'ያውርዱ',            om: 'Buusi' },
  'common.published':      { en: 'Published',         am: 'ታትሟል',           om: 'Maxxanfame' },
  'common.draft':          { en: 'Draft',             am: 'ረቂቅ',             om: 'Qormaata' },
  'common.loading':        { en: 'Loading...',        am: 'እየጫነ ነው...',     om: 'Fe\'aa jira...' },
  'common.noItems':        { en: 'No items found.',   am: 'ምንም አልተገኘም።',   om: 'Wanti hin argamne.' },
  'common.darkMode':       { en: 'Dark Mode',         am: 'ጨለማ ሁነታ',       om: 'Haala Dukkana' },
  'common.lightMode':      { en: 'Light Mode',        am: 'ብርሃን ሁነታ',      om: 'Haala Ifa' },
  'common.all':            { en: 'All',                am: 'ሁሉም',             om: 'Hunda' },
  'common.general':        { en: 'General',            am: 'አጠቃላይ',          om: 'Waliigala' },
  'common.contactOffice':  { en: 'Contact office',    am: 'ቢሮውን ያግኙ',      om: 'Waajjira quunnamaa' },

  // ── Homepage Hero Slider ─────────────────────────────────
  'hero.slide1.tagline':     { en: 'Jimma Zone · Oromia, Ethiopia',              am: 'ጅማ ዞን · ኦሮሚያ፣ ኢትዮጵያ',                       om: 'Godina Jimmaa · Oromiyaa, Itoophiyaa' },
  'hero.slide1.title':       { en: 'Limu Kosa Coffee Heritage',                  am: 'የሊሙ ኮሳ ቡና ቅርስ',                              om: 'Dhaalaa Buna Limu Kossaa' },
  'hero.slide1.description': { en: 'A public portal rooted in the woreda\'s shade-grown Arabica coffee, forests, agriculture, and community service.', am: 'በወረዳው ጥላ-ቡና፣ ደኖች፣ ግብርና እና የማህበረሰብ አገልግሎት ላይ የተመሰረተ የህዝብ ፖርታል።', om: 'Kutaa argannoo buna Arabika, bosonaa, qonnaa fi tajaajila hawaasaa irratti hundaa\'ame.' },
  'hero.slide1.primary':     { en: 'Explore tourism',    am: 'ቱሪዝም ያስሱ',   om: 'Turizimii qoradhu' },

  'hero.slide2.tagline':     { en: 'Official public information portal',         am: 'ይፋዊ የህዝብ መረጃ ፖርታል',                          om: 'Kutaa odeeffannoo ummataa mootummaa' },
  'hero.slide2.title':       { en: 'Limu Kosa Woreda Administration',            am: 'የሊሙ ኮሳ ወረዳ አስተዳደር',                          om: 'Bulchiinsa Aanaa Limu Kossaa' },
  'hero.slide2.description': { en: 'Follow government updates, public notices, development work, departments, documents, and local opportunities.', am: 'የመንግስት ዜናዎችን፣ የህዝብ ማስታወቂያዎችን፣ ልማት ስራዎችን፣ መምሪያዎችን፣ ሰነዶችን እና የሀገር ውስጥ እድሎችን ይከታተሉ።', om: 'Beeksisa mootummaa, waamicha ummataa, hojii guddinaa, waajjiraalee, sanadoota fi carraalee naannoo hordofi.' },
  'hero.slide2.primary':     { en: 'Learn more',         am: 'ተጨማሪ ይወቁ',   om: 'Dabalate baradhu' },

  'hero.slide3.tagline':     { en: 'Forests, valleys, and rural communities',   am: 'ደኖች፣ ሸለቆዎች እና የገጠር ማህበረሰቦች',                om: 'Bosonni, gaarreen fi hawaasni baadiyyaa' },
  'hero.slide3.title':       { en: 'Nature, Culture, and Development',           am: 'ተፈጥሮ፣ ባህል እና ልማት',                           om: 'Uumamaa, Aadaa fi Guddinaa' },
  'hero.slide3.description': { en: 'Discover protected forests, local tourism resources, investment potential, public offices, and community-centered administration.', am: 'የተጠበቁ ደኖችን፣ የሀገር ውስጥ ቱሪዝም ሀብቶችን፣ የኢንቨስትመንት አቅምን፣ የህዝብ ጽሕፈት ቤቶችን እና ማህበረሰብ ያማከለ አስተዳደርን ያግኙ።', om: 'Bosona eegamaa, qabeenya turizimii naannoo, dandeettii maallaqaa, waajjiraalee ummataa fi bulchiinsa hawaasa-giddugaleessa argadhu.' },
  'hero.slide3.primary':     { en: 'View investment',    am: 'ኢንቨስትመንት ይመልከቱ', om: 'Maallaqaa ilaali' },

  'hero.slide4.tagline':     { en: 'Eco-tourism and natural preservation',       am: 'ስነ-ምህዳር ቱሪዝም እና የተፈጥሮ ጥበቃ',               om: 'Eco-turizimii fi kunuunsa uumamaa' },
  'hero.slide4.title':       { en: 'Nature and Community Care',                  am: 'ተፈጥሮ እና የህብረተሰብ እንክብካቤ',                    om: 'Uumamaa fi Kunuunsa Hawaasaa' },
  'hero.slide4.description': { en: 'Explore protected high-biodiversity montane forests, community beehives, and wild coffee preservation initiatives.', am: 'የተጠበቁ ከፍተኛ ብዝሃ-ሕይወት ያላቸው ተራራ ደኖችን፣ የማህበረሰብ ንብ ቤቶችን እና የዱር ቡና ጥበቃ ተሳሳቢዎችን ያስሱ።', om: 'Bosona gaara biodiversity ol\'aanaa eegamaa, kuusaa dammaa hawaasaa fi tattaaffii tikfama buna bosonaa qoradhu.' },
  'hero.slide4.primary':     { en: 'Explore tourism',    am: 'ቱሪዝም ያስሱ',   om: 'Turizimii qoradhu' },

  // ── Homepage Sections ────────────────────────────────────
  'home.quickLinks.title':     { en: 'Quick Access',               am: 'ፈጣን መዳረሻ',          om: 'Seensa Ariifataa' },
  'home.quickLinks.subtitle':  { en: 'Navigate key services and information of Limu Kosa Woreda.', am: 'የሊሙ ኮሳ ወረዳ ዋና አገልግሎቶችን እና ትምህርቶችን ያስሱ።', om: 'Tajaajilawwan fi odeeffannoo ijoo Aanaa Limu Kossaa qoradhu.' },
  'home.ql.departments':       { en: 'Departments',                am: 'መምሪያዎች',             om: 'Waajjiraalee' },
  'home.ql.departments.desc':  { en: 'Sector offices and public responsibilities.', am: 'የዘርፍ ቢሮዎች እና የህዝብ ሃላፊነቶች።', om: 'Waajjiraalee damee fi itti-gaafatamummaa ummataa.' },
  'home.ql.investment':        { en: 'Investment',                 am: 'ኢንቨስትመንት',          om: 'Maallaqaa' },
  'home.ql.investment.desc':   { en: 'Coffee, agriculture, tourism, and enterprise opportunities.', am: 'ቡና፣ ግብርና፣ ቱሪዝም እና የድርጅት እድሎች።', om: 'Buna, qonnaa, turizimii fi carraalee daldala.' },
  'home.ql.news':              { en: 'Latest News',                am: 'የቅርብ ዜናዎች',         om: 'Oduu Haaraa' },
  'home.ql.news.desc':         { en: 'Woreda updates, public notices, and announcements.', am: 'የወረዳ ዝማኔዎች፣ የህዝብ ማስታወቂያዎች።', om: 'Haaromsa aanaa, beeksisaa fi waamicha ummataa.' },
  'home.ql.tourism':           { en: 'Tourism',                    am: 'ቱሪዝም',               om: 'Turizimii' },
  'home.ql.tourism.desc':      { en: 'Forests, eco-sites, and community heritage.', am: 'ደኖች፣ ስነ-ምህዳር ቦታዎች እና የማህበረሰብ ቅርስ።', om: 'Bosonni, iddoowwan eco fi dhaalaa hawaasaa.' },

  'home.stats.title':          { en: 'Woreda at a glance',         am: 'ወረዳ በአጭሩ',           om: 'Aanaa bal\'inaan' },
  'home.stats.subtitle':       { en: 'Key facts and figures about Limu Kosa Woreda.', am: 'ስለ ሊሙ ኮሳ ወረዳ ዋና እውነታዎች እና መረጃዎች።', om: 'Dhugaalee fi lakkoofsiiwwan ijoo Aanaa Limu Kossaa.' },

  'home.news.title':           { en: 'Latest News & Announcements', am: 'የቅርብ ዜናዎች እና ማስታወቂያዎች', om: 'Oduu fi Beeksisa Haaraa' },
  'home.news.subtitle':        { en: 'Stay updated with the latest from Limu Kosa Woreda.', am: 'ከሊሙ ኮሳ ወረዳ የቅርብ ዜናዎችን ያስሱ።', om: 'Oduu haaraa Aanaa Limu Kossaa hordofi.' },
  'home.news.viewAll':         { en: 'View all news',              am: 'ሁሉንም ዜናዎች ይመልከቱ', om: 'Oduu hunda ilaali' },

  'home.projects.title':       { en: 'Development Projects',       am: 'የልማት ፕሮጀክቶች',       om: 'Pirojektootaa Guddinaa' },
  'home.projects.subtitle':    { en: 'Ongoing and completed development initiatives in the woreda.', am: 'በወረዳው ውስጥ ያሉ ቀጣይ እና የተጠናቀቁ የልማት ተሳሳቢዎች።', om: 'Tattaaffii guddinaa itti-fufaa fi xumuramee aanaa keessatti.' },
  'home.projects.viewAll':     { en: 'View all projects',          am: 'ሁሉንም ፕሮጀክቶች ይመልከቱ', om: 'Pirojektootaa hunda ilaali' },

  'home.tourism.title':        { en: 'Tourism Highlights',         am: 'የቱሪዝም ጎላ ያሉ ቦታዎች',  om: 'Bakkeewwan Turizimii Beekamoo' },
  'home.tourism.subtitle':     { en: 'Natural and cultural attractions in Limu Kosa.', am: 'በሊሙ ኮሳ ውስጥ ያሉ ተፈጥሯዊ እና ባህላዊ መስህቦች።', om: 'Meeshaalee uumamaa fi aadaa Limu Kossaa keessa jiran.' },
  'home.tourism.viewAll':      { en: 'View all tourism sites',     am: 'ሁሉንም የቱሪዝም ቦታዎች ይመልከቱ', om: 'Iddoowwan turizimii hunda ilaali' },

  // ── About Page ───────────────────────────────────────────
  'about.eyebrow':       { en: 'History, mission, and values',    am: 'ታሪክ፣ ተልዕኮ እና እሴቶች',       om: 'Seenaa, ergama fi gatii' },
  'about.title':         { en: 'About Limu Kosa Woreda',          am: 'ስለ ሊሙ ኮሳ ወረዳ',              om: "Waa'ee Aanaa Limu Kossaa" },
  'about.description':   { en: 'Limu Kosa is a historically rich woreda in Jimma Zone, Oromia, Ethiopia — known for its wild-origin shade-grown Arabica coffee, high-altitude forests, and agricultural economy.', am: 'ሊሙ ኮሳ በጅማ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ ውስጥ ታሪካዊ ሀብት ያለው ወረዳ ነው - ለዱር ጥላ-ቡናው፣ ከፍተኛ ደኖቹ እና ግብርና ኢኮኖሚው የሚታወቅ።', om: 'Limu Kossaan aanaa seenaa qabeessa Godina Jimmaa, Oromiyaa, Itoophiyaa keessa jirtu - buna Arabika bosonaa, bosonaa ol\'aanaa fi dinagdee qonnaa isaatiin beekamtu.' },
  'about.intro1':        { en: 'Limu Kosa is one of the woredas in Jimma Zone of Oromia Region, Ethiopia. Its identity is tied to the historic Limmu-Ennarea kingdom, highland and midland farming systems, protected montane forests, and coffee-centered livelihoods.', am: 'ሊሙ ኮሳ በጅማ ዞን፣ ኦሮሚያ ክልል፣ ኢትዮጵያ ውስጥ ካሉ ወረዳዎች አንዱ ነው። መታወቂያው ከታሪካዊው የሊሙ-ኤናሪያ መንግስት፣ የተራራ እና ደጋ ግብርና ስርዓቶች፣ የተጠበቁ ደኖች እና በቡና ላይ የተመሰረተ ህይወት ጋር የተያያዘ ነው።', om: 'Limu Kossaan aanaa Godina Jimmaa, Oromiyaa, Itoophiyaa keessaa isa tokkodha. Eenyummaan isaa mootummaa seenaa Limmu-Ennaariyaa, sirna qonnaa gaaraa fi baddaa, bosona eegamaa fi jireenya bunaa irratti hundaa\'eetti hidhata.' },
  'about.intro2':        { en: 'The woreda includes river basins, valleys, hills, forest areas, rural kebeles, and urban centers. Coffee, mixed farming, livestock, forest resources, and community institutions remain central to local development.', am: 'ወረዳው የወንዝ ተፋሰሶችን፣ ሸለቆዎችን፣ ኮረብታዎችን፣ የደን ቦታዎችን፣ የገጠር ቀበሌዎችን እና የከተማ ማዕከላትን ያካትታል። ቡና፣ የተቀናጀ ግብርና፣ እንስሳት፣ የደን ሀብቶች እና የማህበረሰብ ተቋማት ለሀገር ውስጥ ልማት ዋና ተፈላጊዎች ናቸው።', om: 'Aanichis sulula lagaa, gaarreen, bosona, ganda baadiyyaa fi magaalota dabalata. Buna, qonnaa makamaa, beeylada, qabeenya bosonaa fi dhaabbileen hawaasaa misooma naannoof murteessoodha.' },
  'about.profile.region':          { en: 'Region',                 am: 'ክልል / ዞን',            om: 'Naannoo / Godina' },
  'about.profile.regionVal':       { en: 'Jimma Zone, Oromia',     am: 'ጅማ ዞን፣ ኦሮሚያ',        om: 'Godina Jimmaa, Oromiyaa' },
  'about.profile.center':          { en: 'Administrative center',  am: 'አስተዳደር ማዕከል',      om: 'Mootummaa Giddugala' },
  'about.profile.area':            { en: 'Area',                   am: 'የስፋት መጠን',           om: 'Bal\'ina Lafa' },
  'about.profile.elevation':       { en: 'Elevation',              am: 'ከፍታ (ከባህር ወለል በላይ)', om: 'Ol\'aantummaa' },
  'about.profile.kebeles':         { en: 'Kebeles',                am: 'ቀበሌዎች',               om: 'Gandaa' },
  'about.profile.kebelesVal':      { en: '40 rural and 4 urban',   am: '40 የገጠር እና 4 የከተማ',   om: '40 Baadiyyaa fi 4 Magaalaa' },
  'about.profile.pop':             { en: 'Projected population',   am: 'የተገመተው ህዝብ',        om: 'Ummatni Tilmaamame' },
  'about.history.title':           { en: 'History and identity',   am: 'ታሪክ እና መታወቂያ',        om: 'Seenaa fi Eenyummaa' },
  'about.history.subtitle':        { en: 'The name and administration reflect both historical kingdom roots and local geographic identity.', am: 'ስሙ እና አስተዳደሩ ታሪካዊ የመንግስት ስሮች እና የሀገር ውስጥ ጂኦግራፊያዊ መታወቂያን ያንጸባርቃሉ።', om: 'Maqaan fi bulchiinsi hidda mootummaa seenaa fi eenyummaa lafa naannoo agarsiisa.' },
  'about.climate.title':           { en: 'Climate and landscape',  am: 'አየር ንብረት እና መሬት',      om: 'Qilleensa fi Lafa' },
  'about.climate.desc':            { en: 'Limu Kosa includes dega, woina dega, and kola agro-ecological zones. Seasonal rainfall, varied elevation, and forest systems support coffee, cereals, livestock, fruits, sugar cane, honey, and natural resource livelihoods.', am: 'ሊሙ ኮሳ ደጋ፣ ወይና ደጋ እና ቆላ አግሮ-ኢኮሎጂካል ዞኖችን ያካትታል። ወቅታዊ ዝናብ፣ የተለያየ ከፍታ እና የደን ስርዓቶች ቡናን፣ እህልን፣ እንስሳትን፣ ፍራፍሬዎችን፣ ሸንኮራ አገዳን፣ ማርን እና የተፈጥሮ ሀብት ህይወትን ይደግፋሉ።', om: 'Limu Kossaan baddaa, baddadaree fi gammoojjii dabalata. Rooba yeroo, ol\'aantummaa garaagaraa fi bosonaan buna, midhaan, beeylada, fuduraa, shonkora, damma fi jireenya qabeenya uumamaa deeggara.' },
  'about.economy.title':           { en: 'Economy',                am: 'ኢኮኖሚ',                 om: 'Dinagdee' },
  'about.people.title':            { en: 'People and society',     am: 'ህዝብ እና ህብረተሰብ',        om: 'Ummata fi Hawaasa' },
  'about.people.desc':             { en: 'Oromo is the largest community and Afaan Oromoo is the leading local language. The woreda is also home to Amhara, Kullo, Kafficho, Tigrayan, and other communities, with Muslim and Christian residents contributing to local society.', am: 'ኦሮሞ ትልቁ ማህበረሰብ ሲሆን አፋን ኦሮሞ ዋነኛው የሀገር ውስጥ ቋንቋ ነው። ወረዳው ለአማራ፣ ኩሎ፣ ካፊቾ፣ ትግራይ እና ሌሎች ማህበረሰቦች መኖሪያ ሲሆን ሙስሊም እና ክርስቲያን ነዋሪዎች ለሀገር ውስጥ ህብረተሰብ አስተዋጽኦ ያደርጋሉ።', om: 'Oromoon hawaasa isa guddaa fi Afaan Oromoo afaan naannoo isa ijoodha. Aanichi Amhara, Kullo, Kafficho, Tigrayan fi hawaasa biroofis mana yoo ta\'u, jiraattotni Musliimaa fi Kiristaanaa hawaasa naannoof gumaacha godhu.' },
  'about.vision.title':            { en: 'Vision and values',      am: 'ራዕይ እና እሴቶች',          om: 'Mul\'ata fi Gatii' },
  'about.vision.desc':             { en: 'The public portal supports transparent, inclusive, and development-focused administration.', am: 'የህዝብ ፖርታሉ ግልጽ፣ አካታች እና ልማት ተኮር አስተዳደርን ይደግፋል።', om: 'Kutaa argannoo ummataa bulchiinsa iftoomina, dabalataa fi guddinaa irratti xiyyeeffate deeggara.' },

  // ── Departments Page ─────────────────────────────────────
  'departments.eyebrow':     { en: 'Public governance and sector offices', am: 'የህዝብ አስተዳደር እና የዘርፍ ቢሮዎች', om: 'Bulchiinsa ummataa fi waajjiraalee damee' },
  'departments.title':       { en: 'Government Departments',              am: 'የመንግስት መምሪያዎች',              om: 'Waajjiraalee Mootummaa' },
  'departments.description': { en: 'Sector offices responsible for public service coordination, development planning, natural resources, social services, and citizen communication.', am: 'ለህዝብ አገልግሎት ማስተባበር፣ የልማት እቅድ፣ ተፈጥሮ ሀብቶች፣ ማህበራዊ አገልግሎቶች እና የዜጎች ግንኙነት ሃላፊ የሆኑ የዘርፍ ቢሮዎች።', om: 'Waajjiraalee damee koordineeshinii tajaajila ummataa, karoora guddinaa, qabeenya uumamaa, tajaajilawwan hawaasaa fi komunikeeshiniif itti-gaafataman.' },
  'departments.directory':   { en: 'Core sector directory',               am: 'ዋና የዘርፍ ማውጫ',               om: 'Galmee damee ijoo' },
  'departments.listed':      { en: 'Listed offices',                       am: 'ዝርዝር ቢሮዎች',                 om: 'Waajjiraalee galmaa\'e' },

  // ── Department Detail Page ───────────────────────────────
  'deptDetail.portal':        { en: 'Department portal',             am: 'የመምሪያ ፖርታል',            om: 'Kutaa Waajjiraa' },
  'deptDetail.backTo':        { en: 'Back to departments',           am: 'ወደ መምሪያዎች ተመለስ',        om: 'Gara waajjiraሌetti deebi\'i' },
  'deptDetail.responsibilities': { en: 'Public responsibilities',    am: 'የህዝብ ሃላፊነቶች',           om: 'Itti-gaafatamummaa Ummataa' },
  'deptDetail.programs':      { en: 'Major programs',                am: 'ዋና ፕሮግራሞች',            om: 'Sagantaalee Ijoo' },
  'deptDetail.contactChannel':{ en: 'Contact channel',              am: 'የግንኙነት መስመር',          om: 'Karaa Quunnamsaa' },

  // ── Leadership Page ──────────────────────────────────────
  'leadership.eyebrow':      { en: 'Woreda officials and elected leaders', am: 'የወረዳ ባለስልጣናት እና የተመረጡ መሪዎች', om: 'Hooggantoota aanaa fi filataman' },
  'leadership.title':        { en: 'Leadership & Officials',               am: 'አመራር እና ባለስልጣናት',            om: 'Hooggansa fi Hooggantoota' },
  'leadership.description':  { en: 'Meet the elected officials and department heads responsible for governance, public service delivery, and development coordination in Limu Kosa Woreda.', am: 'ለሊሙ ኮሳ ወረዳ አስተዳደር፣ የህዝብ አገልግሎት አቅርቦት እና የልማት ማስተባበር ሃላፊ የሆኑ የተመረጡ ባለስልጣናትን እና የመምሪያ ሃላፊዎችን ይቀበሉ።', om: 'Bulchiinsa, dhiyeessii tajaajila ummataa fi koordineeshiniif Aanaa Limu Kossaa itti-gaafataman hooggantoota filataman fi deetota waajjiraalee simadhu.' },

  // ── News Page ────────────────────────────────────────────
  'news.eyebrow':        { en: 'Woreda updates and reports',        am: 'የወረዳ ዝማኔዎች እና ሪፖርቶች',    om: 'Haaromsa fi gabaasa aanaa' },
  'news.title':          { en: 'News & Updates',                    am: 'ዜናዎች እና ዝማኔዎች',            om: 'Oduu fi Haaromsa' },
  'news.description':    { en: 'The latest news, announcements, and development updates from Limu Kosa Woreda administration.', am: 'ከሊሙ ኮሳ ወረዳ አስተዳደር የቅርብ ዜናዎች፣ ማስታወቂያዎች እና የልማት ዝማኔዎች።', om: 'Oduu haaraa, beeksisa fi haaromsa guddinaa bulchiinsa Aanaa Limu Kossaa irraa.' },
  'news.readFull':       { en: 'Read full article',                 am: 'ሙሉውን ጽሑፍ ያንብቡ',         om: 'Barruu guutuu dubbisi' },
  'news.empty':          { en: 'No news articles found under this section.', am: 'በዚህ ክፍል ስር ምንም የዜና ጽሑፎች አልተገኙም።', om: 'Kutaa kana keessatti oduun hin argamne.' },

  // ── News Detail Page ─────────────────────────────────────
  'newsDetail.notFound':    { en: 'Article Not Found',              am: 'ጽሑፉ አልተገኘም',             om: 'Barruun Hin Argamne' },
  'newsDetail.notFoundDesc':{ en: 'The article you are searching for does not exist or has been modified.', am: 'የሚፈልጉት ጽሑፍ የለም ወይም ተሻሽሏል።', om: 'Barruun barbaaddan hin jiru ykn jijjiirameera.' },
  'newsDetail.backTo':      { en: 'Back to News Updates',           am: 'ወደ ዜና ዝማኔዎች ተመለስ',       om: 'Gara oduutti deebi\'i' },
  'newsDetail.category':    { en: 'Category',                       am: 'ምድብ',                   om: 'Kutaa' },

  // ── Projects Page ────────────────────────────────────────
  'projects.eyebrow':    { en: 'Development and infrastructure',    am: 'ልማት እና መሰረተ ልማት',          om: 'Guddinaa fi misooma bu\'uuraa' },
  'projects.title':      { en: 'Development Projects',              am: 'የልማት ፕሮጀክቶች',               om: 'Pirojektootaa Guddinaa' },
  'projects.description':{ en: 'Ongoing and completed public infrastructure, agricultural, and social development projects across Limu Kosa Woreda.', am: 'ሁሉም የሊሙ ኮሳ ወረዳ ሁሉ-አቀፍ ቀጣይ እና የተጠናቀቁ የህዝብ መሰረተ ልማት፣ ግብርና እና ማህበራዊ ልማት ፕሮጀክቶች።', om: 'Pirojektootaa bu\'uuraa ummataa, qonnaa fi guddinaa hawaasaa aanaa Limu Kossaa guutuu itti-fufaa fi xumuramee.' },
  'projects.viewTrack':  { en: 'View project track details',        am: 'የፕሮጀክት ዝርዝሮችን ይመልከቱ',    om: 'Tarree pirojektootaa ilaali' },

  // ── Project Detail Page ──────────────────────────────────
  'projectDetail.notFound':     { en: 'Project Record Not Found',      am: 'የፕሮጀክት መዝገብ አልተገኘም',      om: 'Galmee Pirojektootaa Hin Argamne' },
  'projectDetail.notFoundDesc': { en: 'The development map layout you seek does not exist or has moved.', am: 'የሚፈልጉት የልማት ካርታ የለም ወይም ተዛውሯል።', om: 'Kaartaan guddinaa barbaaddan hin jiru.' },
  'projectDetail.backTo':       { en: 'Back to Development Projects',  am: 'ወደ ልማት ፕሮጀክቶች ተመለስ',       om: 'Gara pirojektootaatti deebi\'i' },
  'projectDetail.currentStatus':{ en: 'Current Status',                am: 'የአሁኑ ሁኔታ',              om: 'Haala Ammee' },
  'projectDetail.location':     { en: 'Location',                      am: 'ቦታ / አድራሻ',             om: 'Bakka' },
  'projectDetail.overview':     { en: 'Official development implementation progress overview tracking data.', am: 'ይፋዊ የልማት ትግበራ እድገት እይታ መረጃ።', om: 'Ragaa hordoffii misooma mootummaa.' },

  // ── Gallery Page ─────────────────────────────────────────
  'gallery.eyebrow':     { en: 'Photos from the woreda',            am: 'ከወረዳ ፎቶዎች',                  om: 'Suuraalee aanaa irraa' },
  'gallery.title':       { en: 'Photo Gallery',                      am: 'ፎቶ ማዕከል',                     om: 'Kuusaa Suuraa' },
  'gallery.description': { en: 'Images from community programs, development projects, nature sites, and local events in Limu Kosa.', am: 'ከሊሙ ኮሳ ማህበረሰብ ፕሮግራሞች፣ የልማት ፕሮጀክቶች፣ የተፈጥሮ ቦታዎች እና የሀገር ውስጥ ዝግጅቶች ፎቶዎች።', om: 'Suuraalee sagantaalee hawaasaa, pirojektootaa guddinaa, iddoowwan uumamaa fi taateewwan naannoo Limu Kossaa irraa.' },
  'gallery.empty':       { en: 'No images found',                   am: 'ምንም ፎቶዎች አልተገኙም',          om: 'Suuraan hin argamne' },
  'gallery.emptyDesc':   { en: 'Official photo records will be shown once they are published by the admin.', am: 'ይፋዊ የፎቶ መዝገቦች በአስተዳዳሪው ሲታተሙ ይታያሉ።', om: 'Suuraan mootummaa yeroo maxxanfamu ni mul\'ata.' },

  // ── Announcements Page ───────────────────────────────────
  'announcements.eyebrow':    { en: 'Public notices',               am: 'የህዝብ ማስታወቂያዎች',             om: 'Beeksisaalee ummataa' },
  'announcements.title':      { en: 'Announcements',                am: 'ማስታወቂያዎች',                   om: 'Beeksisaalee' },
  'announcements.description':{ en: 'Important notices for public meetings, office updates, community events, investment information, and emergency communication.', am: 'ለህዝብ ስብሰባዎች፣ የቢሮ ዝማኔዎች፣ የማህበረሰብ ዝግጅቶች፣ የኢንቨስትመንት መረጃ እና ድንገተኛ ግንኙነት ዋና ማስታወቂያዎች።', om: 'Beeksisaalee ijoo walga\'ii ummataa, haaromsa waajjiraa, taateewwan hawaasaa, odeeffannoo maallaqaa fi komunikeeshiniif hatattamaa.' },

  // ── Contact Page ─────────────────────────────────────────
  'contact.eyebrow':       { en: 'Get in touch with us',            am: 'ከእኛ ጋር ያወሩ',                 om: 'Nu quunnamuu' },
  'contact.title':         { en: 'Contact Us',                       am: 'ያግኙን',                        om: 'Nu Quunnamaa' },
  'contact.description':   { en: 'Reach out to Limu Kosa Woreda Administration for inquiries, feedback, public services, or partnerships.', am: 'ለጥያቄዎች፣ ምላሾች፣ የህዝብ አገልግሎቶች ወይም አጋርነት ሊሙ ኮሳ ወረዳ አስተዳደርን ያግኙ።', om: 'Gaaffii, deebii, tajaajilawwan ummataa ykn tokkummaa wajjin bulchiinsa Aanaa Limu Kossaa quunnamaa.' },
  'contact.mainOffice':    { en: 'Main office',                      am: 'ዋና ቢሮ',                       om: 'Waajjira Ijoo' },
  'contact.formTitle':     { en: 'Send Us a Direct Message',        am: 'ቀጥታ መልዕክት ይላኩልን',           om: 'Ergaa Kallattii Nuuf Ergaa' },
  'contact.formSubtitle':  { en: 'We typically respond within 24 hours', am: 'በ24 ሰዓት ውስጥ ምላሽ እንሰጣለን', om: "Sa'aatii 24 keessatti deebii kennina" },
  'contact.name':          { en: 'Full Name',                        am: 'ሙሉ ስም',                       om: 'Maqaa Guutuu' },
  'contact.email':         { en: 'Email Address',                    am: 'የኢሜይል አድራሻ',                 om: 'Teessoo Imeelii' },
  'contact.subject':       { en: 'Subject',                          am: 'ርዕሰ ጉዳይ',                     om: 'Mata-duree' },
  'contact.message':       { en: 'Message',                          am: 'መልዕክት',                        om: 'Ergaa' },
  'contact.send':          { en: 'Send Message',                     am: 'መልዕክት ይላኩ',                   om: 'Ergaa Ergi' },
  'contact.privacy':       { en: 'We respect your privacy',          am: 'ምስጢርዎን እንጠበቃለን',            om: 'Iccitii keessan ni eegna' },
  'contact.success':       { en: 'Your message has been sent successfully!', am: 'መልዕክትዎ በተሳካ ሁኔታ ተልኳል!', om: 'Ergaan keessan milkaa\'inaan ergameera!' },
  'contact.fillAll':       { en: 'Please fill out all fields.',      am: 'እባክዎን ሁሉንም ቦታዎች ይሙሉ',       om: 'Maaloo bakka hunda guutaa' },

  // ── Tourism Page ─────────────────────────────────────────
  'tourism.eyebrow':      { en: 'Nature, heritage, and eco-tourism', am: 'ተፈጥሮ፣ ቅርስ እና ስነ-ምህዳር ቱሪዝም', om: 'Uumamaa, dhaalaa fi eco-turizimii' },
  'tourism.title':        { en: 'Tourism & Heritage',                am: 'ቱሪዝም እና ቅርስ',                om: 'Turizimii fi Dhaalaa' },
  'tourism.description':  { en: 'Discover Limu Kosa\'s natural wonders, eco-tourism sites, cultural heritage, and community-based tourism initiatives.', am: 'የሊሙ ኮሳ ተፈጥሮ ድንቆችን፣ ስነ-ምህዳር ቱሪዝም ቦታዎችን፣ ባህላዊ ቅርስን እና ማህበረሰብ ያማከለ የቱሪዝም ተሳሳቢዎችን ያግኙ።', om: 'Dinqii uumamaa Limu Kossaa, iddoowwan eco-turizimii, dhaalaa aadaa fi tattaaffii turizimii hawaasa-giddugaleessa argadhu.' },

  // ── Investment Page ──────────────────────────────────────
  'investment.eyebrow':   { en: 'Business and economic opportunity', am: 'የንግድ እና ኢኮኖሚ እድል',           om: 'Carraa daldala fi dinagdee' },
  'investment.title':     { en: 'Investment Opportunities',          am: 'የኢንቨስትመንት እድሎች',             om: 'Carraalee Maallaqaa' },
  'investment.description':{ en: 'Explore investment opportunities in Limu Kosa Woreda — from coffee, agriculture, and eco-tourism to agro-processing and rural enterprise.', am: 'ከቡና፣ ግብርና፣ ስነ-ምህዳር ቱሪዝም እስከ ግብርና-ሂደት እና የገጠር ድርጅት ድረስ ባሉ ኢንቨስትመንት እድሎችን ያስሱ።', om: 'Carraalee maallaqaa Aanaa Limu Kossaa - buna, qonnaa fi eco-turizimii hanga dalagaa qonnaa fi daldala baadiyyaa qoradhu.' },
  'investment.procedureTitle': { en: 'Investment procedure support', am: 'የኢንቨስትመንት ሂደት ድጋፍ',     om: 'Deeggarsa Adeemsa Maallaqaa' },
  'investment.procedureDesc':  { en: 'This site provides public investment information. Investor submissions, licensing guidance, and authenticated services can be handled through our Trade & Industry office.', am: 'ይህ ጣቢያ የህዝብ ኢንቨስትመንት መረጃ ይሰጣል። የኢንቨስተር ማመልከቻዎች፣ ፈቃድ አሰጣጥ እና አገልግሎቶች በንግድና ኢንዱስትሪ ጽሕፈት ቤታችን በኩል ይስተናገዳሉ።', om: 'Marsariitiin kun odeeffannoo maallaqaa ummataa tajaajila. Galmee maallaqaan, hayyama fi tajaajilawwan waajjira daldalaa fi industriitiin raawwatamu.' },

  // ── Downloads Page ───────────────────────────────────────
  'downloads.eyebrow':    { en: 'Public documents and forms',        am: 'የህዝብ ሰነዶች እና ቅጾች',           om: 'Sanadoota fi fooromii ummataa' },
  'downloads.title':      { en: 'Documents & Downloads',             am: 'ሰነዶች እና ማውረጃዎች',             om: 'Sanadoota fi Buusii' },
  'downloads.description':{ en: 'Access official documents, forms, reports, and publications from Limu Kosa Woreda Administration.', am: 'ከሊሙ ኮሳ ወረዳ አስተዳደር ይፋዊ ሰነዶችን፣ ቅጾችን፣ ሪፖርቶችን እና ህትሞችን ያግኙ።', om: 'Sanadoota mootummaa, fooromii, gabaasa fi maxxansaa bulchiinsa Aanaa Limu Kossaa irraa argadhu.' },
  'downloads.category':   { en: 'Document category',                 am: 'የሰነድ ምድብ',                 om: 'Kutaa Sanadaa' },
  'downloads.status':     { en: 'Status',                            am: 'ሁኔታ',                     om: 'Haala' },
  'downloads.prepared':   { en: 'Prepared',                          am: 'ተዘጋጅቷል',                  om: 'Qopha\'eera' },

  // ── Footer ───────────────────────────────────────────────
  'footer.tagline':      { en: 'Official public portal of Limu Kosa Woreda Administration, Jimma Zone, Oromia, Ethiopia.', am: 'የሊሙ ኮሳ ወረዳ አስተዳደር ይፋዊ የህዝብ ፖርታል፣ ጅማ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ።', om: 'Kutaa argannoo mootummaa Aanaa Limu Kossaa, Godina Jimmaa, Oromiyaa, Itoophiyaa.' },
  'footer.quickLinks':   { en: 'Quick Links',    am: 'ፈጣን አገናኞች',   om: 'Hidhata Ariifataa' },
  'footer.services':     { en: 'Services',       am: 'አገልግሎቶች',      om: 'Tajaajilawwan' },
  'footer.contact':      { en: 'Contact',        am: 'ያግኙን',          om: 'Nu Quunnamaa' },
  'footer.rights':       { en: 'All rights reserved.',  am: 'ሁሉም መብቶች የተጠበቁ ናቸው።', om: 'Mirgoota hundi eegamaniiru.' },
  'footer.portal':       { en: 'Government Portal',     am: 'የመንግስት ፖርታል',          om: 'Kutaa Argannoo Mootummaa' },
  'footer.location':     { en: 'Jimma Zone, Oromia, Ethiopia',        am: 'ጅማ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ',         om: 'Godina Jimmaa, Oromiyaa, Itoophiyaa' },

  // ── Home Page Notices & Stats ───────────────────────────
  'home.notices.title':          { en: 'Notices and featured work', am: 'ማስታወቂያዎች እና ልዩ ስራዎች', om: 'Beeksisaalee fi Hojiiwwan Ijoo' },
  'home.notices.subtitle':       { en: 'Public notices, development highlights, and tourism information are loaded dynamically from the woreda database.', am: 'የህዝብ ማስታወቂያዎች፣ የልማት ጎላ ያሉ ቦታዎች እና የቱሪዝም መረጃዎች ከወረዳው ዳታቤዝ በድይናሚክ ይጫናሉ።', om: 'Beeksisaaleen ummataa, mul\'isawwan guddinaa fi odeeffannoon turizimii kuusaa ragaa aanaa irraa ni fe\'amu.' },

  // ── Departments Directory ────────────────────────────────
  'departments.directoryDesc':   { en: 'Each office page includes a public overview, responsibilities, major programs, and contact placeholders.', am: 'እያንዳንዱ ቢሮ ገጽ የህዝብ አጠቃላይ እይታ፣ ሃላፊነቶች፣ ዋና ፕሮግራሞች እና የግንኙነት መረጃዎችን ያካትታል።', om: 'Fuulli waajjira kantaa gabaasa ummataa, itti-gaafatamummaa, sagantaalee ijoo fi quunnamsa qaba.' },
  'departments.listedOffices':    { en: 'LISTED OFFICES',                      am: 'ዝርዝር ቢሮዎች',                 om: 'Waajjiraalee Galmaa\'an' },

  // ── Admin Panel UI Translations ──────────────────────────
  'admin.title':         { en: 'Administration Panel',  am: 'አስተዳደር ፓነል',   om: 'Paanelii Bulchiinsaa' },
  'admin.signin':        { en: 'Sign In to Admin Panel', am: 'ወደ አስተዳደር ፓነል ይግቡ', om: 'Paanelii Bulchiinsiitti seeni' },
  'admin.email':         { en: 'Email Address',          am: 'የኢሜይል አድራሻ',    om: 'Teessoo Imeelii' },
  'admin.password':      { en: 'Password',               am: 'የምስጢር ቁጥር',     om: 'Jecha-iccitii' },
  'admin.backToSite':    { en: '← Back to public website', am: '← ወደ ህዝባዊ ድህረ ገጽ ተመለስ', om: '← Gara marsariitii ummataa deebi\'i' },
  'admin.logout':        { en: 'Logout',                  am: 'ውጣ',             om: 'Ba\'i' },
  'admin.session':       { en: 'Admin Session',            am: 'የአስተዳዳሪ ክፍለ ጊዜ', om: 'Yeroo Bulchiinsaa' },
  'admin.refresh':       { en: 'Refresh Data',             am: 'ውሂቡን አድስ',      om: 'Ragaa haaromsi' },
  'admin.clearForm':     { en: '+ Clear Form',             am: '+ ቅጹን አጽዳ',     om: '+ Fooromii qulqulleessi' },
  'admin.save':          { en: 'Save Record',              am: 'መዝገቡን አስቀምጥ',   om: 'Galmee kuusi' },
  'admin.update':        { en: 'Update Record',            am: 'መዝገቡን አዘምን',    om: 'Galmee haaromsi' },
  'admin.delete':        { en: 'Delete',                   am: 'ሰርዝ',            om: 'Haqi' },
  'admin.edit':          { en: 'Edit',                     am: 'አርም',            om: 'Gulaali' },

  // Admin Sidebar Tabs
  'admin.tab.news':          { en: 'News Articles',         am: 'የዜና ጽሑፎች',      om: 'Barruu Oduu' },
  'admin.tab.announcements': { en: 'Announcements',         am: 'ማስታወቂያዎች',       om: 'Beeksisaalee' },
  'admin.tab.departments':   { en: 'Departments',           am: 'መምሪያዎች',         om: 'Waajjiraalee' },
  'admin.tab.leaders':       { en: 'Leadership',            am: 'አመራር',            om: 'Hooggansa' },
  'admin.tab.projects':      { en: 'Development Projects',  am: 'የልማት ፕሮጀክቶች',   om: 'Pirojektootaa Guddinaa' },
  'admin.tab.gallery':       { en: 'Photo Gallery',         am: 'ፎቶ ማዕከል',        om: 'Kuusaa Suuraa' },
  'admin.tab.downloads':     { en: 'Documents & Downloads', am: 'ሰነዶች እና ማውረጃዎች', om: 'Sanadoota fi Buusii' },
  'admin.tab.investment':    { en: 'Investment Opportunities', am: 'የኢንቨስትመንት እድሎች', om: 'Carraalee Maallaqaa' },
  'admin.tab.tourism':       { en: 'Tourism Highlights',    am: 'የቱሪዝም ቦታዎች',     om: 'Turizimii' },
  'admin.tab.messages':      { en: 'Public Messages',       am: 'የህዝብ መልዕክቶች',    om: 'Ergaa Ummataa' },
  'admin.tab.settings':      { en: 'Site Settings',         am: 'የጣቢያ ቅንብሮች',    om: 'Sajoo Marsariitii' },
  'admin.tab.security':      { en: 'Change Password',       am: 'የምስጢር ቁጥር ይቀይሩ', om: 'Jecha-iccitii Jijjiiri' },
} as const;

export type TranslationKey = keyof typeof translations;

export const dynamicFallbackMap: Record<string, { am: string; om: string }> = {
  // Hero & General
  "Limu Kosa Coffee Heritage": { am: "የሊሙ ኮሳ ቡና ቅርስ", om: "Dhaalaa Buna Limu Kossaa" },
  "A public portal rooted in the woreda's shade-grown Arabica coffee, forests, agriculture, and community service.": { am: "በወረዳው ጥላ-ቡና፣ ደኖች፣ ግብርና እና የማህበረሰብ አገልግሎት ላይ የተመሰረተ የህዝብ ፖርታል።", om: "Kutaa argannoo buna Arabika, bosonaa, qonnaa fi tajaajila hawaasaa irratti hundaa'ame." },
  "Explore tourism": { am: "ቱሪዝም ያስሱ", om: "Turizimii qoradhu" },
  "Limu Kosa Woreda Administration": { am: "የሊሙ ኮሳ ወረዳ አስተዳደር", om: "Bulchiinsa Aanaa Limu Kossaa" },
  "Official public information portal": { am: "ይፋዊ የህዝብ መረጃ ፖርታል", om: "Kutaa odeeffannoo ummataa mootummaa" },
  "Follow government updates, public notices, development work, departments, documents, and local opportunities.": { am: "የመንግስት ዜናዎችን፣ የህዝብ ማስታወቂያዎችን፣ ልማት ስራዎችን፣ መምሪያዎችን፣ ሰነዶችን እና የሀገር ውስጥ እድሎችን ይከታተሉ።", om: "Beeksisa mootummaa, waamicha ummataa, hojii guddinaa, waajjiraalee, sanadoota fi carraalee naannoo hordofi." },
  "Nature, Culture, and Development": { am: "ተፈጥሮ፣ ባህል እና ልማት", om: "Uumamaa, Aadaa fi Guddinaa" },
  "Nature and Community Care": { am: "ተፈጥሮ እና የህብረተሰብ እንክብካቤ", om: "Uumamaa fi Kunuunsa Hawaasaa" },

  // Home Stats
  "Projected Population": { am: "የተገመተው ህዝብ", om: "Ummatni Tilmaamame" },
  "2022 projection": { am: "2022 ግምት", om: "Tilmaama 2022" },
  "Surface Area": { am: "የወለል ስፋት", om: "Bal'ina Lafa" },
  "current woreda boundary": { am: "የአሁኑ የወረዳ ወሰን", om: "Daangaa Aanaa Ammee" },
  "Rural Kebeles": { am: "የገጠር ቀበሌዎች", om: "Ganda Baadiyyaa" },
  "plus 4 urban kebeles": { am: "ሲደመር 4 የከተማ ቀበሌዎች", om: "ida'amudhaan ganda magaalaa 4" },
  "Forest Cover": { am: "የደን ሸፈን", om: "Uffisa Bosonaa" },
  "including protected areas": { am: "የተጠበቁ ቦታዎችን ጨምሮ", om: "Bakkeewwan eegaman dabalatee" },

  // News Titles & Excerpts
  "Tourism profile highlights Bolo Caves and Lake Cheleleki": { am: "የቱሪዝም መገለጫ ቦሎ ዋሻዎችን እና ቼለለኪ ሀይቅን ያጎላል", om: "Seenaa turizimii Holqa Bolo fi Baala Cheleleki mul'isa" },
  "Culture and tourism teams are preparing destination information to promote responsible local tourism and heritage awareness.": { am: "የባህልና ቱሪዝም ቡድኖች ሀላፊነት ያለው የሀገር ውስጥ ቱሪዝምና የቅርስ ግንዛቤን ለማሳደግ የመዳረሻ መረጃ እያዘጋጁ ነው።", om: "Gareewwan aadaa fi turizimii beeksisa turizimii naannoo fi hubannoo dhaalaa guddisuuf odeeffannoo iddoo qopheessaa jiru." },
  "Woreda offices prepare updated public document registry": { am: "የወረዳ ቢሮዎች የተሻሻለ የህዝብ ሰነዶች መመዝገቢያ ያዘጋጃሉ", om: "Waajjiraaleen aanaa galmee sanadoota ummataa haaromfame qopheessu" },
  "Sector offices are organizing annual plans, brochures, and reports for easier public access through the downloads section.": { am: "የዘርፍ ቢሮዎች በማውረጃዎች ክፍል በኩል ለህዝብ በቀላሉ ተዳራሽ እንዲሆኑ ዓመታዊ እቅዶችን፣ ብሮሹሮችን እና ሪፖርቶችን እያደራጁ ነው።", om: "Waajjiraaleen damee karoora waggaa, birooshura fi gabaasa seensa ummataaf akka salphatuus kuusaa buusii keessatti qopheessaa jiru." },
  "Limu Kosa Woreda launches watershed conservation campaign": { am: "ሊሙ ኮሳ ወረዳ የተፋሰስ ጥበቃ ዘመቻ ጀምሯል", om: "Aanaan Limu Kossaa duula kunuunsa lolaa jalqabe" },
  "Public document registry update": { am: "የህዝብ ሰነዶች መመዝገቢያ ማሻሻያ", om: "Haaromsa galmee sanadoota ummataa" },

  // Categories & Badges
  "Tourism": { am: "ቱሪዝም", om: "Turizimii" },
  "Administration": { am: "አስተዳደር", om: "Bulchiinsa" },
  "Agriculture": { am: "ግብርና", om: "Qonnaa" },
  "General": { am: "አጠቃላይ", om: "Waliigala" },
  "Notice": { am: "ማስታወቂያ", om: "Beeksisa" },
  "ANNOUNCEMENT": { am: "ማስታወቂያ", om: "BEEKSIISA" },
  "PUBLISHED": { am: "የታተመ", om: "MAXXANFAME" },
  "Community Notice": { am: "የማህበረሰብ ማስታወቂያ", om: "Beeksisa Hawaasaa" },
  "Ongoing": { am: "ቀጣይ", om: "Itti-fufaa" },
  "Planned": { am: "የታቀደ", om: "Karoorfame" },
  "Woreda-wide": { am: "በወረዳ ደረጃ", om: "Aanaa Guutuu" },
  "Selected rural kebeles": { am: "በተመረጡ የገጠር ቀበሌዎች", om: "Ganda Baadiyyaa Filatamaan" },
  "Protected forest areas": { am: "በተጠበቁ የደን ቦታዎች", om: "Bakkeewwan Bosona Eegaman" },

  // Home Page Notices
  "Investment information desk open": { am: "የኢንቨስትመንት መረጃ ዴስክ ክፍት ነው", om: "Banninsa Teessoo Odeeffannoo Maallaqaa" },
  "The Trade and Industry Office has established a dedicated focal desk to guide potential investors through licensing, land verification, and local agricultural cooperative partnerships. Inquiries regarding coffee processing, eco-tourism, and agro-processing investments are highly welcome during standard working hours.": { am: "የንግድና ኢንዱስትሪ ጽሕፈት ቤት ሊሆኑ የሚችሉ ኢንቨስተሮችን በፈቃድ አሰጣጥ፣ በቦታ ማረጋገጫ እና በሀገር ውስጥ የግብርና ህብረት ስራ ማህበራት አጋርነት ለመምራት የተለየ መረጃ ዴስክ አቋቁሟል። የቡና ማቀናበር፣ የስነ-ምህዳር ቱሪዝም እና የግብርና-ሂደት ኢንቨስትመንት ጥያቄዎች በመደበኛ የስራ ሰዓታት እንኳን ደህና መጡ።", om: "Waajjirri Daldalaa fi Industrii teessoo odeeffannoo maallaqaa maallaqa qusatan hayyama, mirkaneessaa lafaa fi leenjii waldaalee qonnaa naannootiin qajeelchuuf hundeesseera. Gaaffiin maallaqa bunaa, eco-turizimii fi oomisha qonnaa hojii sa'aatii idileetti simatamaa." },
  "Coffee Culture": { am: "የቡና ባህል", om: "Aadaa Bunaa" },
  "Visiting Limu Kosa is an immersion into coffee culture. Visitors can witness traditional coffee ceremonies, tour cooperative farms, learn about ancient shade-growing methods passed down generations, and taste fresh, single-origin coffee directly from the source.": { am: "ሊሙ ኮሳን መጎብኘት በቡና ባህል ውስጥ መጥለቅ ነው። ጎብኚዎች ባህላዊ የቡና ስነ-ስርዓቶችን መመልከት፣ የህብረት ስራ እርሻዎችን መጎብኘት፣ በትውልድ የተላለፉ ጥንታዊ ጥላ-አበቃቀል ዘዴዎችን መማር እና ትኩስ የቡና ጣዕምን በቀጥታ ከመንጩ መቅመስ ይችላሉ።", om: "Limu Kossaa daawwachuun aadaa bunaa keessa loluudha. Daawwattoonni ayyaana bunaa aadaa ilaaluu, qonnaa waldaalee daawwachuu, mala buna bosonaa dhaloota irraa dhalootatti darbe barachuu fi buna qulqulluu madda irraa dhandhamuu danda'u." },
  "Limu Kosa's identity is closely connected to shade-grown coffee, farmer cooperatives, and community traditions.": { am: "የሊሙ ኮሳ መታወቂያ ከጥላ-ቡና፣ ከገበሬዎች ህብረት ስራ ማህበራት እና ከማህበረሰብ ባህሎች ጋር በጥብቅ የተያያዘ ነው።", om: "Eenyummaan Limu Kossaa buna bosonaa, waldaalee qonnaan bulaa fi aadaa hawaasaatiin hidhata qaba." },

  // All 12 Departments (Names & Descriptions)
  "Agriculture & Natural Resources Office": { am: "የግብርና እና ተፈጥሮ ሀብት ጽሕፈት ቤት", om: "Waajjira Qonnaa fi Qabeenya Uumamaa" },
  "Supports crop production, livestock, coffee development, watershed care, and natural resource protection across rural kebeles.": { am: "በገጠር ቀበሌዎች የሰብል ምርትን፣ እንስሳትን፣ የቡና ልማትን፣ የተፋሰስ እንክብካቤን እና የተፈጥሮ ሀብት ጥበቃን ይደግፋል።", om: "Oomisha Midhaanii, Beeylada, Misooma Bunaa, Kunuunsa Loolaa fi Eegumsa Qabeenya Uumamaa Baadiyyaa Keessatti Deeggara." },
  "Woreda Health Office": { am: "የወረዳ ጤና ጽሕፈት ቤት", om: "Waajjira Fayyaa Aanaa" },
  "Coordinates public health services, disease prevention, sanitation, maternal care, and community health education.": { am: "የህዝብ ጤና አገልግሎቶችን፣ የበሽታ መከላከያን፣ ጽዳትን፣ የነፍሰ ጡራት እንክብካቤን እና የማህበረሰብ ጤና ትምህርትን ያነጻጽራል።", om: "Tajaajilawwan Fayyaa Ummataa, Ittisa Dhukkubaa, Qulqullina, Kunuunsa Haadholii fi Barnoota Fayyaa Hawaasaa Koordineessaa." },
  "Education Office": { am: "የትምህርት ጽሕፈት ቤት", om: "Waajjira Barnootaa" },
  "Administers public education planning, school support, teacher coordination, and learning improvement programs.": { am: "የህዝብ ትምህርት እቅድን፣ የትምህርት ቤት ድጋፍን፣ የኦዲተሮች ማስተባበርን እና የትምህርት ማሻሻያ ፕሮግራሞችን ያስተዳድራል።", om: "Karoora barnoota ummataa, deeggarsa mana barumsaa, koordineeshinii barsiisotaa fi sagantaalee fooyya'iinsa barnootaa bulchaa." },
  "Finance & Economic Development Office": { am: "የፋይናንስ እና ኢኮኖሚ ልማት ጽሕፈት ቤት", om: "Waajjira Maallaqaa fi Guddina Dinagdee" },
  "Handles local budget coordination, revenue planning, procurement support, and development finance reporting.": { am: "የሀገር ውስጥ በጀት ማስተባበርን፣ የገቢ እቅድን፣ የግዥ ድጋፍን እና የልማት ፋይናንስ ሪፖርትን ያስተናግዳል።", om: "Koordineeshinii bajata naannoo, karoora galii, deeggarsa bittaadhaa fi gabaasa maallaqa guddinaa raawwata." },
  "Land Administration Office": { am: "የመሬት አስተዳደር ጽሕፈት ቤት", om: "Waajjira Bulchiinsa Lafaa" },
  "Supports land records, rural land use coordination, boundary information, and responsible land management.": { am: "የመሬት መዝገቦችን፣ የገጠር መሬት አጠቃቀም ማስተባበርን፣ የወሰን መረጃን እና ሃላፊነት ያለው የመሬት አስተዳደርን ይደግፋል።", om: "Galmee lafaa, koordineeshinii fayyadama lafa baadiyyaa, odeeffannoo daangaa fi bulchiinsa lafa itti-gaafatamaa deeggara." },
  "Water & Energy Office": { am: "የውኃ እና ኢነርጂ ጽሕፈት ቤት", om: "Waajjira Bishaan fi Anniisaa" },
  "Coordinates water access, rural water schemes, energy awareness, and maintenance planning with communities.": { am: "የውኃ አቅርቦትን፣ የገጠር ውኃ திட்டዎችን፣ የኢነርጂ ግንዛቤን እና የጥገና እቅድን ከማህበረሰቦች ጋር ያስተባብራል።", om: "Dhiyeessii bishaan, karoora bishaan baadiyyaa, hubannoo anniisaa fi kunuunsa hawaasa wajjin koordineessa." },
  "Trade & Industry Office": { am: "የንግድ እና ኢንዱስትሪ ጽሕፈት ቤት", om: "Waajjira Daldalaa fi Industrii" },
  "Promotes local enterprise, market coordination, trade licensing guidance, and value chain opportunities.": { am: "የሀገር ውስጥ ድርጅቶችን፣ የገበያ ማስተባበርን፣ የንግድ ፈቃድ መመሪያዎችን እና የእሴት ሰንሰለት እድሎችን ያሳድጋል።", om: "Daldala naannoo, koordineeshinii gabaa, qajeelfama hayyama daldalaa fi carraalee value chain guddisa." },
  "Women & Social Affairs Office": { am: "የሴቶች እና ማህበራዊ ጉዳይ ጽሕፈት ቤት", om: "Waajjira Dubartootaa fi Dhimma Hawaasaa" },
  "Supports inclusion, community wellbeing, women-focused development, and social protection coordination.": { am: "አካታችነትን፣ የማህበረሰብ ጤንነትን፣ በሴቶች ላይ ያተኮረ ልማትን እና የማህበራዊ ጥበቃ ማስተባበርን ይደግፋል።", om: "Dabalatumaa, nagaa hawaasaa, misooma dubartoota irratti xiyyeeffate fi eegumsa hawaasaa deeggara." },
  "Youth & Sports Office": { am: "የወጣቶች እና ስፖርት ጽሕፈት ቤት", om: "Waajjira Dargaggootaa fi Ispoortii" },
  "Coordinates youth participation, sport development, community activities, and youth opportunity programs.": { am: "የወጣቶችን ተሳትፎ፣ የስፖርት ልማትን፣ የማህበረሰብ እንቅስቃሴዎችን እና የወጣቶች እድል ፕሮግራሞችን ያስተባብራል።", om: "Hirmaannaa dargaggootaa, misooma ispoortii, socho'insa hawaasaa fi sagantaalee carraa dargaggootaa koordineessa." },
  "Culture & Tourism Office": { am: "የባህል እና ቱሪዝም ጽሕፈት ቤት", om: "Waajjira Aadaa fi Turizimii" },
  "Promotes natural attractions, coffee culture, heritage sites, festivals, and visitor information.": { am: "ተፈጥሯዊ መስህቦችን፣ የቡና ባህልን፣ የቅርስ ቦታዎችን፣ በዓላትን እና የጎብኚዎችን መረጃ ያሳድጋል።", om: "Meeshaalee uumamaa, aadaa bunaa, iddoowwan dhaalaa, ayyaanota fi odeeffannoo daawwattootaa guddisa." },
  "Peace & Security Administration": { am: "የሰላም እና ጸጥታ አስተዳደር", om: "Bulchiinsa Nagaa fi Wabiin Security" },
  "Coordinates community peace, safety communication, local security alignment, and inter-kebele cooperation.": { am: "የማህበረሰብ ሰላምን፣ የደህንነት ግንኙነትን፣ የሀገር ውስጥ ጸጥታ ማስተካከልን እና የቀበሌዎችን ትብብር ያስተባብራል።", om: "Nagaa hawaasaa, komunikeeshinii waabii, walsimsiisa security naannoo fi waliin hojjechu gandaa koordineessa." },
  "Justice Office": { am: "የፍትህ ጽሕፈት ቤት", om: "Waajjira Haqaa" },
  "Provides legal guidance, public legal awareness, civil record support, and administrative justice coordination.": { am: "ህጋዊ መመሪያዎችን፣ የህዝብ ህግ ግንዛቤን፣ የሲቪል መዝገብ ድጋፍን እና የአስተዳደር ፍትህ ማስተባበርን ይሰጣል።", om: "Qajeelfama seeraa, hubannoo seera ummataa, deeggarsa galmee siivilii fi koordineeshinii haqa bulchiinsaa meeshaa." },

  // Leadership
  "Woreda Chief Administrator": { am: "የወረዳው ዋና አስተዳዳሪ", om: "Hoogganaa Ol'aanaa Aanaa" },
  "Head of Woreda Administration": { am: "የወረዳ አስተዳደር ኃላፊ", om: "Hoogganaa Bulchiinsa Aanaa" },
  "Leads overall public administration, inter-office coordination, and woreda development priorities.": { am: "አጠቃላይ የህዝብ አስተዳደርን፣ የቢሮዎችን ማስተባበር እና የወረዳ ልማት ቅድሚያ የሚሰጣቸውን ጉዳዮች ይመራል።", om: "Bulchiinsa ummataa waliigalaa, koordineeshinii waajjiraalee fi dursa guddina aanaa Limu Kossaa keessatti hooggana." },
  "Strategic leadership": { am: "ስትራቴጂካዊ አመራር", om: "Hooggansa Istiraateejikii" },
  "Public accountability": { am: "የህዝብ ተጠያቂነት", om: "Itti-Gaafatamummaa Ummataa" },
  "Development coordination": { am: "የልማት ማስተባበር", om: "Koordineeshinii Guddinaa" },
  "Deputy Administrator": { am: "ምክትል አስተዳዳሪ", om: "Itti-Aanaa Hoogganaa" },
  "Deputy Woreda Administrator": { am: "ምክትል የወረዳ አስተዳዳሪ", om: "Itti-Aanaa Bulchiinsa Aanaa" },
  "Deputy Head of Administration": { am: "ምክትል የአስተዳደር ኃላፊ", om: "Itti-Aanaa Hoogganaa Bulchiinsaa" },
  "Supports daily government coordination and follows sector implementation across departments.": { am: "የዕለት ተዕለት የመንግስት ማስተባበርን ይደግፋል እና በመምሪያዎች ውስጥ የዘርፍ ትግበራን ይከታተላል።", om: "Koordineeshinii mootummaa guyyaa guyyaa deeggara fi raawwii damee waajjiraalee keessatti hordofa." },
  "Sector follow-up": { am: "የዘርፍ ክትትል", om: "Hordoffii Damee" },
  "Office coordination": { am: "የቢሮ ማስተባበር", om: "Koordineeshinii Waajjiraa" },
  "Community response": { am: "የማህበረሰብ ምላሽ", om: "Deebii Hawaasaa" },
  "Administration Council Secretary": { am: "የአስተዳደር ምክር ቤት ጸሐፊ", om: "Barreessaa Caffee Bulchiinsaa" },
  "Council and Records Coordination": { am: "የምክር ቤት እና ሰነዶች ማስተባበር", om: "Koordineeshinii Caffee fi Galmee" },
  "Supports official meeting records, public notices, and administrative communication workflows.": { am: "ይፋዊ የስብሰባ ሰነዶችን፣ የህዝብ ማስታወቂያዎችን እና የአስተዳደር ግንኙነት የስራ ሂደቶችን ይደግፋል።", om: "Galmee walga'ii mootummaa, beeksisa ummataa fi hojii komunikeeshinii bulchiinsaa deeggara." },
  "Council records": { am: "የምክር ቤት ሰነዶች", om: "Galmee Caffee" },
  "Notice coordination": { am: "የማስታወቂያ ማስተባበር", om: "Koordineeshinii Beeksisaa" },
  "Document routing": { am: "የሰነድ ስርጭት", om: "Raabsa Sanadaa" },

  // Projects
  "Rural Water Access Extension": { am: "የገጠር የንጹህ ውኃ አቅርቦት ማስፋፊያ", om: "Dheerissaa Dhiyeessii Bishaan Baadiyyaa" },
  "Forest Coffee Conservation Support": { am: "የደና ቡና ጥበቃ ድጋፍ", om: "Deeggarsa Kunuunsa Buna Bosonaa" },
  "Public Document Digitization": { am: "የህዝብ ሰነዶችን ዲጂታላይዝ ማድረግ", om: "Dijitaalaayizeeshinii Sanadoota Ummataa" },
  "An administrative modernization project to scan, clean, and categorize historic and current woreda policies, public statistics, and official service request forms. The end goal is to ensure easy access to public information, supporting transparency and administrative speed.": { am: "ታሪካዊ እና የአሁኑ የወረዳ ፖሊሲዎችን፣ የህዝብ ስታቲስቲክስን እና ይፋዊ የአገልግሎት መጠየቂያ ቅጾችን ለመቃኘት፣ ለማጽዳት እና ለመደገፍ የአስተዳደር ዘመናዊነት ፕሮጀክት። የመጨረሻው ግብ የህዝብ መረጃዎችን በቀላሉ ማግኘት ማረጋገጥ ነው፤ ይህም ግልጽነትን እና የአስተዳደር ፍጥነትን ይደግፋል።", om: "Pirojektootii haaromsaa bulchiinsaa sanadoota, istaatistiksii fi fooromii tajaajila mootummaa scan gochuu, qulqulleessuu fi qooduudha. Kaayyoon dhumaa seensa odeeffannoo ummataa salphaa mirkaneessuu, iftoomina fi ariiti bulchiinsaa deeggaruudha." },

  // Tourism Sites
  "Bolo Caves Eco-Tourism": { am: "የቦሎ ዋሻዎች ስነ-ምህዳር ቱሪዝም", om: "Eco-Turizimii Holqa Bolo" },
  "Lake Cheleleki Wetlands": { am: "የጨለለቂ ሀይቅ ረግረጋማ ቦታዎች", om: "Lafa Jiidhaa Baala Cheleleki" },
  "Limu Shade-Grown Forest Coffee Trail": { am: "የሊሙ ጥላ-ቡና ደን መንገድ", om: "Daandii Buna Bosonaa Limu" },
  "Lake Cheleleki": { am: "ጨለለቂ ሀይቅ", om: "Baala Cheleleki" },
  "A notable natural landmark suitable for visitor information, conservation awareness, and local destination storytelling.": { am: "ለጎብኚዎች መረጃ፣ ለጥበቃ ግንዛቤ እና ለሀገር ውስጥ መዳረሻ ታሪክ ተስማሚ የሆነ ታዋቂ የተፈጥሮ መታወቂያ።", om: "Bakka uumamaa beekamaa odeeffannoo daawwattootaa, hubannoo kunuunsaa fi seenaa iddoo naannoof ta'u." },
  "Bolo Caves": { am: "ቦሎ ዋሻዎች", om: "Holqa Bolo" },
  "A distinctive landscape feature that can anchor heritage tourism and guided exploration programs.": { am: "የቅርስ ቱሪዝምን እና የሚመሩ የዳሰሳ ፕሮግራሞችን መልህቅ ሊያደርግ የሚችል ልዩ የገጽታ ባህሪ።", om: "Bala uumamaa addaa turizimii dhaalaa fi sagantaalee qorannoo hoogganamu lafa qabsiisuu danda'u." },
  "Tiro Boter Becho and Babia Folla Forests": { am: "ቲሮ ቦተር በቾ እና ባቢያ ፎላ ደኖች", om: "Bosona Tiro Boter Bechoo fi Babii Follaa" },
  "Protected montane forest systems tied to biodiversity, rainfall regulation, and wild Arabica coffee heritage.": { am: "ከብዝሃ-ሕይወት፣ ከዝናብ ቁጥጥር እና ከዱር አረቢካ ቡና ቅርስ ጋር የተያያዙ የተጠበቁ የተራራ ደን ስርዓቶች።", om: "Sirna bosona gaaraa eegamaa biodiversity, to'annoo bakkalchaa fi dhaalaa buna Arabika bosonaatiin hidhata qabu." },

  // Investment Sectors
  "Coffee Production and Processing": { am: "የቡና ምርት እና ማቀናበር", om: "Oomisha Bunaa fi Dalagaa" },
  "Highland and midland environments support forest coffee, cooperative partnerships, drying, grading, and value addition.": { am: "የተራራ እና ወይና ደጋ አካባቢዎች የደን ቡናን፣ የህብረት ስራ ማህበራት አጋርነትን፣ ማድረቅን፣ ደረጃ መስጠትን እና እሴት መጨመርን ይደግፋሉ።", om: "Naannoon baddaa fi baddadaree buna bosonaa, tumsa waldaalee, gogsuu, sadarkaa fi dabalata gatii deeggara." },
  "Agriculture and Agro-processing": { am: "ግብርና እና ግብርና-ሂደት", om: "Qonnaa fi Dalagaa Qonnaa" },
  "Maize, sorghum, teff, fruits, sugar cane, honey, and livestock create opportunities for responsible agribusiness.": { am: "በቆሎ፣ ማሽላ፣ ጤፍ፣ ፍራፍሬ፣ ሸንኮራ አገዳ፣ ማር እና እንስሳት ለኃላፊነት ያለው የግብርና ንግድ እድሎችን ይፈጥራሉ።", om: "Boqqolloo, misingaa, xafii, fuduraa, shonkora, damma fi beeyladni carraalee daldala qonnaaf ni uumu." },
  "Tourism and Hospitality": { am: "ቱሪዝም እና እንግዳ ተቀባይነት", om: "Turizimii fi Keessummeessaa" },
  "Bolo Caves, Lake Cheleleki, coffee culture, forests, and heritage sites support eco-tourism services.": { am: "የቦሎ ዋሻዎች፣ የጨለለቂ ሀይቅ፣ የቡና ባህል፣ ደኖች እና የቅርስ ቦታዎች የስነ-ምህዳር ቱሪዝም አገልግሎቶችን ይደግፋሉ።", om: "Holqa Bolo, Baala Cheleleki, aadaa bunaa, bosonni fi iddoowwan dhaalaa tajaajilawwan eco-turizimii deeggaru." },
  "Light Manufacturing and Trade": { am: "ቀለል ያለ ማኑፋክቸሪንግ እና ንግድ", om: "Ishaana Salphaa fi Daldala" },
  "Local market links, road access, and agricultural outputs create opportunities for small-scale processing and trade.": { am: "የሀገር ውስጥ ገበያ ትስስሮች፣ የផ្លូវ መዳረሻ እና የግብርና ምርቶች ለአነስተኛ ደረጃ ማቀናበር እና ንግድ እድሎችን ይፈጥራሉ።", om: "Hidhata gabaa naannoo, seensa daandii fi oomishni qonnaa carraalee dalagaa fi daldala xiqqaaf ni uumu." },
  "Public Consultation on Woreda Development Plan": { am: "በወረዳ ልማት እቅድ ላይ የህዝብ ውይይት", om: "Mari'annoo Ummataa Karoora Guddina Aanaa" },
  "Off-Grid Solar Distribution Initiative": { am: "ከግሪድ ውጭ የሶላር ስርጭት ተሳሳቢ", om: "Tattaaffii Raabsa Solaaraa Saab-Giriidii" },
  "Coffee Harvest Quality & Export Training": { am: "የቡና ምርት ጥራት እና ኤክስፖርት ስልጠና", om: "Leenjii Qulqullina Oomisha Bunaa fi Ergisaa" },
};
