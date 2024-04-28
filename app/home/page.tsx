import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import MyMap from "@/components/common/map";
import dynamic from "next/dynamic";

export default async function home() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p className="font-bold">Accès Refusé</p>
        <p>Il faut s&apos;inscrire pour pouvoir utiliser le site</p>
      </div>
    );
  }

  const user = await currentUser();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          Bonjour {user.firstName}
        </h1>
        <p className="text-base text-gray-600 mb-6">
          Quel est votre plan pour aujourd&apos;hui
        </p>
        <MyMap />
      </div>
    </div>
  );
}
