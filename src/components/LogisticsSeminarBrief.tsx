import './LogisticsSeminarBrief.css';
import { useState } from 'react';
import { ArrowLeft, Clock, Users, ShieldCheck, CheckSquare, MessageSquare, Video, FileText } from 'lucide-react';
import { COURSES } from '../data/courses';

interface LogisticsSeminarBriefProps {
  onBackToHome: () => void;
}

export default function LogisticsSeminarBrief({ onBackToHome }: LogisticsSeminarBriefProps) {
  // Interactive checklist state for organizers
  const [checklist, setChecklist] = useState({
    zoom: [
      { id: 'z1', label: 'สร้างห้อง Zoom Meeting (ความจุรองรับอย่างน้อย 500 คน)', checked: true },
      { id: 'z2', label: 'ตั้งค่าระบบลงทะเบียนและปิดไมค์ผู้เข้าฟังอัตโนมัติเมื่อเข้าห้อง', checked: true },
      { id: 'z3', label: 'จัดเตรียมภาพพื้นหลัง (Virtual Background) สำหรับทีมงานและวิทยากร', checked: false },
      { id: 'z4', label: 'เตรียมโปรแกรมบันทึกวิดีโอสัมมนา (Cloud Recording)', checked: false }
    ],
    speakers: [
      { id: 's1', label: 'ส่งกำหนดการย่อและ Zoom Link ให้วิทยากรทั้ง 5 ท่าน', checked: true },
      { id: 's2', label: 'จัดส่งหัวข้อประเด็นพูดคุย (Discussion Prompts) ล่วงหน้า', checked: true },
      { id: 's3', label: 'นัดหมายเวลาเข้าระบบล่วงหน้า (13.00 น.) เพื่อทดสอบเสียง/กล้อง', checked: false }
    ],
    materials: [
      { id: 'm1', label: 'รวมสไลด์เปิดงานและสไลด์ปิดงาน (Master Slide)', checked: false },
      { id: 'm2', label: 'จัดทำแบบประเมินความพึงพอใจและลิงก์สำหรับออก e-Certificate', checked: true },
      { id: 'm3', label: 'เตรียมดนตรีบรรเลงคลอเบาๆ ช่วงก่อนเริ่มและช่วงพักเบรก', checked: false }
    ]
  });

  const toggleCheck = (category: 'zoom' | 'speakers' | 'materials', id: string) => {
    setChecklist(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    }));
  };

  // Retrieve details of the logistics seminar from courses data
  const courseInfo = COURSES.find(c => c.id === '5-guru-logistics-2026') || {
    title: 'เทคนิคการสมัครงานด้าน Logistics (ภาคปฏิบัติ)',
    date: '25 สิงหาคม 2569 (13.30-16.00 น.)',
    location: 'ออนไลน์ผ่าน Zoom',
    price: 'ฟรี',
    details: { speakers: [] }
  };

  return (
    <main className="brief-page-wrapper">
      <div className="brief-container">
        {/* Navigation */}
        <nav className="brief-nav">
          <button onClick={onBackToHome} className="brief-back-btn">
            <ArrowLeft size={16} /> กลับสู่หน้าหลัก
          </button>
          <span className="brief-badge-live">📡 INTERNAL USE ONLY</span>
        </nav>

        {/* Hero Section */}
        <header className="brief-hero">
          <span className="brief-category">Seminar Rundown & Agenda Brief</span>
          <h1>งานสัมมนาออนไลน์ <span>{courseInfo.title}</span></h1>
          <p>
            หน้าเอกสารสรุปเตรียมงานสำหรับทีมงานจัดทำสไลด์, พิธีกรดำเนินรายการ (MC), 
            ทีมโฮสต์คุมห้อง Zoom และคณะวิทยากรเพื่อการดำเนินงานอย่างราบรื่นก่อนวันจัดสัมมนาจริง
          </p>
          <div className="brief-meta-grid">
            <div className="brief-meta-card">
              <label>📅 วันจัดงานจริง</label>
              <span>{courseInfo.date}</span>
            </div>
            <div className="brief-meta-card">
              <label>📍 สถานที่จัด</label>
              <span>{courseInfo.location}</span>
            </div>
            <div className="brief-meta-card">
              <label>💻 ช่องทางดำเนินงาน</label>
              <span>Zoom Meeting / Zoom Webinar</span>
            </div>
            <div className="brief-meta-card">
              <label>🔑 ลิงก์เข้าสัมมนา (Zoom Link)</label>
              <span>
                <a href="https://zoom.us/j/9998887776" target="_blank" rel="noopener noreferrer">
                  zoom.us/j/9998887776
                </a>
              </span>
            </div>
          </div>
        </header>

        {/* Section 1: Briefing Overview */}
        <section className="brief-section">
          <h2><Users size={20} /> ข้อมูลเบื้องต้น <span>(Event Overview)</span></h2>
          <div className="brief-overview-grid">
            <div>
              <h3>เป้าหมายการจัดงาน</h3>
              <ul className="brief-overview-list">
                <li>แนะแนวเทคนิคเชิงลึกในการเตรียมตัวสัมภาษณ์งานและเขียนโปรไฟล์สายงานโลจิสติกส์</li>
                <li>เปิดเผยเกณฑ์จริงจากใจผู้บริหารในการคัดเลือกบุคลากรในยุคดิจิทัล</li>
                <li>สร้างความร่วมมือระหว่างสถาบัน RAKDI/EBCI กับสถาบันการศึกษาเพื่อพัฒนาทักษะนิสิตนักศึกษา</li>
              </ul>
            </div>
            <div>
              <h3>กลุ่มเป้าหมาย (Audience)</h3>
              <ul className="brief-overview-list">
                <li>นักศึกษาระดับปริญญาตรี/โท สาขาการจัดการโลจิสติกส์และโซ่อุปทาน</li>
                <li>อาจารย์ผู้สอนประจำสาขาวิชาด้านโลจิสติกส์ในสถาบันอุดมศึกษา</li>
                <li>ผู้จบการศึกษาใหม่ (Fresh Graduates) หรือผู้ที่ต้องการเปลี่ยนสายงานมาด้านโลจิสติกส์</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Detailed Seminar Rundown */}
        <section className="brief-section">
          <h2><Clock size={20} /> กำหนดการสัมมนา <span>(Rundown Timeline)</span></h2>
          <div className="table-responsive">
            <table className="rundown-table">
              <thead>
                <tr>
                  <th>เวลา</th>
                  <th>กิจกรรม / หัวข้อการบรรยาย</th>
                  <th>ผู้รับผิดชอบหลัก</th>
                  <th>รายละเอียด & บทพูด MC (MC Guidelines)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-time">13:00 - 13:30</td>
                  <td className="td-topic">เปิดห้องสัมมนา Zoom & Sound Check<span>(30 นาที)</span></td>
                  <td className="td-pic">ฝ่ายเทคนิค & โฮสต์<small>(RAKDI Tech Team)</small></td>
                  <td className="td-details">
                    เปิดห้อง Zoom รอผู้เข้าฟังสัมมนา รันสไลด์ต้อนรับและเปิดดนตรีคลอเบาๆ 
                    พร้อมต้อนรับวิทยากรทั้ง 5 ท่านเพื่อทดสอบเสียง ไมโครโฟน กล้อง 
                    และแชร์หน้าจอสำหรับสไลด์ประกอบการบรรยาย
                  </td>
                </tr>
                <tr>
                  <td className="td-time">13:30 - 13:40</td>
                  <td className="td-topic">กล่าวต้อนรับ & ชี้แจงกติกา<span>(10 นาที)</span></td>
                  <td className="td-pic">พิธีกรดำเนินรายการ<small>(MC - คุณรุ่งอนันต์)</small></td>
                  <td className="td-details">
                    MC กล่าวทักทายผู้เข้าร่วมสัมมนา แนะนำวัตถุประสงค์สถาบันวิจัยและพัฒนาความรู้ RAKDI ภายใต้ EBCI 
                    ชี้แจงกติการ่วมฟัง (การส่งคำถามในแชท, การปิดไมค์ของตนเอง, แนะนำว่ามี Certificate)
                  </td>
                </tr>
                <tr>
                  <td className="td-time">13:40 - 13:50</td>
                  <td className="td-topic">กล่าวเปิดงานต้อนรับอาจารย์และนักศึกษา<span>(10 นาที)</span></td>
                  <td className="td-pic">ประธานกล่าวเปิดงาน<small>(ผู้บริหาร EBCI Group)</small></td>
                  <td className="td-details">
                    ประธานกล่าวความสำคัญของอุตสาหกรรมโลจิสติกส์ในไทย และทำไมต้องมีการเตรียมความพร้อมเชิงปฏิบัติการ 
                    ก่อนส่งคิวคืนให้พิธีกรเพื่อดำเนินการแนะนำวิทยากรสัมมนาหลัก
                  </td>
                </tr>
                <tr>
                  <td className="td-time">13:50 - 15:30</td>
                  <td className="td-topic">เสวนาพิเศษ: 5 กูรูเจาะลึกรับสมัครงานสายตรง<span>(100 นาที)</span></td>
                  <td className="td-pic">5 วิทยากรหลัก & MC<small>(Panelist Session)</small></td>
                  <td className="td-details">
                    เริ่มการเสวนาหลักแบ่งเป็น 3 หัวข้อย่อย:<br/>
                    1. <strong>เกณฑ์ที่ผู้บริหารใช้คัดเลือกใบสมัคร</strong>: ทักษะ Hard skills / Soft skills<br/>
                    2. <strong>การสัมภาษณ์งานอย่างไรให้โดดเด่น</strong>: เคล็ดลับการตอบคำถาม, Case studies<br/>
                    3. <strong>แนวโน้มสายอาชีพ</strong>: โอกาสเติบโตในบริษัทโลจิสติกส์ข้ามชาติและในไทย
                  </td>
                </tr>
                <tr>
                  <td className="td-time">15:30 - 15:50</td>
                  <td className="td-topic">เปิดรับคำถาม Q&A ถาม-ตอบสด<span>(20 นาที)</span></td>
                  <td className="td-pic">ผู้เข้าร่วมสัมมนา & คณะวิทยากร</td>
                  <td className="td-details">
                    MC รวบรวมคำถามที่น่าสนใจจากกล่องแชทของ Zoom หรือเปิดโอกาสให้ผู้เข้าร่วมที่กดปุ่มยกมือ (Raise Hand) 
                    เพื่อเปิดไมค์ถามสดกับคณะกูรูทั้ง 5 ท่านโดยตรง
                  </td>
                </tr>
                <tr>
                  <td className="td-time">15:50 - 16:00</td>
                  <td className="td-topic">ถ่ายรูปรวม & แจ้งลิงก์ประเมินผลปิดงาน<span>(10 นาที)</span></td>
                  <td className="td-pic">MC & ทีมเทคนิค</td>
                  <td className="td-details">
                    ขอความร่วมมือผู้ร่วมฟังเปิดกล้องเพื่อจับภาพสกรีนช็อตร่วมกัน 
                    พร้อมแชร์สไลด์และส่งลิงก์แบบประเมินสำหรับรับใบ Certificate ในกล่องแชท กล่าวขอบคุณและปิดห้องประชุม
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Speaker Bios */}
        <section className="brief-section">
          <h2><ShieldCheck size={20} /> คณะวิทยากรกูรูสัมมนา <span>(Key Speakers)</span></h2>
          <div className="brief-speakers-grid">
            {courseInfo.details.speakers.map((s: any, idx: number) => (
              <div key={idx} className="brief-speaker-card">
                <div className="brief-speaker-avatar">{s.name.charAt(0)}</div>
                <div className="brief-speaker-info">
                  <span className="brief-speaker-name">{s.name}</span>
                  <span className="brief-speaker-role">{s.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Host/MC Quick Script Guidelines */}
        <section className="brief-section">
          <h2><MessageSquare size={20} /> แนวทางบทพูดดำเนินรายการ <span>(MC Script Outline)</span></h2>
          
          <div className="script-guide-box">
            <h4>1. ช่วงกล่าวเปิดรายการ (13.30 น.)</h4>
            <p>
              "สวัสดีผู้เข้าร่วมสัมมนาทุกท่านค่ะ ยินดีต้อนรับเข้าสู่งานสัมมนาฟรีทางออนไลน์ในหัวข้อ 'เทคนิคการสมัครงานด้าน Logistics ภาคปฏิบัติ' 
              ซึ่งจัดโดยสถาบันวิจัยและพัฒนาความรู้ RAKDI ภายใต้เครือ บริษัท อีบีซีไอ จำกัด ในวันนี้นะคะ..."
            </p>
            <p>
              <em>* พิธีกรแจ้งกติการับฟัง: ปิดไมค์, หากมีข้อสงสัยพิมพ์ถามในกล่องแชท และชี้แจงสิทธิ์การรับ e-Certificate ท้ายการประเมิน</em>
            </p>
          </div>

          <div className="script-guide-box">
            <h4>2. ช่วงแนะนำวิทยากร (13.50 น.)</h4>
            <p>
              "และในวันนี้ เราได้รับเกียรติอย่างสูงจากสุดยอดผู้บริหารและกูรูผู้คร่ำหวอดในวงการโลจิสติกส์ของประเทศไทยถึง 5 ท่านด้วยกันนะคะ..." 
            </p>
            <p>
              <em>* แนะนำทีละท่านตามภาพสไลด์ประวัติ ก่อนเริ่มคำถามประเด็นที่ 1 เรื่องเรซูเม่ที่สะดุดตา</em>
            </p>
          </div>

          <div className="script-guide-box">
            <h4>3. ช่วงแจ้งการรับ e-Certificate (15.50 น.)</h4>
            <p>
              "สำหรับผู้เข้าร่วมสัมมนาทุกท่าน ทั้งนักศึกษาและคณาจารย์ สามารถสแกน QR Code บนหน้าจอหรือคลิกลิงก์ในช่องแชท 
              เพื่อกรอกแบบประเมินความพึงพอใจและรับใบประกาศนียบัตรออนไลน์ (e-Certificate) จากสถาบัน RAKDI ได้ทันทีหลังจบงานค่ะ..."
            </p>
          </div>
        </section>

        {/* Section 5: Team Checklist */}
        <section className="brief-section">
          <h2><CheckSquare size={20} /> รายการตรวจสอบความพร้อมทีมงาน <span>(Pre-event Checklist)</span></h2>
          <div className="brief-checklist-grid">
            <div className="brief-checklist-card">
              <h3><Video size={16} /> การเตรียมระบบ Zoom</h3>
              {checklist.zoom.map((item) => (
                <label key={item.id} className="brief-check-item">
                  <input 
                    type="checkbox" 
                    className="brief-check-checkbox" 
                    checked={item.checked} 
                    onChange={() => toggleCheck('zoom', item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="brief-checklist-card">
              <h3><Users size={16} /> ประสานงานวิทยากร</h3>
              {checklist.speakers.map((item) => (
                <label key={item.id} className="brief-check-item">
                  <input 
                    type="checkbox" 
                    className="brief-check-checkbox" 
                    checked={item.checked} 
                    onChange={() => toggleCheck('speakers', item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="brief-checklist-card">
              <h3><FileText size={16} /> อุปกรณ์ & สื่อนำเสนอ</h3>
              {checklist.materials.map((item) => (
                <label key={item.id} className="brief-check-item">
                  <input 
                    type="checkbox" 
                    className="brief-check-checkbox" 
                    checked={item.checked} 
                    onChange={() => toggleCheck('materials', item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
