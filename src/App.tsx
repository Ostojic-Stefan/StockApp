import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import { getTopSymbols, setData } from "./features/tradingPairsSlice";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import socket from './SocketApi';

function App() {
  const dispatch = useAppDispatch();
  const symbols = useAppSelector(store => store.tradingPairs.symbols);

  useEffect(() => {
    dispatch(getTopSymbols());
  }, []);

  useEffect(() => {
    async function initWebSocket() {
      try {
        await socket.connect();

        console.log("Connected to socket successfuly");

        symbols.forEach(sym => {
          socket.send({
            channel: "ticker",
            event: "subscribe",
            symbol: sym
          });
        });

        socket.receiveInit();
        socket.receiveData((data) => {
          console.log(data);
          dispatch(setData(data));
        });

      } catch (error) {
        console.log("Failed to connect to the socket", error);
      }
    }

    if (symbols && symbols.length > 0)
      initWebSocket();

    return () => {
      if (socket) socket.close();
    }

  }, [symbols]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <main className="main-wrapper">
          <AppRoutes />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
