Version 1 source-bound exposition export. Original text SHA-256: b5c8300d8eb0a88682faf869992f55867bdedc627c9ae256531e9fa6059f1738. Link targets are adapted for this edition; the registered Card identity is unchanged.

# GSS rigidity when either algebra has an elementary model

## Statement

Let $A,B$ be complex C*-algebras. For a complex C*-algebra $D$, write $S(D)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $D$; faces use real convexity. Write $c_D$ for its hull–kernel closure:

$$
c_D(E)=\left\{I\in S(D):\bigcap_{J\in E}J\subseteq I\right\},\qquad E\subseteq S(D).
$$

These are the [geometric structure definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=59&start=37&end=39#L37) and its closure, with the norm-one description justified by the [norm-one support characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=59&start=82&end=91#L82).

Let $\mathcal K(H)$ denote the algebra of compact operators on a complex Hilbert space $H$. Assume that at least one of $A,B$ is $\ast$-isomorphic to $\mathcal K(H)$ for some such $H$. Then $A$ and $B$ are $\ast$-isomorphic if and only if $S(A)$ and $S(B)$ are homeomorphic as closure spaces. Here a closure-space homeomorphism is a bijection $e:S(A)\to S(B)$ satisfying

$$
e(c_A(E))=c_B(e(E)),\qquad E\subseteq S(A).
$$

The equality is required for every subset, not just finite subsets.

## Assumptions

The compact-operator model is required on at least one side. It is an isomorphism onto the whole algebra $\mathcal K(H)$, not merely a representation with compact values. The Hilbert space is complex and complete; it and the algebras may be zero. No unitality, separability, countability, or finite-dimensionality hypothesis is imposed.

## Conclusion

The equivalence concerns existence of a $\ast$-algebra isomorphism and existence of a closure-space homeomorphism. It does not require the isomorphism to induce a prescribed homeomorphism, or assert uniqueness.

## Main citations

[The either-side elementary-model theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html?from=59&start=88&end=126#L88) uses [rigidity for a specified compact-operator equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html?from=59&start=61&end=68#L61). The [given-action compact rigidity theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactRepresentationRigidity.lean.html?from=59&start=96&end=106#L96) applies to the representation on that same model space, including the zero case.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html?from=59&start=88&end=126#L88). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem nonempty_starAlgEquiv_iff_nonempty_geometricStructure_homeomorph_of_exists_compactOperatorEquiv
    (hModel :
      (∃ (H : Type w) (normed : NormedAddCommGroup H),
        letI : NormedAddCommGroup H := normed
        ∃ inner : InnerProductSpace ℂ H,
          letI : InnerProductSpace ℂ H := inner
          ∃ complete : CompleteSpace H,
            letI : CompleteSpace H := complete
            Nonempty (A ≃⋆ₐ[ℂ] ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)) ∨
      (∃ (K : Type z) (normed : NormedAddCommGroup K),
        letI : NormedAddCommGroup K := normed
        ∃ inner : InnerProductSpace ℂ K,
          letI : InnerProductSpace ℂ K := inner
          ∃ complete : CompleteSpace K,
            letI : CompleteSpace K := complete
            Nonempty (B ≃⋆ₐ[ℂ] ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K))) :
    Nonempty (A ≃⋆ₐ[ℂ] B) ↔
      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)
        (NormedSpace.geometricStructureClosure ℂ B))
```

| In the source | Mathematical meaning |
|---|---|
| [Two C*-algebras](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html#L51)<br>`variable {A : Type u} {B : Type v}`<br>`variable [NonUnitalCStarAlgebra A] [NonUnitalCStarAlgebra B]` | The inputs $A,B$ are arbitrary complex C*-algebras, including zero. Their size levels are independent. The source type allows unital algebras but does not require a unit. |
| [Normed model on the A side](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-1)<br>`      (∃ (H : Type w) (normed : NormedAddCommGroup H),`<br>`        letI : NormedAddCommGroup H := normed` | This alternative requires a normed additive group, called `H` in the source and $H$ in the Statement. The first `letI` installs this chosen normed structure on the same space for the inner-product type that follows. |
| [Complex inner product on the A model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-2)<br>`        ∃ inner : InnerProductSpace ℂ H,`<br>`          letI : InnerProductSpace ℂ H := inner` | The same model must have a compatible complex inner product. This `letI` installs that inner product, so subsequent Hilbert-space operator types use this structure, not a separately chosen one. |
| [Complete A model and isomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-3)<br>`          ∃ complete : CompleteSpace H,`<br>`            letI : CompleteSpace H := complete`<br>`            Nonempty (A ≃⋆ₐ[ℂ] ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)) ∨` | The model must be complete; the last `letI` installs this completeness for its operator algebra. `Nonempty` requires a $\ast$-isomorphism $A\to \mathcal K(H)$ onto the entire operator algebra. The two model branches are alternatives; their spaces are quantified separately and may be zero. |
| [Normed model on the B side](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-4)<br>`      (∃ (K : Type z) (normed : NormedAddCommGroup K),`<br>`        letI : NormedAddCommGroup K := normed` | This alternative requires a normed additive group, called `K` in the source and $H$ in the Statement. The first `letI` installs this chosen normed structure on the same space for the inner-product type that follows. |
| [Complex inner product on the B model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-5)<br>`        ∃ inner : InnerProductSpace ℂ K,`<br>`          letI : InnerProductSpace ℂ K := inner` | The same model must have a compatible complex inner product. This `letI` installs that inner product, so subsequent Hilbert-space operator types use this structure, not a separately chosen one. |
| [Complete B model and isomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-6)<br>`          ∃ complete : CompleteSpace K,`<br>`            letI : CompleteSpace K := complete`<br>`            Nonempty (B ≃⋆ₐ[ℂ] ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K))) :` | The model must be complete; the last `letI` installs this completeness for its operator algebra. `Nonempty` requires a $\ast$-isomorphism $B\to \mathcal K(H)$ onto the entire operator algebra. The two model branches are alternatives; their spaces are quantified separately and may be zero. |
| [Existence of a star-isomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-7)<br>`    Nonempty (A ≃⋆ₐ[ℂ] B) ↔` | `Nonempty` says that the type of $\ast$-algebra isomorphisms $A\to B$ has an element. The outer equivalence relates this existence to the existence in the next row, not to a choice of a prescribed map. |
| [Existence of a closure-space homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-8)<br>`      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)`<br>`        (NormedSpace.geometricStructureClosure ℂ B)) := by` | The complete arguments are $c_A$ on $S(A)$ and $c_B$ on $S(B)$. `Nonempty` requires one homeomorphism $e:S(A)\to S(B)$ between these closure spaces. |
| [The same map and inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-9)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The inherited equivalence supplies the bijection $e$ and its inverse $e^{-1}$. The first field requires, for every $E\subseteq S(A)$, $$e(c_A(E))\subseteq c_B(e(E)).$$ The second requires, for every $F\subseteq S(B)$, $$e^{-1}(c_B(F))\subseteq c_A(e^{-1}(F)).$$ Both concern the same $e$ and together express the closure equality in the Statement. |
| [Continuity for arbitrary subsets](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6b0c4cdd1964f6eb8c8b457a0b1b9b14bf8af4b70b47d74a6675a0a58e03bac5/versions/gss-r1-94476287b229a2fa/index.html#card-59--source-row-10)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:(X,c)\to(Y,d)$, continuity means $$r(c(E))\subseteq d(r(E))\quad(E\subseteq X).$$ In the preceding row this definition is applied first to $r=e$ and then to $r=e^{-1}$, with the domain and target closures interchanged. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u v w z

variable {A : Type u} {B : Type v}
variable [NonUnitalCStarAlgebra A] [NonUnitalCStarAlgebra B]
```

</details>

The model spaces in the two alternatives have the fixed independent source levels `w` and `z`; the algebra levels are `u` and `v`. The source names for those model spaces are local to their respective existential branches. No additional ambient Hilbert space is an input to this equivalence.
