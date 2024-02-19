import React from "react";
import moment from "moment";

export default function AccountInformation({ accountinformation }) {
  return (
    <div className="px-2 my-1 lg:my-3  lg:my-0 lg:px-10 h-sc">
      <div className="block text-start text-lg lg:text-3xl w-5/6 lg:w-1/2 mx-auto mt-10  lg:mt-20 h-screen">
        <h1 className="text-2xl">Account Information</h1>
        <div className="my-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="text-[#E50914] text-lg my-1">First name:</div>
            <div className="my-1">{accountinformation.firstName}</div>
            <div className="text-[#E50914] text-lg my-1">Last name:</div>
            <div className="my-1">{accountinformation.lastName}</div>
            <div className="text-[#E50914] text-lg my-1">Age:</div>
            <div className="my-1">{accountinformation.age}</div>
            <div className="text-[#E50914] text-lg my-1">Created at:</div>
            <div className="my-1">{moment(accountinformation.createdAt).format('DD MMMM YYYY')}</div>
            <div className="text-[#E50914] text-lg my-1">Email:</div>
            <div className="my-1">{accountinformation.email}</div>
            <div className="text-[#E50914] text-lg my-1">Liked movies:</div>
            <div className="my-1">{accountinformation.likes.length}</div>
            <div className="text-[#E50914] text-lg my-1">Movies in watchlist:</div>
            <div className="my-1">{accountinformation.watchlist.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
