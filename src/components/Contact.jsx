import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiMapPin, FiCheck } from 'react-icons/fi'

const fields = [
  { name: 'name', label: 'Your name', type: 'text' },
  { name: 'email', label: 'Email address', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
]

function Field({ field, value, onChange, error }) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0

  return (
    <div className="relative">
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full rounded-xl border bg-white/[0.03] px-4 pb-2.5 pt-6 text-ink outline-none transition-all duration-300 ${
          focused ? 'border-lime shadow-[0_0_0_4px_rgba(168,255,158,0.12)]' : 'border-line'
        } ${error ? 'border-amber' : ''}`}
      />
      <label
        className={`pointer-events-none absolute left-4 font-mono uppercase tracking-wide text-mute transition-all duration-300 ${
          focused || filled ? 'top-2.5 text-[10px] text-lime' : 'top-1/2 -translate-y-1/2 text-sm'
        }`}
      >
        {field.label}
      </label>
      {error && <p className="mt-1.5 text-xs text-amber">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    const errs = {}
    if (!values.name.trim()) errs.name = 'Tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'Enter a valid email.'
    if (!values.message.trim()) errs.message = 'Add a short message.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: values.name,
          email: values.email,
          subject: values.subject || `New message from ${values.name}`,
          message: values.message,
        }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setValues({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 3500)
      } else {
        throw new Error(data.message || 'Something went wrong.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('Could not send — please try again or email me directly.')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const socials = [
    { icon: FiMail, label: 'info@ashish.dev', href: 'mailto:aspk209401@gmail.com' },
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Ashish-k47' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashish-kushwaha-dev/' },
    { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/i_4_ashish' },
  ]

  return (
    <section id="contact" className="section-pad relative bg-void px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">05 — Contact</span>
          <h2 className="font-display mt-4 text-4xl text-ink md:text-6xl">Let's build something.</h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="max-w-sm text-mute">
              Have a project, an internship opening, or just want to talk
              shop about React internals? My inbox is open.
            </p>
            <ul className="space-y-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    data-cursor="interactive"
                    className="group flex items-center gap-3 text-ink"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:scale-110 group-hover:border-lime group-hover:text-lime">
                      <s.icon />
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-mute">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line">
                  <FiMapPin />
                </span>
                Kanpur, Uttar Pradesh, India
              </li>
            </ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass relative overflow-hidden rounded-3xl p-7 md:p-9"
          >
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.slice(0, 2).map((f) => (
                <Field key={f.name} field={f} value={values[f.name]} onChange={handleChange} error={errors[f.name]} />
              ))}
            </div>
            <div className="mt-5">
              <Field field={fields[2]} value={values.subject} onChange={handleChange} />
            </div>
            <div className="relative mt-5">
              <textarea
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                placeholder="Your message"
                className={`w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-4 text-ink outline-none transition-all duration-300 placeholder:text-mute focus:border-lime focus:shadow-[0_0_0_4px_rgba(168,255,158,0.12)] ${
                  errors.message ? 'border-amber' : 'border-line'
                }`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-amber">{errors.message}</p>}
            </div>

            <button
              type="submit"
              data-cursor="interactive"
              disabled={status === 'loading'}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-medium text-void transition-opacity disabled:opacity-70"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Send message
                  </motion.span>
                )}
                {status === 'loading' && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="h-4 w-4 rounded-full border-2 border-void border-t-transparent"
                    />
                    Sending
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <FiCheck /> Message sent
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Try again
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {status === 'error' && <p className="mt-3 text-center text-xs text-amber">{errorMsg}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
