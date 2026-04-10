---
layout: doc
---

# 本站被支持的特性

为方便统一化展示本站所支持的特性，特放出本页面，以供查阅。

## 一、VitePress原生特性

本站基于VitePress构建，原生支持VitePress的一切特性。

- VitePress内置有markdown扩展，可在md文件中使用高级语法。
- VitePress具有静态资源处理功能，网站编译完成后```/public```目录中的静态资源等效于其位于根目录。
- Vitepress支持YAML风格的frontmatter，可用来定义布局、标题等。
- VitePress深度集成Vue，Markdown页面等价于Vue单文件组件，可直接嵌入Vue组件、编写交互逻辑，实现内容与动态能力融合。
- VitePress支持对主题进行自定义与扩展，这也是本站下列自定义开发能够推进的前提。
- VitePress方便进行i18n，虽然本站并用不到。

更多VitePress特性[参见官网](https://vitepress.dev/zh/)。

## 二、由网页开发者自行开发的特性

为方便ZnP锌小屋展示某些相关内容，ZnP锌小屋的成员为本站开发了更多特性以适配相关需求。

### 1.示亡符

示例：

> 《长恨歌》作者：<span class="dead">白居易</span>
>
> 汉皇重色思倾国，御宇多年求不得。
>
> 杨家有女初长成，养在深闺人未识。
>
> …………

代码如下：

``` html
《长恨歌》作者：<span class="dead">白居易</span>
```

直接调用```dead```的css class即可使用。

### 2.pdf.js

本站集成了pdf.js并封装为了vue组件，方便展示pdf内容。

示例可见：[关于控制高校跨性别毒素外扩的研究报告（修订版）](./novel-docs/关于控制高校跨性别毒素外扩的研究报告（修订版）.md)

代码如下：

``` html
<PdfViewer url="/关于控制高校跨性别毒素外扩的研究报告（修订版）.pdf" />
```

该vue组件只接受```url```一个传参。传参时可将```/public```内的文件视为在根目录下，因为这是VitePress自带的特性。

### 3.多色按钮

目前本站的按钮有以下类型：

<a class="green-btn">绿色按钮</a>
<br>
<a class="purple-btn">紫色按钮</a>
<br>
<a class="feature-flag">特性按钮</a>

绿色按钮的特性如下：

``` css
.green-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #42b983; /* 按钮主题色 */
  color: #ffffff !important;  /* 强制覆盖Markdown默认链接颜色 */
  text-decoration: none !important; /* 去掉下划线 */
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 10px 50px 10px 10px;
}

.green-btn:hover {
  background-color: #359469;
}
```

紫色按钮的特性如下：

``` css
.purple-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #9b59b6; /* 按钮主题色 */
  color: #ffffff !important;  /* 强制覆盖Markdown默认链接颜色 */
  text-decoration: none !important; /* 去掉下划线 */
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 10px 10px 10px 0;
}

.purple-btn:hover {
  background-color: #8e44ad;
}

```

特性按钮的特性如下：

``` css
.feature-flag {
  display: inline-block;
  padding: 4px 4px;
  text-decoration: none !important;
  background-color: #a667ca;
  color: #dffb60 !important;
  border-radius: 4px;
  font-family: ZCOOL QingKe HuangYou;
  font-size: 24px !important;
  font-weight: 500;
  margin: 10px 10px 10px 0;
}
```

目前多色按钮的用途如下：

<a class="green-btn">绿色按钮</a>用于做跳转链接，一般是用于跳转站外。

<a class="purple-btn">紫色按钮</a>用于做打开正文，可以认为是跳转站内。

<a class="feature-flag">特性按钮</a>只用来描述特性，用在小说页的每篇小说的标题前面。

使用方法：

``` html
<a class="green-btn">绿色按钮</a>用于做跳转链接，一般是用于跳转站外。

<a class="purple-btn">紫色按钮</a>用于做打开正文，可以认为是跳转站内。

<a class="feature-flag">特性按钮</a>只用来描述特性，用在小说页的每篇小说的标题前面。
```

### 4.爱发电打赏模块

本站支持模仿微信公众号的爱发电打赏模块，效果如下：

<Donate />

以上效果为缺省参数，打赏链接指向站长自己。

该组件支持的所有传参如下：

``` html
<Donate afdianUrl="你的爱发电主页链接(字符串类型)" ;
    btnText="按钮文字(字符串类型,默认'Buy me a coffee')" ;
    afdianNickname="爱发电昵称(字符串类型,默认'ZnP aka wujx3433')" />
```

### 5.竖排版布局

本站开发了适配中文竖排的布局，目前该布局**仅适用于简体中文**。

调用方法：在创建的markdown文档前面加这个：

``` markdown
---
layout: Vertical
---
```

示例可见测试页面：

<a href="test.html" class="purple-btn">点我跳转竖排版测试页面</a>

竖排版相关特性介绍：

- 适配范围：专为简体中文设计的竖排布局，核心基于```writing-mode: vertical-rl```实现从右至左传统竖排逻辑；
- 字体特性：默认采用Noto Serif SC字体，启用OpenType竖排优化特性（vert/vrt2/thum），优化字符对齐与数字显示；
- 文本适配：自动转换横竖排引号（```“”‘’``` -> ```『』「」```），精细化调整换行、行高、字间距；
- 公式兼容：自动旋转并调整MathJax公式SVG参数（viewBox/宽高/样式），适配Vite HMR热更新（更新前后还原/重调公式样式）；
- 样式设计：定制中式竖排引用块、表格样式，拟物化书页质感（米色背景+细微纹理+轻微阴影）；
- 响应式适配：移动端自动缩小列宽、字间距等参数，表格支持横向滚动，容器高度适配移动端视口；
- 布局逻辑：多列自适应布局，容器高度适配视口（兼容导航栏高度），支持纵向滚动翻页。

详细实现可查阅 [Vertical.vue 组件源代码](https://github.com/wujx3433/wujx3433.github.io/blob/main/.vitepress/components/Vertical.vue)。

### 6.LaTeX支持

本站集成了markdown-it-mathjax3插件，全面支持 $\LaTeX$ 格式的数学公式渲染，且公式渲染效果与本站自研的竖排版布局深度兼容，满足中文竖排场景下的公式展示需求。

调用方法：

- 行内公式：使用单个```$```包裹 $\LaTeX$ 公式代码（嵌入文本行内）；
- 块级公式：使用两个```$$```包裹 $\LaTeX$ 公式代码（独占一行展示）。

> 行内公式示例：欧拉公式 $e^{i\pi} + 1 = 0$ 广泛应用于数学、物理和工程领域。
>
> 块级公式示例：
>
> 真空中麦克斯韦方程组的微分形式：
>
> $$
> \begin{aligned}
> \nabla\cdot\mathbf{E}&=\frac{\rho}{\varepsilon_0}\\
> \nabla\cdot\mathbf{B}&=0\\
> \nabla\times\mathbf{E}&=-\frac{\partial\mathbf{B}}{\partial t}\\
> \nabla\times\mathbf{B}&=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
> \end{aligned}
> $$
>
> 真空中麦克斯韦方程组的积分形式：
>
> $$
> \begin{cases}
> \unicode{8751}_{\mathbb{S}}\mathbf{E}\cdot\mathrm{d}\mathbf{s} = \frac{Q}{\varepsilon_0} \\
> \unicode{8751}_{\mathbb{S}}\mathbf{B}\cdot\mathrm{d}\mathbf{s} = 0 \\
> \oint_{\mathbb{L}} \vec{E} \cdot d\boldsymbol{\ell} = -\dfrac{d\Phi_{B}}{dt} \\
> \oint_{\mathbb{L}} \vec{B} \cdot d\boldsymbol{\ell} = \mu_0 I + \mu_0 \varepsilon_0 \dfrac{d\Phi_{E}}{dt}
> \end{cases}
> $$
​
代码如下：

``` markdown
行内公式示例：欧拉公式 $e^{i\pi} + 1 = 0$ 广泛应用于数学、物理和工程领域。

块级公式示例：

真空中麦克斯韦方程组的微分形式：

$$
\begin{aligned}
\nabla\cdot\mathbf{E}&=\frac{\rho}{\varepsilon_0}\\
\nabla\cdot\mathbf{B}&=0\\
\nabla\times\mathbf{E}&=-\frac{\partial\mathbf{B}}{\partial t}\\
\nabla\times\mathbf{B}&=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
\end{aligned}
$$

真空中麦克斯韦方程组的积分形式：

$$
\begin{cases}
\unicode{8751}_{\mathbb{S}}\mathbf{E}\cdot\mathrm{d}\mathbf{s} = \frac{Q}{\varepsilon_0} \\
\unicode{8751}_{\mathbb{S}}\mathbf{B}\cdot\mathrm{d}\mathbf{s} = 0 \\
\oint_{\mathbb{L}} \vec{E} \cdot d\boldsymbol{\ell} = -\dfrac{d\Phi_{B}}{dt} \\
\oint_{\mathbb{L}} \vec{B} \cdot d\boldsymbol{\ell} = \mu_0 I + \mu_0 \varepsilon_0 \dfrac{d\Phi_{E}}{dt}
\end{cases}
$$
```

特性说明：
- 语法兼容：遵循标准 $\LaTeX$ 数学公式语法，支持分式、积分、矩阵、希腊字母、上下标等各类数学符号 / 公式形态的原生渲染；
- 竖排版适配：在竖排版布局```layout: Vertical```下，公式 SVG 会被自动旋转 90°，并智能调整viewBox、宽高、基线样式等核心参数，保证公式与竖排文本排版协调；
- 热更新兼容：适配 Vite HMR 热更新机制，热更新前自动还原公式原始样式，更新后重新执行竖排适配逻辑，避免样式错乱；
- 样式优化：裁剪公式容器多余滚动条，公式渲染区域溢出可见，与竖排文本的行高、间距视觉风格统一。

缺陷说明：
- mathjax不支持环路二重积分```\oiint```及更高，需要用```\unicode{}```来实现。
- doc布局下，```\begin{cases}```环境内会出现滚动条。

## Credits

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members =[
    {
    avatar: 'https://avatars.githubusercontent.com/u/32533580',
    name: 'wujx3433 aka Zn',
    title: 'Author, Developer',
    links: [
      { icon: 'github', link: 'https://github.com/wujx3433' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/7619378'},
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/19746684',
    name: 'Gekka Saori',
    title: 'Proofreader, Developer',
    links: [
      { icon: 'github', link: 'https://github.com/GekkaSaori' },
    ]
  },
]
</script>

<VPTeamMembers size="small" :members />

## 

<Donate />
