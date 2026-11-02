Version 1 source-bound exposition export. Original text SHA-256: d350eb3cdf6d39b38c3ea70836986b7a9f34089bba2bdf72394f0b930e4dfae2. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Irreducible dimension equal to a fixed number

## Statement

Let $A$ be a nonzero complex C*-algebra, and let $n\in\mathbb N$.

For a complex C*-algebra $B$, write $S(B)$ for its geometric structure space. Its points are the unions of kernels of norm-one bounded complex-linear functionals supporting a maximal proper face of the closed unit ball of $B$; faces use real convexity. Write $c_B$ for the hull-kernel closure on $S(B)$:
$$
c_B(\mathcal U)=\left\{J\in S(B):\bigcap_{L\in\mathcal U}L\subseteq J\right\},
\qquad \mathcal U\subseteq S(B).
$$
These are the [geometric structure and its closure](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=51&start=37&end=39#L37), with the norm-one description justified by the [support-functional norm theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=51&start=81&end=91#L81).

For $I\in S(A)$, let $C_A(I)$ be its finite-chain component: the points reachable from $I$ by a finite chain in which adjacent points are equal or form a nonclosed two-point set. This uses the [linked-pair relation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=51&start=30&end=30#L30) and its [generated components](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=51&start=68&end=68#L68), rather than topological connectedness. Give $C_A(I)$ the induced closure
$$
c_{C_A(I)}(E)=C_A(I)\cap c_A(E),\qquad E\subseteq C_A(I).
$$
For a complex Hilbert space $H$, let $\mathcal K(H)$ be the algebra of compact operators on $H$. In particular, $c_{\mathcal K(K)}$ denotes closure on $S(\mathcal K(K))$, where $\mathcal K(K)$ is itself the algebra to which the geometric structure construction is applied.

The following conditions are equivalent:

- For every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ on a complex Hilbert space $H$,
  $$
  H\text{ is finite-dimensional}\quad\text{and}\quad\dim_{\mathbb C}H=n.\tag{1}
  $$
- For every $I\in S(A)$, there are a nonzero finite-dimensional complex Hilbert space $K$ with $\dim_{\mathbb C}K=n$ and a bijection $e:C_A(I)\to S(\mathcal K(K))$ satisfying
  $$
  e(c_{C_A(I)}(E))=c_{\mathcal K(K)}(e(E))
  \quad(E\subseteq C_A(I)).\tag{2}
  $$

The same model $K$ has dimension $n$ and supports the homeomorphism $e$. The number $n$ is fixed for all components, while $K$ and $e$ may depend on $I$. Equality (2) expresses continuity of the same $e$ and $e^{-1}$ for arbitrary subsets; $e(E)$ denotes the image of a set.

## Assumptions

The algebra $A$ is nonzero; no assumption $n>0$ is made. Representations are $\ast$-homomorphisms into bounded operators, without a requirement of unitality. Irreducibility includes a nonzero action, but does not require faithfulness. All Hilbert spaces are complex and complete. Finite-dimensionality is a conclusion on the representation side and a requirement on the model side. It is separate from the numerical dimension equation. No separability hypothesis is added.

## Conclusion

Every irreducible representation space is finite-dimensional of the same dimension $n$ exactly when each geometric component has a compact-operator model of that dimension. For nonzero $A$, both conditions fail at $n=0$, as specified by the [zero-dimension exclusion](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=386&end=393#L386) and the equivalence above. This does not add positivity of $n$ as a hypothesis.

## Main citations

The [fixed-dimension characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=373&end=381#L373) specializes the [general dimension-condition theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=328&end=338#L328) to equality with $n$. The [finite-dimensional compact-model condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=62&end=75#L62) retains both finiteness and the numerical condition on the same target. The [same-map upgrade theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=176&end=204#L176) supplies full continuity without replacing the finite comparison or its inverse. The [independent-universe dimension transport](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=294&end=303#L294) and the [exclusion of zero dimension](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=386&end=393#L386) specify those two scope points.

The [finite-homeomorphism fields](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=157&end=159#L157), [closure continuity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=29&end=30#L29), and [homeomorphism fields](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=84&end=86#L84) specify the map conditions used here. The [closure-transport identity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=111&end=128#L111) expresses a homeomorphism by equality of closures of arbitrary sets.

## Lean source signature (exact)

The preceding `variable` declaration introduces $A$ and its nontriviality. The local spectral order is used for positivity and pure states. The `include hA in` retains nonzero $A$ among this theorem's parameters, although the main excerpt does not repeat these ambient binders. Both separate excerpts are shown in the source context below.

[HomogeneousCharacterization.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html#L373). The contiguous declaration prefix ends before the proof assignment.

```lean
theorem forall_irreducible_finrank_eq_iff_component_compact_homeomorph (n : ℕ) :
    (∀ (L : Type u) [NormedAddCommGroup L] [InnerProductSpace ℂ L] [CompleteSpace L],
      ∀ pi : NonUnitalCStarRepresentation A L, pi.IsIrreducible →
        FiniteDimensional ℂ L ∧ Module.finrank ℂ L = n) ↔
    ∀ I : NormedSpace.GeometricStructureSpace ℂ A,
      ClosureSpace.HasFiniteDimensionalCompactHomeomorph.{u, u}
        ((NormedSpace.geometricStructureClosure ℂ A).subspace
          ((NormedSpace.geometricStructureClosure ℂ A).component I)) (fun m => m = n)
```

The component condition uses the following separate exact definition, including its complete right-hand side: [HomogeneousCharacterization.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html#L62).

```lean
def HasFiniteDimensionalCompactHomeomorph.{uH, uX} {X : Type uX}
    (c : ClosureSpace X) (P : ℕ → Prop) : Prop :=
  ∃ (H : Type uH) (instN : NormedAddCommGroup H),
    letI := instN
    ∃ instI : InnerProductSpace ℂ H,
      letI := instI
      ∃ instC : CompleteSpace H,
        letI := instC
        ∃ instT : Nontrivial H,
          letI := instT
          FiniteDimensional ℂ H ∧ P (Module.finrank ℂ H) ∧
            Nonempty (Homeomorph c
              (NormedSpace.geometricStructureClosure ℂ
                (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))
```

| In the source | Mathematical meaning |
|---|---|
| [Ambient inputs](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=167&end=167#L167)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]`<br>`attribute [local instance] _root_.CStarAlgebra.spectralOrder`<br>`_root_.CStarAlgebra.spectralOrderedRing` | The nonzero complex C*-algebra $A$. The two local instances give its compatible spectral order, used for positivity and pure states. They do not introduce another choice of order. The separate `include hA in` shown below retains nontriviality in this theorem; no unit is required. |
| [Representation quantifiers](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=374&end=374#L374)<br>`(∀ (L : Type u) [NormedAddCommGroup L] [InnerProductSpace ℂ L] [CompleteSpace L],`<br>`∀ pi : NonUnitalCStarRepresentation A L, pi.IsIrreducible →` | Every complex Hilbert space $H$ and every irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$. Here source `L` is the representation space called $H$ in the Statement. Its norm, complex inner product and completeness are required by the three bracketed inputs. Irreducibility includes a nonzero action, not faithfulness. |
| [Representation condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=376&end=376#L376)<br>`FiniteDimensional ℂ L ∧ Module.finrank ℂ L = n) ↔` | The representation space $H$ is finite-dimensional and satisfies $\dim_{\mathbb C}H=n$, as in (1). Both clauses are required. The parameter `(n : ℕ)` in the main declaration fixes one natural number throughout the equivalence. |
| [Component quantifier](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=377&end=377#L377)<br>`∀ I : NormedSpace.GeometricStructureSpace ℂ A,` | Every point $I\in S(A)$. The model space and comparison map required after this quantifier may depend on $I$. The number $n$ remains fixed. |
| [Comparison applied to the component](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=378&end=378#L378)<br>`ClosureSpace.HasFiniteDimensionalCompactHomeomorph.{u, u}`<br>`((NormedSpace.geometricStructureClosure ℂ A).subspace`<br>`((NormedSpace.geometricStructureClosure ℂ A).component I)) (fun m => m = n)` | Apply the displayed comparison definition to the closure induced on $C_A(I)$. `geometricStructureClosure ℂ A` is the closure $c_A$ on $S(A)$; its `component I` is the point set $C_A(I)$. `subspace` makes that set a closure space, with $$c_{C_A(I)}(E)=C_A(I)\cap c_A(E)$$for $E\subseteq C_A(I)$. This closure is the argument `c` of the definition above, and its underlying set is `X`. The final argument `(fun m => m = n)` assigns $P(m)$ the condition $m=n$ on the model dimension. |
| [Model and inner product](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=64&end=64#L64)<br>`∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`letI := instN`<br>`∃ instI : InnerProductSpace ℂ H,`<br>`letI := instI` | The condition requires a model space $K$, called `H` in this definition, with the following structures. `instN` gives its normed additive group, and `instI` its complex inner product. Each following `letI` uses that choice on the same space, first to form `InnerProductSpace ℂ H`, then to interpret the remaining Hilbert-space conditions. |
| [Completeness and nonzero model](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=68&end=68#L68)<br>`∃ instC : CompleteSpace H,`<br>`letI := instC`<br>`∃ instT : Nontrivial H,`<br>`letI := instT` | `instC` requires this same $K$ to be complete; `instT` requires $K\ne\{0\}$. Their `letI` declarations retain these structures when forming bounded operators, the compact-operator algebra and its geometric closure. They do not choose a second space. |
| [Dimension of the model](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=72&end=72#L72)<br>`FiniteDimensional ℂ H ∧ P (Module.finrank ℂ H) ∧` | This same model $K$ must be finite-dimensional. Substituting $P(m)\equiv(m=n)$ gives $\dim_{\mathbb C}K=n$. The conjunction separately retains finite-dimensionality and the numerical equation. It does not replace them by the `finrank` equation alone. |
| [Homeomorphism existence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=51&start=73&end=73#L73)<br>`Nonempty (Homeomorph c`<br>`(NormedSpace.geometricStructureClosure ℂ`<br>`(ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))` | `Nonempty` requires an element of this `Homeomorph` type: one bijection $e:C_A(I)\to S(\mathcal K(K))$ with both continuity fields below. Its target closure is $c_{\mathcal K(K)}$ on the geometric structure of the compact-operator algebra on the same model $K$, not on $K$ itself. |
| [Homeomorphism and forward field](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=84&end=86#L84)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`continuous_toFun : c.Continuous d toFun` | `extends α ≃ β` supplies the bijection, extracted as `e.toEquiv`. Its forward map `toFun` is $e$. In this application, $c=c_{C_A(I)}$ and $d=c_{\mathcal K(K)}$, so the first field says $$e(c_{C_A(I)}(E))\subseteq c_{\mathcal K(K)}(e(E))$$for every $E\subseteq C_A(I)$. |
| [Inverse field of the same homeomorphism](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=86&end=86#L86)<br>`continuous_invFun : d.Continuous c invFun` | `invFun`, also written `e.toEquiv.symm`, is the inverse of that same $e$. The second field says $$e^{-1}(c_{\mathcal K(K)}(F))\subseteq c_{C_A(I)}(e^{-1}(F))$$for every $F\subseteq S(\mathcal K(K))$. Together the two fields give the arbitrary-set closure equality (2). |
| [Continuity definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=51&start=29&end=30#L29)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For a map $r:Y\to Z$, continuity means $$r(c_Y(E))\subseteq c_Z(r(E))$$for every $E\subseteq Y$. Source `α`, `β`, `c`, `d`, `f` denote $Y,Z,c_Y,c_Z,r$; the double prime denotes the set image $r(E)$. Unlike `FinitelyContinuous`, this definition has no finiteness restriction. |

Size scope: the principal equivalence fixes the universe of $A$ and quantifies both representation spaces and compact-model spaces in that same universe. The separately cited transport theorem allows an independently specified Hilbert-space universe; it does not change the quantifiers of this declaration.

### Source context (separate exact excerpts)

[HomogeneousCharacterization.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html#L167).

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [hA : Nontrivial A]
attribute [local instance] _root_.CStarAlgebra.spectralOrder
  _root_.CStarAlgebra.spectralOrderedRing
```

[HomogeneousCharacterization.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html#L371).

```lean
include hA in
```

