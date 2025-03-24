'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema
const schema = yup.object({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  lastName: yup.string().required('Last Name is required'),
  fullName: yup.string(), // Add fullName as optional field for auto-generation
  mobileNumber: yup
    .string()
    .length(10, 'Mobile Number must be 10 digits')
    .matches(/^[0-9]+$/, 'Mobile Number must be a valid number')
    .required('Mobile Number is required'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match') // Removed `null`
    .required('Confirm Password is required'),
  photo: yup
    .mixed()
    .required('Photo is required')
    .test('fileSize', 'File too large', (value) => {
      if (value && value[0]) {
        const file = value[0] as File; // Type assertion for file object
        return file.size <= 1024 * 1024; // 1MB size limit
      }
      return false;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (value && value[0]) {
        const file = value[0] as File; // Type assertion for file object
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      }
      return false;
    }),
}).required();

  
type FormData = yup.InferType<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // useForm hook for form handling
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // On form submission, simulate registration success
  const onSubmit = (data: FormData) => {
    setLoading(true);
    // Simulate successful registration
    setTimeout(() => {
      alert('Registration successful!');
      router.push('/admission'); // Redirect to login page
    }, 1000);
  };

  // Auto-generate Full Name from First Name, Middle Name, and Last Name
  const handleNameChange = () => {
    const firstName = document.getElementById('firstName') as HTMLInputElement;
    const middleName = document.getElementById('middleName') as HTMLInputElement;
    const lastName = document.getElementById('lastName') as HTMLInputElement;
    const fullName = `${firstName.value} ${middleName.value} ${lastName.value}`;
    setValue('fullName', fullName); // Set Full Name value in the form
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">First Name *</label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            onChange={handleNameChange} // Auto-generate Full Name on change
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        {/* Middle Name */}
        <div className="mb-4">
          <label htmlFor="middleName" className="block mb-1">Middle Name *</label>
          <input
            {...register('middleName')}
            type="text"
            id="middleName"
            onChange={handleNameChange} // Auto-generate Full Name on change
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">Last Name *</label>
          <input
            {...register('lastName')}
            type="text"
            id="lastName"
            onChange={handleNameChange} // Auto-generate Full Name on change
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-1">Full Name *</label>
          <input
            {...register('fullName')}
            type="text"
            id="fullName"
            disabled
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block mb-1">Mobile Number *</label>
          <input
            {...register('mobileNumber')}
            type="text"
            id="mobileNumber"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label htmlFor="photo" className="block mb-1">Photo *</label>
          <input
            {...register('photo')}
            type="file"
            id="photo"
            accept="image/jpeg, image/png, image/jpg"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email *</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password *</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password *</label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* Register Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 p-3 rounded-md text-white hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}
