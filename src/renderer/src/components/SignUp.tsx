import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function SignUp() {
  const [valid, setValid] = React.useState<{
    name: { is: boolean; title: string }
    email: { is: boolean; title: string }
    password: { is: boolean; title: string }
  }>({
    name: { is: false, title: '' },
    email: { is: false, title: '' },
    password: { is: false, title: '' }
  })
  const [status, setStatus] = React.useState<boolean>(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,5})+$/
    const data = new FormData(event.currentTarget)
    const email: any = data.get('email')
    const fullName: any = data.get('fullName')
    const password: any = data.get('password')

    if (!email) setValid((pre) => ({ ...pre, email: { ...pre.email, is: true } }))
    // if (!fullName) setValid((pre) => ({ ...pre, name: { ...pre.name, is: true } }))
    if (!password) setValid((pre) => ({ ...pre, password: { ...pre.password, is: true } }))

    const validEmail = regex.test(email)
    // const validFullName = fullName?.length < 6 || fullName?.length > 100
    const validPass = password?.length < 6 || password?.length > 100

    if (!validEmail && email)
      setValid((pre) => ({ ...pre, email: { is: true, title: 'Email sai định dạng' } }))

    // if (validFullName && fullName)
    //   setValid((pre) => ({
    //     ...pre,
    //     name: { is: true, title: 'Họ và Tên phải từ 6 đến 100 ký tự' }
    //   }))

    if (validPass && password)
      setValid((pre) => ({
        ...pre,
        password: { is: true, title: 'Mật khẩu phải từ 6 đến 100 ký tự' }
      }))

    if (validEmail && !validPass) toast.success('Đăng nhập thành công!')
    else setStatus(false)
    console.log({
      email: data.get('email'),
      fullName: data.get('fullName'),
      password: data.get('password')
    })
  }
  console.log(status)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  error={valid.name.is}
                  required
                  onFocus={() => setValid((pre) => ({ ...pre, name: { title: '', is: false } }))}
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  autoFocus
                />
                {valid.name.title && (
                  <span style={{ fontSize: '12px', color: 'red' }}>{valid.name.title}</span>
                )}
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  error={valid.email.is}
                  required
                  onFocus={() => setValid((pre) => ({ ...pre, email: { title: '', is: false } }))}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {valid.email.title && (
                  <span style={{ fontSize: '12px', color: 'red' }}>{valid.email.title}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onFocus={() =>
                    setValid((pre) => ({ ...pre, password: { title: '', is: false } }))
                  }
                  error={valid.password.is}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {valid.password.title && (
                  <span style={{ fontSize: '12px', color: 'red' }}>{valid.password.title}</span>
                )}
              </Grid>
              <Grid item xs={12} className="">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onChange={(e) => {
                        localStorage.setItem('storePass', String(e.target.checked))
                      }}
                    />
                  }
                  label="Lưu mật khẩu"
                />
              </Grid>
            </Grid>
            {status && <span style={{ fontSize: '15px', color: 'green' }}>Login thành công</span>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Đăng nhập
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Chưa có tài khoản? Đăng ký
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <ToastContainer />
    </ThemeProvider>
  )
}
