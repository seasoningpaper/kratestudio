# H2 歷史研究復原紀錄

日期：2026-10-24（台灣）。本工作包只復原研究資料，沒有修改主專案或部署，也沒有新增網路查詢。

## 復原來源

1. 暫存 `r2-audit/` 已不存在，屬工作環境清理造成，不能據此推定使用者刪除。
2. 原始研究 Excel 的兩份上傳副本仍存在，內容相同：SHA-256 `b9a8222402d7561d51e5ca14eb4291496503792055bcbafa21a754667cee3030`。
3. 本代理保留前輪網路工具的實際回傳與生成腳本內容。已恢復前輪每項核實分類、具體原始作品 URL、日期、作者及可取用的技術要點。
4. `evidenceRefs` 是前輪工具參照，不是本輪重新查證。若後續要對外引用，優先使用明列的原始 URL，並在必要時重新開啟；不得虛稱本輪已訪問來源。

## 真實件數

| 分類 | 件數 | 意義 |
|---|---:|---|
| 原上傳候選 | 120 | 完整恢復原表作品名稱、作者、日期、URL；不是全部重新核實 |
| 新增官方系統候選 | 8 | 每個產品只算一次，不用不同版本或不同元件湊數 |
| 合計候選 | 128 | 按原始 URL 去重後 128，不是 150 件完成 |
| technical-reviewed | 5 | 前輪確實讀到技術文檔，能提供元件與工程依據 |
| date-only | 20 | 前輪只核實日期／作者及文字介紹，不能等同視覺全核實 |
| unverified | 103 | 本輪及前輪均未完成重新核實 |
| 逐圖量測完成 | 0 | 不宣稱取得逐件色碼、陰影尺寸、圓角及對比量測 |

距 150 件**候選收錄數**尚差 22 件；距 150 件**完整核實數**則遠不止 22 件。兩者不可混淆。

前輪限定 12 次網路工具呼叫，已達上限並停止。此次復原新增查詢 0 次。

## 可直接核對的歷史技術來源

### Bootstrap 4.1（2018-04-09）

- 發布：https://blog.getbootstrap.com/2018/04/09/bootstrap-4-1/
- 導航：https://getbootstrap.com/docs/4.1/components/navs/
- 表單：https://getbootstrap.com/docs/4.1/components/forms/
- 原始碼：https://github.com/twbs/bootstrap/tree/v4.1.0
- 取用：連續導航的 Active／Disabled、Flexbox、表單 Grid、標籤對齊、自訂 file browser。導航與 pills 是不同變體，Koi 應選連續導航，不應把每個分頁當浮起的按鈕。

### Material UI v1（2018-05-18）

- 官方發布：https://mui.com/blog/material-ui-v1-is-out/
- 原始碼：https://github.com/mui/material-ui/tree/v1.0.0
- 取用：可定製 React 元件、責任邊界與主題接口；不是要求安裝 Material UI 或將 Koi 改成 Material 外觀。

### Windows UI Library Preview（2018-07-23）

- 官方發布：https://blogs.windows.com/windowsdeveloper/2018/07/23/windows-ui-library-preview-released/
- 取用：TreeView、MenuBar、CommandBarFlyout 的資訊組織與狀態角色。
- 不採用：Reveal 發光、厚 Acrylic，也不能拿後來 WinUI 3／Fluent 2 當成 2018 年原始樣式。

### Adobe Spectrum（2018-05-15）

- 官方文章：https://blog.adobe.com/en/publish/2018/05/15/introducing-spectrum-adobe-building-design-system-scale
- 取用：共用設計常數、元件變體、五種狀態，避免跨頁重複實作和碎片化。
- 不能拿後來 Spectrum 2 的圖像冒充 2018 年視覺。

### Themesberg Neumorphism UI 1.0（官方只標 2020-05-xx）

- 日期：https://themesberg.com/docs/neumorphism-ui/getting-started/changelog/
- 按鈕：https://themesberg.com/docs/neumorphism-ui/components/buttons/
- 表單：https://themesberg.com/docs/neumorphism-ui/components/forms/
- 原始碼：https://github.com/themesberg/neumorphism-ui-bootstrap
- 取用：按用途分配微凸、微凹和普通導航；共享變數／mixins 結構。
- 限制：前輪 SCSS Raw／Blob 讀取失敗，未取得可核實的歷史精確 SCSS；不能寫成已讀完整原始碼。官方沒有給精確發表日，不得自行填入日期。

## Creative Tim 年代邊界

- 上傳候選 U078 的 Pro 作品展示：2021-05-17，原始 Behance 作者為 Creative Tim。
- 官方原始碼變更紀錄：https://github.com/creativetimofficial/soft-ui-design-system/blob/main/CHANGELOG.md
- 前輪實際讀到：v1.0.0 原始發布 `2021-03-04`；v1.0.9 `2022-07-15`；v1.1.0 `2024-10-28`。
- Pro 展示、免費版發布與後續版本不另算多件作品。現今 Demo 或 main 分支視覺不能無條件當成 2021 年原始狀態。

## 研究限制與設計落地

- 多個 Behance 原始頁直讀 403。前輪沒有繞過限制；改用搜尋服務所返回的原始作品索引文字查日期／作者，保留 `date-only`。
- 已恢復 25 件 priority 名單；名單包含視覺待核項目，因此不是 25 件全部完成研究。
- 導航、標題、TextAction 不應凸起；微凸限制於重要操作，微凹用於可輸入表面。
- 不將手機概念頁、行銷 Hero、卡片牆、裝飾圖示底座、重玻璃直接搬到桌面創作工作區。
- 優先沿用現有 React，以一套 Token／元件策略建立連續三欄工作台；避免新增第二套 Vue 或整包 UI Kit。

## 檔案

- `H2-RESEARCH.json`：128 列完整候選、核實分類、25 件 priority 名單及復原來源。
- `H2-RESEARCH.csv`：同一份資料的可讀試算表匯入格式，UTF-8 BOM。
- `recover.py`：可重現復原程式，只讀上傳原表並寫到本資料夾；不修改上傳檔案。

驗證：JSON 可解析、128 個唯一來源 URL、狀態計數 5／20／103，原表作品 120 列。未修改主專案、未發布。
