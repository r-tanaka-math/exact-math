Version 1 source-bound exposition export. Original text SHA-256: 73df6d7ca97ed9c72f392965d991aedd2840e2dc3827d5beb80d9e9539a0d8db. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Compact coordinates from the inverse ideal-sum map

## Statement

Let $J=(I_i)_{i\in\iota}$ be a pairwise orthogonal family of closed $\ast$-ideals whose finite sums are norm dense in a complex C*-algebra $A$. For each ideal $I_i$, fix a $\ast$-isomorphism $E_i:I_i\to\mathcal K(H_i)$, where $H_i$ is the specified complete complex Hilbert space. This definition gives a $\ast$-isomorphism from $A$ to the compact-operator $c_0$-sum.

## Definition

Let $S_J:\bigoplus_i^{c_0}I_i\to A$ be the [specified ideal-sum equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=compact-c0-sum-equivalence&start=589&end=599#L589). Let $E_*$ apply the given $E_i$ in every coordinate, with the same index retained. The definition is precisely
$$
D=E_*\circ S_J^{-1}:A\longrightarrow\bigoplus_i^{c_0}\mathcal K(H_i).
$$
The target is the [compact-operator $c_0$-sum](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactOperators.lean.html#L28). The [coordinate-evaluation theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=194&end=205#L194) gives
$$
(D(a))_i=E_i\bigl((S_J^{-1}(a))_i\bigr).
$$
The [inverse identification](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=187&end=193#L187), [single-coordinate formula](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=230&end=240#L230), and [finite-truncation formula](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=125&end=132#L125) give
$$
D^{-1}(\operatorname{single}_i T)=\iota_i(E_i^{-1}(T)),\qquad
D^{-1}(\operatorname{truncate}_F T)=\sum_{i\in F}\iota_i(E_i^{-1}(T_i)).
$$
Here $\iota_i$ is the ideal inclusion; truncation retains precisely the finite coordinate set $F$. The cited evaluation theorems give these formulas.

## Assumptions

Orthogonality means that products from distinct ideals vanish. Density concerns their finite sums in the ambient algebra. The coordinate maps $E_i$ are given equivalences onto all compact operators on their respective $H_i$, not merely faithful compact-valued actions. No countability or nontriviality is added.

## Conclusion

Thus $D$ first resolves an element into its ideal coordinates and then applies $E_i$ in each coordinate. Its target contains no off-diagonal operator entries and is not asserted to be the full compact-operator algebra of a Hilbert sum.

## Main citations

- [Exact complete defining RHS](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=170&end=177#L170).
- [c0SumEquivOfDense: complete ideal-sum equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=compact-c0-sum-equivalence&start=589&end=599#L589).
- [eval_compactC0SumEquivOfDense: coordinate formula](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=194&end=205#L194).
- [compactC0SumEquivOfDense_symm_apply: inverse identification](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=187&end=193#L187).
- [compactC0SumEquivOfDense_symm_single: one coordinate](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=230&end=240#L230).
- [compactC0SumHom_truncate: finite coordinates](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=compact-c0-sum-equivalence&start=125&end=132#L125).

## Lean source signature (exact)

Complete contiguous definition from the fixed source:

```lean
def compactC0SumEquivOfDense (hdense : Dense (finiteSums J)) :
    A ≃⋆ₐ[ℂ] CompactOperatorC0Sum H :=
  (c0SumEquivOfDense J hJ hdense).symm.trans
    (C0DirectSum.equiv (Fiber J)
      (fun i => ContinuousLinearMap.compactOperatorStarSubalgebra ℂ (H i))
      (Equiv.refl ι) E)
```

| In the source | Mathematical meaning |
|---|---|
| `(c0SumEquivOfDense J hJ hdense).symm` | The inverse $S_J^{-1}$, directed from $A$ to the ideal-coordinate $c_0$-sum. |
| `.trans (C0DirectSum.equiv ... (Equiv.refl ι) E)` | First use $S_J^{-1}$, then apply $E_i$ coordinatewise, retaining the same index $i$. |
| `Fiber J i` and `compactOperatorStarSubalgebra ℂ (H i)` | The ideal $I_i$ in the family $J=(I_i)_{i\in\iota}$ and the full compact-operator algebra on $H_i$, respectively. |
| `hdense : Dense (finiteSums J)` | The density assumption used by the ideal-sum equivalence, not a new conclusion of this definition. |

### Source context (separate exact excerpt)

Source lines 51–58:

```lean

variable {ι : Type uι} {A : Type uA} [NonUnitalCStarAlgebra A]
variable (J : ι → ClosedStarIdeal A) (hJ : PairwiseOrthogonal J)
variable (H : ι → Type uH)
variable [∀ i, NormedAddCommGroup (H i)] [∀ i, InnerProductSpace ℂ (H i)]
variable [∀ i, CompleteSpace (H i)]
variable (E : ∀ i, Fiber J i ≃⋆ₐ[ℂ]
  ContinuousLinearMap.compactOperatorStarSubalgebra ℂ (H i))
```
