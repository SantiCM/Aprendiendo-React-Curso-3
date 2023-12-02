import { useFetcher } from 'react-router-dom';

import { useEffect } from 'react';

function NewsletterSignup() {

    const fetcher = useFetcher()

    const {data, state} = fetcher

    useEffect(() => {
        
        // si el estdo es igual a idle, osea que ya no estamos ejecutando la carga
        if(state === "idle" && data && data.message) {
        
            window.alert(data.message)
        
        }


    }, [data, state])
    

    return (
  
        <fetcher.Form method="post" action='/newsletter' className="newsletter">
      
            <input
           
                type="email"
            
                placeholder="Sign up for newsletter..."
            
                aria-label="Sign up for newsletter"
        
            />
        
            <button>Sign up</button>
        
        </fetcher.Form>
    
    );

}

export default NewsletterSignup;