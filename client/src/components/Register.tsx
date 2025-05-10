
import { useRegisterMutation } from '../shared/api/authApi';
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [register] = useRegisterMutation();
  const token = localStorage.getItem("token")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(form).unwrap();
      alert('Регистрация успешна');
      // ✅ Сохраняем токен
      localStorage.setItem('token', result.token);
    console.log("token", token)
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input className="border w-full p-2" placeholder="Username" value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="border w-full p-2" placeholder="Email" type="email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border w-full p-2" placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button  className="bg-blue-500 text-white px-4 py-2 rounded">Зарегистрироваться</button>
    </form>
  );
}
