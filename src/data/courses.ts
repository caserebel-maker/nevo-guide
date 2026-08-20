export interface Speaker {
  name: string;
  role: string;
}

export interface Download {
  label: string;
  url: string;
  ext: string;
}

export interface CourseDetails {
  topics: string[];
  speakers: Speaker[];
  benefits: string[];
}

export type CourseStatus = 'open' | 'completed' | 'coming_soon';

export interface Course {
  id: string;
  status: CourseStatus;
  title: string;
  subtitle: string;
  batch: string;
  category: string;
  image: string;
  date: string;
  location: string;
  price: string;
  rating: number | null;
  attendees?: number;
  description: string;
  summary?: string;
  details: CourseDetails;
  downloads: Download[];
  gallery: string[];
}

export const COURSES: Course[] = [
  {
    id: "5-guru-logistics-2026",
    status: "open",
    title: "เทคนิคการสมัครงานด้าน Logistics (ภาคปฏิบัติ)",
    subtitle: "ฟังตัวจริง เสียงจริง ประสบการณ์จริง 5 กูรูโลจิสติกส์ของประเทศไทย",
    batch: "",
    category: "LOGISTICS / SEMINAR",
    image: "/5guru-poster.jpg",
    date: "25 สิงหาคม 2569 (13.30-16.00 น.)",
    location: "ออนไลน์ผ่าน Zoom",
    price: "ฟรี",
    rating: null,
    description: "เจาะลึกโลกงานโลจิสติกส์จริง จากประสบการณ์ผู้บริหารตัวจริง — การบรรยายพิเศษโดยวิทยากรพิเศษ 5 ท่าน ผู้บริหารระดับสูงจากบริษัทโลจิสติกส์ชั้นนำของไทย",
    details: {
      topics: [
        "เจาะลึกเทคนิคการสมัครงานด้าน Logistics จากมุมมองผู้บริหาร",
        "ประสบการณ์จริงจาก 5 กูรูโลจิสติกส์ของประเทศไทย",
        "แนวโน้มอุตสาหกรรมโลจิสติกส์และโอกาสในสายงาน",
        "ทักษะที่จำเป็นสำหรับวิชาชีพโลจิสติกส์ในยุคปัจจุบัน",
        "เคล็ดลับการเตรียมตัวและสร้าง Profile ที่โดดเด่น",
        "ถาม-ตอบกับวิทยากรแบบสด"
      ],
      speakers: [
        { name: "คุณเกตติวิทย์ สิทธิ์สุนทรวงศ์", role: "ประธานเจ้าหน้าที่บริหาร บริษัท สโตโกลบอล โลจิสติกส์ จำกัด (มหาชน) / อดีตนายก TIFFA" },
        { name: "คุณคุณวัลภา สถิรชวาล", role: "ประธานเจ้าหน้าที่บริหาร บริษัท ดีเอสวี แอร์ แอนด์ ซี (ประเทศไทย) จำกัด / ประธานสมาคมโลจิสติกส์ไทย" },
        { name: "คุณสายัณห์ จันทร์วิภาสวงศ์", role: "ประธานเจ้าหน้าที่บริหาร บริษัท เอ็กซ์ ตอลเล็ม ดาเมส คอร์เรสปอนแดนต์ จำกัด / นักเขียน Best Seller ด้าน Logistics" },
        { name: "ดร.ปิยะนุช สัมฤทธิ์", role: "ผู้บริหารและผู้ก่อตั้ง บริษัท วีเอ็ม แพลตเนอร์ส จำกัด / อดีตนายกสมาคมบรรจุภัณฑ์โลจิสติกส์ไทย" },
        { name: "คุณชัยยงค์ เทียนวุฒิชัย", role: "กรรมการผู้จัดการ บริษัท เอพีซี โลจิสติคส์ (ไทย) จำกัด / ประธานอนุกรรมการด้านการขนส่งทางอากาศ สภาการค้าแห่งประเทศไทย" }
      ],
      benefits: ["ฟรีไม่มีค่าลงทะเบียน", "เรียนออนไลน์ผ่าน Zoom", "ถาม-ตอบสดกับวิทยากร", "ใบ Certificate เข้าร่วม"]
    },
    downloads: [],
    gallery: []
  },
  {
    id: "logistics-export-55",
    status: "open",
    title: "โลจิสติกส์เพื่อการส่งออก",
    subtitle: "Logistics for Export",
    batch: "รุ่นที่ 55",
    category: "LOGISTICS / EXPORT",
    image: "https://ebcinext.com/wp-content/uploads/2022/08/SeminarCover3-9-22.jpg",
    date: "15-17 กรกฎาคม 2026",
    location: "อาคาร EBCI กรุงเทพฯ",
    price: "ฟรี",
    rating: 4.9,
    description: "เรียนรู้กลยุทธ์การส่งออก การบริหารโลจิสติกส์ และสิทธิประโยชน์ทางภาษีอากร จากวิทยากรมากประสบการณ์",
    details: {
      topics: [
        "Incoterms® 2020 — หลักเกณฑ์การค้าระหว่างประเทศ",
        "การขนส่งทางเรือ ทางอากาศ และ Multimodal",
        "พิธีการศุลกากร (Customs Procedure)",
        "สิทธิประโยชน์ภาษีอากรตาม ม.29, 19 ทวิ",
        "Free Zone และคลังสินค้าทัณฑ์บน",
        "Workshop: จำลองสถานการณ์การส่งออกจริง"
      ],
      speakers: [
        { name: "ดร.ปรีชา เมืองมนต์", role: "ผู้เชี่ยวชาญศุลกากรอาวุโส" },
        { name: "คุณสมหญิง ชัยวงศ์", role: "ที่ปรึกษาโลจิสติกส์ระหว่างประเทศ" }
      ],
      benefits: ["ใบ Certificate", "เอกสารประกอบการอบรม", "อาหาร & เครื่องดื่ม", "Networking กับผู้ประกอบการ"]
    },
    downloads: [],
    gallery: []
  },
  {
    id: "customs-tax-batch3",
    status: "completed",
    title: "พิธีการศุลกากรและสิทธิประโยชน์ภาษีอากร",
    subtitle: "Customs Procedure & Tax Privileges",
    batch: "รุ่นที่ 3",
    category: "CUSTOMS / TAX",
    image: "https://ebcinext.com/wp-content/uploads/2025/07/S__109150231.jpg",
    date: "10-12 มกราคม 2026",
    location: "อาคาร EBCI กรุงเทพฯ",
    price: "ติดต่อสถาบัน",
    rating: 4.8,
    attendees: 45,
    description: "สิทธิประโยชน์ภาษีตาม ม.29, คลังสินค้าทัณฑ์บน, Free Zone, 19 ทวิ และการลดข้อผิดพลาดในพิธีการศุลกากร",
    summary: "อบรมเข้มข้น 3 วันเต็ม ผู้เข้าร่วม 45 คนจากหลากหลายองค์กร ผลประเมินความพึงพอใจ 4.8/5.0",
    details: {
      topics: [
        "พิธีการศุลกากรส่งออก-นำเข้า",
        "สิทธิประโยชน์ ม.29 และ 19 ทวิ",
        "คลังสินค้าทัณฑ์บน & Free Zone",
        "ข้อผิดพลาดที่พบบ่อยในพิธีการศุลกากร"
      ],
      speakers: [
        { name: "ดร.ปรีชา เมืองมนต์", role: "ผู้เชี่ยวชาญศุลกากรอาวุโส" }
      ],
      benefits: []
    },
    downloads: [
      { label: "รายชื่อผู้ผ่านการอบรม", url: "https://ebcinext.com/wp-content/uploads/2022/06/rakdiatt2.xlsx", ext: "XLSX" },
      { label: "เอกสารประกอบการบรรยาย", url: "#", ext: "PDF" }
    ],
    gallery: [
      "https://ebcinext.com/wp-content/uploads/2025/07/S__109150231.jpg",
      "https://ebcinext.com/wp-content/uploads/2022/08/SeminarCover3-9-22.jpg",
      "https://ebcinext.com/wp-content/uploads/2022/06/rakdiseminar1-1.jpeg"
    ]
  },
  {
    id: "inhouse-training",
    status: "open",
    title: "อบรมภายในองค์กร (In-house Training)",
    subtitle: "Corporate In-house Training",
    batch: "",
    category: "CORPORATE / IN-HOUSE",
    image: "https://ebcinext.com/wp-content/uploads/2022/06/rakdiseminar1-1.jpeg",
    date: "ตามที่องค์กรกำหนด",
    location: "จัดที่สถานที่ขององค์กร",
    price: "ออกแบบเฉพาะองค์กร",
    rating: 5.0,
    description: "ออกแบบหลักสูตรเฉพาะสำหรับองค์กรของคุณ ครอบคลุม Incoterms, การขนส่งระหว่างประเทศ, คลังสินค้า และอื่นๆ",
    details: {
      topics: [
        "Incoterms® 2020",
        "การขนส่งระหว่างประเทศแบบ Multimodal",
        "พิธีการศุลกากร & สิทธิประโยชน์",
        "การบริหารคลังสินค้าอย่างมีประสิทธิภาพ",
        "ออกแบบเนื้อหาเฉพาะตามความต้องการ"
      ],
      speakers: [],
      benefits: ["หลักสูตรออกแบบเฉพาะ", "วิทยากรเชี่ยวชาญ", "ใบ Certificate ผู้เข้าร่วม", "เอกสารครบชุด"]
    },
    downloads: [],
    gallery: []
  },
  {
    id: "logistics-export-54",
    status: "completed",
    title: "โลจิสติกส์เพื่อการส่งออก",
    subtitle: "Logistics for Export",
    batch: "รุ่นที่ 54",
    category: "LOGISTICS / EXPORT",
    image: "https://ebcinext.com/wp-content/uploads/2022/08/SeminarCover3-9-22.jpg",
    date: "5-7 พฤศจิกายน 2025",
    location: "อาคาร EBCI กรุงเทพฯ",
    price: "ฟรี",
    rating: 4.9,
    attendees: 38,
    description: "หลักสูตรโลจิสติกส์เพื่อการส่งออก รุ่นที่ 54 จัดเสร็จสมบูรณ์ ผู้เข้าร่วม 38 คน",
    summary: "จัดอบรมสำเร็จ 3 วัน มีผู้เข้าร่วม 38 คน ผลประเมินความพึงพอใจ 4.9/5.0",
    details: {
      topics: ["Incoterms® 2020", "การขนส่งทางเรือ ทางอากาศ", "พิธีการศุลกากร", "Workshop"],
      speakers: [{ name: "ดร.ปรีชา เมืองมนต์", role: "ผู้เชี่ยวชาญศุลกากรอาวุโส" }],
      benefits: []
    },
    downloads: [
      { label: "รายชื่อผู้ผ่านการอบรม รุ่น 54", url: "#", ext: "XLSX" }
    ],
    gallery: [
      "https://ebcinext.com/wp-content/uploads/2022/08/SeminarCover3-9-22.jpg",
      "https://ebcinext.com/wp-content/uploads/2022/06/rakdiseminar1-1.jpeg"
    ]
  },
  {
    id: "incoterms-2026",
    status: "coming_soon",
    title: "Incoterms® 2020 Deep Dive",
    subtitle: "เจาะลึก Incoterms สำหรับผู้ปฏิบัติงาน",
    batch: "รุ่นที่ 1",
    category: "INTERNATIONAL TRADE",
    image: "https://ebcinext.com/wp-content/uploads/2025/07/S__109150231.jpg",
    date: "กันยายน 2026 (ยังไม่กำหนดวันที่แน่นอน)",
    location: "อาคาร EBCI กรุงเทพฯ",
    price: "เร็วๆนี้",
    rating: null,
    description: "หลักสูตรใหม่! เจาะลึกทุกแง่มุมของ Incoterms® 2020 — ทั้งภาคทฤษฎีและ Workshop สำหรับผู้ปฏิบัติงานจริง",
    details: {
      topics: [
        "ภาพรวม Incoterms® 2020 ทั้ง 11 เงื่อนไข",
        "การเลือก Incoterms ที่เหมาะกับสินค้าแต่ละประเภท",
        "ข้อผิดพลาดที่พบบ่อยในการใช้ Incoterms",
        "Case Study จากการค้าจริง"
      ],
      speakers: [],
      benefits: ["ใบ Certificate", "เอกสารประกอบ", "อาหาร & เครื่องดื่ม"]
    },
    downloads: [],
    gallery: []
  }
];
