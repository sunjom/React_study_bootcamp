import headerImg from '@/assets/logo.png'
import Link from 'next/link'
import classes from './main-header.module.css'
import MainHeaderBackground from './main-header-background'
import NavLink from './NavLink'
export default function MainHeader(){
    return(
        <>
            <MainHeaderBackground/>
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <img src={headerImg.src} alt="로고 이미지" />
                    Next Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li><NavLink href="/meals">Browse Meals</NavLink></li>
                        <li><NavLink href="/community">Food Community</NavLink></li>
                    </ul>
                </nav>
                
            </header>
        </>
    )
}