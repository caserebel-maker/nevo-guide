import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Images, Menu, MonitorPlay, Search, SlidersHorizontal, X } from 'lucide-react'
import './App.css'
import { models, type FeatureId, type ImageAsset, type ModelId, type ScreenCapture } from './data/models'

function App() {
  const [activeModelId, setActiveModelId] = useState<ModelId>('q05')
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>('overview')
  const [selectedImageId, setSelectedImageId] = useState('q05-hero')
  const [query, setQuery] = useState('')
  const [isGuideMenuOpen, setIsGuideMenuOpen] = useState(false)

  const activeModel = models.find((model) => model.id === activeModelId) ?? models[0]
  const activeFeature = activeModel.features.find((feature) => feature.id === activeFeatureId) ?? activeModel.features[0]
  const allSelectableImages = [...activeModel.images, ...activeModel.screenCaptures]
  const selectedImage =
    allSelectableImages.find((image) => image.id === selectedImageId) ?? activeFeature?.image ?? activeModel.images[0]
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const galleryImages = activeModel.images.filter((image) => {
    if (image.kind === 'hero') return false
    if (!normalizedQuery) return true
    return `${image.title} ${image.alt}`.toLocaleLowerCase().includes(normalizedQuery)
  })
  const screenCaptures = activeModel.screenCaptures.filter((capture) => {
    const searchableText = `${capture.title} ${capture.alt} ${capture.note} ${capture.sourceVideo}`.toLocaleLowerCase()
    if (normalizedQuery) return searchableText.includes(normalizedQuery)
    if (activeFeatureId === 'overview') return true
    return capture.featureId === activeFeatureId
  })

  const handleModelChange = (modelId: ModelId) => {
    const nextModel = models.find((model) => model.id === modelId)
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
    setIsGuideMenuOpen(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nevo Guide home">
          <span className="brand-mark">N</span>
          <span>NEVO GUIDE</span>
        </a>
        <label className="model-select" aria-label="เลือกรุ่นรถ">
          <span>รุ่นรถ</span>
          <select value={activeModelId} onChange={(event) => handleModelChange(event.target.value as ModelId)}>
            {models.map((model) => (
              <option key={model.id} value={model.id} disabled={model.status === 'future'}>
                {model.name}{model.status === 'future' ? ' (เร็วๆ นี้)' : ''}
              </option>
            ))}
          </select>
          <ChevronDown size={16} />
        </label>
        <label className="search-box" aria-label="ค้นหารูปภาพ">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาภาพ, สี, ฟังก์ชัน..." />
        </label>
        <button
          type="button"
          className="guide-menu-toggle"
          aria-expanded={isGuideMenuOpen}
          aria-controls="guide-sidebar"
          onClick={() => setIsGuideMenuOpen((isOpen) => !isOpen)}
        >
          {isGuideMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>เมนูคู่มือ</span>
        </button>
      </header>

      <section className="hero-grid" id="top">
        <div className="hero-copy">
          <p className="model-line">{activeModel.name} / {activeModel.market}</p>
          <h1>ฐานข้อมูลภาพสำหรับ NEVO Q05 รุ่นไทย</h1>
          <p className="hero-summary">{activeModel.summary}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#visual-guide">
              <Images size={16} />
              ดูภาพและฟังก์ชัน
            </a>
            <a className="ghost-action" href={activeModel.sourceUrl} target="_blank" rel="noreferrer">
              Official Thailand
              <ArrowUpRight size={15} />
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
        <aside className={`category-rail ${isGuideMenuOpen ? 'is-open' : ''}`} id="guide-sidebar">
          <div className="section-heading">
            <span className="section-icon"><SlidersHorizontal size={18} /></span>
            <span>
              <small>{activeModel.code} guide</small>
              <h2>เมนูคู่มือ</h2>
            </span>
          </div>
          <div className="rail-meta">
            <span>{activeModel.features.length} หมวด</span>
            <span>{activeModel.screenCaptures.length} ภาพเมนู</span>
          </div>
          <div className="category-list">
            {activeModel.features.map((feature) => {
              const Icon = feature.icon
              const captureCount = activeModel.screenCaptures.filter((capture) => capture.featureId === feature.id).length
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
                  {captureCount ? <em>{captureCount}</em> : null}
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

        <ScreenCapturePanel
          captures={screenCaptures}
          activeFeatureLabel={activeFeature.label}
          selectedImage={selectedImage}
          onSelect={setSelectedImageId}
        />
      </section>
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
        <span>{image?.kind === 'capture' ? 'ภาพนิ่งจากคลิปคู่มือที่คัดแยกไว้' : 'ภาพตลาดไทยจาก CHANGAN Thailand'}</span>
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

type ScreenCapturePanelProps = {
  captures: ScreenCapture[]
  activeFeatureLabel: string
  selectedImage?: ImageAsset
  onSelect: (id: string) => void
}

function ScreenCapturePanel({ captures, activeFeatureLabel, selectedImage, onSelect }: ScreenCapturePanelProps) {
  return (
    <section className="screen-panel">
      <div className="playlist-head">
        <h2>
          <MonitorPlay size={19} />
          ภาพเมนูจากคลิป
        </h2>
        <span>{captures.length} ภาพ / {activeFeatureLabel}</span>
      </div>
      {captures.length ? (
        <div className="capture-grid">
          {captures.map((capture) => (
            <button
              key={capture.id}
              type="button"
              className={`capture-card ${selectedImage?.id === capture.id ? 'is-active' : ''}`}
              onClick={() => onSelect(capture.id)}
            >
              <img src={capture.src} alt={capture.alt} loading="lazy" />
              <span>
                <strong>{capture.title}</strong>
                <small>{capture.note}</small>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-captures">ยังไม่มีภาพเมนูสำหรับหัวข้อนี้ หรือคำค้นหาไม่ตรงกับรายการที่แคปไว้</p>
      )}
    </section>
  )
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
