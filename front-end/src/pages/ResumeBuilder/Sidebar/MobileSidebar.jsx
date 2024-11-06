import {Button} from '@/components/ui/button';
import {SlidersHorizontal} from 'lucide-react';
import {SidebarContent} from './SidebarContent';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const MobileSidebar = () => {
    return(
        <Sheet>
            {/* Toggle button */}
            <SheetTrigger className="fixed left-5 top-5 2xl:hidden" asChild >
                <Button>
                <SlidersHorizontal />
                </Button>
            </SheetTrigger>

            {/* Sidebar */}
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle>Resume Settings</SheetTitle>
                    <hr />
                </SheetHeader>

                <SidebarContent />

            </SheetContent>
        </Sheet>
    );
};