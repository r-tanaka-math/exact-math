Version 1 source-bound exposition export. Original text SHA-256: 6f0f1f134f7b7fe0e13705251dcc39b4ba2521f78b9f4e5f2172f8121b3f7cdf. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A specified GSS homeomorphism preserves compact-operator equality

## Statement

Let $H,K$ be complex Hilbert spaces, and let $A_1\subseteq\mathcal B(H)$ and $A_2\subseteq\mathcal B(K)$ be nonzero norm-closed complex $\ast$-subalgebras acting irreducibly on $H$ and $K$, respectively. Write $S(D)$ for the [geometric structure space](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=54&start=54&end=54#L54) of $D$, with hull–kernel closure $c_D$, and write $\mathcal K(L)$ for the algebra of compact operators on $L$.

For each maximal proper face of the closed unit ball of $D$, take the union of the kernels of all bounded complex-linear functionals of norm one that equal $1$ on that face. The distinct subsets so obtained are the points of $S(D)$, by the [geometric structure definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=54&start=37&end=39#L37) and the [norm-one support characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=54&start=82&end=91#L82).

Suppose that $e:S(A_1)\to S(A_2)$ is a homeomorphism of closure spaces. Equivalently, $e$ is a bijection preserving closure for all subsets:

$$
e(c_{A_1}(E))=c_{A_2}(e(E))\qquad(E\subseteq S(A_1)).
\tag{1}
$$

Then

$$
A_1=\mathcal K(H)\quad\Longleftrightarrow\quad A_2=\mathcal K(K).
\tag{2}
$$

## Assumptions

The Hilbert spaces are complete. Irreducibility supplies nonzero Hilbert spaces. No separability or finite-dimensionality is assumed. The homeomorphism uses the same $e$ and its inverse. In terms of continuity, (1) requires

$$
e(c_{A_1}(E))\subseteq c_{A_2}(e(E))\qquad(E\subseteq S(A_1)),
$$

and

$$
e^{-1}(c_{A_2}(F))\subseteq c_{A_1}(e^{-1}(F))\qquad(F\subseteq S(A_2)).
$$

No hypothesis says that $e$ directly maps $N(A_1)$ onto $N(A_2)$, the normal parts consisting of their coefficient kernels.

## Conclusion

The conclusion is equality with the compact-operator algebra on each original Hilbert space, not merely containment or abstract $\ast$-isomorphism. The specified geometric homeomorphism is not asserted to be induced by a $\ast$-isomorphism. Finite continuity alone is not the hypothesis.

## Main citations

[Compact-equality transport](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=430&end=443#L430) is the equality branch for the specified full homeomorphism. It uses [faithful normal-part transport](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=54&start=200&end=236#L200), [equality transport between normal parts](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=136&end=161#L136), and [equality reflection through a faithful irreducible image](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=300&end=353#L300). The distinct [compact-inclusion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=413&end=426#L413), [proper-inclusion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=447&end=466#L447), and [zero-intersection](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=482&end=487#L482) results are not substituted for equality.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactTrichotomyTransport.lean.html?from=54&start=430&end=443#L430). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem eq_compactOperatorStarSubalgebra_iff_of_geometricStructure_homeomorph :
    S = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H ↔
      T = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K
```

In the source, `S` and `T` denote the algebras $A_1$ and $A_2$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert spaces](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-0)<br>`universe u v w`<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]` | The complete complex Hilbert spaces $H,K$ may have independent universe levels. |
| [Closed operator algebras](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-1)<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]` | The source names $S,T$ denote $A_1\subseteq\mathcal B(H)$ and $A_2\subseteq\mathcal B(K)$. Each is a norm-closed complex $\ast$-subalgebra. |
| [Irreducible actions](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-2)<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The inclusion representations of $A_1$ on $H$ and $A_2$ on $K$ are nonzero and irreducible. No finite-dimensionality or separability is assumed. |
| [Specified geometric homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-3)<br>`variable (e : ClosureSpace.Homeomorph`<br>`  (NormedSpace.geometricStructureClosure ℂ S)`<br>`  (NormedSpace.geometricStructureClosure ℂ T))` | The same given $e:S(A_1)\to S(A_2)$ is a homeomorphism of the ambient geometric closure spaces. It is not assumed to send one normal part directly onto the other. |
| [Inherited algebra and order structures](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-4)<br>`local instance : NonUnitalCStarAlgebra T :=`<br>`  NonUnitalStarSubalgebra.nonUnitalCStarAlgebra T`<br>`    (h_closed := inferInstance)`<br>`local instance : PartialOrder T := _root_.CStarAlgebra.spectralOrder T`<br>`local instance : StarOrderedRing T := _root_.CStarAlgebra.spectralOrderedRing T` | The closed operator algebra $A_2$ carries its inherited C*-algebra structure and compatible order. These local instances are structures on the same algebra; they add no hypothesis to the displayed theorem. |
| [Effective theorem inputs](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-5)<br>`include hS hT e in` | The two irreducibility assumptions and the specified $e$ are included in the theorem even though its displayed conclusion mentions only the algebras and compact operators. |
| [Equality with compact operators](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-6)<br>`theorem eq_compactOperatorStarSubalgebra_iff_of_geometricStructure_homeomorph :`<br>`    S = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H ↔`<br>`      T = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K := by` | The conclusion is exactly $$A_1=\mathcal K(H)\quad\Longleftrightarrow\quad A_2=\mathcal K(K).$$ It concerns equality on the original Hilbert spaces, not merely compact containment or an abstract isomorphism. |
| [Homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/f66f28a81e5b11fe946b7764a17aeab00b86335eca4620bd782d6ae3a0378354/versions/gss-r1-df7d71195145f58b/index.html#card-54--source-row-7)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The underlying equivalence is the same $e$ with inverse $e^{-1}$. The forward continuity field states, for every $E\subseteq S(A_1)$, $$e(c_{A_1}(E))\subseteq c_{A_2}(e(E)).$$ The inverse continuity field states, for every $F\subseteq S(A_2)$, $$e^{-1}(c_{A_2}(F))\subseteq c_{A_1}(e^{-1}(F)).$$ The inverse is not an independently selected map. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u v w
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]
```

Exact surrounding source:

```lean
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))
variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))
variable (e : ClosureSpace.Homeomorph
  (NormedSpace.geometricStructureClosure ℂ S)
  (NormedSpace.geometricStructureClosure ℂ T))

local instance : NonUnitalCStarAlgebra T :=
  NonUnitalStarSubalgebra.nonUnitalCStarAlgebra T
    (h_closed := inferInstance)
local instance : PartialOrder T := _root_.CStarAlgebra.spectralOrder T
local instance : StarOrderedRing T := _root_.CStarAlgebra.spectralOrderedRing T
```

Exact surrounding source:

```lean
include hS hT e in
```

</details>

