# KOI Maker 0.40.6

- Project Tools / 遊戲畫面: shared-coordinate layout canvas for title and story UI, pointer dragging, keyboard nudges, percentage geometry, individual quick-menu and title actions, normal/hover artwork and colors, opacity, font and typography controls. Supports 16:9, 4:3 and 9:16 canvases. Changes apply to inline editor preview, runtime and exports.
- Background/actor motions: fade, slide, rise, zoom, shake and pan, with duration, easing and loop. Placement and movement remain independent. Sprite swaps replace the actual source and retain placement.
- Font assets: WOFF/WOFF2/TTF/OTF, validated in supported browsers, stored in the same IndexedDB transaction as images and audio, included in JSON/HTML/ZIP exports and the 1024 MiB project cap.
- Visual typed variable CRUD: numeric, text and boolean values; rename rewrites script references; delete confirms, detaches event references and freezes text substitutions to the initial value.
- Visual project tables: add/delete tables and columns, edit rows, typed cells. Local SQL subset supports SELECT, INSERT INTO, UPDATE, DELETE FROM and CREATE TABLE, with equality WHERE, scalar literals and transactional application. No arbitrary JavaScript evaluation or full SQL compatibility. `variables` is a live view of project defaults; custom table data can be interpolated as `{table.column.1}` in game text.
- Screenshot issue: background, actors and UI now share one aspect-preserving stage. Choice prompts no longer get a narrator name badge; the dialogue caret is suppressed during choices. Layer clearing and intentional actor preservation remain author controlled.
- Drag movement is committed once on release so Undo restores the complete movement.

Validation: automated DOM interaction, engine, geometry, IndexedDB, portable export and regression tests. Real browser/device visual verification was unavailable in this environment.

Official references reviewed:
- Ren'Py transforms: https://www.renpy.org/doc/html/transforms.html
- Ren'Py screens: https://www.renpy.org/doc/html/screens.html
- TyranoBuilder custom UI: https://tyranobuilder.com/tutorials/more/customize-the-user-interface
- TuesdayJS editor: https://kirilllive.github.io/tuesday-js/doc_editor.html
- ACG 愛創作 product/tutorial entry: https://acgcreator.com/zh-TW
- 橙光 custom UI documentation: https://www.66rpg.com/docs/lm/教程/功能/跳转/呼叫高级ui_&_系统ui.html
- 橙光 dialogue mode / options positioning: https://www.66rpg.com/monthly/xbjc1104


## Responsive layout correction (version retained)

- Project Tools categories use text labels without icons.
- Desktop and mobile layouts are independent profiles; existing desktop customization is retained. Unedited mobile layouts inherit brand styling while starting from portrait geometry with a two-row action bar. Phone actor placement can be adjusted separately.
- Editor preview and runtime preview expose automatic / desktop / mobile presentation. A running preview changes presentation without resetting the engine or saves. Standalone exports choose by viewport and omit editor controls.
- Portrait phone playback fills the visible viewport rather than centering a small landscape stage in white space. Desktop playback retains a fitted canvas. The compact editor preview reserves room for editing events.
- Subtitle is an independent positioned element with non-overlapping defaults.
- Font and image cleanup covers both profiles.
- Additional tests cover profile isolation, device switching, state continuity, persisted layouts, text-only categories and standalone playback. Real-device visual QA remains unavailable.


## Preview collapse and spacing audit (version retained)

- Fixed a portrait media selector overriding the collapsed preview container while the stage itself was hidden. Collapse now sets the actual viewport, toolbar and splitter to hidden; an explicit collapsed style releases height and flex space. User expansion choices persist through workspace tabs and mode switches.
- Restored a compact authoring layout: playback/step controls, event ordering and presentation selection use distinct groups, with a two-row compact toolbar and a single row when the workspace is wide enough.
- Flow actions use a compact single-row toolbar with accessible labels. Removed duplicated event-add controls and the repeated mobile footer summary. Global section collapse remains available.
- Put optional dialogue/font appearance controls in a foldable inspector section with an SVG chevron.
- Rechecked official Ren'Py GUI, TyranoBuilder UI customization, TuesdayJS editor/preview, ACG Creator and 橙光 option-layout documentation. Editor preview dimensions are distinct from the project's presentation profile.
- Regression coverage includes collapsing portrait preview through resize and tool/story tab changes, desktop Fit restoring visibility, and grouped toolbar controls. Existing 68 tests and two added regression cases pass; physical-device visual QA was unavailable.

## Compact navigation and independent presentation controls

- Replaced previous/next and move up/down text with four small SVG chevrons, retaining tooltips, accessible labels, ordering and undo behavior.
- Restyled the classic title screen as a restrained text menu; custom button artwork remains supported and the custom background preset retains editable button colors. Reduced the preview selector and close control.
- Added per-profile orientation, rotation gating, title menu style, ten quick-bar visibility controls and five title-function visibility controls under Game Designer. Desktop and mobile overrides persist separately; shared feature settings remain defaults.
- Desktop previews require landscape by default; a portrait device sees a rotation prompt before interaction. Rotating resumes the same engine and saves; blocked playback pauses timers and audio. The preview can switch to the mobile profile directly.
- All 72 automated regression tests pass. Build and syntax checks pass. Physical-device/browser visual QA remains unavailable in this environment.

## One-row authoring controls and canvas-sized game menus

- Previous/next and move up/down remain four compact chevrons on one authoring row at every viewport width. Very narrow viewports can scroll the row horizontally instead of wrapping it.
- Enabled the preview/event separator for touch devices; drag and keyboard sizing persist, Fit restores automatic size, and the phone auto height is limited to 36% of the work area. Collapse still releases the full preview region.
- Restyled editor preferences into aligned sections with compact text presets, paired color controls and readable checkbox groups, preserving existing preferences and reset behavior.
- Replaced floating game menu dialogs with a common full-canvas shell matching the selected game's aspect and device profile. Desktop uses side navigation, phone uses a compact top navigation row; content scrolls independently. Save, load, settings, history and gallery share this shell and a large close button.
- Referenced official Ren'Py GUI customization and game-menu documentation. Added touch resizing and dual-profile menu navigation regressions; all 74 automated tests, build, JavaScript syntax and diff checks pass. Browser/physical-device visual QA remains unavailable.

## Phone desktop preview and proportional canvas text fixes

- Removed rotation gating from preview and exported runtime. Legacy requireRotation values no longer prevent interaction; removed the related direction/rotation controls from Game Designer.
- Fixed a real authoring/runtime CSS collision: the editor's generic main selector imposed its three-column grid on the game menu content. Scoped authoring layout to main.app-layout and made the menu body an explicitly isolated block.
- Stage and game menus now share fitted pixel bounds calculated from viewport and selected aspect; phone desktop preview fits a landscape canvas without rotating the device. Canvas-width menu queries switch narrow previews to scrollable top navigation and two-column save slots.
- Dialogue, speaker names, choices, title elements and quick-bar text scale relative to their canvas width. The inline authoring preview and designer use the same type scale, with authored font sizes and saved reading preferences retained. Removed the mobile fixed-font/minimum-size override and text inflation; long content stays contained.
- Added a portrait-phone desktop regression with legacy rotation enabled, every game menu page, exact stage/menu bounds and six save slots. Updated font preference checks to verify proportional values. All 75 automated tests, build, syntax and diff checks pass. Browser/physical-device visual verification remains unavailable.

## Resource, homepage and desktop block editing expansion

- Inspected all nine supplied screenshots. Isolated authoring footer styles from tools; designer columns now respond to the tool body's width and constrain labels, controls and canvases. Asset filenames, chapter names and speaker labels truncate without changing stored values. Resource body can collapse and remembers its state; replaced the large demo entry with Project Examples and Homepage/Audio entries.
- Added 64 unique colors for both editor and game theme selection, retaining custom color input.
- Added folder import with path/extension classification for background, character, CG and audio; preserves source paths and music/sound/voice roles, skips unsupported files and uses existing blob storage, import errors and 1024 MiB checks.
- Added five independent editable example chapters: dialogue, choices, variables/conditions, music and player input. Existing scripts are retained; insertion supports undo.
- Homepage settings choose a background (including animated GIF), background motion/loop, title music, entrance sound and default game music. Starting gameplay switches from title music to game music; existing music and sound events continue controlling tracks, including explicit stop. Blocked autoplay exposes an audio-enable action; deleted assets unlink homepage settings as well.
- Desktop flow marquee selection supports Shift-add selection, collapsed-group selection, batch name/text/speed edits, duplication with mapped destinations, deletion with branch/cross-chapter target remapping and undo. Selection tools are hidden on mobile and reset when resizing to a phone viewport.
- Reduced untouched legacy/default desktop quick-bar height from 8% to 6%, retaining customized placement and mobile profile geometry.
- All 82 automated tests pass, including seven new import/palette/examples/audio/bulk-edit regressions. Build, syntax and diff checks pass. Physical-device/browser visual QA remains unavailable.
