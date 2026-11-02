Version 1 source-bound exposition export. Original text SHA-256: 46a5a97cc6a50f3148398b92b66c435c513e9ef2c258c90dd162f7d8caf83e3c. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Faithful normal-part transport through a specified GSS homeomorphism

## Statement

Let $H$ be a complex Hilbert space, and let $A\subseteq\mathcal B(H)$ be a nonzero norm-closed complex $\ast$-subalgebra acting irreducibly on $H$. Let $B$ be a complex C*-algebra with its compatible order. Write $S(D)$ for the geometric structure space of an algebra $D$, with hull–kernel closure $c_D$. For each maximal proper face of the closed unit ball of $D$, take the union of the kernels of all bounded complex-linear functionals of norm one that equal $1$ on that face. The distinct subsets so obtained are the points of $S(D)$, by the [geometric structure definition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=53&start=37&end=39#L37) and the [norm-one support characterization](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Support.lean.html?from=53&start=82&end=91#L82).

For a concrete algebra $D\subseteq\mathcal B(L)$, define

$$
f^D_{x,y}:D\to\mathbb C,\qquad f^D_{x,y}(a)=\langle y,a(x)\rangle,
\qquad x,y\in L\setminus\{0\},
$$

and

$$
N(D)=\{I\in S(D):I=\ker f^D_{x,y}\text{ for some }x,y\in L\setminus\{0\}\}.
$$

The inner product is linear in the second variable. Suppose that $e:S(A)\to S(B)$ is a homeomorphism of closure spaces, so that

$$
e(c_A(E))=c_B(e(E))\qquad(E\subseteq S(A)).
$$

Then there are a pure state $\varphi$ of $B$ and a homeomorphism

$$
r:S(\pi_\varphi(B))\longrightarrow S(B),
$$

where $\pi_\varphi:B\to\mathcal B(H_\varphi)$ is the GNS representation of this same state, with the following properties:

- $\pi_\varphi$ is faithful.
- For its range restriction $\pi_{\varphi,r}:B\to\pi_\varphi(B)$,

$$
r(J)=\pi_{\varphi,r}^{-1}(J)\qquad(J\in S(\pi_\varphi(B))).
\tag{1}
$$

- The inverse of that same homeomorphism satisfies

$$
\pi_{\varphi,r}^{-1}(r^{-1}(I))=I\qquad(I\in S(B)).
\tag{2}
$$

- The normal parts satisfy

$$
(r^{-1}\circ e)(N(A))=N(\pi_\varphi(B)).
\tag{3}
$$

## Assumptions

The Hilbert spaces are complete. A pure state is a positive bounded complex-linear functional of norm one that is extreme in the state space for real convexity. Closedness and irreducibility concern the given action of $A$ on $H$. The homeomorphism $e$ is specified, with continuity for all subsets in both directions. Nonzero $H$ and $B$ follow from these hypotheses; no extra nontriviality assumption on $B$ is imposed.

## Conclusion

One faithful pure-GNS representation and one inverse-image homeomorphism satisfy all three formulas. In (3), the same map $e$ is followed by $r^{-1}$. The conclusion identifies the normal parts under this composite; it does not identify a normal part with its entire geometric structure space.

## Main citations

[Faithful normal-part transport](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=53&start=200&end=236#L200) gives all the outputs for the same pure state and the same homeomorphism. [The component-density criterion](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=53&start=78&end=85#L78) characterizes faithfulness of the pure-GNS representation. The [forward preimage formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=53&start=107&end=112#L107) and [inverse preimage formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=53&start=115&end=123#L115) concern the same range restriction; [the normal-part image identity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=53&start=126&end=132#L126) specifies which subset is transported.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/FaithfulNormalPart.lean.html?from=53&start=200&end=236#L200). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem exists_faithful_normalPart_transport
    (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) [IsClosed (S : Set (H →L[ℂ] H))]
    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))
    (e : ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ S)
      (NormedSpace.geometricStructureClosure ℂ B)) :
    ∃ phi : NonUnitalPureState B, Function.Injective phi.gnsRepresentation ∧
      ∃ r : ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ (NonUnitalStarAlgHom.range phi.gnsRepresentation))
          (NormedSpace.geometricStructureClosure ℂ B),
        (∀ J, (r.toEquiv J).val = (NonUnitalStarAlgHom.rangeRestrict phi.gnsRepresentation) ⁻¹' J.val) ∧
        (∀ I, (NonUnitalStarAlgHom.rangeRestrict phi.gnsRepresentation) ⁻¹' (r.toEquiv.symm I).val = I.val) ∧
        (e.trans r.symm).toEquiv '' normalPart S = normalPart (NonUnitalStarAlgHom.range phi.gnsRepresentation)
```

In the source, `S` denotes the algebra $A$ used here.

| In the source | Mathematical meaning |
|---|---|
| [Original Hilbert space](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-0)<br>`variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]` | The original representation space $H$ is a complete complex Hilbert space. It is independent of the GNS space of the state found in the conclusion. |
| [Target algebra](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-1)<br>`variable {B : Type w} [NonUnitalCStarAlgebra B]`<br>`variable [PartialOrder B] [StarOrderedRing B]` | The complex C*-algebra $B$ has its compatible order. No separate nontriviality assumption on $B$ appears here. |
| [Concrete irreducible action](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-2)<br>`    (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) [IsClosed (S : Set (H →L[ℂ] H))]`<br>`    (hS : NonUnitalCStarRepresentation.IsIrreducible (NonUnitalStarSubalgebraClass.subtype S))` | The source name $S$ is the closed complex $\ast$-subalgebra $A\subseteq\mathcal B(H)$. Its inclusion action is nonzero and irreducible. |
| [Given homeomorphism](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-3)<br>`    (e : ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ S)`<br>`      (NormedSpace.geometricStructureClosure ℂ B)) :` | The input is the specified closure-space homeomorphism $e:S(A)\to S(B)$. Its domain and codomain use the ambient geometric closures, not closures restricted to normal parts. |
| [One faithful pure-state representation](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-4)<br>`    ∃ phi : NonUnitalPureState B, Function.Injective phi.gnsRepresentation ∧` | There exists one pure state $\varphi$ of $B$ whose GNS representation $\pi_\varphi$ is injective, hence faithful. This same state and representation occur in every subsequent condition. |
| [Homeomorphism from the representation image](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-5)<br>`      ∃ r : ClosureSpace.Homeomorph (NormedSpace.geometricStructureClosure ℂ (NonUnitalStarAlgHom.range phi.gnsRepresentation))`<br>`          (NormedSpace.geometricStructureClosure ℂ B),` | There exists one homeomorphism $r:S(\pi_\varphi(B))\to S(B)$. The range is the actual image algebra of this same representation, not all bounded operators on its GNS space. |
| [Forward preimage formula](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-6)<br>`        (∀ J, (r.toEquiv J).val = (NonUnitalStarAlgHom.rangeRestrict phi.gnsRepresentation) ⁻¹' J.val) ∧` | The underlying bijection of $r$ sends every geometric point $J$ of the image algebra to $$r(J)=\pi_{\varphi,r}^{-1}(J).$$ Here $\pi_{\varphi,r}:B\to\pi_\varphi(B)$ is the range restriction. The projections expose the underlying subsets. |
| [Inverse preimage formula](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-7)<br>`        (∀ I, (NonUnitalStarAlgHom.rangeRestrict phi.gnsRepresentation) ⁻¹' (r.toEquiv.symm I).val = I.val) ∧` | The inverse of that same bijection satisfies $$\pi_{\varphi,r}^{-1}(r^{-1}(I))=I\qquad(I\in S(B)).$$ The inverse is not chosen independently. |
| [Transport of normal parts](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-8)<br>`        (e.trans r.symm).toEquiv '' normalPart S = normalPart (NonUnitalStarAlgHom.range phi.gnsRepresentation) := by` | Transitivity composes $e$ first and $r^{-1}$ second. Taking its underlying bijection and its set image gives $$(r^{-1}\circ e)(N(A))=N(\pi_\varphi(B)).$$ This identifies the normal parts, not the whole geometric structure spaces. |
| [Same bijection in both continuity fields](https://exactmathematics.org/mathlibannex/cards/166b5d638f6c27a451035ece7780b33266836361fcf44befbf47db1e236d2049/versions/gss-r1-d97e88f2c1de3824/index.html#card-53--source-row-9)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | For a homeomorphism $q:(X,c_X)\to(Y,c_Y)$, the underlying equivalence supplies $q$ and its inverse. The fields assert $$q(c_X(E))\subseteq c_Y(q(E)),\qquad E\subseteq X,$$ $$q^{-1}(c_Y(F))\subseteq c_X(q^{-1}(F)),\qquad F\subseteq Y.$$ This applies to both $e$ and $r$ with their displayed domains. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
universe u v w
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
variable [PartialOrder A] [StarOrderedRing A]
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]

attribute [local instance] HomKernelQuotient.imageCStarAlgebra HomKernelQuotient.isClosed_image
```

Exact surrounding source:

```lean
variable {B : Type w} [NonUnitalCStarAlgebra B]
variable [PartialOrder B] [StarOrderedRing B]
```

</details>

