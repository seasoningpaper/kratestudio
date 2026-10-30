import {sections} from './sections.mjs';
import {blockSpan} from './block-integrity.mjs';

// A section owns its marker and events up to (not including) the next marker.
// A loop crossing that boundary must be resolved by the author, never silently
// expanded into unrelated sections during deletion.
export function sectionDeletePlan(events, index) {
  if (events[index]?.type !== 'section') return null;
  const group = sections(events).find(g => g.sectionIndex === index);
  const ids = [events[index].id, ...group.items.map(v => v.event.id)];
  const owned = new Set(ids);
  for (const {event, index: at} of group.items) {
    if (['repeat', 'repeatEnd'].includes(event.type) &&
        blockSpan(events, at).some(id => !owned.has(id)))
      return {error:'此區段跨越重複積木邊界，請先將完整重複積木移到同一區段，再刪除。'};
  }
  return {ids, title: group.title, count: group.items.length};
}
