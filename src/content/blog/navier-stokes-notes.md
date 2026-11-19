---
title: '不可压 Navier–Stokes 方程与数值检验'
description: '从动量方程和连续性条件出发，整理不可压流动算例的基本检验项。'
pubDate: '2026-11-19'
category: '流体力学'
tags: ['CFD', 'Navier–Stokes', '数值计算']
featured: true
draft: false
---

设速度场为 $\mathbf{u}$，压力为 $p$，密度 $\rho$ 与运动黏度 $\nu$ 为常数。无外力的不可压 Navier–Stokes 方程可以写为

$$
\begin{aligned}
\frac{\partial \mathbf{u}}{\partial t}+(\mathbf{u}\cdot\nabla)\mathbf{u}
  &= -\frac{1}{\rho}\nabla p+\nu\nabla^2\mathbf{u},\\
\nabla\cdot\mathbf{u}&=0.
\end{aligned}
$$

## 无量纲化

以特征长度 $L$、速度 $U$ 和压力尺度 $\rho U^2$ 无量纲化。对流项与黏性项的相对尺度由雷诺数 $\mathrm{Re}=UL/\nu$ 描述。时间对应的尺度为 $L/U$。报告算例时，最好同时注明 $L$ 与 $U$ 的选取。

## 质量守恒与网格检验

积分形式提供了一个边界通量检查。对固定控制域 $\Omega$，不可压约束意味着

$$
\int_{\partial\Omega} \mathbf{u}\cdot\mathbf{n}\,\mathrm{d}S = 0.
$$

离散计算可以把各边界面上的法向流量相加，再和入口流量或其他特征通量比较。下面用一组演示数据展示检查方法。真实算例应从求解器导出有符号的面流量，通量单位在汇总前应一致。

```python
from math import fsum

face_flux = [-1.04, 0.50, 0.539]  # 外法向为正
imbalance = abs(fsum(face_flux)) / abs(face_flux[0])
print(f"相对净通量: {imbalance:.2e}")
```

残差下降之后，还需要检查关注量是否随网格和时间步趋于稳定。比较不同网格时，保持几何、边界条件和关注量的定义一致，并记录残差阈值与停止条件。

```bash
python postprocess.py results/mesh-64.csv
python postprocess.py results/mesh-128.csv
```

示例命令假定项目已有对应的后处理脚本。做正式报告时，保留原始数据，并注明每一层网格的时间步和计算设置。
