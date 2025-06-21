// src/components/ui/dialog.tsx (Simplified to remove Radix UI dependency for build)
"use client"

import * as React from "react"
// import { X } from "lucide-react" // Removed X as it's not used in the dummy version
import { cn } from "@/lib/utils"

// Dummy Dialog component
const Dialog = ({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null;
  // This is a very basic representation. Real dialogs are much more complex.
  // The onOpenChange is not directly used here but kept for API compatibility with how ProfilePage uses it.
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center" onClick={() => onOpenChange?.(false)}>
        {/* This is a placeholder for DialogPortal and DialogOverlay functionality */}
        {children}
    </div>
  );
};
Dialog.displayName = "Dialog"


// Dummy DialogContent component
const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {onEscapeKeyDown?: () => void; onPointerDownOutside?: () => void;} // Added Radix-like props for compatibility
>(({ className, children, ...props }, ref) => (
    // Stop propagation to prevent Dialog click-outside-to-close from triggering immediately
  <div
    ref={ref}
    className={cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg", className)}
    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog via the overlay's onClick
    {...props}
    >
    {children}
    {/*
      A real DialogClose would typically be a button.
      For now, the ProfilePage's DialogClose uses its own Button.
      We can add a visual X button here if needed, but it won't be Radix's DialogPrimitive.Close
    */}
  </div>
));
DialogContent.displayName = "DialogContent"


// Dummy DialogHeader component
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader"

// Dummy DialogFooter component
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter"

// Dummy DialogTitle component
const DialogTitle = React.forwardRef<
  HTMLHeadingElement, // Changed from ElementRef of DialogPrimitive.Title
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle"

// Dummy DialogDescription component
const DialogDescription = React.forwardRef<
  HTMLParagraphElement, // Changed from ElementRef of DialogPrimitive.Description
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription"

// Dummy DialogClose (not a button, but for API compatibility if used as <DialogClose asChild>)
const DialogClose = React.forwardRef<
    HTMLButtonElement, // Assuming it might be used with a button
    React.ButtonHTMLAttributes<HTMLButtonElement> & {asChild?:boolean}
>(({children, ...props}, ref) => {
    if (props.asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            // Attempt to find onClick and chain it with onOpenChange if Dialog's onOpenChange is available
            // This is a very rough approximation.
            ...children.props,
        } as React.Attributes);
    }
  // This won't render a functional close button on its own without onOpenChange from Dialog.
  // The ProfilePage implements its own close button.
  return <button ref={ref} {...props}>{children || "Close"}</button>;
});
DialogClose.displayName = "DialogClose";


// These are not used by the simplified Dialog, but exported for API compatibility
const DialogTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>; // Dummy
DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>; // Dummy
DialogPortal.displayName = "DialogPortal"

const DialogOverlay = ({ className }: { className?:string }) => <div className={cn("fixed inset-0 z-40 bg-black/50", className)} />; // Dummy overlay
DialogOverlay.displayName = "DialogOverlay"


export {
  Dialog,
  DialogTrigger, // Kept for API compatibility
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose, // Kept for API compatibility
  DialogPortal, // Kept for API compatibility
  DialogOverlay, // Kept for API compatibility
}
