import ClearIcon from '@mui/icons-material/Clear';
import UpgradeIcon from '@mui/icons-material/Upgrade'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

export default function PropsMenu( { name, label, props, setProps } ) {

    const [open, setOpen] = useState(false)

    function addSize() {
    
        setProps(oldSizes => {
            
            return [ ...oldSizes, { name: "", price: 0 } ]
        
        })
    
    }

    function editSize(ev, index, prop) {
        
        const newValue = ev.target.value

        setProps(prev => {
            
            const newSize = [...prev]

            newSize[index][prop] = newValue

            return newSize
        
        })
    
    }

    function removeSize(indexRemove){
        
        setProps(prev => prev.filter((index) => index !== indexRemove ))
    
    }
  
    
    return (
        
        <div className="bg-gray-300 p-4 rounded-lg mb-3 mt-4">

            <div className='flex gap-1'>

                <div className='cursor-pointer'>

                    <button 

                        onClick={() => setOpen(prev => !prev)} className="inline-flex p-1" type='button'
                    >
                        {open && ( <ArrowDownwardIcon></ArrowDownwardIcon> )} 

                        {!open && ( <KeyboardArrowUpIcon></KeyboardArrowUpIcon> )} 

                    </button>

                </div>

                <h3 className="text-xl font-bold pb-1">{name}</h3>

                <p className='font-bold text-xl pl-2 text-red-600'>{props?.length}</p>

            </div>

            <div className={open ? "block" : "hidden"} >

                {props?.length > 0 && props.map((size, index) => (
                
                    <div className="flex gap-3">
                    
                        <input
                    
                            type="text" placeholder="Size Name" 
                            
                            value={size.name} onChange={(ev) => editSize(ev, index, "name")}
                    
                        ></input>

                        <input
                    
                            type="text" placeholder="Extra Price" 
                            
                            value={size.number} onChange={(ev) => editSize(ev, index, "price")}
                    
                        ></input>

                        <div className="pt-3 max-w-20 rounded-3xl">
                        
                            <button
                            
                                type="button" className="bg-white cursor-pointer" 
                                
                                onClick={() => removeSize(index)}
                        
                            > <ClearIcon></ClearIcon>
                        
                            </button>
                        
                        </div>
             
                    </div>
            
                ))}

                <button
                
                    type="button" onClick={addSize} 
                    
                    className="bg-tercer text-gray-600"
            
                > <UpgradeIcon></UpgradeIcon> {label}
            
                </button>

            </div>

        </div>
 
    );

}