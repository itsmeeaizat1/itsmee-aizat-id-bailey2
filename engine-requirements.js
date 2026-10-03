/**
 * @itsmee_aizat.id/baileys2 — engine requirements check (no-op)
 *
 * This used to hard-exit the process unless Node.js was >=20.19.0 or
 * >=22.12.0, because index.cjs relied on synchronous require(esm), which
 * only works on those exact patch floors. index.cjs no longer does that
 * (it's a plain ESM-only notice now — see index.cjs), so there is nothing
 * version-specific left to enforce here.
 *
 * Kept as a no-op, rather than deleted, in case anything in an existing
 * deployment still points at this file by path.
 */
