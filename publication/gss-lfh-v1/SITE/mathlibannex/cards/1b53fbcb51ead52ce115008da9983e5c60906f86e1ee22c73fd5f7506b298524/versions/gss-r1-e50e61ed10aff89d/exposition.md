Version 1 source-bound exposition export. Original text SHA-256: 482bc886dbd0ce1fa7c43be8502adaaf7e2426c68f610547fdef2280e3add312. Link targets are adapted for this edition; the registered Card identity is unchanged.

# A singleton irreducible spectrum is witnessed by a faithful, fully normal representation

## Statement

Let $A$ be a nonzero complex $C^*$-algebra, not necessarily unital, with the compatible order structure used in its pure-state construction. Write $\widehat A$ for its irreducible spectrum: the space of unitary-equivalence classes of irreducible representations, realized here through pure-state GNS representations. It is not the space of primitive ideals obtained by identifying representations with the same kernel.

For a nonzero irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ on a complex Hilbert space $H$, write $S(\pi(A))$ for the geometric structure of its image $\pi(A)$, whose points are subsets obtained as unions of supporting kernels for maximal proper real faces of the closed unit ball. The established $C^*$-algebra identification realizes these points as kernels of extreme norm-one functionals. Use the inner product linear in its second variable. For $x,y\in H\setminus\{0\}$, define the bounded linear functional $f_{x,y}:\pi(A)\to\mathbb C$ by $f_{x,y}(t)=\langle y,t(x)\rangle$. Its normal part consists of these coefficient kernels

$$
 N(\pi(A))=\{\ker f_{x,y}:x,y\in H\setminus\{0\}\}.
\tag{1}
$$

The following are equivalent:

(i) The irreducible spectrum $\widehat A$ has exactly one point.

(ii) There are a complex Hilbert space $H$ and a nonzero irreducible $\ast$-representation $\pi:A\to\mathcal B(H)$ such that

$$
 \ker\pi=\{0\},\qquad N(\pi(A))=S(\pi(A)).
$$

The same Hilbert space and representation satisfy all the conditions in (ii).


## Assumptions

The algebra is nontrivial. There is no separability, unitality, finite-dimensionality, or prescribed Hilbert space in the input. Irreducibility on the right includes a nonzero action; it is not a convention that permits the zero representation. The order and star-order structures in the ambient source are retained. No full-normal-part or faithfulness assumption is hidden in a newly defined representation object.

Here “fully normal” means exactly the equality $N(\pi(A))=S(\pi(A))$ of sets of geometric points in (ii). It is not a claim about normal functionals on a von Neumann algebra, nor about the ultraweak continuity of $\pi$.


## Conclusion

A singleton unitary-equivalence spectrum is equivalent to the simultaneous existence of faithfulness and a full normal part for one nonzero irreducible representation. Neither condition alone replaces their conjunction. No elementary-algebra classification is asserted here.


## Main citations

The [singleton-spectrum representation theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectrumSingleton.lean.html?from=43&start=190&end=213#L190) gives the equivalence of (i) and (ii). The [pure-state witness theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectrumSingleton.lean.html?from=43&start=136&end=149#L136) supplies one faithful GNS representation with full normal part; the [converse for a given representation](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectrumSingleton.lean.html?from=43&start=153&end=161#L153) applies to the same representation in (ii).


## Lean source signature (exact)

The preceding `variable` declarations supply the nonzero C*-algebra and its order assumptions. On the right of `↔`, the nested existentials choose one complex Hilbert space and one representation on it. The norm, inner product and completeness all belong to that same space; the local `letI` declarations make these structures available together. The three final conjuncts concern that same representation. The following contiguous prefix ends before the proof assignment.

```lean
theorem exists_forall_eq_irreducibleSpectrum_iff_exists_faithful_representation :
    (∃ q : IrreducibleSpectrum A, ∀ r : IrreducibleSpectrum A, r = q) ↔
    (∃ (H' : Type u) (instN : NormedAddCommGroup H'),
      letI := instN
      ∃ instI : InnerProductSpace ℂ H',
        letI := instI
        ∃ instC : CompleteSpace H',
          letI := instC
          ∃ pi : NonUnitalCStarRepresentation A H',
            pi.IsIrreducible ∧ Function.Injective pi ∧ normalPart (NonUnitalStarAlgHom.range pi) = Set.univ)
```

| In the source | Mathematical meaning |
|---|---|
| [Nonzero algebra and compatible order](https://exactmathematics.org/mathlibannex/cards/1b53fbcb51ead52ce115008da9983e5c60906f86e1ee22c73fd5f7506b298524/versions/gss-r1-e50e61ed10aff89d/index.html#card-43--source-row-0)<br>`variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]`<br>`variable [PartialOrder A] [StarOrderedRing A]` | The input is the nonzero complex C*-algebra $A$. The partial order and star-order structure are those used for positivity and pure states. Unitality and separability are not required. |
| [A singleton irreducible spectrum](https://exactmathematics.org/mathlibannex/cards/1b53fbcb51ead52ce115008da9983e5c60906f86e1ee22c73fd5f7506b298524/versions/gss-r1-e50e61ed10aff89d/index.html#card-43--source-row-1)<br>`    (∃ q : IrreducibleSpectrum A, ∀ r : IrreducibleSpectrum A, r = q) ↔` | The left side says that $\widehat A$ has exactly one point, including existence of that point. Its points are unitary-equivalence classes of irreducible representations; this is not a statement that their kernels alone coincide. |
| [One Hilbert space and one representation](https://exactmathematics.org/mathlibannex/cards/1b53fbcb51ead52ce115008da9983e5c60906f86e1ee22c73fd5f7506b298524/versions/gss-r1-e50e61ed10aff89d/index.html#card-43--source-row-2)<br>`    (∃ (H' : Type u) (instN : NormedAddCommGroup H'),`<br>`      letI := instN`<br>`      ∃ instI : InnerProductSpace ℂ H',`<br>`        letI := instI`<br>`        ∃ instC : CompleteSpace H',`<br>`          letI := instC`<br>`          ∃ pi : NonUnitalCStarRepresentation A H',` | One complex Hilbert space $H$ is chosen, with its norm, compatible inner product and completeness. One $\ast$-representation $\pi:A\to\mathcal B(H)$ is then chosen on this same space. All conditions in the next row concern this same $\pi$. |
| [Irreducibility, faithfulness, and the full normal part](https://exactmathematics.org/mathlibannex/cards/1b53fbcb51ead52ce115008da9983e5c60906f86e1ee22c73fd5f7506b298524/versions/gss-r1-e50e61ed10aff89d/index.html#card-43--source-row-3)<br>`            pi.IsIrreducible ∧ Function.Injective pi ∧ normalPart (NonUnitalStarAlgHom.range pi) = Set.univ) := by` | The representation $\pi$ is nonzero and irreducible, is faithful, and has full normal part: $$\ker\pi=\{0\},$$ $$N(\pi(A))=S(\pi(A)).$$ The latter equality is with the whole geometric structure space of its image $\pi(A)$, not with the operator algebra $\mathcal B(H)$. |
| [Coefficient kernels in the image algebra](https://exactmathematics.org/mathlibannex/cards/1b53fbcb51ead52ce115008da9983e5c60906f86e1ee22c73fd5f7506b298524/versions/gss-r1-e50e61ed10aff89d/index.html#card-43--source-row-4)<br>`def normalPart (S : NonUnitalStarSubalgebra ℂ (H →L[ℂ] H)) :`<br>`    Set (NormedSpace.GeometricStructureSpace ℂ S) :=`<br>`  {I \| ∃ x y : H, x ≠ 0 ∧ y ≠ 0 ∧`<br>`    {a : S \| inner ℂ y ((a : H →L[ℂ] H) x) = 0} = I.val}` | Apply the definition to the image algebra $\pi(A)$. Its normal part consists of the coefficient kernels $$N(\pi(A))=\{\ker f_{x,y}:x,y\in H\setminus\{0\}\},$$ where $f_{x,y}:\pi(A)\to\mathbb C$ is given by $f_{x,y}(t)=\langle y,t(x)\rangle$, as in (1). The kernel is identified with the underlying subset of the geometric point $I$. |

### Source context (separate exact excerpts)

[SpectrumSingleton.lean](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/CStarAlgebra/GeometricStructure/SpectrumSingleton.lean.html?from=43&start=31&end=33#L31):

```lean
universe u v
variable {A : Type u} [NonUnitalCStarAlgebra A] [Nontrivial A]
variable [PartialOrder A] [StarOrderedRing A]
```


The existential Hilbert space has source level `u`, the same fixed level as $A$. The separate ambient level `v` does not enlarge this theorem's model quantifier.
