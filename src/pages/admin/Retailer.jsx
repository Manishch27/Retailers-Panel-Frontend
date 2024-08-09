import React from 'react'
import { useParams } from 'react-router-dom';
import { CardWithForm } from "@/components/ui/card-dash";

const AdminRetailer = () => {
  const {id} = useParams();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <h1 className="text-xl font-semibold md:text-2xl">Retailer: {`Manish Chaudhary`}</h1>
    <div className="flex flex-col gap-24">
      <div className="flex gap-16">
        <CardWithForm title={"Total Applications"} desc={2} />
        <CardWithForm title={"Total Tokens"} desc={5} />
        <CardWithForm title={"Add Tokens"} desc={5} />

      </div>
    </div>
    </main>
  )
}

export default AdminRetailer;