# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Starlight Knowledge Tree, please **do not** open a public issue.

Instead, report it privately through [GitHub Security Advisories](https://github.com/frankxai/starlight-knowledge-tree/security/advisories/new) or email the maintainers directly.

We will acknowledge receipt within 48 hours and provide a remediation timeline.

---

## Data Privacy Warning

> ⚠️ **This is a public repository.**

The following types of data **must never be committed** to this repository:

- Personal health records or medical data
- Genetic or genomic data
- Biometric data (fingerprints, retinal scans, facial recognition data)
- Personal identifiers (names, addresses, emails linked to individuals)
- Any data covered by GDPR, HIPAA, CCPA, or equivalent privacy regulations

The `bio-human-intelligence` domain is restricted to:

- Peer-reviewed scientific literature references
- Population-level or aggregate research data
- Publicly available datasets with appropriate licensing

If you accidentally commit private data, contact the maintainers immediately so the git history can be purged before the commit propagates.

---

## Scope

This security policy covers:

- The graph data files in `data/`
- The web application in `apps/web/`
- The validation scripts in `packages/`
- The GitHub Actions workflows in `.github/workflows/`

---

## Supported Versions

| Version | Status |
|---|---|
| `main` branch | Active — security fixes applied |
| Other branches | Best-effort |
