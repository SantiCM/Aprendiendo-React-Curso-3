import { Outlet, useNavigation } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"

export const RootLayout = () => {

    //const navigation = useNavigation()

    //navigation.state === "loading"
  
    return (

        <>

            <MainNavigation>

                <main>

                    {/*navigation.state === "loading" && <p>Loanding</p>*/}

                    <Outlet></Outlet>

                </main>

            </MainNavigation>

        </>

    )

}