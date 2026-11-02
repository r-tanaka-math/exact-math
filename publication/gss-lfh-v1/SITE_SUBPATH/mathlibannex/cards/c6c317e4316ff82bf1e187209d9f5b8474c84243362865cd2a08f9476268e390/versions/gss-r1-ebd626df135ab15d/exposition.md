Version 1 source-bound exposition export. Original text SHA-256: 92dc32ca182606097ac0347b9382b195992ec17389c680f68eafcbb07ac4d85f. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Irreducible dimension at most a fixed number

## Statement

Let $A$ be a nonzero complex C*-algebra, and let $n\in\mathbb N$.

For a complex C*-algebra $D$, write $S(D)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $D$; faces use real convexity. Write $c_D$ for the hull–kernel closure on $S(D)$:

$$
c_D(E)=\left\{I\in S(D):\bigcap_{J\in E}J\subseteq I\right\},\qquad E\subseteq S(D).
$$

These are the [geometric structure definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=52&start=37&end=39#L37) and its closure, with the norm-one description justified by the [norm-one support characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=52&start=82&end=91#L82).

For $I\in S(A)$, let $C_A(I)$ be its finite-chain component: the points reachable from $I$ by a finite chain in which adjacent points are equal or form a nonclosed two-point set. Give $C_A(I)$ the induced closure

$$
c_{C_A(I)}(E)=C_A(I)\cap c_A(E),\qquad E\subseteq C_A(I).
$$

For a complex Hilbert space $H$, let $\mathcal K(H)$ be the algebra of compact operators on $H$. In particular, $c_{\mathcal K(K)}$ denotes closure on $S(\mathcal K(K))$, where $\mathcal K(K)$ is itself the algebra to which the geometric structure construction is applied.

The following conditions are equivalent:

- Every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ on a complex Hilbert space has $H$ finite-dimensional and $\dim_{\mathbb C}H\le n$.
- For every $I\in S(A)$, there are a nonzero finite-dimensional complex Hilbert space $K$ with $\dim_{\mathbb C}K\le n$ and a bijection $e:C_A(I)\to S(\mathcal K(K))$ such that

$$
e(c_{C_A(I)}(E))=c_{\mathcal K(K)}(e(E))
\qquad(E\subseteq C_A(I)).
\tag{1}
$$

Here $c_{\mathcal K(K)}$ is the closure on the geometric structure space of the compact-operator algebra on this same $K$. Thus $e$ is a homeomorphism of closure spaces. The model $K$ and the map $e$ may depend on $I$; the bound $n$ is common to all components.

## Assumptions

The algebra $A$ is nonzero; no assumption $n>0$ is made. Representations are $\ast$-homomorphisms into bounded operators, without a requirement of unitality. Irreducibility includes a nonzero action, but does not require faithfulness. All Hilbert spaces are complex and complete. The compatible order on $A$ supplies positivity and pure states. Finite-dimensionality is a conclusion on the representation side and a requirement on the model side. It is separate from the numerical dimension bound. No separability hypothesis is added.

## Conclusion

A uniform finite bound on the dimensions of all irreducible representations is equivalent to the compact-operator component models in (1), with the same bound. For nonzero $A$, both sides are false at $n=0$, by the cited zero-bound exclusions. This does not add $n>0$ as an input assumption.

## Main citations

[The bounded-dimension characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SubhomogeneousCharacterization.lean.html?from=52&start=47&end=55#L47) specializes [the general dimension-predicate theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=52&start=328&end=338#L328) to the upper bound $n$. [The finite-dimensional compact-model predicate](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=52&start=62&end=75#L62) keeps finiteness and the bound on the same target. [The same-map full-continuity theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=52&start=176&end=204#L176) preserves the finite comparison and its inverse. The [representation-side zero-bound exclusion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SubhomogeneousCharacterization.lean.html?from=52&start=60&end=67#L60) and [component-side zero-bound exclusion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SubhomogeneousCharacterization.lean.html?from=52&start=86&end=93#L86) cover $n=0$.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SubhomogeneousCharacterization.lean.html?from=52&start=47&end=55#L47). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem forall_irreducible_finrank_le_iff_component_compact_homeomorph (n : ℕ) :
    (∀ (L : Type u) [NormedAddCommGroup L] [InnerProductSpace ℂ L] [CompleteSpace L],
      ∀ pi : NonUnitalCStarRepresentation A L, pi.IsIrreducible →
        FiniteDimensional ℂ L ∧ Module.finrank ℂ L ≤ n) ↔
    ∀ I : NormedSpace.GeometricStructureSpace ℂ A,
      ClosureSpace.HasFiniteDimensionalCompactHomeomorph.{u, u}
        ((NormedSpace.geometricStructureClosure ℂ A).subspace
          ((NormedSpace.geometricStructureClosure ℂ A).component I)) (fun m => m ≤ n)
```

The principal equivalence fixes the universe of $A$ and quantifies both representation spaces and compact-model spaces in that same universe. The [dimension transport to an independently specified Hilbert space](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=52&start=294&end=303#L294) is a separate theorem, not a quantifier over all universes in this equivalence.

| In the source | Mathematical meaning |
|---|---|
| [Ambient algebra and compatible order](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-0)<br>`universe u w`<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]`<br>`attribute [local instance] ContinuousLinearMap.isClosed_compactOperatorStarSubalgebra`<br>`  _root_.CStarAlgebra.spectralOrder _root_.CStarAlgebra.spectralOrderedRing` | The nonzero complex C*-algebra $A$ is fixed. The local instances supply its compatible order and closedness of the compact-operator algebra. The universe of representation and model spaces is the universe of $A$. |
| [Effective nonzero hypothesis](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-1)<br>`include hA in` | The preceding nontriviality instance for $A$ is included as an input to this theorem. |
| [Fixed bound and irreducible representations](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-2)<br>`theorem forall_irreducible_finrank_le_iff_component_compact_homeomorph (n : ℕ) :`<br>`    (∀ (L : Type u) [NormedAddCommGroup L] [InnerProductSpace ℂ L] [CompleteSpace L],`<br>`      ∀ pi : NonUnitalCStarRepresentation A L, pi.IsIrreducible →` | The natural number $n$ is fixed. For every complete complex Hilbert space $H$ (called $L$ here), every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ is tested. Nonunital notation does not require $A$ to lack an identity. |
| [Finite dimension and upper bound](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-3)<br>`        FiniteDimensional ℂ L ∧ Module.finrank ℂ L ≤ n) ↔` | The two requirements are finite-dimensionality of $H$ and $\dim_{\mathbb C}H\le n$. A finite-rank value alone is not substituted for finite-dimensionality. |
| [Component and applied comparison](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-4)<br>`    ∀ I : NormedSpace.GeometricStructureSpace ℂ A,`<br>`      ClosureSpace.HasFiniteDimensionalCompactHomeomorph.{u, u}`<br>`        ((NormedSpace.geometricStructureClosure ℂ A).subspace`<br>`          ((NormedSpace.geometricStructureClosure ℂ A).component I)) (fun m => m ≤ n) :=` | For every geometric point $I\in S(A)$, the ambient closure $c_A$ is restricted to $C_A(I)$. This induced closure is the argument of the compact-model condition. The function of $m$ sets the dimension condition to $m\le n$ for the same model. |
| [Closure and dimension-condition inputs](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-5)<br>`def HasFiniteDimensionalCompactHomeomorph.{uH, uX} {X : Type uX}`<br>`    (c : ClosureSpace X) (P : ℕ → Prop) : Prop :=` | Here $X=C_A(I)$ and the closure argument is $c_{C_A(I)}$; the condition on natural numbers is $P(m)\Longleftrightarrow m\le n$. |
| [Model and inner product](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-6)<br>`  ∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`    letI := instN`<br>`    ∃ instI : InnerProductSpace ℂ H,`<br>`      letI := instI` | There exist a model space $K$ (called $H$ in this definition), a normed additive structure and a complex inner product on it. The first local instance makes the normed structure available to the inner-product type; the second makes that same inner product available below. |
| [Completeness and nontriviality](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-7)<br>`      ∃ instC : CompleteSpace H,`<br>`        letI := instC`<br>`        ∃ instT : Nontrivial H,`<br>`          letI := instT` | The same model $K$ is complete and nonzero. Each local instance supplies the chosen structure to the subsequent types; these are not four different spaces. |
| [Dimension and one homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-8)<br>`          FiniteDimensional ℂ H ∧ P (Module.finrank ℂ H) ∧`<br>`            Nonempty (Homeomorph c`<br>`              (NormedSpace.geometricStructureClosure ℂ`<br>`                (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))` | The same model is finite-dimensional with $\dim_{\mathbb C}K\le n$. The final type is inhabited, so there exists a homeomorphism $e:C_A(I)\to S(\mathcal K(K))$. The algebra $\mathcal K(K)$ consists of compact operators on this same $K$. Both $K$ and $e$ may depend on $I$; $n$ is fixed. |
| [Homeomorphism and its inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c6c317e4316ff82bf1e187209d9f5b8474c84243362865cd2a08f9476268e390/versions/gss-r1-ebd626df135ab15d/index.html#card-52--source-row-9)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The structure extends one bijection $e$; its two continuity fields use that map and its inverse. For all $E\subseteq C_A(I)$ and $F\subseteq S(\mathcal K(K))$, $$e(c_{C_A(I)}(E))\subseteq c_{\mathcal K(K)}(e(E)),$$ $$e^{-1}(c_{\mathcal K(K)}(F))\subseteq c_{C_A(I)}(e^{-1}(F)).$$ These conditions give the closure-preserving equality in the Statement. |

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u w
variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]
attribute [local instance] ContinuousLinearMap.isClosed_compactOperatorStarSubalgebra
  _root_.CStarAlgebra.spectralOrder _root_.CStarAlgebra.spectralOrderedRing
```

Exact surrounding source:

```lean
include hA in
```

</details>

