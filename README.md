# Nevo Guide

เว็บแอปคู่มือรถ Nevo สำหรับรวมข้อมูลรุ่น Q05 ก่อน โดยเน้นภาพและข้อมูลรุ่นที่ขายในไทย และเตรียมโครงสร้างไว้ให้เพิ่ม Q06, Q07 และ A06 ได้ภายหลัง

## What Is Inside

- React + Vite + TypeScript
- Visual stage พร้อม marker เลือกพาร์ทของรถ
- หมวดคู่มือ เช่น หน้าจอ, การขับขี่, ความปลอดภัย, ชาร์จ, ภายนอก, ดูแลรักษา
- ภาพ official ของ NEVO Q05 จาก CHANGAN Thailand เช่น hero, สีตัวรถ และ gallery
- สเปกตลาดไทย เช่น ราคาเริ่มต้น, กำลังสูงสุด, ระยะทาง NEDC, DC charging และฐานล้อ
- Model registry สำหรับเพิ่มรถรุ่นใหม่ใน `src/data/models.ts`

## Run Locally

```bash
npm install
npm run dev
```

เปิด `http://127.0.0.1:5173`

## Build

```bash
npm run build
```

## Data Structure

- `src/data/models.ts` เก็บโมเดลรถ, ภาพ, สี, หมวดฟังก์ชัน และสเปกหลัก
- `src/App.tsx` ประกอบ shell, model tabs, visual stage, color selector, feature detail และ gallery

หากจะเพิ่ม Q06/Q07/A06 ให้เพิ่มข้อมูลใน `models.ts` โดยใช้รูปแบบ `VehicleModel` เดียวกัน

## Media Source

ตัวต้นแบบนี้อ้างอิงภาพจาก CHANGAN Thailand โดยตรง เพื่อเลี่ยงการนำภาพ/โมเดลจากตลาดอื่นที่หน้าตาหรือชื่อรุ่นไม่ตรงกับไทยมาปน หากจะ deploy production แนะนำทำ image proxy/CDN ของบริษัทเอง และเก็บ attribution/source URL ไว้ใน data layer
