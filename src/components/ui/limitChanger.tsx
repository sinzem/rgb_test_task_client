import { Dispatch, SetStateAction } from "react";
import { Button } from "./button";


const LimitChanger = ({limit, setLimit}: {limit: number, setLimit: Dispatch<SetStateAction<number>>}) => {
    return (
         <div className="flex gap-3 items-center">
            Quantity per page: {limit}
            <div>
                <Button 
                    disabled={limit > 1 ? false : true} onClick={() => setLimit(prev => prev - 1)}
                    className="font-bold text-xl w-9 cursor-pointer"
                >
                    -
                </Button>
                <Button 
                    disabled={limit < 50 ? false : true} onClick={() => setLimit(prev => prev + 1)}
                    className="font-bold text-xl w-9 cursor-pointer"
                >
                    +
                </Button>
            </div>
        </div>
    );
};

export default LimitChanger;