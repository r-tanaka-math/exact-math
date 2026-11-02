Version 1 source-bound exposition export. Original text SHA-256: d748c166c9236979efa92a11471c961308169b56bbcdf2406fabe48365c6857d. Link targets are adapted for this edition; the registered Card identity is unchanged.

# From components to their common kernel

## Statement

The natural map from the geometric spectrum to the primitive geometric spectrum sends a component to the intersection of all its geometric points. The map is surjective. With the separately defined spectrum closures, it preserves the closure of each selected set by an exact image formula.

## Definition

Let $E$ be a normed space over a real-or-complex scalar field $\mathbb K$, with closed unit ball $B_E=\{x\in E:\|x\|\leq1\}$ and continuous $\mathbb K$-linear dual $E^*$. The geometric point set $S_{\mathbb K}(E)$ consists of the subsets

$$
\begin{aligned}
I_{\mathbb K}(M)&=\bigcup_{f\in\Sigma_{\mathbb K}(M)}\ker f,\\
\Sigma_{\mathbb K}(M)&=\{f\in E^*: \|f\|\leq1,\ f|_M=1\},
\end{aligned}
$$

where $M$ ranges over nonempty maximal proper real convex faces of $B_E$. A face is a convex subset containing both endpoints of every segment in the ball whose interior meets it; maximality is among proper convex faces. Equal resulting subsets are the same geometric point. Here $f|_M=1$ means $f(x)=1$ for every $x\in M$.

For $\mathscr A\subseteq S_{\mathbb K}(E)$, the geometric structure closure is

$$
c_E(\mathscr A)=\left\{I\in S_{\mathbb K}(E):\bigcap_{J\in\mathscr A}J\subseteq I\right\}.
$$

Two points $I,J$ are linked if $I=J$ or $c_E(\{I,J\})\ne\{I,J\}$. Let $C_E(I)$ be all points reachable from $I$ by a finite chain of such linked pairs, including $I$ itself. Define

$$
\begin{aligned}
\operatorname{GS}_{\mathbb K}(E)&=\{C_E(I):I\in S_{\mathbb K}(E)\},\\
J_C&=\bigcap_{I\in C}I,\\
\operatorname{PS}_{\mathbb K}(E)&=\{J_C:C\in\operatorname{GS}_{\mathbb K}(E)\}.
\end{aligned}
$$

The **component-intersection map** is

$$
\gamma_E:\operatorname{GS}_{\mathbb K}(E)\longrightarrow\operatorname{PS}_{\mathbb K}(E),
\qquad \gamma_E(C)=J_C.
$$

It takes a set of geometric points to a subset of $E$. It uses the component set itself, so changing its representative $I$ does not change the output.

The cited surjectivity theorem has a direct witness argument. Given $J\in\operatorname{PS}_{\mathbb K}(E)$, choose a geometric point $I_0$ witnessing $J=J_{C_E(I_0)}$. Then $C=C_E(I_0)$ satisfies

$$
\gamma_E(C)=J_{C_E(I_0)}=J.
$$

This choice proves existence of a preimage. It makes no uniqueness assertion about the witnessing point or component.

## Assumptions

The space $E$ is normed over $\mathbb K$, without completeness or nontriviality hypotheses. All component kernels are intersections of subsets of $E$. The map has no additional input, and injectivity is not an assumption or a conclusion of this declaration.

## Conclusion

The output is the specified map $\gamma_E(C)=J_C$; the separately cited theorem proves that it is surjective. Its role in the closure constructions is expressed by the following formulas. For selections $\mathscr T\subseteq\operatorname{PS}_{\mathbb K}(E)$ and $\mathscr U\subseteq\operatorname{GS}_{\mathbb K}(E)$, put

$$
\begin{aligned}
d_E(\mathscr T)&=\left\{J\in\operatorname{PS}_{\mathbb K}(E):
\bigcap_{J'\in\mathscr T}J'\subseteq J\right\},\\
g_E(\mathscr U)&=\gamma_E^{-1}\bigl(d_E(\gamma_E(\mathscr U))\bigr).
\end{aligned}
$$

Empty intersections are $E$. These separately defined operations are the primitive and geometric spectrum closures. The pullback formula makes $\gamma_E$ closure-continuous, and surjectivity gives the stronger identity

$$
\gamma_E(g_E(\mathscr U))=d_E(\gamma_E(\mathscr U)).
$$

Indeed, surjectivity gives $\gamma_E(\gamma_E^{-1}(\mathscr T))=\mathscr T$ for every subset of the codomain; apply this to $\mathscr T=d_E(\gamma_E(\mathscr U))$. These closure statements are supplied by the cited companion declarations. They do not turn $\gamma_E$ into a homeomorphism without an additional injectivity result. For the zero space, both carriers are empty and the same definition applies.

## Main citations

- [The face-defined geometric points and closure](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Basic.lean.html?from=11&start=37&end=65&ranges=37-65#L37): `NormedSpace.geometricStructureFamily`, `NormedSpace.GeometricStructureSpace` and `NormedSpace.geometricStructureClosure`, lines 37–65; [the face condition](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Face.lean.html?from=11&start=32&end=39#L32), `NormedSpace.IsMaximalFace`, lines 32–39.
- [Linked pairs and components](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Components.lean.html?from=11&start=30&end=71&ranges=30-71#L30): `ClosureSpace.Linked`, `ClosureSpace.Related` and `ClosureSpace.component`, lines 30–71.
- [The two spectrum carriers and component kernel](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=11&start=36&end=54&ranges=36-54%2C93-101#L36): `NormedSpace.GeometricSpectrum`, `NormedSpace.geometricSpectrumKernel` and `NormedSpace.PrimitiveGeometricSpectrum`, lines 36–54; the primitive range characterization, lines 93–101.
- [Exact map, its value and surjectivity](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=11&start=68&end=74&ranges=68-74%2C88-90#L68): `NormedSpace.geometricSpectrumToPrimitive`, lines 68–74; `NormedSpace.geometricSpectrumToPrimitive_surjective`, lines 88–90. Surjectivity is supplied by this separate theorem.
- [The witness used by the generic construction](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/HullKernelTransforms.lean.html?from=11&start=80&end=95&ranges=80-95#L80): `ClosureSpace.HullKernel.componentPointToComponentKernelPoint` and its surjectivity theorem, lines 80–95.
- [The closures and their exact image formula](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=11&start=109&end=157&ranges=109-157#L109): `NormedSpace.primitiveGeometricSpectrumClosure`, `NormedSpace.geometricSpectrumClosure`, `NormedSpace.continuous_geometricSpectrumToPrimitive` and `NormedSpace.image_geometricSpectrumToPrimitive_closure`, lines 109–157; the generic image-of-pullback identity is [here](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Topology/ClosureSpace/Induced.lean.html?from=11&start=74&end=80#L74), `ClosureSpace.image_induced_closure`, lines 74–80.
- Ryotaro Tanaka, [arXiv:2504.05551v1, Definition 4.6 and Theorem 4.7](https://arxiv.org/pdf/2504.05551v1#page=16): the map $\gamma$ and the two closure formulas. The formal source allows the weaker normed-space assumptions stated above.

## Lean source signature (exact)

The scalar and normed-space declarations used in this construction are reproduced separately below.

```lean
def geometricSpectrumToPrimitive : GeometricSpectrum 𝕜 E → PrimitiveGeometricSpectrum 𝕜 E :=
  ClosureSpace.HullKernel.componentPointToComponentKernelPoint
    (geometricStructureFamily 𝕜 E) (univ_notMem_geometricStructureFamily 𝕜 E)
```

| In the source | Mathematical meaning |
| --- | --- |
| `𝕜`, `[RCLike 𝕜]` | The real or complex scalar field $\mathbb K$. |
| `E`, `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]` | A normed vector space $E$ over $\mathbb K$, possibly zero and not necessarily complete. |
| `GeometricSpectrum 𝕜 E → PrimitiveGeometricSpectrum 𝕜 E` | The entire output type is a map $\gamma_E:\operatorname{GS}_{\mathbb K}(E)\to\operatorname{PS}_{\mathbb K}(E)$, from component subsets to their intersection subsets. |
| `ClosureSpace.HullKernel.componentPointToComponentKernelPoint` | For every component $C$, the defining value is $\gamma_E(C)=J_C=\bigcap_{I\in C}I$. The component membership supplies a witness that this intersection lies in the target family. |
| `geometricStructureFamily 𝕜 E` | The family $\mathcal F_{\mathbb K}(E)$ of geometric points on which the generic component-intersection construction is applied. |
| `univ_notMem_geometricStructureFamily 𝕜 E` | The already proved properness $E\notin\mathcal F_{\mathbb K}(E)$ is the constructor input; it is not an extra assumption on $E$. |
| The complete RHS | These arguments specify the map $C\mapsto J_C$ on all components. Its cited surjectivity theorem gives $\forall J\in\operatorname{PS}_{\mathbb K}(E),\ \exists C,\ \gamma_E(C)=J$; neither a unique preimage nor closure continuity is a field of this function definition. |

### Source context (separate exact excerpt)

The surrounding declarations below are from [lines 32–33](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/GeometricStructure/Spectrum.lean.html?from=11&start=32&end=33#L32); their mathematical meaning is included in the guide above.

```lean
variable (𝕜 : Type v) [RCLike 𝕜]
variable (E : Type u) [NormedAddCommGroup E] [NormedSpace 𝕜 E]
```
