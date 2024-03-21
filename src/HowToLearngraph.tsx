import { AppBar, Toolbar } from '@mui/material'
import Image from 'mui-image'
//import { LearngraphLOGO } from './GraphManager/components/HeaderBar'
//import { useNavigate } from 'react-router-dom'

export const HowToLearngraph = () => {
    //const navigate = useNavigate();
    return (
        <>
                <AppBar position='static'>
                    <Toolbar>
                        {/* <LearngraphLOGO
                            onClick={() => navigate('/')}
                            sx={{
                                ':hover': {
                                cursor: "pointer",
                                },
                            }} 
                        /> */}
                    </Toolbar>
            
                </AppBar>
            Here should the Tutorial Text go
            <Image src="HowTo-link.png"
            width={800} />
        </>
    )
}