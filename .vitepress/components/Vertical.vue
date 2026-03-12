<script setup lang="ts">
import { Content } from 'vitepress';
import { onMounted } from 'vue';

var attributesBeforeModify : string[] = [];

var adjusted : boolean = false;

function revertVerticalAdjustments() {
  if(adjusted === false) return;
  var equList = document.querySelector('.vertical-layout-container')!.querySelectorAll('mjx-container');
  if(equList.length * 4 !== attributesBeforeModify.length)
    throw Error("Index out of bound for attributesBeforeModify, expected " + equList.length * 4 + ", got " + 
                    attributesBeforeModify.length + '.');
  for(var i = 0; i < equList.length; ++i) {
    var svg = equList[i].querySelector('svg');
    // restore the original svg attributes since we need to redo the adjustments afterwards.
    svg!.setAttribute('viewBox', attributesBeforeModify[i * 4]);
    svg!.setAttribute('height', attributesBeforeModify[i * 4 + 1]);
    svg!.setAttribute('width', attributesBeforeModify[i * 4 + 2]);
    svg!.setAttribute('style', attributesBeforeModify[i * 4 + 3]);
  }
  adjusted = false;
}

function doVerticalAdjustments() {
  if(adjusted === true) return;
  
  // 横排引号转换为竖排引号
  var divList = ['p', 'h1', 'h2', 'h3', 'h4', 'h5']
  var replaceList = ['“', '『', '”', '』', '‘', '「', '’', '」'];
  for(var i = 0; i < divList.length; ++i) {
      var selectedDiv = document.querySelector('.vertical-layout-container')!.querySelectorAll(divList[i]);
      for(var j = 0; j < selectedDiv.length; ++j) {
          var str = selectedDiv[j].innerHTML;
          for(var k = 0; k < replaceList.length; k += 2) {
              str = str.replaceAll(replaceList[k], replaceList[k + 1]);
          }
          selectedDiv[j].innerHTML = str;
      }
  }
  
  // 调整公式SVG
  while(attributesBeforeModify.length !== 0) {
    attributesBeforeModify.pop();
  }
  var equList = document.querySelector('.vertical-layout-container')!.querySelectorAll('mjx-container');

  for(var i = 0; i < equList.length; ++i) {

    var svg = equList[i].querySelector('svg');

    // ==== keep a copy or the original svg attributes ====
    // keep a copy of the original viewBox attributes at 0, 4, ... 
    attributesBeforeModify.push(svg!.getAttribute('viewBox')!);
    // keep a copy of the original height and width at 1, 2, 5, 6, ...
    attributesBeforeModify.push(svg!.getAttribute('height')!);
    attributesBeforeModify.push(svg!.getAttribute('width')!);
    // keep a copy of the original style attributes 3, 7, ...
    attributesBeforeModify.push(svg!.getAttribute('style')!);
    // ==== end of save a copy of the original svg attributes ====

    // ==== viewBox attributes adjustments === 
    // split viewBox parameters
    var str_viewBoxParameters = svg!.getAttribute('viewBox')!.split(' '); // min_x min_y delta_x delta_y : string[] 
    // convert viewBox parameters into number to calculate
    var num_viewBoxParameters : number[] = [];
    for(var j = 0; j < str_viewBoxParameters.length; ++j) {
      num_viewBoxParameters.push(Number(str_viewBoxParameters[j])); // min_x min_y delta_x delta_y : number[] 
    }
    // rotate the viewBox 90 degrees around its center
    num_viewBoxParameters[0] = num_viewBoxParameters[0] + 0.5 * num_viewBoxParameters[2] - 0.5 * num_viewBoxParameters[3];
    num_viewBoxParameters[1] = num_viewBoxParameters[1] + 0.5 * num_viewBoxParameters[3] - 0.5 * num_viewBoxParameters[2];
    // swap width and height of the viewBox
    var tmp = num_viewBoxParameters[2];
    num_viewBoxParameters[2] = num_viewBoxParameters[3];
    num_viewBoxParameters[3] = tmp;
    // convert viewBox parameters into string for setAttribute()
    var str_viewBoxAttributes : string = '';
    for(var j = 0; j < num_viewBoxParameters.length; ++j) {
      str_viewBoxAttributes +=  (' ' + String(num_viewBoxParameters[j]));
    }
    str_viewBoxAttributes.trimStart();
    // set viewBox attributes
    svg!.setAttribute('viewBox', str_viewBoxAttributes);
    // ==== end of viewBox attributes adjustments ====

    // ==== swap width and height of svg ====
    var tmp2 = svg!.getAttribute('width');
    svg!.setAttribute('width', svg!.getAttribute('height')!);
    svg!.setAttribute('height', tmp2!);
    // ==== end of width and height adjustments ====

    // ==== style attributes (baseline) adjustments ====
    var str_styleParameters = svg!.getAttribute('style')!.split(' ');
    str_styleParameters.push(String(-0.5 * Number(str_styleParameters.pop()!.replace('ex;',''))) + 'ex;')
    // convert style parameters into string for setAttribute()
    var str_styleAttributes : string = '';
    for(var j = 0; j < str_styleParameters.length; ++j) {
      str_styleAttributes += (' ' + str_styleParameters[j]);
    }
    str_styleAttributes.trimStart();
    // set style attributes
    svg!.setAttribute('style', str_styleAttributes);
    // ==== end of style (baseline) attributes adjustments ====
  }
  adjusted = true;
}

// dummy error handling
function handleError(e : any) {
  console.log(e);
  location.reload();
}


// register Vue event hooks
onMounted(() => {
  try {
    doVerticalAdjustments();
  } catch (e) {
    handleError(e);
  }
});

// register Vite HMR hooks
if(import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    try {
      revertVerticalAdjustments();
    } catch (e) {
      handleError(e);
    }
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    try {
      doVerticalAdjustments();
    } catch (e) {
      handleError(e);
    }
  });
}
</script>

<template>
  <div class="vertical-layout-container">
    <Content />
  </div>
</template>

<style>

/* 旋转直排公式 */
.vertical-layout-container mjx-container > svg {
  transform: rotate(90deg);
  transform-origin: center center;
}
/* clip extra scroll bar */
.vertical-layout-container mjx-container {
  overflow-x: visible;
}

/* 竖排段落适配：取消默认 margin，调整间距 */
.vertical-layout-container p {
  margin: 0;
  margin-inline-start: 0.4em; /* 段落之间的间距 */
  margin-inline-end: 0.4em;
  white-space: normal;
  padding-inline-start: 2em; /*另起一行空两格*/
  /* break-inside: avoid;*/
  line-height: 1.6em;
  margin-block: 1em;
}

.vertical-layout-container br {
  display: block;
  margin: 0;
  padding: 0;
  line-height: 0.8em;
  margin-inline: 0.2em;
  height: 1em;
  width: auto;
}

.vertical-layout-container blockquote {
  /* 重置默认样式（消除浏览器默认的margin/padding/border） */
  margin: 0;
  padding: 0;
  border: none;
  quotes: none; /* 取消默认引号样式，自定义中式竖排引号 */
  
  /* 竖排核心布局：适配 vertical-rl */
  display: block;
  /* 竖排下的“左右缩进”（inline方向），比普通文本更靠内，突出引用层级 */
  margin-inline: 1em 0.5em;
  /* 竖排下的“上下间距”（block方向），保持紧凑 */
  margin-block: 0.8em;
  /* 内边距：适配竖排阅读，避免文字贴边框 */
  padding-inline: 1.2em;
  padding-block: 0.6em;
  
  /* 中式竖排引用视觉特征：下边框（对应横排左侧边框）+ 浅底色 */
  border-block-end: 2px solid rgba(236, 120, 166, 0.3); /* 浅棕褐色边框，贴合书页质感 */
  background-color: rgba(249, 247, 243, 0.6); /* 比书页底色稍深一点，区分引用区域 */
  border-radius: 2px; /* 轻微圆角，和书页风格统一 */
  
  /* 字体/行高：保持和正文一致，突出层级但不突兀 */
  font-family: inherit; /* 继承容器字体（Noto Serif/Noto Sans CJK SC） */
  line-height: inherit;
  letter-spacing: inherit;
  
  /* 禁止引用块跨列（翻页时保持完整） */
  break-inside: avoid;
}

.vertical-layout-container table {
    /* 重置默认表格样式 */
  border-collapse: collapse; /* 合并边框，避免双线条 */
  border-spacing: 0;
  width: auto; /* 自适应内容宽度，不撑满容器 */
  margin: 1em auto; /* 竖排下居中，上下间距适配书页 */
  /* 竖排核心：表格整体跟随容器竖排，但单元格内文字保持易读 */
  writing-mode: vertical-rl;
  /* 禁止表格跨列（翻页时保持完整） */
  break-inside: avoid;
  /* 书页风格边框：浅棕底色+细边框 */
  border: 1px solid rgba(150, 120, 80, 0.2);
  background-color: rgba(249, 247, 243, 0.8);
  border-radius: 4px; /* 和书页风格统一的圆角 */
}

/* 表头单元格 */
.vertical-layout-container th {
  /* 重置默认样式 */
  padding: 0.6em 0.4em; /* 竖排下内边距：上下（inline）小，左右（block）稍大 */
  margin: 0;
  /* 表头视觉区分：深一点的底色+加粗 */
  background-color: rgba(150, 120, 80, 0.1);
  font-weight: 700;
  text-align: center; /* 竖排下文字居中 */
  /* 表头边框：细边框，贴合书页 */
  border: 1px solid rgba(150, 120, 80, 0.2);
  /* 表头文字不旋转，保持直立 */
  text-orientation: mixed;
}

/* 内容单元格 */
.vertical-layout-container td {
  /* 重置默认样式 */
  padding: 0.5em 0.4em; /* 比表头稍紧凑 */
  margin: 0;
  text-align: center; /* 竖排下文字居中（可改为left/right） */
  /* 内容边框：和表头一致 */
  border: 1px solid rgba(150, 120, 80, 0.2);
  /* 文字直立，避免旋转导致阅读困难 */
  text-orientation: mixed;
}

/* 表格行hover效果（增强交互） */
.vertical-layout-container tr:hover td {
  background-color: rgba(150, 120, 80, 0.05);
}

.vertical-layout-container h1{
  line-height: 2em;
  font-weight: 800;
  font-size: 38px;
  margin-inline-start: 12px;
  letter-spacing: 0.4em;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h2{
  line-height: 1.8em;
  font-weight: 700;
  font-size: 28px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h3{
  line-height: 1.8em;
  font-weight: 600;
  font-size: 24px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h4{
  line-height: 1.8em;
  font-weight: 500;
  font-size: 20px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h5{
  line-height: 1.8em;
  font-weight: 400;
  font-size: 18px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

/* 竖排布局容器：覆盖整个文档内容区域 */
.vertical-layout-container {
  max-height: calc(100vh - 200px); /*继承template高度减去导航栏高度*/
  height: 100%;/*兜底*/
  column-width: 40em;
  column-count: auto;
  column-gap: 2em;
  column-fill: auto;
  white-space: normal;
  word-break: normal;
  overflow-x: auto; 
  overflow-y: auto; 
  font-family: "Noto Serif SC", "Source Han Serif CN VF", serif;
  /*字体opentype特性：竖排优化，等宽数字*/
  font-feature-settings: "vert" on, "vrt2" on, "thum" on;
  font-optical-sizing: auto;
  writing-mode: vertical-rl; /* 核心：从右到左竖排（中文传统） */
  text-orientation: mixed; /* 文字直立，不旋转 */
  text-align: justify; /* 分散对齐 */
  max-width: calc(100vh - 20px); /* 适配默认文档宽度 */
  width: 100%;
  margin: 0 auto; /* 居中 */
  padding: 20px 0;
  letter-spacing: 2px; /* 字间距，避免拥挤 */

  /* 浅米色背景+细微纹理渐变（模拟纸张质感） */
  background-color: #f9f7f3;
  background-image: 
    linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px);
  background-size: 20px 20px; /* 纹理密度，可调整 */
  /* 容器内边距，让内容不贴边 */
  padding-inline: 1em;
  border-radius: 4px; /* 轻微圆角，更柔和 */
  break-inside: avoid;
}

/*单页底色*/
.vertical-layout-container > * {
  /* 单页底色（比容器稍浅） */
  background-color: #fffbf5;
  /* 轻微阴影，模拟书页立体感 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  /* 单页内边距，避免文字贴边 */
  padding-inline: 1.5em;
  padding-block: 1em;
  /* 轻微圆角 */
  border-radius: 2px;
}

/* 暗黑模式适配在custom.css里 */

/* 移动端适配：缩小间距，适配小屏幕 */
@media (max-width: auto) {
  .vertical-layout-container {
    padding: 10px 0;
    line-height: 1.6;
    letter-spacing: 0.5px;
    column-width: 16em; /* 移动端列宽更小，适配屏幕 */
    column-gap: 2em;
    max-height: calc(100vh - 150px); /* 减少导航栏高度占比 */
  }
  .vertical-layout-container br{
    line-height: 0.6em;
    margin-inline: 0.1em;
  }
  .vertical-layout-container p {
    margin-inline-start: 0.8em;
    margin-inline-end: 0.8em;
    padding-inline-start: 1.5em; /* 移动端空两格缩小 */
  }
  .vertical-layout-container blockquote {
    margin-inline: 0.6em 0.3em;
    margin-block: 0.6em;
    padding-inline: 0.8em;
    padding-block: 0.4em;
    border-block-end-width: 1px; /* 移动端边框稍细 */
  }
    .vertical-layout-container table {
    /* 移动端表格允许横向滚动，避免挤压 */
    display: block;
    overflow-x: auto;
    /* 缩小间距，适配小屏 */
    margin: 0.8em auto;
  }
  .vertical-layout-container th {
    padding: 0.4em 0.3em;
    font-size: 0.9em;
  }
  .vertical-layout-container td {
    padding: 0.3em 0.2em;
    font-size: 0.9em;
  }
}

</style>