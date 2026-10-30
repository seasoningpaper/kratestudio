# Fix-02 尺寸／欄位修復

角色積木舊310px僅留作尚未測量前估算；有效DOM實測取代估算，保留66px結構最小值，後續積木及吸附共同使用新高度。DOM欄位依未縮放offset／scroll高度測量，ResizeObserver及font ready重測沿用；沒有依字數猜固定高度。文字欄改統一textarea單列起始，依scrollHeight自動增高與縮回，仍使用同一text值及typed socket。caption分成不斷裂span，label以群組換行避免中文標籤被壓成直列。

新增editor-fixes.css只限制積木欄位群組、文字溢出及控制項最小可讀寬；沒有改色、字體、凹凸輪廓、Logo、Header或播放器。原介面仍為既有HTML DOM與CSS積木，不改為Blockly。

修復前3項新測試1通過／2失敗：310不縮回及DOM欄位結構；修復後3項及10項連接／字串／Pointer／存讀回歸共13通過。Fix02-after第一次12/13，舊測試用textarea存在作React更新完成條件，改成等待相同長文字值；保留原長字串、ID、儲存、取消斷言，沒有改期望值。Fix02-final全部通過。

限制：這是intrinsic測量／資料與DOM驗證，無實體瀏覽器layout／觸控確認；真實短／長中英、多行、縮放與連續插拔需依MANUAL驗收。固定工作區欄寬沿用原設計，未完成所有插槽模組化／巢狀expression AST。其餘Fix03–08尚未完成，已重現High刪除Bug尚未修復，因此禁止發布本包。
