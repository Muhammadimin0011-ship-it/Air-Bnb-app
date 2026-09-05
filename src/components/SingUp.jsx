import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { Container, Paper, Typography, Stack, TextField, Button } from '@mui/material';
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useAuth } from "../store/useAuth"

const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $name: String!, $password: String!){
        register(email: $email, name: $name, password: $password) {
            accessToken
            user{
                id
                email
                name
            }
        }
    }
`

function SingUp() {
    const { control, handleSubmit } = useForm()
    const { setAccessToken, setUser } = useAuth()

    const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION)

    const handleRegisterCompleted = (data) => {
        toast.success("Registered successfully")
        setAccessToken(data?.register?.accessToken)
        setUser(data?.register?.user)
        window.location.href = "/";
    }

    const handleSingUp = (value) => {
        register({
            variables: value,
            onCompleted: handleRegisterCompleted,
            onError: (error) => toast.error(error.message)
        })
    }

    console.log(data);


    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    fontWeight="700"
                    align="center"
                    sx={{ mb: 3, color: '#FF385C' }}
                >
                    Welcome to Airbnb
                </Typography>

                <Stack spacing={2.5}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="Full Name"
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                type="email"
                                label="Email Address"
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                type="password"
                                label="Password"
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Button
                        onClick={handleSubmit(handleSingUp)}
                        variant="contained"
                        size="large"
                        disableElevation
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            backgroundColor: '#FF385C',
                            '&:hover': {
                                backgroundColor: '#E00B41',
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}

export default SingUp