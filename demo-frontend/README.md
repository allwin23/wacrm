# WACRM - WhatsApp CRM Interactive Demo

A self-contained, client-side interactive demo of WACRM (WhatsApp CRM) pre-loaded with realistic seed data. Designed for zero-configuration, 100% reliable deployment on Vercel with zero runtime errors.

## ✨ Features Included

- **WhatsApp Shared Team Inbox**: Real-time conversation list, unread badges, filter by status (All, Open, Pending, Closed), live message history, typing and sending messages with **automatic simulated WhatsApp replies**, quick reply snippets (`/intro`, `/pricing`, `/demo`, `/hours`), and Meta template selector.
- **Executive Analytics Dashboard**: KPI metrics (Active Conversations, Average First Response Time, Total Pipeline Value, Broadcast Delivery Rate), weekly traffic volume charts, and recent activity.
- **Contact Management Directory**: Filterable and searchable WhatsApp contact directory with tags (VIP, Enterprise, Inbound Lead), phone numbers, companies, notes, and an interactive "Add Contact" modal.
- **Kanban Sales Pipeline**: Visual deal stages (New Lead, Contacted, Proposal Sent, Negotiation, Won), live stage sum totals ($), deal movement between stages, and a "Create Deal" modal.
- **Broadcast Campaigns**: Bulk WhatsApp marketing notification campaigns, recipient counts, delivery and read rate analytics, and new campaign scheduler.
- **Automations & Workflows**: 24/7 rule-based triggers (welcome flows, after-hours auto-responder, keyword triggers) with one-click active/paused toggles.
- **Settings & WhatsApp Cloud API**: Verified Meta Business Account status, connected WhatsApp phone number, webhook health check, and team members list.
- **Local Persistence & Reset**: State changes (new messages, new contacts, moved deals) persist in `localStorage`. Includes a one-click "Reset Demo Data" button.

## 🚀 How to Deploy on Vercel

1. In your Vercel Dashboard, import this repository.
2. Under **Project Settings** → **General** → **Root Directory**, set the directory to:
   ```
   demo-frontend
   ```
   *(Or `demo-backend` if you prefer, as it is symlinked).*
3. Leave Framework Preset as **Next.js** (or Other).
4. No Environment Variables are needed!
5. Click **Deploy**.
