Version 1 source-bound exposition export. Original text SHA-256: b7438a974654a3e6656f5cebd422b448daea612d6625f25511f4b9e88ac167b3. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The geometric structure family is the family of extreme-functional kernels

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, with no identity required. Write $A^*$ for the space of bounded complex-linear functionals on $A$ and $B_{A^*}$ for its closed unit ball. For a maximal proper face $F$ of the algebra unit ball $B_A=\{a\in A:\|a\|\le1\}$, let

$$
\Sigma(F)=\{\rho\in A^*:\|\rho\|\le1,\ \rho(a)=1\text{ for all }a\in F\},\qquad
I_F=\bigcup_{\rho\in\Sigma(F)}\ker\rho.
$$

For these nonempty unit-ball faces, the [support-functional norm theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=16&start=81&end=91#L81) identifies $\Sigma(F)$ with the norm-one linear functionals supporting $F$. The original geometric structure family is $\mathcal S_A=\{I_F:F\text{ is a maximal proper face}\}$, a family of subsets of $A$. Then

$$
\mathcal S_A
=\{\ker\rho:\rho\in\operatorname{ext}_{\mathbb R}(B_{A^*})\}.
\tag{1}
$$

Thus the points of the geometric structure space $S(A)$, originally defined from maximal faces and all their supporting kernels, are exactly these extreme-functional kernels.

## Assumptions

Faces use the underlying real convex structure, while every functional and every kernel in (1) is complex-linear on the full algebra $A$. The source uses the compatible C*-order. Nontriviality excludes the zero algebra, where the original face family is empty but the dual ball has the extreme point zero. No change to the original definition of $S(A)$ is part of the assertion.

## Conclusion

Formula (1) is equality of families of subsets, with both inclusions. Repeated kernels represent one point. No injectivity of the kernel parametrization, and no equality between a functional kernel and a representation kernel, is asserted.

## Main citations

- [Exact family equality](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=16&start=49&end=65#L49): `geometricStructureFamily_eq_image_ker_extremePoints_dual_closedBall`.
- [Maximal faces and their full support singleton](https://exactmathematics.org/mathlibannex/cards/2c9647786d7a86fe4fe7ffc8d30f26e964e04f65858a6915220629f7918072ba/versions/gss-r1-3cc5b5cbc0d7b744/index.html): the separate facial and support statements.
- [The original family definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=16&start=37&end=39#L37) and [supporting-kernel union](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=16&start=108&end=111#L108): the objects on the left side of (1).
- [ExtremeKernel.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=16&start=37&end=45#L37), `supportKernelUnion_unitBallSupportFace_eq_ker`: the separate union-of-supporting-kernels identity.

## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem geometricStructureFamily_eq_image_ker_extremePoints_dual_closedBall :
    NormedSpace.geometricStructureFamily ℂ A =
      (fun rho : StrongDual ℂ A => (rho.ker : Set A)) ''
        (closedBall (0 : StrongDual ℂ A) 1).extremePoints ℝ
```

| In the source | Mathematical meaning |
|---|---|
| [Algebra and order](https://exactmathematics.org/mathlibannex/cards/34a7bd4f9a44a5027e879e535d823650db9e1c88c189d9512f4abf807927b2b2/versions/gss-r1-0347c222eddf4f04/index.html#card-16--source-row-0)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]`<br>`variable [PartialOrder A] [StarOrderedRing A]` | The nonzero complex C*-algebra $A$ and its compatible order. No identity is required. |
| [Original geometric family](https://exactmathematics.org/mathlibannex/cards/34a7bd4f9a44a5027e879e535d823650db9e1c88c189d9512f4abf807927b2b2/versions/gss-r1-0347c222eddf4f04/index.html#card-16--source-row-1)<br>`theorem geometricStructureFamily_eq_image_ker_extremePoints_dual_closedBall :`<br>`    NormedSpace.geometricStructureFamily ℂ A =` | The left side is the previously defined family $\mathcal S_A$ of subsets of $A$, obtained from maximal proper faces and all their supporting kernels. |
| [Kernel map and its image](https://exactmathematics.org/mathlibannex/cards/34a7bd4f9a44a5027e879e535d823650db9e1c88c189d9512f4abf807927b2b2/versions/gss-r1-0347c222eddf4f04/index.html#card-16--source-row-2)<br>`      (fun rho : StrongDual ℂ A => (rho.ker : Set A)) ''`<br>`        (closedBall (0 : StrongDual ℂ A) 1).extremePoints ℝ := by` | The function sends a bounded complex-linear functional $\rho\in A^*$ to its kernel as a subset of $A$. Its image is taken over the real extreme points of the closed dual unit ball: $$\{\ker\rho:\rho\in\operatorname{ext}_{\mathbb R}(B_{A^*})\}.$$ The equality in (1) identifies this entire family with $\mathcal S_A$; it does not assert injectivity of the kernel map. |

### Source context (separate exact excerpt)

Exact surrounding source:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Exact surrounding source:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```
