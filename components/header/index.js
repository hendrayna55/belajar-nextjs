import { withAuth } from "../with-auth";
import styles from "./styles.module.css";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

function Header() {
    const router = useRouter();
    const { mutate } = useMutation();
    const { data } = useQueries({
        prefixUrl: 'https://service.pace-unv.cloud/api/user/me',
        headers: {
            Authorization : `Bearer ${Cookies.get("user_token")}`,
        },
    });

    const HandleLogout = async () => {
        const response = await mutate(
            {
                url: 'https://service.pace-unv.cloud/api/logout',
                headers: {
                    Authorization : `Bearer ${Cookies.get("user_token")}`,
                },
            },
        );
        
        if (!response?.success) {
            console.log('gagal logout');
            
        } else {
            Cookies.remove("user_token");
            router.push('/login');
        }
    }

    return <div className={styles.header}>
        <ul className="flex gap-5 items-center">
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/profile"}>Profile</Link></li>
            <li><Link href={"/users"}>Users</Link></li>
            <li><Link href={"/notes"}>Notes</Link></li>
            <li><Link href={"/quotes"}>Quotes</Link></li>
            <li>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {data?.data?.name}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </li>
        </ul>
    </div>
}

export default withAuth(Header)