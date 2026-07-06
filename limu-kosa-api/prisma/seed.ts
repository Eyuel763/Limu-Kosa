import { PrismaClient, ContentType, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@12345", 10);

  // 1. Seed admin user
  await prisma.user.upsert({
    where: { email: "admin@limukosa.gov.et" },
    update: { passwordHash },
    create: {
      name: "Website Administrator",
      email: "admin@limukosa.gov.et",
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  console.log("Seeded administrator");

  // 2. Seed News
  const newsItems = [
    {
      title: "Coffee quality support expands to rural kebeles",
      slug: "coffee-quality-support-expands-to-rural-kebeles",
      excerpt: "The agriculture office is coordinating farmer support around shade-grown coffee quality, cooperative reporting, and forest-friendly practices.",
      body: "Limu Kosa Woreda Agriculture and Natural Resources Office has launched an expanded support program targeting smallholder coffee growers in remote kebeles. The initiative aims to improve harvesting techniques, post-harvest handling, and access to cooperative processing. By strengthening cooperative linkages and encouraging organic, shade-grown methods, the administration aims to elevate the profile of Limu coffee in international markets while protecting the region's unique forest canopy.",
      category: "Agriculture",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Woreda offices prepare updated public document registry",
      slug: "woreda-offices-prepare-updated-public-document-registry",
      excerpt: "Sector offices are organizing annual plans, brochures, and reports for easier public access through the downloads section.",
      body: "In line with government commitment to transparency and modern service delivery, Limu Kosa Woreda sector offices are finalizing a centralized registry of public documents. Citizens will soon be able to download official budget allocation sheets, annual sector reports, town plans, and development guidelines directly from the online portal, reducing administrative waiting times.",
      category: "Administration",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Tourism profile highlights Bolo Caves and Lake Cheleleki",
      slug: "tourism-profile-highlights-bolo-caves-and-lake-cheleleki",
      excerpt: "Culture and tourism teams are preparing destination information to promote responsible local tourism and heritage awareness.",
      body: "The Culture and Tourism Office has released an updated profile of key natural landmarks in Limu Kosa, focusing on the historical Bolo Caves and the scenic Lake Cheleleki. The initiative aims to catalog local geological and historical features, build community-led eco-guides, and promote responsible visits that support local economies while conserving biodiversity.",
      category: "Tourism",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  ];

  for (const item of newsItems) {
    await prisma.contentItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        type: ContentType.NEWS,
        ...item,
      },
    });
  }
  console.log("Seeded news items");

  // 3. Seed Announcements
  const announcements = [
    {
      title: "Public consultation on natural resource protection",
      slug: "public-consultation-on-natural-resource-protection",
      excerpt: "Kebele representatives and community members are invited to discuss forest protection and watershed care priorities.",
      body: "A public town hall and consultation session will be convened next month to review community-based management of protected forests and agricultural watersheds. All local elders, youth leaders, agricultural experts, and residents are encouraged to participate and share priorities for sustainable land use and coffee forest preservation.",
      category: "Community meeting",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Office document submission reminder",
      slug: "office-document-submission-reminder",
      excerpt: "Departments preparing public reports should submit approved files for publication in the website downloads section.",
      body: "This is an internal notice for all woreda department heads and communications coordinators. Approved annual plans, budget summaries, and citizen forms must be submitted to the IT/Administration desk to ensure they are uploaded to the public portal in a timely manner.",
      category: "Office notice",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Investment information desk open",
      slug: "investment-information-desk-open",
      excerpt: "Investors interested in agriculture, coffee, livestock, light manufacturing, and tourism can contact the Trade and Industry Office.",
      body: "The Trade and Industry Office has established a dedicated focal desk to guide potential investors through licensing, land verification, and local agricultural cooperative partnerships. Inquiries regarding coffee processing, eco-tourism, and agro-processing investments are highly welcome during standard working hours.",
      category: "Investor notice",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  ];

  for (const item of announcements) {
    await prisma.contentItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        type: ContentType.ANNOUNCEMENT,
        ...item,
      },
    });
  }
  console.log("Seeded announcements");

  // 4. Seed Projects
  const projects = [
    {
      title: "Rural Water Access Follow-up",
      slug: "rural-water-access-follow-up",
      excerpt: "Coordination of water scheme maintenance reporting and public access improvements with community structures.",
      body: "This project focuses on auditing and rehabilitation of rural hand pumps and spring protections across selected kebeles. By training local water committees and establishing direct mobile reporting channels to the Woreda Water & Energy Office, the administration aims to improve clean water availability and ensure rapid repair times.",
      category: "Infrastructure",
      location: "Selected rural kebeles",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Forest Coffee Conservation Support",
      slug: "forest-coffee-conservation-support",
      excerpt: "Promotion of sustainable coffee production, selective tree protection, and participatory forest management.",
      body: "Working with international environmental partners and local cooperatives, this program provides training on shade-grown coffee management. Farmers learn how to selectively harvest wild Arabica coffee, establish eco-friendly drying beds, and maintain native forest species that support the coffee ecosystem.",
      category: "Agriculture",
      location: "Protected forest areas",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Public Document Digitization",
      slug: "public-document-digitization",
      excerpt: "Preparation of public reports, strategic plans, brochures, and forms for future CMS-backed publication.",
      body: "An administrative modernization project to scan, clean, and categorize historic and current woreda policies, public statistics, and official service request forms. The end goal is to ensure easy access to public information, supporting transparency and administrative speed.",
      category: "Capacity Building",
      location: "Woreda administration offices",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  ];

  for (const item of projects) {
    await prisma.contentItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        type: ContentType.PROJECT,
        ...item,
      },
    });
  }
  console.log("Seeded projects");

  // 5. Seed Investment
  const investmentSectors = [
    {
      title: "Coffee Production and Processing",
      slug: "coffee-production-and-processing",
      excerpt: "Highland and midland environments support forest coffee, cooperative partnerships, drying, grading, and value addition.",
      body: "Limu Kosa is famous for its high-quality, shade-grown Arabica coffee. The region offers exceptional opportunities for investors to establish modern drying stations, washing stations, eco-friendly hullers, and packaging units, partnering with local farmer cooperatives to build robust, trace-transparent value chains.",
      category: "Investment",
      status: "PUBLISHED",
    },
    {
      title: "Agriculture and Agro-processing",
      slug: "agriculture-and-agro-processing",
      excerpt: "Maize, sorghum, teff, fruits, sugar cane, honey, and livestock create opportunities for responsible agribusiness.",
      body: "The diverse agro-ecological zones of Limu Kosa support various crops, fruit cultivation, honey harvesting, and dairy production. Opportunities exist for processing plants, fruit canning, honey refining, and feed formulation to serve both regional and national markets.",
      category: "Investment",
      status: "PUBLISHED",
    },
    {
      title: "Tourism and Hospitality",
      slug: "tourism-and-hospitality-investment",
      excerpt: "Bolo Caves, Lake Cheleleki, coffee culture, forests, and heritage sites support eco-tourism services.",
      body: "With pristine nature, indigenous coffee forests, and unique geological sites like Bolo Caves, Limu Kosa is positioned for community-based eco-tourism. Investors can develop sustainable lodges, guided tour services, and cultural centers celebrating Jimma's rich coffee heritage.",
      category: "Investment",
      status: "PUBLISHED",
    },
    {
      title: "Light Manufacturing and Trade",
      slug: "light-manufacturing-and-trade",
      excerpt: "Local market links, road access, and agricultural outputs create opportunities for small-scale processing and trade.",
      body: "To support the growing urban centers like Limmu Genet, the woreda encourages investments in light manufacturing (e.g., clay production, wood processing, local metal works) and agricultural trade logistics to bridge local production with regional trading hubs.",
      category: "Investment",
      status: "PUBLISHED",
    },
  ];

  for (const item of investmentSectors) {
    await prisma.contentItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        type: ContentType.INVESTMENT,
        ...item,
      },
    });
  }
  console.log("Seeded investment sectors");

  // 6. Seed Tourism
  const tourismSites = [
    {
      title: "Lake Cheleleki",
      slug: "lake-cheleleki",
      excerpt: "A notable natural landmark suitable for visitor information, conservation awareness, and local destination storytelling.",
      body: "Lake Cheleleki is a beautiful wetland and water body that supports diverse bird species and local flora. It serves as a vital ecological site and offers peaceful vistas for nature enthusiasts interested in bird watching, photography, and wetland conservation education.",
      category: "Tourism",
      status: "PUBLISHED",
    },
    {
      title: "Bolo Caves",
      slug: "bolo-caves",
      excerpt: "A distinctive landscape feature that can anchor heritage tourism and guided exploration programs.",
      body: "The historical Bolo Caves feature unique geological rock formations and carry deep historical significance for the local communities. The woreda is working to map the cave networks and establish community-led guide systems to allow safe, informative tours.",
      category: "Tourism",
      status: "PUBLISHED",
    },
    {
      title: "Tiro Boter Becho and Babia Folla Forests",
      slug: "tiro-boter-becho-and-babia-folla-forests",
      excerpt: "Protected montane forest systems tied to biodiversity, rainfall regulation, and wild Arabica coffee heritage.",
      body: "These expansive native forests represent some of the most critical ecosystems in southwest Ethiopia. They host wild coffee populations, diverse animal species (including rare birds and primates), regulate regional climate, and serve as crucial water catchment zones.",
      category: "Tourism",
      status: "PUBLISHED",
    },
    {
      title: "Coffee Culture",
      slug: "coffee-culture-tourism",
      excerpt: "Limu Kosa's identity is closely connected to shade-grown coffee, farmer cooperatives, and community traditions.",
      body: "Visiting Limu Kosa is an immersion into coffee culture. Visitors can witness traditional coffee ceremonies, tour cooperative farms, learn about ancient shade-growing methods passed down generations, and taste fresh, single-origin coffee directly from the source.",
      category: "Tourism",
      status: "PUBLISHED",
    },
  ];

  for (const item of tourismSites) {
    await prisma.contentItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        type: ContentType.TOURISM,
        ...item,
      },
    });
  }
  console.log("Seeded tourism sites");

  // 7. Seed Departments
  const departments = [
    {
      id: "agriculture",
      name: "Agriculture & Natural Resources Office",
      slug: "agriculture",
      shortName: "Agriculture",
      description: "Supports crop production, livestock, coffee development, watershed care, and natural resource protection across rural kebeles.",
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
      slug: "health",
      shortName: "Health",
      description: "Coordinates public health services, disease prevention, sanitation, maternal care, and community health education.",
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
      slug: "education",
      shortName: "Education",
      description: "Administers public education planning, school support, teacher coordination, and learning improvement programs.",
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
      slug: "finance",
      shortName: "Finance",
      description: "Handles local budget coordination, revenue planning, procurement support, and development finance reporting.",
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
      slug: "land-administration",
      shortName: "Land Administration",
      description: "Supports land records, rural land use coordination, boundary information, and responsible land management.",
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
      slug: "water-energy",
      shortName: "Water & Energy",
      description: "Coordinates water access, rural water schemes, energy awareness, and maintenance planning with communities.",
      responsibilities: [
        "Support drinking water access planning and maintenance follow-up.",
        "Coordinate water scheme reporting with kebeles.",
        "Promote responsible watershed and source protection.",
        "Assist public awareness around energy and water conservation.",
      ],
      programs: ["Rural water access", "Water source protection", "Scheme maintenance follow-up"],
      contact: "water@limukosa.gov.et",
    },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {},
      create: dept,
    });
  }
  console.log("Seeded departments");

  // 8. Seed Leaders
  const leaders = [
    {
      name: "Ato Lemma Negash",
      position: "Woreda Chief Administrator",
      biography: "Ato Lemma Negash has served in public administration for over 15 years. He leads overall public administration, inter-office coordination, and woreda development priorities in Limu Kosa, focusing on agricultural modernization and road connectivity.",
      responsibilities: ["Strategic leadership", "Public accountability", "Development coordination"],
      contact: "lemma.n@limukosa.gov.et",
      sortOrder: 1,
    },
    {
      name: "Wizero Abebech Tolosa",
      position: "Deputy Woreda Administrator",
      biography: "Wizero Abebech Tolosa oversees local social service delivery, youth engagement, and sector performance coordination. She works closely with rural cooperatives to strengthen community health and education programs.",
      responsibilities: ["Sector follow-up", "Office coordination", "Community response"],
      contact: "abebech.t@limukosa.gov.et",
      sortOrder: 2,
    },
    {
      name: "Ato Solomon Girma",
      position: "Administration Council Secretary",
      biography: "Ato Solomon Girma manages the administrative cabinet records, local regulations registry, and coordinates official communications between the Woreda Cabinet and public sector offices.",
      responsibilities: ["Council records", "Notice coordination", "Document routing"],
      contact: "solomon.g@limukosa.gov.et",
      sortOrder: 3,
    },
  ];

  for (const leader of leaders) {
    await prisma.leader.create({
      data: leader,
    });
  }
  console.log("Seeded leaders");

  // 9. Seed Downloads
  const downloads = [
    {
      title: "Annual Development Report 2015 EFY",
      category: "Reports",
      fileUrl: "/uploads/mock-development-report.pdf",
      description: "Comprehensive summary of crop production, health coverage, school enrollment, and budget execution across Limu Kosa.",
    },
    {
      title: "Limu Kosa Investment Brochure",
      category: "Brochures",
      fileUrl: "/uploads/mock-investment-brochure.pdf",
      description: "Key demographic details, coffee production capacity, tourist attractions, and guidelines for agricultural licensing.",
    },
    {
      title: "Land Use Application Form",
      category: "Forms",
      fileUrl: "/uploads/mock-land-form.pdf",
      description: "Official form for requesting public land lease review for commercial or cooperative agricultural projects.",
    },
  ];

  for (const dl of downloads) {
    await prisma.download.create({
      data: dl,
    });
  }
  console.log("Seeded downloads");

  // 10. Seed Gallery
  const gallery = [
    {
      title: "Traditional Coffee Drying Beds",
      category: "Agriculture and Coffee",
      imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
      altText: "Raised wooden beds drying red coffee cherries under shade",
    },
    {
      title: "Woreda Council Hall Consultation",
      category: "Government Activities",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      altText: "Sector leaders and community delegates sitting in a meeting hall",
    },
  ];

  for (const img of gallery) {
    await prisma.galleryImage.create({
      data: img,
    });
  }
  console.log("Seeded gallery images");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
