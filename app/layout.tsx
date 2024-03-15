import './globals.css'
import { Figtree } from 'next/font/google'
import type { Metadata } from 'next'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUser from '@/actions/getSongsByUserId'
import getSongs from '@/actions/getSongs'
import Player from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zpotify',
  description: 'Listen to music!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUser();

  console.log(userSongs)

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
