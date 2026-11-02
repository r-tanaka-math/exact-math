Version 1 source-bound exposition export. Original text SHA-256: 6f67a0d21cd17ab5badfd7f939508f613915235fb9b3c7d77d6eb230b70c1e80. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The hull–kernel closure construction

## Statement

A family of proper subsets of a set carries a natural closure structure. To close a subfamily, intersect its members and then take every member of the original family containing that intersection. The points of the resulting closure space are the subsets themselves.

## Definition

Let $X$ be a set and let $\mathcal F\subseteq\mathcal P(X)$ satisfy $X\notin\mathcal F$. For $\mathscr A\subseteq\mathcal F$ and $a\subseteq X$, define the kernel and hull by

$$
\begin{aligned}
k(\mathscr A)&=\bigcap_{I\in\mathscr A}I,\\
h(a)&=\{I\in\mathcal F:a\subseteq I\}.
\end{aligned}
$$

The empty intersection is $X$. The **hull–kernel closure** on $\mathcal F$ is

$$
c_{\mathcal F}(\mathscr A)=h(k(\mathscr A))
=\{I\in\mathcal F:k(\mathscr A)\subseteq I\}.
$$

There are two levels of subsets: a point $I$ is a subset of $X$, while $\mathscr A$ is a set of such points. Accordingly, $k(\mathscr A)\subseteq X$ and $c_{\mathcal F}(\mathscr A)\subseteq\mathcal F$.

Both $k$ and $h$ reverse inclusion, so $c_{\mathcal F}$ is monotone. Every $I\in\mathscr A$ contains $k(\mathscr A)$, giving extensivity. The cited kernel identity proves idempotence:

$$
\begin{gathered}
k(h(k(\mathscr A)))=k(\mathscr A)\\
\Longrightarrow\quad c_{\mathcal F}(c_{\mathcal F}(\mathscr A))=c_{\mathcal F}(\mathscr A).
\end{gathered}
$$

Finally,

$$
c_{\mathcal F}(\varnothing)=h(X)
=\{I\in\mathcal F:X\subseteq I\}=\varnothing,
$$

because $X\notin\mathcal F$. These are the four closure-space axioms.

## Assumptions

The only restriction on $\mathcal F$ is $X\notin\mathcal F$; the family itself may be empty. Its members are arbitrary proper subsets of $X$. No vector-space structure, topology, or closure of $\mathcal F$ under intersections is assumed.

## Conclusion

The construction yields the closure space $(\mathcal F,c_{\mathcal F})$ with the displayed formula. A subfamily $\mathscr A$ is closed precisely when $h(k(\mathscr A))=\mathscr A$.

The separate separation theorem shows that this closure is $T_0$: distinct points have distinct singleton closures. If $\mathcal F$ is an antichain under inclusion, every singleton is closed, the $T_1$ property. The antichain condition belongs to that further theorem, not to the construction.

## Main citations

- [Kernel, hull and the idempotence identity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernel.lean.html?from=2&start=30&end=66&ranges=30-66#L30): `ClosureSpace.HullKernel.kernel`, `ClosureSpace.HullKernel.hull` and `ClosureSpace.HullKernel.kernel_hull_kernel`, lines 30–66.
- [Exact construction and closure formula](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernel.lean.html?from=2&start=69&end=89&ranges=69-89#L69): `ClosureSpace.HullKernel.space`, lines 69–89.
- [The separation properties](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernel.lean.html?from=2&start=104&end=134&ranges=104-134#L104): `ClosureSpace.HullKernel.isT0_space` and `ClosureSpace.HullKernel.isT1_space_of_antichain`, lines 104–134.
- [The four closure axioms](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Basic.lean.html?from=2&start=28&end=30&ranges=28-30%2C44-61#L28): `ClosureSpace`, lines 28–30, with its laws at lines 44–61.
- [arXiv:2504.05551v1, Definition 4.1](https://arxiv.org/pdf/2504.05551v1#page=14): the later hull–kernel construction on geometric points. The generic construction here has purely set-theoretic assumptions.

## Lean source signature (exact)

The carrier `X` is declared in the separate source context below.

```lean
def space (F : Set (Set X)) (hF : Set.univ ∉ F) : ClosureSpace F where
  toClosureOperator := ClosureOperator.mk'
    (fun s => hull F (kernel F s))
    (by
      intro s t hst
      exact hull_antitone F (kernel_antitone F hst))
    (subset_hull_kernel F)
    (by
      intro s
      rw [kernel_hull_kernel])
  map_empty' := by
    change hull F (kernel F ∅) = ∅
    rw [kernel_empty]
    apply Set.eq_empty_iff_forall_notMem.2
    intro I hI
    have hval : I.val = Set.univ := Set.Subset.antisymm (Set.subset_univ _) hI
    exact hF (hval ▸ I.property)
```

| In the source | Mathematical meaning |
| --- | --- |
| `X`, `F : Set (Set X)` | An arbitrary set $X$ and a family $\mathcal F\subseteq\mathcal P(X)$. A point $I\in\mathcal F$ is itself a subset of $X$ (`I.val`). |
| `hF : Set.univ ∉ F` | $X\notin\mathcal F$: every member is proper. The family itself may be empty. |
| `kernel F s`, `hull F` | For `s` corresponding to $\mathscr A\subseteq\mathcal F$, $k(\mathscr A)=\bigcap_{I\in\mathscr A}I$, with empty intersection $X$, and $h(B)=\{I\in\mathcal F:B\subseteq I\}$. |
| `fun s => hull F (kernel F s)` | The whole closure operation $c_{\mathcal F}(\mathscr A)=\{I\in\mathcal F:\bigcap_{J\in\mathscr A}J\subseteq I\}$ on subfamilies of $\mathcal F$. |
| `ClosureOperator.mk'`, `map_empty'` | The construction certifies monotonicity, extensivity and idempotence of this operation, and $c_{\mathcal F}(\varnothing)=\varnothing$ using `hF`. |
| `: ClosureSpace F` | The returned closure-space structure is on the point set $\mathcal F$, with all four closure axioms; a topology on $X$ or finite-union preservation is not part of the output. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [line 27](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernel.lean.html?from=2&start=27&end=27#L27); their mathematical meaning is included in the guide above.

```lean
variable {X : Type u}
```
