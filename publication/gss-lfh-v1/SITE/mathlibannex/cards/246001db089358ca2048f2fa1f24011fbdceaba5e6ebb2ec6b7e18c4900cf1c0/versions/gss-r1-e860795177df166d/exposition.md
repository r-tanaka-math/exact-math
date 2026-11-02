Version 1 source-bound exposition export. Original text SHA-256: 6dd11a0259518e5cc1181fd46265c04627c1db11cf272b2c7fb557e0916ff848. Link targets are adapted for this edition; the registered Card identity is unchanged.

# One-sided compact representability gives GSS rigidity

## Statement

Let $A,B$ be complex C*-algebras. For a complex C*-algebra $D$, write $S(D)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $D$; faces use real convexity. Write $c_D$ for its hull–kernel closure:

$$
c_D(E)=\left\{I\in S(D):\bigcap_{J\in E}J\subseteq I\right\},\qquad E\subseteq S(D).
$$

These are the [geometric structure definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=58&start=37&end=39#L37) and its closure, with the norm-one description justified by the [norm-one support characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=58&start=82&end=91#L82). Let $\mathcal K(H)$ denote the algebra of compact operators on a complex Hilbert space $H$.

Assume that at least one of $A,B$ admits a faithful $\ast$-representation $\pi$ on a complex Hilbert space $H$ whose image is contained in $\mathcal K(H)$. Then $A$ and $B$ are $\ast$-isomorphic if and only if $S(A)$ and $S(B)$ are homeomorphic as closure spaces. Here a closure-space homeomorphism is a bijection $e:S(A)\to S(B)$ satisfying

$$
e(c_A(E))=c_B(e(E)),\qquad E\subseteq S(A).
$$

The equality is required for every subset, not just finite subsets.

## Assumptions

A faithful compact-valued representation is required on at least one side. All Hilbert spaces are complex and complete. The algebras and representation spaces may be zero. Representations need not be unital; no separability or countability assumption is imposed.

## Conclusion

The equivalence concerns existence of a $\ast$-algebra isomorphism and existence of a closure-space homeomorphism. It does not require the isomorphism to induce a prescribed homeomorphism, or assert uniqueness.

## Main citations

[The either-side compact rigidity theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactRepresentationRigidity.lean.html?from=58&start=114&end=153#L114) is the stated equivalence. [Rigidity for a given compact action](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactRepresentationRigidity.lean.html?from=58&start=63&end=90#L63) allows an independent Hilbert universe and uses [the canonical compact c0-decomposition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactlyRepresentedDecomposition.lean.html?from=58&start=67&end=79#L67). [The existential representation comparison](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=58&start=113&end=135#L113) links the existential condition to the same reduced atomic action.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactRepresentationRigidity.lean.html?from=58&start=114&end=153#L114). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem nonempty_starAlgEquiv_iff_nonempty_geometricStructure_homeomorph_of_exists_isCompactlyRepresented
    (hCompact :
      (∃ (K : Type u) (normed : NormedAddCommGroup K),
        letI : NormedAddCommGroup K := normed
        ∃ inner : InnerProductSpace ℂ K,
          letI : InnerProductSpace ℂ K := inner
          ∃ complete : CompleteSpace K,
            letI : CompleteSpace K := complete
            ∃ pi : NonUnitalCStarRepresentation A K, pi.IsCompactlyRepresented) ∨
      (∃ (K : Type v) (normed : NormedAddCommGroup K),
        letI : NormedAddCommGroup K := normed
        ∃ inner : InnerProductSpace ℂ K,
          letI : InnerProductSpace ℂ K := inner
          ∃ complete : CompleteSpace K,
            letI : CompleteSpace K := complete
            ∃ pi : NonUnitalCStarRepresentation B K, pi.IsCompactlyRepresented)) :
    Nonempty (A ≃⋆ₐ[ℂ] B) ↔
      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)
        (NormedSpace.geometricStructureClosure ℂ B))
```

| In the source | Mathematical meaning |
|---|---|
| [Two C*-algebras](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CompactRepresentationRigidity.lean.html#L55)<br>`variable {A : Type u} {B : Type v}`<br>`variable [NonUnitalCStarAlgebra A] [NonUnitalCStarAlgebra B]` | The inputs $A,B$ are arbitrary complex C*-algebras, including zero. Their size levels are independent. The nonunital representation type imposes no requirement that either algebra lack a unit. |
| [Representation space on the A side](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-1)<br>`      (∃ (K : Type u) (normed : NormedAddCommGroup K),`<br>`        letI : NormedAddCommGroup K := normed`<br>`        ∃ inner : InnerProductSpace ℂ K,`<br>`          letI : InnerProductSpace ℂ K := inner` | The left alternative requires a space with a norm and compatible complex inner product. The source calls it `K`; it is the space $H$ of the Statement. Each `letI` makes the chosen structure on that same space available in the next type. |
| [Complete faithful compact action on A](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-2)<br>`          ∃ complete : CompleteSpace K,`<br>`            letI : CompleteSpace K := complete`<br>`            ∃ pi : NonUnitalCStarRepresentation A K, pi.IsCompactlyRepresented) ∨` | The next existential requires completeness of that space. Its `letI` makes the Hilbert-space representation type available. There must then exist a faithful $\pi:A\to\mathcal B(H)$ with $\pi(A)\subseteq\mathcal K(H)$. The final disjunction permits the alternative on the $B$ side. |
| [Representation space on the B side](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-3)<br>`      (∃ (K : Type v) (normed : NormedAddCommGroup K),`<br>`        letI : NormedAddCommGroup K := normed`<br>`        ∃ inner : InnerProductSpace ℂ K,`<br>`          letI : InnerProductSpace ℂ K := inner` | The right alternative has its own existentially quantified normed space and compatible complex inner product, again installed by `letI`. It is not required to be the representation space of the $A$ alternative. |
| [Complete faithful compact action on B](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-4)<br>`          ∃ complete : CompleteSpace K,`<br>`            letI : CompleteSpace K := complete`<br>`            ∃ pi : NonUnitalCStarRepresentation B K, pi.IsCompactlyRepresented)) :` | This space must be complete, and must admit a faithful $\pi:B\to\mathcal B(H)$ with $\pi(B)\subseteq\mathcal K(H)$. The two complete representation conditions are alternatives, not simultaneous requirements. |
| [Meaning of compact representability](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-5)<br>`def NonUnitalCStarRepresentation.IsCompactlyRepresented`<br>`    (pi : NonUnitalCStarRepresentation A H) : Prop :=`<br>`  Function.Injective pi ∧ ∀ a : A, IsCompactOperator (pi a)` | For whichever algebra is represented, injectivity is faithfulness and the second conjunct is compactness of every represented element. Surjectivity onto all of $\mathcal K(H)$ is not required. |
| [Existence of a star-isomorphism](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-6)<br>`    Nonempty (A ≃⋆ₐ[ℂ] B) ↔` | `Nonempty` asserts that the type of $\ast$-algebra isomorphisms $A\to B$ has an element. The equivalence relates this existence to the existence in the next row; it selects neither a unique isomorphism nor a prescribed one. |
| [Existence of a closure-space homeomorphism](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-7)<br>`      Nonempty (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)`<br>`        (NormedSpace.geometricStructureClosure ℂ B)) := by` | The two full arguments are the geometric closures $c_A$ on $S(A)$ and $c_B$ on $S(B)$. `Nonempty` requires one homeomorphism $e:S(A)\to S(B)$ between these closure spaces. |
| [The same map and inverse](https://exactmathematics.org/mathlibannex/cards/246001db089358ca2048f2fa1f24011fbdceaba5e6ebb2ec6b7e18c4900cf1c0/versions/gss-r1-e860795177df166d/index.html#card-58--source-row-8)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The inherited equivalence supplies the bijection $e$ and its inverse $e^{-1}$. The two fields require, for every $E\subseteq S(A)$ and $F\subseteq S(B)$ respectively, $$e(c_A(E))\subseteq c_B(e(E)),$$ $$e^{-1}(c_B(F))\subseteq c_A(e^{-1}(F)).$$ Both use the same $e$; together they give the closure equality in the Statement. |

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u v w

variable {A : Type u} {B : Type v}
variable [NonUnitalCStarAlgebra A] [NonUnitalCStarAlgebra B]
variable {H : Type w} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```

</details>


The two existential Hilbert spaces have the fixed size levels of their respective algebras (`u` for $A$, `v` for $B$). The independently sized space in the cited fixed-action theorem does not change these quantifiers.
