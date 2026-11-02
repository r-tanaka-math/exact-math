Version 1 source-bound exposition export. Original text SHA-256: 6de0837dbdef18067bb20a59763924c37000c7aa607df20da86eff2ae94df880. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A coefficient-kernel component equals the normal part

## Statement

Let $H$ be a complex Hilbert space, and let $A\subseteq\mathcal B(H)$ be a nonzero norm-closed complex $\ast$-subalgebra acting irreducibly on $H$. No identity is required. For $x,y\in H\setminus\{0\}$, define the bounded linear functional

$$
f_{x,y}:A\to\mathbb C,\qquad f_{x,y}(a)=\langle y,a(x)\rangle,
$$

where the inner product is conjugate-linear in the first variable. The geometric structure space $S(A)$ consists of the kernels of extreme points of the closed unit ball of the Banach dual of $A$, with convexity over $\mathbb R$. The [coefficient-kernel membership theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=28&start=64&end=79#L64) guarantees that every $\ker f_{x,y}$ above belongs to $S(A)$. For $D\subseteq S(A)$, the hull–kernel closure is

$$
c_A(D)=\left\{I\in S(A):\bigcap_{J\in D}J\subseteq I\right\}.
$$

Two points are linked if they are equal or their two-point set is not closed. For $I\in S(A)$, let $C(I)$ be its component under finite chains of links, including $I$ itself. Then, for every $x,y\in H\setminus\{0\}$,

$$
C(\ker f_{x,y})=N(A)=\left\{\ker f_{z,w}:z,w\in H\setminus\{0\}\right\}.
\tag{1}
$$

The set $N(A)$ is called the normal part of $A$.


## Assumptions

The algebra $A$ has its inherited operator norm and adjoint. Here irreducibility means that the only closed $A$-invariant subspaces of $H$ are $\{0\}$ and $H$; nonzero action is ensured by $A\ne\{0\}$. The vectors $x,y$ need not be unit vectors.


## Conclusion

Thus $N(A)$ is one component of the ambient space $S(A)$, independent of the nonzero pair $x,y$ used to specify the starting kernel. This does not assert $N(A)=S(A)$.


## Main citations

- [The normal-part definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=28&start=35&end=38#L35): the membership condition with a single nonzero pair.
- [Whole-component theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/RepresentationComponents.lean.html?from=28&start=118&end=150#L118): `component_matrixCoefficientKernel_eq_family`, the result retained from the preceding component analysis.
- [Exact concrete component theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=28&start=96&end=118#L96): the equality for the inclusion representation.
- [arXiv:2504.05551v1, Lemma 6.3 and Definition 6.4](https://arxiv.org/abs/2504.05551v1): the coefficient component and the normal-part terminology.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem component_restrictedMatrixCoefficientKernel_eq_normalPart
    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
    (x y : H) (hx : x ≠ 0) (hy : y ≠ 0) :
    (NormedSpace.geometricStructureClosure ℂ S).component
      (restrictedMatrixCoefficientKernel S hS x y hx hy) = normalPart S
```

In the source, `S` denotes the algebra $A$ used here.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert space](https://exactmathematics.org/mathlibannex/cards/59104afef875e8e638fb7e2aab8b9911f46750d7596282da822dfc7c2d4e91cb/versions/gss-r1-be2c9f197ae2181f/index.html#card-28--source-row-0)<br>`variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]` | The complete complex Hilbert space $H$ on which $A$ acts. |
| [Closed operator algebra](https://exactmathematics.org/mathlibannex/cards/59104afef875e8e638fb7e2aab8b9911f46750d7596282da822dfc7c2d4e91cb/versions/gss-r1-be2c9f197ae2181f/index.html#card-28--source-row-1)<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) [IsClosed (S : Set (H →L[ℂ] H))]` | The source name $S$ denotes the algebra $A\subseteq\mathcal B(H)$. The closedness assumption concerns this subset of bounded operators. |
| [Inherited C*-algebra structure](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html#L42)<br>`private abbrev normalPartCStarAlgebra : NonUnitalCStarAlgebra S :=`<br>`  NonUnitalStarSubalgebra.nonUnitalCStarAlgebra S (h_closed := inferInstance)`<br>``<br>`attribute [local instance] normalPartCStarAlgebra` | The closed subalgebra has the inherited C*-algebra structure. The local instance makes that structure available when forming $S(A)$ and its closure; it does not impose a new hypothesis. |
| [Irreducibility and coefficient vectors](https://exactmathematics.org/mathlibannex/cards/59104afef875e8e638fb7e2aab8b9911f46750d7596282da822dfc7c2d4e91cb/versions/gss-r1-be2c9f197ae2181f/index.html#card-28--source-row-3)<br>`    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`    (x y : H) (hx : x ≠ 0) (hy : y ≠ 0) :` | The inclusion action of $A$ is nonzero and irreducible. The two vectors are $x,y\in H\setminus\{0\}$, defining $\ker f_{x,y}$ in (1). |
| [Ambient component equality](https://exactmathematics.org/mathlibannex/cards/59104afef875e8e638fb7e2aab8b9911f46750d7596282da822dfc7c2d4e91cb/versions/gss-r1-be2c9f197ae2181f/index.html#card-28--source-row-4)<br>`    (NormedSpace.geometricStructureClosure ℂ S).component`<br>`      (restrictedMatrixCoefficientKernel S hS x y hx hy) = normalPart S := by` | The complete starting point is the coefficient kernel for the same $A,x,y$. The component is taken in the ambient space $S(A)$, and $$C(\ker f_{x,y})=N(A).$$ It is not a component formed after restricting to $N(A)$, and it does not assert $N(A)=S(A)$. |
| [Coefficient-kernel point](https://exactmathematics.org/mathlibannex/cards/59104afef875e8e638fb7e2aab8b9911f46750d7596282da822dfc7c2d4e91cb/versions/gss-r1-be2c9f197ae2181f/index.html#card-28--source-row-5)<br>`def restrictedMatrixCoefficientKernel`<br>`    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`    (x y : H) (hx : x ≠ 0) (hy : y ≠ 0) : NormedSpace.GeometricStructureSpace ℂ S :=`<br>`  ⟨{a : S \| inner ℂ y ((a : H →L[ℂ] H) x) = 0},`<br>`    setOf_inner_apply_eq_zero_mem_geometricStructureFamily S hS x y hx hy⟩` | The constructed point has underlying subset $\ker f_{x,y}$; the stated irreducibility and nonzero-vector conditions certify its membership in $S(A)$. The [coefficient-kernel evaluation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=28&start=88&end=88#L88) records that same subset. |
| [Normal part](https://exactmathematics.org/mathlibannex/cards/59104afef875e8e638fb7e2aab8b9911f46750d7596282da822dfc7c2d4e91cb/versions/gss-r1-be2c9f197ae2181f/index.html#card-28--source-row-6)<br>`def normalPart (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) :`<br>`    Set (NormedSpace.GeometricStructureSpace ℂ S) :=`<br>`  {I \| ∃ x y : H, x ≠ 0 ∧ y ≠ 0 ∧`<br>`    {a : S \| inner ℂ y ((a : H →L[ℂ] H) x) = 0} = I.val}` | The set $N(A)$ consists of geometric points $I\in S(A)$ for which there exist $z,w\in H\setminus\{0\}$ with $I=\ker f_{z,w}$. Under the present hypotheses every such kernel is a geometric point, as used in (1). |

The local instance below is a consequence of the closed-subalgebra hypothesis. The following Image section and its new variables are not part of this theorem.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```

Exact surrounding source:

```lean
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) [IsClosed (S : Set (H →L[ℂ] H))]
```

Exact surrounding source:

```lean
private abbrev normalPartCStarAlgebra : NonUnitalCStarAlgebra S :=
  NonUnitalStarSubalgebra.nonUnitalCStarAlgebra S (h_closed := inferInstance)

attribute [local instance] normalPartCStarAlgebra
```

