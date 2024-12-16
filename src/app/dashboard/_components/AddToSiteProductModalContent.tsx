"use client"

import { DialogHeader } from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"

export function AddToSiteProductModalContent() {
    return <DialogHeader>
    <DialogTitle className="text-2xl">Start Earning PPP Sales!</DialogTitle>
    <DialogDescription>
      All you need to do is copy the below script into your site and your
      customers will start seeing PPP discounts!
    </DialogDescription>
  </DialogHeader>
}