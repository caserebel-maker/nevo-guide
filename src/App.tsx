import { useState, useEffect } from 'react'
import {
  Check,
  Images,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  Plus,
  AlertTriangle,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Info,
} from 'lucide-react'
import './App.css'
import {
  models,
  initialHubItems,
  type FeatureId,
  type ImageAsset,
  type ModelId,
  type HubItem,
  type HubItemType,
} from './data/models'

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxW = 800
        const maxH = 800
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxW) {
            height *= maxW / width
            width = maxW
          }
        } else {
          if (height > maxH) {
            width *= maxH / height
            height = maxH
          }
        }
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        resolve(dataUrl)
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}

function App() {
  const [activeModelId, setActiveModelId] = useState<ModelId>('q05')
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>('overview')
  const [selectedImageId, setSelectedImageId] = useState('q05-hero')
  const [query, setQuery] = useState('')

  // Hub States
  const [hubItems, setHubItems] = useState<HubItem[]>([])
  const [votedIds, setVotedIds] = useState<string[]>([])
  const [hubSearch, setHubSearch] = useState('')
  const [hubTypeFilter, setHubTypeFilter] = useState<'all' | 'tip' | 'issue'>('all')
  const [hubCatFilter, setHubCatFilter] = useState<string>('all')
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openWorkaroundIds, setOpenWorkaroundIds] = useState<string[]>([])

  // Form states
  const [formType, setFormType] = useState<HubItemType>('tip')
  const [formCategory, setFormCategory] = useState<FeatureId>('screen')
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formSolution, setFormSolution] = useState('')
  const [formAuthor, setFormAuthor] = useState('')
  const [formImage, setFormImage] = useState('')
  const [formError, setFormError] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      setFormError('กรุณาเลือกไฟล์รูปภาพเท่านั้น')
      return
    }
    
    try {
      const compressed = await compressImage(file)
      setFormImage(compressed)
      setFormError('')
    } catch (err) {
      setFormError('เกิดข้อผิดพลาดในการโหลดรูปภาพ')
    }
  }

  // Load from local storage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('nevo_q05_hub_items')
    if (savedItems) {
      try {
        setHubItems(JSON.parse(savedItems))
      } catch (e) {
        setHubItems(initialHubItems)
      }
    } else {
      setHubItems(initialHubItems)
      localStorage.setItem('nevo_q05_hub_items', JSON.stringify(initialHubItems))
    }

    const savedVoted = localStorage.getItem('nevo_q05_voted_ids')
    if (savedVoted) {
      try {
        setVotedIds(JSON.parse(savedVoted))
      } catch (e) {}
    }
  }, [])

  const activeModel = models.find((model) => model.id === activeModelId) ?? models[0]
  const activeFeature = activeModel.features.find((feature) => feature.id === activeFeatureId) ?? activeModel.features[0]
  const selectedImage =
    activeModel.images.find((image) => image.id === selectedImageId) ?? activeFeature?.image ?? activeModel.images[0]
  
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const galleryImages = activeModel.images.filter((image) => {
    if (image.kind === 'hero') return false
    if (!normalizedQuery) return true
    return `${image.title} ${image.alt}`.toLocaleLowerCase().includes(normalizedQuery)
  })

  const handleModelChange = (modelId: ModelId) => {
    const nextModel = models.find((model) => model.id === modelId)
    // Keep other models disabled since they are not launched yet
    if (!nextModel || nextModel.status === 'future') return
    setActiveModelId(modelId)
    setActiveFeatureId('overview')
    setSelectedImageId(nextModel.images[0]?.id ?? '')
  }

  const handleFeatureChange = (featureId: FeatureId) => {
    const feature = activeModel.features.find((item) => item.id === featureId)
    if (!feature) return
    setActiveFeatureId(featureId)
    setSelectedImageId(feature.image.id)
  }

  const handleVote = (id: string) => {
    let nextVoted = [...votedIds]
    let increment = 1
    
    if (votedIds.includes(id)) {
      nextVoted = votedIds.filter(v => v !== id)
      increment = -1
    } else {
      nextVoted.push(id)
    }
    
    setVotedIds(nextVoted)
    localStorage.setItem('nevo_q05_voted_ids', JSON.stringify(nextVoted))

    const nextItems = hubItems.map(item => {
      if (item.id === id) {
        return { ...item, upvotes: Math.max(0, item.upvotes + increment) }
      }
      return item
    })
    setHubItems(nextItems)
    localStorage.setItem('nevo_q05_hub_items', JSON.stringify(nextItems))
  }

  const toggleWorkaround = (id: string) => {
    if (openWorkaroundIds.includes(id)) {
      setOpenWorkaroundIds(openWorkaroundIds.filter(x => x !== id))
    } else {
      setOpenWorkaroundIds([...openWorkaroundIds, id])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim() || !formDescription.trim()) {
      setFormError('กรุณากรอกหัวข้อและรายละเอียดให้ครบถ้วน')
      return
    }

    const newItem: HubItem = {
      id: 'hub-user-' + Date.now(),
      type: formType,
      category: formCategory,
      title: formTitle.trim(),
      description: formDescription.trim(),
      solution: formType === 'issue' ? (formSolution.trim() || undefined) : undefined,
      image: formImage || undefined,
      upvotes: 0,
      author: formAuthor.trim() || 'ผู้ใช้ทั่วไป',
      date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }),
    }

    const nextItems = [newItem, ...hubItems]
    setHubItems(nextItems)
    localStorage.setItem('nevo_q05_hub_items', JSON.stringify(nextItems))

    // Reset Form
    setFormTitle('')
    setFormDescription('')
    setFormSolution('')
    setFormAuthor('')
    setFormImage('')
    setFormError('')
    setIsModalOpen(false)
    
    // Toast notification
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const categoryLabels: Record<FeatureId, string> = {
    overview: 'ภาพรวม',
    screen: 'หน้าจอ',
    drive: 'การขับขี่',
    comfort: 'ห้องโดยสาร',
    safety: 'ความปลอดภัย',
    charging: 'การชาร์จ',
    exterior: 'ภายนอก',
    care: 'ดูแลรักษา',
  }

  const filteredHubItems = hubItems.filter(item => {
    if (hubTypeFilter !== 'all' && item.type !== hubTypeFilter) return false
    if (hubCatFilter !== 'all' && item.category !== hubCatFilter) return false

    if (hubSearch.trim()) {
      const q = hubSearch.toLowerCase()
      const titleMatch = item.title.toLowerCase().includes(q)
      const descMatch = item.description.toLowerCase().includes(q)
      const solMatch = item.solution?.toLowerCase().includes(q) ?? false
      const authorMatch = item.author.toLowerCase().includes(q)
      return titleMatch || descMatch || solMatch || authorMatch
    }

    return true
  })

  return (
    <main className="app-shell">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast-notification" role="alert">
          <Sparkles size={16} />
          <span>บันทึกข้อมูลเรียบร้อยแล้ว! ขอบคุณที่ร่วมแบ่งปัน</span>
        </div>
      )}

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nevo Guide home">
          <span className="brand-mark">N</span>
          <span>NEVO Q05 GUIDE</span>
        </a>
        <nav className="model-tabs" aria-label="Nevo models">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              className={`model-tab ${model.id === activeModelId ? 'is-active' : ''}`}
              disabled={model.status === 'future'}
              onClick={() => handleModelChange(model.id)}
              title={model.status === 'future' ? `${model.name} (เตรียมรองรับในอนาคต)` : undefined}
            >
              {model.code}
              {model.status === 'future' && <span className="tab-badge">Soon</span>}
            </button>
          ))}
        </nav>
        <label className="search-box" aria-label="ค้นหารูปภาพ">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาภาพ, สี, ฟังก์ชัน..." />
        </label>
      </header>

      <section className="hero-grid" id="top">
        <div className="hero-copy">
          <p className="model-line">{activeModel.name} / {activeModel.market}</p>
          <h1>คู่มือออนไลน์และคลังข้อมูลคนใช้รถ</h1>
          <p className="hero-summary">
            แหล่งรวบรวมข้อมูลอย่างเป็นทางการสำหรับผู้ใช้ NEVO Q05 พร้อมทิปเทคนิคพิเศษ แนะนำวิธีการใช้งาน และสรุปรายงานปัญหาที่พบจากผู้ใช้จริง
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#visual-guide">
              <Images size={16} />
              ดูภาพและฟังก์ชัน
            </a>
            <a className="ghost-action" href="#hub-section">
              <Lightbulb size={16} />
              ทริค & ปัญหาที่พบ
            </a>
          </div>
        </div>

        <VisualStage
          image={selectedImage}
          activeFeatureId={activeFeatureId}
          onFeatureChange={handleFeatureChange}
        />

        <aside className="spec-panel">
          <div className="trim-label">{activeModel.trim}</div>
          {activeModel.specs.map((spec) => (
            <div className="spec-row" key={spec.label}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </div>
          ))}
        </aside>
      </section>

      <section className="color-strip">
        <div>
          <p className="model-line">สีที่แสดงบนหน้า CHANGAN Thailand</p>
          <h2>เลือกสีตัวรถ</h2>
        </div>
        <div className="color-list">
          {activeModel.colors.map((color) => (
            <button
              key={color.label}
              type="button"
              className={`color-chip ${selectedImage.id === color.image.id ? 'is-active' : ''}`}
              onClick={() => setSelectedImageId(color.image.id)}
            >
              <span style={{ background: color.swatch }} />
              <strong>{color.label}</strong>
              <small>{color.thai}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="guide-layout" id="visual-guide">
        <aside className="category-rail">
          <div className="section-heading">
            <SlidersHorizontal size={18} />
            <h2>เลือกหัวข้อ</h2>
          </div>
          <div className="category-list">
            {activeModel.features.map((feature) => {
              const Icon = feature.icon
              return (
                <button
                  key={feature.id}
                  type="button"
                  className={`category-card ${activeFeatureId === feature.id ? 'is-active' : ''}`}
                  onClick={() => handleFeatureChange(feature.id)}
                >
                  <Icon size={20} />
                  <span>
                    <strong>{feature.label}</strong>
                    <small>{feature.title}</small>
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        <section className="feature-panel">
          <div className="feature-image">
            <img src={activeFeature.image.src} alt={activeFeature.image.alt} />
          </div>
          <div className="feature-copy">
            <p className="category-name">{activeFeature.label}</p>
            <h2>{activeFeature.title}</h2>
            <p>{activeFeature.summary}</p>
            <div className="fact-list">
              {activeFeature.facts.map((fact) => (
                <span key={fact}>
                  <Check size={15} />
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </section>

        <GalleryPanel images={galleryImages} selectedImage={selectedImage} onSelect={setSelectedImageId} />
      </section>

      {/* Hub Section */}
      <section className="hub-section" id="hub-section">
        <div className="hub-header">
          <div className="hub-title-block">
            <p className="model-line">NEVO Q05 Owner & Tech Hub</p>
            <h2>คลังทิปการใช้งานและปัญหาที่พบ</h2>
            <p className="hub-desc">
              ร่วมแชร์และศึกษาเทคนิคการตั้งค่าตัวรถ แนะนำวิธีการแก้ไขปัญหาเบื้องต้นจากข้อมูลผู้ใช้รถและทีมช่างเทคนิค Changan
            </p>
          </div>
          <button type="button" className="add-post-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            แชร์ทิป / แจ้งปัญหาใหม่
          </button>
        </div>

        <div className="hub-controls">
          <div className="hub-filters">
            <button
              type="button"
              className={`filter-btn ${hubTypeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setHubTypeFilter('all')}
            >
              ทั้งหมด
            </button>
            <button
              type="button"
              className={`filter-btn type-tip ${hubTypeFilter === 'tip' ? 'is-active' : ''}`}
              onClick={() => setHubTypeFilter('tip')}
            >
              <Lightbulb size={14} />
              ทริคแนะนำ
            </button>
            <button
              type="button"
              className={`filter-btn type-issue ${hubTypeFilter === 'issue' ? 'is-active' : ''}`}
              onClick={() => setHubTypeFilter('issue')}
            >
              <AlertTriangle size={14} />
              ปัญหาที่พบ
            </button>
          </div>

          <div className="hub-search-row">
            <label className="hub-cat-select" aria-label="กรองตามหมวดหมู่">
              <select value={hubCatFilter} onChange={(e) => setHubCatFilter(e.target.value)}>
                <option value="all">ทุกหมวดหมู่</option>
                {Object.entries(categoryLabels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div className="hub-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="ค้นหาทิปหรือรายงานปัญหา..."
                value={hubSearch}
                onChange={(e) => setHubSearch(e.target.value)}
              />
              {hubSearch && (
                <button type="button" className="clear-search" onClick={() => setHubSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hub-grid">
          {filteredHubItems.length > 0 ? (
            filteredHubItems.map((item) => {
              const isVoted = votedIds.includes(item.id)
              const isWorkaroundOpen = openWorkaroundIds.includes(item.id)
              return (
                <article key={item.id} className={`hub-card type-${item.type}`}>
                  <header className="hub-card-header">
                    <span className={`badge-type ${item.type}`}>
                      {item.type === 'tip' ? <Lightbulb size={12} /> : <AlertTriangle size={12} />}
                      {item.type === 'tip' ? 'ทริคแนะนำ' : 'ปัญหาที่พบ'}
                    </span>
                    <span className="badge-cat">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </header>
                  
                  <h3 className="hub-card-title">{item.title}</h3>
                  <p className="hub-card-desc">{item.description}</p>

                  {item.image && (
                    <div className="hub-card-image">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                  )}

                  {item.solution && (
                    <div className="workaround-section">
                      <button
                        type="button"
                        className={`workaround-toggle-btn ${isWorkaroundOpen ? 'is-open' : ''}`}
                        onClick={() => toggleWorkaround(item.id)}
                      >
                        <span>แนวทางแก้ไข / วิธีแก้เบื้องต้น</span>
                        {isWorkaroundOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                      
                      {isWorkaroundOpen && (
                        <div className="workaround-content animate-fade-slide">
                          <p>{item.solution}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <footer className="hub-card-footer">
                    <div className="hub-card-meta">
                      <span className="meta-author">โดย: {item.author}</span>
                      <span className="meta-date">{item.date}</span>
                    </div>
                    
                    <button
                      type="button"
                      className={`vote-btn ${isVoted ? 'is-voted' : ''}`}
                      onClick={() => handleVote(item.id)}
                      title={isVoted ? 'โหวตแล้ว' : 'คิดว่ามีประโยชน์'}
                    >
                      <ThumbsUp size={13} />
                      <span>{item.upvotes} {isVoted ? 'ขอบคุณ' : 'มีประโยชน์'}</span>
                    </button>
                  </footer>
                </article>
              )
            })
          ) : (
            <div className="hub-empty-state">
              <Info size={40} className="empty-icon" />
              <h3>ไม่พบข้อมูลทิปหรือรายงานปัญหา</h3>
              <p>ลองค้นหาด้วยคำอื่น หรือกดปุ่ม "แชร์ทิป / แจ้งปัญหาใหม่" ด้านขวาเพื่อโพสต์ข้อมูลแรกในหมวดนี้</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal overlays */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3>แจ้งปัญหาหรือร่วมแชร์ทิปใหม่</h3>
              <button type="button" className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </header>
            
            <form onSubmit={handleSubmit} className="modal-form">
              {formError && (
                <div className="form-error-msg">
                  <AlertTriangle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="form-group-row">
                <div className="form-group">
                  <span className="form-label">ประเภทรายงาน</span>
                  <div className="form-radio-group">
                    <label className={`radio-label ${formType === 'tip' ? 'is-checked' : ''}`}>
                      <input
                        type="radio"
                        name="itemType"
                        value="tip"
                        checked={formType === 'tip'}
                        onChange={() => setFormType('tip')}
                      />
                      <Lightbulb size={13} />
                      ทริคแนะนำ (Tip)
                    </label>
                    <label className={`radio-label ${formType === 'issue' ? 'is-checked' : ''}`}>
                      <input
                        type="radio"
                        name="itemType"
                        value="issue"
                        checked={formType === 'issue'}
                        onChange={() => setFormType('issue')}
                      />
                      <AlertTriangle size={13} />
                      ปัญหาที่พบ (Issue)
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="form-category" className="form-label">ระบบที่เกี่ยวข้อง</label>
                  <select
                    id="form-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as FeatureId)}
                    className="form-select"
                  >
                    {Object.entries(categoryLabels).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-title" className="form-label">หัวข้อเรื่อง</label>
                <input
                  type="text"
                  id="form-title"
                  placeholder="เช่น ปัญหาเสียงแอร์ดังขณะจอดชาร์จ, เทคนิคตั้งโหมดเบาะนวด"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="form-input"
                  maxLength={80}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-desc" className="form-label">คำอธิบายรายละเอียด</label>
                <textarea
                  id="form-desc"
                  placeholder="รายละเอียดปัญหาที่พบ หรือเทคนิคที่ต้องการแชร์ให้เพื่อนๆ เจ้าของรถท่านอื่นทราบ"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="form-textarea"
                  rows={4}
                  required
                />
              </div>

              {formType === 'issue' && (
                <div className="form-group animate-fade-slide">
                  <label htmlFor="form-solution" className="form-label">แนวทางแก้ปัญหาเบื้องต้น (ถ้ามี)</label>
                  <textarea
                    id="form-solution"
                    placeholder="เช่น เปิดฟังก์ชันในตั้งค่าแอป Changan Connect หรือกดรีบูตหน้าจอค้างไว้"
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
              )}

              <div className="form-group">
                <span className="form-label">รูปภาพประกอบ (ถ้ามี)</span>
                {!formImage ? (
                  <label className="file-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <Images size={20} className="upload-icon" />
                    <span>คลิกเพื่อเลือกหรืออัปโหลดรูปภาพ</span>
                    <small>รองรับไฟล์รูปภาพทั่วไป ระบบจะย่อขนาดให้อัตโนมัติ</small>
                  </label>
                ) : (
                  <div className="uploaded-preview-container">
                    <img src={formImage} alt="Preview" className="uploaded-preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => setFormImage('')}
                      title="ลบรูปภาพ"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form-author" className="form-label">ชื่อ / นามแฝงผู้โพสต์</label>
                <input
                  type="text"
                  id="form-author"
                  placeholder="ระบุชื่อของคุณ (หากเว้นว่างไว้ ระบบจะแสดงเป็น 'ผู้ใช้ทั่วไป')"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  className="form-input"
                  maxLength={30}
                />
              </div>

              <footer className="form-actions-row">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  ยกเลิก
                </button>
                <button type="submit" className="submit-btn">
                  บันทึกและโพสต์
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

type VisualStageProps = {
  image?: ImageAsset
  activeFeatureId: FeatureId
  onFeatureChange: (featureId: FeatureId) => void
}

function VisualStage({ image, activeFeatureId, onFeatureChange }: VisualStageProps) {
  const hotspots: Array<{ id: FeatureId; label: string; x: number; y: number }> = [
    { id: 'screen', label: 'หน้าจอ', x: 50, y: 48 },
    { id: 'comfort', label: 'ห้องโดยสาร', x: 39, y: 55 },
    { id: 'charging', label: 'ชาร์จ', x: 76, y: 63 },
    { id: 'exterior', label: 'ภายนอก', x: 25, y: 62 },
    { id: 'safety', label: 'Safety', x: 64, y: 35 },
  ]

  return (
    <div className="viewer-panel visual-stage">
      {image ? <img className="stage-image" src={image.src} alt={image.alt} /> : null}
      <div className="stage-caption">
        <strong>{image?.title}</strong>
        <span>ภาพตลาดไทยจาก CHANGAN Thailand</span>
      </div>
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          type="button"
          className={`part-marker ${activeFeatureId === hotspot.id ? 'is-active' : ''}`}
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          onClick={() => onFeatureChange(hotspot.id)}
        >
          <span />
          {hotspot.label}
        </button>
      ))}
    </div>
  )
}

type GalleryPanelProps = {
  images: ImageAsset[]
  selectedImage?: ImageAsset
  onSelect: (id: string) => void
}

function GalleryPanel({ images, selectedImage, onSelect }: GalleryPanelProps) {
  return (
    <section className="gallery-panel">
      <div className="playlist-head">
        <h2>คลังภาพ Q05 รุ่นไทย</h2>
        <span>{images.length} ภาพ</span>
      </div>
      <div className="gallery-grid">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            className={`gallery-card ${selectedImage?.id === image.id ? 'is-active' : ''}`}
            onClick={() => onSelect(image.id)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span>{image.title}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default App

