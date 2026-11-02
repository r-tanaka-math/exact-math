Version 1 source-bound exposition export. Original text SHA-256: f327e5cc9bd1451999b1cadb713c148a8dcb35e5707533941cebb59efe1d89f3. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The canonical compact c₀-decomposition

## Statement

Let $\pi:A\to\mathcal B(H)$ be an injective compact-valued representation of a complex C*-algebra on a complete complex Hilbert space $H$, and write $\mathcal K(L)$ for the compact operators on a Hilbert space $L$. Let $M(A)$ be the set of minimal nonzero closed $\ast$-ideals of $A$, and write $I_i\subseteq A$ for the ideal indexed by $i$. Set $J=(I_i)_{i\in M(A)}$. For each $i\in M(A)$, take the chosen cyclic Hilbert space $H_i$ and compact model $E_i:I_i\to\mathcal K(H_i)$ produced from this same $\pi$. The definition constructs one $\ast$-isomorphism
$$
D_\pi:A\longrightarrow\bigoplus_{i\in M(A)}^{c_0}\mathcal K(H_i).
$$

## Definition

The index set $M(A)$ is the family of all minimal nonzero closed $\ast$-ideals. The Hilbert space $H_i$ is [the compact model space](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Ideal/MinimalIdealFamilyModel.lean.html?from=57&start=170&end=172#L170) chosen from this same $\pi$ and ideal $i$, with the corresponding [compact-model isomorphism](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Ideal/MinimalIdealFamilyModel.lean.html?from=57&start=271&end=279#L271) $E_i:I_i\to\mathcal K(H_i)$.

The target [compact-operator $c_0$-sum](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactOperators.lean.html#L28) is the subalgebra of the bounded product given by
$$
\bigoplus_{i\in M(A)}^{c_0}\mathcal K(H_i)
=\left\{(T_i):\forall\varepsilon>0,\ \{i:\|T_i\|\geq\varepsilon\}\text{ is finite}\right\}.
$$
Its algebra operations are coordinatewise and its norm is $\sup_i\|T_i\|$. See [the dependent $c_0$-sum](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/C0DirectSum.lean.html#L225) for this same vanishing condition and inherited norm.

Let $S_J:\bigoplus_i^{c_0}I_i\to A$ be the specified [ideal-sum equivalence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=57&start=589&end=599#L589). Its forward map is the [continuous ideal-sum map](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealAssembly.lean.html?from=57&start=589&end=599#L589), whose finite-support values are the corresponding sums in $A$. Let $E_*:\bigoplus_i^{c_0}I_i\to\bigoplus_i^{c_0}\mathcal K(H_i)$ act by the same coordinate models $E_i$. The RHS uses [the compact-coordinate equivalence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=170&end=177#L170), namely
$$
D_\pi=E_*\circ S_J^{-1}.
$$
The [coordinate-evaluation theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=194&end=205#L194) gives
$$
(D_\pi(a))_i=E_i\bigl((S_J^{-1}(a))_i\bigr).
$$
The [single-coordinate formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=230&end=240#L230), [finite-truncation formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=125&end=132#L125), and [inverse identification](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=187&end=193#L187) specify
$$
D_\pi^{-1}(\operatorname{single}_i T)=\iota_i(E_i^{-1}(T)),\qquad
D_\pi^{-1}(\operatorname{truncate}_F T)=\sum_{i\in F}\iota_i(E_i^{-1}(T_i)).
$$
Here $\iota_i:I_i\hookrightarrow A$ is the inclusion, $F$ is finite, and truncation retains $T_i$ on $F$ and is zero elsewhere. The cited evaluation theorems give these formulas for $D_\pi^{-1}$.

The defining expression uses the canonical ideal family, the orthogonality theorem [for the minimal ideal family](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Ideal/MinimalIdealFamilyModel.lean.html?from=57&start=117&end=122#L117), the spaces $H_i$ and maps $E_i$, and the density theorem [for finite sums of these ideals](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Ideal/MinimalIdealFamilyModel.lean.html?from=57&start=134&end=138#L134). These theorems guarantee orthogonality and density for the specified ideal family; neither is an additional assumption.

## Assumptions

Only $\pi$ and its faithfulness and pointwise compactness are inputs beyond the algebra and Hilbert structures. The cited theorems guarantee orthogonality, density, nonzero Hilbert spaces, and compact models for this family. The index can be empty. No unit, nonzero algebra, countability, separability, or finite-dimensionality is imposed.

## Conclusion

The output is a $\ast$-isomorphism using the same ideal family, representation and dependent model choices throughout. The definition permits an empty index family and does not assume a nonzero algebra. It does not identify the block algebra with all compact operators on a Hilbert sum.

## Main citations

- [Exact defining right-hand side and companion formulas](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactlyRepresentedDecomposition.lean.html?from=57&start=67&end=79#L67).
- [The ideal family, density theorem, and chosen Hilbert spaces](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Ideal/MinimalIdealFamilyModel.lean.html?from=57&start=134&end=138#L134).

- [compactC0Decomposition_symm_apply: exact inverse assembly](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactlyRepresentedDecomposition.lean.html?from=57&start=99&end=112#L99).

- [compactC0SumEquivOfDense: complete composition RHS](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=170&end=177#L170).
- [eval_compactC0SumEquivOfDense: coordinate evaluation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=194&end=205#L194).
- [compactC0SumEquivOfDense_symm_apply: the same inverse map](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=187&end=193#L187).
- [compactC0SumEquivOfDense_symm_single: inverse of one coordinate](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=230&end=240#L230).
- [compactC0SumHom_truncate: the finite-truncation value](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/OrthogonalIdealCompactModel.lean.html?from=57&start=125&end=132#L125).

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/DirectSum/CompactlyRepresentedDecomposition.lean.html?from=57&start=67&end=79#L67). The complete defining right-hand side is included.

```lean
def compactC0Decomposition :
    letI : PartialOrder A := _root_.CStarAlgebra.spectralOrder A
    letI : StarOrderedRing A := _root_.CStarAlgebra.spectralOrderedRing A
    A ≃⋆ₐ[ℂ] CompactOperatorC0Sum
      (fun i : MinimalClosedStarIdeal A => i.CompactModelSpace pi hpi) := by
  letI : PartialOrder A := _root_.CStarAlgebra.spectralOrder A
  letI : StarOrderedRing A := _root_.CStarAlgebra.spectralOrderedRing A
  exact ClosedStarIdeal.compactC0SumEquivOfDense
    (minimalClosedStarIdealFamily (A := A))
    pairwiseOrthogonal_minimalClosedStarIdealFamily
    (fun i : MinimalClosedStarIdeal A => i.CompactModelSpace pi hpi)
    (fun i => i.compactModelEquiv pi hpi)
    (dense_finiteSums_minimalClosedStarIdealFamily pi hpi)
```

| In the source | Mathematical meaning |
|---|---|
| `pi`, `hpi` in the surrounding context | The fixed faithful compact-valued representation $\pi$, used for all the models. |
| The result-type `letI` expressions | The compatible spectral order on $A$ used in this construction. |
| `minimalClosedStarIdealFamily (A := A)` | The family $J=(I_i)_{i\in M(A)}$ of all minimal nonzero closed $\ast$-ideals of $A$. |
| `pairwiseOrthogonal_minimalClosedStarIdealFamily` | The guarantee that $xy=0$ for $x\in I_i$, $y\in I_j$ and $i\ne j$. It is not an extra hypothesis. |
| `i.CompactModelSpace pi hpi` | The chosen cyclic Hilbert space $H_i$ for the ideal $I_i$ and the same representation $\pi$. |
| `i.compactModelEquiv pi hpi` | The $\ast$-isomorphism $E_i:I_i\to\mathcal K(H_i)$ using that ideal's chosen projection and cyclic vector. |
| `dense_finiteSums_minimalClosedStarIdealFamily pi hpi` | The guarantee that finite sums of elements of the ideals $I_i$ are norm dense in $A$. This too follows from the cited result, rather than being an extra input. |
| `compactC0SumEquivOfDense` | The map $D_\pi=E_*\circ S_J^{-1}$: first take ideal coordinates using the inverse of the specified ideal-sum map, then apply the same $E_i$ in each coordinate. |
| `A ≃⋆ₐ[ℂ] CompactOperatorC0Sum ...` | A $\ast$-isomorphism from $A$ onto the displayed $c_0$-sum of compact-operator algebras. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Source lines 53-60:

```lean
universe u v

variable {A : Type u} [NonUnitalCStarAlgebra A]
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable (pi : NonUnitalCStarRepresentation A H) (hpi : pi.IsCompactlyRepresented)

attribute [local instance] _root_.CStarAlgebra.spectralOrder
  _root_.CStarAlgebra.spectralOrderedRing
```

</details>
