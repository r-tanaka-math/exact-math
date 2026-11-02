Version 1 source-bound exposition export. Original text SHA-256: 76ed31b6c4108aeb954f510c05c0330af9c61753d63e879b8cf794bf24a1cd38. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Closed hyperplane images force semilinear regularity

## Statement

Let $X,Y$ be complex Banach spaces, with $X$ infinite-dimensional. Let $\sigma:\mathbb C\to\mathbb C$ be a field automorphism and $T:X\to Y$ an algebraic $\sigma$-semilinear equivalence: $T$ is bijective and

$$
 T(x+x')=Tx+Tx',\qquad T(cx)=\sigma(c)Tx.
\tag{1}
$$

Suppose that $T(M)$ is closed in $Y$ for every closed complex hyperplane $M\subseteq X$. Then $\sigma$ is the identity or complex conjugation. The same $T$ and its inverse $T^{-1}$ are continuous, and there exist real constants $C,D>0$ such that

$$
 \|Tx\|\le C\|x\|\quad(x\in X),\qquad
 \|T^{-1}y\|\le D\|y\|\quad(y\in Y).
\tag{2}
$$

The scalar alternative and both continuity assertions hold together with this one pair of bounds.


## Assumptions

Here a closed complex hyperplane is a closed complex-linear subspace of codimension one. The assumption requires its image under $T$ to be closed.

Both $X$ and $Y$ are Banach spaces; only $X$ is required to be infinite dimensional. No separability, Hilbert-space structure, or initial continuity or boundedness of $\sigma$, $T$, or $T^{-1}$ is assumed.


## Conclusion

The given semilinear equivalence is complex-linear or conjugate-linear and is boundedly invertible. The conclusion includes continuity of $T$ and $T^{-1}$ and one pair of positive constants satisfying both estimates (2). It does not require those constants to be optimal or equal.


## Main citations

The [closed-hyperplane regularity theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/Module/SemilinearRegularity.lean.html?from=38&start=291&end=302#L291) gives the scalar alternative, both continuity assertions and both bounds. In the same file, [scalar continuity](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/Module/SemilinearRegularity.lean.html?from=38&start=119&end=132#L119), [continuity of the equivalence and its inverse](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/Module/SemilinearRegularity.lean.html?from=38&start=242&end=267#L242), and [positive norm bounds](https://exactmathematics.org/exact-mathematics/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/Analysis/Normed/Module/SemilinearRegularity.lean.html?from=38&start=271&end=287#L271) are stated separately.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem regularity_of_isClosed_image_hyperplane
    (T : LinearEquiv σ.toRingHom (σ' := σ.symm.toRingHom) X Y) (hX : ¬ FiniteDimensional ℂ X)
    (hclosed : ∀ M : Submodule ℂ X, IsCoatom M → IsClosed (M : Set X) →
      IsClosed (T '' (M : Set X))) :
    (σ = RingEquiv.refl ℂ ∨ σ = starRingAut (R := ℂ)) ∧
      Continuous T ∧ Continuous T.symm ∧
      ∃ C D : ℝ, 0 < C ∧ 0 < D ∧
        (∀ x, ‖T x‖ ≤ C * ‖x‖) ∧ (∀ y, ‖T.symm y‖ ≤ D * ‖y‖)
```

| In the source | Mathematical meaning |
|---|---|
| `X`, `Y`, their normed-space instances, and `[CompleteSpace X] [CompleteSpace Y]` | The complex Banach spaces $X,Y$. |
| `{σ : ℂ ≃+* ℂ}` | A field automorphism $\sigma:\mathbb C\to\mathbb C$, not assumed continuous. |
| `T : LinearEquiv σ.toRingHom (σ' := σ.symm.toRingHom) X Y` | The additive bijection $T:X\to Y$ with $T(cx)=\sigma(c)T(x)$; its inverse satisfies $T^{-1}(cy)=\sigma^{-1}(c)T^{-1}(y)$. |
| `hX : ¬ FiniteDimensional ℂ X` | $\dim_{\mathbb C}X=\infty$. |
| `M : Submodule ℂ X` | A complex-linear subspace $M\subseteq X$. This part alone does not require closedness. |
| `IsCoatom M` | $\dim_{\mathbb C}(X/M)=1$: $M$ is a complex hyperplane. |
| `IsClosed (M : Set X)` | $M$ is closed in $X$. Together with the preceding condition, this specifies a closed complex hyperplane. |
| `hclosed`, ending in `IsClosed (T '' (M : Set X))` | $T(M)$ is closed in $Y$ for every closed complex hyperplane $M\subseteq X$. |
| `σ = RingEquiv.refl ℂ ∨ σ = starRingAut (R := ℂ)` | $\sigma=\mathrm{id}_{\mathbb C}$ or $\sigma(c)=\overline c$ for every $c\in\mathbb C$. |
| `Continuous T ∧ Continuous T.symm` | Both $T:X\to Y$ and $T^{-1}:Y\to X$ are norm-continuous. |
| `∃ C D : ℝ, 0 < C ∧ 0 < D ∧ ...` | There are $C,D>0$ such that $\|T(x)\|\le C\|x\|$ for every $x\in X$, and $\|T^{-1}(y)\|\le D\|y\|$ for every $y\in Y$, as in (2). |
| The two local `RingHomInvPair` instances | $\sigma^{-1}\circ\sigma=\mathrm{id}_{\mathbb C}$ and $\sigma\circ\sigma^{-1}=\mathrm{id}_{\mathbb C}$; no assumption $\sigma^2=\mathrm{id}_{\mathbb C}$ is made. |

The literal signature above is the declaration prefix through line 298, ending before the proof assignment. The full declaration occupies lines 291–302; the comment at 304–305 belongs to the next theorem. The ambient variables and completeness assumptions are quoted separately below.

### Source context (separate exact excerpt)

Source lines 35–39:

```lean
universe u v
variable {X : Type u} {Y : Type v}
variable [NormedAddCommGroup X] [NormedSpace ℂ X]
variable [NormedAddCommGroup Y] [NormedSpace ℂ Y]
variable {σ : ℂ ≃+* ℂ}
```

Source lines 41–44:

```lean
local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=
  RingHomInvPair.of_ringEquiv σ
local instance (σ : ℂ ≃+* ℂ) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=
  RingHomInvPair.of_ringEquiv_symm σ
```

Source lines 237–237:

```lean
variable [CompleteSpace X] [CompleteSpace Y]
```


<details class="exact-identity"><summary>Exact content identity / Technical Details</summary>

The historical binding retains the successful printed type with its elisions. This view quotes literal source separately. No new compiler run or type output is claimed.

</details>
