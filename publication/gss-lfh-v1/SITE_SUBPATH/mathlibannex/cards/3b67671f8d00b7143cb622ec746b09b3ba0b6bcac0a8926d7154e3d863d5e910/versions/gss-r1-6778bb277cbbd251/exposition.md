Version 1 source-bound exposition export. Original text SHA-256: 7278b542293aa4e59167dc16d31beba42d95c4038a72ff189a67de6ae7f65b98. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The primitive geometric spectrum

## Statement

The primitive geometric spectrum records the common intersections of the points belonging to each component of the geometric structure space. A primitive geometric point is an actual subset of the original normed space. Repeated intersections give one point, even if they arise from different components.

## Definition

Let $E$ be a normed space over a real-or-complex scalar field $\mathbb K$, with closed unit ball $B_E=\{x\in E:\|x\|\leq1\}$ and continuous $\mathbb K$-linear dual $E^*$. For each nonempty maximal proper real convex face $M$ of $B_E$, define

$$
\begin{aligned}
\Sigma_{\mathbb K}(M)&=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},\\
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f.
\end{aligned}
$$

Here $f|_M=1$ means $f(x)=1$ for every $x\in M$.

A face is a convex subset containing both endpoints of every segment in the ball whose interior meets it; maximality is among proper convex faces. Let $S_{\mathbb K}(E)$ be the family of the resulting subsets $I_{\mathbb K}(M)$, equipped with the following operation on $\mathscr A\subseteq S_{\mathbb K}(E)$:

$$
c_E(\mathscr A)=\left\{I\in S_{\mathbb K}(E):\bigcap_{J\in\mathscr A}J\subseteq I\right\}.
$$

The empty intersection is $E$. Two geometric points $I,J$ are linked when $I=J$ or $c_E(\{I,J\})\ne\{I,J\}$. Their finite-chain equivalence relation is denoted by $\sim_{c_E}$, and

$$
C_E(I)=\{J\in S_{\mathbb K}(E):I\sim_{c_E}J\}
$$

is the component of $I$. For a component set $C$, put

$$
J_C=\bigcap_{I\in C}I.
$$

Define the **primitive geometric spectrum** by

$$
\operatorname{PS}_{\mathbb K}(E)
=\{J_{C_E(I)}:I\in S_{\mathbb K}(E)\}.
$$

This is a family of subsets of $E$. A vector $x$ belongs to $J_C$ precisely when it belongs to every geometric point in $C$. All intersections are set intersections; no subspace or ideal structure is assumed.

## Assumptions

The space $E$ is normed over $\mathbb K$, without a completeness or nontriviality hypothesis. The component construction uses the stated hull–kernel closure. Neither closedness of the component sets nor injectivity of the assignment $C\mapsto J_C$ is assumed.

## Conclusion

The resulting carrier contains exactly the component intersections. The cited properness result follows from

$$
I\in C_E(I)\quad\Longrightarrow\quad
J_{C_E(I)}\subseteq I\ne E.
$$

Thus no primitive geometric point is all of $E$. This permits the separately defined hull–kernel closure: for $\mathscr T\subseteq\operatorname{PS}_{\mathbb K}(E)$,

$$
d_E(\mathscr T)=\left\{J\in\operatorname{PS}_{\mathbb K}(E):
\bigcap_{J'\in\mathscr T}J'\subseteq J\right\}.
$$

The present declaration supplies the carrier; the cited closure declaration supplies $d_E$. For the zero space the carrier is empty. The empty-intersection convention therefore does not introduce an extra primitive point in that case.

## Main citations

- [Geometric points and their closure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=10&start=37&end=65&ranges=37-65#L37): `NormedSpace.geometricStructureFamily` and `NormedSpace.geometricStructureClosure`, lines 37–65; [maximal faces](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Face.lean.html?from=10&start=32&end=39#L32), `NormedSpace.IsMaximalFace`, lines 32–39.
- [Finite-chain components](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=10&start=30&end=71&ranges=30-71#L30): `ClosureSpace.component` and its generating relation, lines 30–71.
- [Intersections and properness](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/ComponentKernel.lean.html?from=10&start=35&end=50&ranges=35-50%2C72-75#L35): `ClosureSpace.HullKernel.componentKernel_ne_univ`, lines 35–50; the intersection family is defined at lines 72–75.
- [Exact carrier and range description](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=10&start=48&end=54&ranges=48-54%2C93-101#L48): `NormedSpace.PrimitiveGeometricSpectrum`, lines 48–54; the range characterization, lines 93–101.
- [Closure and emptiness](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=10&start=109&end=121&ranges=109-121%2C179-199#L109): `NormedSpace.primitiveGeometricSpectrumClosure`, lines 109–121; the zero-space case, lines 179–199.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Definition 4.6 and Theorem 4.7](https://arxiv.org/pdf/2504.05551v1#page=16): component intersections and their closure for nontrivial Banach spaces.

## Lean source signature (exact)

The scalar and normed-space declarations shared by this definition are reproduced separately below.

```lean
def PrimitiveGeometricSpectrum : Type u :=
  {J : Set E // J ∈ primitiveGeometricSpectrumFamily 𝕜 E}
```

| In the source | Mathematical meaning |
| --- | --- |
| `𝕜`, `[RCLike 𝕜]` | The real or complex scalar field $\mathbb K$. |
| `E`, `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]` | A normed vector space $E$ over $\mathbb K$, possibly zero and not necessarily complete. |
| `J : Set E` | A subset $J\subseteq E$, rather than a subset of the geometric point set. |
| `J ∈ primitiveGeometricSpectrumFamily 𝕜 E` | There exists a geometric point $I\in S_{\mathbb K}(E)$ with $J=J_{C_E(I)}=\bigcap_{K\in C_E(I)}K$. The component $C_E(I)$ is formed using $c_E$. |
| `{J : Set E // J ∈ primitiveGeometricSpectrumFamily 𝕜 E}` | The full RHS defines $\operatorname{PS}_{\mathbb K}(E)$ as exactly these intersection subsets with their membership condition. The underlying subset is `J.val`; neither a representative point nor a component witness is stored. |
| `: Type u` | The output is the primitive geometric carrier. Equality is equality of subsets of $E$, so equal intersections give one point; no ideal structure or injectivity of the component-intersection assignment is asserted. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [lines 32–33](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=10&start=32&end=33#L32); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) [RCLike 𝕜]
variable (E : Type u) [NormedAddCommGroup E] [NormedSpace 𝕜 E]
```
