Version 1 source-bound exposition export. Original text SHA-256: b59ffeb803514c424d232797483ab72373304f0cb55544840a6bc832bf34aeac. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Unions of kernels of supporting functionals

## Statement

For a subset of a seminormed space, consider the contractive continuous linear functionals that equal $1$ throughout that subset. The support-kernel union consists of the vectors annihilated by at least one of these functionals. It is a union of kernels, with no assertion that the union is a vector subspace.

## Definition

Let $E$ be a seminormed space over a real-or-complex scalar field $\mathbb K$, and let $E^*$ be its continuous $\mathbb K$-linear dual with the operator norm. For $M\subseteq E$, put

$$
\Sigma_{\mathbb K}(M)=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},
$$

where $f|_M=1$ means $f(x)=1$ for every $x\in M$. Define

$$
\begin{aligned}
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f\\
&=\{y\in E:\exists f\in\Sigma_{\mathbb K}(M),\ f(y)=0\}.
\end{aligned}
$$

Thus membership requires one witnessing functional. It does not require all supporting functionals to vanish. For nonempty $M$, the condition $f|_M=1$ is equivalent to $f(M)=\{1\}$. The pointwise formulation also covers $M=\varnothing$.

The cited elementary identities make the empty cases explicit:

$$
\begin{aligned}
\Sigma_{\mathbb K}(M)=\varnothing&\Longrightarrow I_{\mathbb K}(M)=\varnothing,\\
0\in I_{\mathbb K}(M)&\Longleftrightarrow\Sigma_{\mathbb K}(M)\ne\varnothing,\\
I_{\mathbb K}(\varnothing)&=E.
\end{aligned}
$$

The last equality follows because the zero functional belongs to $\Sigma_{\mathbb K}(\varnothing)$ and has kernel $E$.

## Assumptions

The space $E$ may have a seminorm: definiteness and completeness are not required. The subset $M$ is arbitrary. It need not be nonempty, convex or contained in the unit ball, and the definition does not assume that a supporting functional exists.

## Conclusion

The output is the subset $I_{\mathbb K}(M)$ of $E$. For each $x\in M$, a supporting functional has $f(x)=1$, so it cannot also annihilate $x$. Consequently

$$
M\cap I_{\mathbb K}(M)=\varnothing,
\qquad M\ne\varnothing\Longrightarrow I_{\mathbb K}(M)\ne E.
$$

This properness result, proved in the cited source, is what later permits the hull–kernel construction for maximal faces.

## Main citations

- [The supporting family and its nonempty image characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=3&start=42&end=43&ranges=42-43%2C59-78#L42): `NormedSpace.supportFunctionals`, lines 42–43; the equivalence for nonempty subsets is at lines 59–78.
- [Exact union and union-of-kernels formula](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=3&start=108&end=122&ranges=108-122#L108): `NormedSpace.supportKernelUnion`, lines 108–122.
- [Disjointness, properness and the empty cases](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=3&start=130&end=161&ranges=130-161#L130): lines 130–161.
- [The real-or-complex scalar interface](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/mathlib-360da6fa66c1/Mathlib/Analysis/RCLike/Basic.lean.html?from=3&start=60&end=84#L60): Mathlib `RCLike`, at the pinned mathlib commit.
- [arXiv:2504.05551v1, Definition 4.1](https://arxiv.org/pdf/2504.05551v1#page=14): the support-kernel union for maximal faces of a nontrivial Banach space. The present declaration allows arbitrary subsets of seminormed spaces.

## Lean source signature (exact)

The exact definition uses the scalar and space declarations reproduced separately below.

```lean
def supportKernelUnion (F : Set E) : Set E :=
  {x | ∃ f ∈ supportFunctionals 𝕜 F, f x = 0}
```

| In the source | Mathematical meaning |
| --- | --- |
| `𝕜`, `[RCLike 𝕜]` | The scalar field $\mathbb K$ is real or complex. |
| `E`, `[SeminormedAddCommGroup E]`, `[NormedSpace 𝕜 E]` | $E$ is a seminormed vector space over $\mathbb K$; completeness and a nonzero vector are not assumed. |
| `F : Set E` | The arbitrary subset $M\subseteq E$, possibly empty. |
| `supportFunctionals 𝕜 F` | $\Sigma_{\mathbb K}(M)=\{f\in E^*: \|f\|\leq1,\ f(x)=1\text{ for every }x\in M\}$, where $E^*$ is the continuous linear dual (`StrongDual 𝕜 E`). |
| `{x \| ∃ f ∈ supportFunctionals 𝕜 F, f x = 0}` | The full defining subset $I_{\mathbb K}(M)=\{x\in E:\exists f\in\Sigma_{\mathbb K}(M),\ f(x)=0\}$. For each vector $x$, one functional must satisfy both supporting conditions and annihilate $x$. |
| `: Set E` | The output is a subset of $E$, the union of these kernels. It is not bundled as a linear subspace, and the supporting family need not be nonempty. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [lines 26–27](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=3&start=26&end=27#L26); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) [RCLike 𝕜]
variable {E : Type u} [SeminormedAddCommGroup E] [NormedSpace 𝕜 E]
```
