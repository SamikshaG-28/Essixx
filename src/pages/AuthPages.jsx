import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Circle, Eye, EyeOff } from 'lucide-react'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../lib/auth.js'
import './AuthPages.css'

const VIDEO_SRC =
  '/video/auth.mp4'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function StepItem({ number, text, active = false }) {
  return (
    <div className={`au-step${active ? ' is-active' : ''}`}>
      <span className="au-step-num">{number}</span>
      <span className="au-step-text">{text}</span>
    </div>
  )
}

function SocialButton({ icon: Icon, label, onClick }) {
  return (
    <button type="button" className="au-social" onClick={onClick}>
      <Icon className="au-social-icon" />
      {label}
    </button>
  )
}

function InputGroup({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  name,
  autoComplete,
  rightSlot,
  helper,
}) {
  return (
    <label className="au-field">
      <span className="au-label">{label}</span>
      <div className="au-input-wrap">
        <input
          className="au-input"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        {rightSlot}
      </div>
      {helper ? <span className="au-helper">{helper}</span> : null}
    </label>
  )
}

function AuthHero({ title, description, steps }) {
  return (
    <aside className="au-hero">
      <video className="au-hero-video" autoPlay muted loop playsInline preload="auto">
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <motion.div
        className="au-hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="au-brand" variants={itemVariants}>
          <Circle className="au-brand-icon" fill="white" stroke="white" size={18} />
          <span>Essixx</span>
        </motion.div>

        <motion.div className="au-hero-copy" variants={itemVariants}>
          <h1>{title}</h1>
          <p>{description}</p>
        </motion.div>

        <motion.div className="au-steps" variants={itemVariants}>
          {steps.map((step) => (
            <StepItem key={step.number} {...step} />
          ))}
        </motion.div>
      </motion.div>
    </aside>
  )
}

function AuthShell({ children, hero }) {
  return (
    <main className="au-main">
      <AuthHero {...hero} />
      <section className="au-form-col">
        <motion.div
          className="au-form-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </section>
    </main>
  )
}

export function SignupPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const name = `${form.firstName} ${form.lastName}`.trim()
      await signUpWithEmail(form.email, form.password, name)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  const withGoogle = async () => {
    setError('')
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      const code = err?.code || ''
      if (!code.includes('popup-closed') && !code.includes('cancelled')) {
        setError(err.message || 'Sign-in failed')
      }
    }
  }

  return (
    <AuthShell
      hero={{
        title: 'Join Essixx',
        description: 'Follow these 3 quick phases to activate your space.',
        steps: [
          { number: 1, text: 'Register your identity', active: true },
          { number: 2, text: 'Configure your studio' },
          { number: 3, text: 'Finalize your profile' },
        ],
      }}
    >
      <header className="au-form-head">
        <h2>Create New Profile</h2>
        <p>Input your basic details to begin the journey.</p>
      </header>

      <form className="au-form" onSubmit={onSubmit}>
        <div className="au-name-grid">
          <InputGroup
            label="First Name"
            placeholder="Ada"
            name="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={set('firstName')}
          />
          <InputGroup
            label="Last Name"
            placeholder="Lovelace"
            name="lastName"
            autoComplete="family-name"
            value={form.lastName}
            onChange={set('lastName')}
          />
        </div>

        <InputGroup
          label="Email"
          placeholder="you@company.com"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
        />

        <InputGroup
          label="Password"
          placeholder="••••••••"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="new-password"
          value={form.password}
          onChange={set('password')}
          helper="Requires at least 8 symbols."
          rightSlot={
            <button
              type="button"
              className="au-eye"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <button type="submit" className="au-submit">
          Create Account
        </button>
      </form>

      {error && <p className="au-error">{error}</p>}

      <div className="au-divider">
        <span>Or</span>
      </div>

      <div className="au-social-grid">
        <SocialButton icon={GoogleIcon} label="Continue with Google" onClick={withGoogle} />
      </div>

      <p className="au-footer-link">
        Member of the team? <Link to="/login">Log in</Link>
      </p>
    </AuthShell>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await signInWithEmail(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  const withGoogle = async () => {
    setError('')
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      const code = err?.code || ''
      if (!code.includes('popup-closed') && !code.includes('cancelled')) {
        setError(err.message || 'Sign-in failed')
      }
    }
  }

  return (
    <AuthShell
      hero={{
        title: 'Welcome back',
        description: 'Sign in to continue building with Essixx.',
        steps: [
          { number: 1, text: 'Verify your identity', active: true },
          { number: 2, text: 'Open your workspace' },
          { number: 3, text: 'Pick up where you left off' },
        ],
      }}
    >
      <header className="au-form-head">
        <h2>Log in</h2>
        <p>Enter your credentials to access your space.</p>
      </header>

      <form className="au-form" onSubmit={onSubmit}>
        <InputGroup
          label="Email"
          placeholder="you@company.com"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
        />

        <InputGroup
          label="Password"
          placeholder="••••••••"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          value={form.password}
          onChange={set('password')}
          rightSlot={
            <button
              type="button"
              className="au-eye"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <button type="submit" className="au-submit">
          Log in
        </button>
      </form>

      {error && <p className="au-error">{error}</p>}

      <div className="au-divider">
        <span>Or</span>
      </div>

      <div className="au-social-grid">
        <SocialButton icon={GoogleIcon} label="Continue with Google" onClick={withGoogle} />
      </div>

      <p className="au-footer-link">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </AuthShell>
  )
}

export default SignupPage
