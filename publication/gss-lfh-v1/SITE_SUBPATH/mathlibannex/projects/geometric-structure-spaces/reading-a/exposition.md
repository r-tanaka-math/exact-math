Version 1 source-bound exposition export. Original text SHA-256: 0bedbdba441f9d6039e303dede3853d0563f7077e83ca7fc798dd18fefdd0220. Link targets are adapted for this edition; the registered Card identity is unchanged.

# Geometric structure spaces and C*-algebras

How much of a $C^*$-algebra is determined by the geometry of its unit ball? The geometric structure space connects this geometry with irreducible representations and primitive ideals. Further results compare it with the geometric structure spaces of operator algebras and, under additional hypotheses, determine the algebra up to $\ast$-isomorphism.

## From norm geometry to closure spaces

Let $E$ be a nonzero real or complex normed space, with closed unit ball $B_E$. For each maximal proper face $F$ of $B_E$, let $I_F$ be the union of the kernels of all norm-one bounded linear functionals supporting $F$. Faces are taken in the underlying real vector space. The family $S(E)$ of these subsets is equipped with the hull–kernel closure
$$
c(\mathcal A)=\left\{I\in S(E):\bigcap_{J\in\mathcal A}J\subseteq I\right\},
\qquad \mathcal A\subseteq S(E).
$$
As usual, the intersection of the empty family is $E$. For the zero space, $S(E)$ is empty.

This closure need not come from a topology. Two distinct points are linked if the closure of the pair contains a third point, and components are defined by finite chains of linked points. A [pairwise linked set](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/52e5d62f7053b8306fdbbac8b721e9ef0475b7afaf156c739fd2ab9294273625/versions/gss-r1-74af612d52d19918/index.html), by contrast, requires every pair of distinct points to be linked. The geometric spectrum is the set of components. The primitive geometric spectrum records the intersections of the subsets belonging to each component.

For closure spaces $X$ and $Y$, a map $f:X\to Y$ is finitely continuous if
$$
f(c_X(F))\subseteq c_Y(f(F))
$$
for every finite subset $F$ of $X$. Requiring this for every subset gives continuity. A [finite homeomorphism](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/a94dce0ec7355781265c5013b5a05fc406db350a4a465c398f735051defb2c03/versions/gss-r1-84659fc4c28b0535/index.html) is a bijection such that both it and its inverse are finitely continuous. There is no finiteness assumption on $X$ or $Y$.

## Faces, states and spectra

Let $A$ be a nonzero $C^*$-algebra, not necessarily unital, and let $A^*$ be its space of bounded linear functionals. The [facial correspondence](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/34a7bd4f9a44a5027e879e535d823650db9e1c88c189d9512f4abf807927b2b2/versions/gss-r1-0347c222eddf4f04/index.html) identifies $S(A)$ with the family of kernels of the extreme points of $B_{A^*}$. The [pure-state translation theorem](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6687745b481cc7b6e73c7c61ba652b611a41578831abbe59a67455d6f87adb1a/versions/gss-r1-127aee93a1a000f2/index.html) expresses these functionals as unitary translates of pure states, using the unitization $\widetilde A=\mathbb C\oplus A$.

A nonzero irreducible $\ast$-representation $\pi:A\to\mathcal B(H_\pi)$ determines a component consisting of its matrix-coefficient kernels. Their intersection is $\ker\pi$. The spectral comparison theorems identify the two geometric spectra with the [irreducible spectrum](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6d61411eb406741fdc311de8512a3c787026dbe4ac5fdd13f4ee8e3f9f8e5f36/versions/gss-r1-50deff8011e46124/index.html), which distinguishes representations up to unitary equivalence, and the [primitive spectrum](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/8f04eaabc6451d43c2e877d60ea2504bb4b937f2a0129f3789ea91fd53d5d568/versions/gss-r1-026b5249968b4adf/index.html), which records their kernels. The spectral comparison maps are homeomorphisms for the corresponding hull–kernel topologies. The construction of the irreducible spectrum uses the GNS representations of pure states.

There is also a [comparison with representation images](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/5429bab04d4f40f5c73221227780b415fefa1d60201f14325eccecbba2b19ca0/versions/gss-r1-88b7da14af528988/index.html). Given a nonzero $\ast$-representation $\pi:A\to\mathcal B(H)$ and a component $C$ of $S(A)$ satisfying
$$
\bigcap_{I\in C}I=\ker\pi,
$$
it identifies the geometric structure space of $\pi(A)$ with the closure of $C$ in $S(A)$. No faithfulness or irreducibility assumption on $\pi$ is needed here. The [spectral transport construction](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/40149bd49114dfa869eef625e06a0138beb53d7b8946c51f162e0e196f171ac1/versions/gss-r1-ca68b7db0ee7c38c/index.html) then uses the spectral comparisons to obtain maps between spectra from homeomorphisms of geometric structure spaces.

## Normal parts and continuity

Let $A_1\subseteq\mathcal B(H)$ be a complex $\ast$-subalgebra on a complex Hilbert space $H$. Its [normal part](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/4795f90dcc646f51bf6c591f133c4986f8f3694b72258db7a3f1ef7466c7ce4d/versions/gss-r1-e9e3247599f7b296/index.html) consists of those points of $S(A_1)$ that are kernels of matrix coefficients
$$
a\longmapsto\langle y,a(x)\rangle,\qquad x,y\in H\setminus\{0\}.
$$
For norm-closed algebras whose inclusion representation is nonzero and irreducible, this family is a component. The [projective parametrization](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/3d7328185180155bea7c1880574a35b05bdae0c668b736859fa00b2169850f30/versions/gss-r1-7357148c43380cb4/index.html) records the lines through $x$ and $y$; it is a bijection, not a claim that the normal part has the usual product topology on two projective spaces.

[Semilinear changes of the two vectors](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/c5c807e60f29ab7e5c474f8feb345aefbfb09466fc16a5de659c5936369e3d47/versions/gss-r1-1552e52c77e45972/index.html) give finite homeomorphisms. The two changes use the same involutive field automorphism, commuting with complex conjugation. Full continuity requires further conditions on their action on operators. The subsequent factorization and regularity theorems state the dimension and continuity hypotheses needed for those conclusions.

## Component tests and compact models

One comparison condition asks for a faithful irreducible representation whose matrix-coefficient kernels exhaust $S(A)$. The project also studies [continuity under conjugation by finite homeomorphisms](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/6d987a777ad628da9151adcdfdef5693d121c754b214a7268d4bbb30b2b9677c/versions/gss-r1-0f27ae46ebd2ea45/index.html). The latter condition specifies which maps are assumed continuous and requires continuity of both the conjugate and its inverse.

Comparisons with the geometric structure space of $\mathcal K(H)$ distinguish [continuity in the forward direction](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/e3d1146d0e72a14eab872864b884e280adae5d387683e668928421e5dc6a02d1/versions/gss-r1-29dfdf789fe8e334/index.html) from [continuity in both directions](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/098d427d2201316055ccfe4ea61ab7733ae79857c7a734dfc892c6331c076008/versions/gss-r1-d0986f8f0a517994/index.html). The [finite-dimensional version](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/266063c05c13ee8c87329de652bb2c68fc5c83d3d4cbf55198ea6880fd333614/versions/gss-r1-6758a52f2a940b62/index.html) uses a nonzero finite-dimensional complex Hilbert space. Prescribing its dimension and giving an upper bound for that dimension are different conditions.

The representation-theoretic results likewise distinguish images containing $\mathcal K(H)$, images equal to $\mathcal K(H)$, and finite-dimensional images. The Glimm–Sakai theorem is used when the compact-operator inclusion condition is expressed in terms of type I; it is not part of the definitions of the geometric comparisons.

## Compact representations and rigidity

A faithful representation by compact operators, compact-operator images of all irreducible representations, and discreteness of the primitive spectrum are related by the characterization theorems. They are not interchangeable definitions.

For an algebra with a faithful representation by compact operators, the [canonical decomposition](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/968004a0ac46ed45e01dd56a9cc2b9cbc91621c8cf2606fa8f9ee3455c64f83c/versions/gss-r1-f378386d28ad2284/index.html) gives a $\ast$-isomorphism
$$
A\cong\bigoplus_{i\in I}^{c_0}\mathcal K(H_i).
$$
Here $I$ indexes the minimal nonzero closed ideals of $A$, and the [Hilbert spaces $H_i$](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/2e9d6a12ad890dd7453e90c194c7fbbdd01dcda7851e5d16c2275427fa6dad74/versions/gss-r1-39a1ba115be76af0/exposition.md) are obtained from the given representation. The [$c_0$-sum](https://exactmathematics.org/exact-mathematics/mathlibannex/cards/5cf0bcfe187a49cb7ede9d665be53ec0dfc990d1f18c10024ceb9120076696ed/versions/gss-r1-c9c26d8f13af10e2/exposition.md) is a sum of operator algebras, not the algebra of all compact operators on a Hilbert direct sum. The construction includes the zero algebra, for which the index set is empty.

The rigidity theorems establish the existence of a $\ast$-isomorphism under their respective compact-operator, elementary, finite-dimensional or $\mathcal B(H)$-model hypotheses. They do not assert that every given geometric homeomorphism is induced by that isomorphism. In the last case, an isomorphism with a concrete algebra $\mathcal B(H)$ is part of the model assumption; passage from an abstract type-I factor uses a separate classification theorem.

## Mathematical background

The main tools are the Hahn–Banach and Krein–Milman theorems, weak$^*$ compactness, the GNS construction, the correspondence between pure states and irreducible representations, and simultaneous interpolation. Representation images are treated through the quotient by the kernel. The individual Cards give the definitions, statements and references needed to follow these connections.
