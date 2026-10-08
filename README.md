<div align='center'>AIZAT</div>

<div align="center">

  **AIZAT Baileys** — A WebSockets library for interacting with WhatsApp Web

  Fork of Baileys, curated & maintained by **Aizat**.

</div>

---

## AIZAT Baileys — Build your WhatsApp project your way.

Baileys dengan fitur lengkap, fleksibel, dan cocok untuk berbagai kebutuhan WhatsApp automation — karya **Aizat**.

Kegunaan:
- Membuat WhatsApp Bot / Userbot
- Automation WhatsApp
- Text, Image, Video, Audio/Voice, Document, Sticker, GIF, Contact, Location
- Reaction, Reply, Quoted message, Mention user
- Group management (create, add/remove member, promote/demote admin, info group, invite)
- Channel / Newsletter support + kirim pesan ke Newsletter
- Realtime event (message, connection), QR authentication, pairing code
- Session management, multi-device support, store management, custom handler
- Cocok untuk project Node.js — automation kecil hingga besar

## Install

```bash
npm install @itsmee_aizat.id/baileys2
```

```json
"dependencies": {
  "@itsmee_aizat.id/baileys2": "^2.0.0"
}
```

## Pemakaian

```js
// npm i @itsmee_aizat.id/baileys2
import makeWASocket, { Browsers, useMultiFileAuthState } from '@itsmee_aizat.id/baileys2'

const { state, saveCreds } = await useMultiFileAuthState('./auth')
const sock = makeWASocket({
  browser: Browsers.aizat('Chrome'),
  auth: state,
})
sock.ev.on('connection.update', (u) => { if (u.qr) console.log('QR:', u.qr) })
await sock.sendMessage('62812xxxx@s.whatsapp.net', { text: 'Hello from AIZAT Baileys' })
```

---

<div align="center">

**AIZAT Baileys** — by Aizat

Fork dibangun di atas Baileys (WhiskeySockets, MIT License).

</div>
