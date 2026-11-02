Version 1 source-bound exposition export. Original text SHA-256: b97ca9ba48a7757d123ccaf5eb5ebd4009a5f09b5123a99bbec8e8a34fdb35f9. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Elementary C*-algebras from singleton spectrum and finite conjugation

## Statement

Let $A$ be a nonzero complex C*-algebra with its compatible order. Write $\widehat A$ for its [irreducible spectrum](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=45&start=73&end=73#L73), the pure states modulo unitary equivalence of their GNS representations, and $S(A)$ for its [geometric structure closure space](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=45&start=57&end=59#L57). For $I\in S(A)$, let $C_A(I)$ be its finite-chain component, with the closure induced from $S(A)$. For a complex Hilbert space $H$, let $\mathcal K(H)$ denote the algebra of compact operators on $H$.

The following conditions are equivalent.

1. There is a pure state $\varphi$ of $A$ whose [GNS representation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=45&start=38&end=39#L38) $\pi_\varphi:A\to\mathcal B(H_\varphi)$ is faithful and satisfies
   $$
   \pi_\varphi(A)=\mathcal K(H_\varphi).\tag{1}
   $$
2. The irreducible spectrum $\widehat A$ is a singleton, and there is a point $I\in S(A)$ whose component $C_A(I)$ satisfies the conjugation condition below.

For a closure space $Y$, write $c_Y$ for its closure operator. For the geometric structure spaces $S(A)$ and $S(B)$, abbreviate these operators to $c_A$ and $c_B$, respectively. Write $r(E)$ for the image of a subset $E$ under a map $r$. The condition concerns every closure space $X$ that is homeomorphic to $S(B)$ for some nonzero complex C*-algebra $B$. Here $S(B)$ is the [same geometric structure construction](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=45&start=57&end=59#L57) used for $S(A)$. A homeomorphism $r:S(B)\to X$ is a bijection preserving closure on every subset:
$$
r\bigl(c_B(E)\bigr)
=c_X\bigl(r(E)\bigr)
\qquad(E\subseteq S(B)).
$$
The algebra $B$ may vary; no unit, separability assumption or chosen representation of $B$ is part of this condition.

For every such $X$, consider each of its finite-chain components $D$, with the induced closure $c_D(E)=D\cap c_X(E)$ for $E\subseteq D$, and all bijections
$$
f:D\longrightarrow C_A(I),\qquad g:D\longrightarrow D.
$$
A [finite-chain component](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=45&start=68&end=68#L68) consists of points joined by a finite chain of linked pairs. Two points are [linked](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=45&start=30&end=30#L30) if they are equal or their two-point set is not closed. These components are taken in the specified closure space, not as connected components of a topology.

A bijection $r:Y\to Z$ of closure spaces is a [finite homeomorphism](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=45&start=157&end=159#L157) if it preserves closure on every finite subset:
$$
r\bigl(c_Y(F)\bigr)
=c_Z\bigl(r(F)\bigr)
\qquad(F\subseteq Y\text{ finite}).\tag{2}
$$
A map $r:Y\to Z$ is [continuous](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=45&start=29&end=30#L29) if
$$
r\bigl(c_Y(E)\bigr)
\subseteq c_Z\bigl(r(E)\bigr)
\qquad(E\subseteq Y).\tag{3}
$$

The required condition is that whenever $f$ and $g$ are finite homeomorphisms and are also continuous in the sense of (3), transporting $g$ to $C_A(I)$ by $f$ gives a homeomorphism. More explicitly, both
$$
\begin{aligned}
h&=f\circ g\circ f^{-1},\\
h^{-1}&=f\circ g^{-1}\circ f^{-1}
\end{aligned}
\qquad:C_A(I)\longrightarrow C_A(I)\tag{4}
$$
must be continuous on arbitrary subsets. This is required for every $X$, every component $D$ and every pair $f,g$ described above. Continuity of $f^{-1}$ or $g^{-1}$ on arbitrary subsets is not assumed. The inverses in (4) are those of the same bijections $f$ and $g$.

## Assumptions

$A$ is a nonzero complex C*-algebra with its compatible order. It need not be unital or separable, and no finite-dimensionality assumption is imposed. The geometric condition requires both a singleton irreducible spectrum and the existence of $I\in S(A)$; neither condition is interpreted vacuously. The source guide records the fixed size bounds for the spaces in the conjugation condition.

## Conclusion

The two geometric conditions characterize the existence of a pure state whose faithful GNS representation identifies $A$, as a C*-algebra, with $\mathcal K(H_\varphi)$. The Hilbert space and representation in this identification are those of the same state $\varphi$ in (1).

## Main citations

The [compact-model characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryCharacterization.lean.html?from=45&start=85&end=104#L85) states this equivalence in every Hilbert dimension. Its two directions use the [existence of a compact-operator model](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryOfFiniteConjugation.lean.html?from=45&start=165&end=198#L165) and the [conjugation property of compact-operator models](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryCharacterization.lean.html?from=45&start=48&end=63#L48). The [conjugation condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/FiniteConjugation.lean.html?from=45&start=41&end=50#L41) specifies the inputs and the two continuous maps in (4); the [realization of closure spaces by C*-algebras](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CStarRealization.lean.html#L41) specifies the spaces $X$. The [conjugate and its inverse](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/FiniteHomeomorph.lean.html?from=45&start=51&end=55#L51) act by the formulas in (4).

## Lean source signature (exact)

The preceding `variable` declarations supply `A` and its algebra and order structures; `[Nontrivial A]` appears explicitly in the theorem. The outer `↔` compares the GNS-model condition with a conjunction `∧`: a singleton irreducible spectrum and the existence of a geometric point `I` with the component condition. The following is the contiguous prefix of the selected declaration, ending before the proof assignment.

```lean
theorem exists_pureState_compactOperatorModel_iff_singleton_finiteConjugation
    [Nontrivial A] :
    (∃ phi : NonUnitalPureState A, IsCompactOperatorModel phi.gnsRepresentation) ↔
      (∃ q : IrreducibleSpectrum A, ∀ r : IrreducibleSpectrum A, r = q) ∧
      ∃ I : NormedSpace.GeometricStructureSpace ℂ A,
        ((NormedSpace.geometricStructureClosure ℂ A).subspace
          ((NormedSpace.geometricStructureClosure ℂ A).component I)).HasContinuousFiniteConjugation
            (ClosureCat.IsCStarRealizable.{u, max u w})
```

| In the source | Mathematical meaning |
| --- | --- |
| [Ambient algebra](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-0)<br>`universe u v w uA uL`<br>`variable {A : Type u} [NonUnitalCStarAlgebra A]`<br>`variable [PartialOrder A] [StarOrderedRing A]` | The complex C*-algebra $A$ with its compatible order; the size parameters are fixed for the selected theorem. No identity is required. |
| [Nonzero algebra and one GNS model](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-1)<br>`    [Nontrivial A] :`<br>`    (∃ phi : NonUnitalPureState A, IsCompactOperatorModel phi.gnsRepresentation) ↔` | The nonzero algebra $A$ and one pure state $\varphi$ whose same GNS representation $\pi_\varphi:A\to\mathcal B(H_\varphi)$ satisfies (1). |
| [Compact-operator model](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-2)<br>`def IsCompactOperatorModel [NonUnitalCStarAlgebra A]`<br>`    (e : A →⋆ₙₐ[ℂ] (H →L[ℂ] H)) : Prop :=`<br>`  Function.Injective e ∧`<br>`    (∀ a : A, IsCompactOperator (e a)) ∧`<br>`    ∀ T : H →L[ℂ] H, IsCompactOperator T → ∃ a : A, e a = T` | Applied to $\pi_\varphi$, this means faithfulness and the two inclusions giving $$\pi_\varphi(A)=\mathcal K(H_\varphi).$$ Every image operator is compact, and every compact operator is an image of this same representation. |
| [Singleton spectrum](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-3)<br>`      (∃ q : IrreducibleSpectrum A, ∀ r : IrreducibleSpectrum A, r = q) ∧` | The irreducible spectrum $\widehat A$ has exactly one point, including its existence. This is conjoined with the component condition that follows. |
| [Point and applied component condition](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-4)<br>`      ∃ I : NormedSpace.GeometricStructureSpace ℂ A,`<br>`        ((NormedSpace.geometricStructureClosure ℂ A).subspace`<br>`          ((NormedSpace.geometricStructureClosure ℂ A).component I)).HasContinuousFiniteConjugation`<br>`            (ClosureCat.IsCStarRealizable.{u, max u w}) := by` | A point $I\in S(A)$ selects its finite-chain component $C_A(I)$. The ambient closure $c_A$ is restricted to this component, and the resulting closure is the input of the conjugation condition, with precisely the stated class of test spaces. |
| [Geometric points](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-5)<br>`def GeometricStructureSpace : Type u := {I : Set E // I ∈ geometricStructureFamily 𝕜 E}` | A point of $S(A)$ is a subset of $A$ belonging to the geometric structure family. Thus the quantified $I$ is a geometric point, not an arbitrary subset or a normal-part point. |
| [Ambient geometric closure](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-6)<br>`def geometricStructureClosure : ClosureSpace (GeometricStructureSpace 𝕜 E) :=`<br>`  ClosureSpace.HullKernel.space (geometricStructureFamily 𝕜 E)`<br>`    (univ_notMem_geometricStructureFamily 𝕜 E)` | The hull–kernel closure $c_A$ on the whole space $S(A)$, rather than the relative closure on a normal part. |
| [Finite-chain component](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-7)<br>`def component (c : ClosureSpace α) (x : α) : Set α := {y \| c.Related x y}` | The points related to $I$ by finite chains form $C_A(I)$. This is not a claim about ordinary topological connectedness. |
| [Induced component closure](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-8)<br>`def subspace (c : ClosureSpace α) (A : Set α) : ClosureSpace A :=`<br>`  c.induced (Subtype.val : A → α)` | Restricting the ambient closure along inclusion gives the closure on the component. For $E\subseteq C_A(I)$, $$c_{C_A(I)}(E)=C_A(I)\cap c_A(E).$$ |
| [Class of test spaces](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-9)<br>`def IsCStarRealizable.{uA, uX} (X : ClosureCat.{uX}) : Prop :=`<br>`  ∃ (A : Type uA) (instA : NonUnitalCStarAlgebra A),`<br>`    letI : NonUnitalCStarAlgebra A := instA`<br>`    Nontrivial A ∧ Nonempty`<br>`      (ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A) X.str)` | A test space $X$ is homeomorphic, for full closure, to $S(B)$ for some nonzero complex C*-algebra $B$. The bound algebra in this definition is the realizing $B$, not necessarily the original $A$. |
| [All tests, components and first map](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-10)<br>`def HasContinuousFiniteConjugation (c : ClosureSpace α) (D : ClosureCat.{s} → Prop) : Prop :=`<br>`  ∀ (L : ClosureCat.{s}), D L → ∀ t : L,`<br>`    ∀ f : FiniteHomeomorph (L.str.subspace (L.str.component t)) c,`<br>`      (L.str.subspace (L.str.component t)).Continuous c f.toEquiv →` | Apply the closure parameter to $c_{C_A(I)}$ and the test class to the preceding realizable spaces. For every such $X$, every chosen point selects a component $D\subseteq X$ with induced closure; the map $f:D\to C_A(I)$ is a finite homeomorphism and is fully continuous in the forward direction. |
| [Second map and the two conclusions](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-11)<br>`      ∀ g : FiniteHomeomorph (L.str.subspace (L.str.component t))`<br>`          (L.str.subspace (L.str.component t)),`<br>`        (L.str.subspace (L.str.component t)).Continuous`<br>`          (L.str.subspace (L.str.component t)) g.toEquiv →`<br>`        c.Continuous c (f.conjugate g).toEquiv ∧`<br>`          c.Continuous c (f.conjugate g).toEquiv.symm` | For every finite homeomorphism $g:D\to D$ with forward full continuity, both the conjugate and its actual inverse are fully continuous on $C_A(I)$: $$\begin{aligned}h&=f\circ g\circ f^{-1},\\h^{-1}&=f\circ g^{-1}\circ f^{-1}.\end{aligned}$$ These are the same maps in (4); no full continuity of $f^{-1}$ or $g^{-1}$ is an input. |
| [Finite homeomorphism](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-12)<br>`structure FiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  finitelyContinuous_toFun : c.FinitelyContinuous d toFun`<br>`  finitelyContinuous_invFun : d.FinitelyContinuous c invFun` | One bijection with finite continuity for it and its inverse. For $f$ and $g$ this gives the finite-set equality (2) in their respective induced closure spaces. |
| [Finite continuity](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-13)<br>`def FinitelyContinuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, s.Finite → f '' c.closure s ⊆ d.closure (f '' s)` | Closure preservation by inclusion for every finite subset, including the empty subset. Applying this in both directions to the same bijection gives (2). |
| [Full continuity](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-14)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | The inclusion (3) for every subset, without a finiteness restriction. In the conclusion the source and target closure are both $c_{C_A(I)}$. |
| [The same conjugation](https://exactmathematics.org/mathlibannex/cards/dc51710ade94e76e70bcb7900241f80803b3dce6e116bf506bc4edf74a6b2656/versions/gss-r1-d6d5c51df5128d1a/index.html#card-45--source-row-15)<br>`def FiniteHomeomorph.conjugate (f : FiniteHomeomorph c d)`<br>`    (g : FiniteHomeomorph c c) : FiniteHomeomorph d d :=`<br>`  f.symm.trans (g.trans f)` | The equivalence obtained by composing the same $f^{-1}$, then $g$, then $f$. Its forward map is $h=f\circ g\circ f^{-1}$ and its inverse is $h^{-1}=f\circ g^{-1}\circ f^{-1}$, not an independently chosen inverse. |

Size convention: in `.{u, max u w}`, the theorem's algebra $A$ and each realizing algebra $B$ have level $u$; the underlying set of $X$ has level $\max(u,w)$. The conjugation test ranges over all the stated spaces at these fixed levels, not over all universes at once.

### Source context (separate exact excerpts)

[Exact ambient source](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryCharacterization.lean.html#L38):

```lean
universe u v w uA uL
variable {A : Type u} [NonUnitalCStarAlgebra A]
variable [PartialOrder A] [StarOrderedRing A]
```

[Exact ambient source](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ElementaryCharacterization.lean.html#L43) installs the C*-algebra structure and closedness of representation images locally; this is separate from the selected declaration:

```lean
attribute [local instance] HomKernelQuotient.imageCStarAlgebra HomKernelQuotient.isClosed_image
```

