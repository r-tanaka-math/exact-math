Version 1 source-bound exposition export. Original text SHA-256: 7d44a46e3623ee44f4c8b56160ce0b49d6fbaea02e10b66b1b1ede5eb94af729. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The irreducible spectrum as pure-GNS representation classes

## Statement

Let $A$ be a complex C*-algebra with compatible order, not necessarily unital or nonzero. The irreducible spectrum here is the quotient of its pure states by unitary equivalence of their GNS representations of $A$.

## Definition

A pure state is a positive norm-one bounded complex-linear functional $\varphi:A\to\mathbb C$, extreme among such functionals for real convexity. Let $\pi_\varphi$ denote the GNS representation of its canonical extension to the forced unitization, restricted to the original algebra $A$. The [pure-state GNS irreducibility theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=irreducible-spectrum&start=41&end=43#L41) guarantees irreducibility of this action.

Write $\varphi\sim\psi$ when $\pi_\varphi$ and $\pi_\psi$ are unitarily equivalent: there is a surjective complex-linear isometry $W$ between their Hilbert spaces such that $W\pi_\varphi(a)=\pi_\psi(a)W$ for every $a\in A$. The definition is
$$
\widehat A=\{\varphi:\varphi\text{ is a pure state of }A\}/{\sim}.
$$
The quotient uses this unitary-equivalence relation. Equality of representation kernels is not substituted for unitary equivalence. The definition assigns no topology; the later ordinary spectrum topology is induced through the representation-kernel map, not specified here as a pure-state quotient topology.

## Assumptions

Only the complex C*-algebra and its compatible order are required. The set of pure states may be empty. No auxiliary Hilbert space or separability assumption is required.

## Conclusion

The result is the set of unitary equivalence classes of pure-state GNS representations. The definition permits an empty quotient when there are no pure-state representatives.

## Main citations

- [Exact complete definition](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=irreducible-spectrum&start=73&end=73#L73).
- [NonUnitalPureState: the exact pure-functional subtype](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=irreducible-spectrum&start=29&end=29#L29).
- [gnsRepresentation: restriction to the original algebra](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=irreducible-spectrum&start=38&end=39#L38).
- [isIrreducible_gnsRepresentation: the irreducibility guarantee](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=irreducible-spectrum&start=41&end=43#L41).
- [pureStateGNSSetoid: the entire relation and equivalence fields](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/Basic.lean.html?from=irreducible-spectrum&start=65&end=69#L65).

## Lean source signature (exact)

The following is the complete defining right-hand side, copied from the fixed source.

```lean
def IrreducibleSpectrum := Quotient (pureStateGNSSetoid A)
```

| In the source | Mathematical meaning |
|---|---|
| `NonUnitalPureState A` inside the setoid | The pure states of $A$ defined above: positive norm-one bounded complex-linear functionals that are extreme among such functionals. |
| `pureStateGNSSetoid A` | The relation $\varphi\sim\psi$ of unitary equivalence between $\pi_\varphi$ and $\pi_\psi$. |
| `Quotient (pureStateGNSSetoid A)` | The quotient for precisely that relation. No kernel equivalence or topology is included in this one-line RHS. |

### Source context (separate exact excerpt)

Source lines 23–26:

```lean
namespace MathlibAnnex.Analysis.CStarAlgebra

universe u
variable (A : Type u) [NonUnitalCStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
```
