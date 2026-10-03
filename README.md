<div align="center">

# @itsmee_aizat.id/baileys2

**WhatsApp Web multi-device library for Node.js**

A maintained Baileys fork with full LID support, every button and interactive message type, rich messages, decrypt handlers and built-in VoIP voice calls.

[![npm version](https://img.shields.io/npm/v/@itsmee_aizat.id/baileys2?style=flat-square&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![npm downloads total](https://img.shields.io/npm/dt/@itsmee_aizat.id/baileys2?style=flat-square&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![npm downloads/month](https://img.shields.io/npm/dm/@itsmee_aizat.id/baileys2?style=flat-square&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![unpacked size](https://img.shields.io/npm/unpacked-size/@itsmee_aizat.id/baileys2?style=flat-square&color=2F855A)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2?activeTab=code)
[![license](https://img.shields.io/npm/l/@itsmee_aizat.id/baileys2?style=flat-square&color=blue)](./LICENSE)
[![node engine](https://img.shields.io/node/v/@itsmee_aizat.id/baileys2?style=flat-square&color=339933)](https://nodejs.org)
[![types](https://img.shields.io/badge/types-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](./lib/index.d.ts)

[![multi-device](https://img.shields.io/badge/multi--device-supported-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![pairing code](https://img.shields.io/badge/pairing--code-supported-25D366?style=flat-square)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![LID](https://img.shields.io/badge/LID-supported-25D366?style=flat-square)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![VoIP](https://img.shields.io/badge/VoIP-voice%20calls-25D366?style=flat-square)](https://www.npmjs.com/package/@itsmee_aizat.id/baileys2)
[![ESM](https://img.shields.io/badge/ESM-ready-3178C6?style=flat-square)](https://nodejs.org/api/esm.html)
[![maintained](https://img.shields.io/badge/maintained-yes-brightgreen?style=flat-square)](https://www.npmjs.com/~itsmee_aizat.id)
[![GitHub](https://img.shields.io/badge/GitHub-%40itsmeeaizat1-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/itsmeeaizat1)
[![GitHub followers](https://img.shields.io/github/followers/itsmeeaizat1?style=flat-square&color=181717&label=followers&logo=github&logoColor=white)](https://github.com/itsmeeaizat1)

</div>

---

## Overview

`@itsmee_aizat.id/baileys2` is a maintained fork of the Baileys WebSocket API for WhatsApp Web multi-device. It connects as an official companion device, needs no browser, and exposes a typed Node.js API for sending and receiving messages, managing groups and newsletters, and placing voice calls.

> ESM only. Use `import` directly, or `await import()` from CommonJS. See [How to Import](#how-to-import).

## Installation

Requires Node.js >= 20.

```bash
npm install @itsmee_aizat.id/baileys2
```

Optional packages for media processing and logging:

```bash
npm install sharp pino
```

## Minimal Example

```js
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@itsmee_aizat.id/baileys2";

const { state, saveCreds } = await useMultiFileAuthState("auth");
const sock = makeWASocket({ auth: state });

sock.ev.on("creds.update", saveCreds);
sock.ev.on("messages.upsert", async ({ messages }) => {
  const m = messages[0];
  if (!m.key.fromMe && m.message) {
    await sock.sendMessage(m.key.remoteJid, { text: "Hello world" });
  }
});
```

More detail in [Quick Start](#quick-start) and [Pairing Code](#pairing-code-no-qr).

## Feature Highlights

| Area | What you get |
|------|--------------|
| Identity | Full **LID** (Linked ID) support alongside standard JID |
| Messages | Text, media, albums, stickers, polls, events, reactions, payments |
| Interactive | Every button type: native flow, templates, lists, carousels, product and shop cards |
| Rich messages | Tables, code blocks, LaTeX, links and unified responses |
| Voice | Built-in **VoIP** module for programmatic voice calls |
| Crypto | Automatic **decrypt handlers** for polls, events, comments and reactions |
| Social | Groups, communities, newsletters (channels), status and group stories |
| Login | QR code or pairing code |

<details>
<summary><strong>Table of Contents</strong></summary>

**Getting Started**
- [Requirements](#requirements)
- [How to Import](#how-to-import)
- [Quick Start](#quick-start)
- [Pairing Code](#pairing-code-no-qr)

**Messages**
- [Text](#text-messages) · [Media](#media-messages) · [Album](#album-multi-media) · [Sticker Pack](#sticker-pack)
- [Reaction, Delete, Pin](#reaction-delete-pin-keep) · [Poll & Event](#poll--event) · [Payment & Order](#payment--order)

**Interactive**
- [List & Button Reply](#list-reply--button-reply) · [Sections](#sections-list-message) · [Buttons](#buttons-plain)
- [Template Buttons](#template-buttons) · [Native Flow](#interactive-buttons-native-flow) · [Carousel](#carousel-raw)
- [Interactive Messages (Aizat Engine)](#interactive-messages-aizat-engine) · [Rich Messages](#rich-messages-aizat-engine)

**VoIP, Groups and Channels**
- [VoIP](#voip-voice-calls) · [Group Management](#group-management) · [Newsletter](#newsletter-channels)
- [Status / Story](#status--wa-story) · [Ephemeral Messages](#ephemeral--disappearing-messages)

**Reference**
- [JID Utilities](#jid-utilities) · [Decrypt Handler](#decrypt-handler) · [In-Memory Store](#in-memory-store) · [Auth State](#auth-state)
- [DisconnectReason](#disconnectreason) · [Browsers](#browsers) · [FAQ](#faq) · [Changelog](#changelog) · [License](#license)

</details>

---

## Credits

| Project | Contribution |
|---------|--------------|
| [@blckrose/baileys](https://www.npmjs.com/package/@blckrose/baileys) | Main base of this library |
| [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) | Original Baileys core |

---

## Requirements

- Node.js >= 20.0.0
- npm or yarn

```bash
npm install @itsmee_aizat.id/baileys2
```

> **Why does `require()` now throw in CJS?** As of v1.5.3, the CJS entry
> point (`index.cjs`) is a static, version-independent shim: calling
> `require('@itsmee_aizat.id/baileys2')` throws immediately with a message pointing you
> to `import` (ESM) or `await import('@itsmee_aizat.id/baileys2')` from CJS. Earlier
> versions (v1.5.1–v1.5.2) tried to bridge synchronously into the ESM build
> using Node's native `require(esm)`, which only worked on Node >=20.19.0 or
> >=22.12.0 — that patch-version gate is gone now, which is also why the
> Node.js requirement dropped back down to `>=20.0.0`. See the
> [FAQ](#faq) for details.

For media features (thumbnails, image processing):
```bash
npm install sharp
```

For logging:
```bash
npm install pino
```

---

## How to Import

### ESM
```js
import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    Browsers,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    fetchLatestBaileysVersion,
    proto
} from '@itsmee_aizat.id/baileys2';
```

### CJS (dynamic import)
```js
// require('@itsmee_aizat.id/baileys2') throws by design as of v1.5.3 — see FAQ.
// Use a dynamic import instead, inside an async function:
const {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    fetchLatestBaileysVersion,
    proto
} = await import('@itsmee_aizat.id/baileys2');
```

All 317 exports are available directly from the ESM build, and from the
CJS side via `await import('@itsmee_aizat.id/baileys2')` — no `await ready`, no
loading a function first just to "unlock" the rest. Direct synchronous
`require()` is intentionally unsupported since v1.5.3 (see
[Changelog](#changelog)).

---

## Quick Start

```js
import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    fetchLatestBaileysVersion
} from '@itsmee_aizat.id/baileys2';
import { Boom } from '@hapi/boom';
import pino from 'pino';

const logger = pino({ level: 'silent' });
const store = makeInMemoryStore({});
store.readFromFile('./data/store.json');
setInterval(() => store.writeToFile('./data/store.json'), 10_000);

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('./sessions');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        printQRInTerminal: true,
        logger,
        syncFullHistory: false,
        getMessage: async (key) => store.loadMessage(key.remoteJid, key.id)?.message,
        cachedGroupMetadata: async (jid) => store.groupMetadata[jid],
    });

    store.bind(sock.ev);
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'close') {
            const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (code !== DisconnectReason.loggedOut) start();
            else console.log('Logged out. Delete the sessions folder and restart.');
        }
        if (connection === 'open') console.log('Connected!');
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const m = messages[0];
        if (!m.message) return;
        const jid = m.key.remoteJid;
        const text = m.message?.conversation
            || m.message?.extendedTextMessage?.text
            || '';
        if (text === '.ping') await sock.sendMessage(jid, { text: 'pong' }, { quoted: m });
    });
}

start();
```

### Pairing Code (no QR)

```js
const sock = makeWASocket({ printQRInTerminal: false, ...config });

sock.ev.on('connection.update', async ({ connection }) => {
    if (connection === 'connecting' && !sock.authState.creds.registered) {
        const code = await sock.requestPairingCode('6281234567890');
        console.log('Code:', code?.match(/.{1,4}/g)?.join('-'));
    }
});
```

---

## Text Messages

```js
// plain text
await sock.sendMessage(jid, { text: 'hello' });

// with mention
await sock.sendMessage(jid, {
    text: '@628111 hello',
    mentions: ['628111@s.whatsapp.net']
});

// with quoted reply
await sock.sendMessage(jid, { text: 'reply' }, { quoted: m });

// edit message
await sock.sendMessage(jid, { text: 'new text', edit: m.key });

// forward
await sock.sendMessage(jid, { forward: m });
```

---

## Media Messages

```js
// image
await sock.sendMessage(jid, { image: { url: 'https://...' }, caption: 'caption' });
await sock.sendMessage(jid, { image: readFileSync('./img.jpg'), caption: 'caption' });

// video
await sock.sendMessage(jid, { video: { url: 'https://...' }, caption: 'caption' });

// regular audio
await sock.sendMessage(jid, {
    audio: { url: 'https://...' },
    mimetype: 'audio/mp4'
});

// voice note (PTT)
await sock.sendMessage(jid, {
    audio: { url: 'https://...' },
    mimetype: 'audio/ogg; codecs=opus',
    ptt: true
});

// video note (PTV / circular)
await sock.sendMessage(jid, {
    video: { url: 'https://...' },
    ptv: true
});

// document
await sock.sendMessage(jid, {
    document: { url: 'https://...' },
    mimetype: 'application/pdf',
    fileName: 'file.pdf'
});

// sticker
await sock.sendMessage(jid, { sticker: readFileSync('./sticker.webp') });

// contact
await sock.sendMessage(jid, {
    contacts: {
        displayName: 'Name',
        contacts: [{ vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Name\nTEL:+62811\nEND:VCARD' }]
    }
});

// location
await sock.sendMessage(jid, {
    location: {
        degreesLatitude: -6.200000,
        degreesLongitude: 106.816666,
        name: 'Jakarta',
        address: 'Jakarta, Indonesia'
    }
});
```

---

## Album (Multi-Media)

Send several images/videos at once in a single album:

```js
await sock.sendMessage(jid, {
    album: [
        { image: { url: 'https://...' }, caption: 'photo 1' },
        { image: readFileSync('./img.jpg'), caption: 'photo 2' },
        { video: { url: 'https://...' }, caption: 'video 1' },
    ]
}, { quoted: m });
```

Images and videos can be freely mixed. Each item can have its own caption.

---

## Sticker Pack

Send a sticker pack to a chat:

```js
// Requires: npm install fflate sharp
await sock.sendMessage(jid, {
    stickerPack: {
        name: 'Pack Name',
        publisher: 'Publisher',
        packId: 'unique-pack-id',           // optional, auto-generated if omitted
        description: 'Pack description',    // optional
        cover: readFileSync('./cover.webp'), // optional
        stickers: [
            { data: readFileSync('./sticker1.webp') },
            { data: readFileSync('./sticker2.jpg') }, // auto-converted to webp
            { data: readFileSync('./animated.webp') }, // animated is supported too
        ]
    }
});
```

Limit: 1–120 stickers per pack. Input formats: webp, jpg, png (auto-converted). Animated webp is supported.

---

## Reaction, Delete, Pin, Keep

```js
// react
await sock.sendMessage(jid, {
    react: { text: '👍', key: m.key }
});

// remove reaction
await sock.sendMessage(jid, {
    react: { text: '', key: m.key }
});

// delete message (requires admin in groups)
await sock.sendMessage(jid, { delete: m.key });

// pin message (type: 1=86400s, 2=604800s, 3=2592000s, 5=unpin)
await sock.sendMessage(jid, {
    pin: { key: m.key, type: 1, time: 86400 }
});

// keep message (save to starred)
await sock.sendMessage(jid, {
    keep: { key: m.key, type: 1 }
});
```

---

## Poll & Event

```js
// single-choice poll
await sock.sendMessage(jid, {
    poll: {
        name: 'Pick one:',
        values: ['Option A', 'Option B', 'Option C'],
        selectableCount: 1
    }
});

// multi-select poll
await sock.sendMessage(jid, {
    poll: {
        name: 'Pick several:',
        values: ['A', 'B', 'C'],
        selectableCount: 0  // 0 = all selectable
    }
});

// poll for an announcement community group
await sock.sendMessage(jid, {
    poll: {
        name: 'Vote:',
        values: ['Yes', 'No'],
        selectableCount: 1,
        toAnnouncementGroup: true
    }
});

// poll result (snapshot)
await sock.sendMessage(jid, {
    pollResult: {
        name: 'Poll Name',
        values: [
            ['Option A', 42],
            ['Option B', 17],
        ]
    }
});

// event
await sock.sendMessage(jid, {
    event: {
        name: 'Event Name',
        description: 'Event description',
        startDate: new Date('2026-07-01T09:00:00+07:00'),
        endDate: new Date('2026-07-01T17:00:00+07:00'),
        location: {
            degreesLatitude: -6.2,
            degreesLongitude: 106.8,
            name: 'Jakarta Convention Center'
        },
        isCancelled: false,
        extraGuestsAllowed: true,
    }
});
```

---

## Payment & Order

```js
// request payment
await sock.sendMessage(jid, {
    payment: {
        currency: 'IDR',
        amount: 50000,
        offset: 0,
        expiry: Math.floor(Date.now() / 1000) + 86400,
        from: '628111@s.whatsapp.net',
        note: 'Please pay',
    }
});

// payment invite
await sock.sendMessage(jid, {
    paymentInvite: {
        type: 2,
        expiry: Math.floor(Date.now() / 1000) + 86400
    }
});
```

---

## Scheduled Call

```js
await sock.sendMessage(jid, {
    call: {
        name: 'Weekly Meeting',
        type: 1,  // 1 = voice, 2 = video
        time: Date.now() + 3600000
    }
});
```

---

## VoIP (Voice Calls)

`@itsmee_aizat.id/baileys2` ships a complete VoIP module (`lib/Voip/`) that lets your
bot make and handle **WhatsApp voice calls** programmatically.

> **⚠️ Additional requirement:** VoIP requires `@roamhq/wrtc` (a native
> WebRTC addon that needs a C++ compiler) and runs on desktop/server
> Node.js environments with access to native WebRTC libraries. It will not
> work on shared hosting without a build toolchain (e.g. Pterodactyl
> without a compiler).

```bash
npm install @roamhq/wrtc
```

### Setting up VoipClient

```js
import { VoipClient } from '@itsmee_aizat.id/baileys2/lib/Voip/index.js';
// or CJS:
const { VoipClient } = require('@itsmee_aizat.id/baileys2/lib/Voip/index.js');

const voip = new VoipClient(sock, creds);

// Required: connect before you can make or receive calls
await voip.connect();
```

### Making a Call

```js
// Voice call to a WhatsApp number
const call = await voip.call('628xxxxxxxxx@s.whatsapp.net', {
    audio: true,   // enable audio (default: true)
    video: false,  // video call (default: false)
});

// Event when the call is answered
call.on('accepted', () => {
    console.log('Call accepted!');
});

// Event when the call ends
call.on('ended', (reason) => {
    console.log('Call ended:', reason);
});

// Error event
call.on('error', (err) => {
    console.error('VoIP error:', err);
});

// End the call manually
call.end();

// Mute/unmute microphone
call.mute(true);   // mute
call.mute(false);  // unmute
```

### Streaming Audio Into a Call

```js
import { readFileSync } from 'fs';

const call = await voip.call('628xxxxxxxxx@s.whatsapp.net');

call.on('accepted', () => {
    // Stream an audio file (PCM/WAV) into the call
    const audioBuffer = readFileSync('./audio.wav');
    call.sendAudio(audioBuffer);
});
```

### Handling Incoming Calls

```js
// Handle via Baileys' built-in 'call' event
sock.ev.on('call', async ([callEvent]) => {
    if (callEvent.status === 'offer') {
        // Reject the incoming call
        await sock.rejectCall(callEvent.id, callEvent.from);

        // Or: answer via VoipClient
        // const activeCall = await voip.accept(callEvent);
    }
});
```

### Disconnecting VoIP

```js
// Close the VoIP connection when the bot shuts down
voip.disconnect();
```

---

## Group Invite & Newsletter Admin Invite

```js
// group invite
const code = await sock.groupInviteCode(groupJid);
await sock.sendMessage(jid, {
    groupInvite: {
        inviteCode: code,
        inviteExpiration: Math.floor(Date.now() / 1000) + 86400 * 3,
        jid: groupJid,
        subject: 'Group Name',
        text: 'Join us!'
    }
});

// newsletter admin invite
await sock.sendMessage(jid, {
    adminInvite: {
        jid: '123456@newsletter',
        name: 'Channel Name',
        caption: 'Become an admin of our channel!',
        expiration: Math.floor(Date.now() / 1000) + 86400 * 7
    }
});
```

---

## Share Phone & Limit Sharing

```js
// share phone number
await sock.sendMessage(jid, { sharePhoneNumber: true });

// request phone number
await sock.sendMessage(jid, { requestPhoneNumber: true });

// restrict sharing (privacy)
await sock.sendMessage(jid, { limitSharing: true });
await sock.sendMessage(jid, { limitSharing: false }); // lift the restriction
```

---

## List Reply & Button Reply

For replying to incoming interactive messages:

```js
// reply to a list (single_select)
await sock.sendMessage(jid, {
    buttonReply: { title: 'Item Title', description: 'Description', rowId: 'row_id' },
    type: 'list'
});

// reply to a template button
await sock.sendMessage(jid, {
    buttonReply: { displayText: 'Button Text', id: 'button_id', index: 0 },
    type: 'template'
});

// reply to a plain button
await sock.sendMessage(jid, {
    buttonReply: { id: 'button_id', displayText: 'Button Text' },
    type: 'plain'
});

// reply to a native flow / interactive button
await sock.sendMessage(jid, {
    buttonReply: {
        displayText: 'Text',
        nativeFlows: {
            name: 'quick_reply',
            paramsJson: JSON.stringify({ id: 'btn_id' }),
            version: 1
        }
    },
    type: 'interactive'
});

// list response (listReply)
await sock.sendMessage(jid, {
    listReply: {
        singleSelectReply: { selectedRowId: 'row_id' },
        title: 'Selection',
        listType: 1
    }
});
```

---

## Sections (List Message)

```js
await sock.sendMessage(jid, {
    sections: [
        {
            title: 'Category 1',
            rows: [
                { title: 'Item A', description: 'Description A', id: 'item_a' },
                { title: 'Item B', description: 'Description B', id: 'item_b' },
            ]
        },
        {
            title: 'Category 2',
            rows: [
                { title: 'Item C', id: 'item_c' },
            ]
        }
    ],
    title: 'List Title',
    buttonText: 'View Options',
    text: 'Pick one:',
    footer: 'footer text',
    mentions: ['628111@s.whatsapp.net'],
}, { quoted: m });
```

---

## Product List

```js
await sock.sendMessage(jid, {
    productList: [
        {
            title: 'Product Category',
            products: [
                { productId: 'prod_1' },
                { productId: 'prod_2' },
            ]
        }
    ],
    businessOwnerJid: '628111@s.whatsapp.net',
    title: 'Catalog',
    buttonText: 'View Products',
    text: 'Our products:',
    footer: 'footer',
    thumbnail: readFileSync('./thumb.jpg'),
}, { quoted: m });
```

---

## Buttons (Plain)

```js
await sock.sendMessage(jid, {
    buttons: [
        { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
        { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
        { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 },
    ],
    text: 'Choose:',
    footer: 'footer',
    mentions: ['628111@s.whatsapp.net'],
}, { quoted: m });
```

---

## Template Buttons

```js
await sock.sendMessage(jid, {
    templateButtons: [
        {
            urlButton: {
                displayText: 'Open Website',
                url: 'https://github.com'
            }
        },
        {
            callButton: {
                displayText: 'Call',
                phoneNumber: '+6281234567890'
            }
        },
        {
            quickReplyButton: {
                displayText: 'Reply',
                id: 'reply_id'
            }
        }
    ],
    text: 'Template button:',
    caption: 'caption',
    footer: 'footer',
}, { quoted: m });
```

---

## Interactive Buttons (Native Flow)

The most flexible option, supporting every modern WA button type:

```js
await sock.sendMessage(jid, {
    interactiveButtons: [
        // quick reply
        {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: 'Yes', id: 'yes' })
        },
        // open a URL
        {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: 'Open Link',
                url: 'https://github.com',
                merchant_url: 'https://github.com'
            })
        },
        // call
        {
            name: 'cta_call',
            buttonParamsJson: JSON.stringify({
                display_text: 'Contact',
                phone_number: '6281234567890'
            })
        },
        // copy text
        {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
                display_text: 'Copy Code',
                id: 'copy_id',
                copy_code: 'CODE123'
            })
        },
        // send location
        // (v1.5.3+: the shorthand `{ type: 'location' }` also resolves correctly)
        { name: 'send_location', buttonParamsJson: '' },
        // address message
        { name: 'address_message', buttonParamsJson: '' },
        // dropdown / single select
        {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: 'Open Menu',
                sections: [{
                    title: 'Options',
                    rows: [
                        { title: 'Menu 1', description: 'desc', id: 'menu1' },
                        { title: 'Menu 2', id: 'menu2' },
                    ]
                }]
            })
        },
    ],
    text: 'Message body',
    title: 'Header title',
    subtitle: 'Subtitle',
    footer: 'Footer text',
    // header media (optional, pick one)
    image: { url: 'https://...' },
    // video: { url: 'https://...' },
    // document: { url: 'https://...' },
    mentions: ['628111@s.whatsapp.net'],
}, { quoted: m });
```

> **Buttons not rendering?** If you're on a version older than v1.5.3, see
> the critical fix noted in the [Changelog](#changelog) — a shadowed
> `sendMessage` key meant the button wrapper was never attached for any
> button type. Upgrading resolves it.

### With raw `generateWAMessageFromContent`

For full control over the proto structure:

```js
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@itsmee_aizat.id/baileys2';

const media = await prepareWAMessageMedia(
    { image: { url: 'https://...' } },
    { upload: sock.waUploadToServer }
);

const msg = generateWAMessageFromContent(jid, {
    interactiveMessage: proto.Message.InteractiveMessage.create({
        body: { text: 'Message body' },
        footer: { text: 'Footer' },
        header: {
            title: 'Title',
            hasMediaAttachment: true,
            ...media
        },
        nativeFlowMessage: {
            buttons: [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'OK', id: 'ok' }) },
                { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Link', url: 'https://...' }) },
            ]
        }
    })
}, { userJid: sock.user.id, quoted: m });

await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
```

---

## Shop, Collection, Cards

```js
// shop storefront
await sock.sendMessage(jid, {
    shop: { surface: 1, id: 'SHOP_ID' },
    text: 'Visit the shop',
    title: 'Our Shop',
    footer: 'Available now'
});
// or the old style: shop: 1, id: 'SHOP_ID'

// collection
await sock.sendMessage(jid, {
    collection: {
        bizJid: '628111@s.whatsapp.net',
        id: 'COLLECTION_ID',
        version: 1
    },
    text: 'Latest collection',
    title: 'Collection',
    footer: 'Check it out'
});

// cards (shorthand via sendMessage)
await sock.sendMessage(jid, {
    cards: [
        {
            title: 'Product A',
            body: 'Price: Rp 100,000',
            footer: 'footer',
            image: { url: 'https://...' },
            buttons: [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy', id: 'buy_a' }) }
            ]
        },
        {
            title: 'Product B',
            body: 'Price: Rp 150,000',
            image: { url: 'https://...' },
            buttons: [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy', id: 'buy_b' }) }
            ]
        }
    ],
    text: 'Choose a product:',
    footer: 'footer'
});
```

---

## Carousel (Raw)

For a carousel with media on each card, use `generateWAMessageFromContent`:

```js
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@itsmee_aizat.id/baileys2';

async function makeCard(imageUrl, bodyText, buttons) {
    const media = await prepareWAMessageMedia(
        { image: { url: imageUrl } },
        { upload: sock.waUploadToServer }
    );
    return proto.Message.InteractiveMessage.create({
        body: { text: bodyText },
        footer: { text: '' },
        header: { title: '', hasMediaAttachment: true, ...media },
        nativeFlowMessage: { buttons }
    });
}

const cards = await Promise.all([
    makeCard('https://.../a.jpg', 'Product A\nRp 100,000', [
        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy A', id: 'buy_a' }) },
        { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Details', url: 'https://...', merchant_url: 'https://...' }) }
    ]),
    makeCard('https://.../b.jpg', 'Product B\nRp 150,000', [
        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy B', id: 'buy_b' }) }
    ]),
]);

const msg = generateWAMessageFromContent(jid, {
    interactiveMessage: proto.Message.InteractiveMessage.create({
        body: { text: 'Choose a product:' },
        footer: { text: 'footer' },
        header: { title: '', hasMediaAttachment: false },
        carouselMessage: {
            cards,
            messageVersion: 1,
            carouselCardType: 1
        }
    })
}, { userJid: sock.user.id, quoted: m });

await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
```

---

## Interactive Messages (Aizat Engine)

For cases where you need media + buttons via `sendMessage` with a more
compact format:

```js
// Aizat Engine automatically detects the type and handles the upload
await sock.sendMessage(jid, {
    interactiveMessage: {
        title: 'Header Title',
        footer: 'Footer',
        image: { url: 'https://...' },    // or video/document
        buttons: [
            { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'A', id: 'a' }) }
        ],
        contextInfo: {
            mentionedJid: ['628111@s.whatsapp.net']
        },
        externalAdReply: {
            title: 'Ad Title',
            body: 'Ad Body',
            mediaUrl: 'https://...',
            sourceUrl: 'https://...'
        }
    }
}, { quoted: m });
```

---

## Rich Messages (Aizat Engine)

All of the functions below are available directly on the `sock` object:

### Table

```js
// simple table
await sock.sendTable(
    jid,
    'Table Title',
    ['Column A', 'Column B', 'Column C'],
    [
        ['data 1', 'data 2', 'data 3'],
        ['data 4', 'data 5', 'data 6'],
    ],
    m,       // quoted (optional)
    {}       // options
);

// table v2 (object format)
await sock.sendTableV2(
    jid,
    {
        title: 'Title',
        headers: ['A', 'B'],
        rows: [['1', '2'], ['3', '4']],
        footer: 'optional footer'
    },
    m,
    {}
);
```

### List

```js
await sock.sendList(
    jid,
    'List Title',
    ['first item', 'second item', 'third item'],
    m,
    {}
);
```

### Code Block

```js
// code block v1
await sock.sendCodeBlock(
    jid,
    {
        language: 'javascript',  // js, python, cpp, go, rust, lua, css, html, bash, etc.
        code: 'console.log("hello world")'
    },
    m,
    {}
);

// code block v2 (with title)
await sock.sendCodeBlockV2(
    jid,
    {
        language: 'python',
        title: 'Python Example',
        code: 'print("hello world")'
    },
    m,
    {}
);
```

### Link

```js
// link v1
await sock.sendLink(
    jid,
    'Message text',
    [
        {
            url: 'https://github.com',
            title: 'GitHub',
            description: 'Link description'
        }
    ],
    m,
    {}
);

// link v2
await sock.sendLinkV2(jid, 'Text', links, m, {});
```

### LaTeX

```js
// LaTeX text (rendered on the WA side)
await sock.sendLatex(
    jid,
    m,
    { formula: 'E = mc^2', caption: 'Einstein\'s formula' }
);

// LaTeX as an image (requires a render function)
await sock.sendLatexImage(
    jid,
    m,
    { formula: '\\int_0^\\infty e^{-x} dx = 1', caption: 'Integral' },
    renderLatexToPng,   // custom function to render LaTeX → PNG buffer
    sock.waUploadToServer
);

// LaTeX inline image
await sock.sendLatexInlineImage(jid, m, options, renderFn, uploadFn);
```

### Rich Message (combined)

```js
await sock.sendRichMessage(
    jid,
    [
        { type: 'text', text: 'Intro text' },
        { type: 'code', language: 'js', code: 'const x = 1 + 1;' },
        { type: 'list', title: 'List', items: ['a', 'b', 'c'] },
        { type: 'table', title: 'Data', headers: ['K', 'V'], rows: [['key', 'val']] },
        { type: 'link', text: 'Info', links: [{ url: 'https://...', title: 'Title' }] }
    ],
    m,
    {}
);
```

### Unified Response

For replying to a bot response message:

```js
const captured = await sock.captureUnifiedResponse(jid, m);
await sock.sendUnifiedResponse(jid, m, captured);
```

### Link Preview

```js
await sock.sendPreview(jid, {
    text: 'Description',
    url: 'https://github.com',
    title: 'Title',
    description: 'Preview description',
    image: 'https://.../preview.jpg',  // or a Buffer
    matchedText: 'https://github.com'
}, { quoted: m });
```

---

## Group Story / Group Status

```js
// send a status to a specific group
await sock.swgc(groupJid, { text: 'Group status!' });
await sock.swgc(groupJid, { image: { url: 'https://...' }, caption: 'Status' });

// shorthand for sendStatusWhatsApp
await sock.sendStatusMention({ text: 'Status!' }, [groupJid, userJid]);
```

---

## Status / WA Story

```js
// send to all contacts
await sock.sendStatusWhatsApp({ text: 'Status!' });
await sock.sendStatusWhatsApp({ image: { url: 'https://...' }, caption: 'Caption' });

// send to specific contacts/groups
await sock.sendStatusWhatsApp(
    { text: 'Just for this group!' },
    ['628111@s.whatsapp.net', groupJid]
);

// alias
await sock.sendStatusMention({ text: 'hello' }, jids);
```

---

## Ephemeral / Disappearing Messages

```js
// enable disappearing messages in a chat/group
await sock.sendMessage(jid, {
    disappearingMessagesInChat: true
    // or: 86400, 604800, 2592000 (duration in seconds)
});

// disable
await sock.sendMessage(jid, { disappearingMessagesInChat: false });

// check a group's ephemeral duration
const expiration = await sock.getEphemeralGroup(groupJid);
// returns: 0 | 86400 | 604800 | 2592000

// sendMessage automatically follows the group's ephemeral setting —
// no need to set ephemeralExpiration manually
```

---

## Group Management

```js
// metadata
const meta = await sock.groupMetadata(jid);

// create a group
const { id } = await sock.groupCreate('Group Name', [
    '628111@s.whatsapp.net',
    '628222@s.whatsapp.net'
]);

// manage participants
await sock.groupParticipantsUpdate(jid, ['628111@s.whatsapp.net'], 'add');
await sock.groupParticipantsUpdate(jid, ['628111@s.whatsapp.net'], 'remove');
await sock.groupParticipantsUpdate(jid, ['628111@s.whatsapp.net'], 'promote');
await sock.groupParticipantsUpdate(jid, ['628111@s.whatsapp.net'], 'demote');

// update group info
await sock.groupUpdateSubject(jid, 'New Name');
await sock.groupUpdateDescription(jid, 'New description');

// group settings
await sock.groupSettingUpdate(jid, 'announcement');  // only admins can send
await sock.groupSettingUpdate(jid, 'not_announcement');
await sock.groupSettingUpdate(jid, 'locked');         // only admins can edit info
await sock.groupSettingUpdate(jid, 'unlocked');

// group ephemeral
await sock.groupToggleEphemeral(jid, 86400);   // enable
await sock.groupToggleEphemeral(jid, 0);       // disable

// invite
const code = await sock.groupInviteCode(jid);
await sock.groupAcceptInvite(code);
await sock.groupRevokeInvite(jid);

// group profile picture
await sock.updateProfilePicture(jid, readFileSync('./photo.jpg'));
await sock.removeProfilePicture(jid);

// leave
await sock.groupLeave(jid);
```

---

## Newsletter (Channels)

```js
// channel info
const info = await sock.getNewsletterInfo('jid@newsletter');
const infoByInvite = await sock.getNewsletterInfoFromInvite('https://whatsapp.com/channel/...');

// create a new channel
const nl = await sock.createNewsletter({
    name: 'Channel Name',
    description: 'Channel description',
    picture: readFileSync('./photo.jpg')  // optional
});

// manage
await sock.followNewsletter('jid@newsletter');
await sock.unfollowNewsletter('jid@newsletter');
await sock.muteNewsletter('jid@newsletter', true);
await sock.updateNewsletterMetadata('jid@newsletter', { name: 'New Name', description: 'New desc' });

// post to a channel
await sock.sendMessage('jid@newsletter', { text: 'First post' });
await sock.sendMessage('jid@newsletter', { image: { url: 'https://...' }, caption: 'Photo' });

// react to a channel post
await sock.newsletterReactMessage('jid@newsletter', serverId, '👍');
```

---

## JID Utilities

```js
import {
    jidNormalizedUser,
    jidDecode,
    jidEncode,
    normalizeMentionJid,
    resolveJid,
    resolveJids,
    areJidsSameUser,
    isJidGroup,
    isJidBroadcast,
    isJidNewsletter,
    isJidStatusBroadcast,
    isJidBot,
    isJidMetaAI,
    isJidUser,
    isLidUser,
    isPnUser
} from '@itsmee_aizat.id/baileys2';

jidNormalizedUser('628111@s.whatsapp.net:0')   // '628111@s.whatsapp.net'
jidDecode('628111@s.whatsapp.net')              // { user: '628111', server: 's.whatsapp.net' }
jidEncode('628111', 's.whatsapp.net')           // '628111@s.whatsapp.net'
normalizeMentionJid('628111@lid')               // '628111@s.whatsapp.net'
resolveJid('6281234567890')                     // '6281234567890@s.whatsapp.net'
resolveJids(['628111', '628222'])               // ['628111@s.whatsapp.net', '628222@s.whatsapp.net']
areJidsSameUser('628111@s.whatsapp.net', '628111@lid')  // true
isJidGroup('120363000@g.us')                    // true
isJidNewsletter('123@newsletter')               // true
isLidUser('628111@lid')                         // true
```

---

## Decrypt Handler

Functions for decrypting encrypted messages. All of them are already wired
into `processMessage` automatically — no extra setup needed. The following
events are emitted automatically:

- `decryptEventEdit` → emits `messages.update`
- `decryptComment` → emits `messages.upsert`
- `decryptReaction` → emits `messages.upsert`

If you need to decrypt manually:

```js
import {
    decryptPollVote,
    decryptEventResponse,
    decryptEventEdit,
    decryptComment,
    decryptReaction
} from '@itsmee_aizat.id/baileys2';

// poll vote
const vote = decryptPollVote(
    { encPayload, encIv },
    { pollCreatorJid, pollMsgId, pollEncKey, voterJid }
);

// event response
const response = decryptEventResponse(
    { encPayload, encIv },
    { eventCreatorJid, eventMsgId, eventEncKey, responderJid }
);

// event edit (v1.5.0+)
const edit = decryptEventEdit(
    { encPayload, encIv },
    { eventCreatorJid, eventMsgId, eventEncKey, responderJid }
);

// comment (v1.5.0+)
const comment = decryptComment(
    { encPayload, encIv },
    { commentCreatorJid, commentMsgId, commentEncKey, commentJid }
);

// reaction (v1.5.0+)
const reaction = decryptReaction(
    { encPayload, encIv },
    { reactionCreatorJid, reactionMsgId, reactionEncKey, reactionJid }
);
```

---

## In-Memory Store

```js
import { makeInMemoryStore } from '@itsmee_aizat.id/baileys2';
import pino from 'pino';

const store = makeInMemoryStore({ logger: pino({ level: 'silent' }) });

// read/write to a file
store.readFromFile('./data/store.json');
setInterval(() => store.writeToFile('./data/store.json'), 10_000);

const sock = makeWASocket({
    auth: state,
    getMessage: async (key) => store.loadMessage(key.remoteJid, key.id)?.message,
    cachedGroupMetadata: async (jid) => store.groupMetadata[jid]
});

store.bind(sock.ev);

// accessing data
store.chats                          // all chats
store.messages['jid@g.us'].array    // all messages for a given jid
store.contacts                       // all contacts
store.groupMetadata                  // group metadata that's been fetched
store.loadMessage(jid, id)           // find a message by id
```

---

## Auth State

```js
import {
    useMultiFileAuthState,
    useSingleFileAuthState,
    useMongoFileAuthState,
    makeCacheableSignalKeyStore,
    addTransactionCapability,
    initAuthCreds
} from '@itsmee_aizat.id/baileys2';

// default — save to a folder
const { state, saveCreds } = await useMultiFileAuthState('./sessions');

// save to a single JSON file
const { state, saveCreds } = await useSingleFileAuthState('./session.json');

// MongoDB
const { state, saveCreds } = await useMongoFileAuthState(mongoCollection);

// with caching (better performance)
const sock = makeWASocket({
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger)
    }
});
```

---

## Handling Incoming Messages

```js
sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const m of messages) {
        if (!m.message) continue;
        if (m.key.fromMe) continue;   // skip our own messages

        const jid = m.key.remoteJid;
        const sender = m.key.participant || jid;    // participant for groups

        // get text content
        const text = m.message?.conversation
            || m.message?.extendedTextMessage?.text
            || m.message?.imageMessage?.caption
            || m.message?.videoMessage?.caption
            || '';

        // check for a quoted message
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedKey = {
            id: m.message?.extendedTextMessage?.contextInfo?.stanzaId,
            remoteJid: m.message?.extendedTextMessage?.contextInfo?.remoteJid || jid,
            participant: m.message?.extendedTextMessage?.contextInfo?.participant
        };

        // download media
        if (m.message?.imageMessage) {
            const buffer = await downloadMediaMessage(m, 'buffer', {});
        }
    }
});

// message status updates (read receipts, etc.)
sock.ev.on('messages.update', (updates) => {
    for (const { key, update } of updates) {
        console.log(key, update);
    }
});

// reaction
sock.ev.on('messages.reaction', (reactions) => {
    for (const { key, reaction } of reactions) {
        console.log(key, reaction.text);
    }
});

// poll update
sock.ev.on('messages.upsert', ({ messages }) => {
    for (const m of messages) {
        if (m.message?.pollUpdateMessage) {
            // handle poll vote
        }
    }
});
```

---

## Typography & contextInfo

```js
// bold
await sock.sendMessage(jid, { text: '*bold text*' });

// italic
await sock.sendMessage(jid, { text: '_italic text_' });

// strikethrough
await sock.sendMessage(jid, { text: '~strikethrough text~' });

// monospace
await sock.sendMessage(jid, { text: '`code`' });

// message with externalAdReply (ad-banner style)
await sock.sendMessage(jid, {
    text: 'Main text',
    contextInfo: {
        externalAdReply: {
            title: 'Banner Title',
            body: 'Description',
            mediaType: 1,
            thumbnailUrl: 'https://.../thumb.jpg',
            sourceUrl: 'https://...',
            mediaUrl: 'https://...',
            showAdAttribution: false,
            renderLargerThumbnail: true
        }
    }
});

// forward a message with a score
await sock.sendMessage(jid, {
    forward: m,
    force: true  // force a forward even if already forwarded before
});
```

---

## DisconnectReason

```js
import { DisconnectReason } from '@itsmee_aizat.id/baileys2';

// all values
DisconnectReason.connectionClosed       // 428
DisconnectReason.connectionLost         // 408
DisconnectReason.connectionReplaced     // 440
DisconnectReason.timedOut              // 408
DisconnectReason.loggedOut             // 401
DisconnectReason.badSession            // 500
DisconnectReason.connectionError       // 500
DisconnectReason.multideviceMismatch   // 411
DisconnectReason.forbidden             // 403
DisconnectReason.unavailableService    // 503
DisconnectReason.restartRequired       // 515

// example usage
sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
        const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) start();
        else console.log('Session expired, please scan again');
    }
});
```

---

## Browsers

```js
import { Browsers } from '@itsmee_aizat.id/baileys2';

// available browser presets
Browsers.ubuntu('Chrome')
Browsers.macOS('Desktop')
Browsers.windows('Edge')
Browsers.baileys('Desktop')    // default
Browsers.appropriate('Chrome')

// use in config
const sock = makeWASocket({
    browser: Browsers.ubuntu('Chrome'),
    ...
});
```

---

## FAQ

**Buttons/interactive not showing up in groups**

Add `additionalNodes` when calling `relayMessage`:

```js
await sock.relayMessage(jid, msg.message, {
    messageId: msg.key.id,
    additionalNodes: [{
        tag: 'biz',
        attrs: {},
        content: [{
            tag: 'interactive',
            attrs: { type: 'native_flow', v: '1' },
            content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }]
        }]
    }]
});
```

**LID mentions don't work in groups**

```js
import { normalizeMentionJid } from '@itsmee_aizat.id/baileys2';

const fixedJid = normalizeMentionJid(lidJid);
await sock.sendMessage(groupJid, {
    text: `@${fixedJid.split('@')[0]} hello`,
    mentions: [fixedJid]
});
```

**Session keeps logging out**

- Make sure `sock.ev.on('creds.update', saveCreds)` is wired up
- Don't run two instances against the same session folder
- Delete the session folder and scan again: `rm -rf ./sessions`

**CJS `require()` throws / `require('@itsmee_aizat.id/baileys2')` doesn't work**

As of v1.5.3 this is expected behavior, not a bug: `index.cjs` is a static
shim that immediately throws, pointing you to `import` or
`await import()`, regardless of your Node version. Solution: use
`await import('@itsmee_aizat.id/baileys2')` inside an async function, or convert your
entry file to ESM. There's no synchronous-`require()` workaround anymore —
see [Requirements](#requirements) for the reasoning.

> **Still on v1.5.0 or older?** That version had a different issue —
> non-function constants (`proto`, `BufferJSON`, `DisconnectReason`, etc.)
> only became available after some function had already been `await`-ed,
> so destructuring at the very top of a file threw a "not ready" error.
> Adding `await useMultiFileAuthState()` before touching any constant
> worked around it back then, but that workaround is irrelevant since
> v1.5.1 — upgrading to the latest version is the real fix either way.

**`sharp` error when sending album/stickerPack**

Install sharp: `npm install sharp`

---

## Changelog

### v1.5.3

**⚠️ Critical fix — buttons and `location_button` were never rendering
correctly.** `Socket/messages-send.js` had two `sendMessage:` keys in the
same returned object literal (a leftover from a previous merge). In a JS
object literal the second key silently wins, so the first `sendMessage` —
the only one that actually called `getButtonType()`/`getButtonArgs()` to
attach the `<biz><interactive><native_flow>` wrapper WhatsApp requires for
buttons to render — was 100% dead code. The live `sendMessage`, used for
every `interactiveButtons` send, `carousel`, `product`-with-buttons, and
the generic `buttonsMessage`/`templateMessage`/`listMessage` fallback,
never attached that node at all. **This affected every button type**, not
just `send_location`.
- Removed the dead, shadowed `sendMessage` definition — there's now one
  correct definition.
- Wired `getButtonType()`/`getButtonArgs()` into the live `sendMessage`'s
  dispatch cases (`PRODUCT`, `CAROUSEL`, `INTERACTIVE`,
  `INTERACTIVE_BUTTONS`) and the generic fallback path, so the correct
  button-specific `<biz>` node is attached every time.
- Added a `{ type: 'location' }` / `{ type: 'send_location' }` shorthand to
  `normalizeButtons()` (in both `Socket/aizat.js` and
  `Socket/aizat-advanced.js`) — previously only the fully-spelled-out
  `{ name: 'send_location', buttonParamsJson: '{}' }` form resolved
  correctly.

**Message-retry / session recovery** — a `<receipt type="retry">` can carry
a fresh Signal key bundle for the requesting device; it's now injected
directly instead of tearing the session down for a full renegotiation
round trip. A base-key collision across repeated retries of the same
message (a sign the session is stuck) now forces a fresh session instead
of retrying indefinitely. Matters most in large, busy groups, where more
devices means more decrypt failures and more retry receipts.

**Device-list cache correctness (main fix for lag in large groups)** — the
previous `case 'devices':` handler was a stub that never touched
`userDevicesCache`, so the bot kept using a stale cached device list for
up to 5 minutes after any group member added, removed, or changed a
device — causing extra failed sends and retries. `handleDevicesNotification()`
now properly updates/invalidates the cache, and a mutex protects concurrent
writes to it.

**Trusted-contact token (tctoken) freshness** — expiry now uses a 28-day
rolling window (matching WA Web) instead of never expiring; outgoing
`<tctoken>` now carries a timestamp attribute; an out-of-order or
duplicate notification can no longer overwrite a newer stored token with
an older one.

**Event buffer cleanup** — added `destroy()` to clear timers, history
cache, and listeners on socket close/logout (avoids leaking timers across
reconnects), plus merge/dedupe logic for `pastParticipants` across
history-sync chunks.

**Interactive buttons audited, not changed** — compared feature-by-feature
against the `levvleys` fork (native flow button names, low-level
`<biz><native_flow>` stanza wrapping, proto-level message types); no
functional gap found worth porting. Added English doc comments at the two
key spots documenting how to send a location-request button.

**ESM/CJS cleanup**
- `index.cjs` rewritten: it previously used Node's synchronous
  `require(esm)` to bridge into the ESM build, which only worked on Node
  >=20.19.0 or >=22.12.0 — many hosting panels ship a "Node 22" that's
  still below 22.12, so `require('@itsmee_aizat.id/baileys2')` would fail there with a
  confusing native `ERR_REQUIRE_ESM`. It's now a static,
  version-independent shim that immediately throws a clear message
  pointing to `import` (or `await import()` from CJS).
- `engine-requirements.js` was dead code enforcing the same narrow
  Node-version gate; it's now a no-op (kept in place in case anything
  external still points at the file path).
- `engines.node` in `package.json` relaxed from
  `>=20.19.0 <21.0.0 || >=22.12.0` to `>=20.0.0`, matching upstream
  baileys 7.0.0-rc14's own floor.
- `lib/Voip/index.mjs` was **not** touched — it uses `createRequire()`,
  which has no such version-fragility.

### v1.5.2
- **CJS entry point rewritten from scratch** (`index.cjs`): previously used a
  dynamic `import()` + lazy getter, where non-function constants (`proto`,
  `BufferJSON`, `DisconnectReason`, etc.) only became available after some
  function had already been `await`-ed — destructuring at the very top of
  the file threw a "not ready" error. Now uses Node's native `require(esm)`
  (stable since v20.19.0/v22.12.0) to load `lib/index.js` fully
  synchronously, just like a normal CJS module.
- Node.js requirement raised to `>=20.19.0 <21.0.0 || >=22.12.0` (previously
  only checked the major version `>=20`, which wasn't strict enough — Node
  20.0–20.18 and all of 21.x were actually unsupported).
- `engine-requirements.js` now checks the minor version too, not just the
  major, with a clearer error message.
- **Auto-diagnosis for `ERR_REQUIRE_ASYNC_MODULE`**: if `require(esm)` fails
  because something in the dependency graph has a top-level await (not
  `lib/index.js` itself, but one of its dependencies), `index.cjs` now
  automatically runs a `--experimental-print-required-tla` diagnosis via a
  child process and prints the source file/line straight into the error
  log — no need to run the flag manually.
- **VoIP (voice calls)**: added a complete `lib/Voip/` module —
  `VoipClient` (connect, call, disconnect), `ActiveCall` (events:
  accepted/ended/error, mute, sendAudio), audio streaming into an active
  call, and WhatsApp's WASM engine under `lib/assets/wasm/`. Requires
  `@roamhq/wrtc` to function.
- Added `buttonsMessage.locationMessage` as an interactive header — send
  buttons with a location as the media header (`{ location: {...}, buttons: [...] }`),
  distinct from a standalone `locationMessage`.
- `nativeFlowInfo` on legacy buttons (`buttonId`/`buttonText`) is now
  preserved when converted to `buttonsMessage`, so regular `quick_reply`
  buttons can be mixed with `cta_url`/`cta_call` in a single legacy-format
  message.

### v1.5.0
- Ported `decryptEventEdit`, `decryptComment`, `decryptReaction` and their
  automatic handlers in `processMessage`
- Added `meLid = creds.me?.lid` in `processMessage`
- Quoted messages: `quotedType = EXPLICIT` + `threadId VIEW_REPLIES` in
  groups
- Fixed dual shop API styles: both `{ shop: { surface, id } }` and
  `{ shop: surface, id }` are now supported
- Complete TypeScript declarations for every button/interactive type
- CJS wrapper updated: 183 → 317 exports (`DisconnectReason`, `Browsers`,
  and all utils are now available in CJS)

### v1.4.0
- Fixed `isJidNewsletter` error on lazy-loaded `waUploadToServer`
- Fixed carousel crash `upload is not a function`
- Fixed `ptvMessage` return type
- Added `normalizeMentionJid`, `resolveJid`, `resolveJids`
- Added `getEphemeralGroup` and auto ephemeral detection in `sendMessage`
- Converted `aizat-advanced.js` to proper ESM

### v1.2.1
- Aizat Engine: `handleInteractive`, `handleInteractiveButtons`,
  `handleAlbum`, `handlePayment`, `handleProduct`, `handleEvent`,
  `handleGroupStory`
- Rich messages: `sendTable`, `sendTableV2`, `sendCodeBlock`,
  `sendCodeBlockV2`, `sendLatex`, `sendLatexImage`, `sendLink`,
  `sendLinkV2`, `sendRichMessage`, `sendUnifiedResponse`, `sendPreview`
- Full source maps

### v1.0.0
- Base from blckrose-baileys
- Full LID + JID support
- Every interactive button type (native flow)
- Pairing code, carousel, album
- ESM + CJS dual support

---

## License

<p align="center">
  MIT © 2026 Aizat<br>
  Based on @blckrose/baileys and WhiskeySockets/Baileys © Rajeh Taher (see <a href="LICENSE">LICENSE</a>)<br>
  This project is not affiliated with WhatsApp Inc. or Meta Platforms.
</p>
