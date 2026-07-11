import { useState } from 'react';
import { Check, Moon, Sun, CircleDot } from 'lucide-react';
import ClawCLogo from '../brand/ClawCLogo';
import CutWordmarkLogo from '../brand/CutWordmarkLogo';
import SealCLogo from '../brand/SealCLogo';
import { getBrandPalette } from '../brand/brandTokens';

const concepts = [
  {
    id: 'claw-c',
    name: 'Claw-C',
    description: 'Three tapered talons form the initial c. Expressive, memorable, and strongest on stickers.',
    Logo: ClawCLogo,
    scores: { recognition: 9, trust: 7, small: 8, ownership: 9 },
  },
  {
    id: 'cut-wordmark',
    name: 'Cut Wordmark',
    description: 'One continuous wordmark with the claw intervention cut directly into the first letter.',
    Logo: CutWordmarkLogo,
    scores: { recognition: 7, trust: 9, small: 8, ownership: 7 },
  },
  {
    id: 'seal-c',
    name: 'Seal-C',
    description: 'Nested containment boundaries with one declared opening. Product-derived and restrained.',
    Logo: SealCLogo,
    scores: { recognition: 8, trust: 9, small: 7, ownership: 8 },
  },
];

const modes = [
  { id: 'dark', label: 'Dark', Icon: Moon },
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'mono', label: 'Mono', Icon: CircleDot },
];

function Score({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: '#64748b' }}>{label}</span>
        <span style={{ color: '#172033', fontFamily: "'IBM Plex Mono', monospace" }}>{value}/10</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: '#e2e8f0' }}>
        <div className="h-full rounded-full" style={{ width: `${value * 10}%`, background: '#2563eb' }} />
      </div>
    </div>
  );
}

function ConceptPanel({ concept, mode, selected, onSelect }) {
  const palette = getBrandPalette(mode);
  const { Logo } = concept;

  return (
    <article
      className="overflow-hidden rounded-xl"
      style={{ border: selected ? '2px solid #2563eb' : '1px solid #dbe3ef', background: '#ffffff' }}
    >
      <div className="h-56 flex items-center justify-center px-6" style={{ background: palette.background }}>
        <Logo mode={mode} height={88} />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#2563eb', fontFamily: "'IBM Plex Mono', monospace" }}>
              Direction {concepts.findIndex((item) => item.id === concept.id) + 1}
            </p>
            <h2 className="text-xl font-bold" style={{ color: '#172033', fontFamily: "'Space Grotesk', sans-serif" }}>{concept.name}</h2>
          </div>
          <button
            type="button"
            onClick={onSelect}
            className="w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ color: selected ? '#ffffff' : '#2563eb', background: selected ? '#2563eb' : '#eff6ff', border: 'none' }}
            aria-label={`Select ${concept.name}`}
          >
            <Check size={17} />
          </button>
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>{concept.description}</p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[16, 24, 32, 48].map((size) => (
            <div key={size} className="h-14 rounded-lg flex flex-col items-center justify-center" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Logo mode="light" compact height={size} />
              <span className="text-[9px] mt-1" style={{ color: '#94a3b8', fontFamily: "'IBM Plex Mono', monospace" }}>{size}px</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
          <Score label="Recognition" value={concept.scores.recognition} />
          <Score label="Trust" value={concept.scores.trust} />
          <Score label="Small size" value={concept.scores.small} />
          <Score label="Ownability" value={concept.scores.ownership} />
        </div>
      </div>
    </article>
  );
}

export default function BrandStudioPage() {
  const [mode, setMode] = useState('dark');
  const [selected, setSelected] = useState('claw-c');
  const selectedConcept = concepts.find((concept) => concept.id === selected);
  const SelectedLogo = selectedConcept.Logo;

  return (
    <div className="min-h-screen" style={{ background: '#eef2f7', color: '#172033', padding: '72px 24px 80px' }}>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#2563eb', fontFamily: "'IBM Plex Mono', monospace" }}>
              Internal design review
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0 }}>
              Clawdlinux brand studio
            </h1>
            <p className="max-w-2xl text-base" style={{ color: '#64748b' }}>
              Three vector directions tested against the same product constraints: Kubernetes governance, developer culture, and regulated trust.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-lg self-start" style={{ background: '#ffffff', border: '1px solid #dbe3ef' }}>
            {modes.map(({ id, label, Icon }) => (
              <button
                type="button"
                key={id}
                onClick={() => setMode(id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm"
                style={{ background: mode === id ? '#172033' : 'transparent', color: mode === id ? '#ffffff' : '#64748b', border: 'none' }}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </header>

        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          {concepts.map((concept) => (
            <ConceptPanel
              key={concept.id}
              concept={concept}
              mode={mode}
              selected={selected === concept.id}
              onSelect={() => setSelected(concept.id)}
            />
          ))}
        </section>

        <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid #dbe3ef' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#64748b', fontFamily: "'IBM Plex Mono', monospace" }}>Website navigation test</p>
            </div>
            <div className="h-40 px-8 flex items-center justify-between" style={{ background: '#05080f' }}>
              <SelectedLogo mode="dark" height={50} />
              <div className="hidden sm:flex gap-6 text-sm" style={{ color: '#94a3b8' }}>
                <span>Products</span><span>Operator</span><span>Audit</span><span>GitHub</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid #dbe3ef' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#64748b', fontFamily: "'IBM Plex Mono', monospace" }}>Sticker proof · 100 × 30 mm</p>
            </div>
            <div className="h-40 flex items-center justify-center" style={{ background: '#d9dde4' }}>
              <div className="rounded-xl px-5 py-3" style={{ background: '#ffffff', boxShadow: '0 8px 25px rgba(15, 23, 42, 0.16)' }}>
                <SelectedLogo mode="light" height={46} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}