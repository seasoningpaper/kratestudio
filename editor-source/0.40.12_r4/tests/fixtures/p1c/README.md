# P1-C 合成素材

PNG為16×16透明RGBA、JPG為16×16實色圖，均以Pillow生成；WAV為0.2秒8kHz單聲道合成音；MP3複用專案既有click.mp3；MP4以ffmpeg合成16×16粉色H.264／yuv420p短片。僅供測試，不加入產品素材庫。
離線ffprobe驗證容器／編碼；DOMmetadata與圖片decode流程仍是stub，不能證明實際瀏覽器播放／透明度視覺已驗收。
