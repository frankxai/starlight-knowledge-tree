export function filterLayers(data, query = "") {
  const q = query.trim().toLowerCase().slice(0, 200);
  return data.layers.filter(layer => [layer.label, layer.summary, ...data.entities.filter(e => e.layer === layer.id).map(e => e.name)].join(" ").toLowerCase().includes(q));
}
export function dossier(data, scenarioId) {
  const scenario = data.scenarios.find(s => s.id === scenarioId);
  if (!scenario) return null;
  const entities = data.entities.filter(e => scenario.entity_ids.includes(e.id));
  return { status: "editorial_draft", as_of: data.as_of, scenario, entities, sources: data.sources.filter(s => entities.some(e => e.source_id === s.id)), notice: data.notice, rights: data.rights };
}
export function validateIndustry(data) {
  const unique = (items, label) => {
    if (new Set(items.map(x => x.id)).size !== items.length) throw new Error("Duplicate " + label);
  };
  for (const key of ["layers", "entities", "sources", "scenarios", "relationships"]) unique(data[key], key);
  const has = (key, id) => data[key].some(x => x.id === id);
  if (data.status !== "editorial_draft") throw new Error("Unsupported approval state");
  for (const s of data.sources) {
    const u = new URL(s.url);
    if (u.protocol !== "https:" || u.username || u.password) throw new Error("Unsafe source");
    if (s.inspection !== "relevant_sections" || !s.locator || s.accessed_on > data.as_of) throw new Error("Invalid source inspection");
  }
  for (const e of data.entities) {
    if (!has("layers", e.layer) || !has("sources", e.source_id)) throw new Error("Dangling entity evidence");
  }
  for (const s of data.scenarios) {
    if (s.standing !== "analyst_hypothesis" || !s.countercase || !s.action || !s.assumptions.length) throw new Error("Unsupported causal certainty");
    if (!s.layer_ids.every(id => has("layers", id)) || !s.entity_ids.every(id => has("entities", id))) throw new Error("Dangling scenario");
  }
  for (const r of data.relationships) {
    if (!has("entities", r.from) || !has("entities", r.to) || !has("sources", r.source_id) || r.standing !== "company_reported") throw new Error("Invalid relationship");
  }
  return data;
}
