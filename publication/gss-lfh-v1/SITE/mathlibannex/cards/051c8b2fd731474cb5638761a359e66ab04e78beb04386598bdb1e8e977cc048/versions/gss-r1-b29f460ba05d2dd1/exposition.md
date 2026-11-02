Version 1 source-bound exposition export. Original text SHA-256: 4cac2496ebf2f2ea927aae150a194274bdec49dcca513ba261e3a4df9dedf4cf. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Closure spaces before topology

## Statement

A closure space is a set with an extensive, monotone and idempotent operation on its subsets that sends the empty set to the empty set. Preservation of finite unions is a separate condition.

## Definition

Let $X$ be a set and let $\mathcal P(X)$ denote its power set, ordered by inclusion. A closure space on $X$ consists of a map $c:\mathcal P(X)\to\mathcal P(X)$ satisfying, for all $A,B\subseteq X$,

$$
\begin{aligned}
A&\subseteq c(A),\\
A\subseteq B&\Longrightarrow c(A)\subseteq c(B),\\
c(c(A))&=c(A),\\
c(\varnothing)&=\varnothing.
\end{aligned}
$$

A subset $A$ is **closed** when $c(A)=A$. The first three axioms say that $c$ is a closure operator on the ordered set $\mathcal P(X)$; the fourth supplies the empty-set condition.

The cited intersection theorem gives the useful equivalent description

$$
c(A)=\bigcap\{B\subseteq X:A\subseteq B\text{ and }c(B)=B\}.
$$

Indeed, $c(A)$ is closed and contains $A$, and monotonicity puts it inside every closed superset of $A$. Thus $c(A)$ is the smallest closed set containing $A$.

## Assumptions

The underlying set $X$ is arbitrary and may be empty. To specify a closure space, one supplies the map $c$ and the four displayed properties. No topology, metric or separation condition on $X$ is required.

## Conclusion

The resulting structure provides a closure operation and a notion of closed subset, with arbitrary intersections of closed sets again closed. A topological closure requires the additional identity

$$
c(A\cup B)=c(A)\cup c(B).
$$

This extra condition is called topologizability in the cited source. It is not one of the four axioms above.

## Main citations

- [Exact structure and closure laws](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Basic.lean.html?from=1&start=28&end=30&ranges=28-30%2C37-61#L28): `ClosureSpace`, lines 28–30; its operation and laws, lines 37–61.
- [Closed intersections and closure minimality](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Basic.lean.html?from=1&start=78&end=99&ranges=78-99#L78): `ClosureSpace.closure_min`, `ClosureSpace.isClosed_sInter` and `ClosureSpace.closure_eq_sInter`, lines 78–99.
- [The additional finite-union condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Basic.lean.html?from=1&start=102&end=103#L102): `ClosureSpace.IsTopologizable`, lines 102–103.
- [The underlying order-theoretic structure](https://exactmathematics.org/mathlibannex/sources/mathlib-360da6fa66c1/Mathlib/Order/Closure.lean.html?from=1&start=60&end=70#L60): Mathlib `ClosureOperator` in `Order/Closure.lean`, at the pinned mathlib commit.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Definition 3.1 and Remark 3.4](https://arxiv.org/pdf/2504.05551v1#page=6): the four axioms and the intersection description.

## Lean source signature (exact)

```lean
structure ClosureSpace (α : Type u) where
  toClosureOperator : ClosureOperator (Set α)
  map_empty' : toClosureOperator ∅ = ∅
```

| In the source | Mathematical meaning |
| --- | --- |
| `α : Type u`, `Set α` | An arbitrary set $X$ and its power set $\mathcal P(X)$; neither finiteness nor nonemptiness is required. |
| `toClosureOperator : ClosureOperator (Set α)` | The operation $c:\mathcal P(X)\to\mathcal P(X)$, with $A\subseteq c(A)$, $A\subseteq B\Rightarrow c(A)\subseteq c(B)$, and $c(c(A))=c(A)$ for all subsets $A,B$. Its closed-set predicate agrees with $c(A)=A$. |
| `map_empty'` | The additional equality $c(\varnothing)=\varnothing$. |
| `ClosureSpace α` | The returned structure consists of this operation and all four laws. It does not include preservation of finite unions. |
