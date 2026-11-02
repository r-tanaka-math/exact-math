Version 1 source-bound exposition export. Original text SHA-256: 93672e6e84142a7f5560b54c9b5181a54a5c3dda8822d0aa1da5752baee06655. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A representation component is the full coefficient-kernel family

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, with no identity required, and let $\pi:A\to\mathcal B(H)$ be a nonzero irreducible $\ast$-representation on a complete complex Hilbert space. The inner product is conjugate-linear in its first argument. For nonzero $p,q\in H$, put

$$
f^\pi_{p,q}(a)=\langle q,\pi(a)(p)\rangle,
\qquad \mathcal F_\pi=\{\ker f^\pi_{p,q}:p,q\ne0\}.
$$

Write $S(A)$ for the geometric structure space of $A$. In this C*-algebra setting its points are precisely $\ker\rho$, where $\rho$ is extreme, for real convexity, in the closed unit ball of the Banach dual; [the extreme-kernel identification](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=19&start=49&end=65#L49) guarantees this description from the original face definition. For $\mathcal T\subseteq S(A)$, its closure is

$$
c_A(\mathcal T)=\left\{I\in S(A):\bigcap_{J\in\mathcal T}J\subseteq I\right\}.
$$

Two points are linked if they are equal or their pair is not closed. Let $C(I)$ be the equivalence class of $I$ under finite chains of linked points. Then, for every nonzero $x,y\in H$,

$$
C(\ker f^\pi_{x,y})=\mathcal F_\pi.
$$

## Assumptions

The source uses the compatible C*-order on $A$. Irreducibility includes nonzero action and excludes proper nonzero closed reducing subspaces. No faithfulness, finite dimension or separability is required. Under this irreducibility hypothesis, $\ker f^\pi_{p,q}$ is a point of $S(A)$ for every $p,q\ne0$. The component is defined by the closure relation above, without assuming that $c_A$ is a topological closure.

## Conclusion

Every point of the entire component, including one initially presented without reference to $\pi$, is a coefficient kernel of this fixed representation. Conversely, every pair of nonzero coefficient vectors gives a point of the component. Thus the choice of the initial pair $(x,y)$ has no effect on this component. This is an equality of subsets of $S(A)$; it does not identify an individual coefficient kernel with $\ker\pi$.

## Main citations

- [Exact whole-component theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/RepresentationComponents.lean.html?from=19&start=118&end=150#L118): `MathlibAnnex.Analysis.CStarAlgebra.NonUnitalCStarRepresentation.component_matrixCoefficientKernel_eq_family`.
- [Component–representation correspondence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/RepresentationComponents.lean.html?from=19&start=104&end=113#L104): the equivalence between finite-chain components and unitary equivalence.
- [The coefficient-kernel family and its same-component inclusion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CoefficientFamily.lean.html?from=19&start=39&end=41#L39): `matrixCoefficientKernelFamily` and `matrixCoefficientKernelFamily_subset_component`.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Lemma 5.10](https://arxiv.org/abs/2504.05551v1). The present declaration gives the component formula for an arbitrary irreducible representation; the pure-state specialization and the intersection calculation have separate explanations.

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem component_matrixCoefficientKernel_eq_family
    (pi : NonUnitalCStarRepresentation A H) (hpi : pi.IsIrreducible)
    (x y : H) (hx : x ≠ 0) (hy : y ≠ 0) :
    (NormedSpace.geometricStructureClosure ℂ A).component
      (matrixCoefficientKernel pi hpi x y hx hy) = matrixCoefficientKernelFamily pi hpi
```

| In the source | Mathematical meaning |
|---|---|
| [Algebra and order](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cfac10adc682588763e2ae6326f6b0d05659d27f862faee2c7797548c83dff06/versions/gss-r1-e799bba24301220d/index.html#card-19--source-row-0)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]`<br>`variable [PartialOrder A] [StarOrderedRing A]` | The nonzero complex C*-algebra $A$ with its compatible order; no identity is required. |
| [Representation space](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cfac10adc682588763e2ae6326f6b0d05659d27f862faee2c7797548c83dff06/versions/gss-r1-e799bba24301220d/index.html#card-19--source-row-1)<br>`variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]` | The complex Hilbert space $H$ is complete. |
| [One irreducible representation](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cfac10adc682588763e2ae6326f6b0d05659d27f862faee2c7797548c83dff06/versions/gss-r1-e799bba24301220d/index.html#card-19--source-row-2)<br>`    (pi : NonUnitalCStarRepresentation A H) (hpi : pi.IsIrreducible)` | The same fixed nonzero irreducible representation $\pi:A\to\mathcal B(H)$ supplies all coefficient kernels. It need not be faithful. |
| [Starting vectors](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cfac10adc682588763e2ae6326f6b0d05659d27f862faee2c7797548c83dff06/versions/gss-r1-e799bba24301220d/index.html#card-19--source-row-3)<br>`    (x y : H) (hx : x ≠ 0) (hy : y ≠ 0) :` | The starting pair is $x,y\in H\setminus\{0\}$, without a normalization assumption. |
| [Component and full family](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cfac10adc682588763e2ae6326f6b0d05659d27f862faee2c7797548c83dff06/versions/gss-r1-e799bba24301220d/index.html#card-19--source-row-4)<br>`    (NormedSpace.geometricStructureClosure ℂ A).component`<br>`      (matrixCoefficientKernel pi hpi x y hx hy) = matrixCoefficientKernelFamily pi hpi := by` | The component is taken in the ambient closure $c_A$, starting at $\ker f^\pi_{x,y}$. The complete equality is $$C(\ker f^\pi_{x,y})=\mathcal F_\pi.$$ It concerns all points of that component, not just kernels chosen in advance. |
| [The coefficient-kernel family](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cfac10adc682588763e2ae6326f6b0d05659d27f862faee2c7797548c83dff06/versions/gss-r1-e799bba24301220d/index.html#card-19--source-row-5)<br>`def matrixCoefficientKernelFamily (pi : NonUnitalCStarRepresentation A H) (hpi : pi.IsIrreducible) :`<br>`    Set (NormedSpace.GeometricStructureSpace ℂ A) :=`<br>`  {I \| ∃ (x y : H) (hx : x ≠ 0) (hy : y ≠ 0), matrixCoefficientKernel pi hpi x y hx hy = I}` | A point $I\in S(A)$ belongs to $\mathcal F_\pi$ exactly when there are $p,q\in H\setminus\{0\}$ with $I=\ker f^\pi_{p,q}$. The vectors may depend on $I$; the representation is the same $\pi$ throughout. |

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Exact surrounding source:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```

Exact surrounding source:

```lean
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```
