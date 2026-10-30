# Krate Studio 0.2.5

Scope: weather page only, version labels, and the necessary IP/theme privacy disclosure. No Koi Maker/editor/runtime, shared navigation, story cards, tools or project data changes.

## Behaviour
- Weather refresh every 300 seconds while visible; return/online checks the last successful refresh. Existing location survives refresh, requests coalesce, failures retain prior readings and show an error.
- Default visitor IP estimate calls https://ipapi.co/json/ directly with omitted credentials/no referrer. No server IP guess. Only valid Taiwanese coordinates resolving in local boundaries are accepted. Overseas, unavailable, quota, bad data and timeout fall back honestly to New Taipei. Manual/GPS choices invalidate late IP responses.
- GPS requires the explicit locate button and browser permission. Fresh high-accuracy acquisition plus a bounded watch accepts only better samples, stops at 20 seconds or <=20m reported accuracy, and stops on manual selection/unload. Accuracy is device-reported; improvement is not guaranteed.
- Local geographic polygon lookup supplies county/town separately from the nearest observation station; both heading and city selector update. No coordinate leaves the browser or persists. Forecast county follows administrative location, not a possibly cross-boundary station.
- Light, dark, system modes affect weather only; the preference key is krate-weather-theme. System changes and saved preference are supported.
- Desktop reading column and continuous all-county forecast side list; compact weather overview. Sidebar collapses below desktop. Metrics are continuous definitions, with no floating/bento tiles. Existing quiet glass/inset material and original weather icons retained.

## Evidence
- 50 automated tests passed, including IP success/overseas/invalid/race, local campus Taoyuan/Gueishan and island lookup, best GPS sample, city/dropdown synchronization, refresh/visibility/offline/coalescing, theme persistence/system changes and all-county selection. See tests.txt.
- Actual Chrome IP lookup selected Taipei and was explicitly labelled approximate. Real county-list click changed heading, selector and selected county to Taoyuan. Real dark selector + reload preserved dark; system mode matched system light.
- 14 Chrome iframe checks: light/dark x 320/390/768/1024/1180/1366/1920 outer widths. All document scroll widths equalled client widths; toolbar controls were 48px high. Desktop sidebar open at >=1180; closed below. Client widths were 15px smaller due to scrollbars. No overlap observed in standalone desktop light/dark views.
- Browser GPS permission was denied. Denial message/manual operation verified; actual physical GPS precision and iPad Safari are not claimed. Successful multi-sample GPS is tested using deterministic fixtures.
- Only observed console errors belonged to the browser extension's metadata transport; no application JavaScript errors were observed.

## Sources
Read: https://ipapi.co/api/ documents caller-IP lookup and client integration. https://data.gov.tw/dataset/7441 identifies Ministry of Interior township boundary data and government open-data licence. Its direct TGOS ZIP download returned 403 to retrieval.
Used: https://github.com/dkaoster/taiwan-atlas publishes the Ministry-derived, simplified topology under MIT; https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json was successfully downloaded and locally converted without further simplification. 368 township records, local file 1,880,577 bytes. Source/attribution and MIT notice ship at /geo/. Quantized/simplified boundaries are estimates, not survey-grade address verification.
Visual reference: only the two user screenshots supplied this turn, for desktop information placement. Their GUI is not copied. Prior brand material direction retained; no new claim of historical website interaction research.

Restore point: Sites 90, cca8ffd1c2d1695fa000c273dee56dffb7fe773f (0.2.4).
