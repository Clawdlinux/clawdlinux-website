export const SITE_URL = 'https://clawdlinux.org';

export const PAGE_METADATA = {
  '/': {
    title: 'Clawdlinux: governance for AI agents on Kubernetes',
    description: 'Open-source controls and evidence for AI agents running in Kubernetes. Review workload contracts, gVisor mutation, generated NetworkPolicy, model cost, and offline verification primitives.',
  },
  '/products': {
    title: 'Clawdlinux Products: Controls and Evidence for AI Agents',
    description: 'Explore open-source Kubernetes controls, token-safe agent SaaS actions, and offline audit verification for AI agent workloads.',
  },
  '/products/operator': {
    title: 'Agentic Operator: Kubernetes Controls for AI Agents',
    description: 'Run governed AI agents in Kubernetes with runtime adapters, gVisor mutation, generated network policy, policy evaluation, and cost attribution.',
  },
  '/products/agentgate': {
    title: 'AgentGate: Token-Safe SaaS Actions for AI Agents',
    description: 'AgentGate keeps OAuth and bearer tokens outside AI agents. Authenticated SaaS actions create signed, hash-chained receipts that verify offline.',
  },
  '/products/audit': {
    title: 'AI Agent Audit Evidence: Offline JSONL Verification',
    description: 'Verify AI agent audit records with hash-chain, HMAC, and offline JSONL verification primitives from Clawdlinux.',
  },
};

export const PAGE_STRUCTURED_DATA = {
  '/': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Clawdlinux',
    description: PAGE_METADATA['/'].description,
    url: SITE_URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Kubernetes',
    license: 'https://opensource.org/licenses/Apache-2.0',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'Clawdlinux', url: 'https://github.com/Clawdlinux' },
    codeRepository: 'https://github.com/Clawdlinux/agentic-operator-core',
  },
  '/products': {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: PAGE_METADATA['/products'].title,
    description: PAGE_METADATA['/products'].description,
    url: canonicalURL('/products'),
    isPartOf: { '@type': 'WebSite', name: 'Clawdlinux', url: SITE_URL },
  },
  '/products/operator': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Agentic Operator',
    description: PAGE_METADATA['/products/operator'].description,
    url: canonicalURL('/products/operator'),
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Kubernetes',
    license: 'https://opensource.org/licenses/Apache-2.0',
    codeRepository: 'https://github.com/Clawdlinux/agentic-operator-core',
  },
  '/products/agentgate': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AgentGate',
    description: PAGE_METADATA['/products/agentgate'].description,
    url: canonicalURL('/products/agentgate'),
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Linux',
    codeRepository: 'https://github.com/Clawdlinux/agentgate',
  },
  '/products/audit': {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Clawdlinux Audit Primitives',
    description: PAGE_METADATA['/products/audit'].description,
    url: canonicalURL('/products/audit'),
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Kubernetes',
    codeRepository: 'https://github.com/Clawdlinux/agentic-operator-core',
  },
};

export function normalizePathname(pathname) {
  return pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
}

export function canonicalURL(pathname) {
  return `${SITE_URL}${normalizePathname(pathname)}`;
}