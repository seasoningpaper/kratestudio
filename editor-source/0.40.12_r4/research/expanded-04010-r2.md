# KOI Maker 0.40.10 r2 — implemented scope and checks

The existing flat GUI is retained. Event-list and history/system-content scrolling are restored selectively; system typography is reduced in logical canvas units, preserving author-customized sizes. Selection, drag deletion and undo remain reversible.

## Implemented

- Stack-tail selection, whole-stack drag/detach/attach, palette drop deletion, stable branch remapping, compact scene stacks in columns, existing clipboard and undo. Animation actor targets remain strings through reorder and paste.
- Twenty sprite motion presets, including fade with upward/left/right entrances, plus artist-uploaded dialogue/name/button/hover art.
- Scene image preparation before showing the complete composed stage; reference canvas is unchanged. Native camera pan/zoom/shake, speaker targeting and two-image split view; weather layers and five filters.
- Editable phone messages, SNS likes/comments and hidden story links, voice/video call presentation, map AP/date/period progression and rest, investigation/inventory/evidence, timed choices, QTE and timing minigame. These modules execute real story events and save their results.
- Memory/click games retained; blackjack and a solvable sliding puzzle added; the existing sandbox HTML/Canvas minigame bridge returns numeric scores to variables.
- Music crossfade, simultaneous stems, optional actor-based Web Audio stereo panning and RMS output for embedded model renderers.

## Explicit limits

Live2D, Spine and 3D use an author-supplied, self-contained HTML renderer in an opaque-origin sandbox, without network access or top navigation. KOI does not directly parse moc3, skel or glb. The renderer receives pause, speaker, pointer and voice-RMS messages; actual model facial rigs, blinking and lip-sync require the supplied renderer. No proprietary SDK is bundled. Browser codecs, Web Audio availability and audio autoplay policies still depend on the device.

A simple CSS call waveform is decorative; the separately emitted RMS bridge contains actual sampled voice amplitude. Rhythm timing uses a simple one-second cycle. Stems are played concurrently with HTML audio; this is not sample-accurate DAW synchronization.

## Primary references reviewed

- Scratch 2 source: https://github.com/scratchfoundation/scratch-flash
- Scratch blocks/workspace: https://github.com/scratchfoundation/scratch-blocks
- Code.org Blockly implementation reference: https://github.com/code-dot-org/blockly (archived; not installed as a dependency)
- App Inventor backpack and stack transfer: https://ai2a.appinventor.mit.edu/reference/other/backpack.html
- Ren'Py GUI and scroll/history customization: https://www.renpy.org/doc/html/gui.html
- Live2D Web runtime and Core distribution: https://docs.live2d.com/en/cubism-sdk-manual/cubism-sdk-for-web/

Validation uses model and DOM interaction tests. Physical-device visual layout, GPU performance, native model playback and cross-browser audio synchronization have not been measured in this environment.
