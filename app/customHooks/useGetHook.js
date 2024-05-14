import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

function useGetHook(id) {
  const db = SQLite.openDatabase("example.db");
  const [initialRoute, setInitialRoute] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initialRoute from SQLite
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM domainName LIMIT 1",
        null,
        (txObj, resultSet) => {
          const fetchedInitialRoute = resultSet.rows._array.map(
            (items, index) => items.name
          )[0];

          if (fetchedInitialRoute) {
            setInitialRoute(fetchedInitialRoute);
          } else {
            setError("No initialRoute found in the database.");
            setLoading(false);
          }
        },
        (txObj, error) => {
          setError(error);
          setLoading(false);
        }
      );
    });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://digitalsignage.dibsolutions.com.au/api/screen/${id}`,
        {
          headers: {
            origin: initialRoute, // Use the initialRoute fetched from SQLite
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Fetch data based on id (only if initialRoute is available)
  useEffect(() => {
    if (initialRoute !== null) {
      fetchData();
    }
  }, [initialRoute, id]);

  return { data, loading, error, refetch: fetchData };
}

export default useGetHook;
