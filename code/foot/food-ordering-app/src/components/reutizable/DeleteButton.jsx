import { useState } from "react"


export default function DeleteButton({ label, onDelete, className }) {

    const [confirm, setConfirm] = useState(false)

    if(confirm) {

        return (
            
            <div className="bg-white font-bold">

                <h2 className="text-center text-2xl">Are you sure to delete this menu?</h2>

                <div className="flex gap-3 pt-3 rounded-lg">

                    <button onClick={() => setConfirm(false)} type="button" className="bg-red-500 text-white">Cancel</button>

                    <button onClick={onDelete} type="button" className="bg-primary text-white">Yes, Delete!!</button>

                </div>

            </div>

        )
             
    }

    return (
        
        <button type="button" className="text-white" onClick={() => setConfirm(true)}>

            {label}

        </button>
        
    )

}