Version 1 source-bound exposition export. Original text SHA-256: 67adbc830f95e6c41ac7744bd0bbc1750cbf465c8d6ef76ccbc31b20b3059a1d. Link targets are adapted for this edition; the registered Card identity is unchanged.

# The closure-space homeomorphism induced by an orthogonality equivalence

## Statement

Let $E$ and $F$ be normed spaces over real-or-complex scalar fields $\mathbb K$ and $\mathbb L$, and let $e:E\to F$ be a bijection preserving and reflecting their Birkhoff–James orthogonality relations. Define the induced closure-space homeomorphism

$$
\Phi_e:S_{\mathbb K}(E)\longrightarrow S_{\mathbb L}(F),
\qquad \Phi_e(I)=e(I),
$$

with inverse $J\mapsto e^{-1}(J)$. Here $e(I)=\{e(x):x\in I\}$ is a direct image and $e^{-1}(J)=\{x:e(x)\in J\}$ is a preimage. Well-definedness and closure preservation are supplied by the separately cited transport theorems.

## Definition

Let $E$ and $F$ be normed spaces over real-or-complex scalar fields $\mathbb K$ and $\mathbb L$, respectively; the fields may differ. Define

$$
x\perp_{\mathbb K}y
\quad\Longleftrightarrow\quad
\|x\|\leq\|x+ay\|\text{ for every }a\in\mathbb K.
$$

The same formula with $\mathbb L$ defines orthogonality on $F$. Let $e:E\to F$ be a bijection such that, for every $x,y\in E$,

$$
e(x)\perp_{\mathbb L}e(y)\quad\Longleftrightarrow\quad x\perp_{\mathbb K}y.
$$

Here is the geometric point set on which the induced map acts. Write $E^*$ for the continuous $\mathbb K$-linear dual and $B_E=\{x\in E:\|x\|\leq1\}$. For a nonempty maximal proper real convex face $M$ of $B_E$, put

$$
\begin{aligned}
\Sigma_{\mathbb K}(M)&=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},\\
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f.
\end{aligned}
$$

Here $f|_M=1$ means $f(x)=1$ for every $x\in M$.

A face is a convex subset containing both endpoints of each segment in the ball whose interior meets it; maximality is among proper convex faces. The set $S_{\mathbb K}(E)$ consists of the resulting subsets $I_{\mathbb K}(M)$, with equal subsets regarded as the same point. Its closure is

$$
\begin{gathered}
c_E(\mathscr A)=\left\{I\in S_{\mathbb K}(E):\bigcap_{J\in\mathscr A}J\subseteq I\right\},\\
\mathscr A\subseteq S_{\mathbb K}(E).
\end{gathered}
$$

The empty intersection is $E$. Define $S_{\mathbb L}(F)$ and $c_F$ by the same formulas for $F$. Define the point map by

$$
\Phi_e:S_{\mathbb K}(E)\longrightarrow S_{\mathbb L}(F),
\qquad \Phi_e(I)=e(I).
$$

Its inverse sends $J\subseteq F$ to $e^{-1}(J)$, the preimage under $e$.

The [geometric-point transport theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Preserver.lean.html?from=6&start=106&end=120#L106) makes this point map well-defined; the same theorem for the inverse bijection supplies the inverse. The [incidence identity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Preserver.lean.html?from=6&start=141&end=147#L141) and [hull–kernel closure-transport theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernelMap.lean.html?from=6&start=45&end=66#L45) supply its homeomorphism structure.

## Assumptions

The spaces are normed, with no completeness or nontriviality assumption. Their real-or-complex scalar fields may differ. The given bijection preserves and reflects the displayed ordered orthogonality relation for every pair of vectors; additivity, homogeneity and norm continuity are not assumed.

## Conclusion

The output is the specified point bijection $\Phi_e$, together with closure continuity of it and its inverse. Its underlying map and inverse are exactly those displayed above. A closure-space homeomorphism is a bijection continuous in both directions for the given closure operators; the operators need not be topological closures. The cited transport theorem supplies the identity

$$
\Phi_e\bigl(c_E(\mathscr A)\bigr)
=c_F\bigl(\Phi_e(\mathscr A)\bigr)
\qquad(\mathscr A\subseteq S_{\mathbb K}(E)).
$$


## Main citations

- [Geometric points remain geometric under the given bijection](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Preserver.lean.html?from=6&start=106&end=120#L106): `NormedSpace.image_mem_geometricStructureFamily`.
- [The point equivalence and its incidence identity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Preserver.lean.html?from=6&start=123&end=137#L123): `NormedSpace.geometricStructureEquivOfBirkhoffJames` and `NormedSpace.mem_geometricStructureEquivOfBirkhoffJames`.
- [Incidence-preserving equivalences commute with hull–kernel closure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernelMap.lean.html?from=6&start=45&end=66#L45): `ClosureSpace.HullKernel.image_closure`. The following `homeomorphOfMemIff` definition packages this theorem.
- [The geometric point family and closure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=6&start=37&end=39#L37); [maximal proper real convex faces](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Face.lean.html?from=6&start=32&end=39#L32).
- [Closure continuity and closure-space homeomorphisms](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=6&start=29&end=30#L29) and [the homeomorphism structure](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Maps.lean.html?from=6&start=84&end=86#L84).

## Lean source signature (exact)

The construction uses the scalar, space and bijection hypotheses reproduced separately below.

```lean
def geometricStructureHomeomorphOfBirkhoffJames :
    ClosureSpace.Homeomorph (geometricStructureClosure 𝕜 E) (geometricStructureClosure 𝕝 F) :=
  ClosureSpace.HullKernel.homeomorphOfMemIff
    (univ_notMem_geometricStructureFamily 𝕜 E) (univ_notMem_geometricStructureFamily 𝕝 F)
    e (geometricStructureEquivOfBirkhoffJames 𝕜 𝕝 e h)
    (mem_geometricStructureEquivOfBirkhoffJames 𝕜 𝕝 e h)
```

| In the source | Mathematical meaning |
|---|---|
| [Scalar fields and normed spaces](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-0)<br>`variable (𝕜 : Type v) (𝕝 : Type z) [RCLike 𝕜] [RCLike 𝕝]`<br>`variable {E : Type u} {F : Type w}`<br>`variable [NormedAddCommGroup E] [NormedSpace 𝕜 E]`<br>`variable [NormedAddCommGroup F] [NormedSpace 𝕝 F]` | The fields $\mathbb K,\mathbb L$ may each be real or complex. The spaces $E,F$ carry their respective norms and scalar actions; neither completeness nor nontriviality is required. |
| [Bijection and orthogonality](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-1)<br>`variable (e : E ≃ F)`<br>`variable (h : ∀ x y : E, BirkhoffJamesOrthogonal 𝕝 (e x) (e y) ↔`<br>`  BirkhoffJamesOrthogonal 𝕜 x y)`<br>`include h` | The given set bijection $e:E\to F$ preserves and reflects Birkhoff–James orthogonality for every ordered pair. The included hypothesis is the same $h$ used in this construction; linearity of $e$ is not assumed. |
| [Two closure spaces](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-2)<br>`def geometricStructureHomeomorphOfBirkhoffJames :`<br>`    ClosureSpace.Homeomorph (geometricStructureClosure 𝕜 E) (geometricStructureClosure 𝕝 F) :=` | The result is a homeomorphism from $(S_{\mathbb K}(E),c_E)$ to $(S_{\mathbb L}(F),c_F)$. These two complete closure arguments specify its domain and codomain. |
| [Point map and incidence input](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-3)<br>`  ClosureSpace.HullKernel.homeomorphOfMemIff`<br>`    (univ_notMem_geometricStructureFamily 𝕜 E) (univ_notMem_geometricStructureFamily 𝕝 F)`<br>`    e (geometricStructureEquivOfBirkhoffJames 𝕜 𝕝 e h)`<br>`    (mem_geometricStructureEquivOfBirkhoffJames 𝕜 𝕝 e h)` | The constructor receives the properness of both geometric families, the ambient bijection $e$, the point bijection $\Phi_e$, and the incidence identity $e(x)\in\Phi_e(I)\Longleftrightarrow x\in I$. These are the same maps as in the Statement. |
| [Forward and inverse point maps](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-4)<br>`def geometricStructureEquivOfBirkhoffJames :`<br>`    GeometricStructureSpace 𝕜 E ≃ GeometricStructureSpace 𝕝 F where`<br>`  toFun I := ⟨e '' I.val, image_mem_geometricStructureFamily 𝕜 𝕝 e h I.property⟩`<br>`  invFun J := ⟨e.symm '' J.val, image_mem_geometricStructureFamily 𝕝 𝕜 e.symm`<br>`    (birkhoffJamesOrthogonal_symm_equiv 𝕜 𝕝 e h) J.property⟩` | The underlying point map is $\Phi_e(I)=e(I)$. Its inverse sends $J$ to $e^{-1}(J)$; the image under the inverse bijection in the code is this same preimage. The cited geometric-point transport result supplies membership in the target family. |
| [Homeomorphism fields](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-5)<br>`structure Homeomorph (c : ClosureSpace α) (d : ClosureSpace β) extends α ≃ β where`<br>`  continuous_toFun : c.Continuous d toFun`<br>`  continuous_invFun : d.Continuous c invFun` | The bundle contains one bijection and continuity of that map and its inverse. Applied here, the two conditions are $$\Phi_e(c_E(\mathscr A))\subseteq c_F(\Phi_e(\mathscr A)),$$ $$\Phi_e^{-1}(c_F(\mathscr B))\subseteq c_E(\Phi_e^{-1}(\mathscr B))$$ for every $\mathscr A\subseteq S_{\mathbb K}(E)$ and $\mathscr B\subseteq S_{\mathbb L}(F)$. |
| [Closure continuity](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e7204a2011082aa580b29d7ccd62e08ddd52aca1e2c46b67039f4c16541c0930/versions/gss-r1-25b7fa4b40b8bc83/index.html#card-06--source-row-6)<br>`def Continuous (c : ClosureSpace α) (d : ClosureSpace β) (f : α → β) : Prop :=`<br>`  ∀ s : Set α, f '' c.closure s ⊆ d.closure (f '' s)` | Continuity of a map $r:(Y,c_Y)\to(Z,c_Z)$ means $$r(c_Y(E))\subseteq c_Z(r(E))\qquad(E\subseteq Y).$$ In the preceding row this is used first for $r=\Phi_e$, then for its same inverse. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [the ambient source declarations](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Preserver.lean.html?from=6&start=34&end=41#L34); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) (𝕝 : Type z) [RCLike 𝕜] [RCLike 𝕝]
variable {E : Type u} {F : Type w}
variable [NormedAddCommGroup E] [NormedSpace 𝕜 E]
variable [NormedAddCommGroup F] [NormedSpace 𝕝 F]
variable (e : E ≃ F)
variable (h : ∀ x y : E, BirkhoffJamesOrthogonal 𝕝 (e x) (e y) ↔
  BirkhoffJamesOrthogonal 𝕜 x y)
include h
```
