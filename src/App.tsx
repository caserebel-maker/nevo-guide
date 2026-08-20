import { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Phone, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Star,
  ChevronRight
} from 'lucide-react';
import './App.css';
import { COURSES } from './data/courses';
import type { CourseStatus } from './data/courses';
import LogisticsSeminarBrief from './components/LogisticsSeminarBrief';

// Animated Counter Component
interface CounterProps {
  target: number;
  plus?: boolean;
  unit?: string;
}

function Counter({ target, plus = false, unit = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0;
            const end = target;
            const duration = 1500; // ms
            const stepTime = 25; // ms
            const steps = duration / stepTime;
            const increment = Math.max(1, Math.ceil(end / steps));

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setCount(start);
            }, stepTime);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <h3 ref={elementRef} className="counter-val">
      {count.toLocaleString()}
      {plus && <span className="stat-plus">+</span>}
      {unit && <span className="stat-unit"> {unit}</span>}
    </h3>
  );
}

function App() {
  const [view, setView] = useState<'home' | 'archive' | 'aug-sem1'>('home');
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'completed'>('all');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('rakdi_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Nav Scroll State
  const [isScrolled, setIsScrolled] = useState(false);

  // Form Fields States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lineId, setLineId] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('working');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [course, setCourse] = useState('');
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');

  // Form Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

  // Setup Theme on mount/change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rakdi_theme', theme);
  }, [theme]);

  // Track window scroll for nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-revelations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [view, activeTab]);

  // Deep-linking: check URL hash on load
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#course-')) {
        const id = window.location.hash.replace('#course-', '');
        const found = COURSES.find((c) => c.id === id);
        if (found) {
          setSelectedCourseId(id);
          document.body.style.overflow = 'hidden';
        }
      } else {
        setSelectedCourseId(null);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger initially
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Pathname & Hash routing for subpages
  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.endsWith('/aug-sem1') || hash === '#aug-sem1') {
        setView((prev) => prev !== 'aug-sem1' ? 'aug-sem1' : prev);
        window.scrollTo({ top: 0 });
      } else if (path.endsWith('/archive') || hash === '#archive') {
        setView((prev) => prev !== 'archive' ? 'archive' : prev);
        window.scrollTo({ top: 0 });
      } else {
        // Default back to home if current state is a subview and URL doesn't match
        setView((prev) => (prev === 'aug-sem1' || prev === 'archive') ? 'home' : prev);
      }
    };

    handleRouting();
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('popstate', handleRouting);
    return () => {
      window.removeEventListener('hashchange', handleRouting);
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const heroBg = document.querySelector('.hero-bg') as HTMLElement;
    const parallaxDiv = document.querySelector('.parallax-divider') as HTMLElement;

    const handleParallax = () => {
      const y = window.scrollY;
      if (heroBg) {
        heroBg.style.transform = `translateY(${y * 0.35}px) scale(1.1)`;
      }
      if (parallaxDiv) {
        const rect = parallaxDiv.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          parallaxDiv.style.backgroundPositionY = `${rect.top * 0.3}px`;
        }
      }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleParallax);
  }, [view]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    document.body.style.overflow = 'hidden';
    window.location.hash = `course-${courseId}`;
  };

  const closeModal = () => {
    setSelectedCourseId(null);
    document.body.style.overflow = '';
    // Clear hash without reloading
    history.replaceState(null, '', window.location.pathname);
  };

  const registerFromModal = (courseId: string) => {
    closeModal();
    // Pre-fill
    setCourse(courseId);
    
    // Smooth scroll to form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Highlight form card
    setIsFormHighlighted(true);
    setTimeout(() => setIsFormHighlighted(false), 2000);
  };

  // Filter courses for main page grid
  const getFilteredCourses = () => {
    if (activeTab === 'all') return COURSES;
    if (activeTab === 'open') {
      return COURSES.filter(c => c.status === 'open' || c.status === 'coming_soon');
    }
    return COURSES.filter(c => c.status === 'completed');
  };

  // Get completed courses for Archive page
  const getArchiveCourses = () => {
    return COURSES.filter(c => c.status === 'completed');
  };

  // Get course selection options
  const getOpenCourses = () => {
    return COURSES.filter(c => c.status === 'open' || c.status === 'coming_soon');
  };

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzD0fE4RfR_z-4ONW58O1xV0UePzYrJY2Pvd8UKJ3p6BLkpMoXoqAubncW4MgAlbbaz/exec';

    const params = new URLSearchParams({
      name,
      phone,
      email,
      lineId,
      employmentStatus: 
        employmentStatus === 'studying' ? 'กำลังศึกษาอยู่' :
        employmentStatus === 'fresh_grad' ? 'เพิ่งจบ (ยังไม่ได้เริ่มงาน)' :
        'ทำงานแล้ว',
      company,
      position,
      department,
      businessType: employmentStatus === 'working' ? businessType : 'นักศึกษา / ยังไม่ได้ทำงาน',
      course: 
        course === 'inhouse' ? 'ขอจัดอบรมภายในองค์กร (In-house Training)' :
        course === 'other' ? 'สอบถามข้อมูลเพิ่มเติม' :
        (() => {
          const found = COURSES.find(c => c.id === course);
          return found ? `${found.title}${found.batch ? ` (${found.batch})` : ''}` : course;
        })(),
      source,
      note
    });

    try {
      // Send data to Apps Script Web App
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // allows sending data without getting blocked by CORS redirects
        body: params
      });

      setSubmitSuccess(true);
      // Reset form fields
      setName('');
      setPhone('');
      setEmail('');
      setLineId('');
      setEmploymentStatus('working');
      setCompany('');
      setPosition('');
      setDepartment('');
      setBusinessType('');
      setCourse('');
      setSource('');
      setNote('');
    } catch (err) {
      setSubmitError('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCourse = COURSES.find(c => c.id === selectedCourseId);

  // Status mapping
  const getStatusConfig = (status: CourseStatus) => {
    switch (status) {
      case 'open':
        return { label: 'เปิดรับสมัคร', ribbonClass: '', badgeClass: 'status-open', icon: '📝' };
      case 'coming_soon':
        return { label: 'เร็วๆนี้', ribbonClass: 'ribbon-coming', badgeClass: 'status-coming', icon: '🔔' };
      case 'completed':
        return { label: 'เสร็จสิ้นแล้ว', ribbonClass: 'ribbon-completed', badgeClass: 'status-completed', icon: '✅' };
      default:
        return { label: 'เปิดรับสมัคร', ribbonClass: '', badgeClass: 'status-open', icon: '📝' };
    }
  };

  return (
    <div className="rakdi-app">
      {/* Floating Navigation */}
      <header className={`floating-nav ${isScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="https://ebcinext.com/wp-content/uploads/2021/03/rdlogo1-3.png" alt="RAKDI" />
          </a>
          <nav className="nav-links">
            <a onClick={() => { setView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>เกี่ยวกับเรา</a>
            <a onClick={() => { setView('home'); setTimeout(() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>หลักสูตร</a>
            <a onClick={() => { setView('home'); setTimeout(() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>ผลงาน</a>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label={theme === 'light' ? 'เปิดโหมดมืด' : 'เปิดโหมดสว่าง'}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a onClick={() => { setView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="nav-cta">สมัครอบรม</a>
          </nav>
        </div>
      </header>

      {view === 'home' && (
        <>
          {/* Hero Section */}
          <section className="hero" id="hero">
            <div className="hero-bg" style={{ backgroundImage: "url('/rakdi-banner.png')" }}></div>
            <div className="hero-overlay"></div>

            <div className="hero-shape shape-1"></div>
            <div className="hero-shape shape-2"></div>
            <div className="hero-shape shape-3"></div>

            <div className="hero-body">
              <span className="pill reveal delay-100">✦ สถาบันวิจัยและพัฒนาความรู้ภายใต้ EBCI</span>
              <h1 className="reveal delay-200">
                Unlock Your Potential<br/>
                <span className="hero-accent">RAKDI Institute</span>
              </h1>
              <p className="hero-sub reveal delay-300">
                ยกระดับศักยภาพผู้ประกอบการและบุคลากรด้านการค้าระหว่างประเทศ<br className="hide-mobile"/>
                และโลจิสติกส์ สู่มาตรฐานสากลกับทีมวิทยากรจาก EBCI
              </p>
              <div className="hero-btns reveal delay-400">
                <a onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="btn-glow">ดูหลักสูตรทั้งหมด</a>
                <a onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost">เกี่ยวกับสถาบัน →</a>
              </div>
            </div>

            <div className="hero-scroll-hint">
              <div className="scroll-line"></div>
              <span>เลื่อนลง</span>
            </div>
          </section>

          {/* Stats Strip */}
          <section className="stats-strip">
            <div className="stats-inner">
              <div className="stat reveal">
                <Counter target={2000} plus={true} />
                <p>ผู้ผ่านการอบรม</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat reveal">
                <Counter target={54} unit="รุ่น" />
                <p>หลักสูตรอบรมสะสม</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat reveal">
                <Counter target={4} unit="ครั้ง" />
                <p>สัมมนาระดับนานาชาติ</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat reveal">
                <Counter target={3000} plus={true} />
                <p>ผู้อบรมด้านภาษีอากร</p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="about" id="about">
            <div className="container two-col">
              <div className="about-images reveal">
                <div className="img-stack">
                  <img src="https://ebcinext.com/wp-content/uploads/2025/07/S__109150231.jpg" alt="Training" className="img-main" />
                  <img src="https://ebcinext.com/wp-content/uploads/2022/08/SeminarCover3-9-22.jpg" alt="Seminar" className="img-float" />
                  <div className="exp-badge">
                    <strong>22+</strong>
                    <span>ปีแห่งความ<br/>เชี่ยวชาญ EBCI</span>
                  </div>
                </div>
              </div>

              <div className="about-text">
                <span className="label reveal">ABOUT US</span>
                <h2 className="reveal">สถาบันวิจัยและพัฒนาความรู้<br/><span className="text-accent">RAKDI</span></h2>
                <p className="reveal">บริษัท อีบีซีไอ จำกัด (EBCI) ได้จัดตั้งสถาบัน RAKDI เพื่อรองรับและขับเคลื่อนบุคลากรในด้านต่าง ๆ ดังนี้:</p>

                <div className="check-list">
                  <div className="check-item reveal">
                    <div className="check-icon"><Check size={12} strokeWidth={3} /></div>
                    <div><strong>พัฒนาคนในองค์กร</strong> — อัปเดตความรู้เพื่อให้คำปรึกษาแก่ลูกค้าได้อย่างถูกต้องแม่นยำ</div>
                  </div>
                  <div className="check-item reveal">
                    <div className="check-icon"><Check size={12} strokeWidth={3} /></div>
                    <div><strong>พัฒนาบุคคลทั่วไป &amp; SMEs</strong> — อบรมการค้าระหว่างประเทศ, Incoterms, ภาษีศุลกากร, โลจิสติกส์</div>
                  </div>
                  <div className="check-item reveal">
                    <div className="check-icon"><Check size={12} strokeWidth={3} /></div>
                    <div><strong>กรอบคุณวุฒิแห่งชาติ (NQF)</strong> — ร่วมมือกับภาครัฐพัฒนาสมรรถนะระดับอาชีวะและอุดมศึกษา</div>
                  </div>
                </div>

                <div className="about-cta reveal">
                  <div className="phone-block">
                    <span className="phone-ring"><Phone size={24} /></span>
                    <div><small style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>สอบถามหลักสูตร</small><strong>092-264-2870</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Parallax Divider */}
          <section className="parallax-divider" style={{ backgroundImage: "url('https://ebcinext.com/wp-content/uploads/2022/06/rakdiseminar1-1.jpeg')" }}>
            <div className="divider-overlay"></div>
            <div className="divider-content reveal">
              <h2>"เราเชื่อว่าการศึกษาที่ดี เปลี่ยนแปลงชีวิตและธุรกิจได้"</h2>
              <p>— สถาบัน RAKDI by EBCI</p>
            </div>
          </section>

          {/* Courses & Programs Section */}
          <section className="courses" id="courses">
            <div className="container">
              <div className="section-head reveal">
                <span className="label">OUR PROGRAMS</span>
                <h2>หลักสูตรของสถาบัน <span className="text-accent">RAKDI</span></h2>
              </div>

              {/* Tab Filter */}
              <div className="course-tabs reveal">
                <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                  ทั้งหมด <span className="tab-count">{COURSES.length}</span>
                </button>
                <button className={`tab-btn ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>
                  เปิดรับสมัคร <span className="tab-count">{COURSES.filter(c => c.status === 'open' || c.status === 'coming_soon').length}</span>
                </button>
                <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>
                  เสร็จสิ้นแล้ว <span className="tab-count">{COURSES.filter(c => c.status === 'completed').length}</span>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="course-grid">
                {getFilteredCourses().map((c) => {
                  const config = getStatusConfig(c.status);
                  const ctaText = c.status === 'open' ? 'สมัครเลย'
                                : c.status === 'completed' ? 'ดูผลงาน'
                                : 'ดูรายละเอียด';
                  return (
                    <article key={c.id} className="course-card reveal visible" onClick={() => openModal(c.id)}>
                      <div className="card-visual">
                        <img src={c.image} alt={c.title} loading="lazy" />
                        <div className={`card-ribbon ${config.ribbonClass}`}>{config.label}</div>
                      </div>
                      <div className="card-content">
                        <span className="card-tag">{c.category}</span>
                        <h3>{c.title}{c.batch && <small style={{ fontWeight: 400, color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem', marginTop: '4px' }}>({c.batch})</small>}</h3>
                        <p>{c.description}</p>
                        <div className="card-bottom">
                          <div className={`card-status-badge ${config.badgeClass}`}>{config.icon} {config.label}</div>
                          {c.rating ? (
                            <span className="card-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Star size={13} fill="currentColor" /> {c.rating}/5
                            </span>
                          ) : (
                            <span className="card-price">{c.price}</span>
                          )}
                        </div>
                        <button className="btn-card" type="button">{ctaText}</button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Link to Archive */}
              <div className="archive-link-wrapper reveal" style={{ marginTop: '40px', textAlign: 'center' }}>
                <button onClick={() => { setView('archive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-card btn-card-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 32px', borderRadius: 'var(--radius)', width: 'auto', cursor: 'pointer' }}>
                  ดูประวัติหลักสูตรที่เสร็จสิ้นแล้วทั้งหมดในอดีต (Archive) <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Achievements Timeline */}
          <section className="achievements" id="achievements">
            <div className="container">
              <div className="section-head reveal">
                <span className="label">KEY MILESTONES</span>
                <h2>ผลงานและเกียรติประวัติ</h2>
              </div>

              <div className="timeline">
                <div className="tl-item reveal">
                  <div className="tl-num">01</div>
                  <div className="tl-body">
                    <h4>สัมมนาระดับนานาชาติ</h4>
                    <p>จัดงาน International Symposium รวม 4 ครั้ง ร่วมกับกรมส่งเสริมการค้าระหว่างประเทศ กระทรวงพาณิชย์</p>
                  </div>
                </div>
                <div className="tl-item reveal">
                  <div className="tl-num">02</div>
                  <div className="tl-body">
                    <h4>ฝึกอบรมผู้ปฏิบัติงานจริง 54 รุ่น</h4>
                    <p>อบรมความรู้ด้านนำเข้า-ส่งออก และโลจิสติกส์ให้แก่ผู้ปฏิบัติงานจริงกว่า 2,000 คน</p>
                  </div>
                </div>
                <div className="tl-item reveal">
                  <div className="tl-num">03</div>
                  <div className="tl-body">
                    <h4>โครงการ The Twenty</h4>
                    <p>อบรมแบบเข้มข้น (Intensive Course) สำหรับผู้บริหารและผู้ปฏิบัติงานระดับสูง 20 ท่านต่อรุ่น</p>
                  </div>
                </div>
                <div className="tl-item reveal">
                  <div className="tl-num">04</div>
                  <div className="tl-body">
                    <h4>สนับสนุน SMEs ทั่วประเทศ</h4>
                    <p>อบรมการจัดการโลจิสติกส์และสิทธิประโยชน์ภาษีอากรให้แก่ SMEs กว่า 4,000 คน</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Registration Form */}
          <section className="contact" id="contact">
            <div className="container contact-grid">
              <div className="contact-left reveal">
                <span className="label">REGISTRATION & CONTACT</span>
                <h2>ติดต่อเข้าร่วมอบรม<br/>หรือจัด <span className="text-accent">In-house Training</span></h2>
                <p style={{ color: 'var(--text-secondary)' }}>หากสนใจให้สถาบัน RAKDI จัดอบรมพิเศษภายในองค์กร สามารถกรอกข้อมูลเพื่อส่งเรื่องเสนอขอจัดอบรมได้ทันที</p>

                <div className="info-cards">
                  <div className="info-card">
                    <div className="info-icon">📍</div>
                    <div><strong>สำนักงานใหญ่</strong><br/>2024/104-107 Rimtangrotfai-saipaknam Road, Prakanong, Klongtoey, Bangkok 10260</div>
                  </div>
                  <div className="info-card">
                    <div className="info-icon">📞</div>
                    <div><strong>โทรศัพท์</strong><br/>0-2742-7851-5 | 092-264-2870</div>
                  </div>
                  <div className="info-card">
                    <div className="info-icon">✉️</div>
                    <div><strong>อีเมล / Line</strong><br/>mks@ebcitrade.com | @ebci</div>
                  </div>
                </div>
              </div>

              <form className={`form-card reveal ${isFormHighlighted ? 'form-highlight' : ''}`} id="registrationForm" onSubmit={handleFormSubmit}>
                <h3>แบบฟอร์มลงทะเบียน</h3>
                
                {/* Section 1 */}
                <h4 style={{ fontSize: '0.9rem', color: 'var(--red)', marginBottom: '12px', borderLeft: '3px solid var(--red)', paddingLeft: '8px', fontWeight: 700 }}>1. ข้อมูลผู้สมัครอบรม</h4>
                <div className="form-row">
                  <div className="field">
                    <label>ชื่อ-นามสกุล <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="กรอกชื่อ-นามสกุลของคุณ" required />
                  </div>
                  <div className="field">
                    <label>เบอร์โทรศัพท์ <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08x-xxx-xxxx" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>อีเมล <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@domain.com" required />
                  </div>
                  <div className="field">
                    <label>Line ID</label>
                    <input type="text" name="lineId" value={lineId} onChange={(e) => setLineId(e.target.value)} placeholder="กรอก Line ID (ถ้ามี)" />
                  </div>
                </div>
                
                {/* Section 2 */}
                <h4 style={{ fontSize: '0.9rem', color: 'var(--red)', marginTop: '20px', marginBottom: '12px', borderLeft: '3px solid var(--red)', paddingLeft: '8px', fontWeight: 700 }}>2. สถานะการศึกษา / การทำงาน</h4>
                
                <div className="form-row">
                  <div className="field" style={{ gridColumn: 'span 2' }}>
                    <label>สถานะของคุณในปัจจุบัน <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select name="employmentStatus" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} required>
                      <option value="working">ทำงานแล้ว (Working Professional)</option>
                      <option value="studying">กำลังศึกษาอยู่ (Student)</option>
                      <option value="fresh_grad">เพิ่งจบ (ยังไม่ได้เริ่มงาน) (Fresh Graduate)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label>{
                      employmentStatus === 'studying' ? 'ชื่อสถานศึกษา / มหาวิทยาลัย' :
                      employmentStatus === 'fresh_grad' ? 'ชื่อสถานศึกษาที่สำเร็จการศึกษา' :
                      'ชื่อบริษัท / หน่วยงาน'
                    } <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input 
                      type="text" 
                      name="company" 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)} 
                      placeholder={
                        employmentStatus === 'studying' ? 'ระบุชื่อสถาบัน/มหาวิทยาลัย' :
                        employmentStatus === 'fresh_grad' ? 'ระบุชื่อสถาบัน/มหาวิทยาลัยเดิม' :
                        'กรอกชื่อบริษัทหรือหน่วยงานของคุณ'
                      } 
                      required 
                    />
                  </div>
                  <div className="field">
                    <label>{
                      employmentStatus === 'studying' ? 'ระดับชั้นปี' :
                      employmentStatus === 'fresh_grad' ? 'ปีที่สำเร็จการศึกษา (พ.ศ.)' :
                      'ตำแหน่งงาน'
                    } <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input 
                      type="text" 
                      name="position" 
                      value={position} 
                      onChange={(e) => setPosition(e.target.value)} 
                      placeholder={
                        employmentStatus === 'studying' ? 'เช่น ปี 4, ปริญญาโท' :
                        employmentStatus === 'fresh_grad' ? 'เช่น 2568' :
                        'เช่น ผู้จัดการฝ่ายโลจิสติกส์'
                      } 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label>{
                      employmentStatus === 'studying' || employmentStatus === 'fresh_grad' ? 'คณะ / สาขาวิชา' :
                      'แผนก / ฝ่าย'
                    } <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input 
                      type="text" 
                      name="department" 
                      value={department} 
                      onChange={(e) => setDepartment(e.target.value)} 
                      placeholder={
                        employmentStatus === 'studying' || employmentStatus === 'fresh_grad' ? 'เช่น คณะวิศวกรรมศาสตร์ สาขาโลจิสติกส์' :
                        'เช่น ฝ่ายนำเข้า-ส่งออก'
                      } 
                      required 
                    />
                  </div>
                  <div className="field">
                    <label>ประเภทธุรกิจขององค์กร {employmentStatus === 'working' && <span style={{ color: 'var(--red)' }}>*</span>}</label>
                    <select 
                      name="businessType" 
                      value={businessType} 
                      onChange={(e) => setBusinessType(e.target.value)} 
                      required={employmentStatus === 'working'}
                      disabled={employmentStatus !== 'working'}
                    >
                      {employmentStatus === 'working' ? (
                        <>
                          <option value="">-- เลือกประเภทธุรกิจ --</option>
                          <option value="import_export">ธุรกิจนำเข้า-ส่งออก (Import / Export)</option>
                          <option value="logistics">โลจิสติกส์ & ขนส่ง (Logistics & Transport)</option>
                          <option value="shipping_broker">ตัวแทนออกของ / ชิปปิ้ง (Customs Broker)</option>
                          <option value="manufacturing">โรงงานผลิต / อุตสาหกรรม (Manufacturing)</option>
                          <option value="trading">ค้าปลีก-ค้าส่ง / เทรดดิ้ง (Trading)</option>
                          <option value="other">อื่น ๆ</option>
                        </>
                      ) : (
                        <option value="student_unemployed">นักศึกษา / ยังไม่ได้ทำงาน</option>
                      )}
                    </select>
                  </div>
                </div>
                
                {/* Section 3 */}
                <h4 style={{ fontSize: '0.9rem', color: 'var(--red)', marginTop: '20px', marginBottom: '12px', borderLeft: '3px solid var(--red)', paddingLeft: '8px', fontWeight: 700 }}>3. หลักสูตรและข้อมูลเพิ่มเติม</h4>
                <div className="form-row">
                  <div className="field">
                    <label>หลักสูตรที่ต้องการสมัคร <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select id="courseSelect" name="course" value={course} onChange={(e) => setCourse(e.target.value)} required>
                      <option value="">-- เลือกหลักสูตร --</option>
                      {getOpenCourses().map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} {c.batch && `(${c.batch})`}
                        </option>
                      ))}
                      <option value="inhouse">ขอจัดอบรมภายในองค์กร (In-house Training)</option>
                      <option value="other">สอบถามข้อมูลเพิ่มเติม</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>ทราบข่าวสารจากช่องทางใด <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select name="source" value={source} onChange={(e) => setSource(e.target.value)} required>
                      <option value="">-- เลือกช่องทาง --</option>
                      <option value="facebook">Facebook</option>
                      <option value="line">Line Official Account</option>
                      <option value="website">เว็บไซต์ EBCI / RAKDI</option>
                      <option value="referral">มีผู้แนะนำ / เพื่อนร่วมงาน</option>
                      <option value="google">ค้นหาผ่าน Google</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>
                </div>
                
                <div className="field">
                  <label>รายละเอียดหรือความต้องการเพิ่มเติม (เช่น อาหารพิเศษ/ข้อคำถาม)</label>
                  <textarea name="note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="กรอกรายละเอียดข้อสงสัย หรือความต้องการพิเศษเพิ่มเติม..."></textarea>
                </div>
                
                <button type="submit" className="btn-submit" style={{ marginTop: '10px' }} disabled={isSubmitting}>
                  {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลลงทะเบียน'}
                </button>

                {submitError && (
                  <div style={{ color: 'var(--red)', marginTop: '10px', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                    ⚠️ {submitError}
                  </div>
                )}

                {submitSuccess && (
                  <div className="form-success">
                    <span className="success-icon">✅</span>
                    <p>ส่งข้อมูลเรียบร้อย! เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด</p>
                  </div>
                )}
              </form>
            </div>
          </section>
        </>
      )}

      {view === 'archive' && (
        /* Archive Page View */
        <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh', background: 'var(--bg-primary)' }}>
          <div className="container">
            {/* Back Button */}
            <div style={{ marginBottom: '24px' }}>
              <button 
                onClick={() => { setView('home'); window.scrollTo({ top: 0 }); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--maroon)', border: 'none', background: 'transparent', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'var(--transition)' }}
                className="back-btn"
              >
                <ArrowLeft size={16} /> กลับสู่หน้าหลัก
              </button>
            </div>

            {/* Section Header */}
            <div className="section-head reveal visible" style={{ marginBottom: '48px', textAlign: 'center' }}>
              <span className="label">PAST SEMINARS & PORTFOLIO</span>
              <h2>คลังหลักสูตรที่ <span className="text-accent">เสร็จสิ้นแล้ว</span></h2>
              <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                ประวัติการจัดอบรมสัมมนาและหลักสูตรต่างๆ ของสถาบัน RAKDI ในช่วงเวลาที่ผ่านมา พร้อมข้อมูลเอกสารดาวน์โหลดและภาพบรรยากาศ
              </p>
            </div>

            {/* Archive Grid */}
            <div className="course-grid">
              {getArchiveCourses().map((c) => {
                const config = getStatusConfig(c.status);
                return (
                  <article key={c.id} className="course-card reveal visible" onClick={() => openModal(c.id)}>
                    <div className="card-visual">
                      <img src={c.image} alt={c.title} loading="lazy" />
                      <div className={`card-ribbon ${config.ribbonClass}`}>{config.label}</div>
                    </div>
                    <div className="card-content">
                      <span className="card-tag">{c.category}</span>
                      <h3>{c.title}{c.batch && <small style={{ fontWeight: 400, color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem', marginTop: '4px' }}>({c.batch})</small>}</h3>
                      <p>{c.description}</p>
                      <div className="card-bottom">
                        <div className={`card-status-badge ${config.badgeClass}`}>{config.icon} {config.label}</div>
                        {c.rating ? (
                          <span className="card-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={13} fill="currentColor" /> {c.rating}/5
                          </span>
                        ) : (
                          <span className="card-price">{c.price}</span>
                        )}
                      </div>
                      <button className="btn-card" type="button">ดูผลงาน</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {view === 'aug-sem1' && (
        <LogisticsSeminarBrief onBackToHome={() => {
          setView('home');
          if (window.location.pathname.endsWith('/aug-sem1')) {
            window.history.pushState(null, '', '/');
          } else {
            window.location.hash = '';
          }
        }} />
      )}

      {/* Course Detail Modal Panel */}
      <div className={`modal-overlay ${selectedCourseId ? 'open' : ''}`} onClick={closeModal}>
        {selectedCourse && (
          <div className="modal-panel animate-fade-slide" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="ปิด">&times;</button>
            <img className="modal-hero-img" src={selectedCourse.image} alt={selectedCourse.title} />
            <div className="modal-body">
              <div className={`modal-badge ${getStatusConfig(selectedCourse.status).badgeClass}`}>
                {getStatusConfig(selectedCourse.status).icon} {getStatusConfig(selectedCourse.status).label}
              </div>
              <h2 className="modal-title">{selectedCourse.title}</h2>
              {selectedCourse.subtitle && <p className="modal-batch">{selectedCourse.subtitle} {selectedCourse.batch && `— ${selectedCourse.batch}`}</p>}

              {/* Meta details */}
              <div className="modal-meta">
                <div className="meta-item">
                  <span className="meta-label">📅 วันที่จัด</span>
                  <span className="meta-value">{selectedCourse.date}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">📍 สถานที่</span>
                  <span className="meta-value">{selectedCourse.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">
                    {selectedCourse.status === 'completed' ? '👥 ผู้เข้าร่วม' : '💰 ค่าลงทะเบียน'}
                  </span>
                  <span className="meta-value">
                    {selectedCourse.status === 'completed' && selectedCourse.attendees 
                      ? `${selectedCourse.attendees} คน` 
                      : selectedCourse.price
                    }
                  </span>
                </div>
              </div>

              {/* Course summary for completed */}
              {selectedCourse.status === 'completed' && selectedCourse.summary && (
                <div className="modal-summary" style={{ background: 'var(--silver-light)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '12px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                  <p>{selectedCourse.summary}</p>
                </div>
              )}

              {/* Lecture Topics */}
              {selectedCourse.details.topics.length > 0 && (
                <>
                  <h4 className="modal-section-title">
                    {selectedCourse.status === 'completed' ? 'เนื้อหาที่อบรม' : 'เนื้อหาหลักสูตร'}
                  </h4>
                  <ul className="modal-topics">
                    {selectedCourse.details.topics.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Speakers list */}
              {selectedCourse.details.speakers.length > 0 && (
                <>
                  <h4 className="modal-section-title">วิทยากรประจำหลักสูตร</h4>
                  <div className="modal-speakers">
                    {selectedCourse.details.speakers.map((s, idx) => (
                      <div key={idx} className="speaker-card">
                        <div className="speaker-avatar">{s.name.charAt(0)}</div>
                        <div className="speaker-info">
                          <span className="speaker-name">{s.name}</span>
                          <span className="speaker-role">{s.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Benefits (for non-completed) */}
              {selectedCourse.status !== 'completed' && selectedCourse.details.benefits.length > 0 && (
                <>
                  <h4 className="modal-section-title">สิ่งที่จะได้รับ</h4>
                  <div className="modal-benefits">
                    {selectedCourse.details.benefits.map((b, idx) => (
                      <span key={idx} className="benefit-tag">✅ {b}</span>
                    ))}
                  </div>
                </>
              )}

              {/* Image Gallery */}
              {selectedCourse.gallery.length > 0 && (
                <>
                  <h4 className="modal-section-title">ภาพบรรยากาศการอบรม</h4>
                  <div className="modal-gallery">
                    {selectedCourse.gallery.map((img, idx) => (
                      <img key={idx} src={img} alt="ภาพกิจกรรม" loading="lazy" />
                    ))}
                  </div>
                </>
              )}

              {/* Downloads list */}
              {selectedCourse.downloads.length > 0 && (
                <>
                  <h4 className="modal-section-title">ดาวน์โหลดเอกสาร</h4>
                  <div className="modal-downloads">
                    {selectedCourse.downloads.map((d, idx) => (
                      <a key={idx} href={d.url} className="download-item" target="_blank" rel="noopener noreferrer">
                        <span className="download-icon">📄</span>
                        <span className="download-label">{d.label}</span>
                        <span className="download-ext">{d.ext}</span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {/* Modal CTA Buttons */}
              <div className="modal-cta">
                {selectedCourse.status === 'open' && (
                  <button className="btn-modal-register" onClick={() => registerFromModal(selectedCourse.id)}>สมัครเลย →</button>
                )}
                {selectedCourse.status === 'coming_soon' && (
                  <button className="btn-modal-register" onClick={() => registerFromModal(selectedCourse.id)}>แจ้งเตือนเมื่อเปิดรับ →</button>
                )}
                {selectedCourse.status === 'completed' && (
                  <button className="btn-modal-browse" onClick={closeModal}>ดูหลักสูตรอื่นๆ</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="https://ebcinext.com/wp-content/uploads/2021/03/rdlogo1-3.png" alt="RAKDI" />
            <p>สถาบันวิจัยและพัฒนาความรู้ RAKDI ภายใต้เครือ บริษัท อีบีซีไอ จำกัด</p>
          </div>
          <div className="footer-copy">© 2026 RAKDI by EBCI Ltd. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
