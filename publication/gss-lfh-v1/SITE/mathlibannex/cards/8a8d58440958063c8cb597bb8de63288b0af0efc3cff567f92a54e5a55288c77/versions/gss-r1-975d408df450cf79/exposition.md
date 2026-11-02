Version 1 source-bound exposition export. Original text SHA-256: 49aec58501a27b8da155f6c53435ba379848b959b29b08da1783b96d92802c64. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The specified equivalence from a dense orthogonal ideal sum

## Statement

Let $J=(I_i)_{i\in\iota}$ be a family of closed $\ast$-ideals in a complex C*-algebra $A$. Assume $xy=0$ whenever $x\in I_i$, $y\in I_j$ and $i\ne j$, and that the set of finite sums of elements of these ideals is norm dense in $A$. The ideal-sum map defines a $\ast$-isomorphism from the dependent $c_0$-sum of these ideals onto $A$.

## Definition

Give each ideal $I_i$ its inherited algebra structure, with inclusion $\iota_i:I_i\hookrightarrow A$. Use the [dependent $c_0$-sum](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html#L225) of these ideals. The forward map is the [continuous ideal-sum map](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=447&end=484#L447)
$$
S_J:\bigoplus_i^{c_0}I_i\longrightarrow A.
$$
The [single-coordinate](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=504&end=540#L504) and [finite-truncation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=541&end=545#L541) formulas are
$$
S_J(\operatorname{single}_i x)=\iota_i(x),\qquad
S_J(\operatorname{truncate}_F x)=\sum_{i\in F}\iota_i(x_i).
$$
Here truncation sets coordinates outside the finite set $F$ to zero. On a general family, $S_J$ is the continuous extension of finite ideal summation. Its [injectivity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=497&end=503#L497) and [surjectivity under density](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=576&end=584#L576) make this same map a bijection. It preserves addition, multiplication, complex scalars and involution.

## Assumptions

The family consists of closed $\ast$-ideals satisfying the stated ordered zero-product condition. Density concerns all finite sums in $A$, not density of each individual ideal. No countability or nonempty-index assumption is imposed.

## Conclusion

The output $S_J$ is directed from the ideal $c_0$-sum to $A$. Its inverse gives the ideal coordinates used in the subsequent compact-operator decomposition.

## Main citations

- [Exact complete defining RHS](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=589&end=599#L589).
- [Fiber: the ideal](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=52&end=53#L52).
- [PairwiseOrthogonal: full ordered zero-product condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=59&end=61#L59).
- [finiteSums: full set definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=68&end=72#L68).
- [c0SumHom: the specified continuous ideal-sum construction](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=447&end=484#L447).
- [c0SumHom_single: single-coordinate guarantee](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=504&end=540#L504).
- [c0SumHom_truncate: finite-truncation guarantee](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=541&end=545#L541).
- [c0SumEquivOfDense_apply: the same forward map](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=ideal-c0-sum-equivalence&start=600&end=604#L600).

## Lean source signature (exact)

Complete contiguous definition from the fixed source:

```lean
def c0SumEquivOfDense (hJ : PairwiseOrthogonal J)
    (hdense : Dense (finiteSums J)) :
    C0DirectSum (Fiber J) ≃⋆ₐ[ℂ] A :=
  { Equiv.ofBijective (c0SumHom J hJ)
      ⟨c0SumHom_injective J hJ, c0SumHom_surjective J hJ hdense⟩ with
    map_add' := map_add (c0SumHom J hJ)
    map_mul' := map_mul (c0SumHom J hJ)
    map_smul' := map_smul (c0SumHom J hJ)
    map_star' := map_star (c0SumHom J hJ) }
```

| In the source | Mathematical meaning |
|---|---|
| `J : ι → ClosedStarIdeal A` and `Fiber J` | The family $J=(I_i)$; `Fiber J i` is the same ideal $I_i$, regarded as an algebra with its inherited operations. |
| `hJ` and `hdense` | The displayed zero-product and finite-sum density assumptions. |
| `Equiv.ofBijective (c0SumHom J hJ) ...` | A bijection with exactly the existing ideal-sum map as its forward function; named results supply the two properties. |
| `map_add'`, `map_mul'`, `map_smul'`, `map_star'` | These fields equip that same equivalence with its complex $\ast$-algebra structure. |
| `C0DirectSum (Fiber J) ≃⋆ₐ[ℂ] A` | The direction is from the coordinate family to the ambient algebra. |

### Source context (separate exact excerpt)

Source lines 44–48:

```lean
universe uι uA

variable {ι : Type uι} {A : Type uA} [NonUnitalCStarAlgebra A]

namespace ClosedStarIdeal
```

Source lines 63–63:

```lean
variable (J : ι → ClosedStarIdeal A)
```
