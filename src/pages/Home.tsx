import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { Structure } from "../types";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrPair } from "../features/tradingPairsSlice";

function Home() {
    const data = useAppSelector(store => store.tradingPairs.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleRowSelect(structure: Structure) {
      dispatch(setCurrPair(structure));
      navigate(`/details/${structure.name}`);
    }

    return (
        <Table data={data} onRowSelect={handleRowSelect} />
    );
}

export default Home
