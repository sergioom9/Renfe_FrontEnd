import { PageProps } from "fresh";
import HeaderIsland from "../islands/HeaderIsland.tsx";
import Footer from "../components/Footer.tsx";

const Layout = ({ Component }: PageProps) => {
    return (
        <>
            <HeaderIsland />
            <main>
            <Component />
            </main>
            <Footer />
            </>
    );
};

export default Layout;