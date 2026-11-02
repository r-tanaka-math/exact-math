Version 1 source-bound exposition export. Original text SHA-256: 2eddab83cfeea74d55bbda2525c3f47d3e0fa972c62cabbc13123752f24414a5. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Finite projective incidence determines a semilinear equivalence

## Statement

Let $K,L$ be fields, let $V$ be a $K$-vector space, and let $W$ be an $L$-vector space. Write $[v]=Kv$ for $v\in V\setminus\{0\}$ and $[w]=Lw$ for $w\in W\setminus\{0\}$. These are the points of the projective spaces $\mathbb P(V)$ and $\mathbb P(W)$, respectively. For $D\subseteq\mathbb P(V)$, let $\langle D\rangle_{\mathrm p}$ be the set of lines in the algebraic linear span of representatives of $D$. In particular, $\langle\varnothing\rangle_{\mathrm p}=\varnothing$.

Suppose $e:\mathbb P(V)\to\mathbb P(W)$ is a bijection and

$$
p\in\langle D\rangle_{\mathrm p}
\quad\Longleftrightarrow\quad
e(p)\in\langle e(D)\rangle_{\mathrm p}
\qquad(D\text{ finite},\ p\in\mathbb P(V)).\tag{1}
$$

If the cardinal-valued algebraic dimension of $V$ over $K$ is at least three, there exist a field isomorphism $\sigma:K\to L$ and an additive bijection $U:V\to W$ such that

$$
U(av)=\sigma(a)U(v),\qquad e([v])=[U(v)]
\quad(a\in K,\ v\in V\setminus\{0\}).\tag{2}
$$

The scalar identity also holds at $v=0$. Thus one semilinear equivalence realizes the prescribed projective bijection on every projective point.


## Assumptions

Incidence is both preserved and reflected for every finite family, not merely for the chosen basis rays. The dimension assumption means that three linearly independent vectors exist; it does not assert finite dimensionality. The spaces need no norms, inner products, or topology, and the two fields need not coincide. No assumption on the characteristic is made.


## Conclusion

This is a version of the fundamental theorem of projective geometry.

The same pair $(\sigma,U)$ works for all nonzero representatives. The semilinear equivalence includes its $\sigma^{-1}$-semilinear inverse $U^{-1}:W\to V$. In particular,

$$
e^{-1}([w])=[U^{-1}(w)]\qquad(w\in W\setminus\{0\}).\tag{3}
$$

The declaration asserts existence, not uniqueness of the choices. It imposes no involution, compatibility with an involution, or continuity condition on $\sigma$.


## Main citations

[The finite-incidence realization theorem](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/LinearAlgebra/Projectivization/Semilinear.lean.html?from=35&start=514&end=533#L514) gives one field isomorphism and one semilinear equivalence realizing every projective point. The [semilinear equivalence construction](https://exactmathematics.org/mathlibannex/sources/gss-v0.5.0/MathlibAnnex/LinearAlgebra/Basis/Semilinear.lean.html?from=35&start=35&end=59#L35) includes the inverse over the inverse field isomorphism.


## Lean source signature (exact)

The declaration prefix below is a contiguous source excerpt, ending before its proof assignment.

```lean
theorem exists_semilinearEquiv_of_finite_span
    (e : ℙ K V ≃ ℙ L W)
    (he : ∀ (T : Set (ℙ K V)), T.Finite → ∀ p,
      p ∈ Subspace.span T ↔ e p ∈ Subspace.span (e '' T))
    (hdim : 3 ≤ Module.rank K V) :
    ∃ σ : K ≃+* L, ∃ U : V ≃ₛₗ[σ.toRingHom] W,
      ∀ (v : V) (hv : v ≠ 0), e (mk K v hv) =
        mk L (U v) (by simpa only [map_zero] using U.injective.ne hv)
```

| In the source | Mathematical meaning |
|---|---|
| `K`, `L`, `V`, `W` and their ambient instances | Two fields and their vector spaces; neither finite dimensionality nor an analytic structure is present. |
| `e : ℙ K V ≃ ℙ L W` | The prescribed projective bijection, not a lift constructed in advance. |
| `he`, with `T.Finite` and arbitrary `p` | Both directions of (1), using the algebraic projective span, for every finite $D\subseteq\mathbb P(V)$ and every $p\in\mathbb P(V)$, including $D=\varnothing$. |
| `hdim : 3 ≤ Module.rank K V` | The cardinal-valued dimension $\dim_K V$ is at least three; infinite-dimensional spaces are allowed. |
| `∃ σ : K ≃+* L, ∃ U : V ≃ₛₗ[σ.toRingHom] W` | One field isomorphism $\sigma:K\to L$ and one additive bijection $U:V\to W$ with $U(av)=\sigma(a)U(v)$. Its inverse is semilinear over $\sigma^{-1}$. |
| `∀ (v : V) (hv : v ≠ 0), e (mk K v hv) = ...` | The equality $e([v])=[U(v)]$ for every $v\in V\setminus\{0\}$, with the same $\sigma$ and $U$ throughout. The vector $U(v)$ is nonzero, so the right-hand projective point is defined. |

The following source context is separate from the declaration prefix. The later comment at lines 535–536 is not part of this declaration.

### Source context (separate exact excerpt)

Source lines 38–41:

```lean
universe uK uL uV uW uI
variable {K : Type uK} {L : Type uL} {V : Type uV} {W : Type uW}
variable [Field K] [Field L]
variable [AddCommGroup V] [Module K V] [AddCommGroup W] [Module L W]
```

Source lines 44–47:

```lean
local instance (σ : K ≃+* L) : RingHomInvPair σ.toRingHom σ.symm.toRingHom :=
  RingHomInvPair.of_ringEquiv σ
local instance (σ : K ≃+* L) : RingHomInvPair σ.symm.toRingHom σ.toRingHom :=
  RingHomInvPair.of_ringEquiv_symm σ
```


<details class="exact-identity"><summary>Exact content identity / Technical Details</summary>

The retained successful printed type contains elisions. Its exact saved bytes and the full literal declaration remain in the historical binding. The displayed prefix is a contiguous literal source excerpt, not an abbreviated printed type. No new compiler run is claimed.

</details>
