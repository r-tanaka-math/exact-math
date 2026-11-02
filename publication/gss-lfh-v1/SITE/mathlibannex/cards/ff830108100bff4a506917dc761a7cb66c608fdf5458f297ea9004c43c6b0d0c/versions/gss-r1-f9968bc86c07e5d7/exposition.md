Version 1 source-bound exposition export. Original text SHA-256: e1b050edf4dff7a8fb0ae08438d2bd110742370a7728e95760383a142477eaba. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Maximal linked families are projective fibers

## Statement

Let $H$ be a complex Hilbert space, and let $A\subseteq\mathcal B(H)$ be a nonzero norm-closed complex $\ast$-subalgebra acting irreducibly on $H$. No identity is required. For $x,y\in H\setminus\{0\}$, define $f_{x,y}:A\to\mathbb C$ by $f_{x,y}(a)=\langle y,a(x)\rangle$. The inner product is conjugate-linear in its first variable. The normal part is $N(A)=\{\ker f_{x,y}:x,y\in H\setminus\{0\}\}$.

Let $\mathbb P(H)$ be the set of one-dimensional complex subspaces of $H$, with $[x]=\mathbb Cx$ for $x\ne0$. The [projective-coordinate equivalence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=34&start=77&end=83#L77) is the bijection $e:\mathbb P(H)\times\mathbb P(H)\to N(A)$ with $e([x],[y])=\ker f_{x,y}$, as given by its [coefficient-kernel formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=34&start=89&end=96#L89).

For $D\subseteq N(A)$, use the inherited closure $c(D)=\{I\in N(A):\bigcap_{J\in D}J\subseteq I\}$. A set is pairwise linked if any two distinct members form a nonclosed two-point set. This is equivalent to requiring the linked relation, which also includes equality, for every pair of members. For $p,q\in\mathbb P(H)$ define the source and target fibers

$$
\mathcal R_p=\{e(p,t):t\in\mathbb P(H)\},\qquad
\mathcal C_q=\{e(t,q):t\in\mathbb P(H)\}.
\tag{1}
$$

For any $L\subseteq N(A)$,

$$
\begin{aligned}
L\text{ is maximal among pairwise-linked sets}
\quad\Longleftrightarrow\quad &
(\exists p\in\mathbb P(H),\ L=\mathcal R_p)\\
&\text{or }(\exists q\in\mathbb P(H),\ L=\mathcal C_q).
\end{aligned}
\tag{2}
$$


## Assumptions

Maximality is with respect to inclusion, among pairwise-linked subsets of the same normal part. There is no hypothesis that $L$ is closed, finite, or initially nonempty. The nonzero-action hypothesis excludes the zero Hilbert space. Dimension one is allowed; no lower bound of two is added.


## Conclusion

Every maximal family fixes either the source projective line or the target projective line, and every fiber in (1) is maximal. The two descriptions need not be different: in dimension one both fibers are the whole singleton normal part. No uniqueness between the two alternatives of (2) is asserted.


## Main citations

- [The projective-product bijection](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=34&start=77&end=83#L77): every point has a unique ordered pair of projective coordinates.
- [The linked-pair criterion](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartLinked.lean.html?from=34&start=210&end=239#L210): two coefficient kernels are linked exactly when their source lines or their target lines agree.
- [Exact maximal-family theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartLinkedSet.lean.html?from=34&start=178&end=205#L178): the equivalence (2) for all subsets of the normal part.
- [arXiv:2504.05551v1, Definition 6.11 and Lemma 6.13](https://arxiv.org/abs/2504.05551v1): pairwise-linked sets and their maximal fibers; dimension one is included.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem maximal_isLinkedSet_normalPart_iff (L : Set (normalPart S)) :
    Maximal
      ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).IsLinkedSet L ↔
      (∃ p : ℙ ℂ H, L = normalPartSourceFiber S hS p) ∨
      (∃ q : ℙ ℂ H, L = normalPartTargetFiber S hS q)
```

In the source, `S` denotes the algebra $A$ used here.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert space and irreducible algebra](https://exactmathematics.org/mathlibannex/cards/ff830108100bff4a506917dc761a7cb66c608fdf5458f297ea9004c43c6b0d0c/versions/gss-r1-f9968bc86c07e5d7/index.html#card-34--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))` | The source algebra `S` is the nonzero norm-closed complex $\ast$-subalgebra $A\subseteq\mathcal B(H)$ acting irreducibly on the complex Hilbert space $H$. |
| [Set to be classified](https://exactmathematics.org/mathlibannex/cards/ff830108100bff4a506917dc761a7cb66c608fdf5458f297ea9004c43c6b0d0c/versions/gss-r1-f9968bc86c07e5d7/index.html#card-34--source-row-1)<br>`theorem maximal_isLinkedSet_normalPart_iff (L : Set (normalPart S)) :`<br>`    Maximal`<br>`      ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).IsLinkedSet L ↔` | The input $L$ is any subset of $N(A)$. It is maximal by inclusion among pairwise-linked subsets for the relative geometric closure on $N(A)$. Neither closedness of $L$ nor a greatest cardinality is required. |
| [Pairwise linkedness](https://exactmathematics.org/mathlibannex/cards/ff830108100bff4a506917dc761a7cb66c608fdf5458f297ea9004c43c6b0d0c/versions/gss-r1-f9968bc86c07e5d7/index.html#card-34--source-row-2)<br>`def IsLinkedSet (c : ClosureSpace α) (S : Set α) : Prop :=`<br>`  ∀ x ∈ S, ∀ y ∈ S, c.Linked x y` | The condition on $L$ is that every two of its points are linked for that closure. The `Maximal` in the preceding row also requires that no strictly larger subset has this property. |
| [Source fiber](https://exactmathematics.org/mathlibannex/cards/ff830108100bff4a506917dc761a7cb66c608fdf5458f297ea9004c43c6b0d0c/versions/gss-r1-f9968bc86c07e5d7/index.html#card-34--source-row-3)<br>`def normalPartSourceFiber (p : ℙ ℂ H) : Set (normalPart S) :=`<br>`  {I \| ((normalPartProjectivizationEquiv S hS).symm I).1 = p}` | The equivalence is $e:\mathbb P(H)\times\mathbb P(H)\to N(A)$ from the Statement. The first coordinate of $e^{-1}(I)$ equals $p$ exactly on $$\mathcal R_p=\{e(p,t):t\in\mathbb P(H)\}.$$ Here `symm` denotes the inverse of that same $e$. |
| [Target fiber](https://exactmathematics.org/mathlibannex/cards/ff830108100bff4a506917dc761a7cb66c608fdf5458f297ea9004c43c6b0d0c/versions/gss-r1-f9968bc86c07e5d7/index.html#card-34--source-row-4)<br>`def normalPartTargetFiber (q : ℙ ℂ H) : Set (normalPart S) :=`<br>`  {I \| ((normalPartProjectivizationEquiv S hS).symm I).2 = q}` | The second coordinate of $e^{-1}(I)$ equals $q$ exactly on $$\mathcal C_q=\{e(t,q):t\in\mathbb P(H)\}.$$ Both fibers use the same projective space and equivalence. |
| [The two kinds of maximal family](https://exactmathematics.org/mathlibannex/cards/ff830108100bff4a506917dc761a7cb66c608fdf5458f297ea9004c43c6b0d0c/versions/gss-r1-f9968bc86c07e5d7/index.html#card-34--source-row-5)<br>`      (∃ p : ℙ ℂ H, L = normalPartSourceFiber S hS p) ∨`<br>`      (∃ q : ℙ ℂ H, L = normalPartTargetFiber S hS q) := by` | The conclusion is the disjunction $$\bigl(\exists p\in\mathbb P(H),\ L=\mathcal R_p\bigr)\quad\text{or}\quad\bigl(\exists q\in\mathbb P(H),\ L=\mathcal C_q\bigr).$$ It classifies all maximal linked families. The two kinds may coincide in dimension one; no dimension-at-least-two assumption is made. |

The effective context requires nonzero irreducibility. There is no dimension-at-least-two or nonempty-family assumption.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable [IsClosed (S : Set (H →L[ℂ] H))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
```

