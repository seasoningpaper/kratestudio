# KOI Maker 0.40.10 接續工作進度

## 本輪結果

**P0-C 視覺補驗仍受環境阻礙，尚未通過。因此依使用者本輪要求，沒有開始 P0-D、P1-A、P1-B、P1-C，也沒有發布。沒有重做 P0-A／P0-B／P0-C 修復或重跑上一輪已通過的 88 項測試。**

起點：Site 保存版本 47，來源提交 `532b93bc73b9cb54c3eb7c19adaaa0e0a22c0811`。原網址仍為 https://koimaker.briny-angel-8862.chatgpt.site 。

修改前檢查點：`checkpoint-04010-before-visual-followup-20261020`，指向上述提交。

## 能力及資源確認

- 可用工具與技能清單中沒有 Sites 要求的 `control-browser`；技能列舉也回報 browser capability root 不存在。
- 額外搜尋瀏覽器外掛，未取得可直接使用的受支援驗收工具。搜尋結果包含其他服務，不等於已連接的驗收能力，未擅自安裝或使用。
- 沒有取得即時 Work／Codex 額度；使用者提供的 31% 只作為資源限制背景，不推測現在還剩多少，也不將執行時間換算成剩餘百分比。
- 本輪生成命令 timeout 為 15 秒；未安裝依賴、未啟動瀏覽器或預覽伺服器，未重複編譯／完整測試，沒有自動修復重試。

Sites 技能要求：`If $control-browser is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.`

來源：[Sites SKILL.md](skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md)。故未使用其他瀏覽器控制方式繞過限制。DOM 結構、語法驗證與靜態圖形都不能宣稱為真實瀏覽器截圖驗收。

使用者本輪要求：「只有在上述工作已完成、通過驗收，而且執行資源確實足夠時，才可以開始下一個工作包。」因此本輪停在第一個未通過的工作包；已授權的後續範圍保留，不需重新重做已完成修復。

## 新交付

| 檔案 | 內容 |
|---|---|
| `qa/p0-c-visual-review.html` | 可下載後在瀏覽器開啟的自含比對樣本，包含修改前 0cb21b6 與修正版 532b93b 的實際 CSS／React bundle；7 種案例，電腦與手機兩種尺寸。 |
| `qa/p0-c-visual-review-manifest.json` | 固定提交、案例、尺寸、SHA-256、語法檢查與未執行瀏覽器的狀態。 |
| `qa/P0-C-VISUAL-CHECKLIST.md` | 第一批最多 6 組的人工／受支援瀏覽器補驗清單及通過條件。 |
| `scripts/prepare-block-visual-review.mjs` | 以固定 git 提交重建樣本的生成程式；不啟動瀏覽器、不寫入產品資料。 |

自含樣本為隔離的 React 視覺 fixture，沒有載入 dist/app.js，沒有讀寫專案儲存；它不是完整網站的功能測試。尚未在真實瀏覽器執行，因此僅交付準備結果，**不是已驗收的 GUI 或通過截圖**。

## 本輪驗證

- 修改前與修正版 workspace bundle 的 JavaScript 語法檢查：通過。
- 新樣本外層與 iframe bootstrap 的 JavaScript 語法檢查：通過。
- 樣本生成：通過，7 個案例；實際檔案雜湊及尺寸見 manifest。
- 原 src／dist／worker 產品內容相對起點：完全沒有修改，另保存差異確認紀錄。
- 真實瀏覽器開啟、畫面尺寸量測、字型、像素比較、實機觸控：未執行，不列通過。
- P0-D 同步修復及其測試：未開始。

## 下一輪接續

1. 提供受支援的 `control-browser`／Sites 預覽驗收能力，先執行本次清單與實際 app 的 P0-C 補驗，保存截圖及結果。不得重新把上一輪 DOM 比較當作替代證據。
2. P0-C 通過後才開始 P0-D：先保留新的檢查點，針對 blockInputs 與欄位、變數更名／刪除、事件／流程／KOI 草稿套用的同步建立最小重現，再修復；每包必要測試，失敗同類最多重試兩次。
3. P0-D 通過並保存後，才依執行資源開始單一 P1 工作包。P1-A 背景、P1-B 腳本／預覽／素材、P1-C 全面回歸皆未執行。
4. 沒有資料遺失／阻斷性錯誤／不相容問題且完成發布驗收後，才部署至原 project_id 與網址。

本輪是驗收準備與阻礙交付，沒有宣稱修好 P0-D 或完成 P1，也沒有發布未驗收版本。
