import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'



function Header() {
    const[isOpen,setIsOpen] = useState(false);
    const togglerBtn = () =>{
        setIsOpen(!isOpen);
    }
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    return (
        <>
            <nav className=' w-full fixed bg-[#00000039] z-20 backdrop-blur-sm'>
                <div className='px-4 md:px-16 items-center py-4 flex'>
                    <div className='flex-1 text-2xl font-semibold uppercase text-[#fff]'>
                        Taskify
                    </div>
                    <div className='capitalize font-semibold text-lg  space-x-5 md:flex hidden'>
                        <li className='px-3 text-[#fff] hover:text-[#3e359b] list-none focus:text-[#fff]' aria-current='true'>Home</li>
                        <li className='px-3 text-[#fff] hover:text-[#3e359b] list-none focus:text-[#fff]'>About</li>
                        <li className='px-3 text-[#fff] hover:text-[#3e359b] list-none focus:text-[#fff]'>Services</li>
                        <li className='px-3 text-[#fff] hover:text-[#3e359b] list-none focus:text-[#fff]'> Contact</li>
                    </div>
                    <a href="#" className='mx-9  bg-[#26206d] text-white rounded-3xl px-5 text-sm py-2 font-semibold hidden md:block hover:bg-[#3e359b] '>Register</a>
                    <button className='md:hidden' onClick={togglerBtn}>
                     {isOpen ? '' : <FontAwesomeIcon icon={faBars} style={{color: "#ffffff99",}} />}
                    </button>
                </div>
                <div ref={menuRef} className={`md:hidden fixed z-50 right-0 top-0 h-screen w-40 bg-[#191919] text-white  transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <nav className="flex flex-col space-y-4 uppercase font-semibold text-sm  mx-4 mt-28 ">
                        <li className='px-3 text-[#3e359b] hover:text-[#26206d] list-none focus:text-[#3e359b]' aria-current='true' onClick={() => setIsOpen(false)} >Home</li>
                        <li className='px-3 text-[#3e359b] hover:text-[#26206d] list-none focus:text-[#3e359b]' onClick={() => setIsOpen(false)} >About</li>
                        <li className='px-3 text-[#3e359b] hover:text-[#26206d] list-none focus:text-[#3e359b]' onClick={() => setIsOpen(false)} >Services</li>
                        <li className='px-3 text-[#3e359b] hover:text-[#26206d] list-none focus:text-[#3e359b]' onClick={() => setIsOpen(false)} > Contact Us</li>
                    </nav>
                </div>
            </nav>
        </>
    )
}

export default Header