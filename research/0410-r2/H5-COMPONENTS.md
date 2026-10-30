# H5 共用元件重建

這是從已驗證 0.41.0 來源重新實作的版本，不是遺失的 83d7272。

- 上方四模式分頁、連續底線主導航；保留原有模式切換及文件狀態。
- 配色入口移至設定頁，沿用 editorSettings。
- 共用 Button、Input、Select、SettingSection、FormRow、FieldGroup；PropertyEditor、InspectorSection 於 H6 整合作品設定。
- 17 處 React 檔案輸入使用共用 FilePicker；保留原本格式、資料夾、回呼及原生檔案選擇能力。
- 僅主要儲存與預覽按鈕採局部游標受光，含觸控、減少動態與監聽器清理。
- 建置成功，12/12 直接測試通過；H5-build.log、H5-tests.log。
- Chrome 已開啟真實工作區並保存畫面；完整逐頁及 RWD 驗收於 H8。

未修改引擎、專案模型、播放器、積木核心及 Logo。
