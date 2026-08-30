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

export function canonicalURL(pathname) {
  return `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
}