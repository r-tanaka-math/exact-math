Version 1 source-bound exposition export. Original text SHA-256: 929d7eb4d80cc18286a6c57cc3493480eed463b0fd0eb5758cf5b75e6d7e7570. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Primitive representation kernels are exactly geometric component intersections

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, possibly without an identity. A pure state is a positive norm-one bounded complex-linear functional on $A$ that is extreme in the state space for real convexity. For a pure state $\varphi$, let $\pi_\varphi$ be the representation of $A$ obtained by restricting the GNS representation of its canonical state extension to the forced unitization. The independently defined primitive-kernel family is

$$
\mathrm{Prim}(A)=\{\ker\pi_\varphi:\varphi\text{ is a pure state of }A\}.
$$

Let $S(A)$ be the geometric structure space, whose points are kernels $\ker\rho\subseteq A$ of bounded complex-linear functionals $\rho:A\to\mathbb C$ that are extreme points, for real convexity, of the entire closed dual unit ball $B_{A^*}$ by [the extreme-kernel theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=22&start=49&end=65#L49), with the hull–kernel closure $c_A(\mathcal T)=\{I\in S(A):\bigcap_{J\in\mathcal T}J\subseteq I\}$. Let $\mathrm{GS}(A)$ be its finite-chain components (chains of equal points or nonclosed pairs), and put $J_C=\bigcap_{I\in C}I$. The primitive geometric family is $\mathrm{PS}(A)=\{J_C:C\in\mathrm{GS}(A)\}$. Then

$$
\mathrm{Prim}(A)=\mathrm{PS}(A).
\tag{1}
$$

Here both $\mathrm{Prim}(A)$ and $\mathrm{PS}(A)$ are treated as families of subsets of $A$.

## Assumptions

The source uses a nonzero complex C*-algebra with its compatible order. The family $\mathrm{Prim}(A)$ is constructed from the pure-state GNS representations independently of geometric components. The compared objects are families of subsets of this same algebra; no additional representation or component is an input.

## Conclusion

The equality identifies precisely which subsets occur. It does not identify an individual component with its intersection. No injectivity of the representation-kernel map or of $C\mapsto J_C$ is asserted. The [primitive-spectrum homeomorphism](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectralHomeomorph.lean.html?from=22&start=128&end=133#L128) is a separate construction using this family equality.

## Main citations

- [Exact family equality](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectralComparison.lean.html?from=22&start=142&end=159#L142): `primitiveKernelFamily_eq_primitiveGeometricSpectrumFamily`.
- [Pure-state component representative](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/AbsoluteState.lean.html?from=22&start=234&end=239#L234) and [pure-state component intersection](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/AbsoluteState.lean.html?from=22&start=281&end=294#L281): the related representative and same-state intersection statements.
- [Independent primitive family](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Primitive.lean.html?from=22&start=29&end=30#L29) and [geometric component-intersection family](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=22&start=48&end=50#L48): the definitions compared here.

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem primitiveKernelFamily_eq_primitiveGeometricSpectrumFamily :
    primitiveKernelFamily A = NormedSpace.primitiveGeometricSpectrumFamily ℂ A
```

| In the source | Mathematical meaning |
| --- | --- |
| `(A : Type u)` and its nonunital C*-algebra, order and nontriviality instances | The same nonzero complex C*-algebra underlies both independently defined families. No extra representation is an input to this declaration. |
| `primitiveKernelFamily A` | Kernels $\ker\pi_\varphi$ for pure states $\varphi$, forming the family $\mathrm{Prim}(A)$ of subsets of $A$. |
| `NormedSpace.primitiveGeometricSpectrumFamily ℂ A` | The family $\mathrm{PS}(A)$ of intersections of all GSS points in a component. It is not the family of the component subsets themselves. |
| The complete equality | Every member of either family is a member of the other, as the same subset of $A$. This compares representation kernels with whole-component intersections, not components with individual functional kernels. |

### Source context (separate exact excerpt)

Source lines 27–27:

```lean
variable (A : Type u) [NonUnitalCStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
```

Source lines 28–28:

```lean
variable [Nontrivial A]
```
