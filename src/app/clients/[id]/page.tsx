import ClientData from "@/components/client/ClientData";
import ClientDeals from "@/components/client/ClientDeals";


const ClientPage = () => {

    return (
        <div className="p-10 flex flex-col gap-6" >
            <ClientData />
            <ClientDeals />
        </div>
    )
}

export default ClientPage;



