import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CardComponent from "@/components/CardComponent";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [user, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateNewUser] = useState({
    id: "",
    name: "",
    email: "",
  });
  //fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });

  //create User
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...user]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  //update user
  const updateUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateNewUser({ id: "", name: "", email: "" });
      setUsers(
        user.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  //delete user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(user.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          User Management
        </h1>

        {/* Create User */}

        <form className="form ml-[10.1rem]" onSubmit={createUser}>
          <h1 className="text-center font-semibold text-lg">Create User</h1>
          <div className="input-container">
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            ></input>
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            ></input>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>

        {/* Update User */}

        <form className="form ml-[10.1rem]" onSubmit={updateUsers}>
          <h1 className="text-center font-semibold text-lg">Update User</h1>
          <div className="input-container">
            <input
              placeholder="ID"
              value={updateUser.id}
              onChange={(e) =>
                setUpdateNewUser({ ...updateUser, id: e.target.value })
              }
            ></input>
            <input
              placeholder="Name"
              value={updateUser.name}
              onChange={(e) =>
                setUpdateNewUser({ ...updateUser, name: e.target.value })
              }
            ></input>
            <input
              placeholder="Email"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateNewUser({ ...updateUser, email: e.target.value })
              }
            ></input>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>

        <div className="flex flex-col justify-center items-center">
          {user.map((user) => (
            <div key={user.id}>
              <CardComponent card={user} />
              <div className="actions">
                <button onClick={() => deleteUser(user.id)} className="accept">
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
