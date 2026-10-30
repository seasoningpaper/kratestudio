# H2 歷史設計研究（復原與有界複核）

不是150件完成：128件候選；5技術審讀、20僅日期／作者、103待核；逐圖量測0。上輪12次查詢結果由研究代理的保留紀錄恢復，本輪另做2次有界查詢／開啟（6個URL），未增加作品計數。同作品不同文件不重複計數。

本輪複核：Bootstrap 4.1 官方發布2018/04/09及4.1 navs；Themesberg 官方版本1.0於2020/05，產品頁列2020/05/12，buttons狀態與disabled語意；Creative Tim原作者文章明示2021/06/22，SASS變數與局部表面。現今GitHub main可能為2024更新，不以其當2019原始實作。

採用連續flex/grid導航、原生語意標籤與狀態、輸入內凹與主操作微凸。排除卡片牆、長膠囊、宣傳3D、強玻璃。沒有複製第三方CSS或素材。

本輪複核URL：
- https://blog.getbootstrap.com/2018/04/09/bootstrap-4-1/
- https://getbootstrap.com/docs/4.1/components/navs/
- https://themesberg.com/docs/neumorphism-ui/getting-started/changelog/
- https://themesberg.com/product/ui-kit/neumorphism-ui-kit-bootstrap
- https://themesberg.com/docs/neumorphism-ui/components/buttons/
- https://blogct.creative-tim.com/blog/web-design/complex-innovative-admin/

## 25件優先清單

只有 technical-reviewed 為已讀技術依據，其餘為日期核實或後續候選，不能宣稱25件全面視覺驗收。

|編號|作品|日期|狀態|借鑑／排除|來源|
|---|---|---|---|---|---|
|U001|lifecell visual system. UI/UX in brand identity.|2019-04-22|date-only|只借局部色彩過渡與層級；不借廣告球體、3D人物或宣傳構圖|https://www.behance.net/gallery/78969711/lifecell-visual-system-UIUX-in-brand-identity|
|U005|Cream UI Kit|2019-05-15|date-only|集中調整系統而非逐頁覆蓋；不移植手機畫面或購物模板|https://www.behance.net/gallery/79568451/Cream-UI-Kit|
|U014|Minimal UI KIT|2019-08-12|date-only|候選：資訊層級與間距需另檢視；不按標題推定色碼/陰影|https://www.behance.net/gallery/84086771/Minimal-UI-KIT|
|U015|Formidable - Ui Kit|2019-01-14|date-only|表單對齊與一致間距；不搬整套卡片外觀|https://www.behance.net/gallery/74743029/Formidable-Ui-Kit|
|U016|Neomorphic Darkness - Free UI Kit|2020-01-07|date-only|候選：明暗表面與控制項辨識；避免暗背景低對比與發光邊界|https://www.behance.net/gallery/90329723/Neomorphic-Darkness-Free-UI-Kit|
|U017|Neumorphic UI kit (free download)|2020-01-15|date-only|把材質用在實際控制項上；不把所有文字變成立體按鈕|https://www.behance.net/gallery/90616369/Neumorphic-UI-kit-%28free-download%29|
|U020|Neumorphic UI Kit|2020-02-17|date-only|共享元件與有限材質層級；不搬dashboard或巨型圓角|https://www.behance.net/gallery/92372473/Neumorphic-UI-Kit|
|U025|Neumorphism FREE UI KIT|2020-03-09|date-only|微凸/微凹材質作為候選；不把手機屏幕組合當桌面工作區|https://www.behance.net/gallery/93357363/Neumorphism-FREE-UI-KIT|
|U066|Neumorphism + Glassmorphism UI Kit|2021-03-09|date-only|只取局部有功能的半透明面；不採全螢幕玻璃與強烈模糊|https://www.behance.net/gallery/115066587/Neumorphism-Glassmorphism-UI-Kit|
|U067|Neumorphism Soft UI|2021-10-29|date-only|候選：表面材質；未做逐圖量測；不照抄手機布局|https://www.behance.net/gallery/130284493/Neumorphism-Soft-UI|
|U073|SPACE : NEUMORPHISM UI KIT|2021-06-16|date-only|候選：元件狀態需另行逐圖檢查；不按標題虛構實作|https://www.behance.net/gallery/121623687/SPACE-NEUMORPHISM-UI-KIT|
|U075|Neumorphism - UI Elements|2021-04-23|date-only|少量互動元件的材質研究；不採裝飾圖示底座|https://www.behance.net/gallery/118122413/Neumorphism-UI-Elements|
|U077|Smart home control UI Kit|2021-06-16|date-only|操作狀態與控制項聚合；不能誤標成純Neumorphism|https://www.behance.net/gallery/121620091/Smart-home-control-UI-Kit-UI-Kit|
|U078|Soft UI Design System Pro|2021-05-17|date-only|統一Token、元件責任與主次按鈕；不移植行銷hero、登入頁或卡片牆|https://www.behance.net/gallery/119631295/Soft-UI-Design-System-Pro|
|U091|Shazam Neumorphism Mobile App Design|2022-01-20|date-only|候選：音訊控制材質；不借手機播放頁布局|https://www.behance.net/gallery/135552779/Shazam-Neumorphism-Mobile-App-Design|
|U097|STORAGE Glassmorphism UI Kit Design|2022-06-13|date-only|候選：素材資訊層級；不借全畫面玻璃材質|https://www.behance.net/gallery/145926467/UI-kit-STORAGE-Glassmorphism-UI-Kit-Design|
|U098|User interface claymorphism button|2022-09-23|date-only|局部按壓狀態研究；不借過大的橡皮/塑膠外觀|https://www.behance.net/gallery/153373903/User-interface-claymorphism-button|
|U113|Claymorphism Pomodoro Clock Application|2022-03-11|date-only|主要操作單一入口、相關欄位鄰近、狀態明確；不把計時器三卡片布局套在Koi|https://www.behance.net/gallery/139235061/Claymorphism-Pomodoro-Clock-Application|
|U114|Soft UI (Neumorphic) Design|2022-01-02|date-only|候選：凹凸控制項需另外核圖；不推定為可運作的網頁元件|https://www.behance.net/gallery/134221325/Soft-UI-%28Neumorphic%29-Design|
|T001|Bootstrap 4.1|2018-04-09|technical-reviewed|借主導航語意、8px節奏、標籤和輸入欄位對齊；不安裝框架；不採nav-pills或將普通nav變成action button|https://blog.getbootstrap.com/2018/04/09/bootstrap-4-1/|
|T002|Material UI v1|2018-05-18|technical-reviewed|借可定製性和元件封裝原則，沿用Koi React；不引入第二套框架或全套Material外觀|https://mui.com/blog/material-ui-v1-is-out/|
|T003|Windows UI Library Preview / Fluent controls|2018-07-23|technical-reviewed|借樹狀資料階層、CommandBar與獨立操作角色；不採Reveal發光、厚Acrylic，亦不將2026版本當2018樣式|https://blogs.windows.com/windowsdeveloper/2018/07/23/windows-ui-library-preview-released/|
|T004|Adobe Spectrum design system|2018-05-15|technical-reviewed|Token集中管理；根據用途選元件而不是每個標題都畫框；不將後來Spectrum2外觀當歷史來源|https://blog.adobe.com/en/publish/2018/05/15/introducing-spectrum-adobe-building-design-system-scale|
|T005|Ant Design 3.8.0|2018-08-05|date-only|借數值對齊和選取語意，保留Koi現有選取資料；不套管理儀表板或重複timeline dots|https://3x.ant.design/changelog|
|T006|Themesberg Neumorphism UI 1.0|2020-05|technical-reviewed|凸面用於少量操作、凹面用於輸入；狀態須可辨識；不採pill buttons、icon boxes、card wall；文件示例不是Koi佈局|https://themesberg.com/docs/neumorphism-ui/getting-started/changelog/|

全部128件詳細欄位（作者、元件、程式來源、日期證據與限制）見 H2-RESEARCH.json／csv。研究數量及逐圖複核不足保留後續，不虛構補足。