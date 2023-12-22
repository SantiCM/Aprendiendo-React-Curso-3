"use client"
import { useState } from "react"
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"

// pagina del login 
export default function LoginPage(){

    // recojemos el state del email como cadena vacia 
    const [email, setEmail] = useState("")

    // recojemos el state del password como cadena vacia
    const [password, setPassword] = useState("")

    // progreso del login en falso 
    const [loginInProgress, setLoginInProgress] = useState(false)

    // form,recojemos el evento
    async function handleForm(ev){

        // lo prevenimos
        ev.preventDefault()

        // el progreso , en true
        setLoginInProgress(true)

        // damos el await del singIn de las crendenciales que reciben el email y le passowrd
        await signIn("credentials", {email,password})

        // el segundo estado en true
        setLoginInProgress(true)

    }

    return (
        
        <section className="mt-8">
            
            <h1 className="text-center text-primary text-4xl pt-4">Login</h1>

            <form className="block max-w-screen mx-auto" onSubmit={handleForm}>

                <input 
                    
                    type="text" 
                    placeholder="Please enter you email" 
                    // valor del email
                    value={email} 
                    // name del email
                    name="email"
                    // no se puede dar click si se esta creando el usuario
                    disabled={loginInProgress}
                    // el change viene del ev de la funcion del segundo estado del ev del target del value
                    onChange={ev => setEmail(ev.target.value)}
                    
                />

                <input 
                
                    type="password" 
                    placeholder="Please enter you password" 
                    // valor del email
                    name="password"
                    // valor del email
                    value={password} 
                    // no se puede dar click si se esta creando el usuario
                    disabled={loginInProgress}
                    // el change viene del ev de la funcion del segundo estado del ev del target del value
                    onChange={ev => setPassword(ev.target.value)}
                    
                />

                {/*A la hora de dar el login, lo desabilitamos con la peticion */}
                <button disabled={loginInProgress} className="submit">Login</button>

                <div className="my-4 text-center text-gray-500 "><p>Or Login With Provider</p></div>

                {/* Damos el button de que al hacer click damos el signIn de gogle y si pasa nos redireccionamos a esa pagina */}
                <button type="button" onClick={() => signIn("google", {redirect: "/"})} className='flex gap-2 text-black bg-white'>

                    <GoogleIcon></GoogleIcon>
                    
                    Login with Google
                    
                </button>

            </form>

        </section>
        
    )

}