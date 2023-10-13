import { createSelector } from "@reduxjs/toolkit";
import Table from "../components/Table";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppSelector } from "../store";
import { Structure } from "../types";
import { selector } from "../features/tradingPairsSlice";

function Favorites() {
    const { value: favoritePairs, } = useLocalStorage<string[]>([], 'favoritePairs');

    const selectFavoritePairs = createSelector([selector], (data: Structure[]) => {
      return data.filter(d => favoritePairs.includes(d.name));
    });

    const favPairs = useAppSelector(selectFavoritePairs);

    if (!favPairs.length) {
      return <h1>No Favorite Pairs Added</h1>
    }

    return (
        <Table data={favPairs} />
    );
}

export default Favorites
