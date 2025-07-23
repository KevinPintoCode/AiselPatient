'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/authSlice'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { User, Lock } from 'lucide-react'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })
            if (!res.ok) throw new Error('Invalid credentials')
            const data = await res.json()
            const decoded = JSON.parse(atob(data.access_token.split('.')[1]))
            dispatch(setCredentials({ token: data.access_token, role: decoded.role }))
            router.push('/patients')
        } catch (err: any) {
            setError(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gradient-to-br from-brand-primary/40 to-brand-primary/10 rounded-3xl p-[2px] w-full max-w-md shadow-xl">
            <div className="rounded-[inherit] bg-background/80 backdrop-blur-md p-10 flex flex-col gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-2 self-start">
                    <Image src="/medical-symbol.png" alt="Logo" width={32} height={32} />
                    <span className="text-lg font-semibold">AiselCase</span>
                </div>

                <h1 className="text-3xl font-semibold text-foreground">Hi there, …..</h1>
                <p className="text-muted-foreground mb-4">Welcome back to the Patients Portal.</p>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="username"
                                placeholder="Admin or User"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button className="w-full mt-2" onClick={handleLogin} disabled={loading || !username || !password}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </div>
        </div>
    )
} 