Version 1 source-bound exposition export. Original text SHA-256: 7879f6f0410157501255a514596fdcffed08837d96379171700cfe2316ae5d0f. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A finite-dimensional compact model with a dimension condition

## Statement

Let $(X,c)$ be a closure space and let $P(n)$ be a condition on a natural number $n$. The finite-dimensional compact-homeomorphism condition holds when there exist a nonzero finite-dimensional complex Hilbert space $H$ satisfying $P(\dim_{\mathbb C}H)$ and a full homeomorphism $(X,c)\to S(\mathcal K(H))$.

## Definition

Here $\mathcal K(H)$ denotes the algebra of compact operators on $H$. For a complex normed space $D$, $S(D)$ consists of the unions of kernels of norm-one bounded complex-linear functionals supporting each maximal proper face of its closed unit ball. Faces use real convexity. The [support-functional norm theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=48&start=81&end=91#L81) justifies the norm-one description for these nonempty faces. Its closure is $c_D(\mathcal U)=\{I\in S(D):\bigcap_{J\in\mathcal U}J\subseteq I\}$.

All the following data refer to the same $H$: its norm, complex inner product and completeness, nontriviality, finite-dimensionality, the truth of $P(\dim_{\mathbb C}H)$, and a full closure-space homeomorphism
$$
e:(X,c)\longrightarrow S(\mathcal K(H)).
$$
Full continuity applies to arbitrary subsets in both directions. Finite-dimensionality is required separately from the condition on its finite complex dimension.

## Assumptions

The input consists only of $c$ and $P$. The condition requires the existence of the Hilbert space, its finite-dimensionality, and the stated dimension condition. Nonzero $H$ is explicit in the literal right-hand side. No separability hypothesis is added. Here the natural number dimension is finite complex vector-space dimension; later infinite-dimensional comparisons use Hilbert-basis cardinality separately.

## Conclusion

One finite-dimensional Hilbert space must satisfy both the dimension condition and the homeomorphism requirement. Taking $P(m)$ to be $m=n$ specifies an exact dimension; taking it to be $m\leq n$ specifies an upper bound. Neither choice replaces the explicit finite-dimensionality and nonzero-model conditions.

## Main citations

- [Exact definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=48&start=62&end=75#L62).
- [Finite-comparison counterpart](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=48&start=45&end=58#L45).

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/HomogeneousCharacterization.lean.html?from=48&start=62&end=75#L62). The complete defining right-hand side is included.

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
| [Input closure and dimension condition](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-0)<br>`def HasFiniteDimensionalCompactHomeomorph.{uH, uX} {X : Type uX}`<br>`    (c : ClosureSpace X) (P : ℕ → Prop) : Prop :=` | The input $c$ is the closure on $X$. The second input is the condition $P(n)$ on a natural number $n$. The following existential statement defines the requested model condition; it does not select a preferred model or map. |
| [One normed model space](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-1)<br>`  ∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`    letI := instN` | There must exist one normed additive group $H$. The first `letI` installs that chosen normed structure on $H$ for the inner-product type that follows. |
| [Complex inner product on that model](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-2)<br>`    ∃ instI : InnerProductSpace ℂ H,`<br>`      letI := instI` | The same $H$ must have a compatible complex inner product. This `letI` installs it for the later Hilbert-space and operator-algebra types. |
| [Completeness of that model](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-3)<br>`      ∃ instC : CompleteSpace H,`<br>`        letI := instC` | The same normed space must be complete. The next `letI` installs this completeness, used in the compact-operator algebra on this Hilbert space. |
| [A nonzero model](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-4)<br>`        ∃ instT : Nontrivial H,`<br>`          letI := instT` | The same $H$ must be nonzero. Its `letI` makes this nontriviality available in the remaining conditions; it does not introduce another space. |
| [Finite-dimensionality and its dimension condition](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-5)<br>`          FiniteDimensional ℂ H ∧ P (Module.finrank ℂ H) ∧` | The same $H$ must be finite-dimensional, and its finite complex dimension must satisfy $P(\dim_{\mathbb C}H)$. These are two conditions. The finite-dimensionality requirement is not replaced by a condition on `finrank`. |
| [Existence of a homeomorphism to the same model](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-6)<br>`            Nonempty (Homeomorph c`<br>`              (NormedSpace.geometricStructureClosure ℂ`<br>`                (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))` | `Nonempty` requires an element of the displayed homeomorphism type: one bijection $$e:X\to S(\mathcal K(H))$$ with continuity in both directions. The complete target argument is the geometric closure $c_{\mathcal K(H)}$ on the compact-operator algebra of the same $H$ used in all preceding conditions. |
| [The homeomorphism and its inverse](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-7)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The inherited equivalence gives $e$ and its inverse $e^{-1}$. For every $E\subseteq X$ and $F\subseteq S(\mathcal K(H))$, the two fields require, respectively, $$e(c(E))\subseteq c_{\mathcal K(H)}(e(E)),$$ $$e^{-1}(c_{\mathcal K(H)}(F))\subseteq c(e^{-1}(F)).$$ Both use the same model and the same map; the definition does not choose separate forward and inverse maps. |
| [Continuity for all subsets](https://exactmathematics.org/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html#card-48--source-row-8)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For $r:(Y,d)\to(Z,k)$, the definition requires $$r(d(E))\subseteq k(r(E))\quad(E\subseteq Y).$$ There is no finiteness restriction in this condition. |

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
namespace ClosureSpace

attribute [local instance] ContinuousLinearMap.isClosed_compactOperatorStarSubalgebra
```

</details>

The model-space level `uH` and the input-space level `uX` are independent fixed parameters. All model structures and conditions above refer to the same quantified $H$.
