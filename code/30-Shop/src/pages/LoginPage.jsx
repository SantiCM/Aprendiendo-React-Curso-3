import { useDispatch, useSelector } from "react-redux";
import { Link, Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "./ui/Auth";
import { useForm } from "../hooks/useForm";
import { useMemo } from "react";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { chekingGoogle, startLoginWithEmailPassword } from "../store/auth/thunks";

//Esta variable es para que no haya problema con la renderizacion
const formData =  {
    email: "",

    password: ""

}

export const LoginPage = () => {

    // forma de anular los botones
    const {status, errorMessage} = useSelector(state => state.auth)

    // mandamos llamar el dispatch
    const dispatch = useDispatch()

    // aqui destucturamos email, password, onInputChanhge del formulario que recibe la data (renderizar exitoso)
    const {email, password, onInputChanhge}  = useForm(formData)

    // forma de anular los botones
    // useMemo para memorizar y una funcion del status si es igual al cheking
    // como dependencia el status
    const isAuthenticated =  useMemo(() => status === "cheking", [status])

    // El onsubmit en el form
    // Recibimos el evento
    const onSubmit = (event) => {
        // el evento que va a ser prevenido por defautl
        event.preventDefault()

        // dispatch de hacer que la cuenta pase recibiendo el email y password
        dispatch(startLoginWithEmailPassword({email, password}))
    
    }

    // Google 

    const onGoogleSingIn = (event) => {

        // el evento que va a ser prevenido por defautl
        //event.preventDefault()
        
        // dispatch de entrar con google 
        dispatch(chekingGoogle())
    
    }

  return (

    <AuthLayout title="Login">

        {/* En el form recibimos las animaciones y la propiedad onSubmit que recibe el onsunmit*/}
        <form aria-label="submitForm" className="animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>
       
            <Grid container>
       
                <Grid item xs={12} sx={{ mt: 2 }} md={12} xl={12}>

                    {/*Aqui recibimos el email como name y value y el onChange que viene del formData*/}
                    <TextField
                        label="Correo"
                        type="email"
                        placeholder="correodegoogle@gmail.com"
                        fullWidth
                        name="email"
                        value={email}
                        onChange={onInputChanhge}
                    >

                    </TextField>

                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }} md={12} xl={12}>

                    {/*Aqui recibimos el password como name y value y el onChange que viene del formData*/}
                    <TextField
                        label="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        fullWidth
                        name="password"
                        inputProps={{
                        
                            "data-testid" : "password"
                        
                        }}
                        value={password}
                        onChange={onInputChanhge}
                    >   
                
                    </TextField>
            
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                    
                    {/*Aqui le decimos que si el display es que el erroMesagge que viene de el auth si es asi no recibe nada y si no es nulo*/}
                    <Grid item xs={12} sm={12} display={ !!errorMessage ? "" : "none" }>

                        {/*este alert es decir que las crendeciales estan fallando de firebase, (que ya existe ese email, etc)*/}
          
                        <Alert severity="error">{errorMessage}</Alert>
  
                    </Grid>

                    <Grid item xs={12} sm={6}>

                        {/*Este buton es el login el cual esta con la propiedad isAuthenticated que hace el cambio al cheking*/}

                        <Button style={{background: "red"}}  type="submit" variant="contained" fullWidth>
                    
                            Login
                    
                        </Button>
                
                    </Grid>

                    <Grid item xs={12} sm={6}>

                        {/*Este buton es el login el cual esta con la propiedad isAuthenticated que hace el cambio al cheking*/}
                        
                        <Button style={{background: "red"}}  onClick={onGoogleSingIn} variant="contained" fullWidth aria-label="google-btn">
                       
                            <Google></Google>

                            <Typography sx={{ ml: 1 }}>Google</Typography>
                    
                        </Button>

                    </Grid>
                
                </Grid>

                <Grid container direction="row" justifyContent="end">

                    {/*Aqui ponemos un link de la dependecia material ui que el componete que va a tilizar es el router link
                        que va a dirigir a esta ruta/auth/register, (te manda a crear una nueva cuenta)
                    
                    */}
                    
                    <Link color="inherit" to="/register">
                    
                        Crea Tu Cuenta
                    
                    </Link>
                
                </Grid>
        
            </Grid>
      
        </form>
    
    </AuthLayout>

  
  );

};