// Trusted-contact ("tctoken") privacy token helpers.
//
// Ported from @whiskeysockets/baileys 7.0.0-rc14 (Utils/tc-token-utils.js) and
// trimmed down to stay isolated from @itsmee_aizat.id/baileys2' custom Socket layer:
// unlike upstream we keep tokens keyed by the plain JID (no LID resolution /
// cross-session index), so this is a drop-in behavioural upgrade of the
// existing buildTcTokenFromJid() call sites — no signature changes required.
//
// What changed vs. the previous stub:
//   - Tokens now expire on a rolling window (28 days / 4 x 7-day buckets),
//     matching WA Web's bucketing. An expired token is dropped instead of
//     being sent forever, and we no longer attach a token with no timestamp.
//   - Outgoing <tctoken> now carries the `t` (timestamp) attribute, same as
//     upstream, so the peer can reason about freshness on their end too.
//   - shouldSendNewTcToken() lets callers avoid clobbering a fresher stored
//     token with a stale/duplicate one received out of order.
const TC_TOKEN_BUCKET_DURATION = 604800; // 7 days, in seconds
const TC_TOKEN_NUM_BUCKETS = 4; // ~28-day rolling window
/**
 * Returns true when `timestamp` (unix seconds) falls outside the rolling
 * TC_TOKEN_NUM_BUCKETS x TC_TOKEN_BUCKET_DURATION window, i.e. the token is
 * stale enough that it should no longer be attached to outgoing stanzas.
 */
export function isTcTokenExpired(timestamp) {
    if (timestamp === null || timestamp === undefined)
        return true;
    const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
    if (isNaN(ts))
        return true;
    const now = Math.floor(Date.now() / 1000);
    const currentBucket = Math.floor(now / TC_TOKEN_BUCKET_DURATION);
    const cutoffBucket = currentBucket - (TC_TOKEN_NUM_BUCKETS - 1);
    const cutoffTimestamp = cutoffBucket * TC_TOKEN_BUCKET_DURATION;
    return ts < cutoffTimestamp;
}
/**
 * Returns true when a newly-received token (with `senderTimestamp`, unix
 * seconds) is from a bucket at or after the currently stored one, i.e. it is
 * safe to overwrite the stored token with it. Guards against an
 * out-of-order/duplicate notification silently downgrading a fresher token.
 */
export function shouldSendNewTcToken(senderTimestamp) {
    if (senderTimestamp === undefined)
        return true;
    const now = Math.floor(Date.now() / 1000);
    const currentBucket = Math.floor(now / TC_TOKEN_BUCKET_DURATION);
    const senderBucket = Math.floor(senderTimestamp / TC_TOKEN_BUCKET_DURATION);
    return currentBucket > senderBucket;
}
export async function buildTcTokenFromJid({ authState, jid, baseContent = [] }) {
    try {
        const tcTokenData = await authState.keys.get('tctoken', [jid]);
        const entry = tcTokenData?.[jid];
        const tcTokenBuffer = entry?.token;
        const timestamp = entry?.timestamp;
        if (!tcTokenBuffer?.length || timestamp === undefined || isTcTokenExpired(timestamp)) {
            if (tcTokenBuffer?.length) {
                // Token is stale — drop it so we don't keep attaching dead weight
                // to every outgoing stanza to this jid.
                await authState.keys.set({ tctoken: { [jid]: null } });
            }
            return baseContent.length > 0 ? baseContent : undefined;
        }
        baseContent.push({
            tag: 'tctoken',
            attrs: { t: String(timestamp) },
            content: tcTokenBuffer
        });
        return baseContent;
    }
    catch (error) {
        return baseContent.length > 0 ? baseContent : undefined;
    }
}
//# sourceMappingURL=tc-token-utils.js.map
