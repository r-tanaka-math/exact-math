Version 1 source-bound exposition export. Original text SHA-256: f12e8652c092a63ce9d3079367c698f63661ce67a1bdfdb9b51fd8a4862befc1. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Finite-homeomorphisms detect finite dimension

## Statement

Let $H,K$ be complex Hilbert spaces. Let $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$ be nonzero norm-closed complex $\ast$-subalgebras acting irreducibly on $H$ and $K$, respectively. Neither algebra is assumed unital. For $x,y\in H\setminus\{0\}$ and $z,w\in K\setminus\{0\}$, define the coefficient functionals

$$
\begin{aligned}
f^A_{x,y}:A\to\mathbb C,&\qquad f^A_{x,y}(a)=\langle y,a(x)\rangle,\\
f^B_{z,w}:B\to\mathbb C,&\qquad f^B_{z,w}(b)=\langle w,b(z)\rangle.
\end{aligned}
$$

The inner products are conjugate-linear in the first variable. The normal parts are

$$
\begin{aligned}
N(A)&=\{\ker f^A_{x,y}:x,y\in H\setminus\{0\}\},\\
N(B)&=\{\ker f^B_{z,w}:z,w\in K\setminus\{0\}\}.
\end{aligned}\tag{1}
$$

Give the two normal parts their inherited hull–kernel closures $c_A,c_B$. For $D\subseteq N(A)$, write $c_A(D)=\{J\in N(A):\bigcap_{I\in D}I\subseteq J\}$, and define $c_B$ analogously.

Suppose $e:N(A)\to N(B)$ is a finite-homeomorphism, that is, a bijection satisfying

$$
e(c_A(D))=c_B(e(D))\qquad\text{for every finite }D\subseteq N(A).
$$

If either $H$ or $K$ is finite dimensional, then both are finite dimensional and

$$
\dim_{\mathbb C}H=\dim_{\mathbb C}K.\tag{2}
$$


## Assumptions

The given finite-homeomorphism is a bijection whose map and inverse preserve closure on finite subsets. Continuity on arbitrary subsets is not assumed. The nonzero norm-closed $\ast$-subalgebras $A,B$ act irreducibly on $H,K$, respectively.

Finite dimensionality is required on at least one side. There is no dimension-at-least-three hypothesis: dimensions one and two are included. The nonzero actions exclude the zero Hilbert space.


## Conclusion

Both spaces are finite dimensional, and their complex dimensions agree. The conclusion asserts finite dimensionality as well as equality of dimensions.


## Main citations

The [normal-part dimension theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectiveDimension.lean.html?from=36&start=215&end=221#L215) gives both finite-dimensionality assertions and equality of dimensions. Its algebraic input is the [finite-incidence dimension theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/LinearAlgebra/Projectivization/Dimension.lean.html?from=36&start=180&end=186#L180). The [finite-homeomorphism definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=36&start=157&end=159#L157) specifies the two finite-continuity conditions. See also the retained paper's [Theorem 6.18, pages 42–45](https://arxiv.org/abs/2504.05551v1).


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

The parameter $e$ is declared earlier by `variable`, rather than repeated after the theorem name. Immediately before this declaration, `include hS hT e in` tells Lean to add the two irreducibility hypotheses and $e$ as parameters of this theorem. Thus the theorem takes the given finite-homeomorphism $e:N(A)\to N(B)$ as an input, although its conclusion mentions only the dimensions of $H$ and $K$. The exact `variable` and `include` declarations are quoted in the source context below.

```lean
theorem finite_and_finrank_eq_of_normalPart_finiteHomeomorph
    (hfinite : Module.Finite ℂ H ∨ Module.Finite ℂ K) :
    Module.Finite ℂ H ∧ Module.Finite ℂ K ∧ Module.finrank ℂ H = Module.finrank ℂ K
```

In the source, `S` and `T` denote the algebras $A$ and $B$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert spaces and irreducible algebras](https://exactmathematics.org/mathlibannex/cards/5cfbc37ef11004746da196fbfc5f5056fde9ac47956927ce62f2432455f19e67/versions/gss-r1-ba829240898e4fb0/index.html#card-36--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The complex Hilbert spaces $H,K$ carry the nonzero norm-closed irreducible algebras $A,B$, called `S`,`T` in the source. Completeness belongs to each Hilbert structure. No unit is required. |
| [Finite-homeomorphism input](https://exactmathematics.org/mathlibannex/cards/5cfbc37ef11004746da196fbfc5f5056fde9ac47956927ce62f2432455f19e67/versions/gss-r1-ba829240898e4fb0/index.html#card-36--source-row-1)<br>`variable (e : ClosureSpace.FiniteHomeomorph`<br>`  ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`  ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)))` | The parameter is a bijection $e:N(A)\to N(B)$, with the induced closures on these normal parts. For every finite $D\subseteq N(A)$, $$e(c_A(D))=c_B(e(D)).$$ This is an input, not a map obtained in the conclusion. |
| [Parameters retained by include](https://exactmathematics.org/mathlibannex/cards/5cfbc37ef11004746da196fbfc5f5056fde9ac47956927ce62f2432455f19e67/versions/gss-r1-ba829240898e4fb0/index.html#card-36--source-row-2)<br>`include hS hT e in` | The command retains the previously declared irreducibility hypotheses and the same $e$ as parameters of this theorem, although the displayed conclusion concerns only dimensions. |
| [One finite-dimensional space](https://exactmathematics.org/mathlibannex/cards/5cfbc37ef11004746da196fbfc5f5056fde9ac47956927ce62f2432455f19e67/versions/gss-r1-ba829240898e4fb0/index.html#card-36--source-row-3)<br>`    (hfinite : Module.Finite ℂ H ∨ Module.Finite ℂ K) :` | The hypothesis is that $H$ or $K$ is finite-dimensional over $\mathbb C$. It is a disjunction, not a requirement that both are already known to be finite-dimensional. |
| [Both dimensions and their equality](https://exactmathematics.org/mathlibannex/cards/5cfbc37ef11004746da196fbfc5f5056fde9ac47956927ce62f2432455f19e67/versions/gss-r1-ba829240898e4fb0/index.html#card-36--source-row-4)<br>`    Module.Finite ℂ H ∧ Module.Finite ℂ K ∧ Module.finrank ℂ H = Module.finrank ℂ K :=` | The conclusion has three conjuncts: $H$ is finite-dimensional, $K$ is finite-dimensional, and $$\dim_{\mathbb C}H=\dim_{\mathbb C}K.$$ The numerical equality is additional to the two finite-dimensionality assertions; no lower dimension bound is imposed. |

The displayed declaration prefix and the following ambient context are separate excerpts. The next `include` and comment in the source are not part of this declaration.

### Source context (separate exact excerpt)

Exact surrounding source:

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

Exact surrounding source:

```lean
include hS hT e in
```


<details class="exact-identity"><summary>Exact content identity / Technical Details</summary>

The historical binding retains the successful printed type with its elisions. This view quotes literal source separately. No new compiler run or type output is claimed.

</details>
