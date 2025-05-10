
import { useLoginMutation } from '../shared/api/authApi';
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(form).unwrap();
      localStorage.setItem('token', data.token);
      alert('Вход выполнен');
    } catch {
      alert('Неверный логин или пароль');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input className="border w-full p-2" placeholder="Email" type="email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border w-full p-2" placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button  className="bg-green-500 text-white px-4 py-2 rounded">Войти</button>
    </form>
  );
}
