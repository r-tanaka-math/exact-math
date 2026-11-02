Version 1 source-bound exposition export. Original text SHA-256: ad4f6377974bcef75a89965950f9b1b08781d283a9a6f4302aee47422ae078fe. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Compact inclusion in every irreducible image

## Statement

Let $A$ be a nonzero complex C*-algebra.

For a complex C*-algebra $B$, write $S(B)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $B$; faces use real convexity. Write $c_B$ for the hull-kernel closure on $S(B)$:
$$
c_B(\mathcal U)=\left\{J\in S(B):\bigcap_{L\in\mathcal U}L\subseteq J\right\},
\qquad \mathcal U\subseteq S(B).
$$
These are the [geometric structure and its closure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=49&start=37&end=39#L37), with the norm-one description justified by the [support-functional norm theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=49&start=81&end=91#L81).

For $I\in S(A)$, let $C_A(I)$ be its finite-chain component: the points reachable from $I$ by a finite chain in which adjacent points are equal or form a nonclosed two-point set. This uses the [linked-pair relation](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=49&start=30&end=30#L30) and its [generated components](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=49&start=68&end=68#L68), rather than topological connectedness. Give $C_A(I)$ the induced closure
$$
c_{C_A(I)}(E)=C_A(I)\cap c_A(E),\qquad E\subseteq C_A(I).
$$
For a complex Hilbert space $H$, let $\mathcal K(H)$ be the algebra of compact operators on $H$. In particular, $c_{\mathcal K(K)}$ denotes closure on $S(\mathcal K(K))$, where $\mathcal K(K)$ is itself the algebra to which the geometric structure construction is applied.

The following conditions are equivalent:

- For every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ on a complex Hilbert space $H$,
  $$
  \mathcal K(H)\subseteq\pi(A).\tag{1}
  $$
- For every $I\in S(A)$, there are a nonzero complex Hilbert space $K$ and a bijection $e:C_A(I)\to S(\mathcal K(K))$ such that, for every finite subset $F\subseteq C_A(I)$,
  $$
  e(c_{C_A(I)}(F))=c_{\mathcal K(K)}(e(F)),\tag{2}
  $$
  and, for the same $e$,
  $$
  e(c_{C_A(I)}(E))\subseteq c_{\mathcal K(K)}(e(E))
  \quad(E\subseteq C_A(I)).\tag{3}
  $$

Condition (2) says that $e$ is a finite homeomorphism. Condition (3) is its forward continuity for arbitrary subsets; continuity of $e^{-1}$ for arbitrary subsets is not required. Both $K$ and $e$ may depend on $I$. Here and below, $e(E)$ denotes the image of a set.

## Assumptions

The algebra $A$ is nonzero. Representations are $\ast$-homomorphisms into bounded operators; a unit is not required, and the source does not impose preservation of a unit. The Hilbert spaces are complete over $\mathbb C$. Irreducibility includes a nonzero action, but does not require faithfulness. No separability or finite-dimensionality is assumed. The component carries the closure induced from $S(A)$.

## Conclusion

Compact containment $\mathcal K(H)\subseteq\pi(A)$ in every irreducible image is equivalent to the component comparisons (2)–(3). The arbitrary-set condition concerns only the forward map. Equality with the compact operators and inverse continuity are the stronger conditions in the [compact-image equality characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=311&end=325#L311).

## Main citations

The [compact-inclusion characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=228&end=242#L228) states the equivalence. The [forward-continuity comparison condition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=39&end=53#L39) requires one nonzero compact target, finite continuity both ways and full continuity only forward. The [pure-state comparison theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=188&end=209#L188) and [transport to an independently specified Hilbert space](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=214&end=222#L214) supply the representation correspondence. This is the compact-inclusion condition; identifying it with another abstract definition of Type I remains an external classification boundary, not an additional conclusion here.

The [finite-homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=157&end=159#L157), [closure continuity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=29&end=30#L29), and [homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=84&end=86#L84) specify the map conditions used here. The [closure-transport identity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=111&end=128#L111) expresses a homeomorphism by equality of closures of arbitrary sets.

## Lean source signature (exact)

The preceding `variable` declaration introduces $A$ and its nontriviality. The local spectral order is used for positivity and pure states. The `include hA in` retains nonzero $A$ among this theorem's parameters, although the main excerpt does not repeat these ambient binders. Both separate excerpts are shown in the source context below.

[GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L228). The contiguous declaration prefix ends before the proof assignment.

```lean
theorem forall_irreducible_compact_le_iff_component_compact_comparison :
    (∀ (K : Type u) [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K],
      ∀ pi : NonUnitalCStarRepresentation A K, pi.IsIrreducible →
        ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K ≤ (NonUnitalStarAlgHom.range pi)) ↔
    ∀ I : NormedSpace.GeometricStructureSpace ℂ A,
      ClosureSpace.HasContinuousFiniteCompactComparison.{u, u}
        ((NormedSpace.geometricStructureClosure ℂ A).subspace
          ((NormedSpace.geometricStructureClosure ℂ A).component I))
```

The component condition uses the following separate exact definition, including its complete right-hand side: [GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L39).

```lean
def HasContinuousFiniteCompactComparison.{uH, uX} {X : Type uX}
    (c : ClosureSpace X) : Prop :=
  ∃ (H : Type uH) (instN : NormedAddCommGroup H),
    letI := instN
    ∃ instI : InnerProductSpace ℂ H,
      letI := instI
      ∃ instC : CompleteSpace H,
        letI := instC
        ∃ instT : Nontrivial H,
          letI := instT
          ∃ e : FiniteHomeomorph c
              (NormedSpace.geometricStructureClosure ℂ
                (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)),
            c.Continuous (NormedSpace.geometricStructureClosure ℂ
              (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)) e.toEquiv
```

| In the source | Mathematical meaning |
|---|---|
| [Ambient inputs](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=130&end=130#L130)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]`<br>`attribute [local instance] _root_.CStarAlgebra.spectralOrder`<br>`_root_.CStarAlgebra.spectralOrderedRing` | The nonzero complex C*-algebra $A$. The two local instances give its compatible spectral order, used for positivity and pure states. They do not introduce another choice of order. The separate `include hA in` shown below retains nontriviality in this theorem; no unit is required. |
| [Representation quantifiers](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=229&end=229#L229)<br>`(∀ (K : Type u) [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K],`<br>`∀ pi : NonUnitalCStarRepresentation A K, pi.IsIrreducible →` | Every complex Hilbert space $H$ and every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$. Here source `K` is the representation space called $H$ in the Statement. Its norm, complex inner product and completeness are required by the three bracketed inputs. Irreducibility includes a nonzero action, not faithfulness. |
| [Representation condition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=231&end=231#L231)<br>`ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K ≤ (NonUnitalStarAlgHom.range pi)) ↔` | The compact operators are contained in the image of this same representation: $$\mathcal K(H)\subseteq\pi(A).$$This is (1), not image equality. The outer `↔` relates the universal representation condition to the component condition on its right. |
| [Component quantifier](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=232&end=232#L232)<br>`∀ I : NormedSpace.GeometricStructureSpace ℂ A,` | Every point $I\in S(A)$. The model space and comparison map required after this quantifier may depend on $I$. |
| [Comparison applied to the component](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=233&end=233#L233)<br>`ClosureSpace.HasContinuousFiniteCompactComparison.{u, u}`<br>`((NormedSpace.geometricStructureClosure ℂ A).subspace`<br>`((NormedSpace.geometricStructureClosure ℂ A).component I))` | Apply the displayed comparison definition to the closure induced on $C_A(I)$. `geometricStructureClosure ℂ A` is the closure $c_A$ on $S(A)$; its `component I` is the point set $C_A(I)$. `subspace` makes that set a closure space, with $$c_{C_A(I)}(E)=C_A(I)\cap c_A(E)$$for $E\subseteq C_A(I)$. This closure is the argument `c` of the definition above, and its underlying set is `X`. |
| [Model and inner product](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=41&end=41#L41)<br>`∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`letI := instN`<br>`∃ instI : InnerProductSpace ℂ H,`<br>`letI := instI` | The condition requires a model space $K$, called `H` in this definition, with the following structures. `instN` gives its normed additive group, and `instI` its complex inner product. Each following `letI` uses that choice on the same space, first to form `InnerProductSpace ℂ H`, then to interpret the remaining Hilbert-space conditions. |
| [Completeness and nonzero model](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=45&end=45#L45)<br>`∃ instC : CompleteSpace H,`<br>`letI := instC`<br>`∃ instT : Nontrivial H,`<br>`letI := instT` | `instC` requires this same $K$ to be complete; `instT` requires $K\ne\{0\}$. Their `letI` declarations retain these structures when forming bounded operators, the compact-operator algebra and its geometric closure. They do not choose a second space. |
| [Finite comparison map](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=49&end=49#L49)<br>`∃ e : FiniteHomeomorph c`<br>`(NormedSpace.geometricStructureClosure ℂ`<br>`(ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)),` | There exists a finite homeomorphism $e:C_A(I)\to S(\mathcal K(K))$. The second closure argument is $c_{\mathcal K(K)}$ on the geometric structure of the compact-operator algebra on this same model $K$, not a closure on the vectors of $K$. The finite-homeomorphism fields below give $$e(c_{C_A(I)}(F))=c_{\mathcal K(K)}(e(F))$$for every finite $F\subseteq C_A(I)$, as in (2). |
| [Forward continuity of the same map](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=49&start=52&end=52#L52)<br>`c.Continuous (NormedSpace.geometricStructureClosure ℂ`<br>`(ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)) e.toEquiv` | `e.toEquiv` denotes this same bijection $e$. This condition is $$e(c_{C_A(I)}(E))\subseteq c_{\mathcal K(K)}(e(E))$$for every $E\subseteq C_A(I)$, as in (3). There is no additional arbitrary-set continuity condition on $e^{-1}$. |
| [Finite-continuity definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=33&end=34#L33)<br>`def FinitelyContinuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`∀ s : Set α, s.Finite → f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:Y\to Z$ between closure spaces, the condition is $$r(c_Y(F))\subseteq c_Z(r(F))$$for finite $F\subseteq Y$. Here source `α`, `β`, `c`, `d`, `f` denote $Y,Z,c_Y,c_Z,r$. The double prime denotes the set image $r(F)$. |
| [Finite-homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=157&end=159#L157)<br>`structure FiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`finitelyContinuous_toFun : c.FinitelyContinuous d toFun`<br>`finitelyContinuous_invFun : d.FinitelyContinuous c invFun` | `extends α ≃ β` supplies a bijection $e$ and its inverse. With $Y=C_A(I)$ and $Z=S(\mathcal K(K))$, `toFun` and `invFun` are $e$ and $e^{-1}$. The two fields impose the finite-set condition in the preceding row on these same maps in opposite directions. Together they express the finite closure equality (2). |
| [Continuity definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=49&start=29&end=30#L29)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:Y\to Z$, continuity means $$r(c_Y(E))\subseteq c_Z(r(E))$$for every $E\subseteq Y$. Source `α`, `β`, `c`, `d`, `f` denote $Y,Z,c_Y,c_Z,r$; the double prime denotes the set image $r(E)$. Unlike `FinitelyContinuous`, this definition has no finiteness restriction. |

Size scope: the principal equivalence fixes the universe of $A$ and quantifies both representation spaces and compact-model spaces in that same universe. The separately cited transport theorem allows an independently specified Hilbert-space universe; it does not change the quantifiers of this declaration.

### Source context (separate exact excerpts)

[GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L130).

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]
attribute [local instance] _root_.CStarAlgebra.spectralOrder
  _root_.CStarAlgebra.spectralOrderedRing
```

[GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L224).

```lean
include hA in
```

