# KOI Maker 0.40.8 — game appearance and panel corrections

The product version remains 0.40.8. Cache references advance to 0408-r2. Existing editor colors, typography, logo, work tabs, event-list structure and flow controls are retained.

- Player-name interpolation now applies to speaker labels, dialogue history and editor previews. Variable rename/delete updates speaker placeholders as well as dialogue text. Dynamic/custom speaker names are labelled accordingly instead of incorrectly reporting them as missing cast records.
- Game appearance offers six themes (sakura, ivory, sky, forest, amber, night), six dialogue styles and six speaker-name styles. Theme colors apply to game menu pages and both device profiles while preserving project assets, custom geometry and the editor palette. Dialogue/name styles remain independently configurable per device.
- The generated bottom game rail is thinner, with one background layer and transparent normal-state buttons. Migration targets only the known previous generated dimensions; authored layouts remain intact. Moving/resizing the toolbar transforms its child buttons with it so they cannot be left at stale positions.
- Input screens hide the ordinary dialogue box to prevent duplicate overlapping prompts. Designer blocks remain clipped to their authored rectangle; speaker labels truncate long text.
- The title designer uses the actual title-background asset. Title background dragging, fit, motion and timing edit title settings independently of story background events; runtime reads the same fields.
- The right properties panel folds to a small SVG restore button. Its miniature-flow section has an independent SVG toggle. Both states persist, and mobile property navigation explicitly restores the properties sheet.

Validation includes production builds, runtime/input/variable/history/save models, preset counts and application, generated/custom toolbar geometry, actual designer background drag, property selectors and panel toggles, plus the existing automated regression suite. Physical-device and browser-render visual QA remain unavailable in this environment.
