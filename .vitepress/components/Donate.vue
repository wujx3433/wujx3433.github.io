<template>
  <!-- 打赏模块容器：居中展示，仿公众号视觉 -->
  <div class="afdian-donate-container">
    <!-- 打赏提示文字 -->
    <p class="donate-tip">如果您喜欢我的创作，欢迎投喂～</p>
    <!-- 打赏按钮：点击跳转爱发电 -->
    <a 
      :href="afdianUrl" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="donate-btn"
    >
      <!-- 可选：加爱发电图标 -->
      <span class="btn-icon">
        <img src="https://static.afdiancdn.com/static/img/icons/apple-touch-icon-120x120.png" alt="爱发电" width="32" height="32">
      </span>
      <span class="btn-text">{{ btnText }}</span>
    </a>
  </div>
</template>

<script setup>
// 接收外部传参（可自定义文字/链接/昵称）
const props = defineProps({
  // 你的爱发电主页链接（必填）
  afdianUrl: {
    type: String,
    required: true,
    default: 'https://afdian.com/a/wujx3433' // 替换成你的实际链接
  },
  // 按钮文字（可选，默认“Buy me a coffee”）
  btnText: {
    type: String,
    default: 'Buy me a coffee'
  },
  // 你的爱发电昵称（可选）
  afdianNickname: {
    type: String,
    default: 'Zn'
  }
})
</script>

<style scoped>
/* 圆形蒙版核心样式 */
.btn-icon {
  margin-right: 8px;
  /* 圆形蒙版关键：宽高和图片一致，圆角50%，溢出隐藏 */
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  /* 让图片居中，避免偏移 */
  line-height: 0; 
}

/* 确保图片填满圆形容器，无变形 */
.btn-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 防止图片拉伸变形 */
}
/* 容器：居中，适配VitePress文章宽度 */
.afdian-donate-container {
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fafafa;
}

/* 提示文字：柔和灰色，仿公众号风格 */
.donate-tip {
  margin: 0 0 16px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

/* 打赏按钮：仿公众号按钮样式，hover有交互 */
.donate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  color: #fff;
  background-color: #a882f4; 
  border-radius: 24px;
  text-decoration: none;
  font-size: 15px;
  transition: background-color 0.2s ease;
}

/* 按钮hover效果 */
.donate-btn:hover {
  color: #fff;
  background-color: #8860d9;
  text-decoration: none; /* 去掉链接默认的下划线 */
}

/* 按钮图标：和文字间距 */
.btn-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* 爱发电昵称提示：小字体，浅灰色 */
.afdian-nickname {
  margin: 12px 0 0 0;
  color: #999;
  font-size: 12px;
}

/* 移动端适配：缩小内边距，适配小屏幕 */
@media (max-width: 768px) {
  .afdian-donate-container {
    padding: 16px;
    margin: 30px auto;
  }
  .donate-btn {
    padding: 8px 20px;
    font-size: 14px;
  }
}
/* 暗黑模式适配在.vitepress/theme/custom.css里 */
</style>