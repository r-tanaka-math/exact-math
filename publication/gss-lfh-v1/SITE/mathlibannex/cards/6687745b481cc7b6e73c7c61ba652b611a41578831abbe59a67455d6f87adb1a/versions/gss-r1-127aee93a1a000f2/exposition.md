Version 1 source-bound exposition export. Original text SHA-256: 174a4febdb29c7ee2aa156d240c5802ec777eb591ad5b435462e0a9ef0aeb1ec. Link targets are adapted for this edition; the registered Card identity is unchanged.

# An extreme dual functional has a pure-state unitary translate

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, possibly without an identity. Let $A^*$ be the space of bounded complex-linear functionals on $A$, and let $B_{A^*}=\{\rho:\|\rho\|\le1\}$. Extremality is taken for real convex combinations. Write $\widetilde A=\mathbb C\oplus A$ for the forced C*-unitization and identify $A$ with its canonical ideal in $\widetilde A$.

For a unitary $u\in\widetilde A$, left multiplication preserves this ideal, and defines the dual translate

$$
(T_u\rho)(a)=\rho(ua)\qquad(a\in A).
$$

If $\rho\in\operatorname{ext}_{\mathbb R}(B_{A^*})$, there are a pure state $\varphi$ on $A$ and a unitary $u\in\widetilde A$ such that

$$
T_u\rho=\varphi,\qquad \rho=T_{u^*}\varphi.
\tag{1}
$$

A pure state is a positive norm-one bounded complex-linear functional that is extreme, for real convexity, in the state space. The two identities in (1) concern the same $\varphi$ and $u$.

## Assumptions

The nonzero-algebra hypothesis ensures that an extreme element of the dual unit ball has norm one. The source also fixes the compatible C*-order used to express positivity. No identity in $A$, separability or finite dimension is required. The unitary belongs to the forced unitization even when $A$ happens to have an identity.

## Conclusion

The same pure state $\varphi$ and unitary $u$ satisfy both functional equalities in (1). Positivity, norm one and purity concern $\varphi$ on the original algebra. The assertion does not require or assert uniqueness of the unitary.

## Main citations

- [Exact decomposition declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/ExtremeDecomposition.lean.html?from=15&start=61&end=81#L61): `exists_pureState_unitaryTranslate_of_mem_extremePoints_dual_closedBall`.
- Ryotaro Tanaka, [arXiv:2504.05551v1, §5](https://arxiv.org/abs/2504.05551v1): the paper's facial and pure-state comparison. The forced-unitization and original-algebra coefficient construction here follow the pinned source.

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem exists_pureState_unitaryTranslate_of_mem_extremePoints_dual_closedBall
    {rho : StrongDual ℂ A}
    (hrho : rho ∈ (closedBall (0 : StrongDual ℂ A) 1).extremePoints ℝ) :
    ∃ phi : StrongDual ℂ A, IsPureNonUnitalState A phi ∧
      ∃ u : unitary (Unitization ℂ A),
        unitaryTranslate u rho = phi ∧ rho = unitaryTranslate (star u) phi
```

| In the source | Mathematical meaning |
| --- | --- |
| `{A : Type u}`, `[NonUnitalCStarAlgebra A]`, `[Nontrivial A]` | The nonzero complex C*-algebra. An identity is not assumed. |
| `[PartialOrder A]`, `[StarOrderedRing A]` | The compatible C*-order needed for positive functionals and states. |
| `rho : StrongDual ℂ A` | The bounded complex-linear functional $\rho$ on the original algebra. |
| `hrho : rho ∈ (closedBall ... 1).extremePoints ℝ` | Extremality in the entire norm-closed dual unit ball, with real convexity. It implies norm one here. |
| `∃ phi : StrongDual ℂ A, ...` | One bounded complex-linear functional $\varphi$ is selected in the same dual space as $\rho$. Positivity is supplied by the following predicate, not by this type alone. |
| `IsPureNonUnitalState A phi` | Extremality among positive norm-one functionals, including membership in that state space. It supplies positivity and norm one for the same $\varphi$. |
| `∃ u : unitary (Unitization ℂ A), ...` | One unitary in the forced unitization is selected after the pure state; it need not be an element of $A$. |
| `unitaryTranslate u rho = phi` | The equality of the whole functionals $T_u\rho=\varphi$, hence equality at every $a\in A$. |
| The equality with `star u` | The whole inverse-translation equality $\rho=T_{u^*}\varphi$, using the same $\varphi$ and $u$ in both equalities. |

### Source context (separate exact excerpt)

Source lines 35–35:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Source lines 56–56:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```
