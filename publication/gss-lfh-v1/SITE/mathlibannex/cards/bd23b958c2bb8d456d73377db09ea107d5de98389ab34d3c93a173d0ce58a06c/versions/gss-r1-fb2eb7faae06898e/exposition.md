Version 1 source-bound exposition export. Original text SHA-256: ca59a64f25815344ff40a0fdd49d55a006446ca261bc87e57761a99e33695df3. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Every geometric-spectrum component contains a pure-state kernel

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, possibly without an identity. Its geometric structure space $S(A)$ consists of kernels $\ker\rho\subseteq A$ of bounded complex-linear functionals $\rho:A\to\mathbb C$ that are extreme points, for real convexity, of the entire closed dual unit ball $B_{A^*}$, as stated by [the extreme-kernel identification](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=20&start=49&end=65#L49), with closure

$$
c_A(\mathcal T)=\left\{I\in S(A):\bigcap_{J\in\mathcal T}J\subseteq I\right\}.
$$

Two points are linked if they are equal or their pair is not closed. Their finite-chain equivalence classes are the components. A point $C$ of the geometric spectrum $\mathrm{GS}(A)$ is one such component subset of $S(A)$.

For every $C\in\mathrm{GS}(A)$ there is a pure state $\varphi$ of $A$ such that

$$
\ker\varphi\in C.
\tag{1}
$$

Here $\ker\varphi$ is a point of $S(A)$: the [pure-state extremality theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/FacialStructure/PureStateExtreme.lean.html?from=20&start=29&end=76#L29) guarantees that $\varphi$ is extreme in the entire closed dual unit ball.

## Assumptions

The source fixes a nonzero complex C*-algebra and its compatible order. The component $C$ is arbitrary; it need not be presented initially by a functional or representation. A pure state is a positive norm-one bounded complex-linear functional $A\to\mathbb C$, extreme among positive norm-one functionals for real convexity. The geometric spectrum consists of component **sets**, so (1) places a functional kernel, rather than a functional, in $C$.

## Conclusion

The theorem produces one state together with its purity and the membership of that same state's kernel in the specified component. It does not identify $\ker\varphi$ with the intersection of all points of $C$; that intersection is determined in [the component-kernel identity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/AbsoluteState.lean.html?from=20&start=281&end=294#L281).

## Main citations

- [Exact component representative theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/AbsoluteState.lean.html?from=20&start=234&end=239#L234): `exists_pureState_kernel_mem_geometricSpectrum`.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Corollary 5.9](https://arxiv.org/abs/2504.05551v1): the component representative assertion, read with the type-correct pure-state **kernel**.

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem exists_pureState_kernel_mem_geometricSpectrum (C : NormedSpace.GeometricSpectrum ℂ A) :
    ∃ (phi : StrongDual ℂ A) (hpure : IsPureNonUnitalState A phi),
      extremeKernel ⟨phi, mem_extremePoints_dual_closedBall_of_isPureNonUnitalState phi hpure⟩ ∈ C.val
```

| In the source | Mathematical meaning |
|---|---|
| [Algebra and order](https://exactmathematics.org/mathlibannex/cards/bd23b958c2bb8d456d73377db09ea107d5de98389ab34d3c93a173d0ce58a06c/versions/gss-r1-fb2eb7faae06898e/index.html#card-20--source-row-0)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]`<br>`variable [PartialOrder A] [StarOrderedRing A]` | The nonzero complex C*-algebra $A$ and its compatible order support the pure-state and geometric-point constructions. |
| [Specified component](https://exactmathematics.org/mathlibannex/cards/bd23b958c2bb8d456d73377db09ea107d5de98389ab34d3c93a173d0ce58a06c/versions/gss-r1-fb2eb7faae06898e/index.html#card-20--source-row-1)<br>`theorem exists_pureState_kernel_mem_geometricSpectrum (C : NormedSpace.GeometricSpectrum ℂ A) :` | The input $C\in\mathrm{GS}(A)$ is a component subset of $S(A)$, not an individual functional or representation. |
| [Pure state](https://exactmathematics.org/mathlibannex/cards/bd23b958c2bb8d456d73377db09ea107d5de98389ab34d3c93a173d0ce58a06c/versions/gss-r1-fb2eb7faae06898e/index.html#card-20--source-row-2)<br>`    ∃ (phi : StrongDual ℂ A) (hpure : IsPureNonUnitalState A phi),` | There is a bounded complex-linear functional $\varphi:A\to\mathbb C$ which is a pure state: positive, of norm one, and extreme among states for real convexity. |
| [Kernel point in that component](https://exactmathematics.org/mathlibannex/cards/bd23b958c2bb8d456d73377db09ea107d5de98389ab34d3c93a173d0ce58a06c/versions/gss-r1-fb2eb7faae06898e/index.html#card-20--source-row-3)<br>`      extremeKernel ⟨phi, mem_extremePoints_dual_closedBall_of_isPureNonUnitalState phi hpure⟩ ∈ C.val := by` | The extremality result applied to this same $\varphi$ certifies $\ker\varphi$ as a point of $S(A)$. The full conclusion is $$\ker\varphi\in C.$$ The projection of $C$ is its component subset, so the membership places the kernel point in the originally specified component. |
| [Components as geometric-spectrum points](https://exactmathematics.org/mathlibannex/cards/bd23b958c2bb8d456d73377db09ea107d5de98389ab34d3c93a173d0ce58a06c/versions/gss-r1-fb2eb7faae06898e/index.html#card-20--source-row-4)<br>`def GeometricSpectrum : Type u :=`<br>`  {C : Set (GeometricStructureSpace 𝕜 E) // C ∈ geometricSpectrumFamily 𝕜 E}` | A geometric-spectrum point is a component subset of $S(A)$ with its component membership. Its underlying set is the $C$ used in (1). |

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Exact surrounding source:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```
