"use client"

import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    startTransition(() => {
      router.push(`/properties?${params.toString()}`)
    })
  }

  return (
    <div className="mb-6">
      <Input
        placeholder="Search properties..."
        className="max-w-xl"
        defaultValue={searchParams.get('search') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
} 