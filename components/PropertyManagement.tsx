"use client"

import { Button } from "@/components/ui/button"
import { cleanupDemoProperties, seedProperties } from "@/utils/actions"
import { useTransition } from "react"
import { toast } from "sonner"

export function PropertyManagement() {
  const [isPending, startTransition] = useTransition()

  const handleCleanup = () => {
    if (!confirm('Are you sure you want to delete all properties? This action cannot be undone.')) {
      return;
    }
    
    startTransition(async () => {
      try {
        const result = await cleanupDemoProperties()
        toast.success(result.message)
      } catch (error) {
        toast.error('Failed to clean up properties')
      }
    })
  }

  const handleSeed = () => {
    startTransition(async () => {
      try {
        const result = await seedProperties()
        toast.success(result.message)
      } catch (error) {
        toast.error('Failed to seed properties')
      }
    })
  }

  return (
    <div className="bg-muted p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Property Management</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleCleanup}
          disabled={isPending}
          variant="destructive"
          size="lg"
          className="flex-1 min-w-[200px] text-lg"
        >
          {isPending ? "Cleaning up..." : "🗑️ Delete All Properties"}
        </Button>
        <Button 
          onClick={handleSeed}
          disabled={isPending}
          variant="default"
          size="lg"
          className="flex-1 min-w-[200px] text-lg"
        >
          {isPending ? "Generating Properties..." : "✨ Generate New Properties"}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Use these buttons to manage your property listings. Delete all properties or generate new demo properties.
      </p>
    </div>
  )
} 