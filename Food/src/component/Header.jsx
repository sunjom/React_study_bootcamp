import Logo from '../assets/logo.jpg'
import Button from './UI/Button'
export default function Headers(){
    return(
        <div className="flex justify-between items-center px-[10%] py-[3rem]">
            <div className='flex items-center'>
                <img src={Logo} 
                alt="로고 이미지" 
                className='rounded-full 
                border-yellow-300 
                border-2 
                size-16
                mr-5
                '
                />
                <h1>ReactFood</h1>
            </div>
            <Button className='text-3xl text-[#ffc404]'>Cart (0)</Button>
        </div>
    )
}