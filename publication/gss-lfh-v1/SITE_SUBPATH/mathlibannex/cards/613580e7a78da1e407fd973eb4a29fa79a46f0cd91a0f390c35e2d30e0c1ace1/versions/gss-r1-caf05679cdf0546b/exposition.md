Version 1 source-bound exposition export. Original text SHA-256: e55fba268c8c8ab6515a7e96ee1ce1c36174a0b6a96b2f4fc4c55c2faa57b467. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The dependent c₀-direct sum

## Statement

Let $\iota$ be any index set and let $A_i$ be a complex C*-algebra for each $i\in\iota$, with no identity required. The dependent $c_0$-direct sum is the algebra of families $x=(x_i)$ in the bounded product satisfying the vanishing condition below.

## Definition

The ambient bounded product consists of families $x_i\in A_i$ with $\sup_i\|x_i\|<\infty$, equipped with its supremum norm. Write
$$
\bigoplus_{i\in\iota}^{c_0}A_i
=\left\{x:\forall\varepsilon>0,\ \{i:\varepsilon\leq\|x_i\|\}\text{ is finite}\right\}
$$
inside that bounded product. Operations are coordinatewise, and the norm is inherited. This [subalgebra](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=176&end=184#L176) is [norm closed](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=218&end=219#L218), with the [inherited C*-algebra structure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html#L234).

## Assumptions

Each fiber has its given complex C*-algebra structure. No identity, countability, separability, nonzero-fiber or nonempty-index assumption is imposed.

## Conclusion

The abbreviation denotes this $c_0$ subalgebra, with the vanishing condition imposed for every positive threshold.

## Main citations

- [Exact complete definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=225&end=227#L225).
- [VanishesAtInfinity: the complete finiteness predicate](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=45&end=48#L45).
- [starSubalgebra: the carrier and algebra fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=176&end=184#L176).
- [isClosed_starSubalgebra: norm closedness](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=218&end=219#L218).
- [nonUnitalCStarAlgebra: the inherited structure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html?from=c0-direct-sum&start=234&end=236#L234).

## Lean source signature (exact)

The following is the complete defining right-hand side, copied from the fixed source.

```lean
abbrev C0DirectSum {ι : Type uι} (A : ι → Type uA)
    [∀ i, NonUnitalCStarAlgebra (A i)] :=
  C0DirectSum.starSubalgebra A
```

| In the source | Mathematical meaning |
|---|---|
| `{ι : Type uι} (A : ι → Type uA)` | An arbitrary index set $\iota$ and its family of algebras $(A_i)_{i\in\iota}$. |
| `[∀ i, NonUnitalCStarAlgebra (A i)]` | Each fiber carries the specified complex C*-structure. |
| `C0DirectSum.starSubalgebra A` | The subalgebra $\bigoplus_i^{c_0}A_i$ of bounded families: $\{i:\varepsilon\leq\|x_i\|\}$ is finite for every $\varepsilon>0$. Its operations are coordinatewise and its norm is the supremum norm. |

### Source context (separate exact excerpt)

Source lines 34–36:

```lean
namespace MathlibAnnex.Analysis.CStarAlgebra

universe uι uA uH
```
