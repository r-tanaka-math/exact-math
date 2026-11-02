Version 1 source-bound exposition export. Original text SHA-256: e63bf868032513bbcb2f6faa8dfa8aa3dca07a0a3a1a9a2e9ed1023a5bada9a1. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The geometric structure closure

## Statement

The geometric structure closure equips the set of geometric points with the hull–kernel rule. It closes a collection of points by intersecting them as subsets of the original vector space and then taking all geometric points containing that intersection.

## Definition

Let $E$ be a normed space over a real-or-complex scalar field $\mathbb K$, and let $E^*$ denote its continuous $\mathbb K$-linear dual. Write $B_E=\{x:\|x\|\leq1\}$. A maximal proper real convex face $M$ of $B_E$ is a nonempty convex subset, different from $B_E$, that contains both endpoints of any segment in $B_E$ whose interior meets $M$, and is maximal among proper convex faces.

Put

$$
\begin{aligned}
\Sigma_{\mathbb K}(M)&=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},\\
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f.
\end{aligned}
$$

Here $f|_M=1$ means $f(x)=1$ for every $x\in M$.

Let $S_{\mathbb K}(E)$ be the set of resulting subsets $I_{\mathbb K}(M)$ as $M$ ranges over these faces. Equal subsets are the same geometric point.

For $\mathscr A\subseteq S_{\mathbb K}(E)$, define

$$
\begin{aligned}
k_E(\mathscr A)&=\bigcap_{J\in\mathscr A}J,\\
c_E(\mathscr A)&=\{I\in S_{\mathbb K}(E):k_E(\mathscr A)\subseteq I\}.
\end{aligned}
$$

The intersection is taken inside $E$, with $k_E(\varnothing)=E$, while $c_E(\mathscr A)$ is a set of geometric points. Each geometric point is proper: any $x$ in a representing face satisfies $f(x)=1$ for all its supporting functionals and hence lies outside their kernel union. The cited hull–kernel construction therefore applies to this family and proves, for all $\mathscr A,\mathscr B\subseteq S_{\mathbb K}(E)$,

$$
\begin{gathered}
\mathscr A\subseteq c_E(\mathscr A),\qquad
\mathscr A\subseteq\mathscr B\Longrightarrow c_E(\mathscr A)\subseteq c_E(\mathscr B),\\
c_E(c_E(\mathscr A))=c_E(\mathscr A),\qquad c_E(\varnothing)=\varnothing.
\end{gathered}
$$

## Assumptions

The space $E$ is normed over $\mathbb K$, without a completeness or nontriviality hypothesis. Properness of every geometric point follows from the defining faces and is supplied internally to the hull–kernel construction.

## Conclusion

The result is the closure space $(S_{\mathbb K}(E),c_E)$. A collection of geometric points is closed when it is fixed by the displayed operation. This operation acts on collections of points; it is distinct from norm closure inside $E$.

The source separately proves $T_0$ (distinct points have distinct singleton closures) and later $T_1$ (every singleton is closed), the latter using incomparability of distinct geometric points under inclusion. Finite-union preservation is not asserted here. For the zero space, the carrier is empty and the same construction applies.

## Main citations

- [Faces, functionals and the point family](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Face.lean.html?from=5&start=32&end=39#L32): `NormedSpace.IsMaximalFace`; [the family and its properness](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=5&start=37&end=54&ranges=37-54#L37), `NormedSpace.geometricStructureFamily` and `NormedSpace.univ_notMem_geometricStructureFamily`, lines 37–54.
- [Exact closure and its membership formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=5&start=57&end=65&ranges=57-65%2C68-86#L57): `NormedSpace.geometricStructureClosure`, lines 57–65; $T_0$ and the zero-space results, lines 68–86.
- [The construction proving the four axioms](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernel.lean.html?from=5&start=69&end=89&ranges=69-89#L69): `ClosureSpace.HullKernel.space`, lines 69–89.
- [Incomparability and singleton closedness](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/FilterPresentation.lean.html?from=5&start=52&end=72&ranges=52-72#L52): `NormedSpace.GeometricStructureSpace.eq_of_subset` and `NormedSpace.isT1_geometricStructureClosure`, lines 52–72.
- [arXiv:2504.05551v1, Definition 4.1](https://arxiv.org/pdf/2504.05551v1#page=14): the same hull–kernel formula on geometric points; the source retains the weaker normed-space assumptions stated here.

## Lean source signature (exact)

The scalar and normed-space declarations used by this definition are reproduced separately below.

```lean
def geometricStructureClosure : ClosureSpace (GeometricStructureSpace 𝕜 E) :=
  ClosureSpace.HullKernel.space (geometricStructureFamily 𝕜 E)
    (univ_notMem_geometricStructureFamily 𝕜 E)
```

| In the source | Mathematical meaning |
| --- | --- |
| `𝕜`, `[RCLike 𝕜]` | The real or complex scalar field $\mathbb K$. |
| `E`, `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]` | A normed vector space $E$ over $\mathbb K$; it may be zero and need not be complete. |
| `GeometricStructureSpace 𝕜 E`, `geometricStructureFamily 𝕜 E` | The point set $S_{\mathbb K}(E)$ and its underlying family of subsets $\mathcal F_{\mathbb K}(E)$, defined by maximal-face support-kernel unions. |
| `ClosureSpace.HullKernel.space (geometricStructureFamily 𝕜 E)` | The defining construction gives $c_E(\mathscr A)=\{I\in S_{\mathbb K}(E):\bigcap_{J\in\mathscr A}J\subseteq I\}$ for every subfamily $\mathscr A$; an empty intersection is $E$. |
| `univ_notMem_geometricStructureFamily 𝕜 E` | The cited properness theorem supplies $E\notin\mathcal F_{\mathbb K}(E)$. It is a proved input to the constructor, not an additional hypothesis on $E$. |
| `: ClosureSpace (GeometricStructureSpace 𝕜 E)` | The returned object is the operation $c_E$ together with extensivity, monotonicity, idempotence and $c_E(\varnothing)=\varnothing$. Finite-union preservation is not asserted. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [lines 32–33](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=5&start=32&end=33#L32); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) [RCLike 𝕜]
variable (E : Type u) [NormedAddCommGroup E] [NormedSpace 𝕜 E]
```
