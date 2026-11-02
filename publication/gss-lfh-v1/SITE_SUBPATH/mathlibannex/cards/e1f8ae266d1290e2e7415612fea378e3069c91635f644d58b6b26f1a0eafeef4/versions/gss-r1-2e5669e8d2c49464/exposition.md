Version 1 source-bound exposition export. Original text SHA-256: 7a355b471983ef09468f8745567a53d15550271782535a481842f99c78932eae. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Existence of a faithful compact representation

## Statement

Let $A$ be a complex C*-algebra. For a complex Hilbert space $L$, let $\mathcal K(L)$ be the algebra of compact operators on $L$. Write $\operatorname{Prim}(A)$ for the [primitive ideal spectrum](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Primitive.lean.html?from=55&start=33&end=33#L33): its points are the kernels of pure-state GNS representations. Its [hull–kernel topology](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Topology.lean.html?from=55&start=30&end=31#L30) has closure

$$
c_{\operatorname{Prim}(A)}(E)=\left\{P\in\operatorname{Prim}(A):\bigcap_{Q\in E}Q\subseteq P\right\},\qquad E\subseteq\operatorname{Prim}(A).
$$

The following conditions are equivalent:

- There is a complex Hilbert space $H$ and a faithful $\ast$-representation $\pi:A\to\mathcal B(H)$ such that $\pi(A)\subseteq\mathcal K(H)$.
- Every irreducible $\ast$-representation $\rho:A\to\mathcal B(K)$ on a complex Hilbert space satisfies $\rho(A)=\mathcal K(K)$, and $\operatorname{Prim}(A)$ is discrete: every singleton is open.

## Assumptions

Hilbert spaces are complex and complete. Representations are $\ast$-homomorphisms, without a requirement of unitality; irreducibility includes a nonzero action. Zero algebras, zero representation spaces, and empty primitive spectra are allowed. No separability or countability assumption is made.

## Conclusion

The two conditions characterize the existence of a faithful representation by compact operators. The cited reduced-atomic characterization gives such a representation when they hold. This does not require an arbitrary faithful representation to have compact values, or require its image to be all compact operators on its Hilbert space.

## Main citations

[The faithful compact-representation criterion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=55&start=142&end=156#L142) is the stated equivalence. [The fixed reduced-atomic characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=55&start=83&end=103#L83) separates compactness of all irreducible images from discreteness of the existing spectrum. [The existential representation comparison](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=55&start=113&end=135#L113) gives the same canonical reduced-atomic witness; [transport from an action on an independent Hilbert space](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=55&start=72&end=78#L72) does not shrink the original space.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=55&start=142&end=156#L142). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem exists_isCompactlyRepresented_iff :
    (∃ (K : Type u) (normed : NormedAddCommGroup K),
      letI : NormedAddCommGroup K := normed
      ∃ inner : InnerProductSpace ℂ K,
        letI : InnerProductSpace ℂ K := inner
        ∃ complete : CompleteSpace K,
          letI : CompleteSpace K := complete
          ∃ pi : NonUnitalCStarRepresentation A K, pi.IsCompactlyRepresented) ↔
    (∀ (K : Type u) [NormedAddCommGroup K] [InnerProductSpace ℂ K]
      [CompleteSpace K] (rho : NonUnitalCStarRepresentation A K),
      rho.IsIrreducible →
        (NonUnitalStarAlgHom.range rho) = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K) ∧
    DiscreteTopology (PrimitiveSpectrum A)
```

The principal equivalence fixes the universe of $A$ and quantifies its Hilbert spaces in that same universe. The independently specified Hilbert space of the separately cited transport theorem is not an all-universe quantifier in this equivalence.

| In the source | Mathematical meaning |
|---|---|
| [Algebra and positivity](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-0)<br>`attribute [local instance] _root_.CStarAlgebra.spectralOrder`<br>`  _root_.CStarAlgebra.spectralOrderedRing` | The C*-algebra $A$ uses its spectral order to define positive functionals and pure states. This is the order underlying the primitive spectrum in the theorem. |
| [Ambient algebra](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-1)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A]` | The input is an arbitrary complex C*-algebra $A$, including the zero algebra. The type does not require a unit, and does not require the algebra to lack a unit. |
| [Representation space and norm](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-2)<br>`    (∃ (K : Type u) (normed : NormedAddCommGroup K),`<br>`      letI : NormedAddCommGroup K := normed` | There exists a space, called `K` here and $H$ in the first condition, with a normed additive group structure. The `letI` makes that same norm available when specifying its inner product. |
| [Inner product and completeness](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-3)<br>`      ∃ inner : InnerProductSpace ℂ K,`<br>`        letI : InnerProductSpace ℂ K := inner`<br>`        ∃ complete : CompleteSpace K,`<br>`          letI : CompleteSpace K := complete` | The existential quantifiers require a compatible complex inner product and completeness on the same $H$. The first `letI` installs the chosen inner product; the second installs completeness. Together they make $H$ a complex Hilbert space on which the next representation is defined. |
| [Faithful compact representation](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-4)<br>`          ∃ pi : NonUnitalCStarRepresentation A K, pi.IsCompactlyRepresented) ↔` | There exists a $\ast$-representation $\pi:A\to\mathcal B(H)$ that is faithful and satisfies $\pi(A)\subseteq\mathcal K(H)$. This is the left side of the equivalence, not an equality of the two operator algebras. |
| [Meaning of compact representability](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-5)<br>`def NonUnitalCStarRepresentation.IsCompactlyRepresented`<br>`    (pi : NonUnitalCStarRepresentation A H) : Prop :=`<br>`  Function.Injective pi ∧ ∀ a : A, IsCompactOperator (pi a)` | The first conjunct is injectivity of the same $\pi$, that is, faithfulness. The second says that $\pi(a)$ is compact for every $a\in A$. Together they express exactly the first condition in the Statement. |
| [All irreducible representations](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-6)<br>`    (∀ (K : Type u) [NormedAddCommGroup K] [InnerProductSpace ℂ K]`<br>`      [CompleteSpace K] (rho : NonUnitalCStarRepresentation A K),`<br>`      rho.IsIrreducible →`<br>`        (NonUnitalStarAlgHom.range rho) = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K) ∧` | For every complex Hilbert space $K$ and every irreducible $\rho:A\to\mathcal B(K)$, the operator-algebra image is $$\rho(A)=\mathcal K(K).$$ Here `range rho` and `compactOperatorStarSubalgebra` are subalgebras of the same $\mathcal B(K)$. This is stronger than merely having compact values. |
| [Primitive points](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-7)<br>`def primitiveKernelFamily : Set (Set A) :=`<br>`  Set.range fun phi : NonUnitalPureState A => (kernelIdeal phi.gnsRepresentation : Set A)`<br><br>`/-- Actual primitive ideal carriers, not geometric primitive-spectrum points. -/`<br>`def PrimitiveSpectrum := {P : Set A // P ∈ primitiveKernelFamily A}` | The points $P\in\operatorname{Prim}(A)$ are kernels of pure-state GNS representations, regarded as subsets of $A$. The subtype records membership in precisely this family; it is not the geometric structure space $S(A)$. |
| [Hull–kernel topology](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-8)<br>`def primitiveSpectrumClosure : ClosureSpace (PrimitiveSpectrum A) :=`<br>`  ClosureSpace.HullKernel.space (primitiveKernelFamily A) (univ_notMem_primitiveKernelFamily A)` | The first argument is the family of underlying sets of primitive ideals of $A$. The second is the established fact that $A$ itself, written `Set.univ`, is not a member of this family; it is the required input for constructing the hull–kernel closure on that family. For every $E\subseteq\operatorname{Prim}(A)$, $$c_{\operatorname{Prim}(A)}(E)=\left\{P\in\operatorname{Prim}(A):\bigcap_{Q\in E}Q\subseteq P\right\}.$$ |
| [Discreteness](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e1f8ae266d1290e2e7415612fea378e3069c91635f644d58b6b26f1a0eafeef4/versions/gss-r1-2e5669e8d2c49464/index.html#card-55--source-row-9)<br>`    DiscreteTopology (PrimitiveSpectrum A) :=` | The second conjunct says that $\operatorname{Prim}(A)$ has the discrete topology. It accompanies the assertion about every irreducible image; it is not a substitute for that assertion. The empty spectrum is allowed. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
attribute [local instance] _root_.CStarAlgebra.spectralOrder
  _root_.CStarAlgebra.spectralOrderedRing
```

Exact surrounding source:

```lean
universe u v

variable {A : Type u} [NonUnitalCStarAlgebra A]
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```

</details>

