// ============================================================
// Limu Kosa Woreda – UI Translations
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

  // ── Departments Page ─────────────────────────────────────
  'departments.eyebrow':     { en: 'Public governance and sector offices', am: 'የህዝብ አስተዳደር እና የዘርፍ ቢሮዎች', om: 'Bulchiinsa ummataa fi waajjiraalee damee' },
  'departments.title':       { en: 'Government Departments',              am: 'የመንግስት መምሪያዎች',              om: 'Waajjiraalee Mootummaa' },
  'departments.description': { en: 'Sector offices responsible for public service coordination, development planning, natural resources, social services, and citizen communication.', am: 'ለህዝብ አገልግሎት ማስተባበር፣ የልማት እቅድ 立案፣ ተፈጥሮ ሀብቶች፣ ማህበራዊ አገልግሎቶች እና የዜጎች ግንኙነት ሃላፊ የሆኑ የዘርፍ ቢሮዎች።', om: 'Waajjiraalee damee koordineeshinii tajaajila ummataa, karoora guddinaa, qabeenya uumamaa, tajaajilawwan hawaasaa fi komunikeeshiniif itti-gaafataman.' },
  'departments.directory':   { en: 'Core sector directory',               am: 'ዋና የዘርፍ ማውጫ',               om: 'Galmee damee ijoo' },
  'departments.listed':      { en: 'Listed offices',                       am: 'ዝርዝር ቢሮዎች',                 om: 'Waajjiraalee galmaa\'e' },

  // ── Leadership Page ──────────────────────────────────────
  'leadership.eyebrow':      { en: 'Woreda officials and elected leaders', am: 'የወረዳ ባለስልጣናት እና የተመረጡ መሪዎች', om: 'Hooggantoota aanaa fi filataman' },
  'leadership.title':        { en: 'Leadership & Officials',               am: 'አመራር እና ባለስልጣናት',            om: 'Hooggansa fi Hooggantoota' },
  'leadership.description':  { en: 'Meet the elected officials and department heads responsible for governance, public service delivery, and development coordination in Limu Kosa Woreda.', am: 'ለሊሙ ኮሳ ወረዳ አስተዳደር፣ የህዝብ አገልግሎት አቅርቦት እና የልማት ማስተባበር ሃላፊ የሆኑ የተመረጡ ባለስልጣናትን እና የመምሪያ ሃላፊዎችን ይቀበሉ።', om: 'Bulchiinsa, dhiyeessii tajaajila ummataa fi koordineeshiniif Aanaa Limu Kossaa itti-gaafataman hooggantoota filataman fi deetota waajjiraalee simadhu.' },

  // ── News Page ────────────────────────────────────────────
  'news.eyebrow':        { en: 'Woreda updates and reports',        am: 'የወረዳ ዝማኔዎች እና ሪፖርቶች',    om: 'Haaromsa fi gabaasa aanaa' },
  'news.title':          { en: 'News & Updates',                    am: 'ዜናዎች እና ዝማኔዎች',            om: 'Oduu fi Haaromsa' },
  'news.description':    { en: 'The latest news, announcements, and development updates from Limu Kosa Woreda administration.', am: 'ከሊሙ ኮሳ ወረዳ አስተዳደር የቅርብ ዜናዎች፣ ማስታወቂያዎች እና የልማት ዝማኔዎች።', om: 'Oduu haaraa, beeksisa fi haaromsa guddinaa bulchiinsa Aanaa Limu Kossaa irraa.' },

  // ── Projects Page ────────────────────────────────────────
  'projects.eyebrow':    { en: 'Development and infrastructure',    am: 'ልማት እና መሰረተ ልማት',          om: 'Guddinaa fi misooma bu\'uuraa' },
  'projects.title':      { en: 'Development Projects',              am: 'የልማት ፕሮጀክቶች',               om: 'Pirojektootaa Guddinaa' },
  'projects.description':{ en: 'Ongoing and completed public infrastructure, agricultural, and social development projects across Limu Kosa Woreda.', am: 'ሁሉም የሊሙ ኮሳ ወረዳ ሁሉ-አቀፍ ቀጣይ እና የተጠናቀቁ የህዝብ መሰረተ ልማት፣ ግብርና እና ማህበራዊ ልማት ፕሮጀክቶች።', om: 'Pirojektootaa bu\'uuraa ummataa, qonnaa fi guddinaa hawaasaa aanaa Limu Kossaa guutuu itti-fufaa fi xumuramee.' },

  // ── Gallery Page ─────────────────────────────────────────
  'gallery.eyebrow':     { en: 'Photos from the woreda',            am: 'ከወረዳ ፎቶዎች',                  om: 'Suuraalee aanaa irraa' },
  'gallery.title':       { en: 'Photo Gallery',                      am: 'ፎቶ ማዕከል',                     om: 'Kuusaa Suuraa' },
  'gallery.description': { en: 'Images from community programs, development projects, nature sites, and local events in Limu Kosa.', am: 'ከሊሙ ኮሳ ማህበረሰብ ፕሮግራሞች፣ የልማት ፕሮጀክቶች፣ የተፈጥሮ ቦታዎች እና የሀገር ውስጥ ዝግጅቶች ፎቶዎች።', om: 'Suuraalee sagantaalee hawaasaa, pirojektootaa guddinaa, iddoowwan uumamaa fi taateewwan naannoo Limu Kossaa irraa.' },

  // ── Announcements Page ───────────────────────────────────
  'announcements.eyebrow':    { en: 'Public notices',               am: 'የህዝብ ማስታወቂያዎች',             om: 'Beeksisaalee ummataa' },
  'announcements.title':      { en: 'Announcements',                am: 'ማስታወቂያዎች',                   om: 'Beeksisaalee' },
  'announcements.description':{ en: 'Important notices for public meetings, office updates, community events, investment information, and emergency communication.', am: 'ለህዝብ ስብሰባዎች፣ የቢሮ ዝማኔዎች፣ የማህበረሰብ ዝግጅቶች፣ የኢንቨስትመንት መረጃ እና ድንገተኛ ግንኙነት ዋና ማስታወቂያዎች።', om: 'Beeksisaalee ijoo walga\'ii ummataa, haaromsa waajjiraa, taateewwan hawaasaa, odeeffannoo maallaqaa fi komunikeeshiniif hatattamaa.' },

  // ── Contact Page ─────────────────────────────────────────
  'contact.eyebrow':       { en: 'Get in touch with us',            am: 'ከእኛ ጋር ያወሩ',                 om: 'Nu quunnamuu' },
  'contact.title':         { en: 'Contact Us',                       am: 'ያግኙን',                        om: 'Nu Quunnamaa' },
  'contact.description':   { en: 'Reach out to Limu Kosa Woreda Administration for inquiries, feedback, public services, or partnerships.', am: 'ለጥያቄዎች፣ ምላሾች፣ የህዝብ አገልግሎቶች ወይም አጋርነት ሊሙ ኮሳ ወረዳ አስተዳደርን ያግኙ።', om: 'Gaaffii, deebii, tajaajilawwan ummataa ykn tokkummaa wajjin bulchiinsa Aanaa Limu Kossaa quunnamaa.' },
  'contact.name':          { en: 'Full Name',                        am: 'ሙሉ ስም',                       om: 'Maqaa Guutuu' },
  'contact.email':         { en: 'Email Address',                    am: 'የኢሜይል አድራሻ',                 om: 'Teessoo Imeelii' },
  'contact.subject':       { en: 'Subject',                          am: 'ርዕሰ ጉዳይ',                     om: 'Mata-duree' },
  'contact.message':       { en: 'Message',                          am: 'መልዕክት',                        om: 'Ergaa' },
  'contact.send':          { en: 'Send Message',                     am: 'መልዕክት ይላኩ',                   om: 'Ergaa Ergi' },

  // ── Tourism Page ─────────────────────────────────────────
  'tourism.eyebrow':      { en: 'Nature, heritage, and eco-tourism', am: 'ተፈጥሮ፣ ቅርስ እና ስነ-ምህዳር ቱሪዝም', om: 'Uumamaa, dhaalaa fi eco-turizimii' },
  'tourism.title':        { en: 'Tourism & Heritage',                am: 'ቱሪዝም እና ቅርስ',                om: 'Turizimii fi Dhaalaa' },
  'tourism.description':  { en: 'Discover Limu Kosa\'s natural wonders, eco-tourism sites, cultural heritage, and community-based tourism initiatives.', am: 'የሊሙ ኮሳ ተፈጥሮ ድንቆችን፣ ስነ-ምህዳር ቱሪዝም ቦታዎችን፣ ባህላዊ ቅርስን እና ማህበረሰብ ያማከለ የቱሪዝም ተሳሳቢዎችን ያግኙ።', om: 'Dinqii uumamaa Limu Kossaa, iddoowwan eco-turizimii, dhaalaa aadaa fi tattaaffii turizimii hawaasa-giddugaleessa argadhu.' },

  // ── Investment Page ──────────────────────────────────────
  'investment.eyebrow':   { en: 'Business and economic opportunity', am: 'የንግድ እና ኢኮኖሚ እድል',           om: 'Carraa daldala fi dinagdee' },
  'investment.title':     { en: 'Investment Opportunities',          am: 'የኢንቨስትመንት እድሎች',             om: 'Carraalee Maallaqaa' },
  'investment.description':{ en: 'Explore investment opportunities in Limu Kosa Woreda — from coffee, agriculture, and eco-tourism to agro-processing and rural enterprise.', am: 'ከቡና፣ ግብርና፣ ስነ-ምህዳር ቱሪዝም እስከ ግብርና-ሂደት እና የገጠር ድርጅት ድረስ ባሉ ኢንቨስትመንት እድሎችን ያስሱ።', om: 'Carraalee maallaqaa Aanaa Limu Kossaa - buna, qonnaa fi eco-turizimii hanga dalagaa qonnaa fi daldala baadiyyaa qoradhu.' },

  // ── Downloads Page ───────────────────────────────────────
  'downloads.eyebrow':    { en: 'Public documents and forms',        am: 'የህዝብ ሰነዶች እና ቅጾች',           om: 'Sanadoota fi fooromii ummataa' },
  'downloads.title':      { en: 'Documents & Downloads',             am: 'ሰነዶች እና ማውረጃዎች',             om: 'Sanadoota fi Buusii' },
  'downloads.description':{ en: 'Access official documents, forms, reports, and publications from Limu Kosa Woreda Administration.', am: 'ከሊሙ ኮሳ ወረዳ አስተዳደር ይፋዊ ሰነዶችን፣ ቅጾችን፣ ሪፖርቶችን እና ህትሞችን ያግኙ።', om: 'Sanadoota mootummaa, fooromii, gabaasa fi maxxansaa bulchiinsa Aanaa Limu Kossaa irraa argadhu.' },

  // ── Footer ───────────────────────────────────────────────
  'footer.tagline':      { en: 'Official public portal of Limu Kosa Woreda Administration, Jimma Zone, Oromia, Ethiopia.', am: 'የሊሙ ኮሳ ወረዳ አስተዳደር ይፋዊ የህዝብ ፖርታል፣ ጅማ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ።', om: 'Kutaa argannoo mootummaa Aanaa Limu Kossaa, Godina Jimmaa, Oromiyaa, Itoophiyaa.' },
  'footer.quickLinks':   { en: 'Quick Links',    am: 'ፈጣን አገናኞች',   om: 'Hidhata Ariifataa' },
  'footer.services':     { en: 'Services',       am: 'አገልግሎቶች',      om: 'Tajaajilawwan' },
  'footer.contact':      { en: 'Contact',        am: 'ያግኙን',          om: 'Nu Quunnamaa' },
  'footer.rights':       { en: 'All rights reserved.',  am: 'ሁሉም መብቶች የተጠበቁ ናቸው።', om: 'Mirgoota hundi eegamaniiru.' },
  'footer.portal':       { en: 'Government Portal',     am: 'የመንግስት ፖርታል',          om: 'Kutaa Argannoo Mootummaa' },

  // ── Admin Panel ──────────────────────────────────────────
  'admin.title':         { en: 'Administration Panel',  am: 'አስተዳደር ፓነል',   om: 'Paanelii Bulchiinsaa' },
  'admin.signin':        { en: 'Sign In to Admin Panel', am: 'ወደ አስተዳደር ፓነል ይግቡ', om: 'Paanelii Bulchiinsiitti seeni' },
  'admin.email':         { en: 'Email Address',          am: 'የኢሜይል አድራሻ',    om: 'Teessoo Imeelii' },
  'admin.password':      { en: 'Password',               am: 'የምስጢር ቁጥር',     om: 'Jecha-iccitii' },
  'admin.backToSite':    { en: '← Back to public website', am: '← ወደ ህዝባዊ ድህረ ገጽ ተመለስ', om: '← Gara marsariitii ummataa deebi\'i' },
  'admin.logout':        { en: 'Logout',                  am: 'ውጣ',             om: 'Ba\'i' },
  'admin.session':       { en: 'Admin Session',            am: 'የአስተዳዳሪ ክፍለ ጊዜ', om: 'Yeroo Bulchiinsaa' },
  'admin.refresh':       { en: 'Refresh Data',             am: 'ውሂቡን አድስ',      om: 'Ragaa haaromsi' },
  'admin.clearForm':     { en: '+ Clear Form',             am: '+ ቅጹን አጽዳ',     om: '+ Fooromii qulqulleessi' },
  'admin.save':          { en: 'Save',                     am: 'አስቀምጥ',         om: 'Kuusi' },
  'admin.update':        { en: 'Update',                   am: 'አዘምን',           om: 'Haaromsi' },
  'admin.delete':        { en: 'Delete',                   am: 'ሰርዝ',            om: 'Haqi' },
  'admin.edit':          { en: 'Edit',                     am: 'አርም',            om: 'Gulaali' },
} as const;

export type TranslationKey = keyof typeof translations;
