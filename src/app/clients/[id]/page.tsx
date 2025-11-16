import ClientCard from "@/components/clients/ClientCard";
import ClientDeals from "@/components/clients/ClientDeals";


const ClientPage = () => {

    return (
        <div className="p-10 flex flex-col gap-6" >
            <ClientCard size="big" />
            <ClientDeals />
        </div>
    )
}

export default ClientPage;



