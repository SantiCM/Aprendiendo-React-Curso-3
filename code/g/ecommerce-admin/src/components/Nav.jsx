import {useRouter} from "next/router"
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Link from  "next/link"

export default function Nav() {

    const inactiveLink = 'flex gap-2 p-1';

    const activeLink = inactiveLink+" bg-white text-blue-900 rounded-l-lg text-md";

    const router = useRouter()

    const {pathname} = router

    return (
    
        <aside className="text-white p-4 pr-0 pl-4">

            <div className="flex gap-2 mb-3 mr-4">

                <InventoryIcon></InventoryIcon>

                Ecommerce Admin

            </div>
             
            <nav className="flex flex-col gap-3">

                <Link href={"/"} className={pathname.includes("/") ? activeLink : inactiveLink}>

                    <HomeIcon style={{marginTop: 2}}></HomeIcon>

                    <span className="text-xl">Dashboard</span>

                </Link>

                <Link href={"/products"} className={pathname.includes("/products") ? activeLink : inactiveLink}>

                    <ListAltIcon style={{marginTop: 2}}></ListAltIcon>

                    <span className="text-xl">Products</span>

                </Link>

                <Link href={"/orders"} className={pathname.includes("/orders") ? activeLink : inactiveLink}>

                    <Inventory2Icon style={{marginTop: 2}}></Inventory2Icon>

                    <span className="text-xl">Orders</span>

                </Link>

                <Link href={"/settings"} className={pathname.includes("/settings") ? activeLink : inactiveLink}>

                    <SettingsIcon style={{marginTop: 2}}></SettingsIcon>

                    <span className="text-xl">Settings</span>

                </Link>

            </nav>

        </aside>
  
    )

}