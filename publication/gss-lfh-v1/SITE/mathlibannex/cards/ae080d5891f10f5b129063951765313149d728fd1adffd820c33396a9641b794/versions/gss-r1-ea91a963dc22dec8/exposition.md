Version 1 source-bound exposition export. Original text SHA-256: bf4a800f995b03a64c00930eeb5b59209410f43369d0cde8312c5c6c2b36a212. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The same reduced atomic representation and its exact diagonal range

## Statement

Let $A$ be a complex C*-algebra, let $H$ be a complex Hilbert space, and let $\pi:A\to\mathcal B(H)$ be a faithful $\ast$-representation with $\pi(A)\subseteq\mathcal K(H)$. Here $\mathcal K(L)$ denotes the algebra of compact operators on a complex Hilbert space $L$. Write $\operatorname{Prim}(A)$ for the primitive ideal spectrum, whose points are the kernels of pure-state GNS representations. For each $P\in\operatorname{Prim}(A)$, fix the pure state $\varphi_P$ selected by [the primitive-point representative](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/PrimitiveRepresentative.lean.html?from=56&start=33&end=36#L33). Its GNS representation satisfies $\ker\pi_{\varphi_P}=P$ by [the kernel-identification theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/PrimitiveRepresentative.lean.html?from=56&start=42&end=45#L42). Write $H_P$ for its GNS Hilbert space and $\rho_P=\pi_{\varphi_P}$. On $\mathcal H=\bigoplus_P^2H_P$, the reduced atomic representation $R:A\to\mathcal B(\mathcal H)$ is specified by [the coordinate-action theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/ReducedAtomic.lean.html?from=56&start=65&end=73#L65):
$$
(R(a)\xi)_P=\rho_P(a)\xi_P\qquad(a\in A,\ \xi\in\mathcal H).
$$

For a bounded family of compact operators $T=(T_P)$ with $T_P\in\mathcal K(H_P)$, let $\Delta_b(T)$ act diagonally on $\mathcal H$:

$$
(\Delta_b(T)\xi)_P=T_P\xi_P,\qquad \sup_P\lVert T_P\rVert<\infty.
$$

Write $\Delta_0$ for the restriction to the $c_0$-sum: for every $\varepsilon>0$, the set $\{P:\lVert T_P\rVert\geq\varepsilon\}$ is finite. These [bounded diagonal](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/CompactOperatorDiagonal.lean.html?from=56&start=117&end=125#L117) and [c0-diagonal](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/CompactOperatorDiagonal.lean.html?from=56&start=328&end=335#L328) action formulas refer to the same Hilbert sum. Then, simultaneously:

- $R$ is injective and compact-valued;
- $\operatorname{ran}R=\operatorname{ran}\Delta_0$, where $\Delta_0$ is the diagonal action of $\bigoplus_P^{c_0}\mathcal K(H_P)$;
- $\operatorname{ran}R=\operatorname{ran}\Delta_b\cap\mathcal K(\mathcal H)$, where $\Delta_b$ is the diagonal action of the bounded product of compact blocks;
- $R$ is an isometry and $\|R(a)\|=\|a\|$ for every $a\in A$;
- for the coordinate projection $p_P$ and embedding $j_P$, $p_PR(a)j_P=\rho_P(a)$;
- $R(a)^*=R(a^*)$ for every $a\in A$.

## Assumptions

The given $\pi$ acts on the complete complex Hilbert space $H$. Only its injectivity and pointwise compactness are assumed. No irreducibility, nonzero algebra, nonempty index, countability, or separability is imposed. The Hilbert sum and its selected fibers are the already defined ones.

## Conclusion

All outputs concern this one $R$, not a replacement action. Its range is block diagonal; the theorem does not assert that it is all of $\mathcal K(\mathcal H)$ or that arbitrary off-diagonal compact operators are present. It also does not claim unitary equivalence between $R$ and the original $\pi$.

## Main citations

[The simultaneous reduced-atomic specification](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=56&start=167&end=196#L167) concerns the [already defined reduced-atomic map](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/ReducedAtomic.lean.html?from=56&start=58&end=64#L58). Its [range as a compact c0-diagonal action](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/ReducedAtomic.lean.html?from=56&start=285&end=310#L285) and [range as the compact part of the bounded diagonal action](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Representation/ReducedAtomic.lean.html?from=56&start=317&end=330#L317) are exact equalities for that same map, not the whole compact-operator algebra.

## Lean source signature (exact)

[Exact source and declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/Spectrum/CompactRepresentationCharacterization.lean.html?from=56&start=167&end=196#L167). Only the literal signature is displayed here; the linked source retains the proof.

```lean
theorem reducedAtomicRepresentation_spec_of_isCompactlyRepresented
    (pi : NonUnitalCStarRepresentation A H) (hpi : pi.IsCompactlyRepresented) :
    (reducedAtomicRepresentation (A := A)).IsCompactlyRepresented ∧
    (NonUnitalStarAlgHom.range (reducedAtomicRepresentation (A := A))) =
      (NonUnitalStarAlgHom.range (CompactOperatorC0Sum.diagonalRepresentation
        (fun P : PrimitiveSpectrum A => P.pureStateRepresentative.GNS))) ∧
    (NonUnitalStarAlgHom.range (reducedAtomicRepresentation (A := A))) =
      (NonUnitalStarAlgHom.range (CompactOperatorBoundedProduct.diagonalRepresentation
        (fun P : PrimitiveSpectrum A => P.pureStateRepresentative.GNS))) ⊓
        ContinuousLinearMap.compactOperatorStarSubalgebra ℂ
          (ReducedAtomicHilbertSpace A) ∧
    Isometry (reducedAtomicRepresentation (A := A)) ∧
    (∀ a : A, ‖reducedAtomicRepresentation (A := A) a‖ = ‖a‖) ∧
    (∀ (a : A) (P : PrimitiveSpectrum A),
      (coordinateProjection P).comp
        ((reducedAtomicRepresentation (A := A) a).comp (coordinateEmbedding P)) =
          P.pureStateRepresentative.gnsRepresentation a) ∧
    (∀ a : A, ContinuousLinearMap.adjoint (reducedAtomicRepresentation (A := A) a) =
      reducedAtomicRepresentation (star a))
```

| In the source | Mathematical meaning |
|---|---|
| [Algebra, Hilbert space and positivity](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-0)<br>`universe u v`<br><br>`variable {A : Type u} [NonUnitalCStarAlgebra A]`<br>`variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]` | The complex C*-algebra $A$ and complex Hilbert space $H$ are independent inputs. Completeness is part of the Hilbert structure. The local spectral-order instances displayed separately provide the positivity used for pure states. |
| [Given faithful compact action](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-1)<br>`    (pi : NonUnitalCStarRepresentation A H) (hpi : pi.IsCompactlyRepresented) :` | The input is the given $\pi:A\to\mathcal B(H)$, faithful with $\pi(A)\subseteq\mathcal K(H)$. This hypothesis places no irreducibility or nonzero requirement on $A$. |
| [Meaning of compact representability](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-2)<br>`def NonUnitalCStarRepresentation.IsCompactlyRepresented`<br>`    (pi : NonUnitalCStarRepresentation A H) : Prop :=`<br>`  Function.Injective pi ∧ ∀ a : A, IsCompactOperator (pi a)` | Injectivity is faithfulness, and the universal compactness condition says that every $\pi(a)$ is compact. The same definition is applied to $R$ in the first conclusion. |
| [Fixed pure-state representatives](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-3)<br>`def pureStateRepresentative (P : PrimitiveSpectrum A) : NonUnitalPureState A :=`<br>`  P.property.choose` | For each $P\in\operatorname{Prim}(A)$ this selects the fixed pure state $\varphi_P$. The separately cited kernel theorem identifies $\ker\rho_P=P$, where $\rho_P=\pi_{\varphi_P}$ on $H_P$. These are the same representatives in every conclusion. |
| [Hilbert sum](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-4)<br>`abbrev ReducedAtomicHilbertSpace (A : Type u) [NonUnitalCStarAlgebra A]`<br>`    [PartialOrder A] [StarOrderedRing A] :=`<br>`  HilbertSum (fun P : PrimitiveSpectrum A => P.pureStateRepresentative.GNS)` | The representation space is $$\mathcal H=\bigoplus_{P\in\operatorname{Prim}(A)}^2 H_P.$$ This is the Hilbert direct sum of the selected GNS spaces, not the algebra of bounded operator families. |
| [Reduced atomic action](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-5)<br>`theorem reducedAtomicRepresentation_apply`<br>`    (a : A) (x : ReducedAtomicHilbertSpace A) (P : PrimitiveSpectrum A) :`<br>`    reducedAtomicRepresentation a x P =`<br>`      P.pureStateRepresentative.gnsRepresentation a (x P) := by` | The coordinate formula specifies the same $R:A\to\mathcal B(\mathcal H)$: $$ (R(a)\xi)_P=\rho_P(a)\xi_P.$$ It holds for every $a\in A$, $\xi\in\mathcal H$ and $P\in\operatorname{Prim}(A)$. |
| [Faithfulness and compact values of R](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-6)<br>`    (reducedAtomicRepresentation (A := A)).IsCompactlyRepresented ∧` | The first conclusion is that this $R$ is injective and that $R(a)$ is compact for every $a\in A$. |
| [Range as c0 diagonal operators](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-7)<br>`    (NonUnitalStarAlgHom.range (reducedAtomicRepresentation (A := A))) =`<br>`      (NonUnitalStarAlgHom.range (CompactOperatorC0Sum.diagonalRepresentation`<br>`        (fun P : PrimitiveSpectrum A => P.pureStateRepresentative.GNS))) ∧` | The family argument assigns the same $H_P$ to each primitive ideal. The equality is $$\operatorname{ran}R=\operatorname{ran}\Delta_0,$$ where $\Delta_0$ acts on the $c_0$-family of compact blocks defined in the Statement, on the same $\mathcal H$. |
| [Range as compact bounded-diagonal operators](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-8)<br>`    (NonUnitalStarAlgHom.range (reducedAtomicRepresentation (A := A))) =`<br>`      (NonUnitalStarAlgHom.range (CompactOperatorBoundedProduct.diagonalRepresentation`<br>`        (fun P : PrimitiveSpectrum A => P.pureStateRepresentative.GNS))) ⊓`<br>`        ContinuousLinearMap.compactOperatorStarSubalgebra ℂ`<br>`          (ReducedAtomicHilbertSpace A) ∧` | The meet `⊓` is intersection of subalgebras of $\mathcal B(\mathcal H)$. Thus $$\operatorname{ran}R=\operatorname{ran}\Delta_b\cap\mathcal K(\mathcal H).$$ The bounded family and the compact-operator algebra use the same selected Hilbert sum; no off-diagonal operators are added. |
| [Isometry and norm equality](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-9)<br>`    Isometry (reducedAtomicRepresentation (A := A)) ∧`<br>`    (∀ a : A, ‖reducedAtomicRepresentation (A := A) a‖ = ‖a‖) ∧` | The same $R$ preserves distances and satisfies $$\lVert R(a)\rVert=\lVert a\rVert\qquad(a\in A).$$ Both assertions occur explicitly as conjuncts. |
| [Coordinate compression](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-10)<br>`    (∀ (a : A) (P : PrimitiveSpectrum A),`<br>`      (coordinateProjection P).comp`<br>`        ((reducedAtomicRepresentation (A := A) a).comp (coordinateEmbedding P)) =`<br>`          P.pureStateRepresentative.gnsRepresentation a) ∧` | The projection $p_P:\mathcal H\to H_P$ and inclusion $j_P:H_P\to\mathcal H$ give $$p_PR(a)j_P=\rho_P(a)\qquad(a\in A,\ P\in\operatorname{Prim}(A)).$$ The order of the two `comp` operations is exactly this composition. |
| [Adjoint identity](https://exactmathematics.org/mathlibannex/cards/ae080d5891f10f5b129063951765313149d728fd1adffd820c33396a9641b794/versions/gss-r1-ea91a963dc22dec8/index.html#card-56--source-row-11)<br>`    (∀ a : A, ContinuousLinearMap.adjoint (reducedAtomicRepresentation (A := A) a) =`<br>`      reducedAtomicRepresentation (star a)) := by` | The last conjunct is $$R(a)^*=R(a^*)\qquad(a\in A).$$ The left side is the Hilbert adjoint on $\mathcal H$ and the right side uses the involution of $A$. It concerns the same $R$ as all preceding conjuncts. |

The retained compiled prettyprint contains elisions. It is preserved as evidence, not expanded or presented as a new compiler result.

<details class="binder-context"><summary>Exact surrounding source context (separate excerpts)</summary>

Exact surrounding source:

```lean
attribute [local instance] _root_.CStarAlgebra.spectralOrder
  _root_.CStarAlgebra.spectralOrderedRing
```

Exact surrounding source:

```lean
universe u v

variable {A : Type u} [NonUnitalCStarAlgebra A]
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
```

</details>

