import ClientData from "@/components/clientData/ClientData";
import ClientDeals from "@/components/clientData/ClientDeals";


const ClientPage = () => {

    return (
        <div className="p-10 flex flex-col gap-6" >
            <ClientData />
            <ClientDeals />
        </div>
    )
}

export default ClientPage;



