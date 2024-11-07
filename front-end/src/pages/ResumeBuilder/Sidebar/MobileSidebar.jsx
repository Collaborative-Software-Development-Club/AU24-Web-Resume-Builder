import {Button} from '@/components/ui/button';
import {SlidersHorizontal} from 'lucide-react';
import {SidebarContent} from './SidebarContent';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const MobileSidebar = ({resume, ordering, setOrdering, toggleSectionVisibility}) => {
    return(
        <Sheet>
            {/* Toggle button */}
            <SheetTrigger className="fixed left-5 top-5 2xl:hidden" asChild >
                <Button>
                <SlidersHorizontal />
                </Button>
            </SheetTrigger>

            {/* Sidebar */}
            <SheetContent side={"left"} className="w-40-">
                <SheetHeader>
                    <SheetTitle>Resume Settings</SheetTitle>
                    <hr />
                </SheetHeader>

                <SidebarContent resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility}/>

            </SheetContent>
        </Sheet>
    );
};