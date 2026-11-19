export const SITE_TITLE = 'Richard Research Blog';
export const SITE_DESCRIPTION = '科研笔记、计算流体力学与非线性动力学';
export const GITHUB_PROFILE = 'https://github.com/25988ra';
export const GITHUB_REPO = GITHUB_PROFILE + '/my_blog';

export const profile = {
  name: 'Richard',
  intro: '记录计算流体力学、非线性动力学与数值计算中的问题、方法和体会。',
  banner: '',
  avatar: '',
};

export const researchTopics = [
  { title: '计算流体力学', tag: 'CFD', note: 'Navier–Stokes 方程、流动稳定性与数值模拟。' },
  { title: '非线性动力学', tag: '分岔', note: 'Hopf 与 Double Hopf 分岔、振荡和正规形。' },
  { title: '科研计算', tag: '数值计算', note: 'MATLAB、Python 与可复现的科研绘图。' },
] as const;
