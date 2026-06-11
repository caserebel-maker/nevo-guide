import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Clock3,
  LibraryBig,
  Play,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import './App.css'
import { CarViewer } from './components/CarViewer'
import { categories, models, type ModelId, type VehiclePartId } from './data/models'
import type { GuideVideo, VideoCategoryId } from './data/q05Videos'

function App() {
  const [activeModelId, setActiveModelId] = useState<ModelId>('q05')
  const [activePart, setActivePart] = useState<VehiclePartId>('overview')
  const [selectedVideoId, setSelectedVideoId] = useState('2103753')
  const [query, setQuery] = useState('')

  const activeModel = models.find((model) => model.id === activeModelId) ?? models[0]
  const activeCategoryId = categories.find((category) => category.part === activePart)?.id ?? 'overview'

  const videos = activeModel.videos
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredVideos = videos.filter((video) => {
    const matchesCategory = video.categoryId === activeCategoryId || activePart === 'overview'
    const matchesSearch =
      !normalizedQuery || video.title.toLocaleLowerCase().includes(normalizedQuery) || video.id.includes(normalizedQuery)
    return matchesCategory && matchesSearch
  })
  const selectedVideo =
    filteredVideos.find((video) => video.id === selectedVideoId) ?? filteredVideos[0] ?? videos[0]
  const categoryCounts = videos.reduce<Record<string, number>>((counts, video) => {
    counts[video.categoryId] = (counts[video.categoryId] ?? 0) + 1
    return counts
  }, {})

  const handlePartChange = (part: VehiclePartId) => {
    setActivePart(part)
  }

  const handleModelChange = (modelId: ModelId) => {
    const nextModel = models.find((model) => model.id === modelId)
    if (!nextModel || nextModel.status === 'future') return
    setActiveModelId(modelId)
    setActivePart('overview')
    setSelectedVideoId(nextModel.videos[0]?.id ?? '')
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
        <label className="search-box" aria-label="ค้นหาคู่มือ">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาฟังก์ชัน..." />
        </label>
      </header>

      <section className="hero-grid" id="top">
        <div className="hero-copy">
          <p className="model-line">{activeModel.name}</p>
          <h1>คู่มืออัจฉริยะสำหรับ Nevo Q05</h1>
          <p className="hero-summary">{activeModel.summary}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#guide">
              <Play size={16} />
              เริ่มดูคู่มือ
            </a>
            <a className="ghost-action" href={selectedVideo?.detailUrl} target="_blank" rel="noreferrer">
              แหล่งข้อมูล
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="viewer-panel">
          <CarViewer activePart={activePart} onPartChange={handlePartChange} />
        </div>

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

      <section className="guide-layout" id="guide">
        <aside className="category-rail">
          <div className="section-heading">
            <SlidersHorizontal size={18} />
            <h2>เลือกพาร์ทของรถ</h2>
          </div>
          <div className="category-list">
            {categories.map((category) => {
              const Icon = category.icon
              const count = categoryCounts[category.id] ?? 0
              const isActive = activeCategoryId === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`category-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => handlePartChange(category.part)}
                >
                  <Icon size={20} />
                  <span>
                    <strong>{category.label}</strong>
                    <small>{count} วิดีโอ</small>
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        <section className="video-workspace">
          <VideoPanel video={selectedVideo} activeCategoryId={activeCategoryId} />
          <VideoList videos={filteredVideos} selectedVideoId={selectedVideo?.id} onSelect={setSelectedVideoId} />
        </section>
      </section>
    </main>
  )
}

type VideoPanelProps = {
  video?: GuideVideo
  activeCategoryId: VideoCategoryId
}

function VideoPanel({ video, activeCategoryId }: VideoPanelProps) {
  const category = categories.find((item) => item.id === activeCategoryId)

  if (!video) {
    return (
      <article className="video-panel empty-state">
        <LibraryBig size={30} />
        <h2>ยังไม่มีข้อมูลวิดีโอ</h2>
        <p>โมเดลนี้ถูกเตรียมไว้สำหรับเพิ่มข้อมูลในอนาคต</p>
      </article>
    )
  }

  return (
    <article className="video-panel">
      <div className="video-player">
        <video src={video.videoUrl} controls playsInline preload="metadata" />
      </div>
      <div className="video-meta">
        <div>
          <span className="category-name">{category?.label}</span>
          <h2>{video.title}</h2>
        </div>
        <span className="duration">
          <Clock3 size={15} />
          {video.duration}
        </span>
      </div>
      <p>
        ตอนที่ {video.order} จากคู่มือ Q05 ใช้สำหรับดูขั้นตอนการใช้งานจริง พร้อมเปิดเล่นในหน้านี้หรือกลับไปยังหน้า
        Yiche ต้นทางได้
      </p>
      <a className="source-link" href={video.detailUrl} target="_blank" rel="noreferrer">
        เปิดหน้าต้นทาง
        <ArrowUpRight size={15} />
      </a>
    </article>
  )
}

type VideoListProps = {
  videos: GuideVideo[]
  selectedVideoId?: string
  onSelect: (id: string) => void
}

function VideoList({ videos, selectedVideoId, onSelect }: VideoListProps) {
  return (
    <div className="playlist">
      <div className="playlist-head">
        <h2>รายการคู่มือ</h2>
        <span>{videos.length} ตอน</span>
      </div>
      <div className="playlist-scroll">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            className={`playlist-row ${selectedVideoId === video.id ? 'is-active' : ''}`}
            onClick={() => onSelect(video.id)}
          >
            <span className="row-index">{String(video.order).padStart(2, '0')}</span>
            <span className="row-title">{video.title}</span>
            <span className="row-duration">{video.duration}</span>
            {selectedVideoId === video.id ? <Check size={15} /> : <Play size={15} />}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
