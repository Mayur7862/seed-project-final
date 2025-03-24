'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select'; // For searchable dropdowns

// Validation schema
const schema = yup.object({
  title: yup.string().required('Title is required'),
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  lastName: yup.string().required('Last Name is required'),
  fullName: yup.string().required('Full Name is required'),
  motherName: yup.string().required('Mother Name is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  taluka: yup.string().required('Taluka is required'),
  district: yup.string().required('District is required'),
  pinCode: yup
    .string()
    .length(6, 'Pin Code must be 6 digits')
    .matches(/^[0-9]+$/, 'Pin Code must be a valid number')
    .required('Pin Code is required'),
  state: yup.string().required('State is required'),
  mobileNumber: yup
    .string()
    .length(10, 'Mobile Number must be 10 digits')
    .matches(/^[0-9]+$/, 'Mobile Number must be a valid number')
    .required('Mobile Number is required'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  aadhaarNumber: yup
    .string()
    .length(12, 'Aadhaar Number must be 12 digits')
    .matches(/^[0-9]+$/, 'Aadhaar Number must be a valid number')
    .required('Aadhaar Number is required'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  religion: yup.string().required('Religion is required'),
  casteCategory: yup.string().required('Caste Category is required'),
  caste: yup.string().required('Caste is required'),
  casteCertificate: yup
    .mixed()
    .required('Caste Certificate is required')
    .test('fileSize', 'File too large', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return file.size <= 1024 * 1024; // 1MB size limit
      }
      return false;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      }
      return false;
    }),
  marksheet: yup
    .mixed()
    .required('Marksheet is required')
    .test('fileSize', 'File too large', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return file.size <= 1024 * 1024; // 1MB size limit
      }
      return false;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      }
      return false;
    }),
  photo: yup
    .mixed()
    .required('Photo is required')
    .test('fileSize', 'File too large', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return file.size <= 1024 * 1024; // 1MB size limit
      }
      return false;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      }
      return false;
    }),
  signature: yup
    .mixed()
    .required('Signature is required')
    .test('fileSize', 'File too large', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return file.size <= 1024 * 1024; // 1MB size limit
      }
      return false;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (value && value[0]) {
        const file = value[0] as File;
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      }
      return false;
    }),
  physicallyHandicapped: yup.string().required('Physically Handicapped status is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const religionOptions = [
  { label: 'Hindu', value: 'Hindu' },
  { label: 'Muslim', value: 'Muslim' },
  { label: 'Christian', value: 'Christian' },
  { label: 'Other', value: 'Other' },
];

export default function AdmissionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    console.log(data)
    // Simulate form submission
    setTimeout(() => {
      alert('Admission form submitted successfully!');
      router.push('/thank-you'); // Redirect after successful form submission
    }, 1000);
  };

  // Auto-generate Full Name
  const handleNameChange = () => {
    const firstName = document.getElementById('firstName') as HTMLInputElement;
    const middleName = document.getElementById('middleName') as HTMLInputElement;
    const lastName = document.getElementById('lastName') as HTMLInputElement;
    const fullName = `${firstName.value} ${middleName.value} ${lastName.value}`;
    setValue('fullName', fullName); // Set Full Name value in the form
  };

  // Auto-calculate Age based on DOB
  const handleDobChange = () => {
    const dob = document.getElementById('dob') as HTMLInputElement;
    const dobDate = new Date(dob.value);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const month = today.getMonth() - dobDate.getMonth();
    
    if (month < 0 || (month === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    
    setValue('age', age);  // Ensure 'age' is part of the form state
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Admission Form</h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">Title *</label>
          <select {...register('title')} id="title" className="w-full p-2 rounded-md bg-gray-700 text-white">
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
          </select>
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">First Name *</label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            onChange={handleNameChange}
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
            onChange={handleNameChange}
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
            onChange={handleNameChange}
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
            readOnly
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Mother Name */}
        <div className="mb-4">
          <label htmlFor="motherName" className="block mb-1">Mother's Name *</label>
          <input
            {...register('motherName')}
            type="text"
            id="motherName"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName.message}</p>}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-1">Gender *</label>
          <div className="flex items-center">
            <input
              {...register('gender')}
              type="radio"
              id="male"
              value="Male"
              className="mr-2"
            />
            <label htmlFor="male" className="mr-4">Male</label>
            <input
              {...register('gender')}
              type="radio"
              id="female"
              value="Female"
              className="mr-2"
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">Address *</label>
          <textarea
            {...register('address')}
            id="address"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Taluka */}
        <div className="mb-4">
          <label htmlFor="taluka" className="block mb-1">Taluka *</label>
          <input
            {...register('taluka')}
            type="text"
            id="taluka"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.taluka && <p className="text-red-500 text-sm">{errors.taluka.message}</p>}
        </div>

        {/* District */}
        <div className="mb-4">
          <label htmlFor="district" className="block mb-1">District *</label>
          <input
            {...register('district')}
            type="text"
            id="district"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
        </div>

        {/* Pin Code */}
        <div className="mb-4">
          <label htmlFor="pinCode" className="block mb-1">Pin Code *</label>
          <input
            {...register('pinCode')}
            type="text"
            id="pinCode"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}
        </div>

        {/* State */}
        <div className="mb-4">
          <label htmlFor="state" className="block mb-1">State *</label>
          <input
            {...register('state')}
            type="text"
            id="state"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
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

        {/* Aadhaar Number */}
        <div className="mb-4">
          <label htmlFor="aadhaarNumber" className="block mb-1">Aadhaar Number *</label>
          <input
            {...register('aadhaarNumber')}
            type="text"
            id="aadhaarNumber"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block mb-1">Date of Birth *</label>
          <input
            {...register('dateOfBirth')}
            type="date"
            id="dob"
            onChange={handleDobChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
        </div>

        {/* Religion */}
        <div className="mb-4">
          <label htmlFor="religion" className="block mb-1">Religion *</label>
          <Select
            {...register('religion')}
            options={religionOptions}
            className="w-full bg-gray-700 text-white"
          />
          {errors.religion && <p className="text-red-500 text-sm">{errors.religion.message}</p>}
        </div>

        {/* Caste Category */}
        <div className="mb-4">
          <label htmlFor="casteCategory" className="block mb-1">Caste Category *</label>
          <input
            {...register('casteCategory')}
            type="text"
            id="casteCategory"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.casteCategory && <p className="text-red-500 text-sm">{errors.casteCategory.message}</p>}
        </div>

        {/* Caste */}
        <div className="mb-4">
          <label htmlFor="caste" className="block mb-1">Caste *</label>
          <input
            {...register('caste')}
            type="text"
            id="caste"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.caste && <p className="text-red-500 text-sm">{errors.caste.message}</p>}
        </div>

        {/* Caste Certificate */}
        <div className="mb-4">
          <label htmlFor="casteCertificate" className="block mb-1">Caste Certificate *</label>
          <input
            {...register('casteCertificate')}
            type="file"
            id="casteCertificate"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.casteCertificate && <p className="text-red-500 text-sm">{errors.casteCertificate.message}</p>}
        </div>

        {/* Marksheet */}
        <div className="mb-4">
          <label htmlFor="marksheet" className="block mb-1">Marksheet *</label>
          <input
            {...register('marksheet')}
            type="file"
            id="marksheet"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.marksheet && <p className="text-red-500 text-sm">{errors.marksheet.message}</p>}
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label htmlFor="photo" className="block mb-1">Photo *</label>
          <input
            {...register('photo')}
            type="file"
            id="photo"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
        </div>

        {/* Signature */}
        <div className="mb-4">
          <label htmlFor="signature" className="block mb-1">Signature *</label>
          <input
            {...register('signature')}
            type="file"
            id="signature"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.signature && <p className="text-red-500 text-sm">{errors.signature.message}</p>}
        </div>

        {/* Physically Handicapped */}
        <div className="mb-4">
          <label htmlFor="physicallyHandicapped" className="block mb-1">Physically Handicapped *</label>
          <select {...register('physicallyHandicapped')} id="physicallyHandicapped" className="w-full p-2 rounded-md bg-gray-700 text-white">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.physicallyHandicapped && <p className="text-red-500 text-sm">{errors.physicallyHandicapped.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}