import MuiAppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import WhatsAppLogo from 'svg/app-logo.svg'
import colors from 'theme/colors'

export function AppBar () {
  return (
    <MuiAppBar sx={{ backgroundColor: colors.light.primary }}>
      <Container>
        <Toolbar>
          <div className="appbarLogo-hga42">
            <img src={WhatsAppLogo}/>
            <span className="font-roboto font-medium text-lg">WhatsApp Sender</span>
          </div>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}

export default AppBar
