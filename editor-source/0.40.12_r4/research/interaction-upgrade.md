# KOI Maker 0.40.8 — interaction update, 2026-10-18

Focused implementation; existing editor styling and authored game content are retained. These are design references, not bundled engines or compatibility claims.

| Official reference | Relevant direction | Implemented here |
| --- | --- | --- |
| [Ren’Py GUI](https://www.renpy.org/doc/html/gui.html), [special screens](https://www.renpy.org/doc/html/screen_special.html) | Theme confirmation screens; separate main/game navigation | Asynchronous themed dialogs; hide history/save entry on title |
| [Naninovel GUI](https://naninovel.com/guide/gui) | Customizable built-in game UI resources | Six toolbar arrangements; existing per-button images, hover images and visibility retained |
| [Tuesday JS](https://kirilllive.github.io/tuesday-js/) | Visual story structure and responsive scene positioning | Category-colored nodes; align/distribute/snap editing |
| [Twine](https://twinery.org/) | Nonlinear story connections | Explicit chapter continuation; cycle/dangling checks |
| [TyranoBuilder](https://tyranobuilder.com/tutorials/getting-started) | Visual-first authoring | Categorized event picker |
| [WebGAL docs](https://docs.openwebgal.com/) | Scene/branch, audio, animation and UI commands | Existing KOI script import retained, not claimed to implement all WebGAL commands |
| [RPG Maker MZ](https://www.rpgmakerweb.com/products/rpg-maker-mz), [MV](https://www.rpgmakerweb.com/products/rpg-maker-mv) | Event authoring and play testing | Category selection remains linked to real engine events |
| [Visual Novel Maker](https://www.visualnovelmaker.com/) | Click/drag/type and live preview | Editable toolbar layouts and element geometry |
| [NVLMaker](https://www.nvlmaker.net/manual/top.html), [Kirikiri Z](https://krkrz.github.io/) | Visual authoring over an extensible runtime | Preserve current runtime and data model, no engine swap |
| [橙光 official tutorial](https://www.66rpg.com/t_114/S6OKWDGr432.shtml) | Production menus and reusable UI templates | Project-menu placement and toolbar presets |
| [ACG Creator](https://acgcreator.com/zh-TW) | Online authoring and templates | Screenshot-informed categorized event choice and UI editing; detailed current editor access not verified |
| [oice](https://oice.com/) | Official landing retrieved, no text content available | No detailed feature claims |
| [Suika2](https://suika2.com/) | Official site currently only says “See you soon!” | No claims about current editor features |
| KOI Maker | Existing project and runtime source | Native project data/exports remain compatible |

Verification: model tests, jsdom interaction tests, source/build checks. No real-device browser visual QA available in this environment.
