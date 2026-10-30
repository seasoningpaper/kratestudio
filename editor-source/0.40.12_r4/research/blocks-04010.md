# KOI Maker 0.40.10: block interaction references
Reviewed 2026-10-19. This release keeps KOI's flat editor rather than copying another editor's GUI or claiming project-format compatibility.

| Official reference | Applied to KOI |
|---|---|
| https://github.com/scratchfoundation/scratch-flash | Connected stacks, explicit detached state, visual drag feedback (Scratch 2 source reference) |
| https://github.com/scratchfoundation/scratch-blocks | Category palettes, shaped operator reporters and input sockets |
| https://github.com/code-dot-org/blockly | Workspace separation and unattached-block interaction; archived code not added as a dependency |
| https://ai2a.appinventor.mit.edu/reference/other/editing-functions.html | Context menu and clipboard behavior |
| https://appinventor.mit.edu/explore/sites/all/files/Teach/media/MITAppInventorQuickReference.pdf | Minimap navigation and category toolbox |

Implementation: virtualized event cards for larger stories; no DOM-wide measurements on pan; themed block/minimap/category colors; two-finger camera movement; touch palette ghosts; arithmetic reporters can be placed independently or dropped in value fields. A field stores a safe KOI expression string; this is not the complete nested AST editor from Scratch. Sequential module clips intentionally omit story branch and control events. No external module JavaScript is executed.

QA: automated model, DOM interaction and Worker routing tests. Physical-phone rendering and FPS measurements require device validation and are not claimed by automated DOM tests.
