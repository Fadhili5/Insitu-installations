export type LocaleKey = 'en' | 'zh' | 'zhHK'

export type LocalizedString = {
  en: string
  zh: string
  zhHK: string
}

export type Installation = {
  id: string
  label: string
  title: LocalizedString
  location: string
  coords: { xPct: number; yPct: number }
  badges: string[]
  description?: LocalizedString
  artists?: LocalizedString
  artistImage?: string
  annotationImage?: string
  teamInfo?: LocalizedString
  installationInfo?: LocalizedString
  model?: {
    obj?: string
    mtl?: string
    mobileObj?: string
    glb?: string
    mobileGlb?: string
  }
  cameraHint?: {
    position: [number, number, number]
    target: [number, number, number]
    distance?: number
  }
}

export const installations: Installation[] = [
  {
    id: 'a',
    label: 'a',
    title: {
      en: 'Letters to Macau',
      zh: '致澳門的信',
      zhHK: '致澳門的信',
    },
    location: 'Travessa do Aterro',
    coords: { xPct: 83, yPct: 24 },
    badges: ['International'],
    model: {
      glb: '/lma.glb',
    },
    artistImage: '/lettersmac.png',
    annotationImage: '/lm.png',
    artists: {
      en: 'Sebastian Trujillo-Torres | Spain\nKruti Dhiresh Shah | India',
      zh: '',
      zhHK: '',
    },
    teamInfo: {
      en: `Chaal Chaal Agency (CCA), founded by architects Kruti Shah and Sebastián Trujillo-Torres, is a design-research collective focused on experimental infrastructures and spatial politics. Their noted projects, such as The Walking Drawing and The Mobile Engawa, emphasize public-generative devices and field research in Global South contexts to facilitate community transformations. CCA has been recognized with the Ammodo Architecture Award.`,
      zh: '',
      zhHK: '',
    },
    installationInfo: {
      en: `Letters to Macau reinterprets the city’s postal box as a reflective urban device, incorporating moon gates and patios in a passage-like installation that serves as a threshold and gathering space. It invites visitors to post letters with their memories and ideas for renewal, contributing to a civic archive. Made from ten CNC-cut plywood panels with interlocking planes, the structure embodies varying openness and enclosure, harmonizing with the local environment. Finished in matte red with white accents, it represents Macau’s postal heritage while promoting ecological economy and public engagement, functioning as both artefact and civic interaction tool.`,
      zh: '',
      zhHK: '',
    },
  },
  {
    id: 'b',
    label: 'b',
    title: {
      en: 'UnPlan',
      zh: '非計劃書',
      zhHK: '非計劃書',
    },
    location: 'Largo de Santo Agostinho',
    coords: { xPct: 83.5, yPct: 39.8 },
    badges: ['International'],
    model: {
      glb: '/curve.glb',
    },
    artistImage: '/unplan.png',
    annotationImage: '/up.png',
    artists: {
      en: 'Filipa Frois Almeida | Portugal\nHugo Alexandre Pinheiro Reis | Portugal',
      zh: '',
      zhHK: '',
    },
    teamInfo: {
      en: `FAHR 021.3, founded in 2012 by Filipa Frois Almeida and Hugo Reis, is an art and architecture studio known for its diverse work, including critical spatial practices, installations, scenography, programming, and curation. The studio has gained international recognition for its formal and speculative projects, including participation in the 16th International Architecture Exhibition LaBiennale di Venezia in 2018, directing ‘Desencaminharte’ in 2018/19, and leading the Évora_27 project “The Fair: Beauty, Sustainability and Inclusion” in 2023/24.`,
      zh: '',
      zhHK: '',
    },
    installationInfo: {
      en: `UnPlan is a temporary installation that reinterprets public space by introducing a moment of pause within an urban context marked by activity and routine. It serves as an open surface, fostering new approaches to planning and interaction rather than dictating behavior. The project views public space as a dynamic arena for encounters and cultural expression, positioning itself as an unexpectedly placed object. Its design encourages spontaneity and resists precise categorization, acting as a platform, backdrop, and sign. The distinctive gentle curve signifies temporality and invites communal engagement, allowing meaning to develop through shared use. Ultimately, UnPlan re-envisions public space, emphasizing collective imagination over routine.`,
      zh: '',
      zhHK: '',
    },
  },
  {
    id: 'c',
    label: 'c',
    title: {
      en: 'Multi-Place',
      zh: '交疊場',
      zhHK: '交疊場',
    },
    location: 'Largo do Lilau',
    coords: { xPct: 46, yPct: 67 },
    badges: ['International'],
    model: {
      glb: '/mpp.glb',
    },
    artistImage: '/multiplace.png',
    annotationImage: '/mp.png',
    artists: {
      en: '黃奕斯 Yik Sze Wong | Hong Kong',
      zh: '',
      zhHK: '',
    },
    teamInfo: {
      en: `Yik Sze Wong’s practice integrates creative writing, publishing, and marketing to examine emotional experiences in urban spaces. As a bookbinder and designer, she enhances her understanding of materiality and form through tactile experiences. Her research involves observing urban behavior, focusing on how curated public spaces can foster imagination and connection, countering the potential loneliness in cities. This philosophy underpins her work.`,
      zh: '',
      zhHK: '',
    },
    installationInfo: {
      en: `Where Time Crystallizes is a site-specific installation in Pátio da Claridade, composed of nine mirrored crystal forms and a flowing carpet that evokes a river of time. Each crystal contains photographs, video fragments, and everyday objects sourced from Jason Lei’s documentation of the neighborhood before its residents relocated. The mirrored exteriors reflect the present street and passersby, while the enclosed interiors invite viewers to peer into traces of the past. To foster more active public participation in the design of public spaces, we must reconsider traditional models that have largely prioritized designers’ perspectives. Recognizing the dynamic nature of urban environments, this initiative aims to explore flexible spatial models that enhance community interaction, strengthen social cohesion, and create a more inclusive public realm.`,
      zh: '',
      zhHK: '',
    },
  },
  {
    id: 'd',
    label: 'd',
    title: {
      en: 'Resonatorium',
      zh: '聽·所',
      zhHK: '聽·所',
    },
    location: 'Near Ponte e Horta',
    coords: { xPct: 44, yPct: 21 },
    badges: ['Local'],
    model: {
      glb: '/rtt.glb',
    },
    artistImage: '/resonat.png',
    annotationImage: '/rt.png',
    artists: {
      en: '劉安敬 Joseph Lau\n劉家銘 Lawrence Liu',
      zh: '',
      zhHK: '',
    },
    teamInfo: {
      en: `Joseph Lau was born and raised in Hong Kong and Macau, Christian. He earned his bachelor’s degree in Music Theory and Composition from National Taiwan Normal University. As a sound artist and contemporary composer, his practice often engages with themes of religious belief and the nature of time, continually probing new possibilities of expression and perception. Lawrence Liu, born in Macau, holds a bachelor’s degree in Computer Science from National Taiwan University. His work primarily involves installation and programming languages, with artistic explorations that begin from self-reflection and extend to the dynamic relationships between humans, technology, and society through the transformation of data and information. Both are currently pursuing graduate studies at the Graduate Institute of New Media Art, Taipei National University of the Arts.`,
      zh: '',
      zhHK: '',
    },
    installationInfo: {
      en: `Inspired by the echoes and sounds within church interiors, as well as the historical imagery of the predecessor wooden church of São Lourenço Church, this installation creates a resonance unique to the local past and present sounds. It is constructed as a semi-open spatial installation using wooden sound modules, allowing the structure itself to act as a resonator. When wind and ambient sounds enter the installation, they are filtered and amplified into different sound frequencies by the resonance tubes, blending with each other to produce random and flowing sound fragments.`,
      zh: '',
      zhHK: '',
    },
  },
  {
    id: 'e',
    label: 'e',
    title: {
      en: 'Furniture Where Life Begins',
      zh: '北園·即生活',
      zhHK: '北園·即生活',
    },
    location: 'Largo do Aquino',
    coords: { xPct: 65, yPct: 25.5 },
    badges: ['Local'],
    model: {
      glb: '/fbb.glb',
    },
    artistImage: '/lifebegins.png',
    annotationImage: '/fb.png',
    artists: {
      en: '盧穎曦 Lo Wing Hei',
      zh: '',
      zhHK: '',
    },
    teamInfo: {
      en: `Lo Wing Hei holds a Master in Architecture degree from the Chinese University of Hong Kong. She gained professional work experience in Macau and at Kovaleva and Sato Architects (KASA) in Tokyo, where her work was featured in Japan’s LIXIL eye magazine recently. She contributed to the installation of the “Chubb Life Forest” at Art Basel Hong Kong 2024 and earned an honourable mention in the 2024 CURB “Placeable City” placemaking competition. She is currently working as a cultural researcher and designer at Poetic Force Group in Hong Kong, while also working part-time as a bookshop assistant at Júbilo 31 Books in Macau.`,
      zh: '',
      zhHK: '',
    },
    installationInfo: {
      en: `“FURNITURE WHERE LIFE BEGINS” highlights the significance of furniture in forming homes and identities, emphasizing its role in cultivating connections and preserving memories. The IN SITU Placemaking Occupied Patio project reimagines furniture as easily assembled or disassembled, encouraging community engagement in its setup. Additionally, the furniture serves as a supply swapping station, facilitating its ongoing journey. This initiative celebrates furniture as a means of fostering community spirit and shared experiences, transforming the space into a vibrant space for co-creation and connection.`,
      zh: '',
      zhHK: '',
    },
  },
  {
    id: 'f',
    label: 'f',
    title: {
      en: 'Where Time Crystallizes',
      zh: '當·時光流',
      zhHK: '當·時光流',
    },
    location: 'Pátio da Claridade',
    coords: { xPct: 25.5, yPct: 60 },
    badges: ['Local'],
    model: {
      glb: '/tcc.glb',
    },
    artistImage: '/timecry.png',
    annotationImage: '/tc.png',
    artists: {
      en: '李美昕 Lei Mei Ian | 姜昕彤 Jiang Xintong | 徐慧瑶 Xu Huiyao | 王姝萌 Wang Shumeng',
      zh: '',
      zhHK: '',
    },
    teamInfo: {
      en: `The team hails from the Master’s program in Communication Design at the Faculty of Humanities and Arts, Macau University of Science and Technology. It is composed of Lei Mei Ian, Wang Shumeng, Jiang Xintong, and Xu Huiyao. Their backgrounds span visual communication, spatial design, and experimental art. They excel at approaching social issues from interdisciplinary perspectives, integrating research insights into diverse creative methodologies to produce art and design works that are both profound and innovative. Their work showcases the professional vitality and contemporary expressive power of a new generation of creators.`,
      zh: '',
      zhHK: '',
    },
    installationInfo: {
      en: `Where Time Crystallizes is a site-specific installation in Pátio da Claridade, composed of nine mirrored crystal forms and a flowing carpet that evokes a river of time. Each crystal contains photographs, video fragments, and everyday objects sourced from Jason Lei’s documentation of the neighborhood before its residents relocated. The mirrored exteriors reflect the present street and passersby, while the enclosed interiors invite viewers to peer into traces of the past.`,
      zh: '',
      zhHK: '',
    },
  },
]

