Version 1 source-bound exposition export. Original text SHA-256: 4144c7a479745a936261aac67f45df6952e184672e8a8c0c4f9304bbf5f5f195. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Semilinear vector changes preserve finite normal-part closures

## Statement

Let $A_1\subseteq\mathcal B(H)$ and $A_2\subseteq\mathcal B(K)$ be norm-closed complex $\ast$-subalgebras with nonzero irreducible inclusion representations on complete complex Hilbert spaces. Neither algebra needs an identity. Use inner products linear in their second variable. For nonzero vectors, write
$$
f^{A_1}_{x,y}(a)=\langle y,a(x)\rangle\quad(a\in A_1),\qquad
f^{A_2}_{z,w}(b)=\langle w,b(z)\rangle\quad(b\in A_2).
$$
Let $N(A_j)\subseteq S(A_j)$ be the coefficient-kernel normal part, with inherited closure
$$
c_{A_j}(D)=\left\{I\in N(A_j):\bigcap_{J\in D}J\subseteq I\right\}.
$$
Suppose $\sigma:\mathbb C\to\mathbb C$ is a unital ring homomorphism with $\sigma^2=\mathrm{id}$ and $\sigma(\overline c)=\overline{\sigma(c)}$ for every $c$, and $U,V:H\to K$ are algebraic $\sigma$-semilinear isomorphisms. The definition equips
$$
F:N(A_1)\longrightarrow N(A_2),\qquad
F(\ker f^{A_1}_{x,y})=\ker f^{A_2}_{Ux,Vy}
\tag{1}
$$
with finite continuity in both directions. Thus $F$ is a finite-homeomorphism: a bijection whose map and inverse preserve membership in closures of finite sets.

## Definition

The underlying equivalence sends the coefficient kernel represented by $(x,y)$ to the kernel represented by $(Ux,Vy)$. Its inverse is
$$
F^{-1}:N(A_2)\longrightarrow N(A_1),\qquad
F^{-1}(\ker f^{A_2}_{z,w})=\ker f^{A_1}_{U^{-1}z,V^{-1}w}.
\tag{2}
$$
The [semilinear kernel bijection](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=124&end=140#L124) has the [forward evaluation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=100&end=121#L100) for every nonzero representing pair. Its inverse uses the inverses of those same $U,V$.

The other two fields are the finite-continuity requirements
$$
\begin{aligned}
F(c_{A_1}(D))&\subseteq c_{A_2}(F(D)) &&(D\subseteq N(A_1)\text{ finite}),\\
F^{-1}(c_{A_2}(E))&\subseteq c_{A_1}(F^{-1}(E)) &&(E\subseteq N(A_2)\text{ finite}).
\end{aligned}
\tag{3}
$$
The [finite-continuity theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=143&end=174#L143) guarantees these inclusions for $U,V$ and their inverses, respectively. Both inverse maps use the same self-inverse scalar homomorphism $\sigma$.

## Assumptions

The same scalar homomorphism governs both vector maps. Its inverse is itself, and it commutes with complex conjugation. $U,V$ are additive bijections with $U(cx)=\sigma(c)Ux$ and $V(cy)=\sigma(c)Vy$. They are not assumed bounded, isometric, unitary, or algebra intertwiners. Closedness and irreducibility belong to the two concrete algebras; they guarantee the coefficient-kernel realization and the finite-continuity theorem.

## Conclusion

The output is a bijection of the normal parts with finite continuity of the forward map and its inverse, for all finite subsets including the empty set. Full continuity for arbitrary subsets is not a field of this construction.

## Main citations

- [Exact finite-homeomorphism construction](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=178&end=188#L178): `normalPartSemilinearFiniteHomeomorph` and its three defining fields.
- [arXiv:2504.05551v1, Theorem 6.9](https://arxiv.org/abs/2504.05551v1): the algebraic finite-homeomorphism layer, separated from its bounded full-continuity layer.

- [normalPartSemilinearMap_point: representative-independent evaluation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=100&end=121#L100).
- [normalPartSemilinearEquiv: the specified bijection](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=124&end=140#L124).
- [finitelyContinuous_normalPartSemilinearMap: finite continuity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/NormalPartSemilinear.lean.html?from=30&start=143&end=174#L143).

## Lean source signature (exact)

The complete definition below is copied from the pinned source, including its defining right-hand side.

```lean
def normalPartSemilinearFiniteHomeomorph
    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
    (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))
    (hσ : ∀ c : ℂ, σ (star c) = star (σ c)) (U V : H ≃ₛₗ[σ] K) :
    ClosureSpace.FiniteHomeomorph
      ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))
      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) where
  toEquiv := normalPartSemilinearEquiv S T hS hT hσ U V
  finitelyContinuous_toFun := finitelyContinuous_normalPartSemilinearMap S T hS hT hσ U V
  finitelyContinuous_invFun :=
    finitelyContinuous_normalPartSemilinearMap T S hT hS hσ U.symm V.symm
```

In the source, `S` and `T` denote the algebras $A_1$ and $A_2$ used here, respectively.

| In the source | Mathematical meaning |
|---|---|
| [First algebra and Hilbert space](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-0)<br>`variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]`<br>`variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))`<br>`variable [IsClosed (S : Set (H →L[ℂ] H))]` | The complex Hilbert space $H$ and the norm-closed complex $\ast$-subalgebra $A_1\subseteq\mathcal B(H)$. The source calls this algebra `S`. |
| [Second algebra and scalar map](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-1)<br>`variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]`<br>`variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))`<br>`variable [IsClosed (T : Set (K →L[ℂ] K))]`<br>`variable {σ : ℂ →+* ℂ} [RingHomInvPair σ σ]` | The complex Hilbert space $K$ and the norm-closed algebra $A_2\subseteq\mathcal B(K)$, called `T`. The unital scalar homomorphism $\sigma:\mathbb C\to\mathbb C$ satisfies $\sigma\circ\sigma=\mathrm{id}$; the inverse vector maps therefore use the same scalar map. |
| [Irreducible actions and semilinear maps](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-2)<br>`    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`    (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))`<br>`    (hσ : ∀ c : ℂ, σ (star c) = star (σ c)) (U V : H ≃ₛₗ[σ] K) :` | The two algebras act nontrivially and irreducibly on their respective spaces. The maps $U,V:H\to K$ are additive bijections satisfying $U(cx)=\sigma(c)U(x)$ and $V(cx)=\sigma(c)V(x)$. The scalar condition is $\sigma(\overline c)=\overline{\sigma(c)}$ for every $c\in\mathbb C$. No boundedness is assumed. |
| [Domain and target closures](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-3)<br>`    ClosureSpace.FiniteHomeomorph`<br>`      ((NormedSpace.geometricStructureClosure ℂ S).subspace (normalPart S))`<br>`      ((NormedSpace.geometricStructureClosure ℂ T).subspace (normalPart T)) where` | The output is a finite homeomorphism $F:N(A_1)\to N(A_2)$. Each `subspace` restricts the geometric closure to the indicated normal part; these are the relative closures $c_{A_1},c_{A_2}$ used in (3). |
| [Underlying bijection](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-4)<br>`  toEquiv := normalPartSemilinearEquiv S T hS hT hσ U V` | This field uses the bijection induced by the same $U,V$: $$F(\ker f^{A_1}_{x,y})=\ker f^{A_2}_{Ux,Vy}.$$ Here $x,y\in H\setminus\{0\}$. Its inverse is the map in (2). |
| [Forward and inverse maps](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-5)<br>`def normalPartSemilinearEquiv`<br>`    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))`<br>`    (hT : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype T))`<br>`    (hσ : ∀ c : ℂ, σ (star c) = star (σ c)) (U V : H ≃ₛₗ[σ] K) :`<br>`    normalPart S ≃ normalPart T where`<br>`  toFun := normalPartSemilinearMap S T hT U V`<br>`  invFun := normalPartSemilinearMap T S hS U.symm V.symm` | The equivalence has forward map $F:N(A_1)\to N(A_2)$ and inverse $F^{-1}:N(A_2)\to N(A_1)$. The inverse uses $U^{-1},V^{-1}$, so for $z,w\in K\setminus\{0\}$, $$F^{-1}(\ker f^{A_2}_{z,w})=\ker f^{A_1}_{U^{-1}z,V^{-1}w}.$$ This excerpt specifies the two maps; the inverse-law proof fields remain in the full source. |
| [Finite forward continuity](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-6)<br>`  finitelyContinuous_toFun := finitelyContinuous_normalPartSemilinearMap S T hS hT hσ U V` | The cited result supplies, for every finite $D\subseteq N(A_1)$, $$F(c_{A_1}(D))\subseteq c_{A_2}(F(D)).$$ It applies to the same $U,V$ and scalar condition. |
| [Finite inverse continuity](https://exactmathematics.org/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html#card-30--source-row-7)<br>`  finitelyContinuous_invFun :=`<br>`    finitelyContinuous_normalPartSemilinearMap T S hT hS hσ U.symm V.symm` | The algebras and irreducibility hypotheses are exchanged, and `symm` takes the actual inverses of $U,V$. For every finite $E\subseteq N(A_2)$, $$F^{-1}(c_{A_2}(E))\subseteq c_{A_1}(F^{-1}(E)).$$ Neither field asserts continuity on arbitrary subsets. |

The declaration retains the full three-field right-hand side. The self-inverse scalar condition is in the separately displayed ambient context.

The type presentation contains elisions, which remain explicitly marked. The literal source excerpt and surrounding scope are shown separately; no new Lean execution or census is claimed.

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {H : Type u} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
variable (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H))
variable [IsClosed (S : Set (H →L[ℂ] H))]
```

Exact surrounding source:

```lean
variable {K : Type v} [NormedAddCommGroup K] [InnerProductSpace ℂ K] [CompleteSpace K]
variable (T : NonUnitalStarSubalgebra ℂ (K →L[ℂ] K))
variable [IsClosed (T : Set (K →L[ℂ] K))]
variable {σ : ℂ →+* ℂ} [RingHomInvPair σ σ]
```
