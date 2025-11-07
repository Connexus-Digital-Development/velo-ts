import { loggingService } from "@/services/loggingService";
import { useEffect, useState } from "react";

interface UseFetchReturn<T> {
  data: T | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = <T = any>(
  url: string,
  options?: RequestInit,
  doNotRun: boolean = false,
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doNotRun) {
      setTimeout(() => {
        fetch(url, options)
          .then((res) => {
            if (!res.ok) {
              loggingService.logError(JSON.stringify(res));
              throw Error("No data gathered from that resource");
            }

            return res.json();
          })
          .then((data) => {
            loggingService.logInfo(
              `Called fetch for ${url} and get response ${JSON.stringify(data)}`,
            );
            setData(data);
            setIsPending(false);
            setError(null);
          })
          .catch((err) => {
            loggingService.logInfo(`Called fetch for ${url} errored :${err}`);
            setIsPending(false);
            setError(err.message);
          });
      }, 1000);
    } else {
      setIsPending(false);
    }
  }, [url]); //anytime the url changes, this function will fire

  return { data, isPending, error };
};

export default useFetch;
