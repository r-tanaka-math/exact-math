Version 1 source-bound exposition export. Original text SHA-256: c4e9a71ce3f384da4b0ca892fb0dbe3a95d8a1b66efa09f9657ac0ac5b4742ff. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A continuous finite comparison with a compact-operator GSS

## Statement

Let $(X,c)$ be a closure space. A continuous finite compact comparison is the existence of a nonzero complex Hilbert space $H$ and a finite homeomorphism from $(X,c)$ to the geometric structure closure space $S(\mathcal K(H))$ whose forward map is also fully continuous.

## Definition

Here $\mathcal K(H)$ denotes the algebra of compact operators on $H$. For a complex normed space $D$, $S(D)$ consists of the unions of kernels of norm-one bounded complex-linear functionals supporting each maximal proper face of its closed unit ball. Faces use real convexity. The [support-functional norm theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=46&start=81&end=91#L81) justifies the norm-one description for these nonempty faces. Its closure is $c_D(\mathcal U)=\{I\in S(D):\bigcap_{J\in\mathcal U}J\subseteq I\}$.

For closure spaces $(X,c),(Y,d)$, full continuity of $e:X\to Y$ means $e(c(E))\subseteq d(e(E))$ for every $E\subseteq X$. Finite continuity requires this only for finite $E$. The condition holds when there exists a bijection $e:X\to S(\mathcal K(H))$ such that $e$ and $e^{-1}$ are finitely continuous, and additionally
$$
e(c(E))\subseteq c_{\mathcal K(H)}(e(E))\quad(E\subseteq X).
$$
The norm and inner product belong to the same nonzero Hilbert space $H$. Full continuity of $e^{-1}$ is not required by this condition.

## Assumptions

The input is an arbitrary closure space. It need not already be presented as a GSS or an operator-algebra normal part. There is no representation of a C*-algebra in the input or conclusion. The model Hilbert space is nonzero; no separability or finite-dimensionality is required.

## Conclusion

This is an existence property of a closure space, with forward full continuity added to finite continuity of a bijection and its inverse. No representation range condition is part of this definition.

## Main citations

- [Exact defining expression](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=46&start=39&end=53#L39).
- [The full-homeomorphism condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=46&start=57&end=69#L57), which requires full continuity in both directions.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/GCRCharacterization.lean.html?from=46&start=39&end=53#L39). The complete defining right-hand side is included.

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
| [Input closure](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-0)<br>`def HasContinuousFiniteCompactComparison.{uH, uX} {X : Type uX}`<br>`    (c : ClosureSpace X) : Prop :=` | The input $c$ is the closure on $X$. The following existential statement defines the requested model condition; it does not select a preferred model or map. |
| [One normed model space](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-1)<br>`  ∃ (H : Type uH) (instN : NormedAddCommGroup H),`<br>`    letI := instN` | There must exist one normed additive group $H$. The first `letI` installs that chosen normed structure on $H$ for the inner-product type that follows. |
| [Complex inner product on that model](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-2)<br>`    ∃ instI : InnerProductSpace ℂ H,`<br>`      letI := instI` | The same $H$ must have a compatible complex inner product. This `letI` installs it for the later Hilbert-space and operator-algebra types. |
| [Completeness of that model](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-3)<br>`      ∃ instC : CompleteSpace H,`<br>`        letI := instC` | The same normed space must be complete. The next `letI` installs this completeness, used in the compact-operator algebra on this Hilbert space. |
| [A nonzero model](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-4)<br>`        ∃ instT : Nontrivial H,`<br>`          letI := instT` | The same $H$ must be nonzero. Its `letI` makes this nontriviality available in the remaining conditions; it does not introduce another space. |
| [Finite comparison with the compact-operator GSS](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-5)<br>`          ∃ e : FiniteHomeomorph c`<br>`              (NormedSpace.geometricStructureClosure ℂ`<br>`                (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)),` | There must exist one finite homeomorphism $$e:X\to S(\mathcal K(H)).$$ The target closure is $c_{\mathcal K(H)}$, the geometric closure of the compact-operator algebra on this same $H$, not a closure on $H$. For every finite $F\subseteq X$, $$e(c(F))=c_{\mathcal K(H)}(e(F)).$$ |
| [Full forward continuity of the same map](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-6)<br>`            c.Continuous (NormedSpace.geometricStructureClosure ℂ`<br>`              (ContinuousLinearMap.compactOperatorStarSubalgebra ℂ H)) e.toEquiv` | `e.toEquiv` is the bijection underlying that same finite homeomorphism. The remaining condition is, for every $E\subseteq X$, $$e(c(E))\subseteq c_{\mathcal K(H)}(e(E)).$$ It imposes no full-continuity condition on $e^{-1}$. |
| [Finite continuity in both directions](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-7)<br>`structure FiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  finitelyContinuous_toFun : c.FinitelyContinuous d toFun`<br>`  finitelyContinuous_invFun : d.FinitelyContinuous c invFun` | The inherited equivalence supplies $e$ and $e^{-1}$. The two fields require finite continuity of these maps in opposite directions. Together they give the finite closure equality above; full continuity of the forward map is the extra condition in the preceding row. |
| [Continuity for all subsets](https://exactmathematics.org/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html#card-46--source-row-8)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For $r:(Y,d)\to(Z,k)$, the definition requires $$r(d(E))\subseteq k(r(E))\quad(E\subseteq Y).$$ There is no finiteness restriction in this condition. |

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
namespace ClosureSpace

open MathlibAnnex.Analysis.CStarAlgebra
attribute [local instance] ContinuousLinearMap.isClosed_compactOperatorStarSubalgebra
```

</details>

The model-space level `uH` and the input-space level `uX` are independent fixed parameters. All model structures and conditions above refer to the same quantified $H$.
