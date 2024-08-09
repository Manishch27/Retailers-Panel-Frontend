import { CardWithForm } from "@/components/ui/card-dash";

const RetailerDashboard = () =>{
    return(
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <h1 className="text-xl font-semibold md:text-2xl">Dashbord CSC Update</h1>
        <div className="flex flex-col gap-24">
          <div className="flex gap-16">
            <CardWithForm title = {"Balance"} desc = {0}/>
            <CardWithForm title = {"Total Applications"} desc = {0} />
            </div>

            <div className="flex gap-16">
            <CardWithForm title = {"Rejected Applications"} desc = {0} className={'text-sm text-red-500'} />
            <CardWithForm title = {"Accepted Applications"} desc = {0} className={'text-sm text-green-500'}/>
            <CardWithForm title = {"Pending Applications"} desc = {0} className={'text-sm text-yellow-500'}/>
            </div>

        </div>
      </main>
    )
}

export default RetailerDashboard;