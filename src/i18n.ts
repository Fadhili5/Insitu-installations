import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      hero: {
        eyebrow: 'Spatial Installations',
        title: 'IN SITU Placemaking Biennale: Macau’s public space laboratory',
        body:
          'Macau’s first international placemaking event by CURB – Center for Architecture and Urbanism, focused on how streets and public space bring people together. Grounded in local identity and open to global collaboration, IN SITU turns the city into a living lab with installations, workshops, performances, and cultural activities.',
        ctaHotspots: 'Add map hotspots',
        ctaObj: 'Import OBJ model',
      },
      legend: {
        title: 'Installations',
        subtitle: 'Click a listing to highlight the matching pin.',
      },
      map: {
        title: 'Tap a pin to view the installation',
        subtitle:
          'Pins are positioned with percentage coordinates so they stay aligned as the map scales on desktop and mobile.',
        placeholder: 'Drop your poster map here',
      },
      viewer: {
        close: 'Close overlay',
        loading: 'Loading model…',
        ready: 'OBJ viewer coming up next',
        placeholder: 'Three.js canvas placeholder',
        annotationTitle: 'Annotations & notes',
        annotationCopy:
          'This overlay will host the three.js OBJ viewer with orbit controls, presets, and multilingual annotations.',
        infoTitle: 'Artwork & artist info',
        infoCopy: 'Artist, credits, and artwork details will appear here.',
        expandOverlay: 'Expand',
        collapseOverlay: 'Collapse',
        showInfo: 'Show details',
        hideInfo: 'Hide details',
        artistsLabel: 'Artist(s)',
        teamInfoLabel: 'Team',
        noModel: 'No OBJ provided yet. Upload or link your model to view it here.',
        loadError: 'There was a problem loading this model.',
        noWebGL: 'WebGL is not available in this browser.',
      },
      placemaking: {
        title: 'Placemaking',
        body1:
          'Placemaking inspires people to collectively reimagine and reinvent public spaces as the heart of every community. Strengthening the connection between people and the places they share, placemaking refers to a collaborative process by which we can shape our public realm in order to maximize shared value.',
        body2:
          'More than just promoting better urban design, placemaking facilitates creative patterns of use, paying particular attention to the physical, cultural, and social identities that define a place and support its ongoing evolution.',
      },
    },
  },
  zh: {
    translation: {
      hero: {
        eyebrow: '空間裝置',
        title: '互動地圖與三維激光掃描模型（React + three.js）',
        body:
          '使用海報地圖為底層。點擊釘選放大到裝置位置，進入 three.js 視圖查看 LiDAR 掃描的 OBJ 模型，並在中英雙語（含普通話）註解中瀏覽。',
        ctaHotspots: '添加地圖釘選',
        ctaObj: '導入 OBJ 模型',
      },
      legend: {
        title: '裝置列表',
        subtitle: '點擊列表以高亮對應釘選。',
      },
      map: {
        title: '點擊釘選查看裝置',
        subtitle: '釘選以百分比佈局，確保在桌面與行動裝置上對齊。',
        placeholder: '在此放置海報地圖',
      },
      viewer: {
        close: '關閉視窗',
        loading: '正在載入模型…',
        ready: '即將加入 OBJ 觀看器',
        placeholder: 'three.js 畫布佔位',
        annotationTitle: '註解與備註',
        annotationCopy: '此視窗將放置 three.js OBJ 觀看器、視角預設與多語註解。',
        infoTitle: '作品與藝術家資訊',
        infoCopy: '藝術家、鳴謝與作品資訊將顯示於此。',
        expandOverlay: '全螢幕',
        collapseOverlay: '退出全螢幕',
        showInfo: '展開資訊',
        hideInfo: '收起資訊',
        artistsLabel: '藝術家',
        teamInfoLabel: '團隊',
        noModel: '尚未提供 OBJ。上傳或連結模型即可在此查看。',
        loadError: '載入模型時發生問題。',
        noWebGL: '此瀏覽器不支援 WebGL。',
      },
      placemaking: {
        title: '場所營造（Placemaking）',
        body1:
          '場所營造鼓勵大家共同重新想像並改造公共空間，讓公共空間成為社區的核心。透過加強人與場所的連結，場所營造是一個協作的過程，讓我們能夠塑造公共領域，最大化共享價值。',
        body2:
          '不僅僅是推動更好的城市設計，場所營造還促進創意的使用模式，特別關注構成一個地方的物質、文化與社會身份，並支持其持續的演變。',
      },
    },
  },
  zhHK: {
    translation: {
      hero: {
        eyebrow: '空間裝置',
        title: '互動地圖與三維鐳射掃描模型（React + three.js）',
        body:
          '用海報地圖做底圖。撳地圖釘選放大至裝置位置，再進入 three.js 介面睇 LiDAR 掃描嘅 OBJ 模型，同時切換中英／廣東話註解。',
        ctaHotspots: '加入地圖釘選',
        ctaObj: '匯入 OBJ 模型',
      },
      legend: {
        title: '裝置清單',
        subtitle: '撳清單就會高亮相應釘選。',
      },
      map: {
        title: '撳釘選睇裝置',
        subtitle: '釘選用百分比定位，喺桌面同手機都保持對齊。',
        placeholder: '喺呢度擺海報地圖',
      },
      viewer: {
        close: '關閉視窗',
        loading: '模型載入緊…',
        ready: 'OBJ 觀看器稍後加入',
        placeholder: 'three.js 畫布佔位',
        annotationTitle: '註解同備註',
        annotationCopy: '呢個視窗會放 three.js OBJ 觀看器、視角預設同多語註解。',
        infoTitle: '作品同藝術家資料',
        infoCopy: '藝術家、鳴謝同作品資料會顯示喺呢度。',
        expandOverlay: '全螢幕',
        collapseOverlay: '退出全螢幕',
        showInfo: '展開資料',
        hideInfo: '收起資料',
        artistsLabel: '藝術家',
        teamInfoLabel: '團隊',
        noModel: '仲未提供 OBJ，請上載或連結模型先。',
        loadError: '載入模型時出現問題。',
        noWebGL: '瀏覽器唔支援 WebGL。',
      },
      placemaking: {
        title: '場所營造（Placemaking）',
        body1:
          '場所營造鼓勵大家一齊重新想像同改造公共空間，令公共空間成為社區嘅核心。透過加強人同地方嘅連結，場所營造係一個協作嘅過程，俾大家可以塑造公共領域，最大化共享價值。',
        body2:
          '唔只係推動更好嘅城市設計，場所營造仲會促進有創意嘅使用模式，特別留意構成一個地方嘅物質、文化同社會身份，並支持佢持續發展。',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n

