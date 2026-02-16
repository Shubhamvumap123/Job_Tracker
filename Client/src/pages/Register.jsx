import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer', // Default
        department: 'General'
    });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register, user } = useAuth();
    const navigate = useNavigate();

    // Clear error when user types
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        const { name, email, password, confirmPassword } = formData;

        if (!name.trim()) return "Name is required";
        if (!email.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        if (password !== confirmPassword) return "Passwords do not match";

        return null; // No errors
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        const { name, email, password, role, department } = formData;

        const result = await register({ name, email, password, role, department });

        if (result.success) {
            setSuccessMsg("Registration successful! Redirecting...");
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    const { name, email, password, confirmPassword, role, department } = formData;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join SmartPost Enterprise today
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={onSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center shadow-sm">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {successMsg && (
                        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center shadow-sm">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <p className="text-sm font-medium">{successMsg}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                placeholder="John Doe"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                placeholder="john@example.com"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    name="role"
                                    value={role}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="agent">Agent</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                                <select
                                    name="department"
                                    value={department}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                >
                                    <option value="General">General</option>
                                    <option value="IT">IT Support</option>
                                    <option value="HR">HR</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                placeholder="••••••••"
                                value={password}
                                onChange={onChange}
                            />
                            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters.</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 transition-all shadow-md hover:shadow-lg"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5 text-white" />
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 underline decoration-indigo-200 underline-offset-2">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
