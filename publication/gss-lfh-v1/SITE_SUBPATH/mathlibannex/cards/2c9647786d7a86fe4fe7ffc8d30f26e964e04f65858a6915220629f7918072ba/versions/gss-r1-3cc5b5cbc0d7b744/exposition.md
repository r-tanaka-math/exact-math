Version 1 source-bound exposition export. Original text SHA-256: 8b94c4b0cb91d0a8a7429c16fdb69ce661b6b41093899bec4696f46c0458a5d6. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Maximal faces of the C*-algebra unit ball and their unique support

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, possibly without an identity, and let $B_A=\{a\in A:\|a\|\le1\}$. Faces and convexity are taken over $\mathbb R$. We consider maximal proper faces of $B_A$.

Write $A^*$ for the space of bounded complex-linear functionals on $A$, with the operator norm. For $\rho\in A^*$, write

$$
F_\rho=\{a\in B_A:\rho(a)=1\}.
$$

For every subset $F\subseteq A$,

$$
F\text{ is a maximal proper face of }B_A
\quad\Longleftrightarrow\quad
F=F_\rho\text{ for some }\rho\in\operatorname{ext}_{\mathbb R}(B_{A^*}).
\tag{1}
$$

The supporting condition is the complex equality $\rho(a)=1$. In the unit ball it is equivalent to the usual real supporting condition $\operatorname{Re}\rho(a)=1$ when $\|\rho\|\le1$.

## Assumptions

The source fixes the C*-order on $A$, which is used by the pure-state and interpolation inputs. Nontriviality is essential to the displayed equivalence: the zero algebra has no nonempty proper face, while its dual ball has the extreme point zero. No compactness of $B_A$, identity in $A$, or finite-dimensional assumption is imposed.

## Conclusion

Equation (1) is the complete selected equivalence about subsets. The separately named theorem [`supportFunctionals_unitBallSupportFace_eq_singleton`](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/ExtremeMaximalFace.lean.html?from=14&start=91&end=98#L91) guarantees that the entire dual unit-ball support family of an extreme slice is the singleton containing that same extreme functional. [`existsUnique_extreme_support_of_isMaximalFace`](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/ExtremeMaximalFace.lean.html?from=14&start=115&end=131#L115) guarantees uniqueness. These are separate cited results, not extra conjuncts in the selected type.

## Main citations

- [Exact equivalence](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/ExtremeMaximalFace.lean.html?from=14&start=102&end=111#L102): `isMaximalFace_iff_exists_mem_extremePoints_dual_closedBall`.
- [Full support-family and unique-support results in the same module](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/ExtremeMaximalFace.lean.html?from=14&start=57&end=87#L57): `weakStarSupportFunctionals_unitBallSupportFace_eq_singleton`, `supportFunctionals_unitBallSupportFace_eq_singleton`, and `existsUnique_extreme_support_of_isMaximalFace` give the additional support and uniqueness guarantees just distinguished from (1).

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem isMaximalFace_iff_exists_mem_extremePoints_dual_closedBall (F : Set A) :
    NormedSpace.IsMaximalFace F ↔ ∃ rho : StrongDual ℂ A,
      rho ∈ (closedBall (0 : StrongDual ℂ A) 1).extremePoints ℝ ∧
        F = NormedSpace.unitBallSupportFace ℂ rho
```

| In the source | Mathematical meaning |
| --- | --- |
| `{A : Type u}`, the C*-algebra, order and nontriviality instances | The nonzero complex C*-algebra with its compatible order. The real convex structure is obtained by restricting scalars. |
| `(F : Set A)` | An arbitrary subset of the original algebra, not a set of states or a subset of the self-adjoint part. |
| `NormedSpace.IsMaximalFace F` | Nonemptiness, real convexity, the face property in the norm-closed unit ball, properness, and maximality among proper convex faces. |
| `∃ rho : StrongDual ℂ A` | One continuous complex-linear supporting functional is chosen for the face. |
| `rho ∈ (closedBall ... 1).extremePoints ℝ` | The same $\rho$ is extreme for real convex combinations in the whole dual closed unit ball. |
| `F = NormedSpace.unitBallSupportFace ℂ rho` | Equality of the whole subset $F$ with $\{a:\|a\|\le1,\rho(a)=1\}$. Together with extremality, this is the complete right side of the equivalence. |
| `↔` and the two conjuncts | Both directions hold, with one $\rho$ satisfying both conjuncts. Support-family uniqueness is a separately named result, not a field hidden inside `IsMaximalFace`. |

### Source context (separate exact excerpt)

Source lines 34–34:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Source lines 35–35:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```
