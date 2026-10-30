# KOI Maker 0.40.8

The existing editor skin is retained. Requested control placement and player save/game screens are changed without a theme redesign.

## Corrections

- Imported variable references are registered in the project database with number/text/boolean types. Existing initial values are retained. Property selectors preserve unknown imported names instead of visually selecting the first default option. Invalid and incompatible references are diagnosed.
- Backward choice branches no longer reposition earlier flow nodes. Automatically positioned collapsed sections remove hidden event gaps, including when fitting after auto-arrange. Existing manual coordinates remain intact.
- Wait events no longer put their editor description in dialogue, save captions or dialogue history. A previous spoken line can remain on screen while waiting; starting directly at a wait shows no synthetic narration. Zero-second waits are allowed.
- Cross-chapter choice destinations retain identity through insertion, movement, duplication and bulk deletion. External destinations do not render misleading local wires. Connecting a choice to a local node clears its external-chapter target. Chapter deletion also disconnects incoming external options.
- Animation actor targets remain strings when edited, rather than being converted to numeric jump indices. Newly created action events have valid defaults; fade direction is editable.
- Project tools reuse one tab and preserve an unfinished script draft. Image-editor tabs remain separate; navigating from them to general tools opens the one shared tools tab. Tab drag subscriptions are cleaned up after closing.

## Requested operations

- Project CRUD: create, rename, duplicate, delete and switch from resources. Deletes require confirmation and preserve other projects' assets. Deleting the final project creates a usable replacement first.
- Removed the dedicated top project row; the project selector is beside the playback/navigation controls. Existing resource sidebar still lists projects.
- Pointer hold-and-drag reorders workspace tabs; normal horizontal drag scrolls the tab strip.
- Player saves: nine slots per page, twelve default pages, add pages up to fifty (450 numbered slots), naming, overwrite/delete confirmation and durable page count. Existing numbered save identities remain usable, with auto/quick saves retained.
- Custom HTML/JavaScript games occupy the game canvas without an editor implementation heading or surrounding authoring panel. The isolation and result-message validation remain enabled.
- Expanded preflight checks for cross-chapter destinations, background/audio/voice references, variable names/types and invalid durations.
- Published a 38-row capability matrix with fifty official/author reference sites. It separates implemented functions from future systems; it does not claim that other engines were merged into KOI.

## Verification and limits

Automated tests cover parser/runtime, persistence, save pages through slot 450, project asset isolation/CRUD, variable registration, actual property editing, waits, flow positions/connections, tab lifecycle, standalone exports and existing mobile/desktop interaction models. Real-device/browser visual QA is unavailable in this environment. The 2048 MiB project limit remains an application limit subject to actual browser quota; saves and projects are local to the player's browser. Live2D/Spine, a full 3D or RPG engine, cloud collaboration, localization pipelines and native app packaging are not implemented; see FEATURES-0.40.8.md.
