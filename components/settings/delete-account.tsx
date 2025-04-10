"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "../../components/ui/use-toast"

export function DeleteAccount() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!session?.user?.id) return;

    if (confirmation !== "DELETE") {
      toast({
        title: "Confirmation failed",
        description: 'Please type "DELETE" to confirm account deletion',
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });

      router.push("/goodbye");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button onClick={() => setDialogOpen(true)}>Delete Account</button>
      {dialogOpen && (
        <div>
          <p>Type "DELETE" to confirm:</p>
          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
