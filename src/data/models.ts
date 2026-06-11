import {
  BatteryCharging,
  CarFront,
  CircleGauge,
  Images,
  MonitorCog,
  ShieldCheck,
  Sofa,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const officialBase = 'https://www.changan.co.th'

export type ModelId = 'q05' | 'q06' | 'q07' | 'a06'

export type FeatureId =
  | 'overview'
  | 'screen'
  | 'drive'
  | 'comfort'
  | 'safety'
  | 'charging'
  | 'exterior'
  | 'care'

export type ImageAsset = {
  id: string
  src: string
  alt: string
  title: string
  kind: 'hero' | 'color' | 'gallery'
}

export type FeatureSection = {
  id: FeatureId
  label: string
  title: string
  summary: string
  icon: LucideIcon
  image: ImageAsset
  facts: string[]
}

export type VehicleModel = {
  id: ModelId
  name: string
  code: string
  status: 'active' | 'future'
  market: string
  price: string
  trim: string
  summary: string
  sourceUrl: string
  specs: Array<{ label: string; value: string }>
  images: ImageAsset[]
  colors: Array<{ label: string; thai: string; swatch: string; image: ImageAsset }>
  features: FeatureSection[]
}

const image = (id: string, path: string, title: string, kind: ImageAsset['kind'] = 'gallery'): ImageAsset => ({
  id,
  src: `${officialBase}${path}`,
  alt: `CHANGAN NEVO Q05 Thailand - ${title}`,
  title,
  kind,
})

const q05Hero = image('q05-hero', '/images/nevo/q05/kv/kv-q05-pc.jpg?v2', 'NEVO Q05 official Thailand hero', 'hero')

const q05Gallery = [
  image('gallery-01', '/images/nevo/q05/gallery/pic-001.jpg', 'ใช้งานพื้นที่ท้ายรถ'),
  image('gallery-02', '/images/nevo/q05/gallery/pic-002.jpg', 'มุมมองภายนอก'),
  image('gallery-03', '/images/nevo/q05/gallery/pic-003.jpg', 'ห้องโดยสาร'),
  image('gallery-04', '/images/nevo/q05/gallery/pic-004.jpg', 'คอนโซลและหน้าจอ'),
  image('gallery-05', '/images/nevo/q05/gallery/pic-005.jpg', 'เบาะและพื้นที่โดยสาร'),
  image('gallery-06', '/images/nevo/q05/gallery/pic-006.jpg', 'รายละเอียดภายใน'),
  image('gallery-07', '/images/nevo/q05/gallery/pic-007.jpg', 'มุมมองด้านหน้า'),
  image('gallery-08', '/images/nevo/q05/gallery/pic-008.jpg', 'ไฟและดีไซน์ตัวถัง'),
  image('gallery-09', '/images/nevo/q05/gallery/pic-009.jpg', 'พื้นที่ใช้สอย'),
  image('gallery-10', '/images/nevo/q05/gallery/pic-010.jpg', 'ภาพ lifestyle'),
  image('gallery-11', '/images/nevo/q05/gallery/pic-011.jpg', 'ภาพ lifestyle เพิ่มเติม'),
  image('gallery-12', '/images/nevo/q05/gallery/pic-012.jpg', 'รายละเอียดรถ'),
]

const colorImages = {
  pink: image('color-pink', '/images/nevo/q05/car/pink.jpg', 'Aurora Pink', 'color'),
  black: image('color-black', '/images/nevo/q05/car/black.jpg', 'Deep Space Black', 'color'),
  white: image('color-white', '/images/nevo/q05/car/white.jpg', 'Moonlight White', 'color'),
  silver: image('color-silver', '/images/nevo/q05/car/silver.jpg', 'Mercury Silver', 'color'),
  gray: image('color-gray', '/images/nevo/q05/car/gray.jpg', 'Starlight Gray', 'color'),
}

const q05Features: FeatureSection[] = [
  {
    id: 'overview',
    label: 'ภาพรวม',
    title: 'รถไฟฟ้า B-SUV สำหรับตลาดไทย',
    summary: 'สรุปรุ่นไทยแบบดูง่าย เน้นข้อมูลที่คนใช้รถต้องเปิดดูบ่อยและภาพจริงจากหน้า CHANGAN Thailand',
    icon: Images,
    image: q05Hero,
    facts: ['ราคาเริ่มต้น 629,900 THB', 'กำลังสูงสุด 163 PS', 'ระยะทางไฟฟ้า NEDC 462 km'],
  },
  {
    id: 'screen',
    label: 'หน้าจอ',
    title: 'หน้าจอและการเชื่อมต่อ',
    summary: 'จุดรวมข้อมูลสำหรับการใช้งานหน้าจอกลาง แผงหน้าปัด การเชื่อมต่อมือถือ และ OTA',
    icon: MonitorCog,
    image: q05Gallery[3],
    facts: ['หน้าจอกลาง 14.6 นิ้ว', 'จอผู้ขับ 10.17 นิ้ว', 'รองรับ Apple CarPlay / Android Auto / OTA'],
  },
  {
    id: 'drive',
    label: 'การขับขี่',
    title: 'ระบบขับขี่และมุมมองรอบคัน',
    summary: 'รวมภาพและข้อมูลที่ช่วยให้เข้าใจตัวรถก่อนใช้งานจริง เช่น มุมมองตัวรถ ระบบช่วยขับ และการควบคุมหลัก',
    icon: CircleGauge,
    image: q05Gallery[7],
    facts: ['กำลังสูงสุด 163 PS', 'แบตเตอรี่จาก CATL ตามข่าวเปิดตัวไทย', 'แพลตฟอร์ม EV สำหรับตลาดโลก'],
  },
  {
    id: 'comfort',
    label: 'ห้องโดยสาร',
    title: 'พื้นที่โดยสารและความสบาย',
    summary: 'ดูภาพภายใน เบาะ พื้นที่เก็บของ และรายละเอียดการใช้งานที่สำคัญกับชีวิตประจำวัน',
    icon: Sofa,
    image: q05Gallery[4],
    facts: ['พื้นผิวภายในแบบ soft-touch มากกว่า 80% ตามข้อมูลข่าวไทย', 'พื้นที่เก็บสัมภาระขยายได้สูงสุด 1,380 ลิตร', 'มีช่องเก็บใต้พื้น 90 ลิตร'],
  },
  {
    id: 'safety',
    label: 'ความปลอดภัย',
    title: 'ระบบช่วยเหลือและความปลอดภัย',
    summary: 'พื้นที่สำหรับรวมคำอธิบายระบบเตือนและระบบช่วยเหลือผู้ขับ โดยเลือกเฉพาะฟังก์ชันที่ใช้ในรุ่นไทย',
    icon: ShieldCheck,
    image: q05Gallery[8],
    facts: ['รองรับระบบช่วยขับตามรุ่นย่อย', 'เน้นข้อมูลไทยก่อน ไม่อ้างฟังก์ชันจีนที่อาจต่างกัน', 'เตรียมพื้นที่สำหรับคู่มือเจ้าของรถฉบับไทย'],
  },
  {
    id: 'charging',
    label: 'ชาร์จ',
    title: 'การชาร์จและพลังงาน',
    summary: 'ข้อมูลชาร์จที่ใช้บ่อย เช่น กำลังชาร์จ DC และเวลาชาร์จตามสเปก official Thailand',
    icon: BatteryCharging,
    image: q05Gallery[5],
    facts: ['รองรับ DC สูงสุด 162 kW', 'ชาร์จ DC 30-80% ประมาณ 15 นาที', 'ระยะทางวิ่งไฟฟ้า NEDC 462 km'],
  },
  {
    id: 'exterior',
    label: 'ภายนอก',
    title: 'ดีไซน์ สี และตัวถัง',
    summary: 'เลือกดูสีที่ขายในไทยและภาพตัวรถจากหน้า official เพื่อไม่ปนกับเวอร์ชันต่างประเทศ',
    icon: CarFront,
    image: colorImages.white,
    facts: ['Aurora Pink', 'Deep Space Black', 'Moonlight White', 'Mercury Silver', 'Starlight Gray'],
  },
  {
    id: 'care',
    label: 'ดูแลรักษา',
    title: 'ข้อมูลดูแลรถและบริการ',
    summary: 'ส่วนเตรียมไว้สำหรับเพิ่มคู่มือดูแลรถ ศูนย์บริการ เอกสารสเปก และข้อมูลหลังการขายของไทย',
    icon: Wrench,
    image: q05Gallery[0],
    facts: ['อ้างอิงหน้า CHANGAN Thailand', 'เตรียมเพิ่มเอกสารสเปก PDF ไทย', 'เชื่อมต่อ dealer/test drive ได้ในระยะต่อไป'],
  },
]

export const models: VehicleModel[] = [
  {
    id: 'q05',
    name: 'NEVO Q05',
    code: 'Q05',
    status: 'active',
    market: 'Thailand',
    price: '629,900 THB',
    trim: 'MAX / ULTRA',
    summary:
      'ฐานข้อมูลภาพและข้อมูลสำหรับ NEVO Q05 รุ่นที่ขายในไทย ใช้ภาพ official Thailand เป็นหลักเพื่อเลี่ยงข้อมูล/หน้าตารถจากประเทศอื่นที่ไม่ตรงรุ่น',
    sourceUrl: 'https://www.changan.co.th/th/nevo-q05/',
    specs: [
      { label: 'ราคาเริ่มต้น', value: '629,900 THB' },
      { label: 'กำลังสูงสุด', value: '163 PS' },
      { label: 'ระยะทางไฟฟ้า', value: '462 km NEDC' },
      { label: 'DC สูงสุด', value: '162 kW' },
      { label: 'DC 30-80%', value: '15 นาที' },
      { label: 'ฐานล้อ', value: '2,735 mm' },
    ],
    images: [q05Hero, ...Object.values(colorImages), ...q05Gallery],
    colors: [
      { label: 'Aurora Pink', thai: 'สีชมพู', swatch: '#ead0d6', image: colorImages.pink },
      { label: 'Deep Space Black', thai: 'สีดำ', swatch: '#111216', image: colorImages.black },
      { label: 'Moonlight White', thai: 'สีขาว', swatch: '#f3f4f5', image: colorImages.white },
      { label: 'Mercury Silver', thai: 'สีเงิน', swatch: '#b9bec6', image: colorImages.silver },
      { label: 'Starlight Gray', thai: 'สีเทา', swatch: '#5d646d', image: colorImages.gray },
    ],
    features: q05Features,
  },
  {
    id: 'q06',
    name: 'NEVO Q06',
    code: 'Q06',
    status: 'future',
    market: 'Future',
    price: 'TBD',
    trim: 'เตรียมรองรับ',
    summary: 'พื้นที่สำหรับเพิ่มข้อมูล Q06 เมื่อมีข้อมูลตลาดไทย',
    sourceUrl: '',
    specs: [],
    images: [],
    colors: [],
    features: [],
  },
  {
    id: 'q07',
    name: 'NEVO Q07',
    code: 'Q07',
    status: 'future',
    market: 'Future',
    price: 'TBD',
    trim: 'เตรียมรองรับ',
    summary: 'พื้นที่สำหรับเพิ่มข้อมูล Q07 เมื่อมีข้อมูลตลาดไทย',
    sourceUrl: '',
    specs: [],
    images: [],
    colors: [],
    features: [],
  },
  {
    id: 'a06',
    name: 'NEVO A06',
    code: 'A06',
    status: 'future',
    market: 'Future',
    price: 'TBD',
    trim: 'เตรียมรองรับ',
    summary: 'พื้นที่สำหรับเพิ่มข้อมูล A06 เมื่อมีข้อมูลตลาดไทย',
    sourceUrl: '',
    specs: [],
    images: [],
    colors: [],
    features: [],
  },
]

export type HubItemType = 'tip' | 'issue'

export type HubItemCategory = FeatureId

export type HubItem = {
  id: string
  type: HubItemType
  category: HubItemCategory
  title: string
  description: string
  solution?: string
  upvotes: number
  author: string
  date: string
  image?: string // Base64 data URL or external image path
}

export const initialHubItems: HubItem[] = [
  {
    id: 'hub-01',
    type: 'tip',
    category: 'drive',
    title: 'วิธีเปิดโหมด iEM (Intelligent Energy Management)',
    description: 'ระบบการขับเคลื่อนอัจฉริยะ iEM จะช่วยคำนวณการทำงานระหว่างมอเตอร์ไฟฟ้าและเครื่องยนต์ปั่นไฟโดยอัตโนมัติ เพื่อการประหยัดพลังงานสูงสุดในทุกทริปการเดินทาง เหมาะมากกับการขับขี่เดินทางไกลข้ามจังหวัด',
    upvotes: 42,
    author: 'Nevo Expert',
    date: '2026-06-01',
  },
  {
    id: 'hub-02',
    type: 'issue',
    category: 'screen',
    title: 'การเชื่อมต่อ Apple CarPlay หลุดหรือค้างบางครั้ง',
    description: 'ในบางครั้ง หน้าจอกลางขนาด 14.6 นิ้ว อาจตัดการทำงานจาก Apple CarPlay หรือค้างโดยไม่ทราบสาเหตุ หรือมีอาการหน่วงหลังจากเชื่อมต่อเป็นเวลานาน',
    solution: 'สามารถแก้ไขด้วยการรีสตาร์ทระบบอินโฟเทนเมนต์ด่วน โดยการกดปุ่มลดเสียง/เปิดเสียง (Volume Control) บนคอนโซลกลางค้างไว้ประมาณ 10-15 วินาทีจนกว่าหน้าจอหลักจะดับไปและขึ้นโลโก้ Changan ใหม่',
    upvotes: 28,
    author: 'Changan Tech',
    date: '2026-06-02',
    image: 'https://www.changan.co.th/images/nevo/q05/gallery/pic-004.jpg',
  },
  {
    id: 'hub-03',
    type: 'tip',
    category: 'safety',
    title: 'วิธีเปิดกล้องมองใต้ท้องรถ (Transparent Chassis) แบบ 540 องศา',
    description: 'ฟังก์ชันกล้องมองรอบทิศทาง 540 องศา สามารถจำลองมุมมองใต้ท้องรถแบบโปร่งแสงเพื่อหลีกเลี่ยงสิ่งกีดขวางหรือหินคมๆ ขณะจอดรถหรือขับบนทางขรุขระ',
    solution: 'เปิดใช้งานโดยกดปุ่มเปิดกล้องรอบคันบนพวงมาลัย หรือกดไอคอนกล้องที่จอกลาง จากนั้นเลือกโหมดภาพ "3D" หรือตัวเลือก "ใต้ท้องรถ (Chassis)" เพื่อให้ระบบสร้างภาพใต้ท้องรถแบบเรียลไทม์',
    upvotes: 35,
    author: 'Nevo Driver',
    date: '2026-06-03',
    image: 'https://www.changan.co.th/images/nevo/q05/gallery/pic-008.jpg',
  },
  {
    id: 'hub-04',
    type: 'issue',
    category: 'screen',
    title: 'หาระยะทางสะสมทั้งหมด (Odometer) บนจอมาตรวัดไม่เจอ',
    description: 'หน้าจอผู้ขับขี่ขนาด 10.17 นิ้ว จะไม่แสดงเลขระยะทางสะสมรวม (Odo) ตลอดเวลา ทำให้ผู้ใช้ใหม่หาค่านี้ไม่เจอและแจ้งเป็นปัญหาบ่อยครั้ง',
    solution: 'เลขระยะทางสะสม (Odo) จะแสดงโดยอัตโนมัติเมื่อระบบตรวจจับว่ากำลังสรุปการเดินทาง (Trip Summary) ตอนดับเครื่องยนต์ หรือสามารถกดดูที่หน้าจอกลางได้ที่เมนู ตั้งค่ารถยนต์ (Car Setting) > ข้อมูลรถยนต์ (Vehicle Info)',
    upvotes: 19,
    author: 'Nevo Owner',
    date: '2026-06-04',
  },
  {
    id: 'hub-05',
    type: 'issue',
    category: 'comfort',
    title: 'แถบปุ่มกดสัมผัส (Capacitive) ใต้หน้าจอกลางทำงานไวเกินไป',
    description: 'ขณะเอื้อมมือกดจอกลาง ปลายนิ้วหรืออุ้งมือมักจะเผลอไปเฉียดโดนปุ่มระบบสัมผัส Capacitive ด้านล่างจอ ทำให้พัดลมแอร์หรือระดับเสียงปรับเปลี่ยนโดยไม่ตั้งใจ',
    solution: 'ปรับท่านั่งและแนะนำให้เอื้อมมือโดยประคองนิ้วโป้งไว้ที่ฐานล่าง หรือใช้นิ้วชี้กดจอกลางโดยให้สันมือลอยพ้นแนวปุ่มด้านล่าง นอกจากนี้สามารถปรับระดับการตอบสนองความเร็วปุ่มสัมผัส (Touch Feedback) ได้ในหน้าตั้งค่าทั่วไปของจอกลาง',
    upvotes: 15,
    author: 'Adisorn K.',
    date: '2026-06-05',
  },
  {
    id: 'hub-06',
    type: 'tip',
    category: 'charging',
    title: 'ตั้งเวลาชาร์จล่วงหน้าช่วง Off-Peak (22:00 - 09:00) เพื่อประหยัดค่าไฟ TOU',
    description: 'การชาร์จรถยนต์ไฟฟ้าที่บ้านช่วงเวลา Off-peak (TOU) จะประหยัดค่าใช้จ่ายได้มากกว่าครึ่งหนึ่งของราคาไฟปกติ สามารถตั้งเวลาล่วงหน้าให้ชาร์จเฉพาะช่วงเวลานี้ได้สะดวกรวดเร็ว',
    solution: 'เสียบปืนชาร์จเข้ากับตัวรถ จากนั้นไปที่เมนูระบบชาร์จในหน้าจอกลาง เลือกหัวข้อ พลังงาน (Energy Management) > เปิดใช้งานตั้งเวลาชาร์จล่วงหน้า (Charging Timer) จากนั้นเลือกตั้งเวลาเริ่มต้นที่ 22:00 น. หรือช่วงเวลาอื่นตามต้องการ ระบบจะหยุดชาร์จและเริ่มต้นดึงไฟตามเวลาที่ระบุโดยอัตโนมัติ',
    upvotes: 56,
    author: 'TOU User',
    date: '2026-06-06',
    image: 'https://www.changan.co.th/images/nevo/q05/gallery/pic-006.jpg',
  },
]

