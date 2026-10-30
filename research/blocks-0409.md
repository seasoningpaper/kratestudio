# KOI Maker 0.40.9

The new block editor is a KOI-native view over the existing chapter event array. It is not an embedded Scratch VM and does not import Scratch .sb3 projects. No Scratch program source, illustrations or trademarks are bundled.

Design references consulted on 2026-10-18:
- Scratch GUI: https://github.com/scratchfoundation/scratch-gui
- Scratch Blocks: https://github.com/scratchfoundation/scratch-blocks

Implemented workflows: category palette, editable statement inputs, drag/reorder and touch handles, nested counted repeats, bounded arithmetic/boolean/string expressions, shared typed variables and database access, live preview, shared undo, and common project export. Repeated event groups retain matching IDs when copied. Runtime loops preserve their state in saves and rollback.

UI changes: six text tool entries, Bootstrap-style active underline only in tool navigation, twelve coordinated editor color themes, Traditional Chinese and English editor controls, faint optional flow grid, square blue selection, asset filters/tags/thumbnail sizes, system-screen color/background templates, and non-destructive video trim/speed/color/audio/skip settings.

Validation uses model and jsdom interaction tests. No real-device visual QA was available. Media format/codec decoding remains browser-dependent. Existing published artwork and authored story content are not replaced.

## 0.40.9 focused refinement

References: user screenshots from 2026-10-18 and the official ACG Creator website, https://acgcreator.com/zh-TW . The screenshots inform toolbar placement, the white minimap and flat editor controls; the public landing page is not treated as a complete editor feature specification.

- Confirmation, prompt and notice dialogs use their footer actions; the event chooser retains its separate close action.
- Flow grid and zoom controls share the top toolbar. Grid intensity has four subtle levels; grid and minimap colors are project editor preferences.
- Added six toolbar presets, including centered text without a panel background. Text-only presets explicitly clear artwork; original presets preserve artwork. Desktop changes preserve the current mobile profile through an explicit style snapshot.
- Compact blocks animate insertion and reordering with reduced-motion support; model and event IDs remain shared.
- Editor and standalone player UI share the same translation dictionary. Author-written dialogue, names, asset filenames, target labels and custom button labels are excluded.
- No browser QA surface was available in this environment; verification uses the existing model and jsdom interaction suites.

## Professional editor refinement, 2026-10-18

Official references reviewed for capability grouping:
- Ren’Py screens and actions: https://www.renpy.org/doc/html/screens.html and https://www.renpy.org/doc/html/screen_actions.html
- Ren’Py transforms and drag/drop: https://www.renpy.org/doc/html/transforms.html and https://www.renpy.org/doc/html/drag_drop.html
- Naninovel GUI: https://naninovel.com/guide/gui
- Tuesday JS editor: https://github.com/Kirilllive/tuesday-js

Implemented in KOI's own shared project model: detachable work tabs with current task titles, block context operations/shared clipboard/insertion target, two-touch panning with pinch zoom, bounded flow camera/minimap and boundary feedback, editor input staging through the real player, Bootstrap-style form controls, 18 editor palettes including dark variants, category/uniform custom colors and 12 game palettes.

Screen layout editing covers title/story and system pages. System-page primitives include header, close, navigation, content region, individual save slots and page controls; additional image/text/panel/action-button layers can be arranged, resized, locked, hidden, aligned and exported/imported as validated JSON. Real save/load/history/settings/gallery implementations remain behind the layout. Complex settings widgets and gallery content are grouped in their content region. This is not a complete Unity prefab or third-party screen-language implementation.

Image tools use Canvas compositing: crop, arbitrary rotation, flip, output dimensions, text/image/color/paint layers, opacity and blend modes, layer ordering/locking/hiding, filters, color-key transparency, undo/redo and PNG/JPEG/WebP output. Image saves flatten layers. Optional edit-settings JSON preserves parameters and layer metadata, and requires the original image/linked assets; PSD, CMYK, smart objects, adjustment-layer compatibility and professional color management are not implemented.

Validation uses the existing model/jsdom suite plus targeted camera, tabs, clipboard, touch, live screen-action, image-output and keyboard/resize/lock regression cases. No supported real-browser QA surface was available; no real-device visual certification is claimed.
