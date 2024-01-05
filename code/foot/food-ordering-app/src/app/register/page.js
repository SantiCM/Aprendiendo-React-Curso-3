"use client"
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ErrorIcon from '@mui/icons-material/Error';
import { signIn } from 'next-auth/react';

// pagina del registro 
export default function RegisterPage() {

    // recojemos el state del email como cadena vacia 
    const [email, setEmail] = useState("")

    // recojemos el state del password como cadena vacia 
    const [password, setPassword] = useState("")

    // recojemos el state, se esta creando el usuario en falso
    // porque de principio no se ha creado el usuario
    const [creatingUser, setCreatingUser] = useState(false)

    // usuario creado en falso, igual
    const [userCreated, setUserCreated] = useState(false)

    // y el error en falso, porque no existe un registro
    const [error, setError] = useState(false)

    // form,recojemos el evento
    async function handleForm(ev) {

        // lo prevenimos
        ev.preventDefault()

        // creando el usuario, en true
        setCreatingUser(true)

        // el error en falso, paso la prueba
        setError(false)

        // usuario creado en falso, porque ya se registro
        setUserCreated(false)

        // recojemos la respuesta del await del fecth de el url de /api/register
        // viene de la carpeta de la api
        const response = await fetch("/api/register",  { 

            // el metodo en post, el body hara que el json se convierta en string del email y password
            method: "POST", body: JSON.stringify({email, password}),

            // header clasico
            headers: { "Content-Type": "application/json" }
        
        })

        // si la respuesta pasa 
        if(response.ok) {

            // se crea el usuario en true
            setUserCreated(true)
            
            // si falla
        } else {

            // el error sera en true
            setError(true)
        
        }

        // y el crear usuario en falso
        setCreatingUser(false)
  
    }

    return (
        
        <section className="mt-9 max-w-sreen">
            
            <h1 className="text-center text-primary text-4xl pt-4">Register</h1>

            {/*Si el usuario ya fue creado, damos este texto que hago login en su cuenta */}
            {userCreated && (
                
                <div className='mt-4 text-center text-xl'>

                    User created. Now you can <Link className='underline' href={"/login"}>Login <ArrowRightAltIcon></ArrowRightAltIcon></Link>

                </div>
                
            )}

            {/* Si el error, pasa, lo mostramos */}
            {error && (
                
                <div className='mt-4 text-center text-xl'>

                   <p>An Error has ocurred. Please try again later</p> <ErrorIcon></ErrorIcon>

                </div>
                
            )}

            {/* Damos el form que a la hora de hacer submit damos la peticion */}
            <form className="block max-w-screen mx-auto" onSubmit={handleForm}>

                <input 
                    
                    type="text" 
                    placeholder="Please enter you email" 
                    name='email'
                    // valor del email
                    value={email} 
                    // no se puede dar click si se esta creando el usuario
                    disabled={creatingUser}
                    // el change viene del ev de la funcion del segundo estado del ev del target del value
                    onChange={ev => setEmail(ev.target.value)}
                    
                />

                <input 
                
                    type="password" 
                    placeholder="Please enter you password" 
                    name='password'
                    // valor del password
                    value={password} 
                    // no se puede dar click si se esta creando el usuario
                    disabled={creatingUser}
                    // el change viene del ev de la funcion del segundo estado del ev del target del value
                    onChange={ev => setPassword(ev.target.value)}
                    
                />
                
                {/* Damos el button de registrar que lo mismo, se desabilita a la hora de la creacion */}
                <button type="submit" className="submit" disabled={creatingUser}>Register</button>

                <div className="my-4 text-center text-gray-500"><p>Or Login With Provider</p></div>

                {/* Damos el button de que al hacer click damos el signIn de gogle y si pasa nos redireccionamos a esa pagina */}
                <button type="button" onClick={() => signIn("google", {redirect: "/"})} className='flex gap-2 text-black bg-white'>

                    <GoogleIcon></GoogleIcon>
                    
                    <p>Login with Google</p>
                    
                </button>

                <div className='text-center my-4 text-xl text-gray-500'>

                    <p>Existing account?</p> <Link className='underline' href={"/login"}>Login Here</Link>

                </div>

            </form>

        </section>
        
    )

}