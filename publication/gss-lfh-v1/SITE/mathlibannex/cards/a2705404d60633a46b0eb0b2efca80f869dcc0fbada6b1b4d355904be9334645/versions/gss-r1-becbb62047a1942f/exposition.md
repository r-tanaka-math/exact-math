Version 1 source-bound exposition export. Original text SHA-256: 44f2a44ec02a3b79fc43efc0b2279dae2461cb1d7da452689aa237248c914b60. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Linked normal kernels share a projective coordinate

## Statement

Let $H$ be a complex Hilbert space, and let $A\subseteq\mathcal B(H)$ be a nonzero norm-closed complex $\ast$-subalgebra acting irreducibly on $H$. An identity is not required. For $x,y\in H\setminus\{0\}$, define the bounded linear functional

$$
f_{x,y}:A\to\mathbb C,\qquad f_{x,y}(a)=\langle y,a(x)\rangle.
$$

The inner product is conjugate-linear in its first variable. The normal part is $N(A)=\{\ker f_{x,y}:x,y\in H\setminus\{0\}\}$. For $D\subseteq N(A)$, its inherited closure is

$$
c(D)=\left\{I\in N(A):\bigcap_{J\in D}J\subseteq I\right\}.
$$

Two points are **linked** when they are equal or their two-point set is not closed for this closure. For $x_1,x_2,y_1,y_2\in H\setminus\{0\}$,

$$
\ker f_{x_1,y_1}\text{ and }\ker f_{x_2,y_2}\text{ are linked}
\quad\Longleftrightarrow\quad
\mathbb Cx_1=\mathbb Cx_2\ \text{or}\ \mathbb Cy_1=\mathbb Cy_2.
\tag{1}
$$


## Assumptions

All four vectors are nonzero, but no unit-length or linear-independence assumption is imposed. Under these hypotheses, [the coefficient-kernel membership theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=33&start=64&end=79#L64) guarantees that every nonzero pair defines a point of the normal part. The closure in (1) is restricted to $N(A)$, not to arbitrary points of the ambient geometric structure space.


## Conclusion

One shared projective coordinate characterizes a linked pair. In contrast, the [coefficient-kernel equality theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartLinked.lean.html?from=33&start=36&end=48#L36) identifies equality of the two points with agreement of **both** projective coordinates. Linkedness here is the original pair relation, not its finite-chain transitive closure.


## Main citations

- [Linked-pair theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartLinked.lean.html?from=33&start=210&end=239#L210): the equivalence (1), for the inherited normal-part closure.
- [arXiv:2504.05551v1, Lemma 6.10](https://arxiv.org/abs/2504.05551v1): the linkedness criterion in the normal part.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem linked_normalPartPoint_iff_span_eq_or_span_eq
    (x₁ x₂ y₁ y₂ : H) (hx₁ : x₁ ≠ 0) (hx₂ : x₂ ≠ 0)
    (hy₁ : y₁ ≠ 0) (hy₂ : y₂ ≠ 0) :
    ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Linked
      (normalPartPoint S hS x₁ y₁ hx₁ hy₁) (normalPartPoint S hS x₂ y₂ hx₂ hy₂) ↔
      Submodule.span ℂ {x₁} = Submodule.span ℂ {x₂} ∨
      Submodule.span ℂ {y₁} = Submodule.span ℂ {y₂}
```

In the source, `S` denotes the algebra $A$ used here.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert space and irreducible algebra](https://exactmathematics.org/mathlibannex/cards/a2705404d60633a46b0eb0b2efca80f869dcc0fbada6b1b4d355904be9334645/versions/gss-r1-becbb62047a1942f/index.html#card-33--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))` | The complex Hilbert space $H$ and the nonzero norm-closed complex $\ast$-subalgebra $A\subseteq\mathcal B(H)$ acting irreducibly. The source calls the algebra `S`. |
| [Four nonzero vectors](https://exactmathematics.org/mathlibannex/cards/a2705404d60633a46b0eb0b2efca80f869dcc0fbada6b1b4d355904be9334645/versions/gss-r1-becbb62047a1942f/index.html#card-33--source-row-1)<br>`    (x₁ x₂ y₁ y₂ : H) (hx₁ : x₁ ≠ 0) (hx₂ : x₂ ≠ 0)`<br>`    (hy₁ : y₁ ≠ 0) (hy₂ : y₂ ≠ 0) :` | The vectors $x_1,x_2,y_1,y_2$ belong to $H\setminus\{0\}$. There is no normalization or independence condition. |
| [Linked coefficient kernels](https://exactmathematics.org/mathlibannex/cards/a2705404d60633a46b0eb0b2efca80f869dcc0fbada6b1b4d355904be9334645/versions/gss-r1-becbb62047a1942f/index.html#card-33--source-row-2)<br>`    ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Linked`<br>`      (normalPartPoint S hS x₁ y₁ hx₁ hy₁) (normalPartPoint S hS x₂ y₂ hx₂ hy₂) ↔` | The two points are $\ker f_{x_1,y_1}$ and $\ker f_{x_2,y_2}$ in $N(A)$. The outer `subspace` gives the relative closure $c$ on $N(A)$. Linkedness means that the points are equal or that their two-point set is not closed; it does not mean a finite chain of links. |
| [Projective source or target equality](https://exactmathematics.org/mathlibannex/cards/a2705404d60633a46b0eb0b2efca80f869dcc0fbada6b1b4d355904be9334645/versions/gss-r1-becbb62047a1942f/index.html#card-33--source-row-3)<br>`      Submodule.span ℂ {x₁} = Submodule.span ℂ {x₂} ∨`<br>`      Submodule.span ℂ {y₁} = Submodule.span ℂ {y₂} := by` | The two alternatives in (1) are $$\mathbb Cx_1=\mathbb Cx_2\quad\text{or}\quad\mathbb Cy_1=\mathbb Cy_2.$$ Each span is the complex line generated by its nonzero vector. The disjunction classifies linkedness; equality of the two kernels requires both line equalities, as stated in the separately cited result. |

Linkedness includes equal points. The theorem concerns one linked pair, not a finite chain.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable [IsClosed (S : Set (H →L[ℂ] H))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
```

