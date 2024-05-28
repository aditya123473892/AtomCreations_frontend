import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import axios from "axios";
const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddAddress = async () => {
    const { name, address, city, state, pinCode, country } = newAddress;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http:/localhost:8080//api/appuser/addAdress",
        {
          address,
          city,
          state,
          pinCode,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
      setAddresses(res.data.addresses);
    } catch (error) {
      console.log(error);
    }
    if (name && address && city && state && pinCode && country) {
      const newAddressObj = {
        id: addresses.length + 1,
        ...newAddress,
        isDefault: false,
      };

      // console.log(address);
      // setNewAddress({
      //   name: "",
      //   address: "",
      //   city: "",
      //   state: "",
      //   pinCode: "",
      //   country: "",
      // });
    }
  };

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:8080/api/appuser/deleteAddress",
        {
          addressId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data.user.addresses);
      setAddresses(res.data.user.addresses);
    } catch (error) {
      console.log(error);
    }
    // setAddresses((prevAddresses) =>
    //   prevAddresses.filter((address) => address.id !== id)
    // );
  };

  const handleSetDefault = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getAddress = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/appuser/getaddress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(res.data);
    };
    getAddress();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Manage Addresses</h2>

          {/* Address List */}
          <div className="mb-8">
            {addresses &&
              addresses.map((address) => (
                <div
                  key={address._id}
                  className="flex items-center justify-between bg-gray-700 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-2xl text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">{address.name}</h3>
                      <p className="text-gray-400">{address.address}</p>
                      <p className="text-gray-400">
                        {address.city}, {address.state} {address.pinCode}
                      </p>
                      <p className="text-gray-400">{address.country}</p>
                      {address.isDefault && (
                        <span className="text-green-500 font-bold">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="text-blue-400 hover:text-blue-600 mr-4"
                    >
                      Set as Default
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Add New Address Form */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Add New Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 font-bold">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newAddress.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-2 font-bold">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-2 font-bold">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <label htmlFor="pinCode" className="block mb-2 font-bold">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={newAddress.pinCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter zip code"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 font-bold">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter country"
                />
              </div>
            </div>
            <button
              onClick={handleAddAddress}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
