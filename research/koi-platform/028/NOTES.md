# Krate Studio 0.2.8 宇通聲音模擬器

Base: exact remote source 9ef8081d055fe61cac8c3818c9b4a0e8d1f741f4, production Sites95. Only new simulator route/assets, tool directory addition/count, all footer release labels. No changes to shared portal site.css/site.js, weather, QR logic, or retained 0.40.12_r4 editor. All34 previous non-directory routes were programmatically compared: footer version only. Homepage8 tools unchanged; full toolbox17.

User-specified vehicle configuration modeled as synthesis parameters, not independently verified vehicle measurements or recordings. No brand logo/art copied. Original small SVG coach, light blue/lavender translucent surface, continuous three-value instrument row, small radius controls, inset fields, no boxed metric card grid, no glow/borders/pill navigation. Site design remains established. Tailwindv2 and W3C Web Audio references read; not claiming50site full operation or an ability to select model training-data dates.

Audio: sine + quiet triangle/saw atRPM/20, sine bodyRPM/10 through150Hz lowpassQ3, procedural white noise through1200Hz bandpass withRPM/20 AM; retarder450–750Hz only during moving braking; soft clipping + compressor + smoothed gain/frequency. Default30% master. Bad condition increases body/clatter gain. AudioWorklet preferred on secure supported contexts; ScriptProcessor fallback when unavailable. PreviewHTTP cannot expose AudioWorklet, so both code path tests and actual fallback rendering used; productionHTTPS worklet must be smoke-tested after deployment.

Chrome actual30second run reached800RPM,0.0km/h,D1,40Hz, completed idle. Pause/resume, manual switch/start,2400RPM,100%gas,0%gas/100%brake,poor condition tested in actual page. No autoplay before gesture. No microphone/recording/device location. Background visibility pauses; explicit resume. Pedal release/cancel/blur clears momentary inputs. Mode switch and stop close audio; replay reuses engine rather than piling oscillators. Manual1–6gears, automatic prescribed1–4. Ending automaticcycle retainsidle untilstop orreplay; optionalloop.

Browser OfflineAudioContext actual graph render(48kHz,2seconds each):
- idle800RPM: strongest40Hz, RMS0.0637154, peak0.112567.
- accelerate1600RPM: strongest80Hz, RMS0.0658479, peak0.122747.
- goodRMS0.0622607; poorRMS0.0679136, amplitude increases.
- retarder at750Hz magnitude0.00377298 vs idle0.00000447937.
- muteRMS0,peak0. All finite, peaks<1. PASS.
These are numerical synthesis checks, not a claim of subjective real-bus timbre matching or human listening review. No physicaliPadSafari testing.

RWD Chrome same-origin iframe widths320,390,768,1024,1920. Client/scroll305/305,375/375,753/753,1009/1009,1905/1905. Console margins24/24,24/24,36/36,36/36,428.5/428.5. All buttons/selects/sliders contained; manual switch works atall5widths. Mobile has one-column controls and3instruments; desktoptwo-columncontrolform. OriginalsharedRWD unchanged.

110 automated tests passed; includes9simulator tests, existingQR/animation/tools/weatherwarnings/editorblob preservation. Additional finalbuild excludes /qa/ and /qa/audio/ routes. PriorSites95 remains rollback.
