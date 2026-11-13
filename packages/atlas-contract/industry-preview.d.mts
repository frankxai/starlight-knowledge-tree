export interface IndustryData {
  status: string; as_of: string; notice: string; rights: Record<string, string>;
  layers: {id: string; label: string; summary: string; question: string}[];
  entities: {id: string; name: string; layer: string; role: string; source_id: string; limit: string}[];
  sources: {id: string; title: string; url: string; locator: string; accessed_on: string; inspection: string}[];
  scenarios: {id: string; title: string; trigger: string; mechanism: string; standing: string; assumptions: string[]; countercase: string; action: string; layer_ids: string[]; entity_ids: string[]}[];
  relationships: {id: string; from: string; to: string; label: string; standing: string; source_id: string}[];
}
export function filterLayers(data: IndustryData, query?: string): IndustryData["layers"];
export function dossier(data: IndustryData, scenarioId: string): {status: string; as_of: string; scenario: IndustryData["scenarios"][number]; entities: IndustryData["entities"]; sources: IndustryData["sources"]; notice: string; rights: Record<string, string>} | null;
export function validateIndustry(data: IndustryData): IndustryData;
