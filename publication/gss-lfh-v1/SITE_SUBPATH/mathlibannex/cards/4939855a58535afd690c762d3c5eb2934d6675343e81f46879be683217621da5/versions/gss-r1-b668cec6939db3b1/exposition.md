Version 1 source-bound exposition export. Original text SHA-256: 073f26566ac963c3defe0e168017934cfc55a6f0186bc8955fc1de32edb21dd7. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The geometric spectrum

## Statement

The geometric spectrum of a normed space is the set of finite-chain components of its geometric structure space. Each spectrum point is an actual component subset. Two choices of a geometric point in the same component give one spectrum point.

## Definition

Let $E$ be a normed space over a real-or-complex scalar field $\mathbb K$, with closed unit ball $B_E=\{x\in E:\|x\|\leq1\}$ and continuous $\mathbb K$-linear dual $E^*$. For each nonempty maximal proper real convex face $M$ of $B_E$, put

$$
\begin{aligned}
\Sigma_{\mathbb K}(M)&=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},\\
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f.
\end{aligned}
$$

Here $f|_M=1$ means $f(x)=1$ for every $x\in M$.

Here a face is a convex subset containing both endpoints of any segment in the ball whose interior meets it; maximality is among proper convex faces. The geometric point set $S_{\mathbb K}(E)$ consists of the resulting subsets $I_{\mathbb K}(M)$, with equal subsets regarded as the same point. Its hull–kernel closure is

$$
\begin{gathered}
c_E(\mathscr A)=\left\{I\in S_{\mathbb K}(E):\bigcap_{J\in\mathscr A}J\subseteq I\right\},\\
\mathscr A\subseteq S_{\mathbb K}(E),
\end{gathered}
$$

where the empty intersection is $E$.

For $I,J\in S_{\mathbb K}(E)$, write $I\leftrightarrow_{c_E}J$ when $I=J$ or $c_E(\{I,J\})\ne\{I,J\}$. Write $I\sim_{c_E}J$ when they can be joined by a finite chain of these linked pairs, allowing a chain with no steps. Define

$$
\begin{aligned}
C_E(I)&=\{J\in S_{\mathbb K}(E):I\sim_{c_E}J\},\\
\operatorname{GS}_{\mathbb K}(E)&=\{C_E(I):I\in S_{\mathbb K}(E)\}.
\end{aligned}
$$

The second set is the **geometric spectrum**. Its elements are subsets of $S_{\mathbb K}(E)$, while the members of each such subset are themselves subsets of $E$. Equality of spectrum points means equality of component sets.

## Assumptions

The space $E$ is normed over $\mathbb K$. Completeness and nontriviality are not required. The component relation is formed using $c_E$; it does not assume that this closure preserves finite unions.

## Conclusion

The declaration supplies the point set $\operatorname{GS}_{\mathbb K}(E)$. Every member is nonempty, because $I\in C_E(I)$. The separately cited projection

$$
q_E:S_{\mathbb K}(E)\longrightarrow\operatorname{GS}_{\mathbb K}(E),
\qquad q_E(I)=C_E(I),
$$

is surjective, and $C_E(I)=C_E(J)$ exactly when $I\sim_{c_E}J$. This makes explicit how the same component is independent of its chosen starting point.

For the zero space, the geometric spectrum is empty. Its closure structure is defined separately from this carrier; it uses the intersections of component members. The component $C_E(I)$ itself is not replaced by its closure $c_E(C_E(I))$.

## Main citations

- [The geometric points and their closure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=9&start=37&end=65&ranges=37-65#L37): `NormedSpace.geometricStructureFamily`, `NormedSpace.GeometricStructureSpace` and `NormedSpace.geometricStructureClosure`, lines 37–65; [the face predicate](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Face.lean.html?from=9&start=32&end=39#L32), `NormedSpace.IsMaximalFace`, lines 32–39.
- [Linked pairs and finite-chain components](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=9&start=30&end=71&ranges=30-71#L30): `ClosureSpace.Linked`, `ClosureSpace.Related` and `ClosureSpace.component`, lines 30–71.
- [The component family and equality criterion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/ComponentQuotient.lean.html?from=9&start=30&end=44&ranges=30-44#L30): `ClosureSpace.component_eq_iff_related` and `ClosureSpace.componentFamily`, lines 30–44.
- [Exact spectrum carrier and the projection](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=9&start=36&end=41&ranges=36-41%2C57-58%2C81-82#L36): `NormedSpace.geometricSpectrumFamily` and `NormedSpace.GeometricSpectrum`, lines 36–41; `NormedSpace.toGeometricSpectrum`, lines 57–58, and its surjectivity, lines 81–82.
- [Separate closure and zero-space results](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=9&start=114&end=115&ranges=114-115%2C169-192#L114): `NormedSpace.geometricSpectrumClosure`, lines 114–115; emptiness of the carrier, lines 169–192.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Definition 4.6](https://arxiv.org/pdf/2504.05551v1#page=16): the component-set realization of the geometric spectrum. The formal source allows the weaker normed-space assumptions above.

## Lean source signature (exact)

The scalar and normed-space declarations shared by this definition are reproduced separately below.

```lean
def GeometricSpectrum : Type u :=
  {C : Set (GeometricStructureSpace 𝕜 E) // C ∈ geometricSpectrumFamily 𝕜 E}
```

| In the source | Mathematical meaning |
| --- | --- |
| `𝕜`, `[RCLike 𝕜]` | The real or complex scalar field $\mathbb K$. |
| `E`, `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]` | A normed vector space $E$ over $\mathbb K$, possibly zero and not necessarily complete. |
| `GeometricStructureSpace 𝕜 E` | The geometric point set $S_{\mathbb K}(E)$ of maximal-face support-kernel unions, equipped in the component construction with $c_E$. |
| `C : Set (GeometricStructureSpace 𝕜 E)` | A possible component subset $C\subseteq S_{\mathbb K}(E)$; its members are themselves subsets of $E$. |
| `C ∈ geometricSpectrumFamily 𝕜 E` | There exists $I\in S_{\mathbb K}(E)$ such that $C=C_E(I)$, where $C_E(I)$ is the finite-chain component for $c_E$. |
| `{C : Set ... // C ∈ geometricSpectrumFamily 𝕜 E}` | The full defining type $\operatorname{GS}_{\mathbb K}(E)$ contains exactly those component subsets with their membership condition. The underlying component is `C.val`; no representative $I$ is stored. |
| `: Type u` | The output is the spectrum carrier. The spectrum closure and the surjective map $q_E$ are separately defined or proved, as cited above. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [lines 32–33](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=9&start=32&end=33#L32); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) [RCLike 𝕜]
variable (E : Type u) [NormedAddCommGroup E] [NormedSpace 𝕜 E]
```
