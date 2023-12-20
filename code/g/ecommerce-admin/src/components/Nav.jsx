import {useRouter} from "next/router"
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Link from "next/link"

export default function Nav() {

    const inactiveLink = 'flex gap-2 p-1';

    const activeLink = inactiveLink+" bg-white text-blue-900 rounded-l-lg";

    const router = useRouter()

    const {pathname} = router

    return (
    
        <aside className="text-white p-4 pr-0 pl-2">

            <Link href="/" className="flex gap-1 mb-4 mr-4">

                <InventoryIcon></InventoryIcon>

                Ecommerce Admin

            </Link>

            <nav className="flex flex-col gap-2">

            <Link href={"/"}>

                <HomeIcon></HomeIcon>

                Dashboard
     
            </Link>

            <Link href={"/products"} className={pathname.includes("/products") ? activeLink : inactiveLink}>

                <ListAltIcon></ListAltIcon>

                Products
    
            </Link>

            <Link href="/orders" className={pathname.includes("/orders") ? activeLink : inactiveLink}>

                <Inventory2Icon></Inventory2Icon>

                Orders
    
            </Link>

            <Link href="/settings" className={pathname.includes("/settings") ? activeLink : inactiveLink}>

                <SettingsIcon></SettingsIcon>

                Settings
    
            </Link>

            </nav>

        </aside>
  
    )

}