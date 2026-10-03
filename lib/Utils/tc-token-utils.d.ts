import type { SignalKeyStoreWithTransaction } from '../Types/index.js';
import type { BinaryNode } from '../WABinary/index.js';
type TcTokenParams = {
    jid: string;
    baseContent?: BinaryNode[];
    authState: {
        keys: SignalKeyStoreWithTransaction;
    };
};
/** Whether a stored tctoken timestamp has fallen outside the rolling freshness window. */
export declare function isTcTokenExpired(timestamp: string | number | null | undefined): boolean;
/** Whether a newly-received token is fresh enough to overwrite the currently stored one. */
export declare function shouldSendNewTcToken(senderTimestamp: number | undefined): boolean;
export declare function buildTcTokenFromJid({ authState, jid, baseContent }: TcTokenParams): Promise<BinaryNode[] | undefined>;
export {};
//# sourceMappingURL=tc-token-utils.d.ts.map
