import React from 'react'
import UserHeader from '../components/UserManagement/UserHeader'
import UserCore from '../components/UserManagement/UserCore'

export default function UserManagement() {
  return (
    <>
      <div className="min-h-screen">
        <header className="flex justify-center items-center flex-col m-auto lg:w-[35%] text-center gap-5 mb-[50px]">
          <UserHeader/>
        </header>
        <section>
          <UserCore/>
        </section>
      </div>
    </>
  )
}
