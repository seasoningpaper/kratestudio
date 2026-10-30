export const SLOTS_PER_PAGE=9,DEFAULT_SAVE_PAGES=12,MAX_SAVE_PAGES=50;
export function pageCount(value,slots={}){const highest=Math.max(0,...Object.keys(slots).filter(k=>/^\d+$/.test(k)).map(Number));return Math.min(MAX_SAVE_PAGES,Math.max(DEFAULT_SAVE_PAGES,Math.ceil(highest/SLOTS_PER_PAGE),Number.isFinite(Number(value))?Math.trunc(Number(value)):DEFAULT_SAVE_PAGES))}
export function pageSlots(page){const n=Math.max(0,Math.min(MAX_SAVE_PAGES-1,Math.trunc(Number(page)||0)));return Array.from({length:SLOTS_PER_PAGE},(_,i)=>String(n*SLOTS_PER_PAGE+i+1))}
