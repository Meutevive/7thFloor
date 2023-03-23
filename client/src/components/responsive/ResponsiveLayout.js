import { useMediaQuery } from 'react-responsive'

const ResponsiveLayout = () => {
    const isDesktopOrTablet = useMediaQuery({
        query: '(min-device-width: 768px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-device-width: 767px)'
    })

    return (
        <>
            {isDesktopOrTablet && <p>This is desktop or tablet view</p>}
            {isMobile && <p>This is mobile view</p>}
        </>
    )

}

export default ResponsiveLayout;