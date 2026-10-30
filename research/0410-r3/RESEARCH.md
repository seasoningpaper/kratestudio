# 歷史設計研究與元件對照

本輪讀取 5 份 2018/03/01～2022/08/30 之內的真實原始碼快照。完整 95 件作品研究尚未完成；不把同一專案不同元件或截圖重複計數。GitHub commit 日期證明該版本當時已存在，不等於產品第一次發布日期。依附件的全部 12 欄與原始發表日查證標準，完整作品檔案目前 0/95；技術版本研究 5 份。r2 的128候選保留供後續使用，不能計為本輪驗證。

## Bootstrap 4.1

作者：twbs。歷史版本：2018-04-09。

日期證據：https://github.com/twbs/bootstrap/commit/875ed0b975a587fffcc1b0c632e1cc8f612ebc5a
原始碼：https://github.com/twbs/bootstrap/tree/875ed0b975a587fffcc1b0c632e1cc8f612ebc5a

設計語言：連續分頁與控制項狀態；緊湊表單。色彩：中性底色、功能色；非粉彩範本。材質：扁平命令與輸入層級。
控制項：小圓角及 disabled 狀態。排版：Flexbox、相接命令。
採用：控制項語意及停用規則。省略：不採 pills、卡片布局與累加 focus shadow。

已保留原始碼、commit、tree 及授權檔；僅作研究，不執行第三方程式。

## Neumorphism.io

作者：adamgiebl。歷史版本：2020-12-29。

日期證據：https://github.com/adamgiebl/neumorphism/commit/877c2ef172c492961135c707e2e4a77477690cd6
原始碼：https://github.com/adamgiebl/neumorphism/tree/877c2ef172c492961135c707e2e4a77477690cd6

設計語言：可調光源、凸／凹面產生器。色彩：同色表面亮暗分離。材質：依光源反轉雙向 shadow。
控制項：表面厚度由距離與 blur 決定。排版：單一材質預覽，非編輯器架構。
採用：同一受光方向；縮短陰影距離。省略：不搬光源角落裝飾與大圓角。

已保留原始碼、commit、tree 及授權檔；僅作研究，不執行第三方程式。

## Neumorphism UI

作者：themesberg。歷史版本：2020-12-21。

日期證據：https://github.com/themesberg/neumorphism-ui-bootstrap/commit/ad36e60d9436650b6c340e2f79a1497da2a5a6a3
原始碼：https://github.com/themesberg/neumorphism-ui-bootstrap/tree/ad36e60d9436650b6c340e2f79a1497da2a5a6a3

設計語言：Bootstrap Soft UI 互動元件。色彩：灰白同色階，功能性深色字。材質：button raised、form inset。
控制項：表單讀寫／disabled、按鈕按壓。排版：Sass variables／mixins。
採用：輸入與按壓表面分開。省略：不照搬 pills、粗框或整頁 raised。

已保留原始碼、commit、tree 及授權檔；僅作研究，不執行第三方程式。

## Soft UI Dashboard

作者：creativetimofficial。歷史版本：2021-11-02。

日期證據：https://github.com/creativetimofficial/soft-ui-dashboard/commit/0b2c9a81beb60640dc8c9b23df7e4bfe868457a5
原始碼：https://github.com/creativetimofficial/soft-ui-dashboard/tree/0b2c9a81beb60640dc8c9b23df7e4bfe868457a5

設計語言：局部 gradient 與按鈕狀態。色彩：原高彩度漸層；本作降低彩度。材質：有 inset 0 1px 2px 的局部凹面。
控制項：active 調整 transform、opacity。排版：variables 管理控制項。
採用：分離 action gradient token 與平面工作區。省略：不採 Dashboard 構圖、亮粉紫漸層與大陰影。

已保留原始碼、commit、tree 及授權檔；僅作研究，不執行第三方程式。

## Spectrum CSS

作者：adobe。歷史版本：2021-12-10。

日期證據：https://github.com/adobe/spectrum-css/commit/9a6a60b78a75a3f1c53b38eb56d7211d98f0090f
原始碼：https://github.com/adobe/spectrum-css/tree/9a6a60b78a75a3f1c53b38eb56d7211d98f0090f

設計語言：桌面創作軟體動作元件。色彩：語意色與正文對比。材質：非 Neumorphism；提供桌面狀態規則。
控制項：共用 base button、對齊與 transition。排版：系統化元件責任及尺寸。
採用：對齊命令、穩定幾何及統一時長。省略：不搬圓膠囊和多層 halo。

已保留原始碼、commit、tree 及授權檔；僅作研究，不執行第三方程式。
