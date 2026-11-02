Version 1 source-bound exposition export. Original text SHA-256: ab97afd84ced4d0c354a06fe0e9f8cca134c88b825687f17769f16c07de45834. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A geometric-structure homeomorphism transports the irreducible spectrum

## Statement

Let $A,B\ne\{0\}$ be complex C*-algebras, possibly without identities. Suppose

$$
e:(S(A),c_A)\longrightarrow(S(B),c_B)
$$

is a homeomorphism of their geometric structure **closure spaces**. Both $e$ and its inverse are continuous for the specified closure operators, with continuity tested on every subset.

The map $e$ determines an ordinary homeomorphism

$$
H_e:\widehat A\longrightarrow\widehat B
$$

between the independent irreducible spectra with their kernel-induced ordinary topologies.

## Definition

For $D=A,B$, $S(D)$ denotes kernels of extreme points of the closed unit ball of the Banach dual, with real convexity, and $c_D(\mathcal U)=\{I:\bigcap_{J\in\mathcal U}J\subseteq I\}$. [The extreme-functional kernel characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=26&start=49&end=65#L49) gives its geometric identification. Let $\mathrm{GS}(D)$ be the component space and $\Phi_D:\widehat D\to\mathrm{GS}(D)$ the [specified spectral homeomorphism](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectralHomeomorph.lean.html?from=26&start=136&end=142#L136).

The [induced component homeomorphism](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/SpectrumMap.lean.html?from=26&start=44&end=47#L44) is $G(e):\mathrm{GS}(A)\to\mathrm{GS}(B)$, with $C\mapsto e(C)$ and inverse $D\mapsto e^{-1}(D)$. Full closure continuity gives ordinary continuity for the specified topologies.

The defining map and its inverse, with composition read from right to left, are
$$
H_e=\Phi_B^{-1}\circ G(e)\circ\Phi_A,
\qquad H_e^{-1}=\Phi_A^{-1}\circ G(e)^{-1}\circ\Phi_B.
$$
Thus the three stages go from $\widehat A$ to $\mathrm{GS}(A)$, then $\mathrm{GS}(B)$, then $\widehat B$; the last stage uses the inverse of $\Phi_B$.

## Assumptions

The source requires nonzero complex C*-algebras $A,B$, each with its compatible order, and the specified full closure-space homeomorphism $e$. The underlying Hilbert spaces of irreducible representations are not fixed as additional inputs; the independent spectra use their pure-state GNS presentation. The map $e$ has domain $S(A)$, whose points are subsets of $A$; it is not a map $A\to B$ and no linear or multiplicative property on algebra elements is assumed.

## Conclusion

The output is this specific ordinary homeomorphism between the independent irreducible spectra. It uses the given full closure-space homeomorphism and the two fixed spectral comparisons. The input $e$ acts on geometric points, which are subsets of algebras, not on algebra elements or representation operators.

## Main citations

- [Exact full definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectralPreserver.lean.html?from=26&start=33&end=37#L33): `irreducibleSpectrumHomeomorphOfGeometricStructure`.
- [The ordinary spectral comparison](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectralHomeomorph.lean.html?from=26&start=136&end=142#L136): the two endpoint homeomorphisms and their exact topologies.
- [Normed/GeometricStructure/SpectrumMap.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/SpectrumMap.lean.html), `geometricSpectrumHomeomorph`, `geometricSpectrumHomeomorph_val`, `geometricSpectrumHomeomorph_toGeometricSpectrum`, and `image_geometricSpectrumClosure`: the induced component map and full closure transport.
- [The concrete geometric-spectrum closure](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html): the component-intersection closure used by this construction.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Corollary 5.13](https://arxiv.org/abs/2504.05551v1): the spectral consequence of a geometric-structure homeomorphism.

- [Component-map construction and full closure continuity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/SpectrumMap.lean.html?from=26&start=44&end=47#L44).

## Lean source signature (exact)

The full definition below is copied from the pinned source.

```lean
def irreducibleSpectrumHomeomorphOfGeometricStructure : IrreducibleSpectrum A ≃ₜ IrreducibleSpectrum B :=
  (irreducibleSpectrumHomeomorph A).trans
    (((NormedSpace.geometricSpectrumHomeomorph e).toTopologicalHomeomorph
      (isTopologizable_geometricSpectrumClosure A) (isTopologizable_geometricSpectrumClosure B)).trans
        (irreducibleSpectrumHomeomorph B).symm)
```

| In the source | Mathematical meaning |
|---|---|
| The two ambient algebras and independent universes | The independently specified nonzero complex C*-algebras $A,B$ with compatible orders; no units are required. |
| `e` in the surrounding scope | The supplied full closure-space homeomorphism of geometric points, not a map on algebra elements. |
| `(irreducibleSpectrumHomeomorph A).trans` | The first stage is $\Phi_A:\widehat A\to\mathrm{GS}(A)$. |
| `NormedSpace.geometricSpectrumHomeomorph e` | The middle stage is the component map $C\mapsto e(C)$ with its inverse. |
| `.toTopologicalHomeomorph` | The existing topologizability results give ordinary continuity of that same component map. |
| `(irreducibleSpectrumHomeomorph B).symm` | The final stage is $\Phi_B^{-1}:\mathrm{GS}(B)\to\widehat B$, giving the displayed composite $H_e$. |

### Source context (separate exact excerpt)

Source lines 27–27:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [PartialOrder A] [StarOrderedRing A] [Nontrivial A]
```

Source lines 28–28:

```lean
variable {B : Type v} [NonUnitalCStarAlgebra B] [PartialOrder B] [StarOrderedRing B] [Nontrivial B]
```

Source lines 29–30:

```lean
variable (e : ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ A)
  (NormedSpace.geometricStructureClosure ℂ B))
```
