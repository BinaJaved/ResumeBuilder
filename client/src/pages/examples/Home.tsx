import Home from '../Home'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function HomeExample() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}
