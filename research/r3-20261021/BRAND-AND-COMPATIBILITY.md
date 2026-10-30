# 品牌、文件與相容性

使用者可見名稱統一「Koi Maker 視覺化故事創作平台」，測試修訂0.40.11_r3；HTML title/meta、側欄、指南、範例註解與遊戲匯出generator更新。package技術semver為0.40.11-r3。Logo字型與圖像、配色及CSS未改；兩份CSS與d898715逐位元組相同，新增控制沿用既有樣式。

KOI Script名稱／.koi／parser API／事件與素材ID／IndexedDB與localStorage鍵／舊格式保持。無新增指令，因此不建立無必要語法；既有語法參考與完整／舊格式範例重跑解析相容測試，另連結r3-user-guide.md。歷史報告及i18n識別keys保留，非無差別KOI取代。22原Worker資產加1操作指南，23個全量逐位元組檢查通過。

已知Sites metadata工具只可更新title，不能更新舊卡片description；HTML meta已正確。部署後title及active/public/exact URL以RELEASE原生結果為準。真人文字長度與視覺仍待驗；沒有以DOM或CSS一致當成真人通過。
