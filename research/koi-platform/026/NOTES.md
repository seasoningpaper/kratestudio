# Krate Studio 0.2.6

Restore point: Sites 92, commit 4df6e406da1c97d719e4a4bc39e053b31464e47a (0.2.5).

## Scope
Only weather behaviour/presentation, required privacy documentation and displayed version labels. Other 31 public pages version only. Editor, story art/scrolling, home dots, tools and project storage remain unchanged.

## Changes
- Restored weather-only paired metric surfaces with quiet glass/inset material, 8px corners, no border strokes. Phone last odd tile spans the full two-column row. Desktop retains three columns and original reading/side-column structure.
- IP message is exactly 根據您的網路IP估算 in a successful complete-data case. Only abnormal update/age states add notices.
- Moved all source/location/update/method detail into /privacy/#weather-data. Weather bottom has the dynamic county forecast issue line and 資料與隱私政策 link only.
- Official CWA W-C0033-002 warnings on right, real issue/start/end, affected areas, expandable safe-text full content, source link. Cancelled/expired/future events not shown as active. Failure differs from no active warnings. Dedicated /api/weather/warnings refreshes every visible minute with <=60s server memo, request coalescing and official direct-browser fallback. Main weather remains 5 minutes. Returning/online checks both; duplicate warning work is skipped during a weather reload.
- Missing observation fields use the two existing CWA hourly/10-minute station feeds. Kept incomplete-temperature observations separately so useful pressure/visibility/UV readings are not discarded. Individual fields select primary/same-station or nearest valid observation within 35 km and 90 minutes, with source name/time in each tile. Zero UV/rain are valid; pressure zero, stale/future/far/sentinel readings are not. Station pressure is not sea-level pressure; source differences are documented in privacy. Unsupported data is a quiet dash with a state, never a fabricated value.
- CWA does not publish far-horizon precipitation probability for every weekly period; absent probabilities are omitted, not substituted from another model. This is documented in privacy.

## Evidence
- 61 automatic regression tests: see tests.txt. Includes warning parsing/cancellation/expiry/unsafe-text/failure/independent minute timer and official loader, partial-field preservation, station/time/distance/zero constraints, metric DOM and footer policy checks, plus all prior tool/editor regressions.
- Chrome 14 combinations: light/dark x outer widths 320/390/768/1024/1180/1366/1920. All document scroll widths equal client widths; every metric tile had zero content overflow and 0px border. At 320: client 305, metric grid 273, two 130.5 columns, last tile 273, equal 16px margins. At 390: client 375, grid 331, two 158.5 columns, last tile 331, equal 22px margins. Larger two-column layouts also span the odd tile; desktop three columns have balanced nine tiles.
- Real CWA browser data for Taoyuan: pressure 1006.8 hPa (中德 10/29 00:00), visibility >30 km (國二E009K 10/29 00:30), UV 0 (臺北 10/29 00:30), with per-field source shown. These are observations from different timestamps/sites, not inferred local measurements.
- Actual official 陸上強風特報 loaded: issued 10/28 22:22, valid until 10/29 05:00, full content/areas. Live observations will differ later.
- Actual IP success message matched short requested text. Desktop sections visually inspected. iframe screenshot capture times out in this browser; geometric checks and frame interactions succeeded. No physical iPad/Safari testing is claimed.

## Primary source verification
Read https://opendata.cwa.gov.tw/opendatadoc/Warning/W-C0033-001_002.pdf for official issue/start/end/content/affected-region fields and update semantics. Read https://registry.opendata.aws/cwa_opendata/ for official CWA public source ownership/licence.
Downloaded official https://cwaopendata.s3.ap-northeast-1.amazonaws.com/Warning/W-C0033-002.json and Observation/O-A0003-001.json to inspect actual fields. Warning fixture preserves the official example under the open-data licence. No new commercial provider, API key, coordinate disclosure or unverified model estimates were introduced.
Visual references are the three user screenshots for this task and the existing Krate material system. No copied reference GUI and no claim of new 50-site historical research.
