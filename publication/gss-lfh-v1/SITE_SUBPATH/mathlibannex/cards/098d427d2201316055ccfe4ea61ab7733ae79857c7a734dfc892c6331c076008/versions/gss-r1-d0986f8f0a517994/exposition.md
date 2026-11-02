Version 1 source-bound exposition export. Original text SHA-256: 18cdbac144ad5679e96b132b9a87ba0cd988a2628dd7761f868eb13617e3fc70. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A full homeomorphism to a compact-operator GSS

## Statement

Let $(X,c)$ be a closure space. The compact-operator homeomorphism condition holds when $(X,c)$ is fully homeomorphic to $S(\mathcal K(H))$ for some nonzero complex Hilbert space $H$.

## Definition

Here $\mathcal K(H)$ denotes the algebra of compact operators on $H$. For a complex normed space $D$, $S(D)$ consists of the unions of kernels of norm-one bounded complex-linear functionals supporting each maximal proper face of its closed unit ball. Faces use real convexity. The [support-functional norm theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=47&start=81&end=91#L81) justifies the norm-one description for these nonempty faces. Its closure is $c_D(\mathcal U)=\{I\in S(D):\bigcap_{J\in\mathcal U}J\subseteq I\}$.

The condition requires a nonzero complex Hilbert space $H$ and a closure-space homeomorphism
$$
e:(X,c)\longrightarrow S(\mathcal K(H)).
$$
This is a bijection with full continuity in both directions. Explicitly, the required inclusions are $e(c(E))\subseteq c_{\mathcal K(H)}(e(E))$ for every $E\subseteq X$, and $e^{-1}(c_{\mathcal K(H)}(F))\subseteq c(e^{-1}(F))$ for every target subset $F$. The inverse is the inverse of the same bijection. Existence is required; no preferred homeomorphism is selected.

## Assumptions

Only the input closure space is given. The Hilbert space and its structures are existential data. Nonzero $H$ is required; separability and finite dimension are not. The definition uses arbitrary-set closure and does not replace it by finite closure.

## Conclusion

This condition requires a full geometric model, with both directions referring to the same bijection. A continuous finite comparison is a separate condition; it does not contain the inverse full-continuity field required here. No statement about an irreducible representation image is included in this definition.

## Main citations

- [Exact definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=47&start=57&end=69#L57).
- [Continuous finite compact comparison](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=47&start=39&end=53#L39).

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=47&start=57&end=69#L57). The complete defining right-hand side is included.

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
| [Input closure](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-0)<br>`def HasCompactOperatorHomeomorph.{uH, uX} {X : Type uX}`<br>`    (c : ClosureSpace X) : Prop :=` | The input $c$ is the closure on $X$. The following existential statement defines the requested model condition; it does not select a preferred model or map. |
| [One normed model space](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-1)<br>`  ∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`    letI := instN` | There must exist one normed additive group $H$. The first `letI` installs that chosen normed structure on $H$ for the inner-product type that follows. |
| [Complex inner product on that model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-2)<br>`    ∃ instI : InnerProductSpace ℂ H,`<br>`      letI := instI` | The same $H$ must have a compatible complex inner product. This `letI` installs it for the later Hilbert-space and operator-algebra types. |
| [Completeness of that model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-3)<br>`      ∃ instC : CompleteSpace H,`<br>`        letI := instC` | The same normed space must be complete. The next `letI` installs this completeness, used in the compact-operator algebra on this Hilbert space. |
| [A nonzero model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-4)<br>`        ∃ instT : Nontrivial H,`<br>`          letI := instT` | The same $H$ must be nonzero. Its `letI` makes this nontriviality available in the remaining conditions; it does not introduce another space. |
| [Existence of a homeomorphism to the same model](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-5)<br>`          Nonempty (Homeomorph c`<br>`            (NormedSpace.geometricStructureClosure ℂ`<br>`              (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)))` | `Nonempty` requires an element of the displayed homeomorphism type: one bijection $$e:X\to S(\mathcal K(H))$$ with continuity in both directions. The complete target argument is the geometric closure $c_{\mathcal K(H)}$ on the compact-operator algebra of the same $H$ used in all preceding conditions. |
| [The homeomorphism and its inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-6)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The inherited equivalence gives $e$ and its inverse $e^{-1}$. For every $E\subseteq X$ and $F\subseteq S(\mathcal K(H))$, the two fields require, respectively, $$e(c(E))\subseteq c_{\mathcal K(H)}(e(E)),$$ $$e^{-1}(c_{\mathcal K(H)}(F))\subseteq c(e^{-1}(F)).$$ Both use the same model and the same map; the definition does not choose separate forward and inverse maps. |
| [Continuity for all subsets](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html#card-47--source-row-7)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For $r:(Y,d)\to(Z,k)$, the definition requires $$r(d(E))\subseteq k(r(E))\quad(E\subseteq Y).$$ There is no finiteness restriction in this condition. |

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
namespace ClosureSpace

open MathlibAnnex.Analysis.CStarAlgebra
attribute [local instance] ContinuousLinearMap.isClosed_compactOperatorStarSubalgebra
```

</details>

The model-space level `uH` and the input-space level `uX` are independent fixed parameters. All model structures and conditions above refer to the same quantified $H$.
