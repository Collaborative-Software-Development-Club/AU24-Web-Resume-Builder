import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
    import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function ContactMethods({contactMethods}) {
    const [editableContactMethods, setEditableContactMethods] = useState(contactMethods.map((contactMethod, index) => ({
        value: contactMethod,
        id: index
    })));
    const count = editableContactMethods.length
    function handleChange(value, id){
        const newArray = editableContactMethods.map(contactMethod => {
            if(contactMethod.id === id){
                return {
                    value: value,
                    id: id 
                }
            }
            return contactMethod
        })
        console.log(newArray)
        setEditableContactMethods(newArray)
    }
    function addNew(){
        setEditableContactMethods([...editableContactMethods, {value: "", id: count}])
    }
    return (
        <div className="relative">
        <div className="flex flex-row gap-2">
            {editableContactMethods.map((contactMethod) => (
                <p className='underline times' key={contactMethod.id}>{contactMethod.value}</p>
            ))}
        </div>
    <Dialog>
      <DialogTrigger asChild>
           <Button className="absolute -right-20 top-0">Edit</Button> 
      </DialogTrigger>
      <EditContactMethods contactMethods={editableContactMethods} handleChange={handleChange} addNew={addNew}/>
    </Dialog>
</div>
    );
}

function EditContactMethods({contactMethods, handleChange, addNew}) {
    console.log(contactMethods)
  return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conctact Methods</DialogTitle>
          <DialogDescription>
            Edit contact methods
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {contactMethods.map((editableContactMethod) => {
                console.log(editableContactMethod);
                return (
                <Input type='text' value={editableContactMethod.value} key={editableContactMethod.id} onChange={(e) => handleChange(e.target.value, editableContactMethod.id)}/>
                )
            })}
          </div>
        </div>
          <Button onClick={addNew}>Add new</Button>
      </DialogContent>
  )
}