Version 1 source-bound exposition export. Original text SHA-256: 32d001c1843e130f65d88ff60d63537cfad111d91357e561a82f40a80e73797b. Link targets are adapted for this edition; the registered Card identity is unchanged.

# GSS rigidity from a full bounded-operator model

## Statement

Let $A,B$ be complex C*-algebras. For a complex C*-algebra $D$, write $S(D)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $D$; faces use real convexity. Write $c_D$ for its hull–kernel closure:

$$
c_D(E)=\left\{I\in S(D):\bigcap_{J\in E}J\subseteq I\right\},\qquad E\subseteq S(D).
$$

These are the [geometric structure definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=61&start=37&end=39#L37) and its closure, with the norm-one description justified by the [norm-one support characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=61&start=82&end=91#L82).

Let $\mathcal B(H)$ denote the algebra of all bounded complex-linear operators on a complex Hilbert space $H$. Assume that at least one of $A,B$ is $\ast$-isomorphic to $\mathcal B(H)$ for some such $H$. Then $A$ and $B$ are $\ast$-isomorphic if and only if $S(A)$ and $S(B)$ are homeomorphic as closure spaces. Here a closure-space homeomorphism is a bijection $e:S(A)\to S(B)$ satisfying

$$
e(c_A(E))=c_B(e(E)),\qquad E\subseteq S(A).
$$

The equality is required for every subset, not just finite subsets.

## Assumptions

The bounded-operator model is required on at least one side. It is an isomorphism onto all of $\mathcal B(H)$, not onto a proper subalgebra. The Hilbert space is complex and complete; it and the algebras may be zero. No nonzero, unitality, separability, countability, or finite-dimensionality hypothesis is imposed.

## Conclusion

The equivalence concerns existence of a $\ast$-algebra isomorphism and existence of a closure-space homeomorphism. It does not require the isomorphism to induce a prescribed homeomorphism, or assert uniqueness.

## Main citations

[The either-side bounded-operator model theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/BoundedOperatorModelCharacterization.lean.html?from=61&start=273&end=302#L273) uses the [specified left-model equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/BoundedOperatorModelCharacterization.lean.html?from=61&start=192&end=199#L192) and [specified right-model equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/BoundedOperatorModelCharacterization.lean.html?from=61&start=202&end=209#L202). The [full-range model predicate](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/TypeIFactorRigidity.lean.html?from=61&start=45&end=46#L45) requires faithfulness and range equal to all bounded operators. The [zero-model equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/BoundedOperatorModelCharacterization.lean.html?from=61&start=125&end=147#L125) retains the zero case. No abstract type-I factor classification is claimed.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/BoundedOperatorModelCharacterization.lean.html?from=61&start=273&end=302#L273). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem nonempty_starAlgEquiv_iff_nonempty_geometricStructure_homeomorph_of_exists_boundedOperatorEquiv
    (hModel :
      (∃ (L : Type w) (normed : NormedAddCommGroup L),
        letI : NormedAddCommGroup L := normed
        ∃ inner : InnerProductSpace ℂ L,
          letI : InnerProductSpace ℂ L := inner
          ∃ complete : CompleteSpace L,
            letI : CompleteSpace L := complete
            Nonempty (A ≃⋆ₐ[ℂ] (L →L[ℂ] L))) ∨
      (∃ (L : Type z) (normed : NormedAddCommGroup L),
        letI : NormedAddCommGroup L := normed
        ∃ inner : InnerProductSpace ℂ L,
          letI : InnerProductSpace ℂ L := inner
          ∃ complete : CompleteSpace L,
            letI : CompleteSpace L := complete
            Nonempty (B ≃⋆ₐ[ℂ] (L →L[ℂ] L)))) :
    Nonempty (A ≃⋆ₐ[ℂ] B) ↔
      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)
        (NormedSpace.geometricStructureClosure ℂ B))
```

| In the source | Mathematical meaning |
|---|---|
| [Two C*-algebras](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/BoundedOperatorModelCharacterization.lean.html#L45)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A]`<br>`variable {B : Type v} [NonUnitalCStarAlgebra B]` | The inputs $A,B$ are arbitrary complex C*-algebras, including zero. Their size levels are independent. The source type allows unital algebras but does not require a unit. |
| [Normed model on the A side](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-1)<br>`      (∃ (L : Type w) (normed : NormedAddCommGroup L),`<br>`        letI : NormedAddCommGroup L := normed` | This alternative requires a normed additive group, called `L` in the source and $H$ in the Statement. The first `letI` installs this chosen normed structure on the same space for the inner-product type that follows. |
| [Complex inner product on the A model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-2)<br>`        ∃ inner : InnerProductSpace ℂ L,`<br>`          letI : InnerProductSpace ℂ L := inner` | The same model must have a compatible complex inner product. This `letI` installs that inner product, so subsequent Hilbert-space operator types use this structure, not a separately chosen one. |
| [Complete A model and isomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-3)<br>`          ∃ complete : CompleteSpace L,`<br>`            letI : CompleteSpace L := complete`<br>`            Nonempty (A ≃⋆ₐ[ℂ] (L →L[ℂ] L))) ∨` | The model must be complete; the last `letI` installs this completeness for its operator algebra. `Nonempty` requires a $\ast$-isomorphism $A\to \mathcal B(H)$ onto the entire operator algebra. The two model branches are alternatives; their spaces are quantified separately and may be zero. |
| [Normed model on the B side](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-4)<br>`      (∃ (L : Type z) (normed : NormedAddCommGroup L),`<br>`        letI : NormedAddCommGroup L := normed` | This alternative requires a normed additive group, called `L` in the source and $H$ in the Statement. The first `letI` installs this chosen normed structure on the same space for the inner-product type that follows. |
| [Complex inner product on the B model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-5)<br>`        ∃ inner : InnerProductSpace ℂ L,`<br>`          letI : InnerProductSpace ℂ L := inner` | The same model must have a compatible complex inner product. This `letI` installs that inner product, so subsequent Hilbert-space operator types use this structure, not a separately chosen one. |
| [Complete B model and isomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-6)<br>`          ∃ complete : CompleteSpace L,`<br>`            letI : CompleteSpace L := complete`<br>`            Nonempty (B ≃⋆ₐ[ℂ] (L →L[ℂ] L)))) :` | The model must be complete; the last `letI` installs this completeness for its operator algebra. `Nonempty` requires a $\ast$-isomorphism $B\to \mathcal B(H)$ onto the entire operator algebra. The two model branches are alternatives; their spaces are quantified separately and may be zero. |
| [Existence of a star-isomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-7)<br>`    Nonempty (A ≃⋆ₐ[ℂ] B) ↔` | `Nonempty` says that the type of $\ast$-algebra isomorphisms $A\to B$ has an element. The outer equivalence relates this existence to the existence in the next row, not to a choice of a prescribed map. |
| [Existence of a closure-space homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-8)<br>`      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)`<br>`        (NormedSpace.geometricStructureClosure ℂ B)) := by` | The complete arguments are $c_A$ on $S(A)$ and $c_B$ on $S(B)$. `Nonempty` requires one homeomorphism $e:S(A)\to S(B)$ between these closure spaces. |
| [The same map and inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-9)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The inherited equivalence supplies the bijection $e$ and its inverse $e^{-1}$. The first field requires, for every $E\subseteq S(A)$, $$e(c_A(E))\subseteq c_B(e(E)).$$ The second requires, for every $F\subseteq S(B)$, $$e^{-1}(c_B(F))\subseteq c_A(e^{-1}(F)).$$ Both concern the same $e$ and together express the closure equality in the Statement. |
| [Continuity for arbitrary subsets](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/512cd884f8448768e9babb08ddd780e0eb15cf34727aa9a1c4925695669752ef/versions/gss-r1-06ab3118631304ff/index.html#card-61--source-row-10)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:(X,c)\to(Y,d)$, continuity means $$r(c(E))\subseteq d(r(E))\quad(E\subseteq X).$$ In the preceding row this definition is applied first to $r=e$ and then to $r=e^{-1}$, with the domain and target closures interchanged. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u v w z

variable {A : Type u} [NonUnitalCStarAlgebra A]
variable {B : Type v} [NonUnitalCStarAlgebra B]
variable {H : Type w} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable {K : Type z} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]

local instance instSpectralOrderBoundedOperatorModel : PartialOrder A :=
  _root_.CStarAlgebra.spectralOrder A
local instance instSpectralOrderedRingBoundedOperatorModel : StarOrderedRing A :=
  _root_.CStarAlgebra.spectralOrderedRing A
```

</details>

The model spaces in the two alternatives have the fixed independent source levels `w` and `z`; the algebra levels are `u` and `v`. The source names for those model spaces are local to their respective existential branches. No additional ambient Hilbert space is an input to this equivalence.
