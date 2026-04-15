---
layout: doc
---

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
</style>

<script setup>
// 自动加载成绩文本
fetch('/maimai.txt').then(r => r.text()).then(t => {
  document.getElementById('maimai').textContent = t
})
fetch('/chunithm.txt').then(r => r.text()).then(t => {
  document.getElementById('chunithm').textContent = t
})