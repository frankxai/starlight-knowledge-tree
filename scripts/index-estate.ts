import * as fs from "fs";
import * as path from "path";

export interface RepoIndexEntry {
  slug: string;
  name: string;
  constellation: string;
  path: string;
  description: string;
  has_git: boolean;
  has_agents_md: boolean;
  has_claude_md: boolean;
  has_readme: boolean;
  has_mcp_config: boolean;
  package_name?: string;
  framework?: string;
  key_skills: string[];
  key_agents: string[];
  mcp_servers: string[];
  lore_canon?: boolean;
  vercel_target?: string;
  github_repo?: string;
  last_modified: string;
}

export interface EstateIndex {
  generated_at: string;
  estate_root: string;
  total_repos: number;
  constellation_counts: Record<string, number>;
  framework_counts: Record<string, number>;
  repos: RepoIndexEntry[];
}

const REPOS_ROOT = path.resolve("C:/Users/frank/starlight/repos");

function determineConstellation(slug: string, pkgJson: any, readmeText: string): string {
  const lower = slug.toLowerCase();
  
  if (
    lower.startsWith("arcanea") ||
    lower.includes("spellbound") ||
    lower.includes("claw") ||
    lower.includes("origin-quiz")
  ) {
    return "1. Arcanea Living Worlds";
  }

  if (
    lower.includes("frankx") ||
    lower.includes("creator") ||
    lower.includes("publishing") ||
    lower.includes("agentic-income") ||
    lower.includes("author")
  ) {
    return "2. FrankX Creator & Authority";
  }

  if (
    lower.includes("canvas") ||
    lower.includes("command-center") ||
    lower.includes("cosmos") ||
    lower.includes("litellm") ||
    lower.includes("cockpit") ||
    lower.includes("agent-army") ||
    lower.includes("swarm")
  ) {
    return "3. Agent OS & Spatial Canvas";
  }

  if (
    lower.includes("remotion") ||
    lower.includes("liquid") ||
    lower.includes("video") ||
    lower.includes("animation") ||
    lower.includes("motion") ||
    lower.includes("anime")
  ) {
    return "4. Media Lab & 3D WebGL";
  }

  if (
    lower.includes("second-brain") ||
    lower.includes("knowledge-tree") ||
    lower.includes("design-intel") ||
    lower.includes("prompt-library") ||
    lower.includes("memory") ||
    lower.includes("capability-registry") ||
    lower.includes("starlight-intelligence-system") ||
    lower.includes("starlight-memory")
  ) {
    return "5. Assets, Lore & Knowledge";
  }

  if (
    lower.includes("intelligence-system") ||
    lower.includes("people-intelligence") ||
    lower.includes("business") ||
    lower.includes("wealth") ||
    lower.includes("health") ||
    lower.includes("property") ||
    lower.includes("music-intelligence") ||
    lower.includes("hospitality") ||
    lower.includes("family")
  ) {
    return "6. Sovereign Domain Verticals";
  }

  return "7. Templates, Infrastructure & Foundations";
}

function extractFramework(pkgJson: any): string {
  if (!pkgJson) return "Markdown / Spec";
  const deps = { ...(pkgJson.dependencies || {}), ...(pkgJson.devDependencies || {}) };
  if (deps["next"]) return "Next.js";
  if (deps["remotion"]) return "Remotion";
  if (deps["three"] || deps["@react-three/fiber"]) return "Three.js / WebGL";
  if (deps["react"]) return "React";
  if (deps["fastapi"] || deps["python"]) return "Python";
  if (deps["typescript"] || deps["zod"]) return "TypeScript / Node";
  return "Node.js";
}

function extractAgentsAndSkills(repoPath: string): { skills: string[]; agents: string[]; mcp: string[] } {
  const skills: string[] = [];
  const agents: string[] = [];
  const mcp: string[] = [];

  // Check .agents / agents / skills / .claude / .mcp.json
  const possibleSkillDirs = [
    path.join(repoPath, "skills"),
    path.join(repoPath, ".agents", "skills"),
    path.join(repoPath, ".claude", "skills"),
  ];

  for (const sDir of possibleSkillDirs) {
    if (fs.existsSync(sDir)) {
      try {
        const entries = fs.readdirSync(sDir);
        for (const e of entries) {
          skills.push(e);
        }
      } catch {}
    }
  }

  const possibleAgentDirs = [
    path.join(repoPath, "agents"),
    path.join(repoPath, ".agents"),
    path.join(repoPath, ".claude", "agents"),
  ];

  for (const aDir of possibleAgentDirs) {
    if (fs.existsSync(aDir)) {
      try {
        const entries = fs.readdirSync(aDir);
        for (const e of entries) {
          if (e.endsWith(".md") || e.endsWith(".yaml") || e.endsWith(".json")) {
            agents.push(e.replace(/\.[^/.]+$/, ""));
          }
        }
      } catch {}
    }
  }

  const mcpFiles = [
    path.join(repoPath, ".mcp.json"),
    path.join(repoPath, "mcp.json"),
    path.join(repoPath, ".claude", "mcp.json"),
  ];

  for (const mFile of mcpFiles) {
    if (fs.existsSync(mFile)) {
      try {
        const raw = JSON.parse(fs.readFileSync(mFile, "utf8"));
        const servers = raw.mcpServers || raw.servers || {};
        for (const sName of Object.keys(servers)) {
          mcp.push(sName);
        }
      } catch {}
    }
  }

  return { skills: Array.from(new Set(skills)), agents: Array.from(new Set(agents)), mcp: Array.from(new Set(mcp)) };
}

export function indexEstate(): EstateIndex {
  console.log(`Scanning Starlight Repos Estate at ${REPOS_ROOT}...`);
  if (!fs.existsSync(REPOS_ROOT)) {
    throw new Error(`Repos root does not exist: ${REPOS_ROOT}`);
  }

  const entries = fs.readdirSync(REPOS_ROOT, { withFileTypes: true });
  const repos: RepoIndexEntry[] = [];
  const constellationCounts: Record<string, number> = {};
  const frameworkCounts: Record<string, number> = {};

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".") && entry.name !== ".agents" && entry.name !== ".claude") continue;

    const repoPath = path.join(REPOS_ROOT, entry.name);
    let pkgJson: any = null;
    const pkgPath = path.join(repoPath, "package.json");
    if (fs.existsSync(pkgPath)) {
      try {
        pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      } catch {}
    }

    let readmeText = "";
    const readmePath = path.join(repoPath, "README.md");
    if (fs.existsSync(readmePath)) {
      try {
        readmeText = fs.readFileSync(readmePath, "utf8");
      } catch {}
    }

    const hasGit = fs.existsSync(path.join(repoPath, ".git"));
    const hasAgentsMd = fs.existsSync(path.join(repoPath, "AGENTS.md"));
    const hasClaudeMd = fs.existsSync(path.join(repoPath, "CLAUDE.md"));
    const hasMcp = fs.existsSync(path.join(repoPath, ".mcp.json")) || fs.existsSync(path.join(repoPath, "mcp.json"));
    const hasCanonLocked = fs.existsSync(path.join(repoPath, ".arcanea", "lore", "CANON_LOCKED.md")) || fs.existsSync(path.join(repoPath, "CANON.md"));

    const constellation = determineConstellation(entry.name, pkgJson, readmeText);
    const framework = extractFramework(pkgJson);
    const { skills, agents, mcp } = extractAgentsAndSkills(repoPath);

    // Extract description from README first lines
    let description = pkgJson?.description || "";
    if (!description && readmeText) {
      const lines = readmeText.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
      if (lines.length > 0) {
        description = lines[0].replace(/^> /, "").trim().slice(0, 300);
      }
    }
    if (!description) {
      description = `Repository for ${entry.name} within ${constellation}.`;
    }

    const stat = fs.statSync(repoPath);

    const repoEntry: RepoIndexEntry = {
      slug: entry.name,
      name: pkgJson?.name || entry.name,
      constellation,
      path: repoPath.replace(/\\/g, "/"),
      description,
      has_git: hasGit,
      has_agents_md: hasAgentsMd,
      has_claude_md: hasClaudeMd,
      has_readme: fs.existsSync(readmePath),
      has_mcp_config: hasMcp,
      package_name: pkgJson?.name,
      framework,
      key_skills: skills,
      key_agents: agents,
      mcp_servers: mcp,
      lore_canon: hasCanonLocked,
      last_modified: stat.mtime.toISOString(),
    };

    repos.push(repoEntry);
    constellationCounts[constellation] = (constellationCounts[constellation] || 0) + 1;
    frameworkCounts[framework] = (frameworkCounts[framework] || 0) + 1;
  }

  repos.sort((a, b) => a.constellation.localeCompare(b.constellation) || a.slug.localeCompare(b.slug));

  const result: EstateIndex = {
    generated_at: new Date().toISOString(),
    estate_root: REPOS_ROOT.replace(/\\/g, "/"),
    total_repos: repos.length,
    constellation_counts: constellationCounts,
    framework_counts: frameworkCounts,
    repos,
  };

  return result;
}

// Generate Markdown Audit Document
function generateAuditMarkdown(index: EstateIndex): string {
  let md = `# STARLIGHT ESTATE KNOWLEDGE AUDIT & CONSTELLATION MAP\n\n`;
  md += `> **Generated at**: ${index.generated_at}\n`;
  md += `> **Estate Root SSOT**: \`${index.estate_root}\`\n`;
  md += `> **Total Repositories Indexed**: ${index.total_repos}\n\n`;

  md += `## 1. Constellation Overview\n\n`;
  md += `| Constellation | Repo Count |\n|---|---|\n`;
  for (const [cName, count] of Object.entries(index.constellation_counts)) {
    md += `| **${cName}** | ${count} |\n`;
  }
  md += `\n`;

  md += `## 2. Technology & Framework Distribution\n\n`;
  md += `| Framework / Tech | Repositories |\n|---|---|\n`;
  for (const [fName, count] of Object.entries(index.framework_counts)) {
    md += `| ${fName} | ${count} |\n`;
  }
  md += `\n`;

  md += `## 3. Repositories by Constellation\n\n`;

  let currentConstellation = "";
  for (const repo of index.repos) {
    if (repo.constellation !== currentConstellation) {
      currentConstellation = repo.constellation;
      md += `### ${currentConstellation}\n\n`;
      md += `| Slug | Framework | Git | AGENTS.md | Canon | Description |\n`;
      md += `|---|---|---|---|---|---|\n`;
    }
    const gitTag = repo.has_git ? "✅" : "❌";
    const agentsTag = repo.has_agents_md ? "✅" : "—";
    const canonTag = repo.lore_canon ? "👑 Canon" : "—";
    const cleanDesc = repo.description.replace(/\|/g, "\\|").replace(/\n/g, " ");
    md += `| [\`${repo.slug}\`](file:///${repo.path}) | ${repo.framework} | ${gitTag} | ${agentsTag} | ${canonTag} | ${cleanDesc} |\n`;
  }

  md += `\n---\n\n*Attestation: Generated by Starlight Estate Indexer. Local-first sovereign scan.* © Frank Riemer.\n`;
  return md;
}

// Run if main
const indexData = indexEstate();
const outJsonPath = path.resolve(__dirname, "../data/estate-index.json");
const outMdPath = path.resolve(__dirname, "../docs/ESTATE_KNOWLEDGE_AUDIT.md");

fs.writeFileSync(outJsonPath, JSON.stringify(indexData, null, 2), "utf8");
console.log(`✅ Written ${indexData.total_repos} indexed repos to ${outJsonPath}`);

fs.writeFileSync(outMdPath, generateAuditMarkdown(indexData), "utf8");
console.log(`✅ Written markdown estate audit to ${outMdPath}`);
