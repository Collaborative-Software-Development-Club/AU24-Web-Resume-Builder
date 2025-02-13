import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function GuestSaveDialog() {
    //Log in and Sign up feature to be added
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Your Resume!</DialogTitle>
          <DialogDescription>
            Sign up or Log in to save your resume
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-3 pb-1">
            <Input id="name" placeholder="Username" className="col-span-3" />
            <Input id="username" placeholder="Password" className="col-span-3" />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Button type="submit" className='bg-blue-600 mx-auto'>Sign Up</Button>
          <hr size="10"/>
          <div className="flex flex-row items-center text-gray-500">
            <p>Already have an account?</p>
            <div className="flex justify-cente mx-auto">
                <Button type="submit" className='bg-blue-600'>Log In</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
