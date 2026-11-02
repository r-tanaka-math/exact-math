Version 1 source-bound exposition export. Original text SHA-256: b17078a1fb58dce51f2bd2265da558293607c9a2ee8ce13d855153d913700112. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The semilinear factors and their inverses are continuous

## Statement

Let $H,K$ be complex Hilbert spaces, and let $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$ be nonzero norm-closed complex $\ast$-subalgebras acting irreducibly on $H$ and $K$, respectively. Neither algebra is assumed unital. For $x,y\in H\setminus\{0\}$ and $z,w\in K\setminus\{0\}$, define the bounded complex-linear functionals

$$
\begin{aligned}
 f^A_{x,y}:A&\to\mathbb C,& f^A_{x,y}(a)&=\langle y,a(x)\rangle,\\
 f^B_{z,w}:B&\to\mathbb C,& f^B_{z,w}(b)&=\langle w,b(z)\rangle.
\end{aligned}
$$

Their normal parts are

$$
\begin{aligned}
 N(A)&=\{\ker f^A_{x,y}:x,y\in H\setminus\{0\}\},\\
 N(B)&=\{\ker f^B_{z,w}:z,w\in K\setminus\{0\}\}.
\end{aligned}
$$

For $\mathcal D\subseteq N(A)$, give the normal part the relative geometric closure

$$
 c_A(\mathcal D)=\{J\in N(A):\bigcap_{I\in\mathcal D}I\subseteq J\},
\tag{1}
$$

and similarly $c_B$. Let $e:N(A)\to N(B)$ be a specified finite-homeomorphism, that is, a bijection satisfying $e(c_A(\mathcal D))=c_B(e(\mathcal D))$ for every finite $\mathcal D\subseteq N(A)$. Assume that $H$ is infinite-dimensional and that

$$
 e\bigl(c_A(\mathcal D)\bigr)\subseteq c_B\bigl(e(\mathcal D)\bigr)
 \qquad\text{for every }\mathcal D\subseteq N(A).
\tag{2}
$$

Let $U,V:H\to K$ be the semilinear equivalences fixed in the [algebraic realization of $e$](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html#L179). Then all four functions

$$
 U:H\to K,\quad U^{-1}:K\to H,\quad
 V:H\to K,\quad V^{-1}:K\to H
\tag{3}
$$

are norm continuous. The inverses in (3) are those of the same maps $U,V$.


## Assumptions

The two nonzero concrete $\ast$-algebras are norm closed and act irreducibly on their respective Hilbert spaces. They need not be unital. The inner product is conjugate-linear in its first variable. The closure on each normal part is the intersection closure displayed above.

For their scalar field automorphisms $\sigma_1,\sigma_2$ of $\mathbb C$, the semilinear maps satisfy $U(cx)=\sigma_1(c)U(x)$ and $V(cx)=\sigma_2(c)V(x)$. They are the lifts fixed in the algebraic realization of the given $e$, with one global direct or swapped orientation. The [rank theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRegularity.lean.html?from=40&start=73&end=80#L73) supplies the bound $3\leq\dim_{\mathbb C}^{\mathrm{alg}}H$ required for this realization.

Full continuity is required only in the forward direction for $e$. Neither full continuity of $e^{-1}$ nor initial continuity of the two semilinear maps is assumed.


## Conclusion

The two fixed semilinear equivalences are homeomorphisms for the norm topologies. The conclusion states continuity of $U,U^{-1},V,V^{-1}$ in this order. It neither replaces the chosen factors nor asserts full continuity of $e^{-1}$.


## Main citations

The [four-continuity theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRegularity.lean.html?from=40&start=238&end=246#L238) concerns the factors fixed in the [algebraic realization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=40&start=179&end=225#L179). The [first lift](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=40&start=65&end=68#L65) and [second lift](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=40&start=129&end=132#L129) specify the maps. The [scalar-type theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRegularity.lean.html?from=40&start=229&end=235#L229) gives the separate scalar alternatives.


## Lean source signature (exact)

The preceding `variable` declarations introduce the spaces, algebras, irreducibility hypotheses, the finite-homeomorphism `e`, and `hdim`. They occur in the conclusion through the selected factors. The earlier `include hS hT e` remains in scope, and `include hH hcont` additionally retains infinite-dimensionality and forward full continuity as theorem parameters. Thus the absence of an argument list on the next line does not make this an unconditional theorem. These declarations and commands are quoted separately below.

The following contiguous declaration prefix ends before its proof assignment.

```lean
theorem normalPart_semilinear_factors_continuous :
    Continuous (normalPartFirstSemilinearEquiv S T hS hT e hdim) ∧
    Continuous (normalPartFirstSemilinearEquiv S T hS hT e hdim).symm ∧
    Continuous (normalPartSecondSemilinearEquiv S T hS hT e hdim) ∧
    Continuous (normalPartSecondSemilinearEquiv S T hS hT e hdim).symm
```

In the source, `S` and `T` denote the algebras $A$ and $B$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert spaces and irreducible algebras](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The complex Hilbert spaces $H,K$ carry the nonzero norm-closed irreducible algebras $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$, called `S`,`T`. The inclusion representations in the last two lines express these irreducible actions. |
| [Finite closure comparison](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-1)<br>`variable (e : ClosureSpace.FiniteHomeomorph`<br>`  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))` | The same bijection $e:N(A)\to N(B)$ compares the relative closures. For every finite $\mathcal D\subseteq N(A)$, $$e(c_A(\mathcal D))=c_B(e(\mathcal D)).$$ Its underlying equivalence is obtained by `toEquiv`; no new map is selected by that projection. |
| [Included geometric inputs](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-2)<br>`include hS hT e` | The two irreducibility hypotheses and $e$ are retained as parameters of the later theorem. They also occur as arguments of the selected scalar maps and semilinear maps. |
| [Dimension and forward continuity](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-3)<br>`variable (hdim : 3 ≤ Module.rank ℂ H)`<br>`variable (hH : ¬ FiniteDimensional ℂ H)`<br>`variable (hcont : ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) e.toEquiv)`<br><br>`include hH hcont` | The bound $3\leq\dim^{\mathrm{alg}}_{\mathbb C}H$ specifies the selected lifts. Under the present hypotheses it is guaranteed by the rank theorem cited above. The additional hypotheses are infinite-dimensionality of $H$ and, for every $\mathcal D\subseteq N(A)$, $$e(c_A(\mathcal D))\subseteq c_B(e(\mathcal D)).$$ The final `include` retains these hypotheses. Full continuity of $e^{-1}$ is not assumed. |
| [Inverse scalar structures](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-4)<br>`local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=`<br>`  RingHomInvPair.of_ringEquiv σ`<br>`local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=`<br>`  RingHomInvPair.of_ringEquiv_symm σ` | For a scalar automorphism $\sigma$, these instances pair $\sigma$ with its inverse $\sigma^{-1}$ in both orders. They make the inverse of a $\sigma$-semilinear equivalence a $\sigma^{-1}$-semilinear map; they do not impose $\sigma^2=\mathrm{id}$. |
| [First selected semilinear equivalence](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-5)<br>`def normalPartFirstSemilinearEquiv :`<br>`    LinearEquiv (normalPartFirstScalarEquiv S T hS hT e hdim).toRingHom (σ' := (normalPartFirstScalarEquiv S T hS hT e hdim).symm.toRingHom) H K :=`<br>`  Classical.choose (Classical.choose_spec`<br>`    (exists_normalPart_first_semilinearEquiv S T hS hT e hdim))` | This is the fixed additive bijection $U:H\to K$ with $U(cx)=\sigma_1(c)U(x)$. Its type specifies the inverse scalar map as $\sigma_1^{-1}$, so `symm` below is the inverse $U^{-1}:K\to H$. |
| [Second selected semilinear equivalence](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-6)<br>`def normalPartSecondSemilinearEquiv :`<br>`    LinearEquiv (normalPartSecondScalarEquiv S T hS hT e hdim).toRingHom (σ' := (normalPartSecondScalarEquiv S T hS hT e hdim).symm.toRingHom) H K :=`<br>`  Classical.choose (Classical.choose_spec`<br>`    (exists_normalPart_second_semilinearEquiv S T hS hT e hdim))` | This is the fixed additive bijection $V:H\to K$ with $V(cx)=\sigma_2(c)V(x)$, from the same geometric inputs. Its inverse is $V^{-1}:K\to H$, semilinear for $\sigma_2^{-1}$. |
| [Continuity of U](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-7)<br>`    Continuous (normalPartFirstSemilinearEquiv S T hS hT e hdim) ∧` | $U:H\to K$ is continuous for the norm topologies, the first assertion in (3). |
| [Continuity of the inverse of U](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-8)<br>`    Continuous (normalPartFirstSemilinearEquiv S T hS hT e hdim).symm ∧` | $U^{-1}:K\to H$ is norm continuous, the second assertion in (3). The suffix `symm` takes the inverse of the same selected $U$. |
| [Continuity of V](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-9)<br>`    Continuous (normalPartSecondSemilinearEquiv S T hS hT e hdim) ∧` | $V:H\to K$ is norm continuous, the third assertion in (3). |
| [Continuity of the inverse of V](https://exactmathematics.org/mathlibannex/cards/dea300e85441947834f53ac22636686acdcbc75b0e3128604dabf8cbaa7fd024/versions/gss-r1-a8369a09aa88208e/index.html#card-40--source-row-10)<br>`    Continuous (normalPartSecondSemilinearEquiv S T hS hT e hdim).symm :=` | $V^{-1}:K\to H$ is norm continuous, the fourth assertion in (3). All four assertions are joined by conjunctions; this is not an assertion of full closure continuity of $e^{-1}$. |

### Source context (separate exact excerpts)

These separate excerpts record inverse scalar instances, the ambient spaces and algebras, and the included hypotheses. They are not spliced into the declaration prefix.

`NormalPartSemilinearRegularity.lean` — separate exact context:

```lean
local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=
  RingHomInvPair.of_ringEquiv σ
local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=
  RingHomInvPair.of_ringEquiv_symm σ
```

`NormalPartSemilinearRegularity.lean` — separate exact context:

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
```

`NormalPartSemilinearRegularity.lean` — separate exact context:

```lean
include hS hT e
```

`NormalPartSemilinearRegularity.lean` — separate exact context:

```lean
variable (hdim : 3 ≤ Module.rank ℂ H)
variable (hH : ¬ FiniteDimensional ℂ H)
variable (hcont : ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous
  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) e.toEquiv)

include hH hcont
```

<details class="exact-identity"><summary>Exact content identity / Technical Details</summary>

The historical binding retains printed types with their elisions. The declaration and effective context here are literal source excerpts. No new compiler run, type output or census is claimed.

</details>
