import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Header } from "@/components"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import styles from "@/styles/main.module.css"

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  )
}
