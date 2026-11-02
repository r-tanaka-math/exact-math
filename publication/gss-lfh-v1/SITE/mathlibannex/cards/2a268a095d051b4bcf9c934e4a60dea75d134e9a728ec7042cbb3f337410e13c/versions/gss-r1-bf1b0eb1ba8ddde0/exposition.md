Version 1 source-bound exposition export. Original text SHA-256: 6315fdbb173841f94e865ab87fd07bb8693b9fca792fdff8a8b52b98f2409921. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Points of the geometric structure space

## Statement

The geometric structure space of a normed space has as its points the support-kernel unions arising from maximal proper real convex faces of the closed unit ball. A point is the resulting subset of the vector space. Faces yielding the same subset represent the same point.

## Definition

Let $E$ be a normed space over a real-or-complex scalar field $\mathbb K$, with closed unit ball $B_E=\{x\in E:\|x\|\leq1\}$. Let $\mathfrak M_E$ be the family of maximal proper real convex faces of $B_E$. Explicitly, a member $M$ is a nonempty convex subset of $B_E$, different from $B_E$, such that

$$
\begin{gathered}
x,y\in B_E,\quad 0<t<1,\quad (1-t)x+ty\in M\\
\Longrightarrow\quad x,y\in M,
\end{gathered}
$$

and every proper convex face containing $M$ equals $M$. The scalar $t$ is real, including when $\mathbb K$ is complex.

Write $E^*$ for the continuous $\mathbb K$-linear dual. For $M\in\mathfrak M_E$, define

$$
\begin{aligned}
\Sigma_{\mathbb K}(M)&=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},\\
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f.
\end{aligned}
$$

Here $f|_M=1$ means $f(x)=1$ for every $x\in M$.

The family of geometric points is

$$
\mathcal F_{\mathbb K}(E)=\{I_{\mathbb K}(M):M\in\mathfrak M_E\}.
$$

The **geometric structure space** $S_{\mathbb K}(E)$ has precisely these subsets as its points. Thus an element $I\in S_{\mathbb K}(E)$ is a subset $I\subseteq E$ with a face $M$ satisfying $I=I_{\mathbb K}(M)$. Choosing a representing face does not add data to the point. The assignment $M\mapsto I_{\mathbb K}(M)$ is not asserted to be injective.

## Assumptions

The space $E$ is normed over $\mathbb K$; completeness and nontriviality are not required. Convexity and the face condition are taken over the reals. Exposedness and supporting-functional existence are not additional conditions on the maximal-face predicate.

## Conclusion

The resulting point set is $S_{\mathbb K}(E)$. Each point is a proper subset of $E$: if $I=I_{\mathbb K}(M)$ and $x\in M$, then $f(x)=1$ for every $f\in\Sigma_{\mathbb K}(M)$, so $x\notin I$. Consequently $E\notin\mathcal F_{\mathbb K}(E)$, as required by the later hull–kernel closure construction.

The cited zero-space result gives $S_{\mathbb K}(E)=\varnothing$ when $E=\{0\}$. The present declaration specifies the points; the closure operation is a separate construction.

## Main citations

- [Maximal proper real convex faces](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Face.lean.html?from=4&start=32&end=39&ranges=32-39%2C45-52#L32): `NormedSpace.IsMaximalFace`, lines 32–39; its zero-space exclusion, lines 45–52.
- [Supporting functionals and their kernel union](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=4&start=42&end=43&ranges=42-43%2C108-109%2C130-142#L42): `NormedSpace.supportFunctionals`, lines 42–43; `NormedSpace.supportKernelUnion`, lines 108–109, and properness, lines 130–142.
- [The family and the exact point type](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=4&start=37&end=54&ranges=37-54%2C73-86#L37): `NormedSpace.geometricStructureFamily` and `NormedSpace.GeometricStructureSpace`, lines 37–54; the zero-space result, lines 73–86.
- [arXiv:2504.05551v1, Definition 4.1](https://arxiv.org/pdf/2504.05551v1#page=14): the face-based construction. The formal source separates its carrier from its closure and allows normed spaces without completeness or nontriviality.

## Lean source signature (exact)

The following definition and the related family definition share the surrounding scalar and space context reproduced below.

```lean
def GeometricStructureSpace : Type u := {I : Set E // I ∈ geometricStructureFamily 𝕜 E}
```

| In the source | Mathematical meaning |
| --- | --- |
| `𝕜`, `[RCLike 𝕜]` | The real or complex scalar field $\mathbb K$. |
| `E`, `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]` | A normed vector space $E$ over $\mathbb K$; it may be zero and need not be complete. |
| `I : Set E` | A subset $I\subseteq E$, regarded as a possible geometric point. |
| `I ∈ geometricStructureFamily 𝕜 E` | The condition $I\in\mathcal F_{\mathbb K}(E)$: there exists a maximal proper real convex face $M$ of the closed unit ball with $I_{\mathbb K}(M)=I$. |
| `{I : Set E // I ∈ geometricStructureFamily 𝕜 E}` | The complete defining type $S_{\mathbb K}(E)$ consists of such subsets with their membership condition. A point `p` has underlying subset `p.val`; no chosen face is stored. |
| `: Type u` | The output is the point set $S_{\mathbb K}(E)$, before any closure-space structure is attached. |

**Related definition — separate exact excerpt.** The family used above is defined at lines 37–39 of the same source file.

```lean
def geometricStructureFamily : Set (Set E) :=
  letI : NormedSpace ℝ E := NormedSpace.restrictScalars ℝ 𝕜 E
  {I | ∃ F : Set E, IsMaximalFace F ∧ supportKernelUnion 𝕜 F = I}
```

| In the source | Mathematical meaning |
| --- | --- |
| `letI ... := NormedSpace.restrictScalars ℝ 𝕜 E` | Convexity and faces use the real vector-space structure induced from the given $\mathbb K$-space; this is not an extra choice or assumption. |
| `∃ F : Set E, IsMaximalFace F ∧ supportKernelUnion 𝕜 F = I` | One subset $M$ must satisfy both conditions: it is a maximal proper real convex face of the closed unit ball and its support-kernel union equals $I$. Here the source name `F` denotes $M$. |
| `: Set (Set E)` | The full RHS defines the family $\mathcal F_{\mathbb K}(E)$ of resulting subsets. Equal subsets give the same member even when their witnessing faces differ; no face is chosen as part of the output. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [lines 32–33](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=4&start=32&end=33#L32); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) [RCLike 𝕜]
variable (E : Type u) [NormedAddCommGroup E] [NormedSpace 𝕜 E]
```
