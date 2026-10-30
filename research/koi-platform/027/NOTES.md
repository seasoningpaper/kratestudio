# Krate Studio 0.2.7

Scope: one QR generator and embed route, directory entry/count, footer release labels. Existing shared CSS/JS, weather modules and retained editor unchanged. Actual source base 7d8cc20645907732aeefb58d1f10493308c2252c, Sites 94 rollback.

Browser Chrome: URL generation, rounded style, embed output, Wi-Fi at 390px and reset. Native 320px PNG downloaded to krate-qr.png and independently decoded to https://example.com/. SVG and HTML controls were clicked but this cloud Chrome retained downloads as unconfirmed; not counted as successful end-to-end file downloads. Their actual Blob contents and standalone HTML are tested separately. No physical device scanner or iPad Safari test claimed.

Chrome same-origin iframe widths: 320,390,768,1024,1920. Client/scroll equal:305/305,375/375,753/753,1009/1009,1905/1905. Actual generated SVG in all five, all download buttons enabled and within viewport. Narrow forms stack with preview. No application JS console errors observed; extension metadata errors excluded. Internal QA route is not in production build.

Independent jsQR decoder tests rasterize actual SVG using resvg. Seven payload types × four styles plus all four error correction levels. Reserved positioning/timing/alignment modules stay square. Four-module white quiet zone, dark-on-white output. Dot rendering initially failed decode, corrected by preserving all reserved modules; all now pass. UI rejects outputs with less than four pixels per module. Long content and unsafe URL schemes rejected. Standalone HTML includes SVG only and no raw payload script.

All QR processing is local. No input localStorage, external image API or analytics. Wi-Fi embed disabled; downloaded files necessarily contain Wi-Fi data. User-generated iframe explicitly encodes content in query string, disclosed on page. App uses supplied download URL, no claimed automatic OS routing or social app opening. H correction uses standard approximately30%, not reference's35%.

Reference: https://tw.piliapp.com/generator/qr-code/ contents read through search. qrcode official GitHub API and jsQR API read. Not claiming full visual or functional examination of Aogiri/Hololive/Canva or50 websites this turn. Existing approved material system reused rather than global redesign.

Build passed. Regression:101 passed0failed. Retained historical editor blob equality test passed. All previous non-directory pages differ only in footer 0.2.6→0.2.7. Homepage remains8 tools, directory16.
