export const brandColors = {
  ink: '#172033',
  paper: '#f8fafc',
  night: '#05080f',
  ice: '#e2e8f0',
  blue: '#2563eb',
  signal: '#60a5fa',
  muted: '#64748b',
};

export function getBrandPalette(mode = 'dark') {
  if (mode === 'mono') {
    return { background: '#ffffff', primary: '#0a0a0a', accent: '#0a0a0a' };
  }

  if (mode === 'light') {
    return { background: brandColors.paper, primary: brandColors.ink, accent: brandColors.blue };
  }

  return { background: brandColors.night, primary: brandColors.ice, accent: brandColors.signal };
}