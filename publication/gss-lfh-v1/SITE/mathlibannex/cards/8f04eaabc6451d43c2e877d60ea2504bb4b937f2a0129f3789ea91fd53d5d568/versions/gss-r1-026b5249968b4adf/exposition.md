Version 1 source-bound exposition export. Original text SHA-256: 9b706a9e7388cff76770f33ec641c6dd64a23a96e8b715a082463b90e86956fd. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The primitive spectrum as representation kernels

## Statement

Let $A$ be a complex C*-algebra with compatible order, not necessarily unital or nonzero. The primitive spectrum here is the set of subsets of $A$ occurring as kernels of pure-state GNS representations.

## Definition

A pure state is a bounded complex-linear functional $\varphi:A\to\mathbb C$ that is positive, has norm one, and is extreme among positive norm-one functionals, for real convexity. Its canonical state extension to the forced unitization has a GNS representation; $\pi_\varphi$ denotes the restriction of that representation to $A$.
$$
\operatorname{Prim}(A)=\{\ker\pi_\varphi:\varphi\text{ is a pure state of }A\}.
$$
A point is the representation kernel itself, not a preferred pure state. The [ideal identification](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Primitive.lean.html?from=primitive-spectrum&start=52&end=55#L52) regards it as a two-sided ideal of $A$. This definition assigns no topology; the spectrum topology is defined separately.

## Assumptions

The source requires a nonunital complex C*-algebra, a partial order and compatible order. No nontriviality, separability, faithfulness, finite dimension or chosen representation is an additional input.

## Conclusion

Points are representation kernels, regarded as subsets of $A$. Pure states with the same GNS kernel determine the same point. This is not the quotient by unitary equivalence, nor is it the family of functional kernels.

## Main citations

- [Exact complete definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Primitive.lean.html?from=primitive-spectrum&start=33&end=33#L33).
- [primitiveKernelFamily: the full range expression](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Primitive.lean.html?from=primitive-spectrum&start=29&end=30#L29).
- [NonUnitalPureState: the pure-state subtype](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=primitive-spectrum&start=29&end=29#L29).
- [gnsRepresentation: the action of the original algebra](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=primitive-spectrum&start=38&end=39#L38).
- [coe_toTwoSidedIdeal: the ideal-carrier guarantee](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Primitive.lean.html?from=primitive-spectrum&start=52&end=55#L52).

## Lean source signature (exact)

The following is the complete defining right-hand side, copied from the fixed source.

```lean
def PrimitiveSpectrum := {P : Set A // P ∈ primitiveKernelFamily A}
```

| In the source | Mathematical meaning |
|---|---|
| `A` and the surrounding three instances | The complex C*-algebra with the order used for positivity. |
| `{P : Set A // ...}` | A subset of the original algebra together with membership in the indicated family. |
| `P ∈ primitiveKernelFamily A` | $P=\ker\pi_\varphi$ for some pure state $\varphi$ of $A$. |
| The complete one-line RHS | No quotient of representations and no topological data are fields of this definition. |

### Source context (separate exact excerpt)

Source lines 22–26:

```lean
namespace MathlibAnnex.Analysis.CStarAlgebra

universe u v
variable (A : Type u) [NonUnitalCStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
open NonUnitalCStarRepresentation
```
