Version 1 source-bound exposition export. Original text SHA-256: ea4f71e47292bee94ae7d3f86f83673d6901f26376a6738fa63079a026a20758. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The dependent c₀-sum of compact-operator algebras

## Statement

Let $(H_i)_{i\in\iota}$ be any family of complete complex Hilbert spaces. This abbreviation denotes the $c_0$-sum of the compact-operator algebras $\mathcal K(H_i)$.

## Definition

Use the [dependent $c_0$-sum](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html#L225) with fiber $A_i=\mathcal K(H_i)$, the compact operators on the given $H_i$. Its elements are bounded families $T=(T_i)$, $T_i\in\mathcal K(H_i)$, such that for every $\varepsilon>0$ only finitely many $i$ have $\varepsilon\leq\|T_i\|$. Its norm is $\sup_i\|T_i\|$ and its algebra operations are coordinatewise. The RHS specifies precisely this family of subalgebras of bounded operators.

## Assumptions

Every $H_i$ has its own normed additive group, complex inner product and completeness. Zero and infinite-dimensional Hilbert spaces are allowed. There is no restriction on the size of the index set.

## Conclusion

The output is an abbreviation for this dependent algebra. It does not denote all compact operators on a Hilbert-space sum and does not include additional off-diagonal operator entries.

## Main citations

- [Exact complete definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactOperators.lean.html?from=compact-operator-c0-sum&start=28&end=32#L28).
- [C0DirectSum: the defining abbreviation](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=compact-operator-c0-sum&start=225&end=227#L225).

## Lean source signature (exact)

The following is the complete defining right-hand side, copied from the fixed source.

```lean
abbrev CompactOperatorC0Sum {ι : Type uι} (H : ι → Type uH)
    [∀ i, NormedAddCommGroup (H i)] [∀ i, InnerProductSpace ℂ (H i)]
    [∀ i, CompleteSpace (H i)] :=
  C0DirectSum
    (fun i => ContinuousLinearMap.compactOperatorStarSubalgebra ℂ (H i))
```

| In the source | Mathematical meaning |
|---|---|
| `H : ι → Type uH` | The family of Hilbert spaces $H_i$; the spaces may vary with $i$. |
| The three `∀ i` instances | Each $H_i$ has the stated norm and complex inner product and is complete. |
| `ContinuousLinearMap.compactOperatorStarSubalgebra ℂ (H i)` | The subalgebra $\mathcal K(H_i)$ of compact complex-linear endomorphisms of this same fiber. |
| `C0DirectSum (fun i => ...)` | The preceding dependent vanishing-at-infinity construction applied to exactly those algebras. |

### Source context (separate exact excerpt)

Source lines 23–25:

```lean
namespace MathlibAnnex.Analysis.CStarAlgebra

universe uι uA uH
```
