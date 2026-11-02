Version 1 source-bound exposition export. Original text SHA-256: 503a5291e198ff42970e35ff56fd40f027f49c7e8fefef1ce01e797e195b5a55. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Finite-homeomorphisms of closure spaces

## Statement

Let $(X,c)$ and $(Y,d)$ be closure spaces. A finite-homeomorphism from $(X,c)$ to $(Y,d)$ is a bijection whose forward map and actual inverse both preserve closure on finite test subsets. It is a structure carrying the map and these two properties, rather than only a proposition asserting that some map exists.

## Definition

For a function $f$ and a subset $E$ of its domain, write $f(E)=\{f(x):x\in E\}$. A finite-homeomorphism consists of a bijection $e:X\to Y$, with its inverse $e^{-1}:Y\to X$, satisfying
$$
e(c(F))\subseteq d(e(F))\qquad
\text{for every finite }F\subseteq X,
$$
and
$$
e^{-1}(d(K))\subseteq c(e^{-1}(K))\qquad
\text{for every finite }K\subseteq Y.
$$
The inverse in the second inclusion belongs to the same bijection: $e^{-1}(e(x))=x$ and $e(e^{-1}(y))=y$. The first inclusion transports every point of the closure of a finite source set into the closure of its image. The second imposes the corresponding requirement in the reverse direction.

Here “finite” qualifies the test sets $F$ and $K$. The sets $X,Y$, the image $e(X)=Y$, and the closures $c(F),d(K)$ need not be finite. The closure operations themselves still act on all subsets.

## Assumptions

The two given closure operations are extensive, monotone and idempotent and preserve the empty set. The carriers may be empty and may belong to independent universes. No topology, metric, dimension bound or finite-character property of either closure is an input.

Full continuity would require the first inclusion for every subset of $X$, not only finite ones, and similarly for the inverse on $Y$. Neither full-continuity requirement is a field of this structure.

## Conclusion

An element of the defined type supplies one invertible map with both finite-continuity properties. These data can be used wherever a finite-homeomorphism is required without supplying ordinary continuity.

The separately defined continuous finite-homeomorphism adds full continuity of the forward map; even that additional structure does not include inverse full continuity. This distinction concerns an extra field, not a change to the underlying closure operators.

## Main citations

- [Finite-homeomorphism: the complete structure](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=12&start=157&end=159#L157), lines 157–159: the equivalence and its two finite-continuity fields.
- [Full and finite continuity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=12&start=29&end=34&ranges=29-34#L29), lines 29–34: the arbitrary-set and finite-set tests.
- [The additional forward full-continuity field](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=12&start=163&end=165#L163), lines 163–165: `ContinuousFiniteHomeomorph`.
- [Closure spaces before topology](https://exactmathematics.org/mathlibannex/cards/051c8b2fd731474cb5638761a359e66ab04e78beb04386598bdb1e8e977cc048/versions/gss-r1-b29f460ba05d2dd1/index.html), for the underlying closure axioms; [fixed source](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Basic.lean.html?from=12&start=28&end=30&ranges=28-30%2C37-61#L28), lines 28–30 and 37–61.

## Lean source signature (exact)

[Exact declaration](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html#L157). The complete structure, including its parent and both fields is shown below.

```lean
structure FiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where
  finitelyContinuous_toFun : c.FinitelyContinuous d toFun
  finitelyContinuous_invFun : d.FinitelyContinuous c invFun
```

| In the source | Mathematical meaning |
|---|---|
| `{α : Type u}`, `{β : Type v}` in the surrounding scope | The arbitrary carriers $X,Y$, in independent universes. The nearby third carrier is unused by this declaration. |
| `(c : ClosureSpace α) (d : ClosureSpace β)` | The given closure operations on all subsets of the two carriers. |
| `extends α ≃ β` | Data of one bijection $e:X\to Y$ and its actual inverse, including the inverse identities. |
| `finitelyContinuous_toFun : c.FinitelyContinuous d toFun` | For every finite $F\subseteq X$, $e(c(F))\subseteq d(e(F))$. |
| `finitelyContinuous_invFun : d.FinitelyContinuous c invFun` | For every finite $K\subseteq Y$, the inverse of that same $e$ satisfies $e^{-1}(d(K))\subseteq c(e^{-1}(K))$. |
| `∀ s : Set α, s.Finite → ...` in the separate predicate excerpt | Finiteness belongs to the tested subset, not to the carrier or all values of the map. |
| `f '' s` in the continuity predicates | The image of a set is written $f(S)$ in the exposition. |
| `FiniteHomeomorph c d` | A type of maps with specified properties; its definition does not assert that this type is inhabited. |

The following source excerpts are separate from the declaration above. Their line ranges are not concatenated into a synthetic signature.

<details class="binder-context"><summary>Exact surrounding scope and supporting definitions</summary>

Source Maps.lean, lines 22–26:

```lean
universe u v w

namespace ClosureSpace

variable {α : Type u} {β : Type v} {γ : Type w}
```

Source Maps.lean, lines 29–34:

```lean
def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=
  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)

/-- Preservation of closure, tested only on finite subsets of the domain. -/
def FinitelyContinuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=
  ∀ s : Set α, s.Finite → f '' c.closure s ⊆ d.closure (f '' s)
```

Source Maps.lean, lines 163–165:

```lean
structure ContinuousFiniteHomeomorph (c : ClosureSpace α) (d : ClosureSpace β)
    extends FiniteHomeomorph c d where
  continuous_toFun : c.Continuous d toFun
```

</details>
