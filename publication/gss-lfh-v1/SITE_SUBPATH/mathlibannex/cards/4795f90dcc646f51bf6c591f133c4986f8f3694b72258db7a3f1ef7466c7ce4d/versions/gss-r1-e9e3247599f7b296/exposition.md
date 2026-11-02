Version 1 source-bound exposition export. Original text SHA-256: c6a6d504bcc53653894fa3c1128011d9e15bf4857d45c7ac3d32898f7a8d687d. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The coefficient-kernel normal part

## Statement

Let $H$ be a complete complex Hilbert space and $A\subseteq\mathcal B(H)$ a complex $\ast$-subalgebra, not required to contain an identity. Give $A$ the inherited operator norm. Its **normal part** selects those points of the geometric structure space of $A$ whose underlying subsets are kernels of vector coefficient functionals

$$
f_{x,y}:A\longrightarrow\mathbb C,\qquad f_{x,y}(a)=\langle y,a(x)\rangle,
\quad x,y\ne0.
\tag{1}
$$

The inner product is conjugate-linear in its first variable. This definition itself assumes neither norm-closedness nor irreducibility of $A$.

## Definition

For each maximal proper face $M$ of the closed unit ball of $A$, take the union of the kernels of the norm-one bounded complex-linear functionals supporting $M$. The geometric structure space $S(A)$ is the family of these subsets, with repetitions identified. Faces use real convexity. The norm-one description follows from [the support-functional norm theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=27&start=81&end=91#L81), since $M$ is a nonempty subset of the unit ball.

The normal part is the following subset of that already defined space:

$$
N(A)=\left\{I\in S(A):
\begin{array}{l}
\text{there exist }x,y\in H\text{ with }x\ne0,\ y\ne0,\\
 I=\ker f_{x,y}
\end{array}\right\}.
\tag{2}
$$

In (2), the same pair $x,y$ satisfies both nonzero conditions and the kernel equality. With the stated inner-product convention, $f_{x,y}$ is complex-linear in $a$.

The set (2) consists of points of $S(A)$ that are coefficient kernels. For a general algebra $A$, the kernel of a nonzero vector pair need not belong to $S(A)$. In particular, nonzero vectors alone need not make the restricted coefficient nonzero when the algebra is reducible. Under the additional closedness and irreducibility hypotheses in [the component theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=27&start=96&end=118#L96), every nonzero pair does give a geometric point and the normal part is one entire component.

## Assumptions

Only the complete complex Hilbert structure on $H$ and the complex $\ast$-subalgebra structure on $A$ are required. Completeness or norm-closedness of $A$, nonzero action, irreducibility, separability, and the existence of a unit in $A$ are not assumed.

## Conclusion

The result is a subset of the geometric structure space, defined by literal equality with a vector coefficient's zero set. It is not a new quotient of pairs of vectors and does not yet assert a component equality, a projective parametrization, or a homeomorphism. Those statements require the additional hypotheses in the cited results.

## Main citations

- [Exact normal-part definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=27&start=35&end=38#L35): the set (2), before the later closedness binder.
- [The ambient geometric structure space](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html): the original face-and-support construction used by the type in (2).
- [A coefficient-kernel component equals the normal part](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPart.lean.html?from=27&start=96&end=118#L96): the stronger conclusion for a closed irreducible concrete algebra.
- [arXiv:2504.05551v1, Definition 6.4](https://arxiv.org/abs/2504.05551v1): the normal part in the irreducible concrete setting. The general source definition is deliberately stated before those additional hypotheses.

## Lean source signature (exact)

The complete definition below is copied from the pinned source, including its defining right-hand side.

```lean
def normalPart (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) :
    Set (NormedSpace.GeometricStructureSpace ℂ S) :=
  {I | ∃ x y : H, x ≠ 0 ∧ y ≠ 0 ∧
    {a : S | inner ℂ y ((a : H →L[ℂ] H) x) = 0} = I.val}
```

In the source, `S` denotes the algebra $A$ used here.

| In the source | Mathematical meaning |
| --- | --- |
| `{H}` and the three Hilbert-space instances | The complete complex Hilbert space $H$ of (1). These conditions are on $H$, not on the normed subalgebra $A$. |
| `S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)` | The algebra $A$ in the text: a complex linear subspace of bounded complex-linear operators, closed under multiplication and adjoint; no unit-preservation or norm-closedness condition is part of this parameter. |
| `Set (NormedSpace.GeometricStructureSpace ℂ S)` | The normal part is a subset of the existing geometric space $S(A)$, whose points have underlying subsets of $A$. |
| `∃ x y : H, x ≠ 0 ∧ y ≠ 0 ∧ ...` | One pair of vectors satisfies both nonzero conditions and the following equality. Separate pairs are not chosen for separate conjuncts. |
| `inner ℂ y ((a : H →L[ℂ] H) x) = 0` and `= I.val` | The entire coefficient zero set is the underlying subset of the same geometric point $I$. The operator acts on $x$ and is paired against $y$; this is exactly (2). |
| The complete set-builder right-hand side | Selects only kernels that are already geometric points; component and projective claims require separate hypotheses and results. |

No closedness or irreducibility binder is appended. The line immediately following this definition in the retained block is not part of its scope.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Source lines 32–32:

```lean
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```
