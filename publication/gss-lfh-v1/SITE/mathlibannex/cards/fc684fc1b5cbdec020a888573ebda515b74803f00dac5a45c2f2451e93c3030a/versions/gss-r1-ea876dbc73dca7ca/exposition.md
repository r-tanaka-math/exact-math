Version 1 source-bound exposition export. Original text SHA-256: e9719c6263686fc15f38a4a299239a5dc7cb90c4116c77b82bd2d2e919f09d60. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Each selected scalar automorphism is identity or conjugation

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
\tag{1}
$$

For $\mathcal D\subseteq N(A)$, the relative geometric closure is

$$
 c_A(\mathcal D)=\left\{J\in N(A):
               \bigcap_{I\in\mathcal D} I\subseteq J\right\}.
\tag{2}
$$

Define $c_B$ analogously. Let $e:N(A)\to N(B)$ be a specified finite-homeomorphism: a bijection satisfying $e(c_A(\mathcal D))=c_B(e(\mathcal D))$ for every finite $\mathcal D\subseteq N(A)$. Assume that $H$ is infinite-dimensional and that $e$ is also **forward continuous for arbitrary families**:

$$
 e\bigl(c_A(\mathcal D)\bigr)\subseteq c_B\bigl(e(\mathcal D)\bigr)
 \qquad(\mathcal D\subseteq N(A)).
\tag{3}
$$

Keep the two semilinear equivalences $U,V:H\to K$ and their scalar automorphisms $\sigma_1,\sigma_2$ fixed by the [algebraic realization of this same $e$](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html#L179). Then

$$
 (\sigma_1=\mathrm{id}\ \text{or}\ \sigma_1=\mathrm{conj})
 \quad\text{and}\quad
 (\sigma_2=\mathrm{id}\ \text{or}\ \sigma_2=\mathrm{conj}).
\tag{4}
$$

Here $\mathrm{conj}(z)=\overline z$. The conclusion concerns the scalar automorphisms of these same two maps.


## Assumptions

The two nonzero concrete $\ast$-algebras are norm closed and act irreducibly on their respective Hilbert spaces. They need not be unital. The inner product is conjugate-linear in its first variable. The closure on each normal part is the intersection closure displayed above.

For their scalar field automorphisms $\sigma_1,\sigma_2$ of $\mathbb C$, the semilinear maps satisfy $U(cx)=\sigma_1(c)U(x)$ and $V(cx)=\sigma_2(c)V(x)$. They are the lifts fixed in the algebraic realization of the given $e$, with one global direct or swapped orientation. The [rank theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRegularity.lean.html?from=39&start=73&end=80#L73) supplies the bound $3\leq\dim_{\mathbb C}^{\mathrm{alg}}H$ required for this realization.

Full continuity is required only in the forward direction for $e$. Neither full continuity of $e^{-1}$ nor initial continuity of the two semilinear maps is assumed.


## Conclusion

Each of $\sigma_1,\sigma_2$ is identity or complex conjugation. The conclusion is a conjunction of two alternatives. It does not assert that the two scalar automorphisms are equal.


## Main citations

The [scalar-type theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRegularity.lean.html?from=39&start=229&end=235#L229) states the two alternatives. The [algebraic realization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=39&start=179&end=225#L179) identifies the factors of the given map; the source fixes their scalar automorphisms in the [first](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=39&start=61&end=62#L61) and [second](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinearRealization.lean.html?from=39&start=125&end=126#L125) definitions.


## Lean source signature (exact)

The preceding `variable` declarations introduce the spaces, algebras, irreducibility hypotheses, the finite-homeomorphism `e`, and `hdim`. They occur in the conclusion through the selected factors. The earlier `include hS hT e` remains in scope, and `include hH hcont` additionally retains infinite-dimensionality and forward full continuity as theorem parameters. Thus the absence of an argument list on the next line does not make this an unconditional theorem. These declarations and commands are quoted separately below.

The following contiguous declaration prefix ends before its proof assignment.

```lean
theorem normalPart_semilinear_factors_scalar_types :
    (normalPartFirstScalarEquiv S T hS hT e hdim = RingEquiv.refl ℂ ∨
      normalPartFirstScalarEquiv S T hS hT e hdim = starRingAut (R := ℂ)) ∧
    (normalPartSecondScalarEquiv S T hS hT e hdim = RingEquiv.refl ℂ ∨
      normalPartSecondScalarEquiv S T hS hT e hdim = starRingAut (R := ℂ))
```

In the source, `S` and `T` denote the algebras $A$ and $B$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert spaces and irreducible algebras](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The complex Hilbert spaces $H,K$ carry the nonzero norm-closed irreducible algebras $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$, called `S`,`T`. The inclusion representations in the last two lines express these irreducible actions. |
| [Finite closure comparison](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-1)<br>`variable (e : ClosureSpace.FiniteHomeomorph`<br>`  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))` | The same bijection $e:N(A)\to N(B)$ compares the relative closures. For every finite $\mathcal D\subseteq N(A)$, $$e(c_A(\mathcal D))=c_B(e(\mathcal D)).$$ Its underlying equivalence is obtained by `toEquiv`; no new map is selected by that projection. |
| [Included geometric inputs](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-2)<br>`include hS hT e` | The two irreducibility hypotheses and $e$ are retained as parameters of the later theorem. They also occur as arguments of the selected scalar maps and semilinear maps. |
| [Dimension and forward continuity](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-3)<br>`variable (hdim : 3 ≤ Module.rank ℂ H)`<br>`variable (hH : ¬ FiniteDimensional ℂ H)`<br>`variable (hcont : ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) e.toEquiv)`<br><br>`include hH hcont` | The bound $3\leq\dim^{\mathrm{alg}}_{\mathbb C}H$ specifies the selected lifts. Under the present hypotheses it is guaranteed by the rank theorem cited above. The additional hypotheses are infinite-dimensionality of $H$ and, for every $\mathcal D\subseteq N(A)$, $$e(c_A(\mathcal D))\subseteq c_B(e(\mathcal D)).$$ The final `include` retains these hypotheses. Full continuity of $e^{-1}$ is not assumed. |
| [Inverse scalar structures](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-4)<br>`local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=`<br>`  RingHomInvPair.of_ringEquiv σ`<br>`local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=`<br>`  RingHomInvPair.of_ringEquiv_symm σ` | For a scalar automorphism $\sigma$, these instances pair $\sigma$ with its inverse $\sigma^{-1}$ in both orders. They make the inverse of a $\sigma$-semilinear equivalence a $\sigma^{-1}$-semilinear map; they do not impose $\sigma^2=\mathrm{id}$. |
| [First selected scalar automorphism](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-5)<br>`def normalPartFirstScalarEquiv : ℂ ≃+* ℂ :=`<br>`  Classical.choose (exists_normalPart_first_semilinearEquiv S T hS hT e hdim)` | The source defines the fixed automorphism $\sigma_1$ from the same $A,B,e$ and dimension bound. For the same selected map $U$ it is characterized by $U(cx)=\sigma_1(c)U(x)$. It is not selected separately for each vector. |
| [Second selected scalar automorphism](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-6)<br>`def normalPartSecondScalarEquiv : ℂ ≃+* ℂ :=`<br>`  Classical.choose (exists_normalPart_second_semilinearEquiv S T hS hT e hdim)` | This is the fixed scalar automorphism $\sigma_2$ of the same selected map $V$, characterized by $V(cx)=\sigma_2(c)V(x)$, from the same inputs. The first and second scalar automorphisms are not identified with each other. |
| [First scalar alternative](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-7)<br>`    (normalPartFirstScalarEquiv S T hS hT e hdim = RingEquiv.refl ℂ ∨`<br>`      normalPartFirstScalarEquiv S T hS hT e hdim = starRingAut (R := ℂ)) ∧` | The first factor obeys $$\sigma_1=\mathrm{id}\quad\text{or}\quad\sigma_1=\mathrm{conj},$$ where $\mathrm{conj}(c)=\overline c$ for every complex scalar. The trailing conjunction joins this whole alternative to the next one. |
| [Second scalar alternative](https://exactmathematics.org/mathlibannex/cards/fc684fc1b5cbdec020a888573ebda515b74803f00dac5a45c2f2451e93c3030a/versions/gss-r1-ea876dbc73dca7ca/index.html#card-39--source-row-8)<br>`    (normalPartSecondScalarEquiv S T hS hT e hdim = RingEquiv.refl ℂ ∨`<br>`      normalPartSecondScalarEquiv S T hS hT e hdim = starRingAut (R := ℂ)) :=` | The second factor obeys $$\sigma_2=\mathrm{id}\quad\text{or}\quad\sigma_2=\mathrm{conj}.$$ Both alternatives in (4) hold for the fixed selected maps. This theorem alone does not assert $\sigma_1=\sigma_2$. |

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
