Version 1 source-bound exposition export. Original text SHA-256: 4f5d20cbfe8ee81540da514b21be3d3bc3fdbe5eabb982ec899d257c2bb193dc. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Two-sided continuity is exact operator equality

## Statement

Let $H,K$ be complex Hilbert spaces. Let $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$ be nonzero norm-closed complex $\ast$-subalgebras acting irreducibly on $H$ and $K$, respectively. Neither algebra is assumed unital. For $x,y\in H\setminus\{0\}$ and $z,w\in K\setminus\{0\}$, define

$$
\begin{aligned}
f^{A}_{x,y}:A\to\mathbb C,&\qquad f^{A}_{x,y}(a)=\langle y,a(x)\rangle,\\
f^{B}_{z,w}:B\to\mathbb C,&\qquad f^{B}_{z,w}(b)=\langle w,b(z)\rangle.
\end{aligned}
$$

Both inner products are conjugate-linear in the first variable. The normal parts are

$$
\begin{aligned}
N(A)&=\left\{\ker f^{A}_{x,y}:x,y\in H\setminus\{0\}\right\},\\
N(B)&=\left\{\ker f^{B}_{z,w}:z,w\in K\setminus\{0\}\right\}.
\end{aligned}
$$

Let $U,V:H\to K$ be bounded complex-linear isomorphisms with bounded inverses. The maps on normal points are

$$
\begin{aligned}
F:N(A)\longrightarrow N(B),&\qquad F(\ker f^{A}_{x,y})=\ker f^{B}_{Ux,Vy},\\
F^{-1}:N(B)\longrightarrow N(A),&\qquad F^{-1}(\ker f^{B}_{z,w})=\ker f^{A}_{U^{-1}z,V^{-1}w}.
\end{aligned}
\tag{1}
$$

The [normal-part equivalence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=32&start=124&end=140#L124) guarantees that these are inverse bijections, and its [point-evaluation theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=32&start=100&end=121#L100) guarantees the formulas for every representative. For the inherited hull–kernel closures,

$$
F\text{ and }F^{-1}\text{ are fully continuous}
\quad\Longleftrightarrow\quad
V^*BU=A.
\tag{2}
$$

Here $V^*:K\to H$ is the adjoint of $V$, and $V^*BU=\{V^*bU:b\in B\}$. For $D\subseteq N(A)$, write $c_{A}(D)=\{I\in N(A):\bigcap_{J\in D}J\subseteq I\}$. For $E\subseteq N(B)$, write $c_{B}(E)=\{I\in N(B):\bigcap_{J\in E}J\subseteq I\}$. Full continuity of $F$ means

$$
F(c_{A}(D))\subseteq c_{B}(F(D))\qquad\text{for every }D\subseteq N(A),
$$

and full continuity of its inverse means

$$
F^{-1}(c_{B}(E))\subseteq c_{A}(F^{-1}(E))\qquad\text{for every }E\subseteq N(B).
$$


## Assumptions

Boundedness of the vector maps and their inverses is part of the input, making their adjoints bounded operators in the indicated directions. They are not assumed unitary or assumed to intertwine $A,B$. The map $F^{-1}$ is the inverse arising from the **same** $U,V$, not an independently chosen map. The equality on the right of (2) is a conclusion equivalent to the two continuities, not an additional hypothesis on both sides.


## Conclusion

Two-sided full continuity is equivalent to equality of concrete operator sets in $\mathcal B(H)$. It is stronger than the finite-homeomorphism property obtained from the algebraic vector changes alone. No assertion is made that the operator transport $b\mapsto V^*bU$ is multiplicative or preserves adjoints.


## Main citations

- [One-direction full continuity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartBounded.lean.html?from=32&start=37&end=46#L37): the related inclusion criterion for the same specified forward map.
- [Exact two-sided bounded criterion](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartBounded.lean.html?from=32&start=49&end=63#L49): forward and inverse maps use the same bounded equivalences.
- [arXiv:2504.05551v1, Theorem 6.9](https://arxiv.org/abs/2504.05551v1): the full-homeomorphism image condition.
- [The bounded operator transport](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/InnerProductSpace/ConjugateAdjoint.lean.html?from=32&start=119&end=120#L119): `adjointSandwich U V b` is exactly the composite $V^*\circ b\circ U$, from $H$ to $H$.
- [Normal-part point evaluation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=32&start=100&end=121#L100) and [its inverse equivalence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=32&start=124&end=140#L124): the same vector changes define the map and its inverse.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem continuous_normalPartLinearMap_and_inverse_iff (U V : H ≃L[ℂ] K) :
    (((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous
        ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T))
        (normalPartSemilinearMap S T hT U.toLinearEquiv V.toLinearEquiv) ∧
      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)).Continuous
        ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))
        (normalPartSemilinearMap T S hS U.symm.toLinearEquiv V.symm.toLinearEquiv)) ↔
      InnerProductSpace.adjointSandwich U.toContinuousLinearMap V.toContinuousLinearMap ''
        (T : Set (K →L[ℂ] K)) = (S : Set (H →L[ℂ] H))
```

In the source, `S` and `T` denote the algebras $A$ and $B$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [Hilbert spaces and irreducible algebras](https://exactmathematics.org/mathlibannex/cards/5073fcc22c365d351ee496998fb6c996496d5cd2c983cfb21d4d847a74d4c04c/versions/gss-r1-aefe0f2958a89d2b/index.html#card-32--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The spaces $H,K$ are complex Hilbert spaces. The source algebras `S`,`T` are $A\subseteq\mathcal B(H)$ and $B\subseteq\mathcal B(K)$. Closedness and the two inclusion representations express the nonzero norm-closed irreducible actions in the Statement. |
| [Bounded linear isomorphisms](https://exactmathematics.org/mathlibannex/cards/5073fcc22c365d351ee496998fb6c996496d5cd2c983cfb21d4d847a74d4c04c/versions/gss-r1-aefe0f2958a89d2b/index.html#card-32--source-row-1)<br>`theorem continuous_normalPartLinearMap_and_inverse_iff (U V : H ≃L[ℂ] K) :` | The same two bounded complex-linear isomorphisms $U,V:H\to K$, with bounded inverses, define $F$ and $F^{-1}$ in (1). |
| [Forward closure continuity](https://exactmathematics.org/mathlibannex/cards/5073fcc22c365d351ee496998fb6c996496d5cd2c983cfb21d4d847a74d4c04c/versions/gss-r1-aefe0f2958a89d2b/index.html#card-32--source-row-2)<br>`    (((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous`<br>`        ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T))`<br>`        (normalPartSemilinearMap S T hT U.toLinearEquiv V.toLinearEquiv) ∧` | The `subspace` arguments give the relative closures on $N(A)$ and $N(B)$. The underlying linear equivalences are the same $U,V$, with their boundedness forgotten only in this map constructor. For every $D\subseteq N(A)$, $$F(c_A(D))\subseteq c_B(F(D)).$$ |
| [Inverse closure continuity](https://exactmathematics.org/mathlibannex/cards/5073fcc22c365d351ee496998fb6c996496d5cd2c983cfb21d4d847a74d4c04c/versions/gss-r1-aefe0f2958a89d2b/index.html#card-32--source-row-3)<br>`      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)).Continuous`<br>`        ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`        (normalPartSemilinearMap T S hS U.symm.toLinearEquiv V.symm.toLinearEquiv)) ↔` | The second map uses the actual inverses $U^{-1},V^{-1}$, with the algebras exchanged. For every $E\subseteq N(B)$, $$F^{-1}(c_B(E))\subseteq c_A(F^{-1}(E)).$$ These two conditions, joined by conjunction, are the left side of (2). |
| [Adjoint composition](https://exactmathematics.org/mathlibannex/cards/5073fcc22c365d351ee496998fb6c996496d5cd2c983cfb21d4d847a74d4c04c/versions/gss-r1-aefe0f2958a89d2b/index.html#card-32--source-row-4)<br>`def adjointSandwich (U V : H →L[𝕜] K) (b : K →L[𝕜] K) : H →L[𝕜] H :=`<br>`  V.adjoint.comp (b.comp U)` | For $b\in\mathcal B(K)$ this is the bounded operator $V^*bU\in\mathcal B(H)$, in exactly that order. The adjoint $V^*:K\to H$ is taken for the same Hilbert structures. |
| [Equality of operator sets](https://exactmathematics.org/mathlibannex/cards/5073fcc22c365d351ee496998fb6c996496d5cd2c983cfb21d4d847a74d4c04c/versions/gss-r1-aefe0f2958a89d2b/index.html#card-32--source-row-5)<br>`      InnerProductSpace.adjointSandwich U.toContinuousLinearMap V.toContinuousLinearMap ''`<br>`        (T : Set (K →L[ℂ] K)) = (S : Set (H →L[ℂ] H)) :=` | The image operation applies $b\mapsto V^*bU$ to $B$. The right side is $$V^*BU=\{V^*bU:b\in B\}=A.$$ The theorem makes this equivalent to both continuity conditions for the same $F,F^{-1}$. It does not assert that $b\mapsto V^*bU$ preserves multiplication or the involution. |

The two displayed maps are inverse maps induced by the same bounded equivalences; the later bundled full-homeomorphism definition is not included.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))
variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))
```

The effective source context uses independent universes for $H$ and $K$. The adjoint in $V^*bU$ is the bounded Hilbert-space adjoint from $K$ to $H$. The [literal definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/InnerProductSpace/ConjugateAdjoint.lean.html?from=32&start=119&end=120#L119) is `V.adjoint.comp (b.comp U)`; its order is the same as the operator formula above.

