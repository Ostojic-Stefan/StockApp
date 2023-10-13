import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppSelector } from "../store";
import Table from "../components/Table";

function Details() {
    const { value: loggedIn } = useLocalStorage<boolean>(false, "loggedIn");
    const { value: favoritePairs, setValue: setFavoritePairs } = useLocalStorage<string[]>([], "favoritePairs");

    const selectedPair = useAppSelector(store => {
        return store.tradingPairs.currPairSnapshot;
    });

    if (!selectedPair) {
        return <h1>Loading...</h1>
    }

    const alreadyFavorite = selectedPair && favoritePairs.includes(selectedPair.name);
    
    function handleAddToFavorites(): void {
        if (selectedPair) {
            const newFavorites = [...favoritePairs, selectedPair.name];
            setFavoritePairs(newFavorites);
        }
    }
    
    function handleRemoveFromFavorites(): void {
        if (selectedPair) {
            const filtered = favoritePairs.filter(pair => pair !== selectedPair!.name);
            setFavoritePairs(filtered);
        }
    }
    
    return (
        <>
            <Table data={selectedPair} ignoreColumns={['change', 'changeRelative']}/>
            {loggedIn && (alreadyFavorite
                ? <button className="btn-tertiary" onClick={handleRemoveFromFavorites}>Remove from favorites</button>
                : <button className="btn-secondary" onClick={handleAddToFavorites}>Add to favorites</button>
            )}
        </>
    );
}

export default Details
