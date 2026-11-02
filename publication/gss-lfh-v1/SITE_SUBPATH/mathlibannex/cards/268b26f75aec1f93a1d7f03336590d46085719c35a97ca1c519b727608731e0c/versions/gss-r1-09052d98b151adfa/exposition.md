Version 1 source-bound exposition export. Original text SHA-256: 56886c45bc5966c2b6f456a684f93e65b6c8d88da20928d419fbe0149abd22d7. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Forward continuity of normal parts preserves Hilbert-basis cardinality

## Statement

Let $H,K$ be complex Hilbert spaces. Let $A_1\subseteq\mathcal B(H)$ and $A_2\subseteq\mathcal B(K)$ be nonzero norm-closed complex $\ast$-subalgebras acting irreducibly on $H$ and $K$, respectively. No unit is required. The inner product is linear in its second variable. For $x,y\in H\setminus\{0\}$ and $z,w\in K\setminus\{0\}$, define the bounded linear functionals
$f^{A_1}_{x,y}:A_1\to\mathbb C$ and $f^{A_2}_{z,w}:A_2\to\mathbb C$ by
$f^{A_1}_{x,y}(a)=\langle y,a(x)\rangle$ and $f^{A_2}_{z,w}(b)=\langle w,b(z)\rangle$.
Their kernels form the normal parts

$$
 N(A_1)=\{\ker f^{A_1}_{x,y}:x,y\in H\setminus\{0\}\},\qquad
 N(A_2)=\{\ker f^{A_2}_{z,w}:z,w\in K\setminus\{0\}\}.
\tag{1}
$$

Write $c_{A_1}$ and $c_{A_2}$ for the relative geometric closures on these normal parts. Thus, for $\mathcal D\subseteq N(A_1)$,
$c_{A_1}(\mathcal D)=\{I\in N(A_1):\bigcap_{J\in\mathcal D}J\subseteq I\}$, and similarly for $A_2$.
Let $e:N(A_1)\to N(A_2)$ be a bijection satisfying
$e(c_{A_1}(\mathcal D))=c_{A_2}(e(\mathcal D))$ for every finite $\mathcal D\subseteq N(A_1)$.
This is the finite-homeomorphism condition. Assume in addition that its forward map is fully continuous:

$$
 e(c_{A_1}(\mathcal D))\subseteq c_{A_2}(e(\mathcal D))
       \qquad(\mathcal D\subseteq N(A_1)).
\tag{2}
$$

For any Hilbert bases $b=(b_i)_{i\in\iota}$ of $H$ and $c=(c_j)_{j\in\kappa}$ of $K$, their index cardinalities satisfy

$$
 |\iota|=|\kappa|.
\tag{3}
$$

The invariant is Hilbert-basis index cardinality, not the cardinality of the vector spaces as sets and not their Hamel dimension.


## Assumptions

The bases are arbitrary complete orthonormal families. They need not be countable, and neither space is assumed separable. No infinite-dimensionality, same-type condition on two projective factors, or full continuity of $e^{-1}$ is assumed. Dimensions one and two are included through the finite-dimensional branch. The inclusion representations are nonzero and irreducible, and the algebras are norm closed; unitality is not added.


## Conclusion

Forward full continuity preserves Hilbert-basis index cardinality, without assuming full continuity of the inverse. The conclusion neither chooses a basis-to-basis map nor asserts an isometry.


## Main citations

The [normal-part definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=42&start=35&end=38#L35) and [coefficient-kernel membership theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=42&start=64&end=79#L64) identify (1) under the stated closedness and irreducibility assumptions.

The [Hilbert-dimension theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartHilbertDimension.lean.html?from=42&start=66&end=79#L66) gives (3) from forward full continuity. The related results are the [finite-dimensional comparison](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectiveDimension.lean.html?from=42&start=215&end=221#L215), the [continuous first lift and its inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearBounded.lean.html?from=42&start=94&end=143#L94), and [Hilbert-basis comparison](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/InnerProductSpace/HilbertBasisCardinality.lean.html?from=42&start=200&end=220#L200).


## Lean source signature (exact)

The preceding `variable` declarations introduce the two Hilbert spaces, the closed algebras, their irreducible actions, and `e`. The `include hS hT in` at [the effective inclusion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartHilbertDimension.lean.html?from=42&start=61&end=61#L61) retains the irreducibility assumptions for this theorem. The map `e` is also a parameter because it occurs in `hcont`; `e.toEquiv` is the same bijection with its finite-continuity fields omitted. The following contiguous prefix ends before the proof assignment.

```lean
theorem hilbertBasis_lift_mk_eq_of_normalPart_continuous
    (hcont : ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous
      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) e.toEquiv)
    (b : HilbertBasis ι ℂ H) (c : HilbertBasis κ ℂ K) :
    Cardinal.lift.{uJ} (#ι) = Cardinal.lift.{uI} (#κ)
```

In the source, `S` and `T` denote the algebras $A_1$ and $A_2$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [Two Hilbert spaces and basis indices](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-0)<br>`universe u v uI uJ`<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable {ι : Type uI} {κ : Type uJ}` | The spaces $H,K$ are complex Hilbert spaces, including completeness. The sets $\iota,\kappa$ index their Hilbert bases. |
| [Closed irreducible operator algebras](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-1)<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The algebras $A_1,A_2$ are norm-closed complex $\ast$-subalgebras of $\mathcal B(H),\mathcal B(K)$. Their inclusion representations are nonzero and irreducible. No unit is required. |
| [The same finite comparison of normal parts](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-2)<br>`variable (e : ClosureSpace.FiniteHomeomorph`<br>`  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))` | The relative closures $c_{A_1},c_{A_2}$ are those on $N(A_1),N(A_2)$, rather than on the whole geometric structure spaces. One bijection $e:N(A_1)\to N(A_2)$ satisfies, for every finite $\mathcal D\subseteq N(A_1)$, $$e(c_{A_1}(\mathcal D))=c_{A_2}(e(\mathcal D)).$$ |
| [Effective irreducibility assumptions](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-3)<br>`include hS hT in` | The preceding inclusion retains both irreducibility assumptions as theorem parameters. The already declared $e$ is also a parameter because it occurs in the following continuity assumption. |
| [Forward continuity for all subsets](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-4)<br>`    (hcont : ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous`<br>`      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) e.toEquiv)` | The same bijection $e$ is fully continuous in the forward direction: for every $\mathcal D\subseteq N(A_1)$, $$e(c_{A_1}(\mathcal D))\subseteq c_{A_2}(e(\mathcal D)).$$ This is (2); full continuity of $e^{-1}$ is not an input. |
| [Arbitrary Hilbert bases](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-5)<br>`    (b : HilbertBasis ι ℂ H) (c : HilbertBasis κ ℂ K) :` | The bases are $b=(b_i)_{i\in\iota}$ of $H$ and $c=(c_j)_{j\in\kappa}$ of $K$: arbitrary complete orthonormal families. |
| [Equality of basis-index cardinalities](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-6)<br>`    Cardinal.lift.{uJ} (#ι) = Cardinal.lift.{uI} (#κ) := by` | The two basis-index sets have the same cardinality: $$|\iota|=|\kappa|,$$ as in (3). The lifts allow Lean to compare cardinalities belonging to different universes. This is Hilbert-basis cardinality, not Hamel dimension or the cardinality of the vector spaces as sets. |
| [Finite continuity of the map and its inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/268b26f75aec1f93a1d7f03336590d46085719c35a97ca1c519b727608731e0c/versions/gss-r1-09052d98b151adfa/index.html#card-42--source-row-7)<br>`structure FiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  finitelyContinuous_toFun : c.FinitelyContinuous d toFun`<br>`  finitelyContinuous_invFun : d.FinitelyContinuous c invFun` | The inherited equivalence gives $e$ and $e^{-1}$. Its fields require finite continuity in both directions: for finite $\mathcal D\subseteq N(A_1)$ and finite $\mathcal E\subseteq N(A_2)$, respectively, $$e(c_{A_1}(\mathcal D))\subseteq c_{A_2}(e(\mathcal D)),$$ $$e^{-1}(c_{A_2}(\mathcal E))\subseteq c_{A_1}(e^{-1}(\mathcal E)).$$ This is the finite-homeomorphism condition used in the Statement. |

### Source context (separate exact excerpts)

[NormalPartHilbertDimension.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartHilbertDimension.lean.html#L31):

```lean
universe u v uI uJ
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]
variable {ι : Type uI} {κ : Type uJ}
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))
variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))
variable (e : ClosureSpace.FiniteHomeomorph
  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))
  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))
```

[NormalPartHilbertDimension.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartHilbertDimension.lean.html#L61):

```lean
include hS hT in
```

