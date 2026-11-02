Version 1 source-bound exposition export. Original text SHA-256: 890ace7736fe50b5993d5b425a14de2c52928700ba4c1c3ef5898d1018840b3d. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The normal part as a product of projective spaces

## Statement

Let $A\subseteq\mathcal B(H)$ be a norm-closed complex $\ast$-subalgebra with nonzero irreducible inclusion representation on the complete complex Hilbert space $H$. No identity is required. Let $\mathbb P(H)$ denote its set of one-dimensional complex linear subspaces and $[x]=\mathbb Cx$ for $x\ne0$. For $x,y\ne0$, define $f_{x,y}:A\to\mathbb C$ by $f_{x,y}(a)=\langle y,a(x)\rangle$, with inner product conjugate-linear in the first variable, and let $N(A)$ be the coefficient-kernel normal part of $S(A)$.

The definition gives a bijection

$$
e:\mathbb P(H)\times\mathbb P(H)\ \xrightarrow{\ \sim\ }\ N(A),
\qquad e([x],[y])=\ker f_{x,y}.
\tag{1}
$$

This is an equivalence of sets. It does not assert a homeomorphism for the usual product topology on the two projective spaces.

## Definition

For two projective lines $p,q$, choose their nonzero representatives $p^{\mathrm{rep}},q^{\mathrm{rep}}$. The defining map is
$$
(p,q)\longmapsto \ker f_{p^{\mathrm{rep}},q^{\mathrm{rep}}}.
$$
The [representative-evaluation theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=52&end=57#L52) gives the value $\ker f_{x,y}$ for any nonzero representatives $x,y$. The [injectivity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=60&end=66#L60) and [surjectivity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=69&end=74#L69) theorems make this map the bijection (1) under the stated hypotheses.

The [inverse-evaluation theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=97&end=101#L97) gives
$$
e^{-1}(\ker f_{x,y})=([x],[y])\qquad(x,y\ne0).
$$
Both formulas describe the same equivalence $e$.

## Assumptions

The algebra is closed in operator norm and its inclusion is nonzero irreducible. These hypotheses supply geometric coefficient points and recoverability of the two lines. No normalization, finite-dimensionality, separability, or dimension-at-least-two assumption is used. Each projective line is represented by a nonzero vector by definition.

## Conclusion

A normal kernel determines one source line and one target line, and every pair of such lines determines one normal kernel. This gives coordinates on the existing normal part. Closure and linkedness remain separate structures; the [linked-pair theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartLinked.lean.html?from=29&start=210&end=239#L210) identifies linkedness with agreement of one coordinate, not both.

## Main citations

- [Projective equivalence and its defining results](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=77&end=83#L77): the defining right-hand side and the preceding map, injectivity, and surjectivity results.
- [Equality of coefficient kernels and both vector lines](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/CoefficientProjective.lean.html): the separate irreducible-representation kernel equality result.

- [normalPartProjectivizationMap_mk: evaluation on any nonzero representatives](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=52&end=57#L52).
- [normalPartProjectivizationMap_injective: injectivity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=60&end=66#L60).
- [normalPartProjectivizationMap_surjective: surjectivity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=69&end=74#L69).
- [normalPartProjectivizationEquiv_symm_point: inverse evaluation](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartProjectivization.lean.html?from=29&start=97&end=101#L97).

## Lean source signature (exact)

The complete definition below is copied from the pinned source, including its defining right-hand side.

```lean
def normalPartProjectivizationEquiv : (ℙ ℂ H) × (ℙ ℂ H) ≃ normalPart S :=
  Equiv.ofBijective (normalPartProjectivizationMap S hS)
    ⟨normalPartProjectivizationMap_injective S hS,
      normalPartProjectivizationMap_surjective S hS⟩
```

In the source, `S` denotes the algebra $A$ used here.

| In the source | Mathematical meaning |
| --- | --- |
| `S`, its closedness instance, and `hS` | The closed concrete algebra $A$ in the text and nonzero irreducibility of its inclusion. These conditions ensure that all pairs used below yield normal kernels and that both lines are recoverable. |
| `(ℙ ℂ H) × (ℙ ℂ H)` | The ordered pair of source and target complex projective lines. This expression alone supplies no ordinary product-topology claim. |
| `≃ normalPart S` | A set-level bijection into the normal-part subtype, with an inverse on every such point. |
| `normalPartProjectivizationMap S hS` | The representative map defining $e$ in (1); its evaluation on any nonzero $x,y$ is $\ker f_{x,y}$, not merely a formal label. |
| `Equiv.ofBijective` with `..._injective` and `..._surjective` | Injectivity and surjectivity of this very map, giving its inverse on every normal kernel. |

The next comment and attribute introduce a later evaluation theorem; they are not part of this defining right-hand side.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Source lines 27–30:

```lean
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable [IsClosed (S : Set (H →L[ℂ] H))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
```
