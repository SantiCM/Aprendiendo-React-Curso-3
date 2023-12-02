import { useRouteError } from "react-router-dom"
import PageContent from "../components/PageContent"
import MainNavigation from "../components/MainNavigation"


export const Error = () => {

    const error = useRouteError()

    let title = "An error occurred!"

    let message = "Something went error"

    if(error.status === 500) {
        
        message = error.data.message
    
    }

    if(error.status === 404) {
        
        title: "Not found",

        message = "Could to find resource or page"

    }
  
    return (

        <>

            <MainNavigation></MainNavigation>

            <PageContent title={title}>

                <p>{message}</p>

            </PageContent>

        </>
    
    )

}