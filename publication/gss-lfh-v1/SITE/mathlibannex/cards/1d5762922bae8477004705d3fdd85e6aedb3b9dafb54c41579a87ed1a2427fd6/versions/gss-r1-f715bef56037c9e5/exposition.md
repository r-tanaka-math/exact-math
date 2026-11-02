Version 1 source-bound exposition export. Original text SHA-256: e098d2bcf7a8f43d380ee858377b654577687aa49fc4389d34f6a14224e807b2. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The geometric structure family is the family of pure-state translate kernels

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, possibly without an identity. Let $S(A)$ be its original geometric structure space: its points are the sets obtained as unions of the kernels of all norm-one bounded linear functionals supporting maximal proper faces of the closed unit ball. Write $\mathcal P(A)$ for the pure states of $A$, that is, positive norm-one bounded complex-linear functionals $A\to\mathbb C$ that are extreme in that state space for real convexity.

For a unitary $u$ in the forced unitization $\widetilde A=\mathbb C\oplus A$, define $(T_u\varphi)(a)=\varphi(ua)$. Then

$$
S(A)
=\{\ker(T_u\varphi):\varphi\in\mathcal P(A),\ u\in U(\widetilde A)\}.
\tag{1}
$$

Here $ua$ denotes the unitization action on the original ideal $A$; the functional and its kernel in this formula are on $A$.

## Assumptions

The source requires the nonzero complex C*-algebra and its compatible order. Positivity and purity refer to functionals on $A$; the translating unitary is allowed to lie in its forced unitization. The kernel is complex-linear, even though the face and extreme-point conditions use real convexity. No positivity of the translated functional $T_u\varphi$ is required.

## Conclusion

Every original geometric-structure point can be written using one pure state and one unitary, and every such pair gives a point. Formula (1) is a family equality, so two pairs with the same kernel give the same point. It does not assert uniqueness of a state–unitary pair or replace the original family by a new definition.

## Main citations

- [Exact pure-state translate family equality](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/PureStateKernel.lean.html?from=17&start=29&end=43#L29): `geometricStructureFamily_eq_setOf_exists_pureState_unitaryTranslate`.
- [Extreme-kernel family](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=17&start=49&end=65#L49) and [pure-state unitary decomposition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/ExtremeDecomposition.lean.html?from=17&start=61&end=81#L61): the related family equality and translation identities for the same pure state and unitary.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Lemma 5.3](https://arxiv.org/abs/2504.05551v1): the paper's pure-state description of the geometric structure space.

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem geometricStructureFamily_eq_setOf_exists_pureState_unitaryTranslate :
    NormedSpace.geometricStructureFamily ℂ A =
      {I : Set A | ∃ phi : StrongDual ℂ A, IsPureNonUnitalState A phi ∧
        ∃ u : unitary (Unitization ℂ A), ((unitaryTranslate u phi).ker : Set A) = I}
```

| In the source | Mathematical meaning |
| --- | --- |
| `{A : Type*}`, the nonunital C*-algebra, order and nontriviality instances | The common algebra and hypotheses of the two family descriptions. |
| `NormedSpace.geometricStructureFamily ℂ A` | The family $S(A)$ of geometric-structure points, each a subset of $A$ obtained from a maximal face and its supporting functionals. |
| `{I : Set A \| ...}` | A family described by a property of the entire subset $I\subseteq A$. |
| `∃ phi : StrongDual ℂ A, IsPureNonUnitalState A phi ∧ ...` | A pure state $\varphi\in\mathcal P(A)$, with positivity, norm one and extremality as specified above. |
| `∃ u : unitary (Unitization ℂ A)` | One unitary of the forced unitization, for that same state. The state is the same one already quantified; the unitary is not required to belong to the original algebra. |
| `((unitaryTranslate u phi).ker : Set A) = I` | The equality $\ker(T_u\varphi)=I$, with the translated functional defined on $A$. |
| The complete equality | Equality of families of subsets: every left member has the displayed witnesses, and every such pair gives a left member. No unique parametrization is asserted. |

### Source context (separate exact excerpt)

Source lines 25–25:

```lean
variable {A : Type*} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Source lines 26–26:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```
