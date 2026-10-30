# C3 流程圖導航補強

從1234b26接續。沒有加入第二套佈局引擎；分層／正交路由、卡片外觀、折疊、手排pos／Undo沿用r2。

新增flow-navigation.mjs、flow-scrollbars.jsx，workspace.jsx串接。兩條可見／可拖動捲動軌及鍵盤捲動，都直接投影同一個view{x,y,s}；沒有native scrollLeft/Top與transform各寫一份狀態。軌道範圍由原boundedView產生，不受無效跨章跳轉索引擴張。拖曳／取消／失capture只改視圖、不改事件。縮放或範圍改變取消舊軌道手勢。

滾輪預設垂直／橫向捲動，Shift＋滾輪橫向、Ctrl／Command＋滾輪以游標為中心縮放；Space＋拖曳即使從節點開始也只平移。新增編號／精確ID／唯一區段名稱定位，重複區段提示，數字ID優先於編號。定位隱藏事件先展開區段再定位。既有Fit、選取定位、縮圖與分章視圖保留。

9個新增測試＋3個r2 Flow DOM測試全部通過，見C3-test.tap。300與500事件各一次26選項、有循環／合流／無效跨章索引，故事完整未變、0重疊／0穿卡，有限交點仍存在，實測數據見C3-capacity-*.json。事件／選項／next／ID／自訂欄位全內容比較，非只比數量。模式往返保持視圖、Space不改pos、自排Undo與原世界座標拖曳通過。bundle與Worker／22資產通過。

限制：軌道為符合既有風格的自訂ARIA scrollbar，不是瀏覽器native overflow畫布；仍待真實瀏覽器拖動／滾輪／觸控驗收。沒有新一輪全域crossing minimization，r2仍非最佳化保證。Fit沿用最低20%比例，極長未自排流程不能保證一次全納入；可先自排／收合與定位。任意重疊手排仍沒有全域無穿卡保證。這些不標為本包新增完成。CSS只附加流程軌與定位控制作用域，其他頁面未重設計。
