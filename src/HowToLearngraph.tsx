import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import Image from 'mui-image'
import { NavigationWithContent } from './Navigation'

//import { LearngraphLOGO } from './GraphManager/components/HeaderBar'
//import { useNavigate } from 'react-router-dom'

export const HowToLearngraph = () => {
    const theme=useTheme()
    return (
        <>
            <NavigationWithContent
                withSideNavigation={true}
                content={
                    <Box
                        sx={{padding:theme.spacing(2)}} >

                        The Learngraph is a map of Learning dependencies. In this image you can see that in order
                        to understand multiplication you need to learn about addition.
                        <Image src="HowTo-link.png"
                            width={800} />
                        There is no way around learning addition first so the connection between them is strong.
                    </Box>
                }
            />

        </>
    )
}