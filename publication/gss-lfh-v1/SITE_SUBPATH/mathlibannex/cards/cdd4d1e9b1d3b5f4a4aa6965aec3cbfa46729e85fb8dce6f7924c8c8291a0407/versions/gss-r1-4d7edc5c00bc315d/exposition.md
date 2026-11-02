Version 1 source-bound exposition export. Original text SHA-256: 2b8d132142726e8075ff2005a04d21cefc0e6f719845bc7656719afcea38f504. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Semilinear factors recover all coefficient kernels

## Statement

Let $H,K$ be complex Hilbert spaces. Let $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$ be nonzero norm-closed complex $\ast$-subalgebras acting irreducibly on $H$ and $K$, respectively. Units are not required. For $x,y\in H\setminus\{0\}$ and $z,w\in K\setminus\{0\}$, define the coefficient functionals

$$
\begin{aligned}
f^A_{x,y}:A\to\mathbb C,&\qquad f^A_{x,y}(a)=\langle y,a(x)\rangle,\\
f^B_{z,w}:B\to\mathbb C,&\qquad f^B_{z,w}(b)=\langle w,b(z)\rangle.
\end{aligned}
$$

The inner products are conjugate-linear in the first variable. The normal parts are

$$
N(A)=\{\ker f^A_{x,y}:x,y\in H\setminus\{0\}\},\qquad
N(B)=\{\ker f^B_{z,w}:z,w\in K\setminus\{0\}\}.
$$

For $D\subseteq N(A)$, let $c_A(D)=\{J\in N(A):\bigcap_{I\in D}I\subseteq J\}$, and define $c_B$ similarly. Let $e:N(A)\to N(B)$ be a finite-homeomorphism: it is a bijection and $e(c_A(D))=c_B(e(D))$ for every finite $D\subseteq N(A)$. Suppose

$$
3\le\operatorname{rank}_{\mathbb C}H,\tag{1}
$$

where rank is cardinal-valued algebraic dimension.

Let $f,g:\mathbb P(H)\to\mathbb P(K)$ be the projective factors associated with $e$ by the [projective factorization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectiveIncidence.lean.html?from=37&start=202&end=222#L202). Here $\mathbb P(H)$ is the space of one-dimensional complex subspaces of $H$. The [semilinear realization theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/LinearAlgebra/Projectivization/Semilinear.lean.html?from=37&start=514&end=533#L514) provides lifts of both factors. Use the lifts fixed by the [first](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=37&start=65&end=68#L65) and [second](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=37&start=129&end=132#L129) definitions:

$$
\begin{aligned}
\sigma_1,\sigma_2 &: \mathbb C\longrightarrow\mathbb C
       &&\text{field automorphisms},\\
U &:H\longrightarrow K &&\text{a }\sigma_1\text{-semilinear equivalence},\\
V &:H\longrightarrow K &&\text{a }\sigma_2\text{-semilinear equivalence}.
\end{aligned}\tag{2}
$$

Thus $f([x])=[Ux]$ and $g([y])=[Vy]$ for every nonzero representative. The same maps are used for all points. For these fixed $U,V$, one of the following two alternatives holds globally:

$$
\begin{aligned}
 e(\ker f^A_{x,y})&=\ker f^B_{Ux,Vy} &&(x,y\ne0),\\
 e^{-1}(\ker f^B_{z,w})&=\ker f^A_{U^{-1}z,V^{-1}w} &&(z,w\ne0);
\end{aligned}\tag{3}
$$

or

$$
\begin{aligned}
 e(\ker f^A_{x,y})&=\ker f^B_{Vy,Ux} &&(x,y\ne0),\\
 e^{-1}(\ker f^B_{z,w})&=\ker f^A_{U^{-1}w,V^{-1}z} &&(z,w\ne0).
\end{aligned}\tag{4}
$$

Each alternative includes both of its universally quantified equations. Here $e^{-1}$ is the inverse of the given bijection.


## Assumptions

The normal-part bijection and its inverse satisfy finite continuity. The spaces are complex Hilbert spaces, and the two norm-closed $\ast$-subalgebras act nontrivially and irreducibly. The algebraic dimension of $H$ is at least three; it may be infinite.

The two projective factors come from the same factorization of $e$. Their semilinear lifts may have different scalar automorphisms. Neither those automorphisms nor the lifts are assumed continuous or bounded.


## Conclusion

One of the alternatives (3) and (4) holds for every nonzero pair of vectors, in both directions. These are equalities of points of the normal parts and hence of their coefficient kernels. The orientation is fixed globally, and the formulas use the same $U,V$ and their inverses throughout. Continuity on arbitrary subsets and boundedness of the lifts are not conclusions of this theorem.


## Main citations

The [projective factorization and its evaluation formulas](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectiveIncidence.lean.html?from=37&start=202&end=222#L202) specify the two factors of the given map. The [semilinear realization theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/LinearAlgebra/Projectivization/Semilinear.lean.html?from=37&start=514&end=533#L514) gives lifts on every projective line. The [evaluation theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=37&start=179&end=225#L179) states (3) or (4) for the lifts fixed by the definitions of the [first lift](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=37&start=65&end=68#L65) and [second lift](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=37&start=129&end=132#L129). The retained paper's [Theorem 6.18](https://arxiv.org/abs/2504.05551v1) gives the broader context.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

Here $e$ is a parameter declared earlier by `variable`, not a map constructed by this theorem. Lean adds the section parameters used in the statement as theorem parameters. The first two `let` expressions name the semilinear maps chosen from this same $e$; `e.toEquiv` is the given bijection $e$, and `e.toEquiv.symm` is $e^{-1}$. The four equations are identified individually in the table below.

```lean
theorem normalPart_semilinear_factors_evaluation :
    let U := normalPartFirstSemilinearEquiv S T hS hT e hdim
    let V := normalPartSecondSemilinearEquiv S T hS hT e hdim
    ((∀ (x y : H) (hx : x ≠ 0) (hy : y ≠ 0),
      e.toEquiv (normalPartPoint S hS x y hx hy) =
        normalPartPoint T hT (U x) (V y)
          (by simpa only [map_zero] using U.injective.ne hx)
          (by simpa only [map_zero] using V.injective.ne hy)) ∧
     (∀ (z w : K) (hz : z ≠ 0) (hw : w ≠ 0),
      e.toEquiv.symm (normalPartPoint T hT z w hz hw) =
        normalPartPoint S hS (U.symm z) (V.symm w)
          (by simpa only [map_zero] using U.symm.injective.ne hz)
          (by simpa only [map_zero] using V.symm.injective.ne hw))) ∨
    ((∀ (x y : H) (hx : x ≠ 0) (hy : y ≠ 0),
      e.toEquiv (normalPartPoint S hS x y hx hy) =
        normalPartPoint T hT (V y) (U x)
          (by simpa only [map_zero] using V.injective.ne hy)
          (by simpa only [map_zero] using U.injective.ne hx)) ∧
     (∀ (z w : K) (hz : z ≠ 0) (hw : w ≠ 0),
      e.toEquiv.symm (normalPartPoint T hT z w hz hw) =
        normalPartPoint S hS (U.symm w) (V.symm z)
          (by simpa only [map_zero] using U.symm.injective.ne hw)
          (by simpa only [map_zero] using V.symm.injective.ne hz)))
```

In the four equation rows below, $x,y\in H\setminus\{0\}$ and $z,w\in K\setminus\{0\}$ are arbitrary.

In the source, `S` and `T` denote the algebras $A$ and $B$ used here, respectively.

| In the source | Mathematical meaning |
| --- | --- |
| [Ambient spaces and algebras](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The complex Hilbert spaces $H,K$ and the nonzero norm-closed irreducible complex $\ast$-subalgebras $A,B$, denoted $S,T$ in the source. |
| [Given finite homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-1)<br>`variable (e : ClosureSpace.FiniteHomeomorph`<br>`  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))` | The given bijection $e:N(A)\to N(B)$ and its actual inverse, with finite continuity for the relative closures $c_A,c_B$ in both directions. |
| [Finite homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-2)<br>`structure FiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  finitelyContinuous_toFun : c.FinitelyContinuous d toFun`<br>`  finitelyContinuous_invFun : d.FinitelyContinuous c invFun` | One equivalence together with finite continuity of its forward map and its inverse. Here its underlying equivalence is $e$, and its inverse is $e^{-1}$; these are not newly chosen maps. |
| [Dimension input](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-3)<br>`variable (hdim : 3 ≤ Module.rank ℂ H)` | The bound $3\leq\operatorname{rank}_{\mathbb C}H$ in (1), allowing infinite dimension. |
| [The selected lifts](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-4)<br>`    let U := normalPartFirstSemilinearEquiv S T hS hT e hdim`<br>`    let V := normalPartSecondSemilinearEquiv S T hS hT e hdim` | The maps $U,V$ in (2) are chosen from this same $e$, the two algebras, their irreducibility, and the dimension bound. Their scalar automorphisms are $\sigma_1,\sigma_2$; no equality of these automorphisms is asserted. |
| [Coefficient-kernel point](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-5)<br>`def normalPartPoint (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`    (x y : H) (hx : x ≠ 0) (hy : y ≠ 0) : normalPart S :=`<br>`  ⟨restrictedMatrixCoefficientKernel S hS x y hx hy, ⟨x, y, hx, hy, rfl⟩⟩` | The point $\ker f^A_{x,y}\in N(A)$ for $x,y\ne0$; using $B$ gives $\ker f^B_{z,w}\in N(B)$. The displayed nonzero conditions ensure that these are normal-part points. |
| [Direct forward equation](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-6)<br>`    ((∀ (x y : H) (hx : x ≠ 0) (hy : y ≠ 0),`<br>`      e.toEquiv (normalPartPoint S hS x y hx hy) =`<br>`        normalPartPoint T hT (U x) (V y)`<br>`          (by simpa only [map_zero] using U.injective.ne hx)`<br>`          (by simpa only [map_zero] using V.injective.ne hy)) ∧` | For every $x,y\in H\setminus\{0\}$, the first equation of (3): $$e(\ker f^A_{x,y})=\ker f^B_{Ux,Vy}.$$ |
| [Direct inverse equation](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-7)<br>`     (∀ (z w : K) (hz : z ≠ 0) (hw : w ≠ 0),`<br>`      e.toEquiv.symm (normalPartPoint T hT z w hz hw) =`<br>`        normalPartPoint S hS (U.symm z) (V.symm w)`<br>`          (by simpa only [map_zero] using U.symm.injective.ne hz)`<br>`          (by simpa only [map_zero] using V.symm.injective.ne hw))) ∨` | For every $z,w\in K\setminus\{0\}$, the second equation of (3), for the inverse of the same $e$: $$\begin{aligned}e^{-1}(\ker f^B_{z,w})&=\ker f^A_{U^{-1}z,V^{-1}w}.\end{aligned}$$ The disjunction following this pair separates the two global orientations. |
| [Swapped forward equation](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-8)<br>`    ((∀ (x y : H) (hx : x ≠ 0) (hy : y ≠ 0),`<br>`      e.toEquiv (normalPartPoint S hS x y hx hy) =`<br>`        normalPartPoint T hT (V y) (U x)`<br>`          (by simpa only [map_zero] using V.injective.ne hy)`<br>`          (by simpa only [map_zero] using U.injective.ne hx)) ∧` | For every $x,y\in H\setminus\{0\}$, the first equation of (4): $$e(\ker f^A_{x,y})=\ker f^B_{Vy,Ux}.$$ |
| [Swapped inverse equation](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-9)<br>`     (∀ (z w : K) (hz : z ≠ 0) (hw : w ≠ 0),`<br>`      e.toEquiv.symm (normalPartPoint T hT z w hz hw) =`<br>`        normalPartPoint S hS (U.symm w) (V.symm z)`<br>`          (by simpa only [map_zero] using U.symm.injective.ne hw)`<br>`          (by simpa only [map_zero] using V.symm.injective.ne hz))) := by` | For every $z,w\in K\setminus\{0\}$, the second equation of (4): $$\begin{aligned}e^{-1}(\ker f^B_{z,w})&=\ker f^A_{U^{-1}w,V^{-1}z}.\end{aligned}$$ Each branch joins its two universally quantified equations; one orientation holds for the entire map. |
| [Inverse scalar maps](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/cdd4d1e9b1d3b5f4a4aa6965aec3cbfa46729e85fb8dce6f7924c8c8291a0407/versions/gss-r1-4d7edc5c00bc315d/index.html#card-37--source-row-10)<br>`local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=`<br>`  RingHomInvPair.of_ringEquiv σ`<br>`local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=`<br>`  RingHomInvPair.of_ringEquiv_symm σ` | The scalar maps and their actual inverses compose to the identity in either order. This does not assert $\sigma_i^2=\mathrm{id}_{\mathbb C}$ or $\sigma_1=\sigma_2$. |

The short proof terms attached to transported vectors only certify that those vectors are nonzero, so that their coefficient kernels define the displayed normal-part points.

The declaration prefix includes both internal `let` assignments and all four universally quantified equations. It ends before the proof assignment. The surrounding context below is quoted separately.

### Source context (separate exact excerpt)

Exact ambient excerpt:

```lean
local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=
  RingHomInvPair.of_ringEquiv σ
local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=
  RingHomInvPair.of_ringEquiv_symm σ
```

Exact ambient excerpt:

```lean
universe u v
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))
variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))
variable (e : ClosureSpace.FiniteHomeomorph
  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))
  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))
variable (hdim : 3 ≤ Module.rank ℂ H)
```


<details class="exact-identity"><summary>Exact content identity / Technical Details</summary>

The historical binding retains the successful printed type with its elisions. This view quotes literal source separately. No new compiler run or type output is claimed.

</details>
