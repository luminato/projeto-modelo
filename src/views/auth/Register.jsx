import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import supabase from '@supabasePath/supabaseClient';
import AlertFail from '@components/Alerts/AlertFail'; // Atualize o caminho se necessário
import AlertSuccess from '@components/Alerts/AlertSuccess'; // Atualize o caminho se necessário

const photoDefault = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon';


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [whatsappDDD, setWhatsappDDD] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Adiciona estado para mostrar/ocultar senha
  const [alert, setAlert] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  // Função para validar os campos de entrada
  const validateInputs = () => {
    if (password.length < 6) {
      setAlert({ type: 'fail', message: 'A senha deve ter pelo menos 6 caracteres.' });
      return false;
    }
    if (!username) {
      setAlert({ type: 'fail', message: 'O campo Username deve ser preenchido.' });
      return false;
    }
    if (!firstName) {
      setAlert({ type: 'fail', message: 'O campo First Name deve ser preenchido.' });
      return false;
    }
    if (!lastName) {
      setAlert({ type: 'fail', message: 'O campo Last Name deve ser preenchido.' });
      return false;
    }
    if (!email) {
      setAlert({ type: 'fail', message: 'O campo Email deve ser preenchido.' });
      return false;
    }
    if (whatsappDDD.length !== 2 || !/^\d+$/.test(whatsappDDD)) {
      setAlert({ type: 'fail', message: 'O campo DDD do WhatsApp deve ter exatamente 2 dígitos numéricos.' });
      return false;
    }
    if (whatsappNumber.length !== 9 || !/^\d+$/.test(whatsappNumber)) {
      setAlert({ type: 'fail', message: 'O campo Número do WhatsApp deve ter exatamente 9 dígitos numéricos.' });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          firstName,
          lastName,
          whatsappDDD,
          whatsappNumber
        }
      }
    });

    if (error) {
      console.error('Error signing up:', error.message);
      setAlert({ type: 'fail', message: error.message });
    } else {
      const { error: dbError } = await supabase.from('users').insert([
        {
          email: email,
          username: username,
          first_name: firstName,
          last_name: lastName,
          phone_number: `55${whatsappDDD}${whatsappNumber}`, // Armazena o WhatsApp completo
          status: "UNDER REVIEW",
          rating: 5,
          photo_url: photoDefault,
        },
      ]);

      if (dbError) {
        setAlert({ type: 'fail', message: `Erro ao salvar detalhes do usuário: ${dbError.message}` });
      } else {
        setAlert({ type: 'success', message: 'Cadastro realizado com sucesso!' });
        setTimeout(() => navigate('/auth/login'), 3000); // Redireciona após 3 segundos
      }
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign up with
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign up with credentials</small>
              </div>
              {alert.message && (alert.type === 'success' ? 
                <AlertSuccess message={alert.message} /> : 
                <AlertFail message={alert.message} />
              )}
              <form>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative w-full mb-3">
                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="whatsapp"
                  >
                  WhatsApp
                  </label>
                <div className="flex">
                  <input
                  type="text"
                  pattern="\d*"
                  maxLength={2}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/5 ease-linear transition-all duration-150"
                  id="whatsappDDD"
                  value={whatsappDDD}
                  onChange={(e) => setWhatsappDDD(e.target.value)}
                  placeholder="DDD"
                />
                  <input
                  type="text"
                  pattern="\d*"
                  maxLength={9}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-4/5 ml-2 ease-linear transition-all duration-150"
                  id="whatsappNumber"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Número"
                  />
                </div>
            </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleRegister}
                  >
                    Create Account
                  </button>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <Link
                      to="/auth/login"
                      className="text-blueGray-200"
                    >
                      <small>Already have an account?</small>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
