import { useState } from 'react'
import { ArrowUpRight, Check, Images, Search, SlidersHorizontal } from 'lucide-react'
import './App.css'
import { models, type FeatureId, type ImageAsset, type ModelId } from './data/models'

function App() {
  const [activeModelId, setActiveModelId] = useState<ModelId>('q05')
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>('overview')
  const [selectedImageId, setSelectedImageId] = useState('q05-hero')
  const [query, setQuery] = useState('')

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

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nevo Guide home">
          <span className="brand-mark">N</span>
          <span>NEVO GUIDE</span>
        </a>
        <nav className="model-tabs" aria-label="Nevo models">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              className={`model-tab ${model.id === activeModelId ? 'is-active' : ''}`}
              disabled={model.status === 'future'}
              onClick={() => handleModelChange(model.id)}
            >
              {model.code}
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
