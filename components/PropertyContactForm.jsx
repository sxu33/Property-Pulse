"use client";
import addMessage from "@/app/actions/addMessage";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success("Message sent successfully");
  }, [state]);

  if (state.submitted) {
    return (
      <div className="p-8 border border-zinc-200 rounded-3xl text-center bg-zinc-50">
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Message Sent!</h3>
        <p className="text-zinc-500 font-light">
          The property manager will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    session && (
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Contact Host
          </h3>
          <p className="text-zinc-500 text-sm font-light mt-1">
            Usually responds within 24 hours
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="property" defaultValue={property._id} />
          <input type="hidden" name="recipient" defaultValue={property.owner} />

          <div className="space-y-1">
            <Input
              className="h-12 rounded-xl border-zinc-300 focus:ring-zinc-900"
              name="name"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="space-y-1">
            <Input
              className="h-12 rounded-xl border-zinc-300 focus:ring-zinc-900"
              name="email"
              type="email"
              placeholder="Email address"
              required
            />
          </div>

          <div className="space-y-1">
            <Input
              className="h-12 rounded-xl border-zinc-300 focus:ring-zinc-900"
              name="phone"
              placeholder="Phone number"
            />
          </div>

          <div className="space-y-1">
            <Textarea
              className="rounded-xl border-zinc-300 focus:ring-zinc-900 min-h-[120px]"
              name="body"
              placeholder="Say hello or ask a question..."
              required
            />
          </div>

          <Button
            className="w-full h-12 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white font-bold text-lg transition-transform active:scale-[0.98] shadow-none"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <Send className="mr-2" size={18} />
            )}
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
