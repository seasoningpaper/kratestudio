# Krate Studio 0.2.1

## Scope

Continue c625415342e979293a6b6e2f876637c49d1daf52, live Sites 83. Personal website first, Koi Maker one of its projects. Keep all 12 supplied PNGs and approved copy. No account, cloud, database or editor changes. Default system fonts remain.

## Reference access, 2026-10-28 Taiwan

| Reference | Text read | Visual inspected | Interaction checked | Limits |
|---|---|---|---|---|
| https://tw.piliapp.com/ | Yes | Yes | Category attempted | Interstitial advertisement appeared; no claim of full tool coverage |
| https://v2.tailwindcss.com/ | Yes | Yes | Public landing only | Version 2 is a concrete historical framework reference; not installed into retained editor |
| https://vhs-city.com/aogirihighschool/ | Yes | Yes | Intro transition observed | Current public landing; no historical capture or member account testing |
| https://hololive.hololivepro.com/ | Yes | Yes | Moving main visual observed | Current public landing only |
| https://www.canva.com/website-builder/ | Yes | Yes | Public presentation only | No login or editor session, no claim of full Canva usage |

These were inspected as references, not copied assets. The present-day entertainment sites are not evidence of their 2019–2022 layouts. The requested 2019-01-01 to 2022-06-30 interval informs the glass and soft-surface direction, and does not constitute a claim that model training data can be date-filtered. Fifty distinct unrelated visual languages would conflict with a coherent personal site; the following are fifty concrete implemented design details within the requested direction, not fifty falsely claimed historical studies.

## Fifty implemented design details

| # | Detail | Source / visible application |
|---|---|---|
| 1 | Soft blue base | site.css hero and header |
| 2 | Lavender secondary color | tools.css objects, underline and surfaces |
| 3 | Off-white page canvas | site.css body |
| 4 | Dark neutral large headings | --heading |
| 5 | System font throughout | body and inherited title font |
| 6 | Responsive headline scale | .hero-title |
| 7 | Aligned rectangular marker highlight | .marker |
| 8 | Continuous text navigation | .nav |
| 9 | Underline selected navigation | aria-current |
| 10 | Content-first full-width hero | .hero-carousel |
| 11 | Whole-slide animated entrance | hero-arrive |
| 12 | Automatic three-topic rotation | site.js 6500ms timer |
| 13 | Manual previous and next arrows | .hero-prev/.hero-next |
| 14 | Text-based slide selector | .hero-choices |
| 15 | Fixed mobile hero height | .hero-slide copy and visual |
| 16 | Decorative objects float independently | object-bob |
| 17 | Glass panel translucency | .glass-window |
| 18 | Local glass blur | backdrop-filter |
| 19 | Layered glass color | .glass-window gradient |
| 20 | Slight glass perspective | rotateY |
| 21 | Diffuse short shadow | .glass-window shadow |
| 22 | Glass inset edge illumination | inset shadow, no border |
| 23 | Soft molded icon bodies | .soft-object |
| 24 | Directional icon light | linear-gradient |
| 25 | Recessed input surfaces | --soft-down |
| 26 | Raised primary controls | .action |
| 27 | Pressed secondary controls | .tool-secondary:active |
| 28 | Colored category icon surfaces | .symbol-1/2/3 |
| 29 | Original code-native icon artwork | inline SVG, no brand borrowing |
| 30 | Local cursor reflection | .reflective, pointer requestAnimationFrame |
| 31 | Spacious editorial section headings | .section-head |
| 32 | Searchable continuous tool directory | .tool-directory/.tool-row |
| 33 | Underline category filters | .tool-filters |
| 34 | Row hover shift | .tool-row:hover |
| 35 | Small icon hover tilt | .tool-symbol |
| 36 | Directional CTA arrow motion | .home-tool-links |
| 37 | SVG cross with clear touch target | .story-close, 44x44 |
| 38 | Borderless dialog body | .story-dialog |
| 39 | Dimmed backdrop | dialog::backdrop |
| 40 | Native Escape and focus return | dialog + site.js |
| 41 | Continuous story strip | showcase-stream, 126s vs old 156s |
| 42 | Story hover stop | marquee:hover |
| 43 | Keyboard strip traversal | data-keyboard mode |
| 44 | Equal-size story surfaces | .showcase-item flex layout |
| 45 | Mobile hamburger to cross animation | .menu span |
| 46 | Reflowing forms | .tool-fields media rules |
| 47 | One visible keyboard focus | focus-visible outline, no stacked ring |
| 48 | Tabular timer numerals | .timer-face |
| 49 | Semantic sorting colors and smooth bars | .sort-bar |
| 50 | Reduced motion and hidden-tab behavior | prefers-reduced-motion, visibilitychange |

No pill navigation, bento dashboard, background glow spheres, heavy glowing buttons, constant blue borders or duplicated icon bases were introduced. Small molded objects are artwork, not a wrapper around every control.

## Tools

Eight real standalone tools under /tools/. Directory search/category and meaningful empty state. All forms use explicit labels. Tool calculations and passwords remain local; no persistence or project-storage writes. Password RNG uses crypto.getRandomValues with rejection sampling, includes selected sets, supports ambiguous-character exclusion. Draw without replacement is by submitted row; duplicate names remain separate submitted entries.

Weather: public city coordinates queried only on submit, no geolocation permission. Open-Meteo current conditions are model estimates, explicitly labelled. Attribution and timestamp visible. Reference https://open-meteo.com/en/docs and https://open-meteo.com/en/pricing (free personal/noncommercial endpoint). Rate: https://frankfurter.dev/ v2 pair endpoint; daily date and non-transactional reference-rate note. No fake cached/live data. A 12-second timeout, error text and retry are provided. Live browser retrieval succeeded for Taipei and TWD/USD.

## Evidence

- Automated: portal foundation 16/16, added tools suite 11/11. See tests.txt.
- Existing editor: every retained historical runtime file compared to actual git blobs by existing test; unchanged.
- Desktop Chrome browser: all eight tools manually operated. Weather returned Taipei 24.4°C, data time 2026-10-28 10:15 Taiwan. Currency 100 TWD = 3.0759 USD, reference date 2026-10-27. Those are transient test observations, never shipped as constants.
- Date 2024-02-28 to 2024-03-01 = 2 days. BMI 170cm/60kg = 20.76.
- Draw three names/two winners, timer start/pause/resume/reset, password generation and clipboard success, sort [5,2,5,1] completed as [1,2,5,5].
- Real Chrome same-origin iframe layouts (not Safari/device emulation): 320/390/768/1024 outer widths, effective widths 305/375/753/1009 due scrollbars. No document horizontal overflow. Also tool index, sorting, exchange, timer and date forms at effective 375.
- 320 hero across all three slides: exactly 725px height, no carousel layout jump. Mobile pagination forced to one line after observed wrap.
- 390 hamburger opens/closes. Image preview contains one SVG cross, no visible close text, 44x44 target, correct coffee image/copy.
- Current limitations: no physical iOS Safari test, no broad cross-browser certification. Weather/FX depend on external availability. Timer depends on device clock and does not survive reload. Public /qa/ exists only in internal QA builds and must be absent from production.

## Release

Build without --qa, restore package.json dev command, rerun suites. Keep original site/audience. Version 0.2.1. Save/publish exact pushed commit. Prior restore point: Sites83, c625415342e979293a6b6e2f876637c49d1daf52.
