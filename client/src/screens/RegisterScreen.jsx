import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()

	const { userInfo } = useSelector((state) => state.auth)

	useEffect(() => {
		if (userInfo) {
			navigate('/extractor')
		}
	}, [navigate, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()

		// Regular expression for validating email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailRegex.test(email)) {
			toast.error('Please enter a valid email address')
			return
		}

		// Regular expression for a medium to strong password:
		// - At least 8 characters
		// - At least one uppercase letter, one lowercase letter, one number, and one special character
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

		if (!passwordRegex.test(password)) {
			toast.error(
				'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character',
			)
			return
		}

		// Check password entry to match
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		try {
			const res = await register({ name, email, password }).unwrap()
			dispatch(setCredentials({ ...res }))
			navigate('/')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}
	return (
		<FormContainer>
			<h1>Register</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='my-2' controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className='my-2' controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary' className='mt-3'>
					Register
				</Button>

				{isLoading && <Loader />}
			</Form>

			<Row className='py-3'>
				<Col>
					Already have an account? <Link to={`/login`}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
