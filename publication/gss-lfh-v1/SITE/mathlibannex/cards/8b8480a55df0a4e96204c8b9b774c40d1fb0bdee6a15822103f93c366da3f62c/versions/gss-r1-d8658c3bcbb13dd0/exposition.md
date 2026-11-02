Version 1 source-bound exposition export. Original text SHA-256: c8a82d70f3fa5e9841f68a5908f75ec9112222026fa71c70eabd222f14edf351. Link targets are adapted for this edition; the registered Card identity is unchanged.

# GSS rigidity when either algebra is finite-dimensional

## Statement

Let $A,B$ be complex C*-algebras. For a complex C*-algebra $D$, write $S(D)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $D$; faces use real convexity. Write $c_D$ for its hull–kernel closure:

$$
c_D(E)=\left\{I\in S(D):\bigcap_{J\in E}J\subseteq I\right\},\qquad E\subseteq S(D).
$$

These are the [geometric structure definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=60&start=37&end=39#L37) and its closure, with the norm-one description justified by the [norm-one support characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=60&start=82&end=91#L82).

Assume that at least one of $A,B$ is finite-dimensional as a complex vector space. Then $A$ and $B$ are $\ast$-isomorphic if and only if $S(A)$ and $S(B)$ are homeomorphic as closure spaces. Here a closure-space homeomorphism is a bijection $e:S(A)\to S(B)$ satisfying

$$
e(c_A(E))=c_B(e(E)),\qquad E\subseteq S(A).
$$

The equality is required for every subset, not just finite subsets.

## Assumptions

Finite-dimensionality is required on at least one side, not on both as an input. The algebras may be zero. No nonzero, unitality, separability, or prescribed dimension hypothesis is imposed.

## Conclusion

The equivalence concerns existence of a $\ast$-algebra isomorphism and existence of a closure-space homeomorphism. It does not require the isomorphism to induce a prescribed homeomorphism, or assert uniqueness.

## Main citations

[The either-side finite-dimensional theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html?from=60&start=147&end=165#L147) uses [the finite separating GNS representation theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/FiniteDimensionalCompact.lean.html?from=60&start=227&end=232#L227) and [rigidity for a given compact action](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactRepresentationRigidity.lean.html?from=60&start=96&end=106#L96). The finite separating family and compact action are supplied by these results, not additional hypotheses.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html?from=60&start=147&end=165#L147). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem nonempty_starAlgEquiv_iff_nonempty_geometricStructure_homeomorph_of_finiteDimensional_or
    (hfinite : FiniteDimensional ℂ A ∨ FiniteDimensional ℂ B) :
    Nonempty (A ≃⋆ₐ[ℂ] B) ↔
      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)
        (NormedSpace.geometricStructureClosure ℂ B))
```

| In the source | Mathematical meaning |
|---|---|
| [Two C*-algebras](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryFiniteDimensionalRigidity.lean.html#L51)<br>`variable {A : Type u} {B : Type v}`<br>`variable [NonUnitalCStarAlgebra A] [NonUnitalCStarAlgebra B]` | The inputs $A,B$ are arbitrary complex C*-algebras, including zero. Their size levels are independent. The source type allows unital algebras but does not require a unit. |
| [Finite-dimensionality on either side](https://exactmathematics.org/mathlibannex/cards/8b8480a55df0a4e96204c8b9b774c40d1fb0bdee6a15822103f93c366da3f62c/versions/gss-r1-d8658c3bcbb13dd0/index.html#card-60--source-row-1)<br>`    (hfinite : FiniteDimensional ℂ A ∨ FiniteDimensional ℂ B) :` | The disjunction requires $\dim_{\mathbb C}A<\infty$ or $\dim_{\mathbb C}B<\infty$. One side suffices, and no particular dimension or positivity condition is imposed. |
| [Existence of a star-isomorphism](https://exactmathematics.org/mathlibannex/cards/8b8480a55df0a4e96204c8b9b774c40d1fb0bdee6a15822103f93c366da3f62c/versions/gss-r1-d8658c3bcbb13dd0/index.html#card-60--source-row-2)<br>`    Nonempty (A ≃⋆ₐ[ℂ] B) ↔` | `Nonempty` says that the type of $\ast$-algebra isomorphisms $A\to B$ has an element. The outer equivalence relates this existence to the existence in the next row, not to a choice of a prescribed map. |
| [Existence of a closure-space homeomorphism](https://exactmathematics.org/mathlibannex/cards/8b8480a55df0a4e96204c8b9b774c40d1fb0bdee6a15822103f93c366da3f62c/versions/gss-r1-d8658c3bcbb13dd0/index.html#card-60--source-row-3)<br>`      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)`<br>`        (NormedSpace.geometricStructureClosure ℂ B)) := by` | The complete arguments are $c_A$ on $S(A)$ and $c_B$ on $S(B)$. `Nonempty` requires one homeomorphism $e:S(A)\to S(B)$ between these closure spaces. |
| [The same map and inverse](https://exactmathematics.org/mathlibannex/cards/8b8480a55df0a4e96204c8b9b774c40d1fb0bdee6a15822103f93c366da3f62c/versions/gss-r1-d8658c3bcbb13dd0/index.html#card-60--source-row-4)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The inherited equivalence supplies the bijection $e$ and its inverse $e^{-1}$. The first field requires, for every $E\subseteq S(A)$, $$e(c_A(E))\subseteq c_B(e(E)).$$ The second requires, for every $F\subseteq S(B)$, $$e^{-1}(c_B(F))\subseteq c_A(e^{-1}(F)).$$ Both concern the same $e$ and together express the closure equality in the Statement. |
| [Continuity for arbitrary subsets](https://exactmathematics.org/mathlibannex/cards/8b8480a55df0a4e96204c8b9b774c40d1fb0bdee6a15822103f93c366da3f62c/versions/gss-r1-d8658c3bcbb13dd0/index.html#card-60--source-row-5)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:(X,c)\to(Y,d)$, continuity means $$r(c(E))\subseteq d(r(E))\quad(E\subseteq X).$$ In the preceding row this definition is applied first to $r=e$ and then to $r=e^{-1}$, with the domain and target closures interchanged. |

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u v w z

variable {A : Type u} {B : Type v}
variable [NonUnitalCStarAlgebra A] [NonUnitalCStarAlgebra B]
```

</details>

