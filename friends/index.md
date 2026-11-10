<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import { XSVG, linkSVG } from '/.vitepress/theme/icons.ts';

const members = [
    {
    avatar: 'https://avatars.githubusercontent.com/u/32533580',
    name: 'Zn',
    title: '我自己',
    links: [
      { icon: 'github', link: 'https://github.com/wujx3433' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/7619378'},
      { icon: { svg: XSVG }, link: 'https://x.com/wujx3433'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/19746684',
    name: 'Gekka Saori',
    title: 'Wife',
    links: [
      { icon: 'github', link: 'https://github.com/GekkaSaori' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/132185099',
    name: '冬瓜',
    title: '可爱冬瓜',
    links: [
      { icon: 'github', link: 'https://github.com/dongguacute'},
      { icon: { svg: XSVG }, link: 'https://x.com/Dongguacute'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/54884471',
    name: 'Noa Virellia',
    title: '是最近认识的一位很可爱的孩子w',
    links: [
        { icon: 'github', link: 'https://github.com/AsterisMono'},
        { icon: { svg: linkSVG }, link: 'https://noise.amono.me'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/18461360',
    name: '凌莞~(=^▽^=)',
    title: 'MuNet!',
    links: [
        { icon: 'github', link: 'https://github.com/clansty'},
        { icon: { svg: linkSVG }, link: 'https://nyac.at'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/9004058',
    name: 'MikuNotFoundExpection',
    title: '好耶！是萌铁铁！',
    links: [
        { icon: 'github', link: 'https://github.com/Officeyutong'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/43064781',
    name: 'Coelacanthus',
    title: '哇！是C10s大佬！',
    links: [
        { icon: 'github', link: 'https://github.com/CoelacanthusHex'},
        { icon: { svg: linkSVG }, link: 'https://blog.coelacanthus.moe'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/11341955',
    name: 'Menci',
    title: 'Menci Meow Cat owo',
    links: [
        { icon: 'github', link: 'https://github.com/Menci'},
        { icon: { svg: linkSVG }, link: 'https://men.ci'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/26759054',
    name: 'saeziae',
    title: '山前大姐姐！',
    links: [
        { icon: 'github', link: 'https://github.com/saeziae'},
        { icon: { svg: linkSVG }, link: 'https://estela.moe'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/28506229',
    name: 'CrystalPb',
    title: 'Pb是我翻车的导火索（？）',
    links: [
        { icon: 'github', link: 'https://github.com/SkyCrystal'},
    ]
  },
   {
    avatar: 'https://avatars.githubusercontent.com/u/23723294',
    name: 'Cryolitia',
    title: '新的老朋友^_^',
    links: [
        { icon: 'github', link: 'https://github.com/Cryolitia'},
        { icon: { svg: linkSVG }, link: 'cryolitia.beiyan.us'}
    ]


  },
]
</script>

# 友情链接

这是我的好朋友们，虽然很少，但也显得弥足珍贵。

（除了GekkaSaori，其他朋友的排名不分先后）

<VPTeamMembers size="small" :members />