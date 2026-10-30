# KOI Maker 0.40.7

- Added KOI Script: native Chinese commands, typed variables, conditional branches, input, dialogue typography, second-based animation timing, downloadable UTF-8 sample and in-editor command table. Import creates an independent editable story.
- Retained import aliases for the supplied legacy script format: music/effects, image and music unlocks, intro, backgrounds, figures/transforms, named animation targets, mini avatars, textbox visibility, fade, wait, labels, choices and jumps. Missing resources and branch labels report source lines. Late folder imports resolve resource names without overriding manual selections.
- Player executes imported intro/fade timers independently of typewriter text, preserves stage actions in saves and rollback, and collects unlocked music. Explicit unresolved choices and conditions stop with a visible diagnostic.
- Projects are separately stored and selectable. Plus creates a new named project; examples create separate projects. Scripts remain inside their own project. Asset keys are project-scoped and garbage collection retains other projects' files.
- Project and workspace tabs support pointer drag scrolling; project names remain fully readable. The whole resources sidebar folds to an SVG restore control.
- Editor palette applies to editor surfaces and text as well as controls. Removed the 編輯環境 subtitle. Expanded animation actions and timing controls. Flow auto-arrange fits fresh coordinates after removing old manual positions.
- Application project limit: 2048 MiB. Actual capacity depends on browser/device quota; storage remains browser-local, not a cloud allocation.

## Compatibility boundaries

KOI Script is an event language, not a complete WebGAL runtime. External custom animation definitions, stage-wide legacy animations and callScene return stacks are not implemented; import diagnostics explain these cases. Original samples with undefined destinations must supply labels or visual connections. Imported media references require the actual assets. Homepage, save/load UI and per-device layouts remain configured in project tools.

## Validation

Production bundles built successfully. The automated suite covers durable storage, recovery, multi-project asset isolation, folder imports, native and legacy parser paths, both native sample branches, timed intro/fade runtime, saves/rollback, tab interaction, theme application, layout, flow connections, reordering and export. Browser/device visual QA is unavailable in this environment; no claim of physical mobile Safari verification is made.
