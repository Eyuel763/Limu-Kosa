import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Camera,
  Coffee,
  Coins,
  Download,
  Droplets,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  MapPin,
  Megaphone,
  Mountain,
  Phone,
  Scale,
  ShieldCheck,
  Sprout,
  Trees,
  Users,
  Waves,
} from "lucide-react";

export const siteStats = [
  { label: "Projected Population", value: "235,584", detail: "2022 projection", icon: Users },
  { label: "Surface Area", value: "1,316 km2", detail: "current woreda boundary", icon: MapPin },
  { label: "Rural Kebeles", value: "40", detail: "plus 4 urban kebeles", icon: Building2 },
  { label: "Forest Cover", value: "39.7%", detail: "including protected areas", icon: Trees },
];

export const departments = [
  {
    id: "agriculture",
    name: "Agriculture & Natural Resources Office",
    shortName: "Agriculture",
    icon: Sprout,
    description:
      "Supports crop production, livestock, coffee development, watershed care, and natural resource protection across rural kebeles.",
    responsibilities: [
      "Coordinate agricultural extension and farmer training.",
      "Support forest coffee, fruits, sugar cane, cereals, and livestock programs.",
      "Lead soil, watershed, and natural resource conservation activities.",
      "Work with cooperatives and rural kebeles on productivity improvements.",
    ],
    programs: ["Coffee quality support", "Participatory forest management", "Watershed rehabilitation"],
    contact: "agriculture@limukosa.gov.et",
  },
  {
    id: "health",
    name: "Woreda Health Office",
    shortName: "Health",
    icon: HeartPulse,
    description:
      "Coordinates public health services, disease prevention, sanitation, maternal care, and community health education.",
    responsibilities: [
      "Supervise health facilities and community health extension activities.",
      "Coordinate prevention campaigns and emergency public health messaging.",
      "Improve sanitation, water safety awareness, and maternal health access.",
      "Collect health service reports for planning and accountability.",
    ],
    programs: ["Community health education", "Maternal and child health", "Disease prevention"],
    contact: "health@limukosa.gov.et",
  },
  {
    id: "education",
    name: "Education Office",
    shortName: "Education",
    icon: GraduationCap,
    description:
      "Administers public education planning, school support, teacher coordination, and learning improvement programs.",
    responsibilities: [
      "Coordinate primary and secondary school administration.",
      "Support teacher deployment, training, and school reporting.",
      "Monitor student participation and learning environment improvements.",
      "Promote inclusive education across rural and urban communities.",
    ],
    programs: ["School improvement", "Teacher support", "Student participation tracking"],
    contact: "education@limukosa.gov.et",
  },
  {
    id: "finance",
    name: "Finance & Economic Development Office",
    shortName: "Finance",
    icon: Coins,
    description:
      "Handles local budget coordination, revenue planning, procurement support, and development finance reporting.",
    responsibilities: [
      "Prepare and monitor woreda budget implementation.",
      "Coordinate revenue, expenditure, and public finance reports.",
      "Support accountable procurement and resource allocation.",
      "Align development spending with sector priorities.",
    ],
    programs: ["Annual budget planning", "Revenue reporting", "Project finance monitoring"],
    contact: "finance@limukosa.gov.et",
  },
  {
    id: "land-administration",
    name: "Land Administration Office",
    shortName: "Land Administration",
    icon: MapPin,
    description:
      "Supports land records, rural land use coordination, boundary information, and responsible land management.",
    responsibilities: [
      "Maintain public land administration information and records.",
      "Coordinate land use planning with kebele administrations.",
      "Support responsible investment site screening.",
      "Assist communities with land-related public guidance.",
    ],
    programs: ["Land record support", "Land use guidance", "Boundary coordination"],
    contact: "land@limukosa.gov.et",
  },
  {
    id: "water-energy",
    name: "Water & Energy Office",
    shortName: "Water & Energy",
    icon: Droplets,
    description:
      "Coordinates water access, rural water schemes, energy awareness, and maintenance planning with communities.",
    responsibilities: [
      "Support drinking water access planning and maintenance follow-up.",
      "Coordinate water scheme reporting with kebeles.",
      "Promote responsible watershed and source protection.",
      "Assist public awareness around energy and water conservation.",
    ],
    programs: ["Rural water access", "Water source protection", "Scheme maintenance follow-up"],
    contact: "water@limukosa.gov.et",
  },
  {
    id: "trade-industry",
    name: "Trade & Industry Office",
    shortName: "Trade & Industry",
    icon: Briefcase,
    description:
      "Promotes local enterprise, market coordination, trade licensing guidance, and value chain opportunities.",
    responsibilities: [
      "Support local traders, cooperatives, and small businesses.",
      "Provide investment and licensing guidance.",
      "Promote coffee, livestock, tourism, and light manufacturing value chains.",
      "Coordinate market information for public planning.",
    ],
    programs: ["Enterprise support", "Market information", "Investment guidance"],
    contact: "trade@limukosa.gov.et",
  },
  {
    id: "women-social-affairs",
    name: "Women & Social Affairs Office",
    shortName: "Women & Social Affairs",
    icon: Users,
    description:
      "Supports inclusion, community wellbeing, women-focused development, and social protection coordination.",
    responsibilities: [
      "Promote women participation in public and economic life.",
      "Coordinate social affairs programs with communities and partners.",
      "Support vulnerable groups through referral and awareness systems.",
      "Advance inclusive planning across woreda sectors.",
    ],
    programs: ["Women empowerment", "Social protection coordination", "Community inclusion"],
    contact: "social@limukosa.gov.et",
  },
  {
    id: "youth-sports",
    name: "Youth & Sports Office",
    shortName: "Youth & Sports",
    icon: BadgeCheck,
    description:
      "Coordinates youth participation, sport development, community activities, and youth opportunity programs.",
    responsibilities: [
      "Organize youth engagement and sport development activities.",
      "Support youth clubs, community events, and skills initiatives.",
      "Coordinate with schools and kebeles on participation programs.",
      "Promote healthy, constructive community involvement.",
    ],
    programs: ["Youth engagement", "Sport events", "Skills awareness"],
    contact: "youth@limukosa.gov.et",
  },
  {
    id: "culture-tourism",
    name: "Culture & Tourism Office",
    shortName: "Culture & Tourism",
    icon: Mountain,
    description:
      "Promotes natural attractions, coffee culture, heritage sites, festivals, and visitor information.",
    responsibilities: [
      "Document and promote tourism sites and cultural heritage.",
      "Coordinate visitor information and community tourism opportunities.",
      "Support heritage awareness and festival promotion.",
      "Work with partners on sustainable tourism development.",
    ],
    programs: ["Tourism site promotion", "Coffee culture storytelling", "Heritage documentation"],
    contact: "tourism@limukosa.gov.et",
  },
  {
    id: "peace-security",
    name: "Peace & Security Administration",
    shortName: "Peace & Security",
    icon: ShieldCheck,
    description:
      "Coordinates community peace, safety communication, local security alignment, and inter-kebele cooperation.",
    responsibilities: [
      "Coordinate peace-building activities with kebele administrations.",
      "Support public safety communication and community mediation.",
      "Track local concerns that affect service delivery and public stability.",
      "Work with relevant offices during urgent public notices.",
    ],
    programs: ["Community peace coordination", "Public safety notices", "Inter-kebele cooperation"],
    contact: "security@limukosa.gov.et",
  },
  {
    id: "justice",
    name: "Justice Office",
    shortName: "Justice",
    icon: Scale,
    description:
      "Provides legal guidance, public legal awareness, civil record support, and administrative justice coordination.",
    responsibilities: [
      "Provide public legal information through appropriate channels.",
      "Coordinate civil and administrative justice support.",
      "Support public awareness on rights, responsibilities, and procedures.",
      "Work with offices to strengthen transparent administration.",
    ],
    programs: ["Legal awareness", "Civil record guidance", "Administrative justice support"],
    contact: "justice@limukosa.gov.et",
  },
];

export const leaders = [
  {
    name: "Woreda Chief Administrator",
    role: "Head of Woreda Administration",
    bio: "Leads overall public administration, inter-office coordination, and woreda development priorities.",
    responsibilities: ["Strategic leadership", "Public accountability", "Development coordination"],
  },
  {
    name: "Deputy Administrator",
    role: "Deputy Head of Administration",
    bio: "Supports daily government coordination and follows sector implementation across departments.",
    responsibilities: ["Sector follow-up", "Office coordination", "Community response"],
  },
  {
    name: "Administration Council Secretary",
    role: "Council and Records Coordination",
    bio: "Supports official meeting records, public notices, and administrative communication workflows.",
    responsibilities: ["Council records", "Notice coordination", "Document routing"],
  },
];

export const newsItems = [
  {
    title: "Coffee quality support expands to rural kebeles",
    category: "Agriculture",
    date: "Public update",
    excerpt:
      "The agriculture office is coordinating farmer support around shade-grown coffee quality, cooperative reporting, and forest-friendly practices.",
  },
  {
    title: "Woreda offices prepare updated public document registry",
    category: "Administration",
    date: "Public update",
    excerpt:
      "Sector offices are organizing annual plans, brochures, and reports for easier public access through the downloads section.",
  },
  {
    title: "Tourism profile highlights Bolo Caves and Lake Cheleleki",
    category: "Tourism",
    date: "Public update",
    excerpt:
      "Culture and tourism teams are preparing destination information to promote responsible local tourism and heritage awareness.",
  },
];

export const announcements = [
  {
    title: "Public consultation on natural resource protection",
    type: "Community meeting",
    date: "To be scheduled",
    body: "Kebele representatives and community members will be invited for discussion on forest protection and watershed care priorities.",
  },
  {
    title: "Office document submission reminder",
    type: "Office notice",
    date: "Ongoing",
    body: "Departments preparing public reports should submit approved files for publication in the website downloads section.",
  },
  {
    title: "Investment information desk",
    type: "Investor notice",
    date: "Working days",
    body: "Investors interested in agriculture, coffee, livestock, light manufacturing, and tourism can contact the Trade and Industry Office.",
  },
];

export const projects = [
  {
    title: "Rural Water Access Follow-up",
    status: "Ongoing",
    location: "Selected rural kebeles",
    description:
      "Coordination of water scheme maintenance reporting and public access improvements with community structures.",
    icon: Waves,
  },
  {
    title: "Forest Coffee Conservation Support",
    status: "Ongoing",
    location: "Protected forest areas",
    description:
      "Promotion of sustainable coffee production, selective tree protection, and participatory forest management.",
    icon: Coffee,
  },
  {
    title: "Public Document Digitization",
    status: "Planned",
    location: "Woreda administration offices",
    description:
      "Preparation of public reports, strategic plans, brochures, and forms for future CMS-backed publication.",
    icon: FileText,
  },
];

export const investmentSectors = [
  {
    title: "Coffee Production and Processing",
    icon: Coffee,
    body: "Highland and midland environments support forest coffee, cooperative partnerships, drying, grading, and value addition.",
  },
  {
    title: "Agriculture and Agro-processing",
    icon: Sprout,
    body: "Maize, sorghum, teff, fruits, sugar cane, honey, and livestock create opportunities for responsible agribusiness.",
  },
  {
    title: "Tourism and Hospitality",
    icon: Mountain,
    body: "Bolo Caves, Lake Cheleleki, coffee culture, forests, and heritage sites support eco-tourism services.",
  },
  {
    title: "Light Manufacturing and Trade",
    icon: Briefcase,
    body: "Local market links, road access, and agricultural outputs create opportunities for small-scale processing and trade.",
  },
];

export const tourismSites = [
  {
    title: "Lake Cheleleki",
    icon: Waves,
    body: "A notable natural landmark suitable for visitor information, conservation awareness, and local destination storytelling.",
  },
  {
    title: "Bolo Caves",
    icon: Mountain,
    body: "A distinctive landscape feature that can anchor heritage tourism and guided exploration programs.",
  },
  {
    title: "Tiro Boter Becho and Babia Folla Forests",
    icon: Trees,
    body: "Protected montane forest systems tied to biodiversity, rainfall regulation, and wild Arabica coffee heritage.",
  },
  {
    title: "Coffee Culture",
    icon: Coffee,
    body: "Limu Kosa's identity is closely connected to shade-grown coffee, farmer cooperatives, and community traditions.",
  },
];

export const galleryCategories = [
  { title: "Government Activities", count: "12 planned", icon: Landmark },
  { title: "Infrastructure Projects", count: "8 planned", icon: Building2 },
  { title: "Agriculture and Coffee", count: "16 planned", icon: Coffee },
  { title: "Tourism and Nature", count: "10 planned", icon: Camera },
  { title: "Community Events", count: "9 planned", icon: Users },
];

export const downloads = [
  { title: "Annual Reports", type: "Reports", icon: FileText },
  { title: "Strategic Plans", type: "Planning", icon: BookOpen },
  { title: "Budget Reports", type: "Finance", icon: Coins },
  { title: "Public Forms", type: "Forms", icon: Download },
  { title: "Tourism Brochures", type: "Brochures", icon: MapPin },
  { title: "Policies and Guidelines", type: "Policies", icon: Scale },
];

export const contactChannels = [
  { label: "Office Address", value: "Limmu Genet, Jimma Zone, Oromia, Ethiopia", icon: MapPin },
  { label: "Telephone", value: "+251 97 111 XXXX", icon: Phone },
  { label: "Email", value: "info@limukosa.gov.et", icon: Megaphone },
  { label: "Working Hours", value: "Monday to Friday, 8:30 AM - 5:30 PM", icon: CalendarDays },
];

export const values = [
  "Transparency",
  "Public service",
  "Sustainable development",
  "Community participation",
  "Cultural respect",
  "Environmental stewardship",
];

export const economyHighlights = [
  { title: "Coffee", body: "Forest and shade-grown Arabica coffee is a defining cash crop and investment identity.", icon: Coffee },
  { title: "Mixed Farming", body: "Maize, sorghum, teff, fruit, sugar cane, and livestock support household livelihoods.", icon: Sprout },
  { title: "Forests", body: "Protected forests support biodiversity, rainfall, honey, grazing, and local livelihoods.", icon: Leaf },
];
