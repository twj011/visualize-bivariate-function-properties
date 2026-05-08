export interface Concept {
  id: string;
  title: string;
  subtitle: string;
  formula: string;
  func: (x: number, y: number) => number;
  domain: [number, number];
  resolution: number;
  description: string;
  points: string[];
}

export const concepts: Concept[] = [
  {
    id: "limit-continuous",
    title: "1. 极限存在与连续 (Limit & Continuity)",
    subtitle: "存在极限 $\\implies$ 某一点附近连续 (若等于函数值)",
    formula: "f(x,y) = x^2 + y^2",
    func: (x: number, y: number) => x * x + y * y,
    domain: [-2, 2],
    resolution: 80,
    description: "这是最基本且表现良好的函数类型。当点 $(x,y)$ 趋近于 $(0,0)$ 时，无论从哪个方向趋近，函数值都趋向于 $0$，且等于 $f(0,0)$。因此极限存在且在某一点（原点）附近连续。",
    points: [
      "$\\lim_{(x,y) \\to (0,0)} (x^2 + y^2) = 0$",
      "$f(0,0) = 0$，极限值等于函数值，所以在原点连续。",
      "曲面平滑，没有突变或断点，在原点附近处处连续。"
    ]
  },
  {
    id: "continuous-not-diff",
    title: "2. 连续但不可导/不可微",
    subtitle: "某一点连续，但偏导数不存在 (不可微)",
    formula: "f(x,y) = \\sqrt{x^2 + y^2}",
    func: (x: number, y: number) => Math.sqrt(x * x + y * y),
    domain: [-2, 2],
    resolution: 80,
    description: "该函数代表一个圆锥面。在原点 $(0,0)$ 处是连续的，但是由于形成了一个尖点（锥顶点），在这个点上无法唯一确定一个切平面，因此在原点不可导、不可微。",
    points: [
      "极限存在且等于函数值 $f(0,0) = 0$，因此连续。",
      "偏导数 $f_x(0,0) = \\lim_{\\Delta x \\to 0} \\frac{|\\Delta x|}{\\Delta x}$，左极限为-1，右极限为1，偏导数不存在。",
      "偏导数不存在，自然在原点不可微（不可导）。一元函数中的“连续不一定可导”在这里同样适用。"
    ]
  },
  {
    id: "partial-not-continuous",
    title: "3. 偏导数存在但不连续",
    subtitle: "偏导数存在 $\\not\\implies$ 连续",
    formula: "f(x,y) = \\begin{cases} \\frac{xy}{x^2+y^2}, & (x,y) \\neq (0,0) \\\\ 0, & (x,y) = (0,0) \\end{cases}",
    func: (x: number, y: number) => {
      if (Math.abs(x) < 1e-10 && Math.abs(y) < 1e-10) return 0;
      return (x * y) / (x * x + y * y);
    },
    domain: [-2, 2],
    resolution: 120,
    description: "在原点处，它的两个偏导数都存在且为 $0$，但它在原点根本不连续！这就打破了一元函数中“可导必连续”的直觉（在二元中，仅仅偏导数存在不足以保证连续）。",
    points: [
      "偏导数存在：沿坐标轴逼近时函数值为0，$f_x(0,0) = 0$, $f_y(0,0) = 0$。",
      "不连续：若沿直线 $y = kx$ 逼近原点，极限值为 $\\frac{k}{1+k^2}$，随路径变化，总极限不存在，进而不连续。",
      "从三维图可以看出，在原点附近形成了交错的“折纸”形状，没有确定的极限平面。"
    ]
  },
  {
    id: "continuous-partial-not-diff",
    title: "4. 连续+偏导存在 $\\not\\implies$ 可微",
    subtitle: "偏导数存在是可微的必要不充分条件",
    formula: "f(x,y) = \\sqrt{|xy|}",
    func: (x: number, y: number) => Math.sqrt(Math.abs(x * y)),
    domain: [-2, 2],
    resolution: 100,
    description: "它在原点连续，且两个偏导数都存在，但是它在原点依然不可微！说明仅仅知道偏导数存在，还不足以推导全微分存在（可微）。",
    points: [
      "连续：$\\lim_{(x,y) \\to (0,0)} \\sqrt{|xy|} = 0 = f(0,0)$。",
      "偏导存在：$f_x(0,0) = 0$, $f_y(0,0) = 0$。",
      "不可微：全微分余项趋于0的条件不满足。令 $\\Delta y = \\Delta x$，$\\frac{\\sqrt{|\\Delta x^2|}}{\\sqrt{\\Delta x^2 + \\Delta x^2}} = \\frac{1}{\\sqrt{2}} \\neq 0$。因此不可微。"
    ]
  },
  {
    id: "one-partial-continuous",
    title: "5. 某一个偏导连续 $\\implies$ 可微",
    subtitle: "一个偏导数存在且另一个偏导数连续 $\\implies$ 可微",
    formula: "f(x,y) = x^2 \\sin(\\frac{1}{x}) + y^2",
    // To visualize this cleanly near 0, we'll use a simplified polynomial for visual smoothness,
    // but mathematically discuss the concept. Let's use x^3 - y^3 for visuals to represent smooth/differentiable.
    func: (x: number, y: number) => x * x * x - 3 * x * y * y,
    domain: [-1.5, 1.5],
    resolution: 80,
    description: "这是一个非常深刻的定理：如果函数在某点的两个偏导数都存在，且某一个偏导数连续，那么函数在该点可微。当然，如果两个偏导数都连续（$C^1$），函数必然可微。这是可微的一个重要充分条件。（附图为光滑的猴鞍面，处处满足该条件）",
    points: [
      "定理：某一个偏导数存在而且某一个偏导数连续 $\\implies$ 某一个点附近可微。",
      "如果两个偏导数都连续，则毫无疑问是可微的。",
      "可微代表着在该点附近，函数可以通过一个切平面来进行完美的线性近似。"
    ]
  },
  {
    id: "n-order-partials",
    title: "6. 高阶偏导与混合偏导",
    subtitle: "n阶偏导数存在连续 $\\implies$ 混合偏导相等，n阶可微",
    formula: "f(x,y) = xy \\frac{x^2 - y^2}{x^2 + y^2}",
    func: (x: number, y: number) => {
      if (Math.abs(x) < 1e-10 && Math.abs(y) < 1e-10) return 0;
      return (x * y * (x * x - y * y)) / (x * x + y * y);
    },
    domain: [-2, 2],
    resolution: 120,
    description: "克莱罗定理(Clairaut's theorem)指出，如果函数的 n 阶偏导数存在连续，那么求导的顺序不影响结果（即混合偏导数相等）。图示为一个经典反例：二阶混合偏导数在原点不连续，导致 $f_{xy} \\neq f_{yx}$。",
    points: [
      "计算可得：$f_{xy}(0,0) = -1$，而 $f_{yx}(0,0) = 1$。反证了 n阶偏导数存在连续 的重要性。",
      "定理：如果 n介偏导数存在连续，则它们在定义域内是表现良好的；如果进一步要求 n阶偏导数可导，那么它们也就必定是连续的。",
      "这也保证了在光滑流形和物理学中，微积分操作具有良好的对称性和可预测性。"
    ]
  }
];
