import {
  BatteryCharging,
  CarFront,
  CircleGauge,
  MonitorCog,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { q05Videos, type GuideVideo, type VideoCategoryId } from './q05Videos'

export type ModelId = 'q05' | 'q06' | 'q07' | 'a06'

export type FeatureCategory = {
  id: VideoCategoryId
  label: string
  description: string
  part: VehiclePartId
  icon: LucideIcon
}

export type VehiclePartId =
  | 'overview'
  | 'screen'
  | 'drive'
  | 'exterior'
  | 'charging'
  | 'safety'
  | 'care'

export type VehicleModel = {
  id: ModelId
  name: string
  code: string
  status: 'active' | 'future'
  trim: string
  summary: string
  specs: Array<{ label: string; value: string }>
  videos: GuideVideo[]
}

export const categories: FeatureCategory[] = [
  {
    id: 'overview',
    label: 'ภาพรวมรถ',
    description: 'สเปก รุ่นย่อย และฟังก์ชันเด่นที่ควรรู้ก่อนเริ่มใช้',
    part: 'overview',
    icon: Sparkles,
  },
  {
    id: 'screen',
    label: 'หน้าจอและระบบอัจฉริยะ',
    description: 'เมนูหน้าจอหลัก แผงหน้าปัด เสียง นำทาง และมือถือ',
    part: 'screen',
    icon: MonitorCog,
  },
  {
    id: 'drive',
    label: 'การขับขี่',
    description: 'โหมดขับขี่ กล้อง 360 ระบบช่วยจอด และระบบขับขี่อัจฉริยะ',
    part: 'drive',
    icon: CircleGauge,
  },
  {
    id: 'exterior',
    label: 'ภายนอกและตัวถัง',
    description: 'ไฟหน้า ประตู ยาง ที่ปัดน้ำฝน และฟังก์ชันรอบคัน',
    part: 'exterior',
    icon: CarFront,
  },
  {
    id: 'charging',
    label: 'ชาร์จและพลังงาน',
    description: 'การชาร์จ จ่ายไฟ OTA และฟังก์ชันพลังงานของรถ',
    part: 'charging',
    icon: BatteryCharging,
  },
  {
    id: 'safety',
    label: 'ความปลอดภัย',
    description: 'เตือนชน เตือนเปิดประตู คุมเลน ตรวจจับความล้า และโหมดเฝ้าระวัง',
    part: 'safety',
    icon: ShieldCheck,
  },
  {
    id: 'care',
    label: 'ดูแลรักษา',
    description: 'ระยะบำรุงรักษา วัสดุสิ้นเปลือง ยาง และเหตุฉุกเฉิน',
    part: 'care',
    icon: Wrench,
  },
]

export const models: VehicleModel[] = [
  {
    id: 'q05',
    name: 'Nevo Q05',
    code: 'Q05',
    status: 'active',
    trim: '2026 506km Laser Ultra+',
    summary:
      'ศูนย์รวมคู่มือวิดีโอสำหรับผู้ใช้ Nevo Q05 เริ่มจากรุ่น 506km Laser Ultra+ และออกแบบไว้ให้เพิ่มรุ่นย่อยกับโมเดลใหม่ได้ต่อ',
    specs: [
      { label: 'วิดีโอคู่มือ', value: `${q05Videos.length} ตอน` },
      { label: 'หมวดหลัก', value: `${categories.length} หมวด` },
      { label: 'รุ่นข้อมูล', value: 'Q05 / 2026' },
      { label: 'แหล่งข้อมูล', value: 'Yiche' },
    ],
    videos: q05Videos,
  },
  {
    id: 'q06',
    name: 'Nevo Q06',
    code: 'Q06',
    status: 'future',
    trim: 'เตรียมรองรับ',
    summary: 'โครงสร้างข้อมูลพร้อมเพิ่มคู่มือ Q06 ในอนาคต',
    specs: [],
    videos: [],
  },
  {
    id: 'q07',
    name: 'Nevo Q07',
    code: 'Q07',
    status: 'future',
    trim: 'เตรียมรองรับ',
    summary: 'โครงสร้างข้อมูลพร้อมเพิ่มคู่มือ Q07 ในอนาคต',
    specs: [],
    videos: [],
  },
  {
    id: 'a06',
    name: 'Nevo A06',
    code: 'A06',
    status: 'future',
    trim: 'เตรียมรองรับ',
    summary: 'โครงสร้างข้อมูลพร้อมเพิ่มคู่มือ A06 ในอนาคต',
    specs: [],
    videos: [],
  },
]
