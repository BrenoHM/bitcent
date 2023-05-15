import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react"
import RedeSocial from "./RedeSocial"

export default function RedesSociais() {
    return (
        <div className="flex">
            <RedeSocial icone={<IconBrandYoutube />} url="https://www.youtube.com/@breninho1987/videos" />
            <RedeSocial icone={<IconBrandInstagram />} url="https://www.instagram.com/brenohm/" />
            <RedeSocial icone={<IconBrandFacebook />} url="https://www.facebook.com/profile.php?id=100091745343393" />
            <RedeSocial icone={<IconBrandGithub />} url="https://github.com/BrenoHM" />
        </div>
    )
}