# Nevo Guide

เว็บแอปคู่มือรถ Nevo สำหรับรวมข้อมูลรุ่น Q05 ก่อน และเตรียมโครงสร้างไว้ให้เพิ่ม Q06, Q07 และ A06 ได้ภายหลัง

## What Is Inside

- React + Vite + TypeScript
- Three.js car viewer พร้อม marker เลือกพาร์ทของรถ
- หมวดคู่มือ เช่น หน้าจอ, การขับขี่, ความปลอดภัย, ชาร์จ, ภายนอก, ดูแลรักษา
- วิดีโอคู่มือ Q05 ทั้งหมด 38 ตอนจากไฟล์ CSV ที่ดึงไว้
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

- `src/data/q05Videos.ts` เก็บวิดีโอ Q05
- `src/data/models.ts` เก็บโมเดลรถ, หมวดฟังก์ชัน, และสเปกหลัก
- `src/components/CarViewer.tsx` เก็บ 3D viewer และ marker ของรถ

หากจะเพิ่ม Q06/Q07/A06 ให้เพิ่มข้อมูลใน `models.ts` และสร้างไฟล์วิดีโอของรุ่นนั้นในรูปแบบเดียวกับ `q05Videos.ts`

## Media Strategy

ตัวต้นแบบนี้เล่นวิดีโอจาก URL ต้นทางโดยตรง เพราะไฟล์วิดีโอรวมมีขนาดใหญ่และไม่เหมาะกับการ commit เข้า GitHub ปกติ ถ้าจะ deploy production แนะนำย้ายวิดีโอไปไว้ใน object storage/CDN แล้วเปลี่ยน `videoUrl` ใน data layer
