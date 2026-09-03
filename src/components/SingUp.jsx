import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useAuth } from "../store/useAuth"
import Button from '@mui/material/Button';

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
        <Container maxWidth="sm">
            <Paper elevation={4}>
                <Typography variant="h2">welcome to Airbnb</Typography>
                <Stack sx={{ padding: 2 }}>
                    <Controller name="name" control={control} render={({ field, fieldState: { error } }) => (
                        <TextField type="text" {...field} label="enter name" error={error} helperText={error && error.message} />
                    )} />


                    <Controller name="email" control={control} render={({ field, fieldState: { error } }) => (
                        <TextField type="email" {...field} label="enter email" error={error} helperText={error && error.message} />
                    )} />


                    <Controller name="password" control={control} render={({ field, fieldState: { error } }) => (
                        <TextField type="password" {...field} label="enter password" error={error} helperText={error && error.message} />
                    )} />
                    <Button onClick={handleSubmit(handleSingUp)} variant="contained" disableElevation>
                        Sing up
                    </Button>
                </Stack>


            </Paper>
        </Container>
    )
}

export default SingUp