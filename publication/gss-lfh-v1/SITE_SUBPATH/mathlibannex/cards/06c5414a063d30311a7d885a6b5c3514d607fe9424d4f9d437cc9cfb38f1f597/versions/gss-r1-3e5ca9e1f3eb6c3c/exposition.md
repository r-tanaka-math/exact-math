Version 1 source-bound exposition export. Original text SHA-256: c0e21056591e27d0bb0a4530f9f103625df2f44d23a96615eed388f6cf1be0f0. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Compact equality in every irreducible image

## Statement

Let $A$ be a nonzero complex C*-algebra.

For a complex C*-algebra $B$, write $S(B)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $B$; faces use real convexity. Write $c_B$ for the hull-kernel closure on $S(B)$:
$$
c_B(\mathcal U)=\left\{J\in S(B):\bigcap_{L\in\mathcal U}L\subseteq J\right\},
\qquad \mathcal U\subseteq S(B).
$$
These are the [geometric structure and its closure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=50&start=37&end=39#L37), with the norm-one description justified by the [support-functional norm theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=50&start=81&end=91#L81).

For $I\in S(A)$, let $C_A(I)$ be its finite-chain component: the points reachable from $I$ by a finite chain in which adjacent points are equal or form a nonclosed two-point set. This uses the [linked-pair relation](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=50&start=30&end=30#L30) and its [generated components](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=50&start=68&end=68#L68), rather than topological connectedness. Give $C_A(I)$ the induced closure
$$
c_{C_A(I)}(E)=C_A(I)\cap c_A(E),\qquad E\subseteq C_A(I).
$$
For a complex Hilbert space $H$, let $\mathcal K(H)$ be the algebra of compact operators on $H$. In particular, $c_{\mathcal K(K)}$ denotes closure on $S(\mathcal K(K))$, where $\mathcal K(K)$ is itself the algebra to which the geometric structure construction is applied.

The following conditions are equivalent:

- For every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ on a complex Hilbert space $H$,
  $$
  \pi(A)=\mathcal K(H).\tag{1}
  $$
- For every $I\in S(A)$, there are a nonzero complex Hilbert space $K$ and a bijection $e:C_A(I)\to S(\mathcal K(K))$ satisfying
  $$
  e(c_{C_A(I)}(E))=c_{\mathcal K(K)}(e(E))
  \quad(E\subseteq C_A(I)).\tag{2}
  $$

Thus $e$ is a homeomorphism of closure spaces: the same $e$ and its inverse $e^{-1}$ are continuous for arbitrary subsets. Both $K$ and $e$ may depend on $I$. The equality in (2) applies to all subsets, not only finite ones; $e(E)$ denotes the image of a set.

## Assumptions

The algebra $A$ is nonzero. Representations are $\ast$-homomorphisms into bounded operators; a unit is not required, and the source does not impose preservation of a unit. The Hilbert spaces are complete over $\mathbb C$. Irreducibility includes a nonzero action, but does not require faithfulness. Neither separability nor finite-dimensionality is assumed. The component closure is induced from $S(A)$.

## Conclusion

The CCR image condition $\pi(A)=\mathcal K(H)$ is equivalent to homeomorphisms of the components onto compact-operator geometric structure spaces. The image equality is inside $\mathcal B(H)$. In contrast, the [forward-continuity criterion](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=228&end=242#L228) characterizes only $\mathcal K(H)\subseteq\pi(A)$.

## Main citations

The [compact-image equality characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=311&end=325#L311) states the equivalence. The [full compact-homeomorphism condition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=57&end=69#L57) requires full continuity in both directions. The [pure-state equality theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=275&end=293#L275) and [equality transport to an independently specified Hilbert space](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=298&end=306#L298) apply to the same representation images. The [forward-only characterization](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=228&end=242#L228) instead detects inclusion, not equality.

The [finite-homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=157&end=159#L157), [closure continuity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=29&end=30#L29), and [homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=84&end=86#L84) specify the map conditions used here. The [closure-transport identity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=111&end=128#L111) expresses a homeomorphism by equality of closures of arbitrary sets.

## Lean source signature (exact)

The preceding `variable` declaration introduces $A$ and its nontriviality. The local spectral order is used for positivity and pure states. The `include hA in` retains nonzero $A$ among this theorem's parameters, although the main excerpt does not repeat these ambient binders. Both separate excerpts are shown in the source context below.

[GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L311). The contiguous declaration prefix ends before the proof assignment.

```lean
theorem forall_irreducible_range_eq_compact_iff_component_compact_homeomorph :
    (∀ (K : Type u) [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K],
      ∀ pi : NonUnitalCStarRepresentation A K, pi.IsIrreducible →
        (NonUnitalStarAlgHom.range pi) = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K) ↔
    ∀ I : NormedSpace.GeometricStructureSpace ℂ A,
      ClosureSpace.HasCompactOperatorHomeomorph.{u, u}
        ((NormedSpace.geometricStructureClosure ℂ A).subspace
          ((NormedSpace.geometricStructureClosure ℂ A).component I))
```

The component condition uses the following separate exact definition, including its complete right-hand side: [GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L57).

```lean
def HasCompactOperatorHomeomorph.{uH, uX} {X : Type uX}
    (c : ClosureSpace X) : Prop :=
  ∃ (H : Type uH) (instN : NormedAddCommGroup H),
    letI := instN
    ∃ instI : InnerProductSpace ℂ H,
      letI := instI
      ∃ instC : CompleteSpace H,
        letI := instC
        ∃ instT : Nontrivial H,
          letI := instT
          Nonempty (Homeomorph c
            (NormedSpace.geometricStructureClosure ℂ
              (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))
```

| In the source | Mathematical meaning |
|---|---|
| [Ambient inputs](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=130&end=130#L130)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]`<br>`attribute [local instance] _root_.CStarAlgebra.spectralOrder`<br>`_root_.CStarAlgebra.spectralOrderedRing` | The nonzero complex C*-algebra $A$. The two local instances give its compatible spectral order, used for positivity and pure states. They do not introduce another choice of order. The separate `include hA in` shown below retains nontriviality in this theorem; no unit is required. |
| [Representation quantifiers](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=312&end=312#L312)<br>`(∀ (K : Type u) [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K],`<br>`∀ pi : NonUnitalCStarRepresentation A K, pi.IsIrreducible →` | Every complex Hilbert space $H$ and every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$. Here source `K` is the representation space called $H$ in the Statement. Its norm, complex inner product and completeness are required by the three bracketed inputs. Irreducibility includes a nonzero action, not faithfulness. |
| [Representation condition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=314&end=314#L314)<br>`(NonUnitalStarAlgHom.range pi) = ContinuousLinearMap.compactOperatorStarSubalgebra ℂ K) ↔` | The image of this same representation is exactly the compact-operator algebra: $$\pi(A)=\mathcal K(H).$$This is (1). The outer `↔` relates the universal representation condition to the component condition on its right. |
| [Component quantifier](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=315&end=315#L315)<br>`∀ I : NormedSpace.GeometricStructureSpace ℂ A,` | Every point $I\in S(A)$. The model space and comparison map required after this quantifier may depend on $I$. |
| [Comparison applied to the component](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=316&end=316#L316)<br>`ClosureSpace.HasCompactOperatorHomeomorph.{u, u}`<br>`((NormedSpace.geometricStructureClosure ℂ A).subspace`<br>`((NormedSpace.geometricStructureClosure ℂ A).component I))` | Apply the displayed comparison definition to the closure induced on $C_A(I)$. `geometricStructureClosure ℂ A` is the closure $c_A$ on $S(A)$; its `component I` is the point set $C_A(I)$. `subspace` makes that set a closure space, with $$c_{C_A(I)}(E)=C_A(I)\cap c_A(E)$$for $E\subseteq C_A(I)$. This closure is the argument `c` of the definition above, and its underlying set is `X`. |
| [Model and inner product](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=59&end=59#L59)<br>`∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`letI := instN`<br>`∃ instI : InnerProductSpace ℂ H,`<br>`letI := instI` | The condition requires a model space $K$, called `H` in this definition, with the following structures. `instN` gives its normed additive group, and `instI` its complex inner product. Each following `letI` uses that choice on the same space, first to form `InnerProductSpace ℂ H`, then to interpret the remaining Hilbert-space conditions. |
| [Completeness and nonzero model](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=63&end=63#L63)<br>`∃ instC : CompleteSpace H,`<br>`letI := instC`<br>`∃ instT : Nontrivial H,`<br>`letI := instT` | `instC` requires this same $K$ to be complete; `instT` requires $K\ne\{0\}$. Their `letI` declarations retain these structures when forming bounded operators, the compact-operator algebra and its geometric closure. They do not choose a second space. |
| [Homeomorphism existence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=50&start=67&end=67#L67)<br>`Nonempty (Homeomorph c`<br>`(NormedSpace.geometricStructureClosure ℂ`<br>`(ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))` | `Nonempty` requires an element of this `Homeomorph` type: one bijection $e:C_A(I)\to S(\mathcal K(K))$ with both continuity fields below. Its target closure is $c_{\mathcal K(K)}$ on the geometric structure of the compact-operator algebra on the same model $K$, not on $K$ itself. |
| [Homeomorphism and forward field](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=84&end=86#L84)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`continuous_toFun : c.Continuous d toFun` | `extends α ≃ β` supplies the bijection, extracted as `e.toEquiv`. Its forward map `toFun` is $e$. In this application, $c=c_{C_A(I)}$ and $d=c_{\mathcal K(K)}$, so the first field says $$e(c_{C_A(I)}(E))\subseteq c_{\mathcal K(K)}(e(E))$$for every $E\subseteq C_A(I)$. |
| [Inverse field of the same homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=86&end=86#L86)<br>`continuous_invFun : d.Continuous c invFun` | `invFun`, also written `e.toEquiv.symm`, is the inverse of that same $e$. The second field says $$e^{-1}(c_{\mathcal K(K)}(F))\subseteq c_{C_A(I)}(e^{-1}(F))$$for every $F\subseteq S(\mathcal K(K))$. Together the two fields give the arbitrary-set closure equality (2). |
| [Continuity definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=50&start=29&end=30#L29)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:Y\to Z$, continuity means $$r(c_Y(E))\subseteq c_Z(r(E))$$for every $E\subseteq Y$. Source `α`, `β`, `c`, `d`, `f` denote $Y,Z,c_Y,c_Z,r$; the double prime denotes the set image $r(E)$. Unlike `FinitelyContinuous`, this definition has no finiteness restriction. |

Size scope: the principal equivalence fixes the universe of $A$ and quantifies both representation spaces and compact-model spaces in that same universe. The separately cited transport theorem allows an independently specified Hilbert-space universe; it does not change the quantifiers of this declaration.

### Source context (separate exact excerpts)

[GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L130).

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]
attribute [local instance] _root_.CStarAlgebra.spectralOrder
  _root_.CStarAlgebra.spectralOrderedRing
```

[GCRCharacterization.lean](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html#L308).

```lean
include hA in
```

