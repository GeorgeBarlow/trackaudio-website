"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FAQModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
}

export function FAQModal({ open, onOpenChange, content }: FAQModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Frequently Asked Questions</DialogTitle>
        </DialogHeader>
        <div className="prose-lg max-[767px]:prose" dangerouslySetInnerHTML={{ __html: content }} />
      </DialogContent>
    </Dialog>
  );
}
