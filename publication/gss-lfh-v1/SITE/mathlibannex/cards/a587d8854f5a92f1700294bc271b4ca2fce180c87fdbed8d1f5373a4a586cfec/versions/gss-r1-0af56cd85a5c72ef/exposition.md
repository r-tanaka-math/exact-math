Version 1 source-bound exposition export. Original text SHA-256: 01ac6d994cc5e3ade5f050476140b2be7f4b5625e001b7d03c359cc7a1fe71fa. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Continuity is an operator-inclusion condition

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

For $D\subseteq N(A)$, the inherited hull–kernel closure is

$$
c_{A}(D)=\left\{I\in N(A):\bigcap_{J\in D}J\subseteq I\right\},
$$

and $c_{B}$ is defined analogously on subsets of $N(B)$. Let $U,V:H\to K$ be bounded complex-linear isomorphisms with bounded inverses, and let

$$
F:N(A)\longrightarrow N(B),\qquad F(\ker f^{A}_{x,y})=\ker f^{B}_{Ux,Vy}.
$$

The [point-evaluation theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=31&start=100&end=121#L100) guarantees this formula for every representative of a normal point. This map satisfies

$$
F\text{ is fully continuous}\quad\Longleftrightarrow\quad V^*B U\subseteq A,
\tag{1}
$$

where $V^*:K\to H$ is the adjoint of $V$ and $V^*BU=\{V^*bU:b\in B\}$. Here full continuity means

$$
F(c_{A}(D))\subseteq c_{B}(F(D))\qquad\text{for every }D\subseteq N(A).
$$


## Assumptions

The maps $U,V$ and their inverses are bounded. Neither map is assumed unitary, and no intertwining relation is imposed. The operator inclusion in (1) is equivalent to continuity, not an additional hypothesis.


## Conclusion

The criterion concerns closure preservation for all subsets of $N(A)$, not just finite subsets. Its right-hand side is an inclusion of subsets of $\mathcal B(H)$.


## Main citations

- [Exact bounded continuity criterion](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartBounded.lean.html?from=31&start=37&end=46#L37): `continuous_normalPartLinearMap_iff`.
- [General coefficient-transport criterion](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartContinuity.lean.html?from=31&start=66&end=160#L66): `continuous_normalPartSemilinearMap_iff`, specialized to the identity scalar homomorphism.
- [arXiv:2504.05551v1, Theorem 6.9](https://arxiv.org/abs/2504.05551v1): the full-continuity criterion for bounded linear changes of coefficient vectors.
- [The bounded operator transport](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/InnerProductSpace/ConjugateAdjoint.lean.html?from=31&start=119&end=120#L119): `adjointSandwich U V b` is exactly the composite $V^*\circ b\circ U$, from $H$ to $H$.
- [Normal-part point evaluation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=31&start=100&end=121#L100) and [its inverse equivalence](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=31&start=124&end=140#L124): the same vector changes define the map and its inverse.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem continuous_normalPartLinearMap_iff (U V : H ≃L[ℂ] K) :
    ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous
      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T))
      (normalPartSemilinearMap S T hT U.toLinearEquiv V.toLinearEquiv) ↔
      ∀ b : T, InnerProductSpace.adjointSandwich U.toContinuousLinearMap V.toContinuousLinearMap
        (b : K →L[ℂ] K) ∈ S
```

In the source, `S` and `T` denote the algebras $A$ and $B$ used here, respectively.

| In the source | Mathematical meaning |
| --- | --- |
| [Ambient spaces and algebras](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))` | The complex Hilbert spaces $H,K$ and the nonzero norm-closed complex $\ast$-subalgebras $A\subseteq\mathcal B(H)$, $B\subseteq\mathcal B(K)$, acting irreducibly. The source names $S,T$ denote $A,B$. |
| [Source irreducibility parameter](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-1)<br>`include hS in` | The irreducibility of the action of $A$ is retained in this theorem, as well as that of $B$. |
| [Chosen bounded maps](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-2)<br>`theorem continuous_normalPartLinearMap_iff (U V : H ≃L[ℂ] K) :` | The same bounded complex-linear isomorphisms $U,V:H\to K$, with bounded inverses, used to define $F$. |
| [Closures and the specified map](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-3)<br>`    ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S)).Continuous`<br>`      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T))`<br>`      (normalPartSemilinearMap S T hT U.toLinearEquiv V.toLinearEquiv) ↔` | The relative closures $c_A$ on $N(A)$ and $c_B$ on $N(B)$ are the source and target of full continuity. Passing to the underlying linear maps does not change $U,V$ or the induced map $F$. Thus the left side of (1) is $$F(c_A(D))\subseteq c_B(F(D))\quad(D\subseteq N(A)).$$ |
| [Full continuity](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-4)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | For arbitrary closure spaces and a map, the image of the closure of every subset lies in the closure of its image. Applied here, the map is $F$ and the closures are precisely $c_A,c_B$, not ambient closures on all geometric points. |
| [Operator inclusion](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-5)<br>`      ∀ b : T, InnerProductSpace.adjointSandwich U.toContinuousLinearMap V.toContinuousLinearMap`<br>`        (b : K →L[ℂ] K) ∈ S :=` | For every $b\in B$, the composite is an element of $A$: $$V^*bU\in A\quad(b\in B).$$ Equivalently, $$V^*BU\subseteq A.$$ Together with the preceding equivalence sign, this is exactly (1). |
| [Adjoint sandwich](https://exactmathematics.org/mathlibannex/cards/a587d8854f5a92f1700294bc271b4ca2fce180c87fdbed8d1f5373a4a586cfec/versions/gss-r1-0af56cd85a5c72ef/index.html#card-31--source-row-6)<br>`def adjointSandwich (U V : H →L[𝕜] K) (b : K →L[𝕜] K) : H →L[𝕜] H :=`<br>`  V.adjoint.comp (b.comp U)` | The bounded operator $V^*\circ b\circ U:H\to H$. The arguments are the same $U,V$ as functions and the given operator $b:K\to K$; their order is unchanged. |

The include directive shown separately applies to this theorem alone. It accounts for the source irreducibility parameter in the retained type.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Exact ambient excerpt:

```lean
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))
variable [IsClosed (S : Set (H →L[ℂ] H))] [IsClosed (T : Set (K →L[ℂ] K))]
variable (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
variable (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))
```

Exact ambient excerpt:

```lean
include hS in
```

The effective source context uses independent universes for $H$ and $K$. The adjoint in $V^*bU$ is the bounded Hilbert-space adjoint from $K$ to $H$. The [literal definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/InnerProductSpace/ConjugateAdjoint.lean.html?from=31&start=119&end=120#L119) is `V.adjoint.comp (b.comp U)`; its order is the same as the operator formula above.

