import { Button } from "@/components/ui/button"
import { cleanupDemoProperties } from "@/utils/actions"
import { useTransition } from "react"
import { toast } from "sonner"

export function CleanupButton() {
  const [isPending, startTransition] = useTransition()

  const handleCleanup = () => {
    startTransition(async () => {
      try {
        const result = await cleanupDemoProperties()
        toast.success(result.message)
      } catch (error) {
        toast.error('Failed to clean up properties')
      }
    })
  }

  return (
    <Button 
      onClick={handleCleanup}
      disabled={isPending}
      variant="destructive"
      size="sm"
    >
      {isPending ? "Cleaning up..." : "Delete All Properties"}
    </Button>
  )
} 