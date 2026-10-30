# Stack unplug and insertion corrections, 0.40.10 r6

Reviewed 2026-10-20. Preserve existing KOI Maker GUI, theme, palette and block shapes. This is a targeted correction of KOI's shared event model, not a replacement with or a claim of full feature parity with four different programming environments.

## Primary references

- Scratch 2 editor source: https://github.com/scratchfoundation/scratch-flash
- Scratch Blocks / Scratch 3 lineage: https://github.com/scratchfoundation/scratch-blocks
- Code.org historical Blockly fork and its archival/migration notice: https://github.com/code-dot-org/blockly
- MIT App Inventor sources, documenting its modified Blockly dependency: https://github.com/mit-cml/appinventor-sources
- Blockly Block.unplug(healStack), dispose and connection behavior: https://docs.blockly.com/reference/classes/Block/
- Drag lifecycle, pixel-to-workspace conversion, drop, revert and cancellation: https://docs.blockly.com/guides/configure/dragging/dragger/

The implementations and runtimes differ. We use their shared statement-stack concepts: tail dragging, single extraction with source healing, intact nested containers, floating stacks, valid insertion connectors and transactional undo. Do not import the archived Code.org fork as a new dependency.

## Corrections

| Operation | Result |
| --- | --- |
| Default block drag | Carries following siblings in the same container; stops before the enclosing loop's closing connector. Existing named-section boundaries remain intact; whole-stack mode explicitly spans them. |
| Alt-drag / Detach this block | Extracts one statement and heals its source chain; a repeat container retains its entire body. |
| Detach entire stack | Includes all blocks in that connected component, including named sections; excludes independent stacks. |
| New palette drop on blank canvas | Creates an inactive floating stack on either side of the workspace. No arbitrary x=500 attachment rule. |
| Click Add / drop on a connector | Creates the group at a staging position, then transfers it as one transaction. Insertion into a floating component preserves downstream siblings. |
| New choice / condition | Default destinations reference the following original event, or story termination; never the newly inserted statement itself. |
| Extract floating root | Surviving source stays anchored; missing coordinates during reconnection do not reset to x=600/y=80. |
| Start hat | Hat, first statement and snap dock share model coordinates; logical overlap is the connector's four pixels, not the label/body. |
| New repeat / choice preview | Uses the same actual expanded/compact heights as layout, including all three repeat statements. |

Numeric local and cross-chapter destinations remain tied to event identity during transfers. Existing Ctrl+Z/Y and persistence cover the complete creation/transfer transaction. No schema or asset migration is required.

## Verification boundary

Pure model tests exercise execution, nested containers, roots, destinations, preview geometry and 400 deterministic split/join operations. JSDOM integration tests exercise mouse/touch event paths, explicit context operations, insertion in floating groups, defaults, undo and storage. Existing regression suite remains required. Actual browser hit testing, mobile long-press and FPS cannot be claimed verified without the browser QA capability.
