'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { InboxView } from '@/components/inbox/InboxView'
import { DashboardView } from '@/components/dashboard/DashboardView'
import { ContactsView } from '@/components/contacts/ContactsView'
import { PipelinesView } from '@/components/pipelines/PipelinesView'
import { BroadcastsView } from '@/components/broadcasts/BroadcastsView'
import { AutomationsView } from '@/components/automations/AutomationsView'
import { SettingsView } from '@/components/settings/SettingsView'
import { useDemo } from '@/lib/demo-context'

export default function Home() {
  const { activeTab } = useDemo()
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isAddDealOpen, setIsAddDealOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090b]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          onOpenNewContact={() => setIsAddContactOpen(true)}
          onOpenNewDeal={() => setIsAddDealOpen(true)}
        />

        <main className="flex-1 flex overflow-hidden">
          {activeTab === 'inbox' && <InboxView />}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'contacts' && (
            <ContactsView
              isAddModalOpen={isAddContactOpen}
              setIsAddModalOpen={setIsAddContactOpen}
            />
          )}
          {activeTab === 'pipelines' && (
            <PipelinesView
              isAddDealOpen={isAddDealOpen}
              setIsAddDealOpen={setIsAddDealOpen}
            />
          )}
          {activeTab === 'broadcasts' && <BroadcastsView />}
          {activeTab === 'automations' && <AutomationsView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  )
}
