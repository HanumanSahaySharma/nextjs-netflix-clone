import Image from "next/image";
import { FC, ReactNode } from "react";
import BgImage from '../../public/bg.jpg';
import Logo from '../../public/logo.svg'
interface IProps {
  children: ReactNode;
}
const AuthLayout: FC<IProps> = ({ children }) => (
  <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
    <Image src={BgImage} alt="Nextflix Background" className="hidden sm:flex sm:object-cover -z-10 brightness-50" priority  fill/>
    <Image src={Logo} alt="Netflix Logo" className="absolute left-4 top-4 object-contain  md:left-10 md:top-6" width={120} height={120} priority />
    {children}
  </div>
);
export default AuthLayout;
