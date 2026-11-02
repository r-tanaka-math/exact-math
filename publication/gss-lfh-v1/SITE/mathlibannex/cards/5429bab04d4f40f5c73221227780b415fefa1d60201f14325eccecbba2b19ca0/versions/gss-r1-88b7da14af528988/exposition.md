Version 1 source-bound exposition export. Original text SHA-256: d15486aeb4279521b5dcdfb471bad57e7be44f92e9ba4eb8673a5326b8d38bd3. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The geometric structure of a representation image as a component closure

## Statement

Let $A\ne\{0\}$ be a complex C*-algebra, possibly without an identity, and let $\pi:A\to\mathcal B(H)$ be a nonzero $\ast$-representation on a complete complex Hilbert space. Let $I_0\in S(A)$ be a geometric-structure point whose component satisfies

$$
\bigcap_{I\in C(I_0)}I=\ker\pi.
\tag{1}
$$

With the inherited C*-algebra structure on $\pi(A)$, there is a specified closure-space homeomorphism

$$
E_{\pi,I_0}:S(\pi(A))\longrightarrow c_A(C(I_0)).
\tag{2}
$$

The target carries the subspace closure from $S(A)$. The exact declaration requires nonzero action and the explicit equality (1); it does not require irreducibility of $\pi$ in addition to them.

## Definition

For any algebra $D$ here, $S(D)$ denotes kernels of extreme points of the closed unit ball in the Banach dual $D\to\mathbb C$, using real convexity. The geometric identification is supplied by [the extreme-functional kernel characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ExtremeKernel.lean.html?from=25&start=49&end=65#L49). Its closure is $c_D(\mathcal U)=\{I\in S(D):\bigcap_{J\in\mathcal U}J\subseteq I\}$, including the empty family.

Regard $\pi$ as a map from $A$ onto its image $\pi(A)$. The defining map and its inverse are
$$
E_{\pi,I_0}(J)=\pi^{-1}(J),\qquad E_{\pi,I_0}^{-1}(I)=\pi(I).
$$
Here $J\in S(\pi(A))$ and $I\in c_A(C(I_0))$. The target is the ambient closure of the whole specified component, equipped with subspace closure. It is not the component alone.

The [surjective preimage construction](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SurjectivePreimage.lean.html?from=25&start=166&end=177#L166) supplies the homeomorphism onto the geometric points containing $\ker\pi$. The [component-closure identification](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ImageSubspace.lean.html?from=25&start=48&end=58#L48) uses (1) to identify that target with $c_A(C(I_0))$, without changing the point map. The image's nontriviality and compatible order are supplied by the image construction, not additional hypotheses.

## Assumptions

The displayed scope requires a nonzero complex C*-algebra $A$ with its compatible order and a complete complex Hilbert space $H$. The representation $\pi$ is nonzero, and the component of the specified point $I_0$ satisfies (1). Neither faithfulness nor irreducibility is an additional hypothesis. The cited image construction equips $\pi(A)$ with its C*-algebra structure and compatible order.

## Conclusion

The output bundles the displayed preimage map and its image-map inverse, with full closure continuity in both directions. The target is exactly $c_A(C(I_0))$ with the inherited closure; it is not a claim that $C(I_0)$ is closed.

## Main citations

- [Exact full definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ImageSubspace.lean.html?from=25&start=62&end=96#L62): `NonUnitalCStarRepresentation.imageGeometricStructureHomeomorph`.
- [SurjectivePreimage.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SurjectivePreimage.lean.html), `geometricStructurePreimageHomeomorph`: the first stage of the construction.
- [ImageSubspace.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/ImageSubspace.lean.html), `closure_component_eq_hull_ker` and the value and closure lemmas following the definition: the target identification and the concrete action.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Theorem 5.17](https://arxiv.org/abs/2504.05551v1). This card uses the quotient of the original algebra and its representation image.

- [Surjective preimage construction: the exact map and inverse](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SurjectivePreimage.lean.html?from=25&start=166&end=177#L166).
- [Actual C*-image structure](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Quotient/Image.lean.html#L1).

## Lean source signature (exact)

The full definition below is copied from the pinned source.

```lean
def imageGeometricStructureHomeomorph (hpi : pi.IsNonzero)
    (I : NormedSpace.GeometricStructureSpace ℂ A)
    (hI : NormedSpace.geometricSpectrumKernel ℂ A (NormedSpace.toGeometricSpectrum ℂ A I) =
      ((imageSubspaceContinuousMap pi).ker : Set A)) :
    ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ (NonUnitalStarAlgHom.range pi))
      ((NormedSpace.geometricStructureClosure ℂ A).subspace
        ((NormedSpace.geometricStructureClosure ℂ A).closure
          ((NormedSpace.geometricStructureClosure ℂ A).component I))) := by
  letI : Nontrivial (NonUnitalStarAlgHom.range pi) := nontrivial_image_of_isNonzero pi hpi
  letI : PartialOrder (NonUnitalStarAlgHom.range pi) := _root_.CStarAlgebra.spectralOrder (NonUnitalStarAlgHom.range pi)
  letI : StarOrderedRing (NonUnitalStarAlgHom.range pi) := _root_.CStarAlgebra.spectralOrderedRing (NonUnitalStarAlgHom.range pi)
  let q := (NonUnitalStarAlgHom.rangeRestrict pi)
  have hq : Function.Surjective q := rangeRestrict_surjective pi
  have hker : ((imageSubspaceContinuousMap q).ker : Set A) =
      ((imageSubspaceContinuousMap pi).ker : Set A) := by
    ext a
    change q a = 0 ↔ pi a = 0
    constructor
    · intro h
      exact congrArg Subtype.val h
    · intro h
      apply Subtype.ext
      change pi a = 0
      exact h
  have htarget : ClosureSpace.HullKernel.hull (NormedSpace.geometricStructureFamily ℂ A)
      ((imageSubspaceContinuousMap q).ker : Set A) =
        (NormedSpace.geometricStructureClosure ℂ A).closure
          ((NormedSpace.geometricStructureClosure ℂ A).component I) := by
    rw [hker, closure_component_eq_hull_ker pi I hI]
  exact (geometricStructurePreimageHomeomorph q hq).trans
    ((ClosureSpace.Homeomorph.refl (NormedSpace.geometricStructureClosure ℂ A)).subspace
      _ _ (fun J => Set.ext_iff.mp htarget J))
```

| In the source | Mathematical meaning |
|---|---|
| Surrounding `A`, `H` and their instances | The nonzero complex C*-algebra $A$ with compatible order, and the complete complex Hilbert space $H$. A unit is not required. |
| `pi`, `hpi`, `I`, `hI` | The nonzero representation $\pi$, the point $I_0\in S(A)$, and the equality $\bigcap_{I\in C(I_0)}I=\ker\pi$. The representation need not be faithful or irreducible. |
| `NonUnitalStarAlgHom.range pi` and the local instances | The image $\pi(A)$, with its inherited C*-algebra structure, nontriviality, and compatible spectral order. |
| `q := NonUnitalStarAlgHom.rangeRestrict pi` | The same action $a\mapsto\pi(a)$, now with codomain $\pi(A)$. |
| `hq : Function.Surjective q` | Every element of $\pi(A)$ equals $\pi(a)$ for some $a\in A$. |
| `hker` | The equality $\ker q=\ker\pi$ as subsets of $A$. Restricting the codomain does not change this kernel. |
| `geometricStructurePreimageHomeomorph q hq` | The homeomorphism $J\mapsto\pi^{-1}(J)$ from $S(\pi(A))$ onto $\{I\in S(A):\ker\pi\subseteq I\}$, with inverse $I\mapsto\pi(I)$. |
| `htarget` | The set $\{I\in S(A):\ker\pi\subseteq I\}$ equals $c_A(C(I_0))$, by the component-intersection hypothesis. |
| `Homeomorph.refl ... .subspace` | The identity on these geometric points, regarded in the target $c_A(C(I_0))$ with its inherited closure. |
| Final `.trans` | First take $J\mapsto\pi^{-1}(J)$, then identify its codomain with $c_A(C(I_0))$. The point map and its inverse remain those displayed above. |

### Source context (separate exact excerpt)

Source lines 32–32:

```lean
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
```

Source lines 33–33:

```lean
variable [PartialOrder A] [StarOrderedRing A]
```

Source lines 34–34:

```lean
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```

Source lines 35–35:

```lean
variable (pi : NonUnitalCStarRepresentation A H)
```

Source line 45 supplies the image C*-algebra instance used by the declaration; it is not an additional hypothesis:

```lean
attribute [local instance] HomKernelQuotient.imageCStarAlgebra
```

The continuous-map wrapper in the same source, lines 37–43, is copied separately; it retains the given action with the norm bound supplied by `NonUnitalStarAlgHom.norm_apply_le`:

```lean
private def imageSubspaceContinuousMap {B : Type*} [NonUnitalCStarAlgebra B]
    (q : A →⋆ₙₐ[ℂ] B) : A →L[ℂ] B :=
  LinearMap.mkContinuous
    { toFun := q, map_add' := map_add q, map_smul' := map_smul q }
    1 (fun a => by
      change ‖q a‖ ≤ 1 * ‖a‖
      simpa only [one_mul] using NonUnitalStarAlgHom.norm_apply_le q a)
```
