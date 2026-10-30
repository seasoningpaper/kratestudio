# 積木參考（2026/10/21）

- Blockly connection checks：https://docs.blockly.com/guides/create-custom-blocks/inputs/connection-check-playbook/
- Blockly anatomy／value與statement：https://docs.blockly.com/guides/create-custom-blocks/define/block-anatomy/
- Blockly JSON serialization（頁面2026/09/09更新）：https://docs.blockly.com/guides/configure/serialization/
- Blockly mutator：https://docs.blockly.com/codelabs/custom-mutator/the-basics/
- Scratch Blocks develop README（2.0技術分支，不等同Scratch2產品）：https://github.com/scratchfoundation/scratch-blocks
- Code.org Blockly：https://github.com/code-dot-org/blockly
- App Inventor官方：https://github.com/mit-cml/appinventor-sources/tree/master/appinventor/blocklyeditor （本次讀取失敗；不重試，不據此推論實作）

採納原則：typed connection先檢查、欄位及連接狀態分層、intrinsic內容測量與同一工作區座標、序列化保留額外狀態。本專案維持既有HTML DOM／CSS積木與chapters.events／blockInputs，不更換渲染框架、不複製開源實作。完整前輪競品盤點保留research/p2c-20261021與research/r3-20261021。
