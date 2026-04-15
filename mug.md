# 音游页面

## 🎵 舞萌 DX
<div class="score-card">
  <p id="maimai">加载中...</p>
</div>

## ⚡ 中二节奏
<div class="score-card">
  <p id="chunithm">加载中...</p>
</div>

<style>
.score-card {
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 10px 0;
}
.error-text {
  color: #dc3545;
  font-style: italic;
}
</style>

<script setup>
// 自动加载成绩文本
const loadScore = async (id, filename) => {
  try {
    const response = await fetch(filename)
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`)
    }
    const text = await response.text()
    document.getElementById(id).textContent = text.trim()
  } catch (error) {
    console.warn(`加载 ${filename} 失败:`, error)
    const element = document.getElementById(id)
    if (element) {
      element.textContent = '成绩加载失败'
      element.className = 'error-text'
    }
  }
}

// 页面加载完成后执行
import { onMounted } from 'vue'
onMounted(() => {
  loadScore('maimai', '/maimai.txt')
  loadScore('chunithm', '/chunithm.txt')
})
</script>
